from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
import json
import time
from fastapi import UploadFile, File
import tempfile
import os

from csv_importer import import_csv, preview_csv

from crew import run_analyzer
from config import get_llm
from database.db import init_db
from database.operations import (
    add_transaction,
    add_budget,
    add_goal,
    delete_goal,
    reset_all_data,
    update_goal_progress,
    find_goal_by_name,
    update_transaction,
    delete_transaction,
    get_transactions,
    get_budgets,
    get_goals,
    get_financial_summary
)
from agents.planner import calculate_plan
from agents.advisor import create_advisor, create_advisor_task
from crewai import Crew, Process
from response_builder import (
    format_amount,
    transaction_response,
    budget_response,
    goal_response,
    update_response,
    delete_response
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   
init_db()
llm = get_llm()
pending_transaction = None


class ChatRequest(BaseModel):
    message: str


def transaction_needs_description(transaction):
    description = transaction.get("description")
    return not description or str(description).strip().lower() in {
        "none", "null", "unknown"
    }


def missing_description_question(transaction):
    amount = format_amount(transaction.get("amount", 0))
    transaction_type = transaction.get("type")

    if transaction_type == "income":
        return (
            f"What is the source of this {amount} income? "
            "For example: salary, internship, freelance work, or scholarship."
        )

    if transaction_type == "expense":
        return f"What was this {amount} expense for?"

    if transaction_type == "refund":
        return f"What was the source of this {amount} refund?"

    return f"Please provide a description for this {amount} transaction."

def parse_agent_json(result):
    text = str(result).strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")

        if start != -1 and end != -1:
            return json.loads(text[start:end + 1])

        raise ValueError("Analyzer returned invalid JSON.")
    
def advise(message, plan):

    advisor = create_advisor(llm)

    task = create_advisor_task(
        advisor,
        message,
        plan
    )

    crew = Crew(
        agents=[advisor],
        tasks=[task],
        process=Process.sequential,
        verbose=False
    )

    return str(crew.kickoff())

def handle_plan_response(message, plan):
    if plan.get("no_data"):
        return {
            "response": (
                "I don't have any financial data yet. "
                "Add some transactions, budgets, or savings goals "
                "and I'll be able to help you analyze your finances."
            ),
            "plan": plan
        }

    response = advise(message, plan)

    return {
        "response": response,
        "plan": plan
    }

@app.get("/summary")
def summary():
    return get_financial_summary()

@app.get("/transactions")
def transactions():
    return get_transactions()

@app.delete("/transactions/{transaction_id}")
def delete_transaction_api(transaction_id: int):
    delete_transaction(transaction_id)

    return {
        "response": "Transaction deleted successfully."
    }
@app.delete("/goals/{goal_id}")
def delete_goal_api(goal_id: int):
    delete_goal(goal_id)

    return {
        "response": "Goal deleted successfully."
    }

@app.put("/transactions/{transaction_id}")
def update_transaction_api(transaction_id: int, data: dict):
    update_transaction(transaction_id, data)

    return {
        "response": "Transaction updated successfully."
    }

@app.get("/budgets")
def budgets():
    return get_budgets()

@app.get("/goals")
def goals():
    return get_goals()

@app.post("/preview-csv")
async def preview_csv_api(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".csv"):
        return {
            "error": "Please upload a CSV file."
        }

    contents = await file.read()

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".csv"
    ) as temp:

        temp.write(contents)
        temp_path = temp.name

    try:
        result = preview_csv(temp_path)
        return result

    finally:
        os.remove(temp_path)

@app.post("/import-csv")
async def import_csv_api(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".csv"):
        return {
            "error": "Please upload a CSV file."
        }

    contents = await file.read()

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".csv"
    ) as temp:

        temp.write(contents)
        temp_path = temp.name

    try:
        result = import_csv(temp_path)  
        return result

    finally:
        os.remove(temp_path)

@app.post("/reset")
def reset():
    reset_all_data()

    return {
        "response": "All financial data has been reset."
    }

@app.post("/chat")
def chat(request: ChatRequest):
    global pending_transaction

    if pending_transaction:
        reply = request.message.strip()

        if reply.lower() in {"cancel", "never mind", "nevermind"}:
            pending_transaction = None
            return {"response": "Okay, I did not record that transaction."}

        pending_transaction["description"] = reply
        if not pending_transaction.get("category"):
            transaction_type = pending_transaction.get("type")

            if transaction_type == "income":
                pending_transaction["category"] = "Income"
            elif transaction_type == "expense":
                pending_transaction["category"] = "Other"
            elif transaction_type == "saving":
                pending_transaction["category"] = "Savings"
            elif transaction_type == "refund":
                pending_transaction["category"] = "Refund"
            elif transaction_type == "transfer":
                pending_transaction["category"] = "Transfer"

        if not pending_transaction.get("date"):
            pending_transaction["date"] = str(date.today())

        add_transaction(pending_transaction)
        response = transaction_response(pending_transaction)
        pending_transaction = None

        return {
            "response": response,
            "transactions_added": 1
        }

    request_started_at = time.perf_counter()

    result = run_analyzer(
        request.message,
        llm
    )

    print(
        f"Analyzer finished in {time.perf_counter() - request_started_at:.2f}s",
        flush=True
    )

    data = parse_agent_json(result)

    intent = data.get("intent")

    # TRANSACTION
    if intent == "add_transaction":
        transactions = data.get("transactions", [])

        if not transactions:
            return {
                "response": "I couldn't find a transaction to add."
            }

        if len(transactions) == 1 and transaction_needs_description(transactions[0]):
            pending_transaction = transactions[0]
            return {
                "response": missing_description_question(pending_transaction),
                "awaiting_transaction_description": True
            }

        added_transactions = []

        for transaction in transactions:

            if not transaction.get("category"):
                transaction_type = transaction.get("type")

                if transaction_type == "income":
                    transaction["category"] = "Income"
                elif transaction_type == "expense":
                    transaction["category"] = "Other"
                elif transaction_type == "saving":
                    transaction["category"] = "Savings"
                elif transaction_type == "refund":
                    transaction["category"] = "Refund"
                elif transaction_type == "transfer":
                    transaction["category"] = "Transfer"

            if not transaction.get("date"):
                transaction["date"] = str(date.today())

            add_transaction(transaction)
            added_transactions.append(transaction)

        if len(added_transactions) == 1:
            transaction = added_transactions[0]

            return {
                "response": transaction_response(transaction),
                "transactions_added": 1
            }

        descriptions = ", ".join(
            t.get("description", "transaction")
            for t in added_transactions
        )

        return {
            "response": (
                f"Done. {len(added_transactions)} transactions "
                f"have been recorded: {descriptions}."
            ),
            "transactions_added": len(added_transactions)
        }

    # BUDGET
    if intent == "add_budget":
        budget = data.get("budget")

        if not budget:
            return {
                "response": "Please provide the budget category and amount."
            }

        if not budget.get("category") or budget.get("amount") is None:
            return {
                "response": "Please provide the budget category and amount."
            }

        add_budget(
            budget["category"],
            budget["amount"]
        )

        return {
            "response": budget_response(budget)
        }

    # GOAL
    if intent == "add_goal":
        goal = data.get("goal")

        if not goal:
            return {
                "response": "Please provide the goal and target amount."
            }

        if not goal.get("name") or goal.get("target") is None:
            return {
                "response": "Please provide the goal name and target amount."
            }

        add_goal(
            goal["name"],
            goal["target"],
            goal.get("current", 0),
            goal.get("deadline")
        )

        return {
            "response": goal_response(goal)
        }
    # GOAL CONTRIBUTION
    if intent == "contribute_goal":
        goal = data.get("goal")

        if not goal:
            return {
                "response": "Please provide the goal and amount."
            }

        if not goal.get("name") or goal.get("current") is None:
            return {
                "response": "Please provide the goal name and amount saved."
            }

        existing_goal = find_goal_by_name(goal["name"])

        if not existing_goal:
            return {
                "response": (
                    f"I couldn't find a goal named "
                    f"'{goal['name']}'. Please create the goal first."
                )
            }

        amount = goal["current"]

        update_goal_progress(
            existing_goal["id"],
            amount
        )

        new_current = existing_goal["current"] + amount

        return {
            "response": (
                f"₹{amount:,.0f} added to your "
                f"{existing_goal['name']} goal. "
                f"You have now saved ₹{new_current:,.0f} "
                f"out of ₹{existing_goal['target']:,.0f}."
            )
    }

    # DELETE
    if intent == "delete":
        transaction_id = data.get("transaction_id")

        if not transaction_id:
            return {
                "response": "Please provide the transaction you want to delete."
            }

        delete_transaction(transaction_id)

        return {
            "response": delete_response()
        }

    # UPDATE
    if intent == "update":
        transaction_id = data.get("transaction_id")
        update = data.get("update")

        if not transaction_id or not update:
            return {
                "response": "Please provide the transaction you want to update."
            }

        update_transaction(
            transaction_id,
            update
        )

        return {
            "response": update_response()
        }

    # ANALYSIS
    if intent == "recurring":
        plan = calculate_plan("recurring")

        return handle_plan_response(
            request.message,
            plan
        )

    if intent == "goals":
        plan = calculate_plan("goals")

        return handle_plan_response(
            request.message,
            plan
        )

    if intent == "budget":
        plan = calculate_plan("budget")

        return handle_plan_response(
            request.message,
            plan
        )

    if intent == "affordability":
        amount = data.get("amount")

        if amount is None:
            return {
                "response": "Please provide the purchase amount."
            }

        plan = calculate_plan(
            "affordability",
            amount
        )

        response = advise(
            request.message,
            plan
        )

        return {
            "response": response,
            "calculation": plan
        }

    if intent == "what_if":
        amount = data.get("amount")

        if amount is None:
            return {
                "response": "Please provide the purchase amount."
            }

        plan = calculate_plan(
            "what_if",
            amount
        )

        response = advise(
            request.message,
            plan
        )

        return {
            "response": response,
            "calculation": plan
        }

    print("Starting financial calculations", flush=True)
    plan = calculate_plan("analyze")
    print(
        f"Financial calculations finished in "
        f"{time.perf_counter() - request_started_at:.2f}s",
        flush=True
    )

    response = handle_plan_response(
        request.message,
        plan
    )
    print(
        f"Advisor finished in {time.perf_counter() - request_started_at:.2f}s",
        flush=True
    )

    return response

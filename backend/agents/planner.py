from database.operations import (
    get_financial_summary,
    get_budgets,
    get_goals,
    get_transactions
)
from datetime import date


def calculate_plan(question_type=None, amount=None):
    summary = get_financial_summary()
    transactions = get_transactions()
    budgets = get_budgets()
    goals = get_goals()
    if not transactions and not budgets and not goals:
        return {
             "no_data": True
        }
    current_month = date.today().strftime("%Y-%m")

    # Current month transactions
    current_transactions = [
        t for t in transactions
        if t.get("date", "").startswith(current_month)
    ]

    # -------------------------
    # RECURRING EXPENSES
    # -------------------------
    recurring = [
        t for t in current_transactions
        if t["frequency"] in ("recurring", "variable_recurring")
    ]

    monthly_recurring = sum(
        t["amount"] for t in recurring
        if t["type"] == "expense"
    )

    # -------------------------
    # EMI
    # -------------------------
    emi = [
        t for t in current_transactions
        if t["frequency"] == "emi"
    ]

    monthly_emi = sum(
        t.get("installment_amount") or t["amount"]
        for t in emi
    )

    # -------------------------
    # BUDGETS
    # -------------------------
    budget_status = []

    for budget in budgets:
        spent = sum(
            t["amount"]
            for t in current_transactions
            if t["type"] == "expense"
            and t["category"].lower() == budget["category"].lower()
        )

        percentage = (
            spent / budget["amount"] * 100
            if budget["amount"]
            else 0
        )

        status = (
            "over"
            if percentage > 100
            else "near_limit"
            if percentage >= 80
            else "within"
        )

        budget_status.append({
            "category": budget["category"],
            "budget": budget["amount"],
            "spent": round(spent, 2),
            "remaining": round(
                budget["amount"] - spent, 2
            ),
            "percentage": round(percentage, 2),
            "status": status
        })

    # -------------------------
    # GOALS
    # -------------------------
    goal_status = []

    for goal in goals:
        remaining = max(
            goal["target"] - goal["current"],
            0
        )

        progress = (
            goal["current"] / goal["target"] * 100
            if goal["target"]
            else 0
        )

        goal_status.append({
            "name": goal["name"],
            "target": goal["target"],
            "current": goal["current"],
            "remaining": round(remaining, 2),
            "progress": round(progress, 2),
            "deadline": goal["deadline"]
        })

    # -------------------------
    # QUESTION-SPECIFIC OUTPUT
    # -------------------------

    if question_type == "recurring":
        return {
            "monthly_recurring": round(
                monthly_recurring, 2
            ),
            "monthly_emi": round(
                monthly_emi, 2
            )
        }

    if question_type == "goals":
        return {
            "goals": goal_status
        }

    if question_type == "budget":
        return {
            "budgets": budget_status
        }

    if question_type == "affordability":
        if amount is None:
            return {
                "error": "Purchase amount missing."
            }

        remaining = summary["remaining"]

        return {
            "purchase_amount": amount,
            "current_remaining": remaining,
            "remaining_after_purchase":
                round(remaining - amount, 2),
            "affordable": remaining >= amount
        }

    if question_type == "what_if":
        if amount is None:
            return {
                "error": "Purchase amount missing."
            }

        remaining = summary["remaining"]

        return {
            "purchase_amount": amount,
            "current_remaining": remaining,
            "remaining_after_purchase":
                round(remaining - amount, 2)
        }

    # -------------------------
    # GENERAL ANALYSIS
    # -------------------------

    return {
        **summary,
        "budgets": budget_status,
        "goals": goal_status,
        "monthly_recurring":
            round(monthly_recurring, 2),
        "monthly_emi":
            round(monthly_emi, 2)
    }
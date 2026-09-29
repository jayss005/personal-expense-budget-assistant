from crewai import Agent, Task


def create_analyzer(llm):
    return Agent(
        role="Financial Analyzer",
        goal="Understand financial messages and extract accurate structured data.",
        backstory="""
You analyze personal finance messages.

Extract only information explicitly provided by the user.
Never invent financial values.
Return structured information accurately.
""",
        llm=llm,
        verbose=False,
        allow_delegation=False
    )


def create_analyzer_task(agent, user_message):
    return Task(
        description=f"""
Analyze this financial message:

{user_message}

Return ONLY valid JSON.

{{
    "intent": "add_transaction | add_budget | add_goal | contribute_goal | analyze | affordability | what_if | recurring | goals | budget | update | delete | question",
    "transactions": [],
    "budget": null,
    "goal": null,
    "transaction_id": null,
    "update": null,
    "amount": null,
    "question": null
}}

Transaction format:

{{
    "description": "...",
    "amount": 0,
    "type": "income | expense | transfer | refund | saving",
    "category": "...",
    "frequency": "one_time | recurring | variable_recurring | emi",
    "date": null,
    "total_amount": null,
    "installment_amount": null,
    "installments_total": null,
    "installments_paid": 0
}}

Goal format:

{{
    "name": "...",
    "target": 0,
    "current": 0,
    "deadline": null
}}

Budget format:

{{
    "category": "...",
    "amount": 0
}}

RULES:

TRANSACTIONS:
- Salary = income.
- Own-account transfer = transfer.
- Refund = refund.
- Saving money = saving.
- One-time purchase = one_time.
- Recurring payment = recurring.
- Variable recurring payment = variable_recurring.
- EMI/installment payment = emi.
- Missing values must be null.
- If an income source or transaction description is not stated, set description to null.
- Never invent financial values.
- Multiple transactions must produce multiple transaction objects.

EMI:
- Use frequency = "emi".
- amount = monthly EMI payment.
- installment_amount = monthly EMI payment.
- total_amount = original purchase value.
- installments_total = total number of installments if provided.
- installments_paid = number already paid if provided.
- If these values are not provided, use null.

GOALS:

1. Creating a new goal:
- Use intent = "add_goal".
- goal.target = total amount required.
- goal.current = 0 unless the user explicitly provides an existing saved amount.
- goal.name = name of the goal.
- deadline = provided deadline or null.

Example:

User:
"I want to save 50000 for a new laptop"

Return:

{{
    "intent": "add_goal",
    "transactions": [],
    "budget": null,
    "goal": {{
        "name": "New laptop",
        "target": 50000,
        "current": 0,
        "deadline": null
    }},
    "transaction_id": null,
    "update": null,
    "amount": null,
    "question": null
}}

2. Adding money to an existing goal:
- If the user says they saved, added, contributed, or put money towards an existing goal, use intent = "contribute_goal".
- goal.name = the existing goal name mentioned by the user.
- goal.current = ONLY the amount being added.
- goal.target = null.
- Do not create a new goal.
- Do not calculate the new total.

Example:

User:
"I saved 20000 towards my laptop goal"

Return:

{{
    "intent": "contribute_goal",
    "transactions": [],
    "budget": null,
    "goal": {{
        "name": "laptop",
        "target": null,
        "current": 20000,
        "deadline": null
    }},
    "transaction_id": null,
    "update": null,
    "amount": null,
    "question": null
}}

3. Goal-related questions:
- "How close am I to my savings goals?" = goals.
- Do not modify the database for questions.

BUDGETS:
- Creating a budget = add_budget.
- Extract category and amount.
- Missing values must be null.

ANALYSIS:
- "Analyze my finances" = analyze.
- Recurring expense questions = recurring.
- Savings goal progress questions = goals.
- Budget spending questions = budget.

AFFORDABILITY:
- "Can I afford a 20000 monitor?" = affordability.
- Put 20000 in amount.
- Do not create a transaction.

WHAT-IF:
- "What happens if I spend 20000 on a monitor?" = what_if.
- Put 20000 in amount.
- Do not create a transaction.

UPDATE:
- Use intent = update.
- Identify transaction_id if explicitly provided.
- Put changed fields inside update.

DELETE:
- Use intent = delete.
- Identify transaction_id if explicitly provided.

OTHER:
- Extract only information provided by the user.
- Do not calculate values.
- Do not invent missing information.
- Do not add explanations.
- Return JSON only.
""",
        expected_output="Valid JSON only.",
        agent=agent
    )

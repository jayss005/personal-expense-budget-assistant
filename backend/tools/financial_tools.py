from crewai.tools import tool


@tool("calculate_financial_status")
def calculate_financial_status(
    income: float,
    expenses: list,
    budgets: list,
    goals: list
) -> str:
    """Calculate financial status from transactions, budgets and goals."""

    total_expenses = sum(
        x["amount"]
        for x in expenses
        if x["type"] == "expense"
    )

    remaining = income - total_expenses

    budget_status = []

    for budget in budgets:
        spent = sum(
            x["amount"]
            for x in expenses
            if x.get("category") == budget["category"]
        )

        limit = budget["limit"]

        percentage = (spent / limit * 100) if limit else 0

        budget_status.append({
            "category": budget["category"],
            "spent": round(spent, 2),
            "limit": limit,
            "percentage": round(percentage, 2)
        })

    goal_status = []

    for goal in goals:
        progress = (
            goal["current_amount"] /
            goal["target_amount"] * 100
        )

        goal_status.append({
            "name": goal["name"],
            "progress": round(progress, 2),
            "remaining": round(
                goal["target_amount"] -
                goal["current_amount"], 2
            ),
            "deadline": goal["deadline"]
        })

    return str({
        "income": income,
        "total_expenses": total_expenses,
        "remaining": remaining,
        "budget_status": budget_status,
        "goal_status": goal_status
    })
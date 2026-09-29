def format_amount(amount):
    return f"₹{amount:,.2f}".rstrip("0").rstrip(".")


def transaction_response(transaction):
    description = transaction.get("description")
    amount = transaction.get("amount", 0)
    transaction_type = transaction.get("type")
    frequency = transaction.get("frequency")

    amount_text = format_amount(amount)

    if transaction_type == "expense":

        if frequency == "recurring":
            return (
                f"Got it. {amount_text} recurring expense for "
                f"{description} has been recorded."
            )

        if frequency == "variable_recurring":
            return (
                f"Got it. {amount_text} variable recurring expense for "
                f"{description} has been recorded."
            )

        if frequency == "emi":
            total = transaction.get("total_amount")

            if total:
                return (
                    f"Got it. {amount_text} EMI for {description} "
                    f"has been recorded. The total purchase value is "
                    f"{format_amount(total)}."
                )

            return (
                f"Got it. {amount_text} EMI for "
                f"{description} has been recorded."
            )

        return (
            f"{amount_text} expense for "
            f"{description or 'this transaction'} has been recorded."
        )

    if transaction_type == "income":
        return f"{amount_text} income has been recorded."

    if transaction_type == "refund":
        return f"{amount_text} refund has been recorded."

    if transaction_type == "saving":
        return f"{amount_text} saved has been recorded."

    if transaction_type == "transfer":
        return (
            f"{amount_text} transfer has been recorded."
        )

    return (
        f"{amount_text} transaction has been recorded."
    )


def budget_response(budget):
    category = budget.get("category", "category")
    amount = budget.get("amount", 0)

    return (
        f"Budget set. Your {category} budget is "
        f"{format_amount(amount)}."
    )


def goal_response(goal):
    name = goal.get("name", "goal")
    target = goal.get("target", 0)

    return (
        f"Goal created. You're targeting "
        f"{format_amount(target)} for {name}."
    )


def update_response():
    return (
        "Transaction updated. Your financial summary "
        "and budget calculations have been refreshed."
    )


def delete_response():
    return (
        "Transaction deleted. Your financial summary "
        "has been updated."
    )
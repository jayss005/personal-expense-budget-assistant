from database.operations import add_transaction, get_transactions

add_transaction({
    "description": "Groceries",
    "amount": 500,
    "type": "expense",
    "category": "food",
    "frequency": "one_time",
    "date": "2026-09-26"
})

print(get_transactions())
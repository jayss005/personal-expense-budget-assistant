import csv
from datetime import datetime

from database.operations import get_transactions, add_transaction


def normalize_date(value):
    if not value:
        return None

    value = str(value).strip()

    formats = [
        "%Y-%m-%d",
        "%d-%m-%Y",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%Y/%m/%d",
        "%d %b %Y",
        "%d-%b-%Y",
    ]

    for fmt in formats:
        try:
            return datetime.strptime(value, fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass

    return None


def clean_amount(value):
    if value is None:
        return 0

    text = str(value).strip()

    if not text:
        return 0

    text = (
        text
        .replace(",", "")
        .replace("₹", "")
        .replace("$", "")
        .replace(" ", "")
    )

    # Handle amounts such as (500)
    if text.startswith("(") and text.endswith(")"):
        text = "-" + text[1:-1]

    try:
        return abs(float(text))
    except ValueError:
        return 0


def get_value(row, possible_names):
    for name in possible_names:
        value = row.get(name)

        if value is not None and str(value).strip():
            return value

    return None


def detect_type(description, amount, is_credit=False):
    text = description.lower()

    if any(word in text for word in [
        "refund",
        "cashback",
        "reversal",
        "refund received"
    ]):
        return "refund"

    if any(word in text for word in [
        "transfer",
        "upi transfer",
        "self transfer",
        "fund transfer"
    ]):
        return "transfer"

    if any(word in text for word in [
        "saving",
        "savings",
        "recurring deposit",
        "investment",
        "fixed deposit"
    ]):
        return "saving"

    if any(word in text for word in [
        "salary",
        "payroll",
        "stipend",
        "scholarship",
        "bonus"
    ]):
        return "income"

    if is_credit:
        return "income"

    return "expense"


def detect_category(description, transaction_type):
    text = description.lower()

    if transaction_type == "income":
        return "Income"

    if transaction_type == "refund":
        return "Refund"

    if transaction_type == "transfer":
        return "Transfer"

    if transaction_type == "saving":
        return "Savings"

    categories = {
        "food": [
            "food",
            "restaurant",
            "swiggy",
            "zomato",
            "grocery",
            "groceries",
            "cafe",
            "coffee"
        ],

        "transport": [
            "uber",
            "ola",
            "fuel",
            "petrol",
            "diesel",
            "bus",
            "train",
            "metro"
        ],

        "subscription": [
            "netflix",
            "spotify",
            "prime",
            "youtube",
            "subscription"
        ],

        "rent": [
            "rent",
            "housing"
        ],

        "shopping": [
            "amazon",
            "flipkart",
            "shopping"
        ],

        "utilities": [
            "electricity",
            "water bill",
            "internet",
            "wifi",
            "mobile bill"
        ],

        "emi": [
            "emi",
            "installment"
        ]
    }

    for category, keywords in categories.items():

        if any(keyword in text for keyword in keywords):
            return category.title()

    return "Other"


def is_duplicate(transaction, existing):
    for item in existing:

        if (
            item["date"] == transaction["date"]
            and item["description"].lower()
            == transaction["description"].lower()
            and float(item["amount"])
            == float(transaction["amount"])
            and item["type"]
            == transaction["type"]
        ):
            return True

    return False


def parse_csv(file_path):

    transactions = []
    duplicates = []

    existing = get_transactions()

    with open(
        file_path,
        "r",
        encoding="utf-8-sig",
        newline=""
    ) as file:

        reader = csv.DictReader(file)

        for row in reader:

            # --------------------------------
            # DATE
            # --------------------------------

            date_value = get_value(
                row,
                [
                    "date",
                    "Date",
                    "transaction date",
                    "Transaction Date",
                    "TransactionDate",
                    "txn date",
                    "Txn Date"
                ]
            )

            transaction_date = normalize_date(date_value)

            if not transaction_date:
                transaction_date = datetime.today().strftime("%Y-%m-%d")


            # --------------------------------
            # DESCRIPTION
            # --------------------------------

            description = get_value(
                row,
                [
                    "description",
                    "Description",
                    "details",
                    "Details",
                    "merchant",
                    "Merchant",
                    "narration",
                    "Narration",
                    "particulars",
                    "Particulars",
                    "remarks",
                    "Remarks"
                ]
            )

            if not description:
                continue

            description = str(description).strip()


            # --------------------------------
            # BANK DEBIT / CREDIT
            # --------------------------------

            debit_value = get_value(
                row,
                [
                    "debit",
                    "Debit",
                    "Debit Amount",
                    "debit amount",
                    "Withdrawal",
                    "withdrawal",
                    "Withdrawal Amount",
                    "withdrawal amount"
                ]
            )

            credit_value = get_value(
                row,
                [
                    "credit",
                    "Credit",
                    "Credit Amount",
                    "credit amount",
                    "Deposit",
                    "deposit",
                    "Deposit Amount",
                    "deposit amount"
                ]
            )


            debit = clean_amount(debit_value)
            credit = clean_amount(credit_value)


            # --------------------------------
            # OLD SINGLE AMOUNT FORMAT
            # --------------------------------

            if debit == 0 and credit == 0:

                amount_value = get_value(
                    row,
                    [
                        "amount",
                        "Amount",
                        "transaction amount",
                        "Transaction Amount"
                    ]
                )

                amount = clean_amount(amount_value)

                if amount == 0:
                    continue

                transaction_type = detect_type(
                    description,
                    amount
                )


            # --------------------------------
            # BANK FORMAT
            # --------------------------------

            else:

                if credit > 0:

                    amount = credit

                    transaction_type = detect_type(
                        description,
                        amount,
                        is_credit=True
                    )

                elif debit > 0:

                    amount = debit

                    transaction_type = detect_type(
                        description,
                        amount,
                        is_credit=False
                    )

                else:
                    continue


            # --------------------------------
            # CATEGORY
            # --------------------------------

            category = detect_category(
                description,
                transaction_type
            )


            # --------------------------------
            # TRANSACTION OBJECT
            # --------------------------------

            transaction = {
                "description": description,
                "amount": amount,
                "type": transaction_type,
                "category": category,
                "frequency": "one_time",
                "date": transaction_date,
                "total_amount": None,
                "installment_amount": None,
                "installments_total": None,
                "installments_paid": 0
            }


            # --------------------------------
            # DUPLICATE CHECK
            # --------------------------------

            if is_duplicate(
                transaction,
                existing
            ):

                duplicates.append(
                    transaction
                )

                continue


            transactions.append(
                transaction
            )

            existing.append(
                transaction
            )


    return transactions, duplicates


def import_csv(file_path):

    transactions, duplicates = parse_csv(
        file_path
    )

    for transaction in transactions:

        add_transaction(
            transaction
        )

    return {
        "imported": len(transactions),
        "duplicates": len(duplicates),
        "transactions": transactions,
        "duplicate_transactions": duplicates
    }


def preview_csv(file_path):

    transactions, duplicates = parse_csv(
        file_path
    )

    return {
        "total": (
            len(transactions)
            + len(duplicates)
        ),
        "new_transactions": len(transactions),
        "duplicates": len(duplicates),
        "transactions": transactions,
        "duplicate_transactions": duplicates
    }
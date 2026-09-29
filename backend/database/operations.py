from .db import get_db
from datetime import date

def add_transaction(data):
    db = get_db()

    db.execute("""
        INSERT INTO transactions
        (description, amount, type, category, frequency, date,
         total_amount, installment_amount, installments_total, installments_paid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["description"],
        data["amount"],
        data["type"],
        data.get("category", "unknown"),
        data.get("frequency", "one_time"),
        data.get("date"),
        data.get("total_amount"),
        data.get("installment_amount"),
        data.get("installments_total"),
        data.get("installments_paid", 0)
    ))

    db.commit()
    db.close()


def get_transactions():
    db = get_db()

    rows = db.execute("""
        SELECT id, description, amount, type, category,
               frequency, date, total_amount,
               installment_amount, installments_total,
               installments_paid
        FROM transactions
        ORDER BY id DESC
    """).fetchall()

    db.close()

    return [
        {
            "id": r[0],
            "description": r[1],
            "amount": r[2],
            "type": r[3],
            "category": r[4],
            "frequency": r[5],
            "date": r[6],
            "total_amount": r[7],
            "installment_amount": r[8],
            "installments_total": r[9],
            "installments_paid": r[10]
        }
        for r in rows
    ]


def delete_transaction(transaction_id):
    db = get_db()

    db.execute(
        "DELETE FROM transactions WHERE id = ?",
        (transaction_id,)
    )

    db.commit()
    db.close()


def update_transaction(transaction_id, data):
    db = get_db()

    db.execute("""
        UPDATE transactions
        SET description = ?,
            amount = ?,
            category = ?,
            frequency = ?
        WHERE id = ?
    """, (
        data.get("description"),
        data.get("amount"),
        data.get("category"),
        data.get("frequency"),
        transaction_id
    ))

    db.commit()
    db.close()


def clear_transactions():
    db = get_db()
    db.execute("DELETE FROM transactions")
    db.commit()
    db.close()


def add_budget(category, amount):
    db = get_db()

    db.execute(
        "INSERT INTO budgets (category, amount) VALUES (?, ?)",
        (category, amount)
    )

    db.commit()
    db.close()


def get_budgets():
    db = get_db()

    rows = db.execute(
        "SELECT id, category, amount FROM budgets"
    ).fetchall()

    db.close()

    return [
        {
            "id": r[0],
            "category": r[1],
            "amount": r[2]
        }
        for r in rows
    ]


def add_goal(name, target, current=0, deadline=None):
    db = get_db()

    db.execute("""
        INSERT INTO goals
        (name, target, current, deadline)
        VALUES (?, ?, ?, ?)
    """, (name, target, current, deadline))

    db.commit()
    db.close()

def update_goal_progress(goal_id, amount):
    db = get_db()

    db.execute("""
        UPDATE goals
        SET current = current + ?
        WHERE id = ?
    """, (amount, goal_id))

    db.commit()
    db.close()

def find_goal_by_name(name):
    db = get_db()

    row = db.execute("""
        SELECT id, name, target, current, deadline
        FROM goals
        WHERE LOWER(name) = LOWER(?)
        LIMIT 1
    """, (name,)).fetchone()

    db.close()

    if not row:
        return None

    return {
        "id": row[0],
        "name": row[1],
        "target": row[2],
        "current": row[3],
        "deadline": row[4]
    }


def get_goals():
    db = get_db()

    rows = db.execute("""
        SELECT id, name, target, current, deadline
        FROM goals
    """).fetchall()

    db.close()

    return [
        {
            "id": r[0],
            "name": r[1],
            "target": r[2],
            "current": r[3],
            "deadline": r[4]
        }
        for r in rows
    ]


def get_financial_summary():
    db = get_db()

    current_month = date.today().strftime("%Y-%m")

    income = db.execute("""
        SELECT COALESCE(SUM(amount), 0)
        FROM transactions
        WHERE type = 'income'
        AND date LIKE ?
    """, (f"{current_month}%",)).fetchone()[0]

    expenses = db.execute("""
        SELECT COALESCE(SUM(amount), 0)
        FROM transactions
        WHERE type = 'expense'
        AND date LIKE ?
    """, (f"{current_month}%",)).fetchone()[0]

    savings = db.execute("""
        SELECT COALESCE(SUM(amount), 0)
        FROM transactions
        WHERE type = 'saving'
        AND date LIKE ?
    """, (f"{current_month}%",)).fetchone()[0]

    refunds = db.execute("""
        SELECT COALESCE(SUM(amount), 0)
        FROM transactions
        WHERE type = 'refund'
        AND date LIKE ?
    """, (f"{current_month}%",)).fetchone()[0]

    db.close()

    actual_expenses = expenses - refunds

    return {
        "income": round(income, 2),
        "expenses": round(actual_expenses, 2),
        "savings": round(savings, 2),
        "refunds": round(refunds, 2),
        "remaining": round(
            income - actual_expenses - savings,
            2
        )
    }

def delete_goal(goal_id):
    db = get_db()

    db.execute(
        "DELETE FROM goals WHERE id = ?",
        (goal_id,)
    )

    db.commit()
    db.close()

def reset_all_data():
    db = get_db()

    db.execute("DELETE FROM transactions")
    db.execute("DELETE FROM budgets")
    db.execute("DELETE FROM goals")

    db.commit()
    db.close()
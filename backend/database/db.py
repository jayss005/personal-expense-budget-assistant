import sqlite3

DB = "finance.db"


def get_db():
    return sqlite3.connect(DB)


def init_db():
    db = get_db()

    db.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            amount REAL,
            type TEXT,
            category TEXT,
            frequency TEXT,
            date TEXT,
            total_amount REAL,
            installment_amount REAL,
            installments_total INTEGER,
            installments_paid INTEGER DEFAULT 0
        )
    """)

    db.execute("""
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            amount REAL
        )
    """)

    db.execute("""
        CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            target REAL,
            current REAL,
            deadline TEXT
        )
    """)

    db.commit()
    db.close()
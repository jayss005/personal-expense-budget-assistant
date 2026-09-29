# 💰 Personal Expense Budget Assistant

An AI-powered personal finance assistant that helps users record, analyze, and understand their personal finances using a simple multi-agent architecture.

The system combines **CrewAI, Gemini, FastAPI, React, and SQLite** to provide financial analysis, budget and goal planning, and personalized financial insights.

---

## 📌 Overview

Managing personal expenses manually can make it difficult to understand spending patterns, track budgets, and plan financial goals.

The **Personal Expense Budget Assistant** provides a conversational interface where users can record financial transactions and ask questions about their finances.

### Core Principle

> **LLM interprets → Python calculates → LLM explains**

This separation ensures that numerical financial calculations are handled by deterministic Python logic rather than relying on the language model to perform financial arithmetic.

---

## 🎯 Objectives

- Provide a conversational interface for managing personal finances.
- Record income, expenses, savings, refunds, and transfers.
- Automatically categorize financial transactions.
- Analyze current financial activity.
- Track category-based budgets.
- Track financial goals and progress.
- Import transactions from CSV files.
- Provide AI-generated financial explanations and insights.
- Demonstrate a practical multi-agent AI architecture.

---

## ✨ Key Features

### 💵 Transaction Management

Users can record different types of financial transactions using natural language:

- Income
- Expense
- Savings
- Refund
- Transfer

Example:

```text
User: ₹50000 income

Assistant: What is the source of this income?

User: Internship

Assistant: ₹50,000 income has been recorded.
```

The system asks for missing information instead of automatically inventing it.

### 🏷️ Expense Categorization

Supported expense categories include:

- Food
- Transport
- Shopping
- Entertainment
- Subscriptions
- Bills & Utilities
- Rent
- Education
- Healthcare
- EMI
- Travel
- Groceries
- Personal
- Other

Other transaction types use dedicated categories such as:

- Income
- Savings
- Refund
- Transfer

### 📊 Financial Overview

The dashboard provides an overview of the current month's financial activity:

- Total income
- Total expenses
- Total savings
- Refunds
- Remaining amount

The calculations are performed using Python and SQLite data.

### 💳 Budget Tracking

Users can create category-based budgets.

Example:

```text
Food       → ₹5,000
Transport  → ₹3,000
Shopping   → ₹4,000
```

The system compares current-month spending against the corresponding budget.

### 🎯 Financial Goals

Users can create financial goals containing:

- Goal name
- Target amount
- Current progress
- Deadline

Example:

```text
Goal: New Laptop
Target: ₹100000
Current: ₹25000
Deadline: 2027-01-01
```

The system calculates goal progress and provides planning information.

### 📂 CSV Import

The application supports importing transaction records from CSV files.

The importer:

1. Reads transaction records.
2. Processes the transaction data.
3. Checks existing transactions.
4. Detects duplicates.
5. Adds new transactions to SQLite.

---

# 🤖 Multi-Agent Architecture

The system uses **three specialized AI agents**.

## 1. Financial Analyzer Agent

**Question answered:**

> What happened?

Responsibilities:

- Understand user financial input.
- Identify transaction type.
- Extract transaction details.
- Identify categories.
- Extract budgets and goals.
- Understand financial analysis requests.

## 2. Budget & Goal Planner Agent

**Question answered:**

> Where am I and what happens if...?

Responsibilities:

- Analyze budgets.
- Analyze financial goals.
- Calculate affordability.
- Analyze recurring expenses.
- Perform financial what-if calculations.
- Work with deterministic Python calculations.

## 3. Insight & Advice Agent

**Question answered:**

> What does it mean and what can I consider?

Responsibilities:

- Explain calculated financial information.
- Summarize financial patterns.
- Explain budget and goal status.
- Provide contextual financial insights.
- Convert calculated results into understandable responses.

The advisor does not independently invent financial numbers or perform the primary calculations.

---

# 🔄 Agent Workflow

```text
User
  │
  ▼
React Frontend
  │
  ▼
FastAPI Backend
  │
  ▼
Financial Analyzer Agent
  │
  ├── Understands user request
  ├── Extracts financial information
  └── Identifies required operation
  │
  ▼
Python Financial Calculations
  │
  ├── Transaction calculations
  ├── Budget calculations
  ├── Goal calculations
  └── What-if calculations
  │
  ▼
SQLite Database
  │
  ├── Transactions
  ├── Budgets
  └── Goals
  │
  ▼
Budget & Goal Planner Agent
  │
  ▼
Insight & Advice Agent
  │
  ▼
Response
  │
  ▼
React Frontend
```

---

# 🧠 Core Design Principle

```text
LLM interprets
      ↓
Python calculates
      ↓
LLM explains
```

For example, instead of asking the LLM to calculate:

```text
Income - Expenses - Savings
```

the backend performs the calculation using Python.

The calculated result is then provided to the advisor agent for explanation.

---

# 🏗️ System Architecture

```text
┌─────────────────────────┐
│         User            │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     React Frontend      │
│                         │
│ Dashboard               │
│ Transactions            │
│ Budgets                 │
│ Goals                   │
│ AI Chat                 │
└────────────┬────────────┘
             │ REST API
             ▼
┌─────────────────────────┐
│     FastAPI Backend     │
│                         │
│ API Routes              │
│ Request Handling        │
│ Transaction Management  │
│ CSV Import              │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Financial Analyzer      │
│ Agent                   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Python Calculation      │
│ Layer                   │
│                         │
│ Financial Summary       │
│ Budget Calculations     │
│ Goal Calculations       │
│ What-if Calculations    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        SQLite           │
│                         │
│ Transactions            │
│ Budgets                 │
│ Goals                   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Budget & Goal Planner   │
│ Agent                   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Insight & Advice        │
│ Agent                   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      User Response      │
└─────────────────────────┘
```

---

# 🛠️ Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript
- React Markdown

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### AI / Agent Framework

- CrewAI
- Gemini

### Database

- SQLite

### Data Processing

- Python CSV module

### Development Tools

- Git
- GitHub
- VS Code

---

# 📁 Project Structure

```text
personal-expense-budget-assistant/
│
├── backend/
│   ├── agents/
│   │   ├── advisor.py
│   │   ├── analyzer.py
│   │   └── planner.py
│   │
│   ├── database/
│   │   ├── __init__.py
│   │   ├── db.py
│   │   └── operations.py
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   ├── tools/
│   │   └── financial_tools.py
│   │
│   ├── config.py
│   ├── crew.py
│   ├── csv_importer.py
│   ├── main.py
│   ├── response_builder.py
│   └── test_db.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/jayss005/personal-expense-budget-assistant.git
cd personal-expense-budget-assistant
```

## 2. Create a Virtual Environment

Windows PowerShell:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

## 3. Install Python Dependencies

```powershell
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your actual Gemini API key.

**Do not commit your `.env` file to GitHub.**

---

# ▶️ Running the Backend

Navigate to the backend directory:

```powershell
cd backend
```

Start the FastAPI server:

```powershell
python -m uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 💻 Running the Frontend

Open another terminal:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

---

# 🔐 Security

The project follows basic security practices for handling API credentials.

Sensitive and generated files are excluded using `.gitignore`.

Ignored files include:

```text
.env
.venv/
.venv-1/
__pycache__/
*.db
node_modules/
dist/
build/
.vscode/
.idea/
```

The SQLite database is excluded from version control because it contains local application data.

---

# 🗃️ Database Design

The application uses SQLite with three primary data areas.

## Transactions

Stores:

- Transaction ID
- Description
- Amount
- Type
- Category
- Frequency
- Date
- Total amount
- Installment amount
- Total installments
- Paid installments

## Budgets

Stores:

- Budget ID
- Category
- Budget amount

## Goals

Stores:

- Goal ID
- Goal name
- Target amount
- Current progress
- Deadline

---

# 🧮 Financial Calculation Approach

The application uses deterministic Python functions for financial calculations.

For example:

```text
Remaining Amount
=
Income
-
Expenses
-
Savings
```

Refunds are accounted for when calculating actual expenses:

```text
Actual Expenses
=
Expenses
-
Refunds
```

The system also calculates:

- Current-month income
- Current-month expenses
- Current-month savings
- Remaining amount
- Budget utilization
- Goal progress
- Recurring expenses
- EMI obligations
- Affordability
- What-if scenarios

The LLM is not responsible for determining these numerical results.

---

# 💬 Example Interactions

### Recording Income

```text
User:
₹50000 income

Assistant:
What is the source of this income?

User:
Internship

Assistant:
₹50,000 income has been recorded.
```

### Recording an Expense

```text
User:
I spent ₹1200 on books

Assistant:
₹1,200 expense for books has been recorded.
```

### Budget Analysis

```text
User:
How much have I spent on food?

Assistant:
The system calculates the current month's
food spending and provides the result.
```

### Goal Planning

```text
User:
Can I afford to save ₹5000 this month?

Assistant:
The planner calculates the current financial
position and provides the result.
```

### What-if Analysis

```text
User:
What happens if I spend ₹5000 more this month?

Assistant:
The planner calculates the effect of the
additional expense and the advisor explains
the resulting financial position.
```

---

# 📊 Data Flow

```text
User Input
    │
    ▼
Request Processing
    │
    ▼
Financial Analyzer
    │
    ▼
Structured Financial Data
    │
    ▼
Python Calculation Layer
    │
    ▼
SQLite Database
    │
    ▼
Budget & Goal Planner
    │
    ▼
Calculated Results
    │
    ▼
Insight & Advice Agent
    │
    ▼
Natural Language Response
```

---

# 🔄 CSV Import Workflow

```text
CSV File
   │
   ▼
CSV Parser
   │
   ▼
Transaction Validation
   │
   ▼
Duplicate Detection
   │
   ├── Duplicate → Skip
   │
   └── New Record
          │
          ▼
       SQLite
```

This prevents the same transaction from being imported multiple times.

---

# 🎯 Project Use Cases

The system can be used for:

- Personal expense tracking
- Monthly budget monitoring
- Financial goal tracking
- Spending analysis
- Recurring expense analysis
- What-if financial scenarios
- CSV-based transaction import
- Conversational financial assistance

---

# 🧪 Testing

Core functionality has been tested for:

- Adding income transactions
- Adding expense transactions
- Adding savings
- Adding refunds
- Transaction categorization
- Budget calculations
- Goal calculations
- CSV import
- Duplicate transaction detection
- Database operations
- Resetting application data

Example duplicate CSV import behavior:

```text
First Import:
New transactions → Added

Second Import:
Existing transactions → Detected as duplicates
```

---

# 📌 Current Implementation

The current version includes:

- React frontend
- FastAPI backend
- SQLite database
- CrewAI multi-agent workflow
- Gemini LLM integration
- Three specialized agents
- Transaction management
- Expense categories
- Budget tracking
- Goal tracking
- CSV import
- Duplicate detection
- Financial calculations
- AI-generated financial explanations
- Git/GitHub version control

---

# 🚀 Future Scope

Possible future improvements include:

- Authentication and user accounts
- Multiple user profiles
- Cloud database support
- Bank account integration
- Automatic transaction synchronization
- Advanced spending visualizations
- Monthly financial reports
- Improved financial goal recommendations
- Notification and reminder system
- Mobile application
- More advanced financial forecasting
- Personalized financial insights
- Exportable financial reports

---

# ⚠️ Limitations

This project is designed as an academic and personal finance assistance system.

It should not be considered a replacement for a professional financial advisor.

The application operates on the financial information provided by the user and the data stored in its database.

The quality of AI-generated explanations depends on the quality and completeness of the available financial data.

---

# 🎓 Academic Project

This project was developed as an academic project to demonstrate the practical application of:

- Generative AI
- Agentic AI
- Multi-agent systems
- Natural language processing
- Backend API development
- Database management
- Financial data processing
- Frontend development

The project demonstrates how specialized AI agents can collaborate with deterministic software components to solve a practical real-world problem.

---

# 👨‍💻 Author

**Jay Shah**

BTech Information Technology

Personal Expense Budget Assistant

---

# 📄 License

This project is intended primarily for educational and academic purposes.

You may modify and extend the project for learning and experimentation.

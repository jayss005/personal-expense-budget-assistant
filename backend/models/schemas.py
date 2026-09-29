from pydantic import BaseModel
from typing import Optional, List


class Transaction(BaseModel):
    description: str
    amount: float
    type: str
    category: str = "unknown"
    frequency: str = "one_time"
    date: str


class AnalyzerResult(BaseModel):
    intent: str
    transactions: List[Transaction] = []
    question: Optional[str] = None


class PlannerResult(BaseModel):
    income: float
    total_expenses: float
    remaining: float
    budget_status: list
    goal_status: list
    required_savings: list
    affordability: Optional[dict] = None


class AdvisorResult(BaseModel):
    summary: str
    insights: List[str]
    suggestions: List[str]

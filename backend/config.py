import os
from dotenv import load_dotenv
from crewai import LLM

load_dotenv()

def get_llm():
    return LLM(
        model="gemini/gemini-3.5-flash-lite",
        api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.2
    )
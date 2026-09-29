from crewai import Crew, Process

from agents.analyzer import create_analyzer, create_analyzer_task


def run_analyzer(user_message, llm):

    analyzer = create_analyzer(llm)

    task = create_analyzer_task(
        analyzer,
        user_message
    )

    crew = Crew(
        agents=[analyzer],
        tasks=[task],
        process=Process.sequential,
        verbose=False
    )

    return crew.kickoff()
from groq import Groq

from app.core.config import settings


client = Groq(
    api_key=settings.groq_api_key
)


def analyze_code(files):
    """
    Analyze a repository using Groq Llama 3.3 70B.
    """

    combined_code = ""

    for file in files:

        # Prevent the prompt from becoming too large
        if len(combined_code) > 30000:
            break

        combined_code += f"""

FILE:
{file['path']}

CODE:
{file['content'][:3000]}

"""

    prompt = f"""
You are CodeDoctor AI.

You are a senior software engineer, security expert,
software architect, and code reviewer.

Analyze the following repository thoroughly.

Provide your response in Markdown with these sections:

# Project Summary
Give a short summary of what the project does.

# Architecture Overview
Explain the project structure and technologies used.

# Bugs & Potential Errors
List possible bugs or risky code.

# Security Vulnerabilities
Mention security issues if any.

# Performance Issues
Suggest performance improvements.

# Code Quality Review
Comment on readability, maintainability, naming, duplication, etc.

# Best Practice Suggestions
Recommend improvements following industry standards.

# Overall Score
Give an overall score out of 100 and explain why.

Repository Code:

{combined_code}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert software engineer and code reviewer. "
                    "Give detailed, practical, and accurate feedback."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        max_tokens=2048,
    )

    return response.choices[0].message.content
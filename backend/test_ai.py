from app.services.groq_service import analyze_code


files = [
    {
        "path": "main.py",
        "content": """
password = "12345"

def login():
    print(password)
"""
    }
]


result = analyze_code(files)

print(result)
import re

KEYWORDS = ["shall", "must", "required", "mandatory"]

def extract_requirements(text):
    sentences = re.split(r'(?<=[.!?]) +', text)

    requirements = []

    for s in sentences:
        if any(k in s.lower() for k in KEYWORDS):
            requirements.append(s.strip())

    return requirements
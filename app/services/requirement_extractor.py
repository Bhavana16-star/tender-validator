import re
from app.services.categorizer import categorize_requirement, get_priority

KEYWORDS = ["shall", "must", "required", "mandatory"]

def extract_requirements(text):

    sentences = re.split(r'(?<=[.!?]) +', text)

    requirements = []

    for s in sentences:
        if any(k in s.lower() for k in KEYWORDS):

            requirements.append({
                "text": s.strip(),
                "category": categorize_requirement(s),
                "priority": get_priority(s)
            })

    return requirements
RISK_PHRASES = [
    "subject to change",
    "limited liability",
    "may apply",
    "pending approval"
]

def detect_risks(text):

    risks = []

    for phrase in RISK_PHRASES:
        if phrase in text.lower():
            risks.append({
                "phrase": phrase,
                "risk": "Potential legal/financial issue"
            })

    return risks
RISK_PHRASES = {
    "subject to change": 30,
    "limited liability": 50,
    "may apply": 20,
    "pending approval": 25
}

def detect_risks(text):

    risks = []
    total_score = 0

    text_lower = text.lower()

    for phrase, score in RISK_PHRASES.items():
        if phrase in text_lower:
            risks.append({
                "phrase": phrase,
                "risk_score": score,
                "impact": "May introduce legal or financial uncertainty"
            })
            total_score += score

    return {
        "risks": risks,
        "total_risk_score": total_score
    }
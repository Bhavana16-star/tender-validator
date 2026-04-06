from fastapi import APIRouter
from app.services.matcher import match_requirements
from app.services.risk_detector import detect_risks

router = APIRouter()

@router.post("/validate")
def validate(data: dict):

    requirements = data["requirements"]
    proposal_text = data["proposal_text"]

    matches = match_requirements(requirements, proposal_text)

    # ✅ Compliance Score
    matched_count = sum(1 for r in matches if r["status"] == "Matched")
    total = len(matches)

    compliance_score = (matched_count / total) * 100 if total > 0 else 0

    # ✅ Risk Detection
    risk_data = detect_risks(proposal_text)

    return {
        "compliance_score": round(compliance_score, 2),
        "matches": matches,
        "risk_summary": risk_data
    }
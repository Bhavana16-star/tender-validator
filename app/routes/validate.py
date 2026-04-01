from fastapi import APIRouter
from app.services.matcher import match_requirements
from app.services.risk_detector import detect_risks

router = APIRouter()

@router.post("/validate")
def validate(data: dict):

    requirements = data["requirements"]
    proposal_text = data["proposal_text"]

    matches = match_requirements(requirements, proposal_text)
    risks = detect_risks(proposal_text)

    return {
        "matches": matches,
        "risks": risks
    }
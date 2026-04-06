def categorize_requirement(req):

    req_lower = req.lower()

    if any(word in req_lower for word in ["payment", "cost", "price", "fee"]):
        return "Financial"

    elif any(word in req_lower for word in ["law", "compliance", "liability", "contract"]):
        return "Legal"

    elif any(word in req_lower for word in ["system", "support", "performance", "technical"]):
        return "Technical"

    return "General"


def get_priority(req):
    req_lower = req.lower()

    if "must" in req_lower or "mandatory" in req_lower:
        return "High"
    elif "shall" in req_lower:
        return "Medium"
    else:
        return "Low"
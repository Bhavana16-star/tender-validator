from sentence_transformers import SentenceTransformer, util
import re

model = SentenceTransformer('all-MiniLM-L6-v2')

def match_requirements(requirements, proposal_text):

    sentences = re.split(r'(?<=[.!?]) +', proposal_text)
    sentences = [s.strip() for s in sentences if s.strip()]

    # Encode once (FAST)
    req_texts = [r["text"] for r in requirements]
    req_embeddings = model.encode(req_texts)

    sent_embeddings = model.encode(sentences)

    results = []

    for i, req_emb in enumerate(req_embeddings):

        best_score = 0
        best_match = ""

        for j, sent_emb in enumerate(sent_embeddings):

            score = util.cos_sim(req_emb, sent_emb)
            score = float(score)

            if score > best_score:
                best_score = score
                best_match = sentences[j]

        # Status classification
        if best_score > 0.75:
            status = "Matched"
        elif best_score > 0.5:
            status = "Insufficient"
        else:
            status = "Missing"

        results.append({
            "requirement": requirements[i]["text"],
            "category": requirements[i]["category"],
            "priority": requirements[i]["priority"],
            "match": best_match,
            "score": round(best_score, 2),
            "status": status,
            "confidence": f"{best_score*100:.1f}%",
            "explanation": "Semantic similarity used for matching"
        })

    return results
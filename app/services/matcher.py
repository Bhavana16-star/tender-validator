from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def match_requirements(requirements, proposal_text):

    proposal_sentences = proposal_text.split('.')

    results = []

    for req in requirements:
        best_score = 0
        best_match = ""

        for sent in proposal_sentences:
            if sent.strip() == "":
                continue

            score = util.cos_sim(
                model.encode(req),
                model.encode(sent)
            )

            score = float(score)

            if score > best_score:
                best_score = score
                best_match = sent

        if best_score > 0.7:
            status = "Matched"
        elif best_score > 0.4:
            status = "Weak Match"
        else:
            status = "Missing"

        results.append({
            "requirement": req,
            "match": best_match,
            "score": round(best_score, 2),
            "status": status,
            "explanation": f"Similarity score {best_score:.2f}"
        })

    return results
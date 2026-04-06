export const api = {
  uploadFile: async (fileType, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Determine endpoint based on file type
    const endpoint = fileType === 'RFP' ? '/api/upload-rfp' : '/api/upload-proposal';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
        throw new Error(`Upload failed for ${fileType}`);
    }
    
    return response.json();
  },
  
  validateCompliance: async (rfpData, proposalData) => {
    // rfpData should contain { requirements: [...] }
    // proposalData should contain { proposal_text: "..." }
    
    const payload = {
        requirements: rfpData.requirements,
        proposal_text: proposalData.proposal_text
    };
    
    const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        throw new Error('Validation failed');
    }
    
    const rawData = await response.json();
    return adaptValidationData(rawData, rfpData.requirements);
  }
};

// Adapter to transform backend response fields to what the frontend expects
function adaptValidationData(backendData, originalRequirements) {
    const rawMatches = backendData.matches || [];
    
    const reqs = rawMatches.map(match => {
        // Find original ID or create one
        const orig = originalRequirements.find(r => r.text === match.requirement) || {};
        
        return {
            id: orig.id || Math.random().toString(),
            text: match.requirement,
            category: match.category || "General",
            priority: match.priority || "Medium",
            status: match.status, // "Matched", "Insufficient", "Missing"
            confidence: match.score || 0, // 0.0 to 1.0
            matchedSentence: match.match || null
        };
    });

    return {
        score: Math.round(backendData.compliance_score || 0),
        totalRequirements: rawMatches.length,
        matched: rawMatches.filter(r => r.status === 'Matched').length,
        insufficient: rawMatches.filter(r => r.status === 'Insufficient').length,
        missing: rawMatches.filter(r => r.status === 'Missing').length,
        requirements: reqs,
        risks: (backendData.risk_summary?.risks || []).map((risk, index) => ({
            id: index + 1,
            phrase: risk.phrase,
            score: risk.risk_score,
            impact: risk.impact
        }))
    };
}

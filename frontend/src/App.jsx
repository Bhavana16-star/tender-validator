import { useState } from 'react';
import UploadSection from './components/UploadSection';
import RequirementsTable from './components/RequirementsTable';
import ValidationDashboard from './components/ValidationDashboard';
import RiskAnalysis from './components/RiskAnalysis';
import { api } from './services/api';

function App() {
  const [view, setView] = useState('UPLOAD'); // UPLOAD, RESULTS
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rfpFile, setRfpFile] = useState(null);
  const [proposalFile, setProposalFile] = useState(null);
  const [validationData, setValidationData] = useState(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const rfpData = await api.uploadFile('RFP', rfpFile);
      const proposalData = await api.uploadFile('Proposal', proposalFile);
      const data = await api.validateCompliance(rfpData, proposalData);
      setValidationData(data);
      setView('RESULTS');
    } catch (error) {
      console.error(error);
      alert('Error during analysis. See console.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setView('UPLOAD');
    setRfpFile(null);
    setProposalFile(null);
    setValidationData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
            <div className="bg-blue-600 p-2 rounded-lg text-white font-bold flex items-center justify-center w-10 h-10 shadow-lg shadow-blue-500/20">
              TV
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight">
              Tender Compliance Validator
            </h1>
          </div>
          {view === 'RESULTS' && (
            <button onClick={reset} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              Start New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="p-6 md:p-12">
        {view === 'UPLOAD' && (
          <UploadSection 
            rfpFile={rfpFile} 
            setRfpFile={setRfpFile} 
            proposalFile={proposalFile} 
            setProposalFile={setProposalFile} 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
          />
        )}

        {view === 'RESULTS' && validationData && (
          <div className="space-y-12 pb-20">
            <div className="text-center animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Analysis Complete</h2>
              <p className="text-slate-500 mt-2">Displaying compliance results for {proposalFile?.name}</p>
            </div>
            
            <RequirementsTable requirements={validationData.requirements} />
            <ValidationDashboard data={validationData} />
            <RiskAnalysis risks={validationData.risks} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

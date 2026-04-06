import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function UploadSection({ rfpFile, setRfpFile, proposalFile, setProposalFile, onAnalyze, isAnalyzing }) {
  const handleFileChange = (setter) => (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const isReady = rfpFile && proposalFile;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-light text-slate-800 mb-4 tracking-tight">Upload Documents</h2>
        <p className="text-slate-500">Submit the official RFP and the vendor's proposal to begin compliance analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <UploadCard title="Upload RFP (PDF)" file={rfpFile} onChange={handleFileChange(setRfpFile)} />
        <UploadCard title="Upload Vendor Proposal (PDF)" file={proposalFile} onChange={handleFileChange(setProposalFile)} />
      </div>

      <div className="flex justify-center">
        <button
          onClick={onAnalyze}
          disabled={!isReady || isAnalyzing}
          className={`
            relative px-8 py-4 rounded-xl text-lg font-semibold tracking-wide shadow-lg transition-all duration-300
            ${isReady && !isAnalyzing ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Compliance...
            </span>
          ) : (
            'Analyze Compliance'
          )}
        </button>
      </div>
    </div>
  );
}

function UploadCard({ title, file, onChange }) {
  return (
    <div className="glass-card hover:-translate-y-1 transition-transform duration-300">
      <label className="flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px] cursor-pointer group">
        <input type="file" className="hidden" accept=".pdf" onChange={onChange} />
        {file ? (
          <div className="flex flex-col items-center text-emerald-600 space-y-3">
            <div className="bg-emerald-100 p-3 rounded-full">
               <CheckCircle2 size={32} />
            </div>
            <p className="font-medium text-center truncate max-w-[200px]">{file.name}</p>
            <p className="text-xs text-slate-500">Click to change file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-slate-400 group-hover:text-blue-500 transition-colors space-y-3">
            <div className="bg-slate-100 group-hover:bg-blue-50 p-3 rounded-full transition-colors">
              <UploadCloud size={32} />
            </div>
            <p className="font-medium">{title}</p>
            <p className="text-xs text-slate-400">PDF up to 50MB</p>
          </div>
        )}
      </label>
    </div>
  );
}

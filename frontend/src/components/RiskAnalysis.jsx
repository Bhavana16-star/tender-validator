import { ShieldAlert } from 'lucide-react';

export default function RiskAnalysis({ risks }) {
  if (!risks || risks.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="text-purple-600" size={28} />
        <h3 className="text-xl font-bold tracking-tight text-slate-800">Risk Analysis Panel</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map(risk => (
          <div key={risk.id} className="glass-card p-5 border-l-4 border-purple-500 bg-purple-50/30">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-slate-800">"{risk.phrase}"</h4>
              <span className="shrink-0 bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold font-mono">
                Risk: {risk.score}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-2">{risk.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

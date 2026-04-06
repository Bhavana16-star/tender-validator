import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function ValidationDashboard({ data }) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 flex flex-col items-center justify-center col-span-1 md:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-500/30">
          <p className="text-blue-100 text-sm font-medium tracking-wider uppercase mb-2">Compliance Score</p>
          <div className="text-6xl font-bold">{data.score}%</div>
        </div>
        
        <div className="glass-card p-6 col-span-1 md:col-span-3 grid grid-cols-3 gap-4">
           <StatBox label="Total Requirements" value={data.totalRequirements} />
           <StatBox label="Matched" value={data.matched} color="text-emerald-600" />
           <div className="flex flex-col">
             <StatBox label="Insufficient" value={data.insufficient} color="text-amber-500" inline />
             <StatBox label="Missing" value={data.missing} color="text-rose-500" inline />
           </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold tracking-tight text-slate-800 mb-6">Detailed Requirement Analysis</h3>
        <div className="space-y-4">
          {data.requirements.map(req => (
            <RequirementCard key={req.id} req={req} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color = "text-slate-700", inline = false }) {
  if (inline) {
    return (
      <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 last:pb-0 font-medium">
        <span className="text-slate-500 text-sm uppercase tracking-wider">{label}</span>
        <span className={`text-xl ${color}`}>{value}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0">
      <p className="text-slate-400 text-xs font-medium tracking-wider uppercase mb-2">{label}</p>
      <p className={`text-4xl font-light ${color}`}>{value}</p>
    </div>
  );
}

function RequirementCard({ req }) {
  const statusStyles = {
    Matched: {
      bg: "bg-emerald-50/50",
      border: "border-emerald-200",
      icon: <CheckCircle className="text-emerald-500" size={24} />,
      badge: "bg-emerald-100 text-emerald-700"
    },
    Insufficient: {
      bg: "bg-amber-50/50",
      border: "border-amber-200",
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      badge: "bg-amber-100 text-amber-700"
    },
    Missing: {
      bg: "bg-rose-50/50",
      border: "border-rose-200",
      icon: <XCircle className="text-rose-500" size={24} />,
      badge: "bg-rose-100 text-rose-700"
    }
  }[req.status];

  return (
    <div className={`glass-card p-6 border-l-4 transition-all duration-300 hover:shadow-md ${statusStyles.bg} ${statusStyles.border}`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">{statusStyles.icon}</div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start gap-4">
            <p className="text-slate-800 font-medium leading-relaxed">{req.text}</p>
            <div className="flex gap-2 shrink-0">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles.badge}`}>
                {req.status}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                {req.category}
              </span>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${req.priority === 'High' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                {req.priority}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">Confidence: </span>
            <div className="flex-1 max-w-[200px] h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${req.confidence > 0.8 ? 'bg-emerald-500' : req.confidence > 0.5 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                style={{ width: `${Math.round(req.confidence * 100)}%` }}
              />
            </div>
            <span className="font-medium text-slate-700 font-mono">{Math.round(req.confidence * 100)}%</span>
          </div>

          {req.matchedSentence && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-slate-100 shadow-sm inline-block w-full">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Matched Proposal Text</p>
              <p className="text-sm text-slate-700 italic">"{req.matchedSentence}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

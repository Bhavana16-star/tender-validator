export default function RequirementsTable({ requirements }) {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 mb-12 animate-in fade-in zoom-in duration-700 delay-100">
      <h3 className="text-2xl font-bold tracking-tight text-slate-800 mb-6">Extracted Requirements</h3>
      
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-slate-700 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Requirement Text</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requirements.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-medium leading-relaxed">
                    {req.text}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
                      {req.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full font-medium text-xs ${req.priority === 'High' ? 'bg-purple-100 text-purple-700' : req.priority === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                      {req.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

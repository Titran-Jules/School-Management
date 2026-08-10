export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-400">
          School Management
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Frontend React + TypeScript + Tailwind CSS v4
        </p>
        <div className="mt-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ⚡ Vite Dev Server Ready
          </span>
        </div>
      </div>
    </div>
  );
}
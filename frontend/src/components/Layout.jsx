export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* Improved Header */}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Well Log Analysis Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              LAS Visualization & AI-Assisted Interpretation
            </p>
          </div>

          <div className="text-sm text-gray-400">
            FastAPI + React
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {children}
      </main>

    </div>
  );
}

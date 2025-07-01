// DashboardLayout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-green-500 p-5">
      <div className="bg-white rounded-2xl overflow-hidden flex min-h-[90vh]">
        {/* Sidebar */}
        <aside className="w-1/5 bg-green-400 p-6">
          <div className="text-white font-bold text-xl mb-8">
            <span className="text-black">🗑️ Trash</span><span className="text-white">it</span>
          </div>
          {/* Add sidebar links here */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

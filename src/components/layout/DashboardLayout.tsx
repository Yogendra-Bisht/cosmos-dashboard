import { Sidebar } from './Sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 max-h-screen overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}

import { Home, FileSearch, FileText, Settings } from 'lucide-react';

type Screen = 'landing' | 'progress' | 'dashboard' | 'report';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  hasAuditData: boolean;
}

export function Sidebar({ currentScreen, onNavigate, hasAuditData }: SidebarProps) {
  const navItems = [
    { id: 'landing' as Screen, label: 'Home', icon: Home },
    { id: 'dashboard' as Screen, label: 'Scans', icon: FileSearch, disabled: !hasAuditData },
    { id: 'report' as Screen, label: 'Reports', icon: FileText, disabled: !hasAuditData },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center">
            <FileSearch className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-900">A11y Audit AI</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            const isDisabled = item.disabled;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => !isDisabled && onNavigate(item.id)}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#0066CC] text-white' 
                      : isDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

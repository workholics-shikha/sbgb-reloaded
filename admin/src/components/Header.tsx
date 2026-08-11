import { Menu, Bell, LogOut } from 'lucide-react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header
      className="px-6 py-0 flex items-center justify-between sticky top-0 z-20 bg-[length:40px_22px]
    bg-[linear-gradient(135deg,transparent_33%,rgba(255,255,255,0.020)_33%,rgba(255,255,255,0.020)_36%,transparent_36%),linear-gradient(225deg,transparent_33%,rgba(255,255,255,0.020)_33%,rgba(255,255,255,0.020)_36%,transparent_36%)]"
      style={{ backgroundColor: '#094036', minHeight: '50px' }}
    >
      {/* Left: menu + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="w-8 h-8 rounded flex items-center justify-center transition-colors"
          style={{ color: 'rgba(255,255,255,0.7)' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = '')
          }
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0"
            style={{ backgroundColor: '#2e7d52' }}
          >
            S
          </div>
          <span className="text-white/90 text-sm font-semibold tracking-wide">SBGBT</span>
          <span className="text-white/30 text-sm">|</span>
          <span className="text-yellow-400 text-xs font-medium">Admin Dashboard</span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button
          className="relative w-8 h-8 rounded flex items-center justify-center transition-colors"
          style={{ color: 'rgba(255,255,255,0.7)' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = '')
          }
        >
          <Bell size={17} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: '#e8a317' }}
          />
        </button>

        <div className="h-6 w-px mx-1" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        <div className="flex items-center gap-2 pr-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: '#e8a317' }}
          >
            A
          </div>
          <span className="hidden md:block text-white/80 text-xs font-medium">Admin</span>
        </div>

        <button
          className="w-8 h-8 rounded flex items-center justify-center transition-colors ml-1"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          title="Logout"
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = '')
          }
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}

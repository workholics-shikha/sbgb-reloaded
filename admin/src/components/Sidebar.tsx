import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Image,
  Tag,
  Zap,
  ListTree,
  FileText,
  CalendarDays,
  Film,
  Images,
  Link2,
  Video,
  BookOpen,
  BookMarked,
  Users,
  HeartHandshake,
  HandCoins,
  Landmark,
  ArrowLeftRight,
  Settings,
  Upload,
  GraduationCap,
  UserPlus,
  Phone,
  MessageSquare,
  ClipboardList,
  Layers3,
  MapPinned,
  Building2,
  Quote,
  ChevronRight,
} from 'lucide-react';
import sbgbLogo from "@/assets/images/sbgb-logo.png";
import { motion } from "framer-motion";
import { getPublicAppUrl } from '@/lib/auth';

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  external?: boolean;
};

type NavGroup = {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  children: NavItem[];
};

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/sliders', label: 'Sliders', icon: Image },
  { to: '/categories', label: 'Categories', icon: Tag },
  { to: '/activities', label: 'Activities', icon: Zap },
  { to: '/inner-activities', label: 'Inner Activities', icon: ListTree },
  { to: '/articles', label: 'Articles', icon: FileText },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/media', label: 'Media', icon: Film },
  { to: '/galleries', label: 'Galleries', icon: Images },
  { to: '/important-links', label: 'Important Links', icon: Link2 },
  { to: '/videos', label: 'Videos', icon: Video },
  { to: '/patrika', label: 'Patrika', icon: BookOpen },
  { to: '/stories', label: 'Stories', icon: BookMarked },
  { to: '/sbgbt-members', label: 'SBGBT Members', icon: Users },
  { to: '/donations', label: 'Donations', icon: HandCoins },
  { to: '/csr-partnership', label: 'CSR Partnership', icon: HeartHandshake },
  { to: '/registered-spgbp', label: 'Registered SPGBP', icon: Landmark },
  { to: '/transaction-management', label: 'Transaction Management', icon: ArrowLeftRight },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/upload-results', label: 'Upload Results', icon: Upload },
  { to: '/registered-students', label: 'Registered Students', icon: GraduationCap },
  { to: `${getPublicAppUrl()}/utthan-coaching-organizations`, label: 'Register New Student', icon: UserPlus, external: true },
  { to: '/contacts', label: 'Contacts', icon: Phone },
  { to: '/users-feedback', label: 'Users Feedback', icon: MessageSquare },
];

const navGroups: NavGroup[] = [
  {
    id: 'samaroh-registration',
    label: 'Samaroh Registration',
    icon: ClipboardList,
    children: [
      { to: '/brilliant-students', label: 'Brilliant Students', icon: GraduationCap },
      { to: '/appointed-employees', label: 'Selected Employee', icon: UserPlus },
      { to: '/retired-employees', label: 'Retired Employee', icon: Users },
      { to: '/special-achievements', label: 'Special Achievement', icon: Quote },
    ],
  },
  {
    id: 'masters',
    label: 'Masters',
    icon: Layers3,
    children: [
      { to: '/state-list', label: 'State List', icon: MapPinned },
      { to: '/city-list', label: 'City List', icon: Building2 },
      { to: '/testimonial-list', label: 'Testimonial List', icon: MessageSquare },
      { to: '/coaching-organizations', label: 'Coaching Organizations', icon: Landmark },
    ],
  },
];

/* Mimics the SBGBT footer texture:
   dark forest green base with scattered lighter-green radial blobs
   that simulate bokeh light through a leaf canopy. */
const sidebarTexture = {
  background: `
    radial-gradient(ellipse 80px 60px at 18% 8%,  rgba(34,120,70,0.55) 0%, transparent 70%),
    radial-gradient(ellipse 50px 50px at 85% 15%,  rgba(20,90,50,0.5)  0%, transparent 65%),
    radial-gradient(ellipse 90px 70px at 55% 28%,  rgba(28,105,58,0.45) 0%, transparent 65%),
    radial-gradient(ellipse 40px 40px at 10% 38%,  rgba(40,130,72,0.4)  0%, transparent 60%),
    radial-gradient(ellipse 70px 55px at 90% 42%,  rgba(22,95,52,0.5)   0%, transparent 65%),
    radial-gradient(ellipse 60px 80px at 35% 55%,  rgba(30,110,62,0.45) 0%, transparent 68%),
    radial-gradient(ellipse 45px 45px at 72% 60%,  rgba(38,125,68,0.4)  0%, transparent 60%),
    radial-gradient(ellipse 85px 60px at 15% 68%,  rgba(24,98,54,0.5)   0%, transparent 65%),
    radial-gradient(ellipse 55px 70px at 60% 75%,  rgba(32,115,65,0.45) 0%, transparent 68%),
    radial-gradient(ellipse 50px 40px at 88% 80%,  rgba(18,85,48,0.45)  0%, transparent 62%),
    radial-gradient(ellipse 65px 55px at 30% 88%,  rgba(36,120,66,0.4)  0%, transparent 65%),
    radial-gradient(ellipse 75px 50px at 75% 92%,  rgba(26,102,56,0.5)  0%, transparent 65%),
    radial-gradient(ellipse 40px 40px at 50% 95%,  rgba(42,132,70,0.35) 0%, transparent 60%),
    #0d3d22
  `.replace(/\n\s+/g, ' '),
};

export default function Sidebar() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  function isItemActive(to: string) {
    return to === '/' ? location.pathname === '/' : location.pathname === to;
  }

  function isGroupActive(children: NavItem[]) {
    return children.some((child) => isItemActive(child.to));
  }

  useEffect(() => {
    setOpenGroups((current) => {
      const next = { ...current };
      navGroups.forEach((group) => {
        if (isGroupActive(group.children) && current[group.id] !== true) {
          next[group.id] = true;
        }
      });
      return next;
    });
  }, [location.pathname]);

  function toggleGroup(groupId: string) {
    setOpenGroups((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  }

  return (
    <aside className="sticky top-0 h-screen w-60 flex-shrink-0 overflow-hidden bg-[linear-gradient(135deg,#083a32_0%,#0d4b3e_48%,#08352d_100%)] text-cream flex flex-col relative">
      {/* Light Zigzag Pattern */}
      <div
  className="absolute inset-0 z-0 pointer-events-none
    bg-[length:40px_22px]
    bg-[linear-gradient(135deg,transparent_33%,rgba(255,255,255,0.020)_33%,rgba(255,255,255,0.020)_36%,transparent_36%),linear-gradient(225deg,transparent_33%,rgba(255,255,255,0.020)_33%,rgba(255,255,255,0.020)_36%,transparent_36%)]"
/>

      {/* All content sits above the overlays */}
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {/* Logo */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="grid size-[58px] shrink-0 place-items-center rounded-full bg-white shadow-[0_16px_30px_-24px_rgba(0,0,0,0.5)] ring-1 ring-[#143c35]/10"
          >
            <img
              src={sbgbLogo}
              alt="SBGBT logo"
              width={42}
              height={42}
              className="size-[42px] object-contain"
            />
          </motion.div>

          <div>
            <h1 className="text-white font-bold text-base leading-none tracking-wide">SBGBT-Admin</h1>
            <p
              className="text-[10px] mt-1 leading-none font-medium tracking-widest uppercase"
              style={{ color: '#e8a317' }}
            > SBGBT Management </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="scrollbar-thin flex-1 overflow-y-auto py-2">
          <p className="px-5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Main Menu
          </p>
          {navItems.map(({ to, label, icon: Icon, external }) => {
            const isActive = isItemActive(to);
            if (external) {
              return (
                <a
                  key={to}
                  href={to}
                  className="flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-lg text-sm transition-all duration-150 text-white/60 hover:text-white"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.09)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '';
                  }}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span>{label}</span>
                </a>
              );
            }

            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={`flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-lg text-sm transition-all duration-150 ${isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                style={
                  isActive
                    ? {
                      background: 'linear-gradient(135deg, #e8a317 0%, #c47d10 100%)',
                      boxShadow: '0 4px 14px rgba(232,163,23,0.4)',
                    }
                    : {}
                }
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.09)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor = '';
                }}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span>{label}</span>
              </NavLink>
            );
          })}

          {navGroups.map(({ id, label, icon: Icon, children }) => {
            const isActive = isGroupActive(children);
            const isOpen = openGroups[id] ?? isActive;
            return (
              <div key={label} className="mx-2 my-1 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleGroup(id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${isActive ? 'text-white font-semibold' : 'text-white/75'
                    }`}
                  style={
                    isActive
                      ? {
                        background: 'rgba(255,255,255,0.1)',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                      }
                      : {}
                  }
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight
                    size={15}
                    className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                </button>
                {isOpen && <div className="mt-1 pl-3">
                  {children.map(({ to, label: childLabel, icon: ChildIcon }) => {
                    const childActive = isItemActive(to);
                    return (
                      <NavLink
                        key={to}
                        to={to}
                        className={`flex items-center gap-3 px-4 py-2 my-0.5 rounded-lg text-sm transition-all duration-150 ${childActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                          }`}
                        style={
                          childActive
                            ? {
                              background: 'linear-gradient(135deg, #e8a317 0%, #c47d10 100%)',
                              boxShadow: '0 4px 14px rgba(232,163,23,0.35)',
                            }
                            : {}
                        }
                        onMouseEnter={(e) => {
                          if (!childActive) {
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              'rgba(255,255,255,0.09)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!childActive) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '';
                          }
                        }}
                      >
                        <ChildIcon size={15} className="flex-shrink-0" />
                        <span>{childLabel}</span>
                      </NavLink>
                    );
                  })}
                </div>}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-[11px] text-center text-white/25">
            SBGBT Admin Panel &copy; 2026
          </p>
        </div>
      </div>
    </aside>
  );
}

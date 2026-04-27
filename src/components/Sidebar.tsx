import { LayoutDashboard, Wallet, Users, Bell, Settings, LogOut, FileText, GraduationCap, ChevronRight, ChevronLeft, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const menuGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'اللوحة الرئيسية', icon: LayoutDashboard },
    ]
  },
  {
    title: 'ACADEMIC',
    items: [
      { id: 'student_files', label: 'ملفات الطلاب', icon: GraduationCap },
      { id: 'students', label: 'إدارة الطلاب', icon: Users },
      { id: 'attendance', label: 'الحضور والغياب', icon: Bell },
      { id: 'knights', label: 'فرسان نيوماين', icon: Trophy },
      { id: 'parents_reports', label: 'تقارير الأهالي', icon: FileText },
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'revenue', label: 'الإيرادات والشؤون المالية', icon: Wallet },
      { id: 'settings', label: 'إعدادات المدرسة', icon: Settings },
    ]
  }
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 100 : 256 }}
      className="h-full glass-sidebar flex flex-col border-l border-white/5 font-tajawal relative z-50"
      dir="rtl"
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-neomine-dark border border-white/10 rounded-r-xl flex items-center justify-center text-white/40 hover:text-neomine-teal transition-colors z-50 shadow-xl"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      <div className={`p-8 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center shadow-lg shadow-neomine-teal/20 shrink-0">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col animate-in fade-in duration-500">
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">
              NEOMINE
            </h1>
            <span className="text-[10px] text-neomine-teal font-bold tracking-widest mt-0.5 opacity-80 uppercase leading-none">Manjam</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            {!isCollapsed && (
              <h3 className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] animate-in fade-in duration-500">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  whileHover={{ x: isCollapsed ? 0 : -10 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                    activeTab === item.id 
                    ? 'bg-neomine-teal/10 text-neomine-teal border border-neomine-teal/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${
                    activeTab === item.id ? 'text-neomine-teal' : 'group-hover:text-neomine-teal'
                  }`} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate animate-in fade-in slide-in-from-right-4 duration-500">
                      {item.label}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 mt-4 border-t border-white/5">
          <motion.button
            onClick={onLogout}
            whileHover={{ x: isCollapsed ? 0 : -10 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group text-white/50 hover:text-red-400 hover:bg-red-400/5 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5 shrink-0 transition-colors group-hover:text-red-400" />
            {!isCollapsed && (
              <span className="text-sm font-medium truncate animate-in fade-in duration-500">تسجيل الخروج</span>
            )}
          </motion.button>
        </div>
      </nav>

      <div className={`p-6 border-t border-white/5 ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`bg-white/5 rounded-2xl p-4 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-700 to-gray-800 border border-white/10 shrink-0" />
          {!isCollapsed && (
            <div className="flex flex-col truncate animate-in fade-in duration-500">
              <span className="text-xs font-semibold text-white truncate">أدمن المدرسة</span>
              <span className="text-[10px] text-white/40 truncate">admin@neomine.edu</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

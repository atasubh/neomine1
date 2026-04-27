import { LayoutDashboard, Compass, ClipboardList, Sparkles, Settings, LogOut, Trophy, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const studentMenuItems = [
  { id: 'daily_learning', label: 'لوحة التعلم اليومي', icon: LayoutDashboard },
  { id: 'my_profile', label: 'ملفي الشخصي', icon: User },
  { id: 'tracks', label: 'مساراتي التعليمية', icon: Compass },
  { id: 'grades', label: 'سجل الحضور والدرجات', icon: ClipboardList },
  { id: 'leaderboard', label: 'لوحة المتصدرين', icon: Trophy },
  { id: 'ai', label: 'مساعد نيوماين الذكي', icon: Sparkles },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

interface StudentSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function StudentSidebar({ 
  activeTab, 
  setActiveTab, 
  onLogout, 
  isCollapsed, 
  setIsCollapsed 
}: StudentSidebarProps) {
  const isWhiteTheme = true; // Force white theme for student sidebar as requested

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 100 : 288 }}
      className={`h-full ${isWhiteTheme ? 'bg-white border-l border-[#E2E8F0]' : 'bg-[#0b1120] border-l border-white/5'} flex flex-col shadow-2xl font-tajawal relative z-50`}
      dir="rtl"
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 ${isWhiteTheme ? 'bg-white border-[#E2E8F0] text-[#64748B]' : 'bg-[#0b1120] border border-white/10 text-white/40'} border rounded-r-xl flex items-center justify-center hover:text-neomine-blue transition-colors z-50 shadow-xl`}
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Brand */}
      <div className={`p-8 flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-neomine-blue to-neomine-blue/80 flex items-center justify-center shadow-lg shadow-neomine-blue/20 shrink-0">
          <span className="text-white font-bold text-2xl">N</span>
        </div>
        {!isCollapsed && (
          <h1 className={`text-2xl font-black tracking-tight ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} animate-in fade-in duration-500`}>
            نيوماين
          </h1>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 pt-4 overflow-y-auto custom-scrollbar">
        {studentMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
              activeTab === item.id 
              ? `text-neomine-blue ${isWhiteTheme ? 'bg-neomine-blue/5 border border-neomine-blue/10' : 'bg-neomine-teal/5 border border-neomine-teal/10'}` 
              : `${isWhiteTheme ? 'text-[#64748B] hover:text-[#0A1128] hover:bg-gray-50' : 'text-white/40 hover:text-white hover:bg-white/[0.02]'}`
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className={`w-6 h-6 shrink-0 transition-colors ${
              activeTab === item.id ? 'text-neomine-blue' : 'group-hover:text-neomine-blue/60'
            }`} />
            {!isCollapsed && (
              <span className="text-sm font-black truncate whitespace-nowrap animate-in fade-in slide-in-from-right-4 duration-500">
                {item.label}
              </span>
            )}
            
            {activeTab === item.id && !isCollapsed && (
              <motion.div 
                layoutId="activeStudentTab"
                className="absolute left-0 bottom-0 top-0 w-1 bg-neomine-blue shadow-[0_0_15px_rgba(0,123,255,0.3)]"
              />
            )}
          </button>
        ))}

        <div className={`pt-6 mt-4 border-t ${isWhiteTheme ? 'border-[#E2E8F0]' : 'border-white/5'}`}>
          <motion.button
            onClick={onLogout}
            whileHover={{ x: isCollapsed ? 0 : -10 }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isWhiteTheme ? 'text-[#64748B] hover:text-red-500 hover:bg-red-50' : 'text-white/30 hover:text-red-400 hover:bg-red-400/5'} ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-6 h-6 shrink-0 transition-colors group-hover:text-red-500" />
            {!isCollapsed && (
              <span className="text-sm font-black truncate animate-in fade-in duration-500">تسجيل الخروج</span>
            )}
          </motion.button>
        </div>
      </nav>

      {/* User Footer */}
      <div className={`p-6 border-t ${isWhiteTheme ? 'border-[#E2E8F0]' : 'border-white/5'} transition-all ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`${isWhiteTheme ? 'bg-gray-50 border-[#E2E8F0]' : 'bg-white/5 border-white/5'} rounded-2xl p-4 flex items-center gap-4 border transition-all ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-neomine-blue/20 to-neomine-blue/10 flex items-center justify-center border border-neomine-blue/10 shrink-0">
            <span className="text-neomine-blue font-bold text-base">ع</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate animate-in fade-in duration-500 text-right">
              <span className={`text-sm font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} truncate`}>عبدالله الشمري</span>
              <span className={`text-[9px] ${isWhiteTheme ? 'text-[#64748B]' : 'text-white/40'} font-bold uppercase tracking-widest leading-none mt-1`}>Student Pro</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StudentSidebar from './StudentSidebar';
import StudentDashboard from './StudentDashboard';
import Footer from './Footer';

interface StudentAppProps {
  onLogout: () => void;
}

export default function StudentApp({ onLogout }: StudentAppProps) {
  const [activeTab, setActiveTab] = useState('daily_learning');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-tajawal relative overflow-x-hidden selection:bg-neomine-teal/10" dir="rtl">
      {/* Subtle Background Pattern for White Theme */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#00C9B1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-black text-[#1A1A1A] tracking-tight">NEOMINE</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-gray-50 rounded-xl text-[#1A1A1A] hover:bg-gray-100 transition-all"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Structural Elements */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      </div>

      <div className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[100%] lg:translate-x-0'}`}>
        <StudentSidebar 
          activeTab={activeTab} 
          setActiveTab={handleSetActiveTab} 
          onLogout={onLogout} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Main Content */}
      <main 
        className={`min-h-screen flex flex-col p-4 md:p-8 lg:p-12 relative z-0 transition-all duration-300 ${
            isSidebarCollapsed 
              ? 'lg:mr-[100px]' 
              : 'lg:mr-[288px]'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex-1">
          <StudentDashboard activeTab={activeTab} isWhiteTheme={true} />
        </div>
        <Footer />
      </main>
    </div>
  );
}

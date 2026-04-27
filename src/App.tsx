import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Revenue from './components/Revenue';
import Attendance from './components/Attendance';
import AIAssistant from './components/AIAssistant';
import Settings from './components/Settings';
import StudentManagement from './components/StudentManagement';
import StudentProfile from './components/StudentProfile';
import StudentFilesManagement from './components/StudentFilesManagement';
import ParentsReports from './components/ParentsReports';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import StudentSidebar from './components/StudentSidebar';
import StaffApp from './components/StaffApp';
import StudentApp from './components/StudentApp';
import GlobalExcellenceHub from './components/GlobalExcellenceHub';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'student' | 'staff' | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Close sidebar when switching tabs on mobile
  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleLogin = (type: 'school' | 'student' | 'staff') => {
    setIsLoggedIn(true);
    setUserRole(type === 'school' ? 'admin' : type === 'student' ? 'student' : 'staff');
    setActiveTab(type === 'student' ? 'daily_learning' : 'dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveTab('dashboard');
    setSelectedStudent(null);
    setIsSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (userRole === 'staff') {
    return (
      <>
        <StaffApp onLogout={handleLogout} />
        <AIAssistant />
      </>
    );
  }

  if (userRole === 'student') {
    return (
      <>
        <StudentApp onLogout={handleLogout} />
        <AIAssistant />
      </>
    );
  }

  const renderContent = () => {
    // Admin/School UI
    if (selectedStudent) {
      return (
        <StudentProfile 
          student={selectedStudent} 
          onBack={() => setSelectedStudent(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'knights':
        return <GlobalExcellenceHub />;
      case 'student_files':
        return <StudentFilesManagement />;
      case 'parents_reports':
        return <ParentsReports />;
      case 'students':
        return <StudentManagement />;
      case 'revenue':
        return <Revenue />;
      case 'attendance':
        return <Attendance onSelectStudent={(s) => setSelectedStudent(s)} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-neomine-dark text-white font-tajawal relative overflow-x-hidden selection:bg-neomine-teal/30" dir="rtl">
      {/* Background Layer */}
      <div className="fixed inset-0 tech-dots pointer-events-none opacity-40" />
      <div className="fixed top-0 left-0 w-full h-full bg-linear-to-b from-neomine-teal/5 to-transparent pointer-events-none" />
      
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-neomine-dark/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-black text-white tracking-tight">NEOMINE</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Structural Elements */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      </div>

      <div className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[100%] lg:translate-x-0'}`}>
        {userRole === 'admin' ? (
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={handleSetActiveTab} 
            onLogout={handleLogout} 
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        ) : (
          <StudentSidebar 
            activeTab={activeTab} 
            setActiveTab={handleSetActiveTab} 
            onLogout={handleLogout} 
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        )}
      </div>

      {/* Main Content */}
      <main 
        className={`min-h-screen flex flex-col p-4 md:p-8 lg:p-12 relative z-0 transition-all duration-300 ${
          isLoggedIn && userRole ? (
            isSidebarCollapsed 
              ? 'lg:mr-[100px]' 
              : (userRole === 'admin' ? 'lg:mr-[256px]' : 'lg:mr-[288px]')
          ) : ''
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex-1">
          {renderContent()}
        </div>
        <Footer />
      </main>
      <AIAssistant />
    </div>
  );
}

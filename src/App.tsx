import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
import StudentSidebar from './components/StudentSidebar';
import StaffApp from './components/StaffApp';
import StudentApp from './components/StudentApp';
import GlobalExcellenceHub from './components/GlobalExcellenceHub';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'student' | 'staff' | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle direct navigation or external links
  useEffect(() => {
    if (location.pathname.startsWith('/student')) {
      setIsLoggedIn(true);
      setUserRole('student');
      if (activeTab === 'dashboard') setActiveTab('daily_learning');
    } else if (location.pathname.startsWith('/staff')) {
      setIsLoggedIn(true);
      setUserRole('staff');
      setActiveTab('dashboard');
    } else if (location.pathname.startsWith('/admin')) {
      setIsLoggedIn(true);
      setUserRole('admin');
      setActiveTab('dashboard');
    } else if (location.pathname === '/') {
      // If we are at root, we might want to preserve state if already logged in, 
      // but usually the landing page is for non-logged in users.
    }
  }, [location.pathname]);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleLogin = (type: 'school' | 'student' | 'staff') => {
    setIsLoggedIn(true);
    const role = type === 'school' ? 'admin' : type === 'student' ? 'student' : 'staff';
    setUserRole(role);
    setActiveTab(role === 'student' ? 'daily_learning' : 'dashboard');
    
    if (role === 'student') navigate('/student');
    else if (role === 'staff') navigate('/staff');
    else if (role === 'admin') navigate('/admin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveTab('dashboard');
    setSelectedStudent(null);
    setIsSidebarOpen(false);
    navigate('/');
  };

  // If not on root and not logged in (and not already at root via internal state), redirect to root
  // However, for this demo, we'll allow paths to trigger login state via useEffect above.

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
      <Route path="/student/*" element={<StudentApp onLogout={handleLogout} />} />
      <Route path="/staff/*" element={
        <>
          <StaffApp onLogout={handleLogout} />
          <AIAssistant />
        </>
      } />
      <Route path="/admin/*" element={
        <div className="min-h-screen bg-neomine-dark text-white font-tajawal relative overflow-x-hidden selection:bg-neomine-teal/30" dir="rtl">
          <div className="fixed inset-0 tech-dots pointer-events-none opacity-40" />
          <div className="fixed top-0 left-0 w-full h-full bg-linear-to-b from-neomine-teal/5 to-transparent pointer-events-none" />
          
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

          <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          </div>

          <div className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[100%] lg:translate-x-0'}`}>
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={handleSetActiveTab} 
              onLogout={handleLogout} 
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
            />
          </div>

          <main 
            className={`min-h-screen flex flex-col p-4 md:p-8 lg:p-12 relative z-0 transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:mr-[100px]' : 'lg:mr-[256px]'
            }`}
          >
            <div className="max-w-7xl mx-auto w-full flex-1">
              {selectedStudent ? (
                <StudentProfile student={selectedStudent} onBack={() => setSelectedStudent(null)} />
              ) : (
                <>
                  {activeTab === 'dashboard' && <Dashboard />}
                  {activeTab === 'knights' && <GlobalExcellenceHub />}
                  {activeTab === 'student_files' && <StudentFilesManagement />}
                  {activeTab === 'parents_reports' && <ParentsReports />}
                  {activeTab === 'students' && <StudentManagement />}
                  {activeTab === 'revenue' && <Revenue />}
                  {activeTab === 'attendance' && <Attendance onSelectStudent={(s) => setSelectedStudent(s)} />}
                  {activeTab === 'settings' && <Settings />}
                </>
              )}
            </div>
            <Footer />
          </main>
          <AIAssistant />
        </div>
      } />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


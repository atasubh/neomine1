import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Code, 
  ShieldCheck, 
  Zap, 
  Brain, 
  GraduationCap, 
  CheckCircle2, 
  X, 
  LogIn, 
  MapPin,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const paths = [
  { title: 'الذكاء الاصطناعي', icon: Brain, color: '#00C9B1', desc: 'مستقبل الآلات وتعلم العمق.' },
  { title: 'البرمجة', icon: Code, color: '#2E86FF', desc: 'بناء الحلول والبرمجيات المتقدمة.' },
  { title: 'الأمن السيبراني', icon: ShieldCheck, color: '#8884d8', desc: 'حماية الأنظمة والبيانات الرقمية.' },
  { title: 'القدرات', icon: Zap, color: '#FFBB28', desc: 'تطوير المهارات التحليلية والكمية.' },
  { title: 'التحصيلي', icon: GraduationCap, color: '#FF8042', desc: 'التميز في المواد العلمية والنظرية.' },
  { title: 'نافس', icon: Trophy, color: '#AF19FF', desc: 'المنافسة الدولية والوطنية بالعلوم.' },
];

function Trophy({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function DashboardMockup() {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto animate-float">
      <div className="absolute inset-0 side-glow opacity-60 blur-[100px] -z-10" />
      
      {/* Main Container */}
      <div className="absolute inset-0 glass-card rounded-[40px] p-6 shadow-2xl border-white/5 overflow-hidden">
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <div className="w-10 h-10 rounded-full bg-neomine-teal/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-neomine-teal" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-32 bg-white/10 rounded-full" />
            <div className="h-2 w-20 bg-white/5 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-32 bg-white/5 rounded-2xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-2 w-12 bg-white/10 rounded-full" />
              <TrendingUp className="w-4 h-4 text-neomine-teal opacity-50" />
            </div>
            <div className="h-8 w-20 bg-white/10 rounded-lg" />
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-neomine-teal" />
            </div>
          </div>
          <div className="h-32 bg-white/5 rounded-2xl p-4 space-y-4">
             <div className="h-2 w-12 bg-white/10 rounded-full" />
             <div className="grid grid-cols-4 gap-1 items-end h-16">
               <div className="h-8 w-full bg-white/10 rounded-t-sm" />
               <div className="h-12 w-full bg-neomine-teal rounded-t-sm" />
               <div className="h-10 w-full bg-neomine-teal/40 rounded-t-sm" />
               <div className="h-14 w-full bg-neomine-teal/80 rounded-t-sm" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-12 glass-card rounded-xl border-white/5 p-3 flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-neomine-blue/20" />
            <div className="h-2 w-40 bg-white/10 rounded-full" />
          </div>
          <div className="h-12 glass-card rounded-xl border-white/5 p-3 flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-neomine-teal/20 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-neomine-teal" />
            </div>
            <p className="text-[9px] font-medium text-white/60 font-tajawal">مساعد ذكي 24/7 يعمل بالذكاء الاصطناعي</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-6 -right-6 w-32 h-32 glass-card rounded-3xl p-4 shadow-xl border-white/5 backdrop-blur-3xl animate-bounce">
        <Zap className="w-6 h-6 text-[#FFBB28] mb-2" />
        <div className="h-3 w-16 bg-white/10 rounded-full mb-1" />
        <div className="h-2 w-10 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

export default function LandingPage({ onLogin }: { onLogin: (type: 'school' | 'student' | 'staff') => void }) {
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState<'school' | 'student' | 'staff'>('school');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginType);
  };

  const loginOptions = [
    { 
      type: 'school' as const, 
      title: 'إدارة المدرسة', 
      icon: ShieldCheck, 
      desc: 'لوحة تحكم إدارية متكاملة',
      email: 'admin@neomine.edu',
      pass: '********'
    },
    { 
      type: 'student' as const, 
      title: 'حساب الطالب', 
      icon: Brain, 
      desc: 'واجهة تعلم ذكية ومسارات تقنية',
      email: 'student@neomine.edu',
      pass: '********'
    },
    { 
      type: 'staff' as const, 
      title: 'دخول الموظفين', 
      icon: Cpu, 
      desc: 'مركز إدارة النظام والتقارير العامة',
      email: 'admin@neomine.com',
      pass: 'admin123'
    }
  ];

  return (
    <div className="min-h-screen bg-neomine-black text-white font-tajawal selection:bg-neomine-teal/30 relative" dir="rtl">
      {/* Central Glow */}
      <div className="fixed inset-0 hero-glow pointer-events-none z-0" />
      
      {/* Background Dots */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-neomine-black/60 backdrop-blur-xl border-b border-white/[0.03] px-4 md:px-8 py-4 md:py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Right Part: Logo */}
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
              NEOMINE
            </h1>
            <span className="text-[10px] md:text-xs text-neomine-teal font-bold tracking-widest mt-1 opacity-80">مَنجم</span>
          </div>

          {/* Center Part: Links */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: 'الرئيسية', id: 'home' },
              { label: 'من نحن', id: 'about' },
              { label: 'المسارات', id: 'paths' },
              { label: 'تواصل معنا', id: 'contact' }
            ].map((link) => (
              <button 
                key={link.id} 
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-white/70 hover:text-neomine-teal transition-all duration-300 cursor-pointer font-tajawal"
              >
                {link.label}
              </button>
            ))}
          </div>
          
          {/* Left Part: Login Button */}
          <div>
            <button 
              onClick={() => setShowLogin(true)}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/5 transition-all"
            >
              دخول المستخدم
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-8 pt-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
          
          {/* Right Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-right"
          >
            <div className="space-y-6 md:space-y-10 mb-8 md:mb-12 w-full">
              <div className="flex flex-col gap-4 md:gap-6">
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] md:leading-[1.05] selection:text-neomine-teal">
                  حوّل مدرستك إلى <br className="hidden lg:block" />
                  <span className="bg-linear-to-r from-white via-white to-white/30 bg-clip-text text-transparent">مركز للابتكار</span>
                </h2>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-neomine-teal leading-[1.1] drop-shadow-[0_0_50px_rgba(0,201,177,0.4)]">
                  وزد إيراداتك.
                </h2>
              </div>

              <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/40 leading-relaxed max-w-3xl mx-auto lg:mr-0 lg:ml-auto">
                منصة تعليمية متكاملة لعلوم المستقبل. نوفر لك المنهج العالمي، والمنصة التقنية، والمساعد الذكي، لتتمكن من المنافسة في اقتصاد المعرفة العالمي.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full lg:w-auto mt-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="frosted-btn px-8 md:px-16 py-4 md:py-7 rounded-2xl md:rounded-[32px] text-white font-black text-xl md:text-2xl hover:scale-105 active:scale-95 shadow-2xl shadow-neomine-teal/20 transition-all flex items-center justify-center gap-4 md:gap-6 group"
              >
                <span>ابدأ رحلة الابتكار</span>
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 rotate-180 group-hover:-translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Tech Stack Row */}
            <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-12 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block w-full text-center lg:text-right mb-4">Supported Technologies</span>
               <div className="flex items-center gap-2"><Brain className="w-4 h-4 md:w-5 md:h-5 text-neomine-teal" /><span className="text-[10px] md:text-xs font-bold font-mono">TensorFlow</span></div>
               <div className="flex items-center gap-2"><Code className="w-4 h-4 md:w-5 md:h-5 text-blue-400" /><span className="text-[10px] md:text-xs font-bold font-mono">React v19</span></div>
               <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-purple-400" /><span className="text-[10px] md:text-xs font-bold font-mono">Zero Trust</span></div>
               <div className="flex items-center gap-2"><Cpu className="w-4 h-4 md:w-5 md:h-5 text-[#FFBB28]" /><span className="text-[10px] md:text-xs font-bold font-mono">NVIDIA AI</span></div>
            </div>
          </motion.div>

          {/* Left Column: Graphic Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* Education Gap Section */}
      <section className="py-24 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-16"
          >
            <h3 className="text-4xl font-bold opacity-80 text-center">لماذا تتأخر المدارس في تعليم التقنية؟</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'ندرة المعلمين المتخصصين', icon: Brain },
                { title: 'مناهج سريعة التقادم', icon: Zap },
                { title: 'تكاليف تشغيلية عالية', icon: TrendingUp }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(0, 201, 177, 0.4)'
                  }}
                  className="glass-card p-12 rounded-[40px] flex flex-col items-center space-y-6 transition-all duration-300"
                >
                  <div className="text-neomine-teal scale-50">
                    <item.icon className="w-8 h-8 opacity-70" />
                  </div>
                  <h4 className="text-2xl font-bold text-white/95 leading-snug text-center">{item.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="about" className="py-24 px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h3 className="text-4xl font-black mb-6">حل نيوماين الذكي</h3>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            منظومة متكاملة تحول مدرستك إلى مؤسسة ربحية ومبتكرة، مستعدة لمستقبل رؤية المملكة 2030.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: 'ذكاء اصطناعي مدمج', desc: 'مساعد ذكي يرافق الطالب والمعلم، يجيب ويعلم ويقيم الأداء لحظياً.', color: 'neomine-teal' },
            { icon: TrendingUp, title: 'زيادة الإيرادات', iconCol: 'green-500', desc: 'نظام مالي مدروس يزيد من دخل المدرسة عبر إدراج مسارات تعليمية جاذبة.', color: 'neomine-blue' },
            { icon: ShieldCheck, title: 'إدارة متكاملة', desc: 'من لوحة تحكم واحدة، أدر الحضور والغياب، المالية، والتنبيهات المتقدمة.', color: 'neomine-teal' }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-neomine-teal/30 transition-all group">
              <div className={`w-14 h-14 rounded-2xl bg-${item.iconCol || 'neomine-teal'}/10 flex items-center justify-center text-${item.iconCol || 'neomine-teal'} mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Paths Section */}
      <section id="paths" className="py-32 px-8 bg-neomine-black">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h3 className="text-4xl font-bold mb-6">مساراتنا التعليمية والتقنية</h3>
          <p className="text-white/30 font-light">تغطية شاملة للمهارات التقنية والمهارات الأكاديمية المطلوبة.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path, i) => (
            <motion.div 
              key={i}
              whileHover={{ borderColor: 'rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}
              className="bg-transparent border border-white/5 p-8 rounded-3xl transition-all flex items-center gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" style={{ backgroundColor: `${path.color}10`, color: path.color }}>
                <path.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-white/90">{path.title}</h4>
                <p className="text-sm text-white/30 font-light">{path.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/5 group-hover:text-white/40 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">نيوماين</h1>
              <span className="text-sm text-neomine-teal font-bold tracking-widest block -mt-1 opacity-80">مَنجم</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              تمكين الجيل القادم من قادة التقنية عبر حلول تعليمية ذكية ومبتكرة صممت في قلب المملكة العربية السعودية.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-bold">المقر الرئيسي</h5>
            <div className="flex items-center gap-3 text-white/40">
              <MapPin className="w-5 h-5 text-neomine-teal" />
              <p className="text-sm">مكة المكرمة، الزايدي، جادة 30</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-bold">تواصل معنا</h5>
            <p className="text-sm text-white/40">info@neomine.edu</p>
            <p className="text-sm text-white/40 font-mono tracking-widest">+966 5XX XXX XXX</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 tracking-widest uppercase">
          © 2024 NEOMINE. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* Login Modal Simulation */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="relative w-full max-w-4xl glass-card rounded-[32px] md:rounded-[48px] p-6 md:p-12 lg:p-16 z-[110] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-8 md:mb-12">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">استكشف النظام</h3>
                  <p className="text-xs md:text-sm text-white/40">يرجى اختيار نوع الحساب لتجربة المنصة</p>
                </div>
                <button onClick={() => setShowLogin(false)} className="p-2 md:p-3 rounded-full hover:bg-white/5 text-white/20 hover:text-white transition-all">
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loginOptions.map((option) => (
                  <motion.button
                    key={option.type}
                    whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.02)' }}
                    onClick={() => onLogin(option.type as any)}
                    className="flex flex-col text-right p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.01] transition-all group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neomine-teal/5 flex items-center justify-center text-neomine-teal mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                      <option.icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2">{option.title}</h4>
                    <p className="text-[11px] md:text-xs text-white/30 mb-6 md:mb-8">{option.desc}</p>
                    
                    <div className="space-y-3 mt-auto">
                      <div className="bg-white/5 px-4 py-2 md:py-3 rounded-xl border border-white/5 text-[10px] md:text-[11px] text-white/60 truncate">
                        {option.email}
                      </div>
                      <div className="bg-white/5 px-4 py-2 md:py-3 rounded-xl border border-white/5 text-[10px] md:text-[11px] text-white/20 tracking-widest">
                        {option.pass}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2 text-neomine-teal text-[11px] md:text-xs font-bold pt-4 border-t border-white/5 group-hover:gap-4 transition-all">
                      <span>دخول سريع</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 text-center">
                <p className="text-[10px] md:text-[11px] text-white/20 uppercase tracking-[0.2em]">
                  The Future of Digital Education
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

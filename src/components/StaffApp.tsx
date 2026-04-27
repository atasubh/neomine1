import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Building2, 
  FileText, 
  Activity, 
  Settings, 
  LogOut,
  TrendingUp,
  Users,
  DollarSign,
  Cpu,
  AlertTriangle,
  Search,
  ChevronRight,
  Download,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Bell,
  Cpu as CpuIcon,
  Trophy,
  Filter,
  MapPin,
  Compass,
  Zap,
  LayoutDashboard,
  Brain
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { schoolsList, systemLogs, performanceKPIs, globalLeaderboard } from '../lib/mockData';

const growthData = [
  { month: 'يناير', growth: 45, retention: 88, active: 3200 },
  { month: 'فبراير', growth: 52, retention: 89, active: 3450 },
  { month: 'مارس', growth: 61, retention: 91, active: 3800 },
  { month: 'أبريل', growth: 72, retention: 93, active: 4200 },
  { month: 'مايو', growth: 85, retention: 94, active: 4800 },
];

// --- Components ---

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ activeTab, setActiveTab, onLogout, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم العامة', icon: BarChart3 },
    { id: 'schools', label: 'إدارة المدارس', icon: Building2 },
    { id: 'excellence', label: 'فرسان نيوماين', icon: Trophy },
    { id: 'ai_report', label: 'التقرير الأسبوعي الذكي', icon: FileText },
    { id: 'diagnostics', label: 'التشخيص التقني', icon: Activity },
    { id: 'settings', label: 'الإعدادات الإدارية', icon: Settings },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} h-full bg-[#0b1120] border-l border-white/5 flex flex-col shadow-2xl z-50 transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-4 top-20 w-8 h-12 bg-[#0b1120] border border-white/10 rounded-r-xl flex items-center justify-center text-white/40 hover:text-neomine-teal transition-colors z-50 shadow-xl"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5 rotate-180" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      <div className={`p-6 md:p-10 flex items-center gap-4 ${isCollapsed ? 'justify-center p-6' : ''}`}>
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center shadow-lg shrink-0">
          <span className="text-white font-bold text-2xl">N</span>
        </div>
        {!isCollapsed && <h1 className="text-xl font-black text-white truncate font-tajawal">مدرسة نيوماين العالمية</h1>}
      </div>

      <nav className="flex-1 px-4 md:px-6 space-y-2 mt-6 overflow-x-hidden">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
              activeTab === item.id 
              ? 'text-neomine-teal bg-neomine-teal/5 border border-neomine-teal/10' 
              : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
            } ${isCollapsed ? 'justify-center px-0' : ''}`}
          >
            {activeTab === item.id && !isCollapsed && (
              <motion.div 
                layoutId="activeTabStaff"
                className="absolute right-0 bottom-0 top-0 w-1 bg-neomine-teal shadow-[0_0_15px_rgba(0,201,177,0.5)]"
              />
            )}
            <item.icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold truncate">{item.label}</span>}
          </button>
        ))}

        <div className="pt-8 mt-6 border-t border-white/5">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all ${isCollapsed ? 'justify-center px-0' : ''}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-sm font-bold truncate">تسجيل الخروج</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
};

// --- Views ---

const StaffDashboard = ({ selectedSchool, kpis }: { selectedSchool: string, kpis: typeof performanceKPIs }) => {
  const schoolDistributionData = schoolsList.map(s => ({
    name: s.name,
    value: s.activeStudents
  }));

  const COLORS = ['#00C9B1', '#3B82F6', '#8B5CF6', '#F59E0B'];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md relative overflow-hidden"
          >
             <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">{kpi.label}</div>
             <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl -mr-12 -mt-12 rounded-full" />
          </motion.div>
        ))}
      </div>

      {selectedSchool !== 'الكل' && (
        <div className="bg-linear-to-r from-neomine-teal/20 to-transparent border border-white/10 p-8 rounded-[40px] flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-neomine-teal">
                 <Building2 className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-2xl font-black">{selectedSchool}</h3>
                 <p className="text-white/40 text-sm font-bold">عرض البيانات التفصيلية لهذه المدرسة فقط</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                 <p className="text-[10px] text-white/20 font-black mb-1">المنطقة</p>
                 <p className="font-bold">{schoolsList.find(s => s.name === selectedSchool)?.region}</p>
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                 <p className="text-[10px] text-white/20 font-black mb-1">نسبة الأداء</p>
                 <p className="font-bold text-neomine-teal">{schoolsList.find(s => s.name === selectedSchool)?.performance}%</p>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0b1120] border border-white/5 rounded-[40px] p-10">
          <h3 className="text-xl font-black mb-8 flex items-center gap-3">
            <TrendingUp className="text-neomine-teal w-6 h-6" />
            {selectedSchool === 'الكل' ? 'تحليل النمو الفعلي (كافة المدارس)' : `تحليل النمو الفعلي (${selectedSchool})`}
          </h3>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                   <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#00C9B1" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#00C9B1" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                   <XAxis 
                     dataKey="month" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                     dy={10}
                   />
                   <YAxis 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                   />
                   <Tooltip 
                     content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                           return (
                              <div className="bg-[#0b1120] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                                 <p className="text-[10px] font-black text-white/40 uppercase mb-1">{payload[0].payload.month}</p>
                                 <p className="text-lg font-black text-neomine-teal">{payload[0].value}% <span className="text-[10px] text-white/20">زيادة</span></p>
                                 <p className="text-[10px] text-blue-400 font-bold mt-1">الاحتفاظ: {payload[0].payload.retention}%</p>
                              </div>
                           );
                        }
                        return null;
                     }}
                   />
                   <Area type="monotone" dataKey="growth" stroke="#00C9B1" strokeWidth={4} fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0b1120] border border-white/5 rounded-[40px] p-10 flex flex-col">
          <h3 className="text-xl font-black mb-8 flex items-center gap-3">
             <Users className="text-neomine-teal w-6 h-6" />
             توزيع الطلاب حسب المدرسة
          </h3>
          <div className="h-[250px] w-full mb-6">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                     data={schoolDistributionData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                      {schoolDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                   </Pie>
                   <Tooltip 
                      content={({ active, payload }) => {
                         if (active && payload && payload.length) {
                            return (
                               <div className="bg-[#0b1120] border border-white/10 p-3 rounded-xl shadow-2xl">
                                  <p className="text-xs font-bold">{payload[0].name}</p>
                                  <p className="text-neomine-teal font-black">{payload[0].value} طالب</p>
                               </div>
                            );
                         }
                         return null;
                      }}
                   />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
             {schoolDistributionData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                   <span className="text-white/60 truncate">{item.name}</span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SchoolManagement = () => {
  const [selectedSchool, setSelectedSchool] = useState<any>(null);

  if (selectedSchool) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <button 
          onClick={() => setSelectedSchool(null)}
          className="flex items-center gap-3 text-neomine-teal text-sm font-bold hover:underline"
        >
          <ArrowLeft className="w-4 h-4 translate-y-0.5" />
          العودة لقائمة المدارس
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#0b1120] border border-white/5 rounded-[48px] p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-neomine-teal/5 blur-[100px] -z-10" />
                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <h2 className="text-4xl font-black mb-2">{selectedSchool.name}</h2>
                       <p className="text-white/40 font-bold">{selectedSchool.region} — {selectedSchool.principal}</p>
                    </div>
                    <div className="bg-neomine-teal text-neomine-dark px-6 py-2 rounded-full text-xs font-black">
                       {selectedSchool.financialStatus === 'paid' ? 'مدفوع' : 'معلق'}
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-8">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                       <p className="text-white/30 text-[10px] font-bold uppercase mb-2">رقم العقد</p>
                       <p className="font-bold">{selectedSchool.contractNumber}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                       <p className="text-white/30 text-[10px] font-bold uppercase mb-2">تاريخ الانضمام</p>
                       <p className="font-bold">{selectedSchool.joinDate}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                       <p className="text-white/30 text-[10px] font-bold uppercase mb-2">الإيرادات</p>
                       <p className="font-bold text-neomine-teal">{selectedSchool.revenue.toLocaleString()} ريال</p>
                    </div>
                 </div>
              </div>

              <div className="bg-[#0b1120] border border-white/5 rounded-[40px] p-10">
                 <h4 className="text-xl font-black mb-6">المسارات التعليمية المفعّلة</h4>
                 <div className="flex flex-wrap gap-4">
                    {selectedSchool.enabledPaths.map((path: string) => (
                       <div key={path} className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-neomine-teal" />
                          <span className="text-sm font-bold">{path}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 flex flex-col items-center text-center">
                 <div className="w-24 h-24 rounded-full border-4 border-neomine-teal/20 flex items-center justify-center mb-6 relative">
                    <span className="text-3xl font-black text-neomine-teal">{selectedSchool.performance}%</span>
                    <svg className="absolute inset-0 w-ful h-full -rotate-90">
                       <circle 
                         cx="48" cy="48" r="44" 
                         fill="none" stroke="currentColor" strokeWidth="4" 
                         className="text-neomine-teal"
                         strokeDasharray={`${2.76 * selectedSchool.performance} 276`}
                       />
                    </svg>
                 </div>
                 <h4 className="text-lg font-black">مستوى الأداء العام</h4>
                 <p className="text-xs text-white/40 mt-2">يعتمد على تفاعل الطلاب ونتائج الاختبارات</p>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10">
                 <h4 className="text-lg font-black mb-6 flex items-center gap-3">
                    <Users className="w-5 h-5 text-neomine-teal" />
                    إحصائيات الطلاب
                 </h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-white/40 font-bold">الطلاب النشطين</span>
                       <span className="font-black">{selectedSchool.activeStudents}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-neomine-teal w-3/4" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black mb-2">إدارة المدارس</h3>
          <p className="text-white/40 text-sm">إدارة ومراقبة أداء المدارس المسجلة في نيوماين</p>
        </div>
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث عن مدرسة..."
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pr-12 pl-6 text-sm focus:outline-hidden focus:border-neomine-teal/30 w-72"
          />
        </div>
      </div>

      <div className="bg-[#0b1120] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-right">المدرسة</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">المنطقة</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">عدد الطلاب</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">الأداء</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">الحالة</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {schoolsList.map((school) => (
              <tr key={school.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all group">
                <td className="p-8 font-bold text-white/90">{school.name}</td>
                <td className="p-8 text-center text-white/60">{school.region}</td>
                <td className="p-8 text-center text-white/90 font-black">{school.activeStudents}</td>
                <td className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-neomine-teal" style={{ width: `${school.performance}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-neomine-teal">{school.performance}%</span>
                  </div>
                </td>
                <td className="p-8 text-center">
                   <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      school.financialStatus === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                   }`}>
                      {school.financialStatus === 'paid' ? 'مدفوع' : 'معلق'}
                   </span>
                </td>
                <td className="p-8 text-center">
                  <button 
                    onClick={() => setSelectedSchool(school)}
                    className="text-[10px] font-black text-neomine-teal hover:underline tracking-widest uppercase flex items-center justify-center gap-1 mx-auto"
                  >
                    عرض التفاصيل <ChevronRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AIWeeklyReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportVisible(true);
    }, 2000);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-linear-to-br from-neomine-teal/20 to-neomine-blue/20 border border-white/10 rounded-[48px] p-12">
         <div>
            <h3 className="text-3xl font-black mb-3">التقرير الأسبوعي الذكي لـ نيوماين</h3>
            <p className="text-white/60 font-bold max-w-lg">
               يتم توليد هذا التقرير تلقائياً عبر فحص بيانات الطلاب والمدارس خلال الأسبوع الماضي.
            </p>
         </div>
         <button 
           onClick={generateReport}
           disabled={isGenerating}
           className="px-10 py-5 bg-neomine-teal text-neomine-dark rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-neomine-teal/20 disabled:opacity-50"
         >
            {isGenerating ? (
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-neomine-dark/30 border-t-neomine-dark rounded-full animate-spin" />
                  جاري التوليد...
               </div>
            ) : 'توليد التقرير الآن'}
         </button>
      </div>

      <AnimatePresence>
         {reportVisible && (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-[#0b1120] border border-white/5 rounded-[48px] p-12 space-y-12 shadow-2xl"
            >
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal">
                        <FileText className="w-8 h-8" />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black">تحليل الأداء الأسبوعي (٢٠ - ٢٤ أبريل)</h4>
                        <p className="text-white/20 text-xs font-bold mt-1">تولدت البصمة الرقمية عبر Neomine Intelligence v4.0</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all">
                        <Download className="w-5 h-5" />
                     </button>
                     <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all">
                        <Share2 className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 bg-white/5 rounded-3xl space-y-4">
                     <h5 className="font-black text-neomine-teal flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        معدلات النمو
                     </h5>
                     <p className="text-sm text-white/60 leading-relaxed font-medium">
                        سجلنا زيادة بنسبة ٨.٤٪ في وقت التفاعل مع المساعد الذكي. مدارس الرياض تتصدر قائمة التفاعل.
                     </p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl space-y-4">
                     <h5 className="font-black text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        المخاطر المحتملة
                     </h5>
                     <p className="text-sm text-white/60 leading-relaxed font-medium">
                        هناك تراجع طفيف في أداء المسار البرمجي المتقدم بمدارس جدة نتيجة تعثر تقني مؤقت في دخول المنصة.
                     </p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl space-y-4">
                     <h5 className="font-black text-blue-400 flex items-center gap-2">
                        <CpuIcon className="w-4 h-4" />
                        توصيات برمجية
                     </h5>
                     <p className="text-sm text-white/60 leading-relaxed font-medium">
                        يُنصح بتوزيع الأحمال على سيرفرات المنطقة الغربية لضمان سلاسة الدخول لطلاب المدارس الجديدة.
                     </p>
                  </div>
               </div>

               <div className="p-10 bg-linear-to-r from-neomine-teal/5 to-transparent border border-white/5 rounded-3xl font-medium text-white/80 leading-loose">
                  الملخص العام: تشير بيانات هذا الأسبوع إلى استقرار النظام بنسبة ٩٩.٩٨٪، مع ازدياد ملحوظ في إنتاجية المشاريع التقنية للطلاب. نوصي بتفعيل مكافآت النقاط لتشجيع الاستمرار في مسار الأمن السيبراني.
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const Diagnostics = () => {
  const [diagnosing, setDiagnosing] = useState(false);
  const [healthScore, setHealthScore] = useState(98);

  const runDiagnostics = () => {
    setDiagnosing(true);
    setTimeout(() => {
      setDiagnosing(false);
      setHealthScore(99);
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-[40px] p-10">
        <div>
          <h3 className="text-3xl font-black mb-2 flex items-center gap-4">
            <Activity className="text-neomine-teal w-8 h-8" />
            فحص تشخيص النظام (Diagnostics)
          </h3>
          <p className="text-white/40 font-medium">مراقبة أداء السيرفرات، الشبكة، وتكامل الـ AI لحظياً.</p>
        </div>
        <button 
          onClick={runDiagnostics}
          disabled={diagnosing}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-sm hover:bg-neomine-teal hover:text-neomine-dark transition-all disabled:opacity-50 flex items-center gap-3"
        >
          {diagnosing ? <Activity className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
          {diagnosing ? 'جاري الفحص...' : 'بدء فحص شامل'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0b1120] border border-white/5 rounded-[40px] p-8 text-center space-y-6">
           <div className="w-32 h-32 rounded-full border-8 border-neomine-teal/10 flex items-center justify-center mx-auto relative">
              <span className="text-4xl font-black text-neomine-teal">{healthScore}%</span>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-neomine-teal" strokeDasharray={`${3.51 * healthScore} 351`} />
              </svg>
           </div>
           <div>
              <h4 className="text-lg font-black italic">System Health Score</h4>
              <p className="text-white/20 text-xs font-bold uppercase mt-1">Excellent performance</p>
           </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-6">
           {[
             { label: 'وقت الاستجابة (Latancy)', value: '142ms', status: 'optimal', icon: Zap },
             { label: 'استهلاك المعالج', value: '24%', status: 'optimal', icon: CpuIcon },
             { label: 'ذاكرة النظام', value: '4.2GB / 16GB', status: 'optimal', icon: Activity },
             { label: 'استهلاك الـ AI Tokens', value: '1.2M / 10M', status: 'warning', icon: Brain },
           ].map((stat, i) => (
             <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neomine-teal">
                   <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-xl font-black">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-[#0b1120] border border-white/5 rounded-[40px] overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/[0.01]">
           <h4 className="text-lg font-black">سجل العمليات التقنية (Live Logs)</h4>
        </div>
        <div className="p-8 space-y-4 max-h-[300px] overflow-y-auto font-mono text-[11px]">
           {systemLogs.map((log) => (
             <div key={log.id} className="flex gap-4 p-3 rounded-xl bg-black/20 border border-white/5">
                <span className="text-white/20">[{log.time}]</span>
                <span className={log.severity === 'critical' ? 'text-red-400' : 'text-blue-400'}>[{log.severity.toUpperCase()}]</span>
                <span className="text-white/60">{log.message}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const GlobalExcellenceHub = ({ selectedSchool }: { selectedSchool: string }) => {
  const [cityFilter, setCityFilter] = useState('الكل');
  const [schoolFilter, setSchoolFilter] = useState('الكل');
  const [trackFilter, setTrackFilter] = useState('الكل');

  const effectiveSchoolFilter = selectedSchool !== 'الكل' ? selectedSchool : schoolFilter;

  const filteredStudents = globalLeaderboard.filter(student => {
    return (cityFilter === 'الكل' || student.city === cityFilter) &&
           (effectiveSchoolFilter === 'الكل' || student.school === effectiveSchoolFilter) &&
           (trackFilter === 'الكل' || student.track === trackFilter);
  });

  const cities = ['الكل', ...new Set(globalLeaderboard.map(s => s.city))];
  const schools = ['الكل', ...new Set(globalLeaderboard.map(s => s.school))];
  const tracks = ['الكل', ...new Set(globalLeaderboard.map(s => s.track))];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-[#0b1120] border-2 border-[#C9A84C]/10 rounded-[48px] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 blur-[120px] -z-10" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] border border-[#C9A84C]/20 shadow-2xl">
                 <Trophy className="w-10 h-10 drop-shadow-[0_0_15px_rgba(201,168,76,0.6)]" />
              </div>
              <div className="text-right">
                 <h3 className="text-4xl font-black mb-2 text-white font-tajawal">فرسان نيوماين العالمية</h3>
                 <p className="text-[#C9A84C] font-bold text-sm uppercase tracking-[0.2em] italic font-tajawal text-left">Excellence & Talent Monitoring</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                 <span className="text-[10px] text-white/40 block mb-1 font-bold">إجمالي المتفوقين</span>
                 <span className="text-2xl font-black text-[#C9A84C]">{globalLeaderboard.length}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/[0.02] border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
         <div className="space-y-3">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pr-2 flex items-center gap-2">
               <MapPin className="w-3 h-3" /> المدينة
            </label>
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:border-[#C9A84C]/30 outline-hidden transition-all"
            >
               {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
         </div>
         <div className="space-y-3">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pr-2 flex items-center gap-2">
               <Building2 className="w-3 h-3" /> المدرسة
            </label>
            <select 
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
              className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:border-[#C9A84C]/30 outline-hidden transition-all"
            >
               {schools.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
         </div>
         <div className="space-y-3">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pr-2 flex items-center gap-2">
               <Compass className="w-3 h-3" /> المسار التعليمي
            </label>
            <select 
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:border-[#C9A84C]/30 outline-hidden transition-all"
            >
               {tracks.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
         </div>
         <div className="flex items-end">
            <button className="w-full h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-white/40 group transition-all">
               <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform" />
               تصدير كـ Excel للجوائز
            </button>
         </div>
      </div>

      <div className="bg-[#0b1120] border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest">الطالب</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">المدرسة</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">المسار</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">النقاط</th>
              <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center">ستريك الحضور</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-[#C9A84C]/5 transition-all group">
                <td className="p-8">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A84C] font-black">
                         {student.name[0]}
                      </div>
                      <div>
                         <p className="font-black text-lg group-hover:text-[#C9A84C] transition-colors">{student.name}</p>
                         <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{student.city}</p>
                      </div>
                   </div>
                </td>
                <td className="p-8 text-center font-bold text-white/60">{student.school}</td>
                <td className="p-8 text-center whitespace-nowrap">
                   <span className="px-5 py-2 bg-white/5 border border-white/5 rounded-xl text-[11px] font-black">{student.track}</span>
                </td>
                <td className="p-8 text-center">
                   <div className="flex flex-col items-center">
                      <span className="text-2xl font-black text-[#C9A84C]">{student.points}</span>
                      <span className="text-[9px] text-[#C9A84C]/40 font-bold uppercase tracking-widest">Points</span>
                   </div>
                </td>
                <td className="p-8 text-center mt-2 group-hover:scale-110 transition-transform">
                   <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-2xl">
                      <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <span className="font-black text-orange-500">{student.streak} يوم</span>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminSettings = () => (
  <div className="space-y-8 max-w-4xl">
    <div className="bg-[#0b1120] border border-white/5 rounded-[40px] p-10 space-y-10">
       {/* General Info */}
       <div>
          <h4 className="text-xl font-black mb-8 flex items-center gap-3">
             <Building2 className="text-neomine-teal w-6 h-6" />
             إعدادات المنصة العامة
          </h4>
          <div className="space-y-6">
             <div>
                <label className="block text-xs font-black text-white/40 uppercase mb-3 mr-2">اسم المؤسسة التعليمية الافتراضي</label>
                <div className="relative group">
                   <Building2 className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neomine-teal group-focus-within:text-white transition-colors" />
                   <input 
                     type="text" 
                     defaultValue="مدرسة نيوماين العالمية"
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-14 pl-6 font-bold text-white focus:outline-none focus:border-neomine-teal transition-all"
                   />
                </div>
                <p className="text-[10px] text-white/20 mt-2 mr-2">يظهر هذا الاسم كاسم افتراضي في التقارير والواجهة في حال عدم تحديد مدرسة معينة.</p>
             </div>
          </div>
       </div>

       <div className="w-full h-px bg-white/5" />

       <div>
          <h4 className="text-xl font-black mb-8 flex items-center gap-3">
             <ShieldCheck className="text-neomine-teal w-6 h-6" />
             إدارة الصلاحيات
          </h4>
          <div className="space-y-4">
             {[
               { user: 'خالد (Senior DevOps)', role: 'Admin Full Access', status: 'active' },
               { user: 'ريم (Data Analyst)', role: 'Reports & Logs', status: 'active' }
             ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-transparent hover:border-white/5 transition-all">
                   <div>
                      <p className="font-bold">{u.user}</p>
                      <p className="text-xs text-white/30 mt-1 font-bold">{u.role}</p>
                   </div>
                   <button className="text-xs font-black text-neomine-teal hover:underline tracking-widest">تعديل</button>
                </div>
             ))}
          </div>
       </div>

       <div>
          <h4 className="text-xl font-black mb-8 flex items-center gap-3">
             <Settings className="text-neomine-teal w-6 h-6" />
             تخصيص الهوية البصرية
          </h4>
          <div className="grid grid-cols-2 gap-8">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                <p className="text-xs font-black text-white/40">اللون الأساسي للوحات التحكم</p>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-neomine-teal cursor-pointer ring-2 ring-white/20" />
                   <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer" />
                   <div className="w-10 h-10 rounded-full bg-purple-500 cursor-pointer" />
                </div>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                <p className="text-xs font-black text-white/40">تفعيل التحقق بخطوتين للعناوين المؤكدة</p>
                <div className="w-12 h-6 bg-neomine-teal rounded-full relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// --- Main App Entry ---

export default function StaffApp({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState('الكل');

  const filteredKPIs = performanceKPIs.map(kpi => {
    if (selectedSchoolFilter === 'الكل') return kpi;
    const school = schoolsList.find(s => s.name === selectedSchoolFilter);
    if (!school) return kpi;

    if (kpi.label.includes('المدارس')) return { ...kpi, value: '١' };
    if (kpi.label.includes('الطلاب')) return { ...kpi, value: school.activeStudents.toLocaleString() };
    if (kpi.label.includes('الإيرادات')) return { ...kpi, value: (school.revenue / 1000000).toFixed(2) + 'M' };
    return kpi;
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <StaffDashboard selectedSchool={selectedSchoolFilter} kpis={filteredKPIs} />;
      case 'schools': return <SchoolManagement />;
      case 'excellence': return <GlobalExcellenceHub selectedSchool={selectedSchoolFilter} />;
      case 'ai_report': return <AIWeeklyReport />;
      case 'diagnostics': return <Diagnostics />;
      case 'settings': return <AdminSettings />;
      default: return <StaffDashboard selectedSchool={selectedSchoolFilter} kpis={filteredKPIs} />;
    }
  };

  return (
    <div className="flex h-screen bg-neomine-dark text-white font-tajawal selection:bg-neomine-teal/30" dir="rtl">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                   <CpuIcon className="w-6 h-6 text-neomine-teal" />
                </div>
                <div>
                   <h2 className="text-3xl font-black font-tajawal">مجمع مدرسة نيوماين العالمية</h2>
                   <p className="text-white/20 text-xs font-bold tracking-widest uppercase mt-1">Super Admin Console v4.5</p>
                </div>
              </div>
             <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3">
                   <Filter className="w-4 h-4 text-neomine-teal" />
                   <select 
                     value={selectedSchoolFilter}
                     onChange={(e) => setSelectedSchoolFilter(e.target.value)}
                     className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
                   >
                      <option value="الكل" className="bg-[#0b1120]">جميع المدارس</option>
                      {schoolsList.map(s => <option key={s.id} value={s.name} className="bg-[#0b1120]">{s.name}</option>)}
                   </select>
                </div>
                <div className="hidden lg:flex items-center gap-6">
                   <div className="text-left">
                      <p className="text-xs text-white/40 font-bold">الحالة التقنية</p>
                      <p className="text-sm font-black text-neomine-teal">نظام مستقر (١٠٠٪)</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                      <Bell className="w-6 h-6 text-white/40" />
                      <span className="absolute top-3 right-3 w-2 h-2 bg-red-400 rounded-full border-2 border-[#0b1120]" />
                   </div>
                </div>
             </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + selectedSchoolFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

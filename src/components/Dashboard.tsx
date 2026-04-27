import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  Users, TrendingUp, DollarSign, AlertCircle, 
  Code, Clock, Brain, School
} from 'lucide-react';
import { motion } from 'motion/react';
import { allStudentsData, schoolsList } from '../lib/mockData';

const schoolPerformanceData = schoolsList.map(school => ({
  name: school.name,
  students: school.activeStudents * 25, // Scaled for display
  performance: school.performance
}));

const totalRevenueValue = schoolsList.reduce((acc, school) => acc + school.revenue, 0);
const avgPerformanceValue = schoolsList.reduce((acc, school) => acc + school.performance, 0) / schoolsList.length;
const totalStudentsValue = schoolsList.reduce((acc, school) => acc + school.activeStudents, 0) * 25; // Scaled

const dashboardAlerts = [
  { id: 1, type: 'critical', message: 'انخفاض حاد في درجات طلاب مسار الأمن السيبراني.', time: 'منذ ساعتين' },
  { id: 2, type: 'medium', message: 'تنبيه: غياب متكرر لأكثر من 5 طلاب في فصل البرمجة.', time: 'منذ 5 ساعات' },
  { id: 3, type: 'positive', message: 'تقدم ملحوظ في مستوى إنجاز الطلاب لمشاريع الذكاء الاصطناعي.', time: 'يوم أمس' },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md transition-all duration-300 hover:border-neomine-teal/30"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}/10 border border-${color}/20 text-${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-lg border border-green-500/20 font-bold">
          {trend}
        </span>
      )}
    </div>
    <h4 className="text-white/40 text-sm font-medium mb-1">{title}</h4>
    <p className="text-3xl font-bold text-white">{value}</p>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] backdrop-blur-md gap-6 shadow-xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-none font-tajawal">اللوحة الرئيسية للمجمع</h2>
          <p className="text-white/30 text-sm font-medium font-tajawal">نظرة عامة شاملة على أداء مجمع مدرسة نيوماين العالمية.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <div className="bg-neomine-teal/10 px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-neomine-teal/20 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neomine-teal animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-neomine-teal uppercase tracking-widest leading-none">تحديث مباشر</span>
            </div>
            <div className="bg-white/5 px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                <span className="text-[10px] md:text-xs font-black text-white/40 uppercase tracking-widest leading-none">٢٤ أبريل، ٢٠٢٤</span>
            </div>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="إجمالي طلاب المجمع" value={totalStudentsValue.toLocaleString()} icon={Users} trend="+12%" color="neomine-teal" />
        <StatCard title="إجمالي الإيرادات (المجمع)" value={`${(totalRevenueValue / 1000000).toFixed(2)}M ر.س`} icon={DollarSign} trend="+8.4%" color="neomine-blue" />
        <StatCard title="متوسط الأداء العام" value={`${avgPerformanceValue.toFixed(1)}%`} icon={TrendingUp} trend="+2.1%" color="neomine-teal" />
      </div>

      {/* School Performance Distribution */}
      <div className="bg-[#0b1120] border border-white/5 rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h3 className="text-2xl font-black text-white">توزيع المدارس والأداء</h3>
            <p className="text-white/30 text-xs font-medium mt-1">مقارنة أعداد الطلاب ونسبة الإنجاز المتوسطة لكل فرع</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-neomine-teal" />
               <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">الطلاب</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-neomine-blue" />
               <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">الأداء</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={schoolPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10, fontWeight: 'bold'}} dx={-10} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10, fontWeight: 'bold'}} dx={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              />
              <Bar yAxisId="left" dataKey="students" fill="#00C9B1" radius={[10, 10, 0, 0]} barSize={40} />
              <Bar yAxisId="right" dataKey="performance" fill="#2E86FF" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

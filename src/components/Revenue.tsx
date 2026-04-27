import { useState, useMemo } from 'react';
import { Wallet, Calculator, TrendingUp, Info, DollarSign, Building2, CreditCard, ChevronLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { RevenueCalculator } from './RevenueCalculator';
import { schoolsList } from '../lib/mockData';

const revenueHistory = [
  { month: 'يناير', amount: 520000 },
  { month: 'فبراير', amount: 480000 },
  { month: 'مارس', amount: 610000 },
  { month: 'أبريل', amount: 550000 },
  { month: 'مايو', amount: 670000 },
  { month: 'يونيو', amount: 720000 },
];

export default function Revenue() {
  const [selectedSchool, setSelectedSchool] = useState<typeof schoolsList[0] | null>(null);

  const globalStats = useMemo(() => {
    const total = schoolsList.reduce((acc, s) => acc + s.revenue, 0);
    const paid = total * 0.85; // Mock: 85% paid
    const remaining = total - paid;
    return { total, paid, remaining };
  }, []);

  return (
    <div className="space-y-12 pb-12 font-tajawal text-right" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">النظام المالي المركزي</h2>
          <p className="text-white/40 text-sm">إرصاد وتحليل التدفقات النقدية والربحية المجمعة لكافة الفروع.</p>
        </div>
        <div className="w-14 h-14 rounded-3xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal shadow-lg shadow-neomine-teal/10">
          <Wallet className="w-7 h-7" />
        </div>
      </div>

      {/* Global Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'إجمالي إيرادات المجمّع', value: `${(globalStats.total / 1000000).toFixed(2)}M ر.س`, trend: '+18% سنوي', color: 'text-neomine-teal', icon: DollarSign },
          { title: 'إجمالي المبالغ المسددة', value: `${(globalStats.paid / 1000000).toFixed(2)}M ر.س`, trend: '٨٥٪ من المستهدف', color: 'text-blue-400', icon: CreditCard },
          { title: 'المستحقات المتبقية', value: `${(globalStats.remaining / 1000).toFixed(0)}k ر.س`, trend: '١٥٪ متبقي', color: 'text-orange-400', icon: Info },
        ].map((card, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl bg-white/5 ${card.color} w-fit mb-6`}>
              <card.icon className="w-6 h-6" />
            </div>
            <p className="text-white/40 text-xs font-black uppercase mb-2 tracking-widest">{card.title}</p>
            <p className="text-3xl font-black text-white">{card.value}</p>
            <div className={`mt-4 text-[10px] font-black ${card.color}`}>{card.trend}</div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 blur-3xl -ml-12 -mt-12 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Growth Analysis Chart */}
      <div className="bg-[#0b1120] border border-white/5 rounded-[48px] p-10 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neomine-teal/5 blur-[120px] -z-10" />
        <div className="flex justify-between items-center mb-10">
           <div>
              <h3 className="text-xl font-black flex items-center gap-3">
                <TrendingUp className="text-neomine-teal w-6 h-6" />
                تحليل النمو المالي المجمع
              </h3>
              <p className="text-white/20 text-xs mt-1 font-bold">البيانات تعكس إيرادات جميع المدارس النشطة</p>
           </div>
           <div className="flex gap-2">
              {['شهري', 'سنوي'].map(t => (
                <button key={t} className="px-4 py-1.5 rounded-lg bg-white/5 text-[10px] font-black text-white/40 hover:text-white transition-all">
                  {t}
                </button>
              ))}
           </div>
        </div>
        <div className="h-[350px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory}>
                 <defs>
                   <linearGradient id="centralRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#00C9B1" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#00C9B1" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 'bold'}} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#050A14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                    itemStyle={{ color: '#00C9B1', fontWeight: '900' }}
                 />
                 <Area type="monotone" dataKey="amount" stroke="#00C9B1" strokeWidth={5} fillOpacity={1} fill="url(#centralRev)" />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Individual Schools Financial Dashboards */}
      <div className="space-y-6">
         <div className="flex items-center gap-4 px-4">
            <Building2 className="w-6 h-6 text-neomine-teal" />
            <h3 className="text-xl font-black">إحصائيات مفصلة للمدارس</h3>
         </div>
         
         <AnimatePresence mode="wait">
            {!selectedSchool ? (
               <motion.div 
                 key="grid"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="grid grid-cols-1 lg:grid-cols-2 gap-8"
               >
                  {schoolsList.map((school) => {
                     const paid = school.revenue * 0.85;
                     const remaining = school.revenue - paid;
                     
                     return (
                       <motion.div 
                         key={school.id}
                         whileHover={{ scale: 1.01 }}
                         onClick={() => setSelectedSchool(school)}
                         className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl group hover:border-neomine-teal/30 transition-all shadow-xl cursor-pointer"
                       >
                          <div className="flex justify-between items-start mb-8">
                             <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neomine-teal font-black text-xl group-hover:scale-110 transition-transform">
                                   {school.name.slice(-1)}
                                </div>
                                <div>
                                   <h4 className="text-xl font-black group-hover:text-neomine-teal transition-colors underline decoration-neomine-teal/20 underline-offset-8 decoration-dashed">
                                      {school.name}
                                   </h4>
                                   <p className="text-white/20 text-xs font-bold">{school.region} | {school.activeStudents} طالب</p>
                                </div>
                             </div>
                             <div className="text-left font-black">
                                <p className="text-[10px] text-white/20 uppercase tracking-widest">إجمالي الإيراد</p>
                                <p className="text-xl text-white">{(school.revenue / 1000).toFixed(0)}k ر.س</p>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-8">
                             <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-green-500 font-black mb-1">المسدد</p>
                                <p className="font-bold text-sm">{(paid / 1000).toFixed(0)}k</p>
                             </div>
                             <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-orange-400 font-black mb-1">المتبقي</p>
                                <p className="font-bold text-sm">{(remaining / 1000).toFixed(0)}k</p>
                             </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-black text-neomine-teal group-hover:translate-x-[-10px] transition-transform">
                             <span>عرض التحليل المالي المفصيل للفروع</span>
                             <ChevronLeft className="w-4 h-4" />
                          </div>
                       </motion.div>
                     );
                  })}
               </motion.div>
            ) : (
               <motion.div 
                 key="detail"
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 className="space-y-8"
               >
                  <button 
                    onClick={() => setSelectedSchool(null)}
                    className="flex items-center gap-2 text-neomine-teal font-black text-sm hover:underline mb-4"
                  >
                     <ChevronLeft className="w-4 h-4 rotate-180" />
                     العودة للإحصائيات العامة
                  </button>

                  <div className="bg-[#0b1120] border border-white/5 rounded-[48px] p-10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-neomine-teal/5 blur-[120px] -z-10" />
                     
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 rounded-3xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal text-3xl font-black">
                              {selectedSchool.name.slice(-1)}
                           </div>
                           <div>
                              <h3 className="text-3xl font-black">{selectedSchool.name} - التحليل المالي</h3>
                              <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-1">{selectedSchool.region} — فرع نشط</p>
                           </div>
                        </div>
                        <div className="text-left font-black">
                           <p className="text-[10px] text-white/20 uppercase tracking-widest">صافي الربح التقديري</p>
                           <p className="text-4xl text-neomine-teal">{(selectedSchool.revenue * 0.25 / 1000).toFixed(1)}k <span className="text-sm">ر.س</span></p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                           { label: 'إجمالي الإيرادات', value: `${(selectedSchool.revenue / 1000).toFixed(0)}k`, color: 'text-white' },
                           { label: 'المصاريف التشغيلية (70%)', value: `${(selectedSchool.revenue * 0.7 / 1000).toFixed(0)}k`, color: 'text-red-400' },
                           { label: 'رسوم المنصة (12%)', value: `${(selectedSchool.revenue * 0.12 / 1000).toFixed(0)}k`, color: 'text-yellow-400' },
                           { label: 'أرباح نيوماين الصافية', value: `${(selectedSchool.revenue * 0.18 / 1000).toFixed(0)}k`, color: 'text-neomine-teal' },
                        ].map((box, i) => (
                           <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                              <p className="text-[10px] text-white/30 font-black mb-2">{box.label}</p>
                              <p className={`text-2xl font-black ${box.color}`}>{box.value}</p>
                           </div>
                        ))}
                     </div>

                     <div className="mt-12 p-8 bg-white/5 border border-white/5 rounded-[32px] space-y-6">
                        <h4 className="text-lg font-black flex items-center gap-3">
                           <Calculator className="w-5 h-5 text-neomine-teal" />
                           تفصيل حسابات الـ 12% للمنصة
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <div className="flex justify-between items-center text-sm">
                                 <span className="text-white/40 font-bold">نسبة الاشتراك الثابتة</span>
                                 <span className="font-black text-neomine-teal">12%</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                 <span className="text-white/40 font-bold">المبلغ المستحق لنيوماين</span>
                                 <span className="font-black">{(selectedSchool.revenue * 0.12).toLocaleString()} ريال</span>
                              </div>
                              <div className="w-full h-px bg-white/5" />
                              <div className="flex justify-between items-center text-sm">
                                 <span className="text-white/40 font-bold">الحالة المالية للفرع</span>
                                 <span className="text-green-500 font-bold">منتظم في السداد</span>
                              </div>
                           </div>
                           <div className="p-6 bg-linear-to-br from-neomine-teal/10 to-transparent border border-white/5 rounded-2xl flex flex-col justify-center">
                              <p className="text-xs text-white/60 leading-loose">
                                 يتم احتساب نسبة 12% كرسوم تشغيلية لمنصة نيوماين، تشمل الصيانة التقنية، تحديثات الـ AI، وخدمات الدعم الفني المباشر للطلاب.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Interactive Revenue Calculator (Now at the bottom) */}
      <div className="pt-12 border-t border-white/5">
         <div className="mb-8 flex items-center gap-4 px-4">
            <Calculator className="w-6 h-6 text-neomine-teal" />
            <h3 className="text-xl font-black">حاسبة العوائد المتوقعة</h3>
         </div>
         <RevenueCalculator />
      </div>

    </div>
  );
}

import { Trophy, Zap, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { allStudentsData, schoolsList } from '../lib/mockData';

export default function GlobalExcellenceHub() {
  const sortedStudents = [...allStudentsData]
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  return (
    <div className="space-y-10 animate-in fade-in duration-700" dir="rtl">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-[#0b1120] to-[#050A14] border border-[#C9A84C]/20 rounded-[32px] md:rounded-[48px] p-6 md:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 blur-[120px] -z-10" />
        <div className="max-w-3xl">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl text-[#C9A84C] text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8">
              <Zap className="w-4 h-4 fill-[#C9A84C]" />
              فرسان نيوماين
           </div>
           <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight flex flex-wrap gap-x-3">مركز التميّز: <span className="text-[#C9A84C]">فرسان نيوماين</span></h2>
           <p className="text-sm md:text-lg text-white/50 leading-loose font-medium">
              هنا يُكتب التاريخ! تتبع أبطال مدرستك، والمتصدرين على مستوى المنطقة. نظام النقاط يعتمد على (تحقيق المستهدفات اليومية، الالتزام بالحضور، وأداء المشاريع البرمجية).
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Leaderboard */}
        <div className="lg:col-span-12 bg-[#0b1120] border border-white/5 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl">
           <div className="p-6 md:p-12 border-b border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                 <h4 className="text-xl md:text-2xl font-black mb-1">المتصدرون لهذا الشهر</h4>
                 <p className="text-white/40 text-[10px] md:text-sm font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    على مستوى مدرستك والمنطقة المحيطة
                 </p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="بحث عن طالب..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 md:py-3 pr-11 pl-4 text-xs focus:outline-hidden"
                />
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest leading-none">الترتيب</th>
                    <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest leading-none">الفارس</th>
                    <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest leading-none">المسار التقني</th>
                    <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center leading-none">الستريك (Streak)</th>
                    <th className="p-8 text-[11px] text-white/20 font-black uppercase tracking-widest text-center leading-none">إجمالي النقاط</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student, i) => (
                    <motion.tr 
                      key={student.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group border-b border-white/5 hover:bg-[#C9A84C]/5 transition-all cursor-pointer"
                    >
                      <td className="p-8">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                          i === 0 ? 'bg-linear-to-br from-[#C9A84C] to-[#8E7232] text-neomine-dark shadow-lg shadow-[#C9A84C]/20' : 
                          i === 1 ? 'bg-linear-to-br from-slate-300 to-slate-500 text-neomine-dark' : 
                          i === 2 ? 'bg-linear-to-br from-amber-600 to-amber-800 text-white' : 
                          'bg-white/5 text-white/40 border border-white/5'
                        }`}>
                          {i + 1}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-full bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-white/60 group-hover:border-[#C9A84C]/30">
                              {student.name.charAt(0)}
                           </div>
                           <div>
                              <p className={`font-black text-xl mb-0.5 ${i < 3 ? 'text-[#C9A84C]' : 'text-white'}`}>{student.name}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">طالب متميز</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-[10px] text-neomine-teal font-black">{schoolsList.find(s => s.id === student.schoolId)?.name}</span>
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="p-8">
                         <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white/50">{student.track}</span>
                      </td>
                      <td className="p-8 text-center">
                         <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                               <Zap className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />
                               <span className="text-xl font-black text-white">{student.streak} يوم</span>
                            </div>
                         </div>
                      </td>
                      <td className="p-8 text-center">
                         <div className="flex flex-col items-center">
                            <span className={`text-2xl font-black ${i < 3 ? 'text-[#C9A84C]' : 'text-neomine-teal'}`}>{student.points}</span>
                            <span className="text-[10px] text-white/20 font-black uppercase tracking-widest leading-none">نقطة</span>
                         </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-12 space-y-8">
           <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">
              <h4 className="text-lg font-black text-white mb-6">قواعد الحساب</h4>
              <div className="space-y-6">
                 {[
                   { label: 'الحضور الكامل', points: '+٥٠٠', color: 'text-neomine-teal' },
                   { label: 'إتمام مشروع نهائي', points: '+١٥٠٠', color: 'text-neomine-blue' },
                   { label: 'مساعدة الزملاء', points: '+٢٠٠', color: 'text-purple-400' },
                 ].map((rule, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                       <span className="text-xs font-bold text-white/60">{rule.label}</span>
                       <span className={`font-black ${rule.color}`}>{rule.points}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

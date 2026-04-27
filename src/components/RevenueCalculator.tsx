import { useState, useMemo } from 'react';

export const RevenueCalculator = () => {
  const [students, setStudents] = useState<number>(60);
  const [fee, setFee] = useState<number>(19);
  const SCHOOL_PERCENTAGE = 12; // Fixed as per requirements

  const annualRevenue = useMemo(() => {
    return students * fee * 10 * (SCHOOL_PERCENTAGE / 100);
  }, [students, fee]);

  return (
    <div className="mt-12 group" dir="rtl">
      <h3 className="text-xl font-bold mb-8 pr-4 border-r-4 border-neomine-teal">حاسبة الإيرادات التفاعلية</h3>
      <div className="bg-linear-to-br from-[#020617] to-neomine-teal/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Sliders Side */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white/80 font-tajawal">عدد الطلاب</label>
                <span className="text-neomine-teal font-mono font-bold bg-neomine-teal/10 px-3 py-1 rounded-lg border border-neomine-teal/20 text-lg">
                  {students}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full accent-neomine-teal h-2 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 transition-all font-tajawal"
              />
              <div className="flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-wider font-tajawal">
                <span>0 طالب</span>
                <span>1000 طالب</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white/80 font-tajawal">رسوم البرنامج شهرياً لكل طالب (ر.س)</label>
                <span className="text-neomine-teal font-mono font-bold bg-neomine-teal/10 px-3 py-1 rounded-lg border border-neomine-teal/20 text-lg">
                  {fee}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full accent-neomine-teal h-2 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 transition-all font-tajawal"
              />
              <div className="flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-wider font-tajawal">
                <span>0 ر.س</span>
                <span>500 ر.س</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center bg-neomine-teal/5 border border-neomine-teal/20 p-6 rounded-3xl">
                <label className="text-sm font-bold text-white/80 font-tajawal">حصة المدرسة (نسبة ثابتة)</label>
                <div className="flex items-center gap-2">
                  <span className="text-neomine-teal font-mono font-bold text-2xl">
                    %{SCHOOL_PERCENTAGE}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-neomine-teal animate-pulse" />
                </div>
              </div>
              <p className="text-[10px] text-white/20 font-bold px-2">تم تثبيت الحصة عند 12% وفقاً لسياسة المنظمة الجديدة.</p>
            </div>
          </div>

          {/* Result Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-neomine-teal/20 blur-[120px] rounded-full opacity-20" />
            <div className="relative bg-white/[0.03] border border-white/10 rounded-[40px] p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
              <h4 className="text-white/60 text-lg font-medium font-tajawal">صافي إيرادات المدرسة السنوية (10 أشهر)</h4>
              <div className="flex items-center gap-4 text-neomine-teal drop-shadow-[0_0_15px_rgba(0,201,177,0.4)]">
                <span className="text-5xl lg:text-7xl font-black font-tajawal">
                  {annualRevenue.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <span className="text-2xl font-bold mt-4 font-tajawal">ر.س</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { motion } from 'motion/react';
import { User, AlertTriangle, FileText, Send, ArrowLeft } from 'lucide-react';

interface StudentProfileProps {
  student: any;
  onBack: () => void;
}

export default function StudentProfile({ student, onBack }: StudentProfileProps) {
  const needsFollowUp = parseFloat(student.attendance || "100") < 85;

  const handleSendReport = () => {
    const message = `
      تقرير مستوى الطالب: ${student.name}
      الحالة: ${needsFollowUp ? 'بحاجة لمتابعة' : 'مستقر'}
      نسبة الحضور: ${student.attendance || '92%'}
      
      [توصيات مساعد Neomine الذكي]
      -----------------------------
      - يظهر الطالب شغفاً كبيراً في مسار الذكاء الاصطناعي.
      - يحتاج لزيادة التركيز في التطبيق العملي للبرمجة.
      - نوصي بتحفيز الطالب للمشاركة في مسار "نافس" القادم لتعزيز تنافسيته.
    `;
    alert(`تم توليد الرسالة التالية لولي الأمر:\n\n${message}`);
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">ملف الطالب</h2>
            <p className="text-white/40 text-sm">عرض تفاصيل الأداء الأكاديمي والحضور.</p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal">
          <User className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center text-4xl font-bold mb-4 shadow-xl shadow-neomine-teal/20">
              {student.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold mb-1">{student.name}</h3>
            <p className="text-white/40 text-sm mb-6">مسار التقنيات الحديثة</p>
            
            <div className="w-full space-y-3">
              <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-white/40 text-xs">نسبة الحضور</span>
                <span className={`text-sm font-bold ${needsFollowUp ? 'text-red-500' : 'text-neomine-teal'}`}>
                  {student.attendance || (student.status === 'present' ? '92%' : '82%')}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-white/40 text-xs">آخر ظهور</span>
                <span className="text-sm font-bold">{student.time === '-' ? 'منذ يومين' : student.time}</span>
              </div>
            </div>

            <button 
              onClick={handleSendReport}
              className="w-full mt-8 py-4 rounded-2xl bg-neomine-teal text-neomine-dark font-bold hover:shadow-lg hover:shadow-neomine-teal/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              إرسال تقرير لولي الأمر
            </button>
          </div>

          {/* AI Insights */}
          <div className="bg-linear-to-br from-neomine-teal/10 to-neomine-blue/10 border border-neomine-teal/20 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-neomine-teal" />
              <h4 className="text-sm font-bold">رؤية المساعد الذكي</h4>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              تحليل المسار التعليمي للطالب يشير إلى تميز في حل المشكلات البرمجية، نوصي بتوجيهه لتطوير مشاريع عملية في مجال الذكاء الاصطناعي لتعزيز مهاراته الحالية.
            </p>
          </div>
        </div>

        {/* Alerts and Detials */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6">تنبيهات الطالب</h3>
            
            <div className="space-y-4">
              {needsFollowUp ? (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-4 items-start"
                >
                  <div className="p-2 rounded-xl bg-red-500/20 text-red-500">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-red-500 font-bold mb-1">بحاجة لمتابعة عاجلة</h5>
                    <p className="text-xs text-red-500/70 leading-relaxed">
                      نسبة حضور الطالب منخفضة حالياً، يرجى التواصل مع ولي الأمر لمناقشة أسباب التغيب وتأثيره على التحصيل العلمي.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-white/20 text-sm">لا توجد تنبيهات نشطة لهذا الطالب حالياً.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md h-[400px]">
            <h3 className="text-lg font-bold mb-6">سجل الدرجات (تجريبي)</h3>
            <div className="flex flex-col items-center justify-center h-full text-white/20">
                <FileText className="w-12 h-12 mb-4" />
                <p>سجل الدرجات المفصل سيكون متاحاً قريباً.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

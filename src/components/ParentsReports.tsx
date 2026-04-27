import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Calendar, 
  User, 
  TrendingUp, 
  Clock, 
  Star, 
  Sparkles, 
  Download, 
  Send,
  CheckCircle2,
  AlertCircle,
  BellRing,
  Search
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const reportsData = [
  {
    id: 1,
    studentName: 'عبدالله الشمري',
    grade: 'ثانوي أول',
    path: 'ذكاء اصطناعي',
    month: 'أبريل 2025',
    summary: 'أظهر عبدالله تقدماً ملحوظاً في مجال الذكاء الاصطناعي، خاصة في فهم خوارزميات التعلم الآلي. نسبة الحضور ممتازة والتفاعل في الحصص الحية يفوق المتوسط.',
    progress: 78,
    attendance: 91,
    gradeAvg: 9.2,
    weeklyAttendance: [
      { day: 'الأحد', present: true },
      { day: 'الإثنين', present: true },
      { day: 'الثلاثاء', present: true },
      { day: 'الأربعاء', present: false },
      { day: 'الخميس', present: true },
    ],
    recommendations: [
      {
        title: 'تطوير مهارات البرمجة',
        desc: 'ننصح بتخصيص 30 دقيقة إضافية أسبوعياً لحل تحديات بايثون على المنصة لتعزيز الفهم العملي.'
      },
      {
        title: 'مشروع التخرج',
        desc: 'الطالب جاهز للبدء في التخطيط لمشروع التخرج. يرجى تشجيعه على اختيار فكرة تدمج بين الذكاء الاصطناعي والبيئة.'
      }
    ]
  }
];

export default function ParentsReports() {
  const [selectedReport, setSelectedReport] = useState(reportsData[0]);
  const [studentSearch, setStudentSearch] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredReports = reportsData.filter(r => r.studentName.includes(studentSearch));

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSendReport = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      // Success Notification logic is handled in the UI
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 font-tajawal relative" dir="rtl">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] flex items-center gap-4 bg-green-500 text-white px-8 py-5 rounded-[24px] shadow-2xl shadow-green-500/20"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
               <p className="font-black text-sm">تم إرسال التقرير بنجاح!</p>
               <p className="text-[10px] opacity-80">تم إرسال نسخة رقمية إلى ولي أمر {selectedReport.studentName}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-xl">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">تقارير الأهالي</h2>
          <p className="text-white/40 text-sm">استعراض وإرسال التقارير الأكاديمية الشهرية لأولياء الأمور.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal shrink-0">
          <FileText className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Report List - Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                placeholder="ابحث عن طالب..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pr-11 pl-4 py-3 text-white focus:outline-none focus:border-neomine-teal transition-all text-sm"
              />
           </div>

           <h3 className="text-sm font-black text-white/40 uppercase tracking-widest px-4">أحدث التقارير</h3>
           <div className="bg-white/5 border border-white/10 rounded-3xl p-2 space-y-2 backdrop-blur-md max-h-[600px] overflow-y-auto">
              <div className="flex lg:flex-col gap-2 p-1">
                {filteredReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`min-w-[200px] lg:min-w-0 flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                      selectedReport.id === report.id 
                      ? 'bg-neomine-teal text-neomine-dark font-black shadow-lg shadow-neomine-teal/20' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                       selectedReport.id === report.id ? 'bg-neomine-dark/10' : 'bg-white/5'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-right flex-1 truncate">
                      <p className="text-sm font-bold truncate">{report.studentName}</p>
                      <p className={`text-[10px] ${selectedReport.id === report.id ? 'text-neomine-dark/60' : 'text-white/30'}`}>
                        {report.month}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Report View */}
        <div className="lg:col-span-8 w-full overflow-hidden">
           <motion.div 
             key={selectedReport.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white rounded-[2px] p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden min-h-[1000px] border-t-[12px] border-neomine-teal"
           >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")' }} />

              {/* Watermark Logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                 <h1 className="text-[120px] font-black tracking-tighter transform -rotate-12">NEOMINE</h1>
              </div>

              {/* Report Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 relative z-10 border-b-2 border-gray-100 pb-8">
                 <div className="space-y-4">
                    <div className="flex flex-col">
                      <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none">
                        NEOMINE
                      </h1>
                      <span className="text-xs text-neomine-teal font-bold tracking-[0.3em] mt-1">مَنجم</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                       التقرير الأكاديمي الشهري
                    </div>
                 </div>

                 <div className="text-left md:text-left space-y-1">
                    <h3 className="text-3xl font-black text-gray-900">{selectedReport.studentName}</h3>
                    <div className="flex flex-wrap items-center justify-end gap-4 text-gray-400 text-xs font-bold">
                       <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {selectedReport.month}</span>
                       <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {selectedReport.grade} — {selectedReport.path}</span>
                    </div>
                 </div>
              </div>

              {/* Status Summary */}
              <div className="bg-gray-50 border-r-4 border-neomine-teal p-8 rounded-xl mb-12 shadow-sm">
                 <div className="flex items-center gap-3 mb-4 text-gray-900">
                    <Sparkles className="w-5 h-5 text-neomine-teal" />
                    <span className="font-black text-lg">ملخص الأداء</span>
                 </div>
                 <p className="text-gray-600 leading-relaxed font-tajawal text-lg">
                    {selectedReport.summary}
                 </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                 {/* Progress Pie */}
                 <div className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="relative w-28 h-28 mb-4">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie
                                data={[
                                   { value: selectedReport.progress, color: '#00C9B1' },
                                   { value: 100 - selectedReport.progress, color: '#f3f4f6' }
                                ]}
                                innerRadius={40}
                                outerRadius={50}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                             >
                                {[
                                   { value: selectedReport.progress, color: '#00C9B1' },
                                   { value: 100 - selectedReport.progress, color: '#f3f4f6' }
                                ].map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                             </Pie>
                          </PieChart>
                       </ResponsiveContainer>
                       <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-gray-900">
                          {selectedReport.progress}%
                       </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">التقدم العام</p>
                 </div>

                 {/* Attendance Pie */}
                 <div className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="relative w-28 h-28 mb-4">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie
                                data={[
                                   { value: selectedReport.attendance, color: '#2E86FF' },
                                   { value: 100 - selectedReport.attendance, color: '#f3f4f6' }
                                ]}
                                innerRadius={40}
                                outerRadius={50}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                             >
                                {[
                                   { value: selectedReport.attendance, color: '#2E86FF' },
                                   { value: 100 - selectedReport.attendance, color: '#f3f4f6' }
                                ].map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                             </Pie>
                          </PieChart>
                       </ResponsiveContainer>
                       <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-gray-900">
                          {selectedReport.attendance}%
                       </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">نسبة الحضور</p>
                 </div>

                 {/* Grades Card */}
                 <div className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-28 h-28 mb-4 flex items-center justify-center">
                       <div className="flex flex-col items-center">
                          <span className="text-4xl font-black text-blue-600">{selectedReport.gradeAvg}</span>
                          <span className="text-gray-300 text-xs mt-1">/ 10</span>
                       </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">الدرجات</p>
                 </div>
              </div>

              {/* Weekly Attendance */}
              <div className="mb-16">
                 <h4 className="text-lg font-black text-gray-900 mb-8 pr-4 border-r-4 border-neomine-teal">حضور الأسبوع الحالي</h4>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
                    {selectedReport.weeklyAttendance.map((day, i) => (
                       <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 shadow-sm">
                          <span className="text-xs font-bold text-gray-500">{day.day}</span>
                          {day.present ? (
                             <CheckCircle2 className="w-8 h-8 text-neomine-teal" />
                          ) : (
                             <AlertCircle className="w-8 h-8 text-red-300" />
                          )}
                          <span className={`text-[10px] font-black ${day.present ? 'text-neomine-teal' : 'text-red-400'}`}>
                             {day.present ? 'حاضر' : 'غائب'}
                          </span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* AI Recommendations */}
              <div className="space-y-8">
                 <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-neomine-teal" />
                    <h4 className="text-xl font-black text-gray-900">توصيات المساعد الذكي نيوماين</h4>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {selectedReport.recommendations.map((rec, i) => (
                       <div key={i} className="bg-white border-l-4 border-blue-500 p-6 sm:p-8 rounded-xl shadow-md">
                          <h5 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                             <TrendingUp className="w-4 h-4 text-blue-500" />
                             {rec.title}
                          </h5>
                          <p className="text-sm text-gray-500 leading-relaxed font-medium">
                             {rec.desc}
                          </p>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Footer */}
              <div className="mt-20 pt-10 border-t-2 border-gray-100 flex flex-col items-center text-center">
                 <p className="text-[11px] text-gray-300 font-black uppercase tracking-[0.4em] leading-relaxed">
                    هذا التقرير مُولد آلياً من منصة نيوماين — مدارس معرفة المستقبل
                 </p>
                 <div className="mt-6 w-12 h-1.5 bg-gray-100 rounded-full" />
              </div>
           </motion.div>

           {/* Quick Actions Float */}
           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all shadow-xl">
                 <Download className="w-6 h-6" />
                 <span>تحميل النسخة المطبوعة</span>
              </button>
              <button 
                onClick={handleSendReport}
                disabled={isSending || showSuccess}
                className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black transition-all shadow-2xl ${
                  showSuccess 
                  ? 'bg-green-500 text-white cursor-default' 
                  : 'bg-neomine-teal text-neomine-dark hover:scale-105 shadow-neomine-teal/20'
                } disabled:opacity-70`}
              >
                 {isSending ? (
                   <div className="w-6 h-6 border-2 border-neomine-dark/30 border-t-neomine-dark rounded-full animate-spin" />
                 ) : showSuccess ? (
                   <CheckCircle2 className="w-6 h-6" />
                 ) : (
                   <Send className="w-6 h-6" />
                 )}
                 <span>{isSending ? 'جاري الإرسال...' : showSuccess ? 'تم الإرسال بنجاح' : 'إرسال التقرير الآن'}</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

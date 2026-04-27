import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Target, 
  Award, 
  AlertTriangle, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bell,
  GraduationCap,
  Clock,
  Code,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trophy,
  Search,
  ArrowLeft,
  Bot,
  Send,
  MessageCircle,
  TrendingUp,
  Zap,
  MapPin,
  ClipboardList,
  Play
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { globalLeaderboard, schoolsList, allStudentsData } from '../lib/mockData';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const studentTracks = [
  { id: 1, title: 'الذكاء الاصطناعي', subtitle: 'استكشاف آفاق المستقبل والتعامل مع البيانات', progress: 65, color: '#00C9B1', icon: Brain, modules: [
    { title: 'أساسيات الذكاء الاصطناعي', progress: 100 },
    { title: 'تعلم الآلة المتقدم', progress: 40 }
  ]},
  { id: 2, title: 'البرمجة', subtitle: 'بناء التطبيقات وحل المشكلات برمجياً', progress: 85, color: '#2E86FF', icon: Code, modules: [
    { title: 'أساسيات بايثون', progress: 100 },
    { title: 'تطوير تطبيقات الويب', progress: 70 }
  ]},
  { id: 3, title: 'الأمن السيبراني', subtitle: 'حماية الأنظمة والتصدي للهجمات الرقمية', progress: 45, color: '#8884d8', icon: ShieldCheck, modules: [
    { title: 'مبادئ الأمن', progress: 80 },
    { title: 'التشفير', progress: 10 }
  ]},
  { id: 4, title: 'اختبار القدرات', subtitle: 'الاستعداد الأمثل للاختبارات القياسية', progress: 70, color: '#FFBB28', icon: Target, modules: [
    { title: 'اللفظي', progress: 90 },
    { title: 'الكمي', progress: 50 }
  ]},
  { id: 5, title: 'الاختبار التحصيلي', subtitle: 'مراجعة شاملة للمواد العلمية والنظرية', progress: 30, color: '#FF8042', icon: GraduationCap, modules: [
    { title: 'الرياضيات والفيزياء', progress: 40 },
    { title: 'الكيمياء والأحياء', progress: 10 }
  ]},
  { id: 6, title: 'مسار نافس', subtitle: 'تعزيز مهارات التفكير والتحليل الأساسية', progress: 90, color: '#AF19FF', icon: Trophy, modules: [
    { title: 'المهارات اللغوية', progress: 100 },
    { title: 'التفكير الناقد', progress: 80 }
  ]},
];

const trackLessonsMap: Record<number, any[]> = {
  1: [
    { id: 1, title: 'مقدمة في الذكاء الاصطناعي', duration: '١٢:٠٠', completed: true, module: 'أساسيات الذكاء الاصطناعي' },
    { id: 2, title: 'أساسيات تعلم الآلة', duration: '١٥:٣٠', completed: true, module: 'أساسيات الذكاء الاصطناعي' },
    { id: 3, title: 'الشبكات العصبونية', duration: '٢٠:٠٠', completed: false, module: 'تعلم الآلة المتقدم', current: true },
    { id: 4, title: 'معالجة اللغات الطبيعية', duration: '١٨:٤٥', completed: false, module: 'تعلم الآلة المتقدم' },
  ],
  2: [
    { id: 1, title: 'أساسيات البرمجة بلغة بايثون', duration: '١٠:٠٠', completed: true, module: 'أساسيات بايثون' },
    { id: 2, title: 'هياكل البيانات', duration: '١٤:٤٥', completed: true, module: 'أساسيات بايثون' },
    { id: 3, title: 'البرمجة كائنية التوجه', duration: '٢٢:١٥', completed: false, module: 'تطوير تطبيقات الويب', current: true },
    { id: 4, title: 'تطوير تطبيقات الويب', duration: '٣٠:٠٠', completed: false, module: 'تطوير تطبيقات الويب' },
  ],
  3: [
    { id: 1, title: 'مبادئ الأمن السيبراني', duration: '١١:٢٠', completed: true, module: 'مبادئ الأمن' },
    { id: 2, title: 'التشفير وحماية البيانات', duration: '١٦:٥٠', completed: false, module: 'مبادئ الأمن', current: true },
    { id: 3, title: 'أمن الشبكات', duration: '٢٥:٠٠', completed: false, module: 'التشفير' },
    { id: 4, title: 'الاختبار الاختراقي', duration: '٢٨:٣٠', completed: false, module: 'التشفير' },
  ],
  4: [
    { id: 1, title: 'استراتيجيات الحل السريع', duration: '٢٠:٠٠', completed: true, module: 'اللفظي' },
    { id: 2, title: 'التناظر اللفظي', duration: '١٨:٠٠', completed: true, module: 'اللفظي' },
    { id: 3, title: 'إكمال الجمل', duration: '١٥:٠٠', completed: false, module: 'الكمي', current: true },
    { id: 4, title: 'المقارنات الكمية', duration: '٢٢:٠٠', completed: false, module: 'الكمي' },
  ],
  5: [
    { id: 1, title: 'تأسيس الرياضيات للتحصيلي', duration: '٢٥:٠٠', completed: true, module: 'الرياضيات والفيزياء' },
    { id: 2, title: 'أساسيات الفيزياء', duration: '٣٠:٠٠', completed: false, module: 'الرياضيات والفيزياء', current: true },
    { id: 3, title: 'مفاهيم الكيمياء الحديثة', duration: '٢٨:٠٠', completed: false, module: 'الكيمياء والأحياء' },
    { id: 4, title: 'علم الأحياء لطلاب العلمي', duration: '٢٠:٠٠', completed: false, module: 'الكيمياء والأحياء' },
  ],
  6: [
    { id: 1, title: 'تهيئة اختبار نافس', duration: '١٥:٠٠', completed: true, module: 'المهارات اللغوية' },
    { id: 2, title: 'مراجعة المهارات الأساسية', duration: '٢٠:٠٠', completed: true, module: 'المهارات اللغوية' },
    { id: 3, title: 'نماذج اختبارات سابقة', duration: '٣٠:٠٠', completed: false, module: 'التفكير الناقد', current: true },
    { id: 4, title: 'نصائح لرفع درجة نافس', duration: '١٢:٠٠', completed: false, module: 'التفكير الناقد' },
  ],
};

const achievementBadges = [
  { id: 1, title: 'وسام أول كود', icon: Code, color: '#00C9B1', desc: 'إتمام أول تمرين برمجي بنجاح' },
  { id: 2, title: 'الالتزام الأسبوعي', icon: Zap, color: '#FFBB28', desc: 'الدخول للمنصة 7 أيام متتالية' },
  { id: 3, title: 'عبقري البيانات', icon: Brain, color: '#2E86FF', desc: 'تحقيق درجة كاملة في اختبار الذكاء' },
  { id: 4, title: 'بطل العروض', icon: Target, color: '#AF19FF', desc: 'إنهاء أول عرض تقديمي تقني' },
];

const myCertificates = [
  { id: 1, title: 'أساسيات الذكاء الاصطناعي', date: 'ديسمبر 2023', status: 'مكتمل', color: '#00C9B1' },
  { id: 2, title: 'تطوير تطبيقات بايثون', date: 'يناير 2024', status: 'مكتمل', color: '#2E86FF' },
  { id: 3, title: 'محترف الأمن السيبراني', date: 'قريباً', status: 'قيد الانتظار', color: '#64748B' },
];

const resumeLearningData = {
  track: 'الذكاء الاصطناعي',
  lesson: 'الشبكات العصبونية العميقة',
  progress: 65,
  durationLeft: '١٠ دقائق متبقية',
  icon: Brain,
};

const subjectRecords = [
  { name: 'الذكاء الاصطناعي', score: '95/100', status: 'حاضر' },
  { name: 'البرمجة الحلزونية', score: '88/100', status: 'حاضر' },
  { name: 'الأمن السيبراني', score: '76/100', status: 'غائب' },
  { name: 'اختبار القدرات', score: '92/100', status: 'حاضر' },
];

const gaugeData = [
  { name: 'Score', value: 9.2, fill: '#00C9B1' },
  { name: 'Remaining', value: 0.8, fill: 'rgba(255,255,255,0.05)' },
];

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function AIChat({ isWhiteTheme = false }: { isWhiteTheme?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً بك في نيوماين! أنا مساعدك الذكي لتعلم تقنيات المستقبل، كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      if (process.env.GEMINI_API_KEY) {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: currentInput,
          config: {
            systemInstruction: "أنت مساعد ذكي لمنصة نيوماين التعليمية. متخصص في مجالات الذكاء الاصطناعي، البرمجة، الأمن السيبراني، وعلم البيانات. أجب بطريقة تقنية، ناصحة، وباللغة العربية الفصحى المبسطة.",
          },
        });
        
        const botMessage: Message = {
          id: Date.now().toString(),
          text: response.text || "عذراً، لم أستطع معالجة هذا الطلب حالياً.",
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("No API Key");
      }
    } catch (error) {
      console.error("Gemini API Error", error);
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: Date.now().toString(),
          text: "أنا هنا للمساعدة! يمكنك استكشاف مسارات الذكاء الاصطناعي والبرمجة من لوحة تحكمك.",
          isBot: true,
          timestamp: new Date(),
        }]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`h-[60vh] sm:h-[70vh] flex flex-col ${isWhiteTheme ? 'bg-white border-gray-100 shadow-xl' : 'bg-[#0b1120] border-white/5 shadow-2xl'} border rounded-[32px] sm:rounded-[40px] overflow-hidden backdrop-blur-xl`}>
      <div className={`p-4 sm:p-8 border-b ${isWhiteTheme ? 'border-gray-100' : 'border-white/5'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-linear-to-r from-neomine-teal/10 to-transparent`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-neomine-teal/20 flex items-center justify-center text-neomine-teal animate-pulse shrink-0">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="text-right">
            <h3 className={`text-lg sm:text-xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>مساعد نيوماين الذكي</h3>
            <p className={`${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} text-[10px] sm:text-xs`}>متصل وجاهز للإجابة على تساؤلاتك</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className={`text-[10px] ${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} font-bold uppercase tracking-widest leading-none`}>System Active</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 sm:space-y-6 scrollbar-hide">
        {messages.map((m) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={m.id} 
            className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[70%] p-6 rounded-3xl text-sm leading-relaxed shadow-xl ${
              m.isBot 
              ? `${isWhiteTheme ? 'bg-gray-50 text-gray-700 border-gray-100' : 'bg-white/5 text-white/80 border-white/5'} rounded-tr-none border` 
              : 'bg-neomine-teal text-neomine-dark font-bold rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`${isWhiteTheme ? 'bg-gray-50' : 'bg-white/5'} p-6 rounded-3xl rounded-tr-none flex gap-2 items-center`}>
              <span className="w-2 h-2 bg-neomine-teal rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-neomine-teal rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-neomine-teal rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-8 border-t ${isWhiteTheme ? 'border-gray-100 bg-gray-50/50' : 'border-white/5 bg-black/40'}`}>
        <div className="relative max-w-4xl mx-auto">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل عن أي مادة أو استفسار تقني..."
            className={`w-full ${isWhiteTheme ? 'bg-white border-gray-200 focus:bg-gray-50' : 'bg-white/5 border-white/10 focus:bg-white/[0.08]'} border rounded-2xl py-5 pr-6 pl-16 text-sm focus:outline-none focus:border-neomine-teal/50 transition-all text-right ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}
            dir="rtl"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-neomine-teal text-neomine-dark disabled:opacity-50 disabled:grayscale transition-all shadow-lg hover:scale-110 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const performanceData = [
  { week: 'أسبوع 1', level: 65 },
  { week: 'أسبوع 2', level: 72 },
  { week: 'أسبوع 3', level: 68 },
  { week: 'أسبوع 4', level: 75 },
  { week: 'أسبوع 5', level: 82 },
  { week: 'أسبوع 6', level: 78 },
  { week: 'أسبوع 7', level: 85 },
  { week: 'أسبوع 8', level: 91 },
];

export default function StudentDashboard({ activeTab, isWhiteTheme = false }: { activeTab: string, isWhiteTheme?: boolean }) {
  const currentStudent = allStudentsData?.find(s => s.name === 'عبدالله الشمري') || allStudentsData?.[0] || { name: 'طالب نيوماين', points: 0, mastery: 78, schoolId: 1 };
  const studentSchool = schoolsList?.find(sch => sch.id === currentStudent?.schoolId) || schoolsList?.[0] || { name: 'مدرسة نيوماين العالمية' };
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [notifications] = useState([
    { id: 1, text: 'أنت مرشح لمسابقة البرمجة الإقليمية في مايو — استعد!', type: 'award', time: 'منذ ساعتين' },
    { id: 2, text: 'أكمل مشروع تصنيف الصور — 70% منجز ويحتاج 30 دقيقة فقط', type: 'project', time: 'منذ ٥ ساعات' },
    { id: 3, text: 'تم إضافة مادة جديدة في مسار الذكاء الاصطناعي', type: 'system', time: 'أمس' },
  ] || []);

  const TrackContentView = ({ track, onClose }: { track: any, onClose: () => void }) => {
    if (!track) return null;
    const lessons = trackLessonsMap[track?.id] || [];
    const modules = [...new Set(lessons.map(l => l.module))];
    const [activeLesson, setActiveLesson] = useState(lessons.find(l => !l.completed) || lessons[0]);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full bg-white rounded-[40px] border border-[#E2E8F0] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:h-[85vh]"
      >
        {/* Sidebar Curriculum */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-l border-[#E2E8F0] bg-gray-50/50 flex flex-col min-h-[400px] lg:h-full overflow-hidden">
           <div className="p-8 border-b border-[#E2E8F0] bg-white shrink-0">
              <h3 className="text-xl font-black text-[#0A1128] mb-1 font-tajawal">{track.title}</h3>
              <div className="flex items-center gap-2">
                 <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-neomine-blue rounded-full" style={{ width: `${track.progress}%` }} />
                 </div>
                 <span className="text-[10px] font-black text-neomine-blue">{track.progress}%</span>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar h-full">
              {modules.map((modName, mIdx) => {
                 const modLessons = lessons.filter(l => l.module === modName);
                 const modProgress = track.modules?.find(m => m.title === modName)?.progress || 0;
                 
                 return (
                    <div key={mIdx} className="space-y-2">
                       <div className="px-4 flex justify-between items-end">
                          <h4 className="text-[11px] font-black text-[#64748B] uppercase tracking-wider">{modName}</h4>
                          <span className="text-[9px] font-bold text-neomine-blue">{modProgress}%</span>
                       </div>
                       
                       <div className="space-y-1">
                          {modLessons.map((lesson) => {
                             const isActive = activeLesson?.id === lesson.id;
                             const isLocked = !lesson.completed && !lesson.current && lessons.indexOf(lesson) > lessons.findIndex(l => l.current || !l.completed);
                             
                             return (
                                <button 
                                  key={lesson.id}
                                  onClick={() => !isLocked && setActiveLesson(lesson)}
                                  className={`w-full text-right p-4 rounded-2xl transition-all flex items-center gap-3 border ${
                                    isActive ? 'bg-white border-neomine-blue/30 shadow-sm' : 'border-transparent'
                                  } ${isLocked ? 'opacity-50 grayscale' : 'hover:bg-white/60'}`}
                                >
                                   {lesson.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                   ) : isLocked ? (
                                      <ShieldCheck className="w-4 h-4 text-gray-300 shrink-0" />
                                   ) : (
                                      <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-neomine-blue' : 'border-gray-300'} shrink-0`} />
                                   )}
                                   <div className="flex-1 min-w-0">
                                      <p className={`text-xs font-bold truncate ${isActive ? 'text-neomine-blue' : 'text-[#0A1128]'}`}>{lesson.title}</p>
                                      <p className="text-[9px] text-[#64748B] font-medium">{lesson.duration}</p>
                                   </div>
                                </button>
                             );
                          })}
                       </div>
                    </div>
                 );
              })}
           </div>

           <div className="p-6 border-t border-[#E2E8F0] bg-white mt-auto shrink-0">
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-xl bg-gray-50 border border-[#E2E8F0] text-[#64748B] font-black text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                 <ArrowLeft className="w-4 h-4 rotate-180" />
                 <span>إغلاق المحتوى</span>
              </button>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-[500px]">
           {activeLesson ? (
              <div className="flex flex-col h-full">
                 <div className="aspect-video bg-black relative shrink-0">
                    <img 
                      src={`https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80`} 
                      alt="Lesson Video"
                      className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <button className="w-20 h-20 rounded-full bg-neomine-blue text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                          <Play className="w-10 h-10 fill-white ml-1" />
                       </button>
                    </div>
                 </div>
                 
                 <div className="p-6 md:p-10 flex-1 overflow-y-auto no-scrollbar">
                    <div className="max-w-4xl mx-auto">
                       <span className="text-[10px] font-black text-neomine-blue uppercase tracking-[0.2em] mb-2 block">{activeLesson.module}</span>
                       <h2 className="text-2xl md:text-3xl font-black text-[#0A1128] mb-6 font-tajawal">{activeLesson.title}</h2>
                       <div className="prose prose-sm max-w-none text-[#64748B] font-medium leading-loose space-y-6 text-right">
                          <p>مرحباً بك في هذا الدرس المتقدم. سنقوم اليوم باستكشاف المفاهيم الأساسية والتقنيات الحديثة المتعلقة بهذا الموضوع.</p>
                          <p>خلال هذا الفيديو، سنغطي النقاط التالية:</p>
                          <ul className="list-disc pr-6 space-y-2">
                             <li>مقدمة تاريخية وتطور المفهوم</li>
                             <li>الأدوات اللازمة لبدء العمل</li>
                             <li>تطبيقات عملية في مجالات الحياة المختلفة</li>
                             <li>خاتمة وملخص لأهم المكتسبات</li>
                          </ul>
                       </div>
                       
                       <div className="mt-12 p-8 bg-gray-50 rounded-[32px] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="text-center sm:text-right">
                             <h4 className="text-base font-black text-[#0A1128] mb-1">هل أكملت هذا الدرس؟</h4>
                             <p className="text-xs text-[#64748B] font-bold">بمجرد الضغط، سيتم تحديث رصيد نقاطك وحالتك الدراسية.</p>
                          </div>
                          <button className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-green-500/20 hover:scale-105 transition-all">
                             تحديد كمكتمل
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                 <Bot className="w-20 h-20 text-neomine-blue opacity-20 mb-6" />
                 <h3 className="text-2xl font-black text-[#0A1128] mb-2">اختر درساً للبدء</h3>
                 <p className="text-[#64748B] font-bold">يرجى اختيار أحد الدروس المتاحة من القائمة الجانبية لمتابعة رحلتك التعليمية.</p>
              </div>
           )}
        </div>
      </motion.div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'daily_learning':
        return (
          <div className="space-y-10 animate-in fade-in duration-700">
            {/* Resume Learning Card */}
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8`}>
               <div className="lg:col-span-8">
                  <div className={`${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-linear-to-r from-neomine-blue/20 to-transparent border-white/5'} border rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 group overflow-hidden relative`}>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-neomine-blue/5 blur-[60px] -z-10" />
                     <div className="w-20 h-20 md:w-24 md:h-24 rounded-[32px] bg-neomine-blue/10 flex items-center justify-center text-neomine-blue shadow-inner group-hover:scale-105 transition-transform shrink-0">
                        <resumeLearningData.icon className="w-10 h-10 md:w-12 md:h-12" />
                     </div>
                     <div className="flex-1 text-center md:text-right">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
                           <span className="text-[10px] font-black bg-neomine-blue/10 text-neomine-blue px-3 py-1 rounded-full uppercase tracking-widest">متابعة التعلم</span>
                           <span className={`text-[10px] font-bold ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'}`}>{resumeLearningData.track}</span>
                        </div>
                        <h3 className={`text-xl md:text-2xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-1`}>{resumeLearningData.lesson}</h3>
                        <p className={`text-xs ${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} font-bold`}>{resumeLearningData.durationLeft}</p>
                     </div>
                     <button 
                        onClick={() => setSelectedTrack(studentTracks[0])}
                        className="w-full md:w-auto px-10 py-5 bg-neomine-blue text-white rounded-2xl font-black text-sm shadow-xl shadow-neomine-blue/20 hover:scale-105 active:scale-95 transition-all"
                     >
                        متابعة الآن
                     </button>
                  </div>
               </div>
               
               <div className="lg:col-span-4">
                  <div className={`${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-white/5 border-white/5'} border rounded-[40px] p-8 flex items-center gap-6 h-full`}>
                     <div className="relative w-20 h-20 shrink-0">
                        <svg className="w-full h-full -rotate-90 transform">
                           <circle className={`${isWhiteTheme ? 'text-gray-100' : 'text-white/5'}`} strokeWidth="8" stroke="currentColor" fill="transparent" r="32" cx="40" cy="40" />
                           <circle className="text-neomine-blue" strokeWidth="8" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - 78/100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="32" cx="40" cy="40" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className={`text-sm font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>78%</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <h4 className={`text-base font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-1`}>الإنجاز الكلي</h4>
                        <p className={`text-[10px] ${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} font-bold leading-relaxed`}>لقد قطعت شوطاً كبيراً في رحلتك التعليمية، أنت قريب من التخرج!</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Main Daily View */}
              <div className="lg:col-span-8 space-y-8">
                 {/* Current Track & Lesson Card */}
                 <div className={`${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-[#0b1120] border-white/5 shadow-2xl backdrop-blur-2xl'} border rounded-[32px] md:rounded-[48px] p-6 md:p-8 lg:p-12 relative overflow-hidden`}>
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-neomine-teal to-neomine-blue" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
                       <div className="flex items-center gap-4 md:gap-6">
                           <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${isWhiteTheme ? 'bg-neomine-blue/5 border-[#E2E8F0]' : 'bg-neomine-teal/10 border-neomine-teal/20'} flex items-center justify-center text-neomine-blue border`}>
                               <Brain className="w-6 h-6 md:w-10 md:h-10" />
                           </div>
                           <div className="text-right">
                               <span className="text-[9px] md:text-[10px] font-black text-neomine-blue uppercase tracking-[0.2em] mb-1 block">المسار الحالي</span>
                               <h3 className={`text-xl md:text-3xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} leading-none`}>الذكاء الاصطناعي</h3>
                           </div>
                       </div>
                       <button 
                         onClick={() => setSelectedTrack(studentTracks[0])}
                         className="w-full md:w-auto px-6 md:px-10 py-3 md:py-5 bg-neomine-blue text-white rounded-xl md:rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-neomine-blue/20 text-sm md:text-base"
                       >
                           الانتقال للمسار
                       </button>
                    </div>

                    <div className={`${isWhiteTheme ? 'bg-gray-50 border-[#E2E8F0]' : 'bg-white/5 border-white/10'} border rounded-[24px] md:rounded-[40px] p-6 md:p-10`}>
                       <div className="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                           <div className="text-right">
                               <span className={`text-[10px] md:text-xs font-black ${isWhiteTheme ? 'text-[#64748B]' : 'text-white/20'} uppercase tracking-[0.2em] mb-2 md:mb-3 block`}>موضوع اليوم</span>
                               <h4 className={`text-xl md:text-3xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} leading-tight`}>التعلم العميق والشبكات العصبونية</h4>
                           </div>
                           <div className="bg-neomine-blue/10 px-3 md:px-5 py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black text-neomine-blue border border-neomine-blue/20 uppercase tracking-tighter">المستوى المتقدم</div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <div className="flex justify-between items-end">
                                 <div className="text-right">
                                    <span className={`text-[10px] font-black ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'} uppercase tracking-widest block mb-1`}>نسبة الحضور لهذا المسار</span>
                                    <span className={`text-2xl font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>٩٤٪</span>
                                 </div>
                              </div>
                              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: '94%' }}
                                   className="h-full bg-linear-to-r from-neomine-teal to-neomine-blue rounded-full shadow-[0_0_10px_rgba(0,201,177,0.5)]"
                                 />
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <div className={`flex-1 ${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-white/5 border-white/5'} rounded-2xl p-5 border flex flex-col items-center justify-center text-center`}>
                                 <Clock className="w-5 h-5 text-neomine-teal mb-2" />
                                 <span className={`text-[10px] font-black ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'} uppercase mb-1`}>الموعد</span>
                                 <span className={`text-sm font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>09:00 ص</span>
                              </div>
                              <div className={`flex-1 ${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-white/5 border-white/5'} rounded-2xl p-5 border flex flex-col items-center justify-center text-center text-green-500`}>
                                 <Bot className="w-5 h-5 mb-2" />
                                 <span className={`text-[10px] font-black ${isWhiteTheme ? 'text-green-500/40' : 'text-green-500/30'} uppercase mb-1`}>الحالة</span>
                                 <span className="text-sm font-black">جاهز</span>
                              </div>
                           </div>
                       </div>
                    </div>
                 </div>

                 {/* Quick Learning Links */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'بنك الأسئلة', icon: ClipboardList, desc: 'اختبارات قصيرة لتقوية مهاراتك', color: 'bg-blue-500' },
                      { title: 'المشاريع العملية', icon: Code, desc: 'تطبيق ما تعلمته في مشاريع حقيقية', color: 'bg-purple-500' },
                      { title: 'مكتبة نيوماين', icon: GraduationCap, desc: 'كتب ومقالات إثرائية متنوعة', color: 'bg-neomine-teal' },
                    ].map((item, i) => (
                      <div key={i} className={`${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-white/5 border-white/10'} border p-8 rounded-[32px] hover:scale-105 transition-all cursor-pointer group`}>
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl ${item.color}`}>
                            <item.icon className="w-6 h-6" />
                         </div>
                         <h4 className={`text-lg font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-2`}>{item.title}</h4>
                         <p className={`text-xs ${isWhiteTheme ? 'text-[#64748B]' : 'text-white/30'} font-bold leading-relaxed`}>{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Live Sessions Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                 <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#0b1120] border-white/5'} border rounded-[40px] p-8 shadow-2xl`}>
                    <div className="flex items-center justify-between mb-8">
                        <div className={`flex items-center gap-3 ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>
                            <Clock className="w-5 h-5 text-neomine-teal" />
                            <h4 className="text-lg font-black">جدول الحصص المباشرة</h4>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {[
                          { title: 'أساسيات الشبكات العصبونية', time: '10:30 ص', teacher: 'أ. سامي المنصور', active: true },
                          { title: 'تطوير الويب المتقدم', time: '01:00 م', teacher: 'أ. فهد العتيبي', active: false },
                          { title: 'الأمن السيبراني للمبتدئين', time: '04:00 م', teacher: 'أ. خالد الدوسري', active: false }
                        ].map((session, i) => (
                          <div key={i} className={`p-5 rounded-2xl border transition-all ${session.active ? 'bg-neomine-teal/5 border-neomine-teal/20' : `${isWhiteTheme ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-transparent'} opacity-50`}`}>
                             <div className="flex justify-between items-start mb-3">
                                <span className={`text-xs font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>{session.title}</span>
                                <span className={`text-[9px] font-black px-2 py-1 rounded-md ${session.active ? 'bg-neomine-teal text-neomine-dark' : `${isWhiteTheme ? 'bg-gray-200 text-gray-500' : 'bg-white/10 text-white/40'}`}`}>
                                   {session.active ? 'الآن' : session.time}
                                </span>
                             </div>
                             <div className={`flex items-center gap-2 text-[10px] ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'} font-bold`}>
                                <MapPin className="w-3 h-3" />
                                {session.teacher}
                             </div>
                          </div>
                        ))}
                    </div>
                 </div>

                 {/* System Recommendation */}
                 <div className={`${isWhiteTheme ? 'bg-white border-neomine-teal/40 shadow-sm' : 'bg-linear-to-br from-neomine-teal/10 to-[#050A14] border-neomine-teal/20'} border rounded-[40px] p-8`}>
                    <Sparkles className="w-8 h-8 text-neomine-teal mb-6" />
                    <h4 className={`text-lg font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'} mb-4`}>نصيحة نيوماين لليوم</h4>
                    <p className={`text-xs ${isWhiteTheme ? 'text-gray-500' : 'text-white/60'} leading-relaxed font-bold`}>
                       "الاستمرار في التعلم لمدة ١٥ دقيقة يومياً أفضل من التعلم لساعات بشكل متقطع. حافظ على الستريك الخاص بك اليوم!"
                    </p>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'my_profile':
        return (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Profile Card */}
              <div className={`lg:col-span-4 ${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-linear-to-br from-neomine-teal/20 to-neomine-blue/20 border-white/10'} border rounded-[40px] p-8 flex items-center gap-6 shadow-2xl backdrop-blur-xl group`}>
                <div className="w-24 h-24 rounded-[32px] bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-neomine-teal/30 group-hover:scale-105 transition-transform">
                  ع.ش
                </div>
                <div className="text-right">
                  <h3 className={`text-2xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-1`}>عبدالله الشمري</h3>
                  <div className="space-y-1">
                    <p className={`${isWhiteTheme ? 'text-[#64748B]' : 'text-white/40'} text-[10px] font-bold uppercase tracking-widest tracking-tighter`}>Student ID: #29482</p>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-neomine-teal" />
                      <p className={`${isWhiteTheme ? 'text-[#64748B]' : 'text-white/60'} text-[11px] font-bold`}>{studentSchool?.name || 'مدرسة نيوماين العالمية'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'التقدم الكلي', value: '78%', color: 'text-[#0A1128]', sub: 'إنجاز المسارات' },
                  { label: 'معدل الحضور', value: '91%', color: 'text-blue-600', sub: '47 من 52 حصة' },
                  { label: 'الترتيب الإجمالي', value: '1', color: 'text-purple-600', sub: 'الأول من 28 طالب' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border-[#E2E8F0] shadow-sm border rounded-[32px] p-5 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-all">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase mb-2 tracking-tighter">{stat.label}</p>
                    <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                    <p className="text-[9px] text-[#64748B]/60 mt-1 font-bold">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Streak Card */}
            <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-linear-to-br from-[#0b1120] to-[#050A14] border-2 border-[#C9A84C]/20'} rounded-[32px] md:rounded-[48px] p-6 md:p-10 relative overflow-hidden group shadow-2xl`}>
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 blur-[100px] group-hover:bg-[#C9A84C]/10 transition-all -z-10" />
               <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 relative z-10 text-right">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C] fill-[#C9A84C]" />
                        <h4 className={`text-lg md:text-2xl font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>مؤشر الالتزام (Engagement Streak)</h4>
                     </div>
                     <p className={`${isWhiteTheme ? 'text-gray-500' : 'text-white/50'} text-xs md:text-sm leading-relaxed font-bold`}>
                        نقاطك تزداد آلياً بانتظام حضورك وتفوقك الدراسي. تم احتساب النقاط بناءً على (معيار الحضور + الدرجات). حافظ على نشاطك لرفع ترتيبك!
                     </p>
                  </div>
                  <div className="flex gap-4 md:gap-6 w-full md:w-auto">
                     <div className={`${isWhiteTheme ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/10'} border p-5 md:p-6 rounded-2xl md:rounded-[32px] text-center`}>
                        <span className={`text-[9px] md:text-[10px] font-black ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} uppercase tracking-widest mb-2 block leading-none`}>الستريك</span>
                        <span className="text-3xl md:text-4xl font-black text-[#C9A84C]">12</span>
                        <span className={`text-[9px] md:text-[10px] font-bold ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} block mt-1`}>يوماً</span>
                     </div>
                     <div className={`${isWhiteTheme ? 'bg-[#C9A84C]/5 border-[#C9A84C]/20' : 'bg-white/10 border-[#C9A84C]/30'} border p-5 md:p-6 rounded-2xl md:rounded-[32px] text-center`}>
                        <span className={`text-[9px] md:text-[10px] font-black ${isWhiteTheme ? 'text-[#C9A84C]/60' : 'text-[#C9A84C]/40'} uppercase tracking-widest mb-2 block leading-none`}>النقاط</span>
                        <span className="text-3xl md:text-4xl font-black text-[#C9A84C]">1240</span>
                        <span className={`text-[9px] md:text-[10px] font-bold ${isWhiteTheme ? 'text-[#C9A84C]/40' : 'text-[#C9A84C]/20'} block mt-1`}>نقطة</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Performance Analysis */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
               {/* Growth Chart */}
               <div className={`xl:col-span-12 ${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#0b1120] border-white/5'} border rounded-[32px] md:rounded-[48px] p-6 md:p-8 lg:p-12 shadow-2xl space-y-12`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${isWhiteTheme ? 'bg-neomine-blue/5 border-neomine-blue/10' : 'bg-neomine-blue/10 border-neomine-blue/20'} flex items-center justify-center text-neomine-blue border`}>
                           <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="text-right">
                           <h3 className={`text-xl md:text-2xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>تطور المستوى الأكاديمي</h3>
                           <p className={`${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} text-[10px] md:text-xs mt-1`}>مقدار التقدم المحرز في كافة المسارات خلال الشهرين الماضيين</p>
                        </div>
                     </div>
                  </div>

                  <div className="h-[200px] sm:h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                           <defs>
                              <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor={isWhiteTheme ? '#0A1128' : '#00C9B1'} stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor={isWhiteTheme ? '#0A1128' : '#00C9B1'} stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke={isWhiteTheme ? '#E2E8F0' : 'rgba(255,255,255,0.05)'} vertical={false} />
                           <XAxis 
                              dataKey="week" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: isWhiteTheme ? '#64748B' : 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                              dy={10}
                           />
                           <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: isWhiteTheme ? '#64748B' : 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                           />
                           <Tooltip 
                              content={({ active, payload }) => {
                                 if (active && payload && payload.length) {
                                    return (
                                       <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-xl' : 'bg-[#0b1120] border-white/10'} border p-4 rounded-2xl shadow-2xl backdrop-blur-xl`}>
                                          <p className={`text-[10px] font-black ${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} uppercase mb-1`}>{payload[0].payload.week}</p>
                                          <p className={`text-lg font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-neomine-teal'}`}>{payload[0].value}% <span className={`text-[10px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'}`}>كفاءة</span></p>
                                       </div>
                                    );
                                 }
                                 return null;
                              }}
                           />
                           <Area type="monotone" dataKey="level" stroke="#00F0FF" strokeWidth={4} fillOpacity={1} fill="url(#colorLevel)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>

                  {/* Rewards & Certificates Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-[#E2E8F0]">
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className={`text-xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>شهاداتي (Certificates)</h4>
                           <Award className="w-6 h-6 text-neomine-teal" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {myCertificates.map(cert => (
                              <div key={cert.id} className={`p-6 rounded-[32px] border ${isWhiteTheme ? 'bg-white border-gray-100 shadow-xs' : 'bg-white/5 border-white/5'} ${cert.status === 'قيد الانتظار' ? 'opacity-40 grayscale pointer-events-none' : 'hover:scale-[1.02] transition-transform cursor-pointer'}`}>
                                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${cert.color}15`, color: cert.color }}>
                                    <Award className="w-6 h-6" />
                                 </div>
                                 <h5 className={`text-sm font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-1`}>{cert.title}</h5>
                                 <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'}`}>{cert.date}</span>
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${cert.status === 'مكتمل' ? 'bg-green-500/10 text-green-500' : 'bg-gray-200 text-gray-500'}`}>{cert.status}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className={`text-xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>شارات التميز (Badges)</h4>
                           <Sparkles className="w-6 h-6 text-neomine-blue" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                           {achievementBadges.map(badge => (
                              <div key={badge.id} className={`p-6 rounded-[32px] border ${isWhiteTheme ? 'bg-white border-gray-100 shadow-xs' : 'bg-white/5 border-white/5'} flex flex-col items-center text-center group cursor-help hover:bg-gray-50 transition-all`}>
                                 <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg transition-transform group-hover:rotate-12" style={{ backgroundColor: `${badge.color}15`, color: badge.color }}>
                                    <badge.icon className="w-7 h-7" />
                                 </div>
                                 <h5 className={`text-[11px] font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-1`}>{badge.title}</h5>
                                 <p className="text-[9px] text-[#64748B] font-medium leading-tight">{badge.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>


            </div>
          </div>
        );
      case 'tracks':
        return (
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black flex items-center gap-3">
                 <Trophy className="w-7 h-7 text-neomine-teal" />
                 مساراتي التعليمية
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentTracks.map(track => (
                <motion.div 
                  key={track.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className={`${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-white/[0.03] border-white/5 shadow-lg shadow-black/20'} border rounded-[40px] p-8 transition-all group cursor-pointer relative overflow-hidden`}
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 opacity-30 shadow-lg" style={{ backgroundColor: track.color }} />
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl" style={{ backgroundColor: `${track.color}15`, color: track.color }}>
                      <track.icon className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col items-end">
                       <span className={`text-[10px] ${isWhiteTheme ? 'text-[#64748B]' : 'text-white/20'} font-black tracking-widest mb-1 uppercase leading-none`}>Track Info</span>
                       <span className="text-2xl font-black" style={{ color: track.color }}>{track.progress}%</span>
                    </div>
                  </div>
                  <h4 className={`text-xl font-black mb-6 group-hover:text-neomine-blue transition-colors tracking-tight ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>{track.title}</h4>
                  <div className={`w-full h-3 ${isWhiteTheme ? 'bg-gray-100' : 'bg-white/5'} rounded-full overflow-hidden mb-8 shadow-inner`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${track.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: track.color }}
                    />
                  </div>
                  <button 
                    onClick={() => setSelectedTrack(track)}
                    className={`w-full py-4 rounded-2xl ${isWhiteTheme ? 'bg-neomine-blue text-white shadow-lg shadow-neomine-blue/20' : 'bg-white/5 border-white/5 text-white/40'} text-xs font-black group-hover:scale-105 transition-all flex items-center justify-center gap-2 border shadow-xs`}
                  >
                     متابعة التعلم
                     <ArrowLeft className="w-4 h-4 translate-y-0.5" />
                  </button>
                </motion.div>
              ))}
            </div>


          </section>
        );
      case 'grades':
        return (
          <section className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#0b1120] border-white/5 shadow-2xl'} border rounded-[48px] p-10 backdrop-blur-xl relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-neomine-teal to-neomine-blue" />
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${isWhiteTheme ? 'bg-neomine-teal/5' : 'bg-white/5'}`}>
                     <Award className="w-7 h-7 text-neomine-teal" />
                  </div>
                  <h3 className={`text-2xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}>سجل الحضور والدرجات التفصيلي</h3>
               </div>
               <button className={`px-6 py-3 rounded-2xl ${isWhiteTheme ? 'bg-gray-50 border-gray-100 text-gray-500' : 'bg-white/5 border-white/5 text-white/40'} border text-[10px] font-black hover:text-neomine-teal transition-all hover:bg-gray-100 uppercase tracking-[0.2em] leading-none`}>تحميل التقرير PDF</button>
            </div>
            <div className="overflow-x-auto w-full no-scrollbar">
              <table className="w-full text-right border-collapse min-w-[600px]">
                <thead>
                  <tr className={`border-b ${isWhiteTheme ? 'border-gray-100' : 'border-white/5'}`}>
                    <th className={`pb-6 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-[0.2em] pr-4 leading-none`}>المسار التعليمي</th>
                    <th className={`pb-6 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-[0.2em] text-center leading-none`}>الدرجة النهائية</th>
                    <th className={`pb-6 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-[0.2em] text-center leading-none`}>نسبة الحضور</th>
                    <th className={`pb-6 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-[0.2em] text-center leading-none`}>التفاصيل</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isWhiteTheme ? 'divide-gray-100' : 'divide-white/5'}`}>
                  {subjectRecords.map((record, i) => (
                    <motion.tr 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`group ${isWhiteTheme ? 'hover:bg-gray-50' : 'hover:bg-white/[0.02]'} transition-colors`}
                    >
                      <td className="py-8 pr-4">
                         <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-neomine-teal shadow-[0_0_12px_rgba(0,201,177,0.4)]" />
                            <span className={`font-bold text-lg tracking-tight ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>{record.name}</span>
                         </div>
                      </td>
                      <td className="py-8 text-center">
                        <span className={`font-mono text-neomine-teal font-black text-xl ${isWhiteTheme ? 'bg-gray-50' : 'bg-white/5'} px-4 py-2 rounded-xl border ${isWhiteTheme ? 'border-gray-100' : 'border-white/5'} leading-none`}>{record.score}</span>
                      </td>
                      <td className="py-8 text-center">
                        <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl text-[11px] font-black shadow-inner leading-none ${
                          record.status === 'حاضر' ? 'bg-green-500/10 text-green-500 border border-green-500/10' : 'bg-red-500/10 text-red-500 border border-red-500/10'
                        }`}>
                          {record.status === 'حاضر' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {record.status}
                        </span>
                      </td>
                      <td className="py-8 text-center">
                        <button className={`w-10 h-10 rounded-2xl ${isWhiteTheme ? 'bg-white border-gray-100 text-gray-300' : 'bg-white/5 border-white/5 text-white/20'} border hover:bg-neomine-teal hover:text-white transition-all mx-auto shadow-sm flex items-center justify-center`}>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case 'leaderboard':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Legend / System Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`md:col-span-2 ${isWhiteTheme ? 'bg-white border-neomine-teal/20 shadow-sm' : 'bg-[#0b1120] border-[#C9A84C]/20 border-2'} rounded-[40px] p-8 md:p-12 relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1.5 ${isWhiteTheme ? 'bg-neomine-teal' : 'bg-[#C9A84C]'}`} />
                <h3 className={`text-3xl font-black ${isWhiteTheme ? 'text-neomine-teal' : 'text-[#C9A84C]'} mb-6 flex items-center gap-4`}>
                  <Zap className={`w-8 h-8 ${isWhiteTheme ? 'fill-neomine-teal' : 'fill-[#C9A84C]'}`} />
                  كيف تعمل لوحة الشرف؟
                </h3>
                <p className={`${isWhiteTheme ? 'text-gray-600' : 'text-white/70'} text-lg leading-loose font-medium mb-8`}>
                  نقاطك تزداد آلياً بانتظام حضورك وتفوقك الدراسي. نيوماين تمنح جوائز قيمة لأفضل <span className={`${isWhiteTheme ? 'text-neomine-teal' : 'text-[#C9A84C]'} font-black`}>5 طلاب شهرياً</span> من كل مدرسة. استمر في التألق!
                </p>
                <div className="flex gap-4">
                  <div className={`px-6 py-3 ${isWhiteTheme ? 'bg-neomine-teal/5 border-neomine-teal/10 text-neomine-teal' : 'bg-[#C9A84C]/10 border-[#C9A84C]/20 text-[#C9A84C]'} border rounded-2xl text-[11px] font-black`}>الحضور اليومي: +50 نقطة</div>
                  <div className={`px-6 py-3 ${isWhiteTheme ? 'bg-neomine-teal/5 border-neomine-teal/10 text-neomine-teal' : 'bg-[#C9A84C]/10 border-[#C9A84C]/20 text-[#C9A84C]'} border rounded-2xl text-[11px] font-black`}>الدرجة الكاملة: +100 نقطة</div>
                </div>
              </div>
              <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-linear-to-br from-[#C9A84C]/20 to-transparent border-[#C9A84C]/30'} border rounded-[40px] p-10 flex flex-col justify-center items-center text-center`}>
                 <Trophy className={`w-16 h-16 ${isWhiteTheme ? 'text-neomine-teal shadow-neomine-teal/20' : 'text-[#C9A84C] drop-shadow-[0_0_15px_rgba(201,168,76,0.5)]'} mb-6`} />
                 <h4 className={`text-xl font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>ترتيبك الحالي</h4>
                 <div className={`text-5xl font-black ${isWhiteTheme ? 'text-neomine-teal' : 'text-[#C9A84C]'} my-4`}>#12</div>
                 <p className={`${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} text-xs font-bold uppercase tracking-widest leading-none`}>على مستوى المنطقة</p>
              </div>
            </div>

            {/* List */}
            <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#0b1120] border-white/5'} border rounded-[48px] overflow-hidden shadow-2xl`}>
              <div className={`p-10 border-b ${isWhiteTheme ? 'border-gray-100 bg-gray-50/30' : 'border-white/5 bg-white/[0.01]'} flex justify-between items-center`}>
                 <div className="text-right">
                    <h4 className={`text-2xl font-black mb-1 ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>المتصدرون في منطقة مكة المكرمة</h4>
                    <p className={`${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} text-sm font-bold flex items-center gap-2`}>
                       <MapPin className="w-4 h-4" />
                       المنطقة الغربية — مكة وجدة
                    </p>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className={`${isWhiteTheme ? 'bg-gray-50' : 'bg-white/[0.02]'}`}>
                      <th className={`p-8 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-widest text-right`}>الترتيب</th>
                      <th className={`p-8 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-widest text-right`}>الطالب</th>
                      <th className={`p-8 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-widest text-right whitespace-nowrap`}>المدرسة</th>
                      <th className={`p-8 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-widest text-center`}>المسار</th>
                      <th className={`p-8 text-[11px] ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} font-black uppercase tracking-widest text-center`}>النقاط</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isWhiteTheme ? 'divide-gray-100' : 'divide-white/5'}`}>
                    {globalLeaderboard.filter(s => s.city === 'مكة المكرمة' || s.city === 'جدة').map((student, i) => (
                      <tr key={student.id} className={`transition-all ${student.name === 'عبدالله الشمري' ? (isWhiteTheme ? 'bg-neomine-blue/5' : 'bg-[#C9A84C]/5') : (isWhiteTheme ? 'hover:bg-gray-50' : 'hover:bg-white/[0.01]')}`}>
                        <td className="p-8">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-xs ${
                            i === 0 ? (isWhiteTheme ? 'bg-neomine-blue text-white shadow-lg shadow-neomine-blue/20' : 'bg-[#00F0FF] text-neomine-dark shadow-[0_0_15px_rgba(0,240,255,0.4)]') : 
                            i === 1 ? 'bg-slate-300 text-neomine-dark' : 
                            i === 2 ? 'bg-amber-600 text-white' : 
                            `${isWhiteTheme ? 'bg-gray-100 text-[#64748B]' : 'bg-white/5 text-white/40'}`
                          }`}>
                            {i + 1}
                          </div>
                        </td>
                        <td className="p-8">
                            <div className="flex items-center gap-4">
                               <div className={`w-10 h-10 rounded-full ${isWhiteTheme ? 'bg-white border-[#E2E8F0] shadow-sm text-[#64748B]' : 'bg-white/5 border-white/10 text-white/60'} border flex items-center justify-center text-xs font-bold`}>
                                  {student.name.split(' ')[0][0]}
                               </div>
                               <span className={`font-black text-lg ${isWhiteTheme ? 'text-slate-900' : (i < 3 ? 'text-[#C9A84C]' : 'text-white')}`}>{student.name}</span>
                               {student.name === 'عبدالله الشمري' && <span className="text-[10px] bg-neomine-blue/10 text-neomine-blue border-neomine-blue/20 px-3 py-1 rounded-full font-black border tracking-tight">(أنت)</span>}
                            </div>
                         </td>
                         <td className="p-8 text-right">
                            <span className="text-slate-500 text-xs font-black uppercase tracking-tighter whitespace-nowrap">{student.school}</span>
                         </td>
                        <td className="p-8 text-center whitespace-nowrap">
                           <span className={`text-[10px] font-black px-4 py-2 ${isWhiteTheme ? 'bg-gray-50 border-[#E2E8F0] text-[#64748B]' : 'bg-white/5 border-white/5 text-white'} rounded-xl border`}>{student.track}</span>
                        </td>
                        <td className="p-8 text-center">
                           <div className="flex flex-col items-center gap-1">
                              <span className={`text-xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : (i < 3 ? 'text-[#C9A84C]' : 'text-white')}`}>{student.points}</span>
                              <span className={`text-[9px] font-bold ${isWhiteTheme ? 'text-[#64748B]/40' : 'text-[#C9A84C]/40'} uppercase tracking-widest`}>Points</span>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'ai':
        return <AIChat isWhiteTheme={isWhiteTheme} />;
      case 'settings':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section with profile overview */}
            <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#0b1120] border-white/5'} border rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden`}>
               <div className="absolute top-0 right-0 w-64 h-64 bg-neomine-teal/5 blur-[100px] -z-10" />
               <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[40px] bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-neomine-teal/20">
                       ع.ش
                    </div>
                    <div className={`${isWhiteTheme ? 'bg-white text-neomine-teal border-gray-100 shadow-md' : 'bg-neomine-dark text-neomine-teal border-white/10'} absolute -bottom-2 -right-2 border p-3 rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-transform`}>
                       <Code className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-center md:text-right flex-1">
                     <h3 className={`text-3xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} mb-2`}>عبدالله الشمري</h3>
                     <p className={`${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} text-sm font-medium mb-6`}>طالب في مسار الذكاء الاصطناعي — المستوى المتقدم</p>
                     <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <span className={`px-5 py-2 ${isWhiteTheme ? 'bg-gray-100 border-gray-200 text-gray-500' : 'bg-white/5 border-white/10 text-white/60'} border rounded-xl text-xs font-bold`}>ID: #NEO-29482</span>
                        <span className="px-5 py-3 bg-neomine-teal/10 border border-neomine-teal/20 rounded-xl text-xs font-bold text-neomine-teal">عضو نشط منذ 2023</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Privacy & Security */}
              <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-white/[0.03] border-white/5 shadow-2xl'} border rounded-[40px] p-8 md:p-10 backdrop-blur-xl`}>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal border border-neomine-teal/20">
                       <ShieldCheck className="w-6 h-6 shadow-[0_0_10px_rgba(0,201,177,0.3)]" />
                    </div>
                    <h4 className={`text-xl font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>الخصوصية والأمان</h4>
                 </div>
                 
                 <div className="space-y-6">
                    {[
                      { label: 'إظهار الترتيب للآخرين', desc: 'السماح للطلاب في صفك برؤية ترتيبك الحالي', active: true },
                      { label: 'مشاركة النقاط في منصة نافس', desc: 'مشاركة نقاط الذكاء الخاصة بك في الترتيب الوطني', active: true },
                      { label: 'تلقي رسائل من المدربين', desc: 'تفعيل استقبال النصائح المباشرة من مدربي المسارات', active: false },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center justify-between p-5 ${isWhiteTheme ? 'bg-gray-50' : 'bg-white/5'} rounded-3xl border ${isWhiteTheme ? 'border-gray-100' : 'border-white/5'} hover:bg-gray-100 transition-all group`}>
                         <div className="text-right">
                            <p className={`text-sm font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'} group-hover:text-neomine-teal transition-colors`}>{item.label}</p>
                            <p className={`text-[10px] ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'} mt-1 font-bold`}>{item.desc}</p>
                         </div>
                         <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-neomine-teal' : 'bg-white/10'}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md ${item.active ? 'left-1' : 'left-7'}`} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Learning Preferences */}
              <div className={`${isWhiteTheme ? 'bg-white border-gray-100 shadow-sm' : 'bg-white/[0.03] border-white/5 shadow-2xl'} border rounded-[40px] p-8 md:p-10 backdrop-blur-xl`}>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-neomine-blue/10 flex items-center justify-center text-neomine-blue border border-neomine-blue/20">
                       <Brain className="w-6 h-6 shadow-[0_0_10px_rgba(0,240,255,0.3)]" />
                    </div>
                    <h4 className={`text-xl font-black ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>تفضيلات التعلم</h4>
                 </div>
                 
                 <div className="space-y-6">
                    <div className={`p-6 ${isWhiteTheme ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'} rounded-3xl border`}>
                       <p className={`text-xs font-black ${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} mb-4 text-right uppercase tracking-widest`}>لغة الواجهة المفضلة</p>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="px-4 py-4 rounded-2xl bg-neomine-teal text-neomine-dark font-black text-xs text-center cursor-pointer shadow-lg shadow-neomine-teal/20">العربية</div>
                          <div className={`px-4 py-4 rounded-2xl ${isWhiteTheme ? 'bg-white border-gray-200 text-gray-400' : 'bg-white/5 border-white/5 text-white/40'} font-black text-xs text-center cursor-pointer hover:bg-white transition-all border`}>English</div>
                       </div>
                    </div>

                    <div className={`p-6 ${isWhiteTheme ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'} rounded-3xl border text-right`}>
                       <p className={`text-xs font-black ${isWhiteTheme ? 'text-gray-400' : 'text-white/40'} mb-4 uppercase tracking-widest`}>أسلوب المساعد الذكي</p>
                       <div className="flex gap-4">
                          {['تحفيزي', 'تقني', 'مختصر'].map((style, i) => (
                             <div key={i} className={`flex-1 py-3 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer shadow-sm ${
                                i === 1 ? (isWhiteTheme ? 'bg-neomine-teal text-white border-neomine-teal' : 'bg-neomine-teal/10 border-neomine-teal text-neomine-teal') : 
                                (isWhiteTheme ? 'bg-white border-gray-200 text-gray-400 hover:bg-gray-100' : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10')
                             }`}>
                                {style}
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
               <button className={`px-10 py-5 rounded-[24px] ${isWhiteTheme ? 'bg-gray-50 border-[#E2E8F0] text-[#64748B]' : 'bg-white/5 text-white/40'} border font-black hover:bg-gray-100 transition-all`}>إلغاء التغييرات</button>
               <button className={`px-10 py-5 rounded-[24px] ${isWhiteTheme ? 'bg-neomine-blue text-white shadow-neomine-blue/20' : 'bg-neomine-teal text-neomine-dark shadow-neomine-teal/20'} font-black shadow-xl hover:scale-105 active:scale-95 transition-all`}>حفظ الإعدادات</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-20 text-center animate-in fade-in">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-gray-300" />
             </div>
             <h3 className="text-xl font-black text-[#0A1128] mb-2">المحتوى بانتظار التفعيل</h3>
             <p className="text-gray-400 font-bold">يرجى الانتقال للوحة التعلم اليومي لمتابعة دروسك.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full" dir="rtl">
      <AnimatePresence mode="wait">
        {selectedTrack ? (
          <motion.div
            key="track_content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <TrackContentView 
              track={selectedTrack} 
              onClose={() => setSelectedTrack(null)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard_content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {activeTab === 'daily_learning' && (
            <div className={`lg:sticky lg:top-0 z-30 ${isWhiteTheme ? 'bg-white/80' : 'bg-neomine-dark/80'} backdrop-blur-xl py-6 -mx-4 px-4 border-b ${isWhiteTheme ? 'border-gray-100' : 'border-white/5'} flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl`}>
        <div className="text-right flex items-center gap-4">
           {/* Mobile Waving Emoji relative to text like image */}
           <div className="flex flex-col">
              <div className="flex items-center gap-2">
                 <h2 className={`text-3xl md:text-5xl font-black ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'} tracking-tight font-tajawal`}>مرحباً، عبدالله 👋</h2>
              </div>
              <p className="text-neomine-teal text-sm md:text-base font-bold mt-2">مستعد لتعلم شيء جديد اليوم؟ لدينا <span className="underline decoration-neomine-teal/30 underline-offset-4">تحديات برمجية</span> بانتظارك.</p>
           </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'}`} />
            <input 
              type="text" 
              placeholder="ابحث عن مسار، درس، أو معلومة..."
              className={`w-full ${isWhiteTheme ? 'bg-gray-50 border-gray-200 focus:bg-white' : 'bg-white/5 border-white/10 focus:bg-white/10'} border rounded-[20px] py-4 pr-14 pl-6 text-sm focus:outline-hidden focus:border-neomine-teal/30 transition-all shadow-inner text-right ${isWhiteTheme ? 'text-[#0A1128]' : 'text-white'}`}
              dir="rtl"
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${isWhiteTheme ? 'bg-white border-gray-200' : 'bg-white/5 border-white/10'} border flex items-center justify-center text-white/60 hover:text-neomine-teal hover:bg-white transition-all relative shrink-0 shadow-sm`}
            >
              <Bell className={`w-6 h-6 ${isWhiteTheme ? 'text-gray-400' : 'text-white/60'}`} />
              <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-[#050A14] animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute left-0 mt-4 w-80 md:w-96 ${isWhiteTheme ? 'bg-white border-gray-100 shadow-2xl' : 'bg-[#0b1120] border-white/10 shadow-2xl'} border rounded-[32px] p-6 z-50 overflow-hidden text-right`}
                >
                  <div className="flex items-center justify-between mb-6">
                     <h4 className={`font-black text-xl ${isWhiteTheme ? 'text-[#1A1A1A]' : 'text-white'}`}>التنبيهات</h4>
                     <span className="text-[10px] bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-black">٣ إشعارات جديدة</span>
                  </div>
                  <div className="space-y-4">
                     {notifications.map((notif) => (
                       <div key={notif.id} className={`p-4 ${isWhiteTheme ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'} border rounded-2xl hover:bg-white transition-all cursor-pointer group shadow-xs`}>
                          <p className={`text-sm font-bold ${isWhiteTheme ? 'text-gray-600' : 'text-white/60'} group-hover:text-neomine-teal leading-relaxed`}>{notif.text}</p>
                          <div className={`flex items-center justify-end gap-2 mt-3 text-[10px] font-black ${isWhiteTheme ? 'text-gray-300' : 'text-white/20'} uppercase tracking-widest`}>
                             {notif.time}
                             <Clock className="w-3 h-3 text-neomine-teal font-bold" />
                          </div>
                       </div>
                     ))}
                  </div>
                  <button className={`w-full py-4 mt-6 text-xs font-black ${isWhiteTheme ? 'text-gray-400' : 'text-white/30'} hover:text-neomine-teal transition-all`}>مشاهدة الكل</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={activeTab !== 'dashboard' ? 'pt-10' : ''}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

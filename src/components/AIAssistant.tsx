import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً بك في نيوماين! أنا مساعدك الذكي لتعلم تقنيات المستقبل، كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
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
          text: response.text || getSimulationResponse(currentInput),
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("No API Key");
      }
    } catch (error) {
      console.error("Gemini API Error, falling back to simulator:", error);
      setTimeout(() => {
        const botResponse = getSimulationResponse(currentInput);
        setMessages((prev) => [...prev, {
          id: Date.now().toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
        }]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  const getSimulationResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('ترتيبي') || q.includes('لوحة الشرف') || q.includes('rank')) {
      return 'تهانينا يا بطل! تهانينا! أنت الآن ضمن أفضل ١٠ طلاب في مكة المكرمة بنقاط ذكاء تصل إلى ٤٨٢٠. استمر في هذا الالتزام لتنافس على المركز الأول!';
    }
    if (q.includes('ذكاء اصطناعي') || q.includes('ai')) {
      return 'في مسار الذكاء الاصطناعي بنيوماين، ستتعلم كيف تبني نماذج التنبؤ، ومعالجة اللغات الطبيعية، ورؤية الحاسب. إنه المستقبل!';
    }
    if (q.includes('برمجة') || q.includes('coding')) {
      return 'مسار البرمجة يركز على تطوير تطبيقات الويب والجوال باستخدام أحدث التقنيات مثل React و Python.';
    }
    if (q.includes('أمن') || q.includes('cyber')) {
      return 'سوف تتعرف في مسار الأمن السيبراني على كيفية حماية الأنظمة واكتشاف الثغرات وتأمين البيانات ضد التهديدات الرقمية.';
    }
    if (q.includes('بيانات') || q.includes('data science')) {
      return 'مسار علم البيانات يعلمك كيفية استخراج الرؤى من البيانات الضخمة وتمثيلها بجداول ورسوم بيانية ذكية لاتخاذ قرارات دقيقة.';
    }
    if (q.includes('مدارس') || q.includes('أداء المدارس')) {
      return 'بناءً على البيانات الحالية، تتصدر مدارس الرواد العالمية بنسبة أداء ٩٤٪، تليها مدرسة الظهران بنسبة ٩١٪. هناك متابعة لمدارس منارات جدة بسبب فواتير معلقة.';
    }
    if (q.includes('أعطال') || q.includes('مشاكل تقنية')) {
      return 'تم رصد تعثر في وصول طلاب مدارس الرواد لسيرفر AI-01 منذ ١٠ دقائق. الفريق التقني يعمل على الإصلاح الآن.';
    }
    if (q.includes('إيرادات') || q.includes('مالية')) {
      return 'إجمالي الإيرادات السنوية المُسجلة حتى الآن هو ٢.٤ مليون ريال سعودي، مع نمو بنسبة ١٢٪ عن الربع السابق.';
    }
    return 'سؤال مثير للاهتمام! في نيوماين نركز على تمكين الطلاب والمدارس عبر حلول الذكاء الاصطناعي. كيف يمكنني مساعدتك في إدارة النظام اليوم؟';
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-end" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-neomine-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-r from-neomine-teal/20 to-neomine-blue/20 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neomine-teal/20 flex items-center justify-center text-neomine-teal animate-pulse">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">المساعد الذكي (تجريبي)</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-white/40">متصل الآن</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.isBot 
                    ? 'bg-white/5 text-white/80 rounded-tr-none' 
                    : 'bg-neomine-teal text-neomine-dark font-medium rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tr-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اسأل نيوماين..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pr-4 pl-12 text-sm focus:outline-none focus:border-neomine-teal/50"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-neomine-teal text-neomine-dark disabled:opacity-50 disabled:grayscale transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 text-white/20">أنا مساعد ذكي، قد أخطئ أحياناً.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-neomine-teal text-neomine-dark flex items-center justify-center shadow-2xl shadow-neomine-teal/40 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        {isOpen ? (
          <X className="w-8 h-8 relative z-10" />
        ) : (
          <div className="relative z-10">
            <Bot className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neomine-blue rounded-full border-2 border-neomine-teal animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
}

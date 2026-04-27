import { motion } from 'motion/react';
import { 
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  Radar,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar as RechartsRadar
} from 'recharts';

const skillData = [
  { subject: 'البرمجة', A: 120, fullMark: 150 },
  { subject: 'المنطق', A: 98, fullMark: 150 },
  { subject: 'الذكاء الاصطناعي', A: 86, fullMark: 150 },
  { subject: 'الأمن السيبراني', A: 99, fullMark: 150 },
  { subject: 'الرياضيات', A: 85, fullMark: 150 },
  { subject: 'الإنجليزية', A: 65, fullMark: 150 },
];

const learningPath = [
  { id: 1, title: 'أساسيات بايثون', status: 'completed', date: '١٢ أكتوبر ٢٠٢٣' },
  { id: 2, title: 'هياكل البيانات', status: 'completed', date: '٠٥ نوفمبر ٢٠٢٣' },
  { id: 3, title: 'مقدمة في AI', status: 'current', date: 'جاري العمل' },
  { id: 4, title: 'الشبكات العصبية', status: 'locked', date: 'مغلق' },
];

export const StudentProfileDetail = ({ student, onBack }: { student: any, onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-[#0b1120] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative font-tajawal text-right"
    dir="rtl"
  >
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-neomine-teal font-black text-sm hover:underline mb-8"
    >
      <ArrowRight className="w-4 h-4 ml-2" /> العودة للقائمة
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-[40px] bg-linear-to-br from-neomine-teal/20 to-neomine-blue/20 border-2 border-neomine-teal/30 flex items-center justify-center text-neomine-teal mb-6 shadow-2xl">
             <span className="text-4xl font-black">{student.name.charAt(0)}</span>
          </div>
          <h3 className="text-3xl font-black text-white">{student.name}</h3>
          <p className="text-neomine-teal font-bold mt-1">{student.track}</p>
          <div className="mt-4 px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/40">
             {student.schoolName || 'مجمع نيوماين'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
              <TrendingUp className="w-5 h-5 text-neomine-teal mx-auto mb-2" />
              <p className="text-2xl font-black">{student.points}</p>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">Points</p>
           </div>
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
              <Award className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-black">{student.mastery}%</p>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">Mastery</p>
           </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-10">
        <div>
          <h4 className="text-lg font-black mb-6 flex items-center gap-3">
            <Radar className="w-5 h-5 text-neomine-teal" /> تحليل المهارات التقنية
          </h4>
          <div className="h-[300px] w-full bg-white/[0.01] rounded-[40px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <RechartsRadar
                  name={student.name}
                  dataKey="A"
                  stroke="#00C9B1"
                  fill="#00C9B1"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
           <h4 className="text-lg font-black mb-6 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" /> المسار التعليمي (Learning Path)
           </h4>
           <div className="space-y-4">
              {learningPath.map((step, idx) => (
                 <div key={step.id} className="flex items-center gap-6 group">
                    <div className="flex flex-col items-center">
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all ${
                          step.status === 'completed' ? 'bg-neomine-teal/10 border-neomine-teal text-neomine-teal' :
                          step.status === 'current' ? 'bg-blue-400/10 border-blue-400 text-blue-400 animate-pulse' :
                          'bg-white/5 border-white/5 text-white/10'
                       }`}>
                          {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                       </div>
                       {idx !== learningPath.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.status === 'completed' ? 'bg-neomine-teal/30' : 'bg-white/5'}`} />
                       )}
                    </div>
                    <div className="flex-1 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all flex justify-between items-center text-right">
                       <div>
                          <p className="font-bold">{step.title}</p>
                          <p className="text-[10px] text-white/20 mt-1">{step.date}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

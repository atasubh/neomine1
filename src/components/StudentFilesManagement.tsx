import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  ChevronLeft
} from 'lucide-react';
import { allStudentsData, tracks, schoolsList } from '../lib/mockData';
import { StudentProfileDetail } from './StudentProfileDetail';

export default function StudentFilesManagement() {
  const [activeGender, setActiveGender] = useState('بنين');
  const [activePathCategory, setActivePathCategory] = useState('متوسط دولي');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const genderTabs = [
    { id: 'بنين', label: 'بنين' },
    { id: 'بنات', label: 'بنات' }
  ];

  const pathTabs = [
    'متوسط دولي',
    'متوسط عام',
    'ثانوي دولي',
    'ثانوي عام'
  ];

  const filteredStudents = allStudentsData.filter(s => {
    const isGenderMatch = s.gender === (activeGender === 'بنين' ? 'ذكر' : 'أنثى');
    const isPathMatch = s.track.startsWith(activePathCategory);
    const isSearchMatch = s.name.includes(searchQuery) || 
                         schoolsList.find(sch => sch.id === s.schoolId)?.name.includes(searchQuery);
    return isGenderMatch && isPathMatch && isSearchMatch;
  });

  return (
    <div className="min-h-screen font-tajawal" dir="rtl">
      <AnimatePresence mode="wait">
        {!selectedStudent ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 pb-12"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-xl text-right">
              <div className="text-right">
                <h2 className="text-2xl font-black text-white mb-1">إدارة ملفات الطلاب</h2>
                <p className="text-white/40 text-sm">استعراض وتتبع الملفات الشخصية لـ 50+ طالب في مجمع نيوماين.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal shrink-0">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Hierarchical Tabs Logic */}
            <div className="space-y-4">
              {/* Level 1: Gender */}
              <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit">
                {genderTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveGender(tab.id)}
                    className={`px-8 py-2.5 rounded-xl font-black text-xs transition-all ${
                      activeGender === tab.id 
                      ? 'bg-neomine-teal text-neomine-dark shadow-lg shadow-neomine-teal/20' 
                      : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Level 2: Paths */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
                {pathTabs.map(path => (
                  <button
                    key={path}
                    onClick={() => setActivePathCategory(path)}
                    className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-[10px] transition-all border ${
                      activePathCategory === path 
                      ? 'bg-white/10 border-neomine-teal text-neomine-teal' 
                      : 'bg-white/5 border-white/5 text-white/30 hover:text-white'
                    }`}
                  >
                    {path}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text"
                  placeholder="ابحث عن اسم طالب أو اسم مدرسة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl pr-14 pl-8 py-5 text-white focus:outline-none focus:border-neomine-teal/50 transition-all font-tajawal shadow-inner text-right"
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-md shadow-2xl">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                      <motion.button
                        key={student.id}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStudent({
                          ...student, 
                          schoolName: schoolsList.find(s => s.id === student.schoolId)?.name
                        })}
                        className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-neomine-teal/30 transition-all group text-right"
                      >
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-neomine-teal group-hover:border-neomine-teal/30 transition-colors">
                              <span className="text-xl font-black">{student.name.charAt(0)}</span>
                           </div>
                           <div>
                              <h4 className="font-black text-white group-hover:text-neomine-teal transition-colors text-xs">{student.name}</h4>
                              <div className="flex flex-col">
                                <span className="text-[9px] text-white/30 tracking-wider">النقاط: {student.points} | {student.age} سنة</span>
                                <span className="text-[9px] text-neomine-teal font-black mt-1">{schoolsList.find(s => s.id === student.schoolId)?.name}</span>
                              </div>
                           </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-white/10 group-hover:text-neomine-teal group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    )) : (
                      <div className="col-span-full py-20 text-center text-white/20">
                         <Users className="w-12 h-12 mx-auto mb-4 opacity-10" />
                         <p>لا يوجد طلاب يطابقون خيارات البحث في هذا المسار.</p>
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <StudentProfileDetail 
            student={selectedStudent} 
            onBack={() => setSelectedStudent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

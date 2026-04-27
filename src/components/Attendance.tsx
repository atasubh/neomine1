import { useState } from 'react';
import { Users, CheckCircle2, XCircle, Search, Filter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { allStudentsData, tracks, schoolsList } from '../lib/mockData';
import { StudentProfileDetail } from './StudentProfileDetail';

export default function Attendance() {
  const [activeGender, setActiveGender] = useState('بنين');
  const [activePathCategory, setActivePathCategory] = useState('متوسط دولي');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentStudents = allStudentsData.filter(s => {
    const isGenderMatch = s.gender === (activeGender === 'بنين' ? 'ذكر' : 'أنثى');
    const isPathMatch = s.track.startsWith(activePathCategory);
    const isSearchMatch = s.name.includes(searchQuery) || 
                         schoolsList.find(sch => sch.id === s.schoolId)?.name.includes(searchQuery);
    return isGenderMatch && isPathMatch && isSearchMatch;
  });

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

  return (
    <div className="space-y-8 font-tajawal text-right" dir="rtl">
      <AnimatePresence mode="wait">
        {!selectedStudent ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col gap-6 bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-white mb-1">الحضور والغياب - المسارات المنفصلة</h2>
                  <p className="text-white/40 text-sm">إدارة ومتابعة حضور مجمع نيوماين عبر ٨ مسارات تعليمية منفصلة.</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal shrink-0">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              
              {/* Hierarchical Tabs Logic */}
              <div className="space-y-4">
                {/* Level 1: Gender */}
                <div className="flex gap-2 p-1.5 bg-black/20 border border-white/10 rounded-2xl w-fit">
                  {genderTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveGender(tab.id)}
                      className={`px-8 py-2 rounded-xl font-black text-xs transition-all ${
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
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">طلاب المسار</p>
                  <p className="text-2xl font-bold">{currentStudents.length}</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">حاضرون اليوم</p>
                  <p className="text-2xl font-bold">{currentStudents.length > 5 ? currentStudents.length - 2 : currentStudents.length}</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">غائبون</p>
                  <p className="text-2xl font-bold">{currentStudents.length > 5 ? 2 : 0}</p>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden">
              <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    type="text" 
                    placeholder="البحث عن طالب..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-12 pl-4 text-sm focus:outline-none focus:border-neomine-teal/50 transition-colors text-right"
                  />
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-white/[0.02] text-white/40 text-xs uppercase tracking-wider">
                      <th className="px-8 py-4 font-black">اسم الطالب</th>
                      <th className="px-8 py-4 font-black">المدرسة</th>
                      <th className="px-8 py-4 font-black">الحالة</th>
                      <th className="px-8 py-4 font-black text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {currentStudents.length > 0 ? currentStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-neomine-teal to-neomine-blue flex items-center justify-center text-[10px] font-bold text-neomine-dark">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-bold text-white/80 text-xs">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className="text-white/40 text-[10px] font-bold">{schoolsList.find(s => s.id === student.schoolId)?.name}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${
                            student.id % 5 !== 0 
                            ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            <div className={`w-1 h-1 rounded-full ${student.id % 5 !== 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                            {student.id % 5 !== 0 ? 'حاضر' : 'غائب'}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={() => setSelectedStudent({
                                ...student,
                                schoolName: schoolsList.find(s => s.id === student.schoolId)?.name
                              })}
                              className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-neomine-teal hover:text-neomine-dark text-white/60 hover:text-neomine-dark transition-all duration-300 text-[10px] font-black"
                            >
                              عرض الملف
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-white/20">
                          لا يوجد طلاب يطابقون البحث في هذا المسار حالياً.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

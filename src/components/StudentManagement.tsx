import { useState } from 'react';
import { Users, Search, Filter, GraduationCap, Code, ShieldCheck, Cpu, ChevronDown, Download, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { allStudentsData, tracks, schoolsList } from '../lib/mockData';

const paths = ['الكل', 'الذكاء الاصطناعي', 'البرمجة', 'الأمن سيبراني', 'الروبوتات'];

const genderTabs = [
  { id: 'بنين', label: 'بنين', icon: 'Male' },
  { id: 'بنات', label: 'بنات', icon: 'Female' }
];

const pathTabs = [
  'متوسط دولي',
  'متوسط عام',
  'ثانوي دولي',
  'ثانوي عام'
];

export default function StudentManagement() {
  const [activeGender, setActiveGender] = useState('بنين');
  const [activePathCategory, setActivePathCategory] = useState('متوسط دولي');
  const [activePath, setActivePath] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = allStudentsData.filter(s => {
    const isGenderMatch = s.gender === (activeGender === 'بنين' ? 'ذكر' : 'أنثى');
    const isPathCategoryMatch = s.track.startsWith(activePathCategory);
    // Note: In mockData, we don't have a specific field for 'technical path' (AI, etc) yet, 
    // but the UI filter exists. For now, we'll just allow 'الكل' or keep as is.
    const isSearchMatch = s.name.includes(searchQuery) || 
                         schoolsList.find(sch => sch.id === s.schoolId)?.name.includes(searchQuery);
    return isGenderMatch && isPathCategoryMatch && isSearchMatch;
  });

  const getPathIcon = (pathName: string) => {
    switch (pathName) {
      case 'الذكاء الاصطناعي': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'البرمجة': return <Code className="w-4 h-4 text-blue-400" />;
      case 'الأمن سيبراني': return <ShieldCheck className="w-4 h-4 text-green-400" />;
      case 'الروبوتات': return <GraduationCap className="w-4 h-4 text-orange-400" />;
      default: return null;
    }
  };

  const getStudentProgress = (student: typeof allStudentsData[0]) => {
    return student.mastery;
  };

  return (
    <div className="space-y-8 pb-12 font-tajawal text-right" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">إدارة مجمع نيوماين - الطلاب</h2>
          <p className="text-white/40 text-sm">متابعة دقيقة لـ 50+ طالب عبر 8 مسارات منفصلة و 4 مدارس.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal">
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
        <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2">
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

      {/* Selectors and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text"
            placeholder="ابحث عن اسم طالب أو اسم مدرسة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pr-11 pl-4 py-3 text-white focus:outline-none focus:border-neomine-teal transition-all text-sm"
          />
        </div>
        <div className="relative w-full lg:w-auto">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neomine-teal" />
          <select 
            value={activePath}
            onChange={(e) => setActivePath(e.target.value)}
            className="w-full lg:w-auto bg-white/5 border border-white/10 rounded-2xl pr-11 pl-10 py-3 text-white focus:outline-none focus:border-neomine-teal transition-all appearance-none text-sm font-bold min-w-[200px]"
          >
            {paths.map(p => <option key={p} value={p} className="bg-[#050A14]">{p}</option>)}
          </select>
          <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        </div>
      </div>


      {/* Students Table */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-8 py-5 text-xs text-white/40 uppercase tracking-widest font-black">اسم الطالب</th>
                <th className="px-8 py-5 text-xs text-white/40 uppercase tracking-widest font-black">المدرسة</th>
                <th className="px-8 py-5 text-xs text-white/40 uppercase tracking-widest font-black">المسار</th>
                <th className="px-8 py-5 text-xs text-white/40 uppercase tracking-widest font-black">متوسط الإنجاز</th>
                <th className="px-8 py-5 text-xs text-white/40 uppercase tracking-widest font-black">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <tr key={student.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center text-white/40 group-hover:border-neomine-teal/50 transition-colors">
                        <span className="text-xs font-bold">{student.name.charAt(0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white group-hover:text-neomine-teal transition-colors text-xs">{student.name}</span>
                        <span className="text-[9px] text-white/30">ID: {student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-white/60 font-bold">
                    {schoolsList.find(s => s.id === student.schoolId)?.name}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] text-neomine-teal font-black bg-neomine-teal/5 px-3 py-1 rounded-full border border-neomine-teal/20 whitespace-nowrap">
                      {student.track}
                    </span>
                  </td>
                  <td className="px-8 py-6 max-w-[200px]">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-white/40">نسبة التقدم</span>
                        <span className="text-neomine-teal">{student.mastery}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${student.mastery}%` }}
                          className="h-full bg-neomine-teal rounded-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-[100px]">
                    <div className="flex gap-2">
                       <button className="p-2 bg-white/5 rounded-xl text-neomine-teal hover:bg-neomine-teal hover:text-white transition-all">
                          <Eye className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-white/20">
                    لا يوجد طلاب يطابقون خيارات البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

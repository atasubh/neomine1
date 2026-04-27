import { Brain, Code, ShieldCheck, Zap, GraduationCap, Trophy } from 'lucide-react';

export const tracks = [
  'متوسط دولي - بنين',
  'متوسط دولي - بنات',
  'متوسط عام - بنين',
  'متوسط عام - بنات',
  'ثانوي دولي - بنين',
  'ثانوي دولي - بنات',
  'ثانوي عام - بنين',
  'ثانوي عام - بنات'
];

export const systemLogs = [
  { id: 1, time: '10:00 AM', severity: 'info', message: 'بدء تشغيل النظام الرئيسي' },
  { id: 2, time: '10:05 AM', severity: 'success', message: 'مزامنة بيانات مدرسة 1 بنجاح' },
  { id: 3, time: '10:15 AM', severity: 'critical', message: 'فشل طفيف في بوابة الدفع (تم الحل تلقائياً)' },
  { id: 4, time: '10:30 AM', severity: 'info', message: 'توليد التقارير الذكية الأسبوعية' },
];



export const schoolsList = [
  {
    id: 1,
    name: 'مدرسة 1',
    region: 'الرياض',
    performance: 92,
    contractNumber: 'CN-2023-001',
    principal: 'أحمد المنصور',
    joinDate: '2023-01-15',
    activeStudents: 15,
    revenue: 450000,
    topStudents: [],
    financialStatus: 'paid',
    enabledPaths: ['الذكاء الاصطناعي', 'البرمجة']
  },
  {
    id: 2,
    name: 'مدرسة 2',
    region: 'جدة',
    performance: 88,
    contractNumber: 'CN-2023-012',
    principal: 'بدر الغامدي',
    joinDate: '2023-03-20',
    activeStudents: 12,
    revenue: 380000,
    topStudents: [],
    financialStatus: 'paid',
    enabledPaths: ['البرمجة', 'الأمن سيبراني']
  },
  {
    id: 3,
    name: 'مدرسة 3',
    region: 'الظهران',
    performance: 95,
    contractNumber: 'CN-2023-045',
    principal: 'خالد الدوسري',
    joinDate: '2023-06-10',
    activeStudents: 13,
    revenue: 520000,
    topStudents: [],
    financialStatus: 'pending',
    enabledPaths: ['الروبوتات', 'الذكاء الاصطناعي']
  },
  {
    id: 4,
    name: 'مدرسة 4',
    region: 'مكة المكرمة',
    performance: 85,
    contractNumber: 'CN-2023-088',
    principal: 'فهد الحربي',
    joinDate: '2023-09-05',
    activeStudents: 10,
    revenue: 310000,
    topStudents: [],
    financialStatus: 'paid',
    enabledPaths: ['البرمجة', 'الروبوتات']
  }
];

const maleNames = [
  'عبدالله الشمري', 'سلطان القحطاني', 'فهد العتيبي', 'ناصر السبيعي', 'محمد الدوسري',
  'راكان الحربي', 'ياسر الزهراني', 'سليمان العبدالله', 'بدر التميمي', 'نواف السعد',
  'محمد علي', 'عبدالرحمن فهد', 'نايف السلطان', 'فهد الرشيد', 'تركي الفيصل',
  'زياد القحطاني', 'سلطان الجبر', 'مشاري ناصر', 'يوسف العبدالعزيز', 'عبدالعزيز الغامدي',
  'أحمد المحمد', 'خالد المنصور', 'فيصل العتيبي', 'سعد الشهري', 'بندر مروان',
  'حسن علي', 'عمر فؤاد', 'سامي الفهيد', 'منصور القحطاني', 'عادل إبراهيم'
];

const femaleNames = [
  'سارة العلي', 'نورة السعد', 'ليلى العتيبى', 'ريم القحطاني', 'هيا الدوسري',
  'منيرة الحربي', 'فاطمة الزهراني', 'أمل عبدالله', 'خلود التميمي', 'هناء السعد',
  'لجين الفهد', 'نوف السلطان', 'مشاعل الحربي', 'هيفاء السبيعي', 'رزان الشهري',
  'شهد العتيبي', 'غادة القحطاني', 'ربى الدوسري', 'جواهر علي', 'وسن المحمد'
];

const generateStudents = () => {
  const allStudents = [];
  let id = 1;

  // Generate 30 males
  for (let i = 0; i < 30; i++) {
    const schoolId = (i % 4) + 1;
    const trackIndex = (i % 4) * 2; // Picks male tracks: 0, 2, 4, 6
    allStudents.push({
      id: id++,
      name: maleNames[i],
      schoolId: schoolId,
      track: tracks[trackIndex],
      gender: 'ذكر',
      points: 4000 + Math.floor(Math.random() * 1000),
      streak: 5 + Math.floor(Math.random() * 20),
      mastery: 60 + Math.floor(Math.random() * 40),
      age: 14 + Math.floor(Math.random() * 4)
    });
  }

  // Generate 20 females
  for (let i = 0; i < 20; i++) {
    const schoolId = (i % 4) + 1;
    const trackIndex = (i % 4) * 2 + 1; // Picks female tracks: 1, 3, 5, 7
    allStudents.push({
      id: id++,
      name: femaleNames[i],
      schoolId: schoolId,
      track: tracks[trackIndex],
      gender: 'أنثى',
      points: 4000 + Math.floor(Math.random() * 1000),
      streak: 5 + Math.floor(Math.random() * 20),
      mastery: 60 + Math.floor(Math.random() * 40),
      age: 14 + Math.floor(Math.random() * 4)
    });
  }

  return allStudents;
};

export const allStudentsData = generateStudents();


export const performanceKPIs = [
  { label: 'إجمالي طلاب المجمع', value: '١,٦٦٠ طالب', color: 'text-neomine-teal' },
  { label: 'إجمالي الإيرادات المجمعة', value: '١.٦٦M ر.س', color: 'text-blue-400' },
  { label: 'متوسط الأداء العام', value: '٩١.٥٪', color: 'text-purple-400' },
  { label: 'الفروع المشتركة', value: '٤ مدارس', color: 'text-yellow-400' },
];

// Create a list of cities for schools
const cities = ['الرياض', 'جدة', 'الظهران', 'مكة المكرمة'];

export const globalLeaderboard = allStudentsData.map(student => {
  const school = schoolsList.find(s => s.id === student.schoolId);
  return {
    ...student,
    school: school?.name || 'مدرسة نيوماين',
    city: school?.region || (student.id % 2 === 0 ? 'مكة المكرمة' : 'جدة'),
    performance: student.mastery
  };
}).sort((a, b) => b.points - a.points);


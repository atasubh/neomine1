import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      className="mt-auto py-8 px-12 border-t border-white/5 bg-neomine-dark/50 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-white/50 hover:text-white/80 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-neomine-teal" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">مكة المكرمة</span>
            <span className="text-xs">الزايدي، جادة 30</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} نيوماين. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] uppercase tracking-widest text-white/20 hover:text-neomine-teal cursor-pointer transition-colors">Privacy</span>
            <span className="text-[10px] uppercase tracking-widest text-white/20 hover:text-neomine-teal cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

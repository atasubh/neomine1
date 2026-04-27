import { useState } from 'react';
import { Eye, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">إعدادات المدرسة</h2>
          <p className="text-white/40 text-sm">عرض وإدارة المعلومات الأساسية للمؤسسة التعليمية.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-neomine-teal/10 flex items-center justify-center text-neomine-teal">
          <Eye className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Read-only School Info */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-6 h-6 text-neomine-teal" />
            <h3 className="text-xl font-bold">معلومات المؤسسة (للقراءة فقط)</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-white/40 block">اسم المدرسة</label>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white/80 font-medium font-tajawal">
                مدرسة نيوماين العالمية
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-white/40 block">نوع المؤسسة</label>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white/80 font-medium font-tajawal">
                مجمع تعليمي دولي متكامل
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/40 block">المنطقة التعليمية</label>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white/80 font-medium">
                مكة المكرمة
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-xs text-white/40 block">رقم العقد الرسمي</label>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white/60 font-mono text-xs">
                  NM-2024-8842-X
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 block">نسبة المؤسسة</label>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white/60 font-mono text-xs">
                  12% (ثابت)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neomine-blue/5 border border-neomine-blue/10 flex gap-3 items-start mt-8">
              <HelpCircle className="w-5 h-5 text-neomine-blue shrink-0" />
              <p className="text-xs text-neomine-blue/80 leading-relaxed">
                هذه البيانات مقفلة ولا يمكن تعديلها إلا من قبل الإدارة العليا للمؤسسة لضمان أمن المعلومات وصحة البيانات الرسمية.
              </p>
            </div>
          </div>
        </div>

        {/* Global UI Settings */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-8">تفضيلات النظام</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-sm font-bold">وضع المطور</p>
                <p className="text-[10px] text-white/30">تفعيل أدوات التشخيص المتقدمة</p>
              </div>
              <div className="w-12 h-6 bg-neomine-teal rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-neomine-dark rounded-full float-left" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-sm font-bold">الأمان المتقدم</p>
                <p className="text-[10px] text-white/30">تطلب التحقق بخطوتين عند تسجيل الدخول</p>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-not-allowed opacity-50">
                <div className="w-4 h-4 bg-white/20 rounded-full float-right" />
              </div>
            </div>

            <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-neomine-teal hover:text-neomine-dark transition-all duration-300">
                حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

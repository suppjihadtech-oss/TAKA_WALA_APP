import React from 'react';
import { useApp } from '../../context/AppContext';

interface LoginNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginNoticeModal: React.FC<LoginNoticeModalProps> = ({ isOpen, onClose }) => {
  const { triggerConfetti } = useApp();

  if (!isOpen) return null;

  const handleClaim = () => {
    triggerConfetti();
    onClose();
  };

  return (
    <div className="login-notice-modal p-4 animate-fade-in">
      <div className="login-notice-content max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 text-center border border-emerald-100">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30 text-white text-3xl">
          <i className="ri-gift-fill animate-bounce-short"></i>
        </div>

        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          স্বাগতম উপহার
        </span>

        <h3 className="text-xl font-black text-slate-800 mt-2 mb-1">টাকা ওয়ালা অ্যাপে স্বাগতম!</h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          আমাদের বিশ্বস্ত আর্নিং প্ল্যাটফর্মে আপনাকে স্বাগতম। প্রতিদিন ফ্রি টাস্ক ও স্পিন করে নিশ্চিত
          আয় করুন। যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিম আপনার পাশে আছে।
        </p>

        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 mb-5 text-left text-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
            <i className="ri-checkbox-circle-fill text-emerald-600"></i>
            <span>প্রথম উইথড্র মাত্র ৫০ টাকায়!</span>
          </div>
          <p className="text-[11px] text-emerald-700 pl-5">
            বিকাশ ও নগদ অ্যাকাউন্টে দ্রুত ও নিরাপদে পেমেন্ট গ্রহণ করুন।
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
        >
          অ্যাপে প্রবেশ করুন 🚀
        </button>
      </div>
    </div>
  );
};

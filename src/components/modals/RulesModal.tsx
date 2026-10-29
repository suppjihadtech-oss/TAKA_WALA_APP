import React from 'react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="ios-modal-overlay p-4 animate-fade-in">
      <div className="ios-modal max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[82vh]">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-booklet-fill text-2xl text-emerald-200"></i>
            <h3 className="font-bold text-sm">কাজের নিয়মাবলী ও শর্ত</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <div className="p-4 overflow-y-auto text-left text-xs space-y-3 text-slate-700 leading-relaxed bg-slate-50">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <h4 className="font-bold text-emerald-700 mb-1 flex items-center gap-1.5">
              <i className="ri-shield-keyhole-line"></i> ১. একাউন্ট নিয়ম
            </h4>
            <p>একটি ডিভাইসে শুধুমাত্র ১টি একাউন্ট ব্যবহার করা যাবে। একই ওয়াইফাই বা ফোনে একাধিক একাউন্ট খুললে আইডি ব্যান হবে।</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <h4 className="font-bold text-rose-600 mb-1 flex items-center gap-1.5">
              <i className="ri-forbid-line"></i> ২. ভিপিএন (VPN) নিষিদ্ধ
            </h4>
            <p>ভিপিএন অন করে কোনো টাস্ক, স্পিন বা উইথড্র করা যাবে না। ভিপিএন ব্যবহারের প্রমাণের ভিত্তিতে পেমেন্ট বাতিল করা হবে।</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <h4 className="font-bold text-blue-600 mb-1 flex items-center gap-1.5">
              <i className="ri-task-line"></i> ৩. সঠিক প্রুফ প্রদান
            </h4>
            <p>টাস্ক পূরণ করার সময় প্রদত্ত নির্দেশনা মেনে সঠিক স্ক্রিনশট বা টেক্সট দিন। ভুয়া প্রুফ দিলে একাউন্ট সাময়িক সাসপেন্ড হবে।</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <h4 className="font-bold text-amber-600 mb-1 flex items-center gap-1.5">
              <i className="ri-hand-coin-line"></i> ৪. পেমেন্ট ও উইথড্র নিয়ম
            </h4>
            <p>সর্বনিম্ন উইথড্র ৳৫০। উত্তোলনে ১০% সরকারি ও প্রসেসিং ভ্যাট প্রযোজ্য। সাধারণত ৫ মিনিট থেকে ২৪ ঘণ্টার মধ্যে বিকাশ/নগদে টাকা পৌঁছে যায়।</p>
          </div>
        </div>

        <div className="p-3 bg-white border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 font-bold text-white text-xs hover:bg-emerald-700 transition-colors"
          >
            আমি নিয়ম মেনে কাজ করতে সম্মত
          </button>
        </div>
      </div>
    </div>
  );
};

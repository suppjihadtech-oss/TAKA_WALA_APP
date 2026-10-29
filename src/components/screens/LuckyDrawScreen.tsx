import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const LuckyDrawScreen: React.FC = () => {
  const { luckyTickets, buyLuckyTicket, setCurrentScreen, showToast, triggerConfetti } = useApp();
  const [checkingResult, setCheckingResult] = useState(false);

  const handleCheckResult = () => {
    setCheckingResult(true);
    setTimeout(() => {
      setCheckingResult(false);
      showToast('আজকের ড্র রাত ০৯:০০ টায় অনুষ্ঠিত হবে। অনুগ্রহ করে অপেক্ষা করুন!', 'info');
    }, 1200);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          হোমে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">লাকি ড্র লটারি</h3>
        <div className="w-10"></div>
      </div>

      {/* Mega Prize Pot Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden text-center">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            দৈনিক মেগা জ্যাকপট
          </span>
          <h1 className="text-3xl font-black mt-2 mb-1 tracking-tight">৳৫,০০০ ক্যাশ</h1>
          <p className="text-xs text-amber-100">টিকেট মূল্য মাত্র ১০ টাকা • ড্র রাত ৯:০০ টায়</p>

          <button
            onClick={buyLuckyTicket}
            className="mt-4 px-6 py-2.5 rounded-2xl bg-white text-orange-700 font-black text-xs shadow-md active:scale-95 hover:bg-amber-50 transition-all flex items-center justify-center gap-1.5 mx-auto"
          >
            <i className="ri-ticket-fill text-base"></i>
            টিকেট কিনুন (৳১০)
          </button>
        </div>
        <i className="ri-coupon-fill text-9xl text-white/10 absolute -bottom-6 -right-6"></i>
      </div>

      {/* Check Result Card */}
      <div className="glass-card rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between shadow-2xs">
        <div>
          <h4 className="text-xs font-bold text-slate-800">আজকের ড্র ফলাফল</h4>
          <p className="text-[10px] text-slate-400">আপনার টিকেটের ড্র স্ট্যাটাস যাচাই করুন</p>
        </div>
        <button
          disabled={checkingResult}
          onClick={handleCheckResult}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all"
        >
          {checkingResult ? 'যাচাই হচ্ছে...' : 'চেক করুন'}
        </button>
      </div>

      {/* My Tickets */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 px-1">
          <i className="ri-ticket-2-line text-orange-600"></i>
          আমার ক্রয়কৃত টিকেট ({luckyTickets.length})
        </h4>

        <div className="space-y-2">
          {luckyTickets.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <i className="ri-ticket-line text-4xl"></i>
              <p className="text-xs font-bold mt-2">আপনি এখনো কোনো টিকেট কিনেননি</p>
            </div>
          ) : (
            luckyTickets.map(tkt => (
              <div
                key={tkt.id}
                className="glass-card rounded-2xl p-3.5 border border-dashed border-orange-300 bg-orange-50/40 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xl shadow-xs">
                    <i className="ri-ticket-fill"></i>
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-black font-mono text-slate-800">{tkt.ticketNumber}</h5>
                    <p className="text-[10px] text-slate-500">ক্রয়: {tkt.purchaseDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block">
                    ড্র: {tkt.drawDate}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">অপেক্ষমান</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PromoClaimScreen: React.FC = () => {
  const { redeemPromo, setCurrentScreen, showToast } = useApp();
  const [code, setCode] = useState('');

  const sampleCodes = [
    { code: 'TAKA100', bonus: '৳১০০', desc: 'নতুন ইউজার স্পেশাল' },
    { code: 'BONUS50', bonus: '৳৫০', desc: 'হ্যাপি আওয়ার কুপন' },
    { code: 'WELCOME20', bonus: '৳২০', desc: 'সাইনআপ ওয়েলকাম গিফট' },
    { code: 'VIP2026', bonus: '৳৭৫', desc: 'ভিআইপি প্রিমিয়াম মেগা কোড' }
  ];

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      showToast('দয়া করে প্রোমো কোড লিখুন!', 'error');
      return;
    }

    const res = redeemPromo(code);
    if (res.success) {
      showToast(res.message, 'success');
      setCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleApplyPreset = (presetCode: string) => {
    setCode(presetCode);
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
        <h3 className="text-sm font-bold text-slate-800">প্রোমো কোড ক্লেইম</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl p-5 text-white shadow-md text-center">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
          <i className="ri-gift-line"></i>
        </div>
        <h2 className="text-xl font-black">উপহার ভাউচার কোড</h2>
        <p className="text-xs text-rose-100 mt-1">
          অফিসিয়াল টেলিগ্রাম চ্যানেল ও লাইভ ইভেন্ট থেকে পাওয়া প্রোমো কোড দিয়ে ফ্রি টাকা রিডিম করুন!
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleRedeem} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            আপনার প্রোমো কোড লিখুন
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="যেমন: TAKA100"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-black uppercase tracking-wider text-slate-800 focus:outline-hidden focus:border-pink-500 focus:bg-white font-mono"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-600/30 active:scale-95 transition-all"
            >
              রিডিম করুন
            </button>
          </div>
        </div>
      </form>

      {/* Popular Promo Codes */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 px-1">
          <i className="ri-fire-fill text-rose-500"></i>
          চলমান স্পেশাল প্রোমো কোড (১ ক্লিকে এপ্লাই)
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          {sampleCodes.map(item => (
            <div
              key={item.code}
              onClick={() => handleApplyPreset(item.code)}
              className="glass-card rounded-2xl p-3 border border-dashed border-pink-300 hover:border-pink-500 bg-pink-50/40 cursor-pointer active:scale-95 transition-all shadow-2xs"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono font-black text-xs text-pink-700">{item.code}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                  +{item.bonus}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

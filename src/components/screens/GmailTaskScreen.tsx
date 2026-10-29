import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const GmailTaskScreen: React.FC = () => {
  const { setCurrentScreen, showToast, updateUser, user, triggerConfetti } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [recoveryInput, setRecoveryInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.endsWith('@gmail.com')) {
      showToast('সঠিক @gmail.com ইমেইল ঠিকানা দিন!', 'error');
      return;
    }
    if (!passInput) {
      showToast('পাসওয়ার্ড প্রদান করুন!', 'error');
      return;
    }

    const reward = 8.0; // ৳8 per verified gmail
    if (user) {
      updateUser({
        balance: Number((user.balance + reward).toFixed(2)),
        totalEarned: Number((user.totalEarned + reward).toFixed(2))
      });
    }

    setEmailInput('');
    setPassInput('');
    setRecoveryInput('');
    triggerConfetti();
    showToast(`জিমেইল সফলভাবে ভেরিফাই হয়েছে! ব্যালেন্সে ৳${reward} যোগ হয়েছে।`, 'success');
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
        <h3 className="text-sm font-bold text-slate-800">জিমেইল ক্রিয়েশন টাস্ক</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-5 text-white shadow-md">
        <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
          প্রতি মেইলে ৳৮.০০
        </span>
        <h3 className="text-base font-black mt-2">নতুন ফ্রেশ জিমেইল তৈরি করুন</h3>
        <p className="text-xs text-sky-100 mt-1">
          নির্দেশনা অনুযায়ী ইংরেজি নামে নতুন জিমেইল খুলে তথ্য সাবমিট করুন এবং তাৎক্ষণিক পেমেন্ট নিন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            তৈরি করা জিমেইল অ্যাড্রেস
          </label>
          <input
            type="email"
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            placeholder="example123@gmail.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sky-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">পাসওয়ার্ড</label>
          <input
            type="text"
            value={passInput}
            onChange={e => setPassInput(e.target.value)}
            placeholder="যেমন: Tk@2026wala"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sky-500 focus:bg-white font-mono"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            রিকভারি ইমেইল (যদি দিয়ে থাকেন)
          </label>
          <input
            type="email"
            value={recoveryInput}
            onChange={e => setRecoveryInput(e.target.value)}
            placeholder="recovery@takawala.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sky-500 focus:bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white font-black text-xs hover:opacity-95 shadow-md shadow-sky-600/30 active:scale-95 transition-all mt-2"
        >
          জিমেইল ডাটা সাবমিট করুন 🚀
        </button>
      </form>
    </div>
  );
};

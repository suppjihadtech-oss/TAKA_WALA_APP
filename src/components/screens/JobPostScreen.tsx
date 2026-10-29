import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const JobPostScreen: React.FC = () => {
  const { user, updateUser, setCurrentScreen, showToast, triggerConfetti } = useApp();
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('YouTube');
  const [targetWorkers, setTargetWorkers] = useState<number>(10);
  const [budgetPerWorker, setBudgetPerWorker] = useState<number>(3.0);
  const [instructions, setInstructions] = useState('');

  if (!user) return null;

  const totalCost = Number((targetWorkers * budgetPerWorker).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.depositBalance < totalCost && user.balance < totalCost) {
      showToast(`কাজ পোস্ট করতে ৳${totalCost} ব্যালেন্স প্রয়োজন!`, 'error');
      return;
    }

    // Deduct cost
    let dep = user.depositBalance;
    let bal = user.balance;

    if (dep >= totalCost) {
      dep = Number((dep - totalCost).toFixed(2));
    } else {
      const diff = totalCost - dep;
      dep = 0;
      bal = Number((bal - diff).toFixed(2));
    }

    updateUser({ depositBalance: dep, balance: bal });

    triggerConfetti();
    showToast('আপনার কাজ সফলভাবে পোস্ট হয়েছে! এডমিন অনুমোদনের পর লাইভ হবে।', 'success');
    setCurrentScreen('home');
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
        <h3 className="text-sm font-bold text-slate-800">মাইক্রো জব পোস্ট করুন</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-5 text-white shadow-md">
        <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
          ক্যাম্পেইন ক্রিয়েটর
        </span>
        <h3 className="text-base font-black mt-2">অন্যান্য ইউজারদের দিয়ে নিজের কাজ করান</h3>
        <p className="text-xs text-teal-100 mt-1">
          ইউটিউব সাবস্ক্রাইব, ফেসবুক ফলো, অ্যাপ ইনস্টল বা টেলিগ্রাম মেম্বার বাড়ানোর সহজ সমাধান।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3.5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">কাজের শিরোনাম</label>
          <input
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="যেমন: চ্যানেল সাবস্ক্রাইব ও বেল বাটন অন"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white font-bold"
          >
            <option value="YouTube">YouTube Promotion</option>
            <option value="Facebook">Facebook Page / Group</option>
            <option value="Telegram">Telegram Channel / Bot</option>
            <option value="App">App Download & Review</option>
            <option value="Website">Website Traffic</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">কর্মী সংখ্যা</label>
            <input
              type="number"
              min={5}
              value={targetWorkers}
              onChange={e => setTargetWorkers(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">প্রতি কর্মীর বাজেট (৳)</label>
            <input
              type="number"
              min={1}
              step={0.5}
              value={budgetPerWorker}
              onChange={e => setBudgetPerWorker(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">কাজের বিস্তারিত নির্দেশাবলী</label>
          <textarea
            rows={3}
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            placeholder="ইউজাররা কিভাবে কাজটি সম্পন্ন করবে এবং কি প্রমাণ সাবমিট করবে তা লিখুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white"
            required
          />
        </div>

        {/* Cost Summary Box */}
        <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200 flex justify-between items-center text-xs">
          <span className="text-teal-800 font-bold">মোট খরচ ({targetWorkers} × ৳{budgetPerWorker}):</span>
          <span className="text-sm font-black text-teal-900">৳{totalCost.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-black text-xs hover:opacity-95 shadow-md shadow-teal-600/30 active:scale-95 transition-all"
        >
          জব পাবলিশ করুন
        </button>
      </form>
    </div>
  );
};

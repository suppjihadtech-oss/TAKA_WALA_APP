import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const RechargeScreen: React.FC = () => {
  const { user, rechargeMobile, setCurrentScreen, showToast } = useApp();
  const [operator, setOperator] = useState<'Grameenphone' | 'Banglalink' | 'Robi' | 'Airtel' | 'Teletalk'>('Grameenphone');
  const [phone, setPhone] = useState(user?.phone || '');
  const [amount, setAmount] = useState<number>(50);

  if (!user) return null;

  const operators = [
    { id: 'Grameenphone', name: 'গ্রামীনফোন', color: 'from-blue-500 to-sky-600' },
    { id: 'Banglalink', name: 'বাংলালিংক', color: 'from-orange-500 to-amber-600' },
    { id: 'Robi', name: 'রবি', color: 'from-red-500 to-rose-600' },
    { id: 'Airtel', name: 'এয়ারটেল', color: 'from-rose-600 to-red-700' },
    { id: 'Teletalk', name: 'টেলিটক', color: 'from-green-600 to-emerald-700' }
  ];

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      showToast('সঠিক ১১ সংখ্যার মোবাইল নাম্বার দিন!', 'error');
      return;
    }
    if (amount < 20) {
      showToast('সর্বনিম্ন রিচার্জ ২০ টাকা!', 'error');
      return;
    }

    const ok = rechargeMobile(operator, phone, amount);
    if (ok) {
      setCurrentScreen('wallet');
    }
  };

  const presetPacks = [20, 50, 100, 200];

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('wallet')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          ওয়ালেটে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">মোবাইল রিচার্জ</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-[11px] text-purple-100">রিচার্জ ব্যালেন্স:</span>
          <h2 className="text-2xl font-black">৳{user.rechargeBalance.toFixed(2)}</h2>
          <span className="text-[10px] text-purple-200 block mt-0.5">
            (মূল আর্নিং ব্যালেন্স থেকেও ব্যবহার করতে পারেন)
          </span>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
          <i className="ri-smartphone-line"></i>
        </div>
      </div>

      <form onSubmit={handleRecharge} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3.5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">
            অপারেটর নির্বাচন করুন
          </label>
          <div className="grid grid-cols-3 gap-2">
            {operators.map(op => (
              <button
                key={op.id}
                type="button"
                onClick={() => setOperator(op.id as any)}
                className={`py-2 px-2 rounded-2xl border text-center transition-all ${
                  operator === op.id
                    ? 'border-purple-500 bg-purple-50 text-purple-800 font-extrabold shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-600 font-bold'
                }`}
              >
                <div className="text-xs">{op.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">মোবাইল নাম্বার</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-purple-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">রিচার্জ পরিমাণ (টাকা)</label>
          <input
            type="number"
            min={20}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-hidden focus:border-purple-500 focus:bg-white"
            required
          />

          <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none">
            {presetPacks.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  amount === val
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                ৳{val}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold text-sm hover:opacity-95 shadow-md shadow-purple-600/30 active:scale-95 transition-all mt-2"
        >
          রিচার্জ কনফার্ম করুন
        </button>
      </form>
    </div>
  );
};

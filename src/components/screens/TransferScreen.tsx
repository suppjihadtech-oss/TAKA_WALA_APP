import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TransferScreen: React.FC = () => {
  const { user, transferFunds, setCurrentScreen, showToast } = useApp();
  const [fromType, setFromType] = useState<'income' | 'deposit'>('income');
  const [toType, setToType] = useState<'deposit' | 'recharge' | 'other'>('deposit');
  const [targetPhone, setTargetPhone] = useState('');
  const [amount, setAmount] = useState<number>(50);

  if (!user) return null;

  const available = fromType === 'income' ? user.balance : user.depositBalance;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      showToast('সঠিক পরিমাণ দিন!', 'error');
      return;
    }
    if (amount > available) {
      showToast('পর্যাপ্ত ব্যালেন্স নেই!', 'error');
      return;
    }
    if (toType === 'other' && (!targetPhone || targetPhone.length < 11)) {
      showToast('প্রাপকের মোবাইল নাম্বার দিন!', 'error');
      return;
    }

    const ok = transferFunds(fromType, toType, amount, targetPhone);
    if (ok) {
      setCurrentScreen('wallet');
    }
  };

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
        <h3 className="text-sm font-bold text-slate-800">ব্যালেন্স ট্রান্সফার</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-[11px] text-blue-100">
            {fromType === 'income' ? 'আর্নিং ব্যালেন্স' : 'ডিপোজিট ব্যালেন্স'}:
          </span>
          <h2 className="text-2xl font-black">৳{available.toFixed(2)}</h2>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
          <i className="ri-swap-box-line"></i>
        </div>
      </div>

      <form onSubmit={handleTransfer} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3.5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            কোন ওয়ালেট থেকে ট্রান্সফার করবেন?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFromType('income')}
              className={`py-2 px-2 rounded-2xl border text-xs font-bold transition-all ${
                fromType === 'income'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              আর্নিং ওয়ালেট
            </button>
            <button
              type="button"
              onClick={() => setFromType('deposit')}
              className={`py-2 px-2 rounded-2xl border text-xs font-bold transition-all ${
                fromType === 'deposit'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              ডিপোজিট ওয়ালেট
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            কোথায় পাঠাবেন?
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setToType('deposit')}
              className={`py-2 px-1 rounded-2xl border text-xs font-bold transition-all ${
                toType === 'deposit'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              ডিপোজিট
            </button>
            <button
              type="button"
              onClick={() => setToType('recharge')}
              className={`py-2 px-1 rounded-2xl border text-xs font-bold transition-all ${
                toType === 'recharge'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              রিচার্জ
            </button>
            <button
              type="button"
              onClick={() => setToType('other')}
              className={`py-2 px-1 rounded-2xl border text-xs font-bold transition-all ${
                toType === 'other'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              অন্য ইউজার
            </button>
          </div>
        </div>

        {toType === 'other' && (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              প্রাপক ইউজারের ফোন নাম্বার
            </label>
            <input
              type="text"
              value={targetPhone}
              onChange={e => setTargetPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white"
              required
            />
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            ট্রান্সফার পরিমাণ (টাকা)
          </label>
          <input
            type="number"
            min={10}
            max={available}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-extrabold text-sm hover:opacity-95 shadow-md shadow-blue-600/30 active:scale-95 transition-all mt-2"
        >
          ট্রান্সফার সম্পন্ন করুন
        </button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DepositScreen: React.FC = () => {
  const { config, depositFunds, setCurrentScreen, showToast } = useApp();
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Binance'>('bKash');
  const [amount, setAmount] = useState<number>(200);
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');

  const adminNumber =
    method === 'bKash'
      ? config.bkashNumber
      : method === 'Nagad'
      ? config.nagadNumber
      : method === 'Rocket'
      ? config.rocketNumber
      : config.binanceUsdtAddress;

  const handleCopy = () => {
    navigator.clipboard?.writeText(adminNumber);
    showToast(`${method} নাম্বার কপি করা হয়েছে!`, 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 50) {
      showToast('সর্বনিম্ন ডিপোজিট ৫০ টাকা!', 'error');
      return;
    }
    if (!phone.trim()) {
      showToast('আপনার প্রেরক নাম্বার দিন!', 'error');
      return;
    }
    if (!trxId.trim()) {
      showToast('ট্রানজেকশন আইডি (TrxID) দিন!', 'error');
      return;
    }

    depositFunds(method, amount, trxId, phone);
    setCurrentScreen('wallet');
  };

  const presetAmounts = [100, 200, 350, 500, 1000];

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      {/* Header Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('wallet')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          ওয়ালেটে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">ব্যালেন্স ডিপোজিট</h3>
        <div className="w-10"></div>
      </div>

      {/* Select Method */}
      <div className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs">
        <label className="text-xs font-bold text-slate-700 block mb-2">
          পেমেন্ট মাধ্যম বেছে নিন
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['bKash', 'Nagad', 'Rocket', 'Binance'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`py-2 px-1 rounded-2xl border text-center transition-all ${
                method === m
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-extrabold shadow-2xs scale-102'
                  : 'border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50'
              }`}
            >
              <div className="text-xs">{m}</div>
            </button>
          ))}
        </div>

        {/* Admin Payment Number Box */}
        <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            {method} সেন্ড মানি নাম্বার (পার্সোনাল)
          </span>
          <div className="flex items-center justify-between">
            <span className="font-mono font-black text-sm text-slate-800 select-all truncate max-w-[240px]">
              {adminNumber}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-1 shadow-2xs"
            >
              <i className="ri-file-copy-line"></i> কপি
            </button>
          </div>
          <p className="text-[10px] text-amber-700 mt-2 font-medium">
            ⚠️ প্রথমে উপরোক্ত নাম্বারে সেন্ড মানি করুন, তারপর নিচের ফর্মে TrxID ও প্রেরক নাম্বার দিয়ে
            কনফার্ম করুন।
          </p>
        </div>
      </div>

      {/* Deposit Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3.5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            ডিপোজিট পরিমাণ (টাকা)
          </label>
          <input
            type="number"
            min={50}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="পরিমাণ লিখুন"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
            required
          />

          {/* Preset Buttons */}
          <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none">
            {presetAmounts.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  amount === val
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                ৳{val}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            আপনার প্রেরক মোবাইল নাম্বার
          </label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            ট্রানজেকশন আইডি (TrxID)
          </label>
          <input
            type="text"
            value={trxId}
            onChange={e => setTrxId(e.target.value)}
            placeholder="যেমন: BK98741X"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold uppercase text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all font-mono"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-sm hover:opacity-95 shadow-md shadow-emerald-600/30 active:scale-95 transition-all mt-2"
        >
          ডিপোজিট সাবমিট করুন
        </button>
      </form>
    </div>
  );
};

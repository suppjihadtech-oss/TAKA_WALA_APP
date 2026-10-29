import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PinVerifyModal } from '../modals/PinVerifyModal';

export const WithdrawScreen: React.FC = () => {
  const { user, config, withdrawFunds, setCurrentScreen, showToast } = useApp();
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [amount, setAmount] = useState<number>(100);
  const [phone, setPhone] = useState(user?.phone || '');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  if (!user) return null;

  const vatAmount = Number(((amount * config.withdrawalVatPercent) / 100).toFixed(2));
  const netPayable = Math.max(0, Number((amount - vatAmount).toFixed(2)));

  const handleInitWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < config.minimumWithdraw) {
      showToast(`সর্বনিম্ন উইথড্র ৳${config.minimumWithdraw}!`, 'error');
      return;
    }
    if (user.balance < amount) {
      showToast('আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স নেই!', 'error');
      return;
    }
    if (!phone.trim()) {
      showToast('টাকা তোলার মোবাইল নাম্বার দিন!', 'error');
      return;
    }

    // Open PIN verification modal
    setIsPinModalOpen(true);
  };

  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    const success = withdrawFunds(method, amount, phone);
    if (success) {
      setCurrentScreen('wallet');
    }
  };

  const presets = [50, 100, 200, 500, 1000];

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
        <h3 className="text-sm font-bold text-slate-800">টাকা উত্তোলন (Cash Out)</h3>
        <div className="w-10"></div>
      </div>

      {/* Available Balance Box */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-emerald-100">উত্তোলনযোগ্য ব্যালেন্স</span>
          <h2 className="text-2xl font-black">৳{user.balance.toFixed(2)}</h2>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-bold">
            মিনিমাম ৳{config.minimumWithdraw}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleInitWithdraw} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3.5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">
            উত্তোলন মাধ্যম বেছে নিন
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['bKash', 'Nagad', 'Rocket'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`py-2 px-2 rounded-2xl border text-center transition-all ${
                  method === m
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-extrabold shadow-2xs scale-102'
                    : 'border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50'
                }`}
              >
                <div className="text-xs">{m}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            আপনার {method} একাউন্ট নাম্বার
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
            উত্তোলনের পরিমাণ (টাকা)
          </label>
          <input
            type="number"
            min={config.minimumWithdraw}
            max={user.balance}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="পরিমাণ দিন"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
            required
          />

          {/* Presets */}
          <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none">
            {presets.map(val => (
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

        {/* VAT / Calculation Summary */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>উত্তোলনের অনুরোধ:</span>
            <span className="font-bold text-slate-700">৳{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-rose-600">
            <span>ভ্যাট ও সার্ভিস চার্জ ({config.withdrawalVatPercent}%):</span>
            <span className="font-bold">- ৳{vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-800 font-extrabold pt-1.5 border-t border-slate-200">
            <span>আপনার একাউন্টে জমা হবে:</span>
            <span className="text-sm">৳{netPayable.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-sm hover:opacity-95 shadow-md shadow-emerald-600/30 active:scale-95 transition-all mt-2"
        >
          উইথড্র নিশ্চিত করুন
        </button>
      </form>

      {/* Security Pin Modal */}
      <PinVerifyModal
        isOpen={isPinModalOpen}
        onSuccess={handlePinSuccess}
        onClose={() => setIsPinModalOpen(false)}
      />
    </div>
  );
};

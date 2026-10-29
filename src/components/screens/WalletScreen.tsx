import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const WalletScreen: React.FC = () => {
  const { user, currency, setCurrentScreen, transactions, setReceiptData } = useApp();
  const [activeTab, setActiveTab] = useState<'income' | 'deposit' | 'recharge'>('income');

  if (!user) return null;

  const currentAmount =
    activeTab === 'income'
      ? user.balance
      : activeTab === 'deposit'
      ? user.depositBalance
      : user.rechargeBalance;

  const bdtRate = 120;
  const displayAmount =
    currency === 'BDT'
      ? `৳${currentAmount.toFixed(2)}`
      : `$${(currentAmount / bdtRate).toFixed(2)}`;

  const walletTxs = transactions.slice(0, 5);

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      {/* 3 Balance Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl gap-1 shadow-inner">
        <button
          onClick={() => setActiveTab('income')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'income'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          আর্নিং ব্যালেন্স
        </button>
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'deposit'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ডিপোজিট ব্যালেন্স
        </button>
        <button
          onClick={() => setActiveTab('recharge')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'recharge'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          রিচার্জ ব্যালেন্স
        </button>
      </div>

      {/* Main Dynamic Wallet Card */}
      <div
        className={`rounded-3xl p-5 text-white shadow-xl relative overflow-hidden transition-all duration-500 ${
          activeTab === 'income'
            ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800'
            : activeTab === 'deposit'
            ? 'bg-gradient-to-br from-blue-600 via-indigo-700 to-cyan-800'
            : 'bg-gradient-to-br from-purple-600 via-fuchsia-700 to-pink-800'
        }`}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs uppercase font-extrabold tracking-wider opacity-85">
            {activeTab === 'income'
              ? 'মোট উপার্জন করা ব্যালেন্স'
              : activeTab === 'deposit'
              ? 'ডিপোজিট ওয়ালেট ব্যালেন্স'
              : 'মোবাইল রিচার্জ ওয়ালেট'}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
            <i className="ri-wallet-3-line text-lg"></i>
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight my-2">{displayAmount}</h1>

        <div className="flex items-center justify-between text-[11px] opacity-90 pt-3 border-t border-white/20">
          <div>
            <span className="opacity-75 block text-[10px]">মোট উইথড্র</span>
            <span className="font-bold">৳{user.totalWithdrawn.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="opacity-75 block text-[10px]">সর্বমোট আয়</span>
            <span className="font-bold">৳{user.totalEarned.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Wallet Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCurrentScreen('deposit')}
          className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-slate-100 hover:border-emerald-300 transition-all active:scale-95 text-left shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            <i className="ri-add-circle-fill"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">ডিপোজিট</h4>
            <p className="text-[10px] text-slate-400">টাকা জমা দিন</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen('withdraw')}
          className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-slate-100 hover:border-amber-300 transition-all active:scale-95 text-left shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            <i className="ri-hand-coin-fill"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">উত্তোলন</h4>
            <p className="text-[10px] text-slate-400">ক্যাশ আউট করুন</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen('recharge')}
          className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-slate-100 hover:border-purple-300 transition-all active:scale-95 text-left shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            <i className="ri-smartphone-fill"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">রিচার্জ</h4>
            <p className="text-[10px] text-slate-400">মোবাইল টপ-আপ</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen('transfer')}
          className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-slate-100 hover:border-blue-300 transition-all active:scale-95 text-left shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            <i className="ri-swap-line"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">ট্রান্সফার</h4>
            <p className="text-[10px] text-slate-400">ওয়ালেট ট্রান্সফার</p>
          </div>
        </button>
      </div>

      {/* Recent Transactions List */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <i className="ri-history-line text-emerald-600"></i>
            সাম্প্রতিক লেনদেন
          </h3>
          <button
            onClick={() => setCurrentScreen('history')}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
          >
            সব দেখুন
          </button>
        </div>

        <div className="space-y-2">
          {walletTxs.map(tx => (
            <div
              key={tx.id}
              onClick={() => setReceiptData(tx)}
              className="glass-card rounded-2xl p-3 border border-slate-100 hover:border-slate-300 transition-all flex items-center justify-between cursor-pointer active:scale-98 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    tx.type === 'deposit'
                      ? 'bg-blue-100 text-blue-600'
                      : tx.type === 'withdraw'
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  <i
                    className={
                      tx.type === 'deposit'
                        ? 'ri-arrow-down-line'
                        : tx.type === 'withdraw'
                        ? 'ri-arrow-up-line'
                        : 'ri-check-line'
                    }
                  ></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {tx.type === 'deposit'
                      ? 'ডিপোজিট'
                      : tx.type === 'withdraw'
                      ? 'উত্তোলন'
                      : tx.type === 'recharge'
                      ? 'মোবাইল রিচার্জ'
                      : 'টাস্ক আয়'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">{tx.timestamp}</p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-black block ${
                    tx.type === 'withdraw' ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {tx.type === 'withdraw' ? '-' : '+'}৳{tx.amount.toFixed(2)}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block ${
                    tx.status === 'success'
                      ? 'bg-emerald-50 text-emerald-600'
                      : tx.status === 'pending'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {tx.status === 'success' ? 'সফল' : 'পেন্ডিং'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

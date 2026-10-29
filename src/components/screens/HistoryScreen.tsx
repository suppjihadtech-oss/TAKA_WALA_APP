import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const HistoryScreen: React.FC = () => {
  const { transactions, setReceiptData } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const filtered = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const filterTabs = [
    { id: 'all', label: 'সব লেনদেন' },
    { id: 'deposit', label: 'ডিপোজিট' },
    { id: 'withdraw', label: 'উত্তোলন' },
    { id: 'task', label: 'টাস্ক আয়' },
    { id: 'recharge', label: 'রিচার্জ' },
    { id: 'transfer', label: 'ট্রান্সফার' },
    { id: 'spin', label: 'স্পিন' }
  ];

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-3.5 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <i className="ri-file-list-fill text-emerald-600"></i>
          লেনদেনের ইতিহাস (হিস্ট্রি)
        </h3>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} টি রেকর্ড</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <i className="ri-file-history-line text-5xl"></i>
            <p className="text-xs font-bold mt-2">এই ক্যাটাগরিতে কোনো লেনদেন নেই</p>
          </div>
        ) : (
          filtered.map(tx => (
            <div
              key={tx.id}
              onClick={() => setReceiptData(tx)}
              className="glass-card rounded-2xl p-3.5 border border-slate-100 hover:border-emerald-300 transition-all flex items-center justify-between cursor-pointer active:scale-98 shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:scale-105 ${
                    tx.type === 'deposit'
                      ? 'bg-blue-100 text-blue-600'
                      : tx.type === 'withdraw'
                      ? 'bg-rose-100 text-rose-600'
                      : tx.type === 'recharge'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  <i
                    className={
                      tx.type === 'deposit'
                        ? 'ri-arrow-down-circle-line'
                        : tx.type === 'withdraw'
                        ? 'ri-arrow-up-circle-line'
                        : tx.type === 'recharge'
                        ? 'ri-smartphone-line'
                        : 'ri-wallet-3-line'
                    }
                  ></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    {tx.type === 'deposit'
                      ? 'ডিপোজিট'
                      : tx.type === 'withdraw'
                      ? 'উত্তোলন'
                      : tx.type === 'recharge'
                      ? 'মোবাইল রিচার্জ'
                      : tx.type === 'transfer'
                      ? 'ট্রান্সফার'
                      : 'আর্নিং রিওয়ার্ড'}
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      #{tx.trxId}
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {tx.method} • {tx.timestamp}
                  </p>
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
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                    tx.status === 'success'
                      ? 'bg-emerald-50 text-emerald-700'
                      : tx.status === 'pending'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {tx.status === 'success' ? 'সফল' : tx.status === 'pending' ? 'অপেক্ষমান' : 'বাতিল'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

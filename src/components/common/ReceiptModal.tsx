import React from 'react';
import { useApp } from '../../context/AppContext';

export const ReceiptModal: React.FC = () => {
  const { receiptData, setReceiptData, showToast } = useApp();

  if (!receiptData) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(receiptData.trxId);
    showToast('ট্রানজেকশন আইডি কপি করা হয়েছে!', 'success');
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'ডিপোজিট (জমা)';
      case 'withdraw':
        return 'উত্তোলন (ক্যাশ আউট)';
      case 'recharge':
        return 'মোবাইল রিচার্জ';
      case 'transfer':
        return 'ব্যালেন্স ট্রান্সফার';
      case 'task':
        return 'টাস্ক বোনাস';
      case 'spin':
        return 'লাকি স্পিন উইনিং';
      case 'quiz':
        return 'কুইজ রিওয়ার্ড';
      default:
        return 'ক্যাশ রিওয়ার্ড';
    }
  };

  return (
    <div className="ios-modal-overlay p-4 animate-fade-in">
      <div className="receipt-box animate-scale-up">
        {/* Header */}
        <div className="receipt-header bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-5 text-center text-white relative">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-xs border border-white/30">
            <i className="ri-shield-check-fill text-2xl text-emerald-300"></i>
          </div>
          <h2 className="text-lg font-bold">টাকা ওয়ালা অফিশিয়াল রসিদ</h2>
          <p className="text-xs text-emerald-100">ডিজিটাল পেমেন্ট ভেরিফিকেশন ভাউচার</p>

          <div className="amount-box mt-3 bg-white/20 border border-white/30 rounded-xl py-2 px-4 backdrop-blur-xs">
            <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-semibold">
              মোট পরিমাণ
            </span>
            <h1 className="text-2xl font-black tracking-tight">৳{receiptData.amount.toFixed(2)}</h1>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="receipt-body p-4 text-xs space-y-2.5 bg-white text-slate-700">
          <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
            <span className="text-slate-500 font-semibold">ট্রানজেকশন আইডি</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-800">{receiptData.trxId}</span>
              <button
                onClick={handleCopy}
                className="text-emerald-600 hover:text-emerald-700 p-0.5"
                title="কপি করুন"
              >
                <i className="ri-file-copy-line"></i>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
            <span className="text-slate-500 font-semibold">লেনদেনের ধরন</span>
            <span className="font-bold text-slate-800">{getTypeName(receiptData.type)}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
            <span className="text-slate-500 font-semibold">পেমেন্ট মাধ্যম</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <i className="ri-secure-payment-line text-emerald-500"></i>
              {receiptData.method}
            </span>
          </div>

          {receiptData.accountNo && (
            <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
              <span className="text-slate-500 font-semibold">একাউন্ট / ফোন</span>
              <span className="font-bold text-slate-800 font-mono">{receiptData.accountNo}</span>
            </div>
          )}

          {receiptData.fee !== undefined && receiptData.fee > 0 && (
            <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
              <span className="text-slate-500 font-semibold">ভ্যাট / প্রসেসিং চার্জ</span>
              <span className="font-bold text-rose-600">- ৳{receiptData.fee.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
            <span className="text-slate-500 font-semibold">তারিখ ও সময়</span>
            <span className="font-bold text-slate-700">{receiptData.timestamp}</span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200">
            <span className="text-slate-500 font-semibold">লেনদেন স্ট্যাটাস</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                receiptData.status === 'success'
                  ? 'bg-emerald-100 text-emerald-700'
                  : receiptData.status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {receiptData.status === 'success'
                ? 'সফল (Success)'
                : receiptData.status === 'pending'
                ? 'অপেক্ষমান (Pending)'
                : 'বাতিল (Rejected)'}
            </span>
          </div>

          {receiptData.note && (
            <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] border border-slate-100">
              <span className="font-semibold block text-slate-500">বিবরণ:</span>
              {receiptData.note}
            </div>
          )}
        </div>

        {/* Receipt Footer */}
        <div className="receipt-footer bg-slate-50 p-3.5 text-center border-t-2 border-dashed border-slate-200 flex gap-2">
          <button
            onClick={() => setReceiptData(null)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-200 font-bold text-slate-700 text-xs hover:bg-slate-300 transition-colors"
          >
            বন্ধ করুন
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 font-bold text-white text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <i className="ri-file-copy-line text-sm"></i>
            রসিদ ট্রান আইডি কপি
          </button>
        </div>
      </div>
    </div>
  );
};

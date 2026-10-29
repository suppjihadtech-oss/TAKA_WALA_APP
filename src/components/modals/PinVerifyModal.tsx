import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

interface PinVerifyModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const PinVerifyModal: React.FC<PinVerifyModalProps> = ({ isOpen, onSuccess, onClose }) => {
  const { user, showToast } = useApp();
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleVerify = () => {
    const userPin = user?.pin || '1234';
    if (pin === userPin) {
      setPin('');
      onSuccess();
    } else {
      showToast('ভুল ট্রানজেকশন পিন! (ডিফল্ট: 1234)', 'error');
    }
  };

  return (
    <div className="ios-modal-overlay p-4 animate-fade-in">
      <div className="ios-modal max-w-xs w-full bg-white rounded-3xl overflow-hidden p-5 shadow-2xl">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
          <i className="ri-lock-password-line"></i>
        </div>

        <h3 className="text-base font-bold text-slate-800 mb-1">সিকিউরিটি পিন দিন</h3>
        <p className="text-xs text-slate-500 mb-4">
          আপনার ৪ সংখ্যার গোপন ট্রানজেকশন পিন দিন (ডিফল্ট: 1234)
        </p>

        <div className="mb-4">
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="••••"
            className="w-full text-center text-2xl tracking-[8px] font-bold py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setPin('');
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs hover:bg-slate-200 transition-colors"
          >
            বাতিল
          </button>
          <button
            onClick={handleVerify}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 font-bold text-white text-xs hover:bg-emerald-700 transition-colors shadow-sm"
          >
            যাচাই করুন
          </button>
        </div>
      </div>
    </div>
  );
};

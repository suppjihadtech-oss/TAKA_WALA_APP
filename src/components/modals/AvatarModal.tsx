import React from 'react';
import { useApp } from '../../context/AppContext';
import { avatarList } from '../../data/mockData';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser, showToast } = useApp();

  if (!isOpen || !user) return null;

  const handleSelect = (url: string) => {
    updateUser({ avatar: url });
    showToast('প্রোফাইল ছবি পরিবর্তন করা হয়েছে!', 'success');
    onClose();
  };

  return (
    <div className="ios-modal-overlay p-4 animate-fade-in">
      <div className="ios-modal max-w-xs w-full bg-white rounded-3xl overflow-hidden p-5 shadow-2xl">
        <h3 className="text-base font-bold text-slate-800 mb-1">প্রোফাইল অবতার নির্বাচন</h3>
        <p className="text-xs text-slate-500 mb-4">আপনার পছন্দের একটি থ্রি-ডি কার্টুন অবতার বেছে নিন</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {avatarList.map((avatar, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(avatar)}
              className={`p-2 rounded-2xl border-2 transition-all flex items-center justify-center ${
                user.avatar === avatar
                  ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-xs'
                  : 'border-slate-100 hover:border-slate-300'
              }`}
            >
              <img src={avatar} alt="Avatar option" className="w-14 h-14 object-cover" />
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs hover:bg-slate-200 transition-colors"
        >
          বাতিল করুন
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SettingsScreen: React.FC = () => {
  const { user, updateUser, setCurrentScreen, showToast } = useApp();
  const [newPin, setNewPin] = useState('');
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);

  if (!user) return null;

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4) {
      showToast('পিন অবশ্যই ৪ সংখ্যার হতে হবে!', 'error');
      return;
    }
    updateUser({ pin: newPin });
    setNewPin('');
    showToast('ট্রানজেকশন পিন সফলভাবে আপডেট হয়েছে!', 'success');
  };

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('profile')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          প্রোফাইলে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">অ্যাপ সেটিংস ও নিরাপত্তা</h3>
        <div className="w-10"></div>
      </div>

      {/* Security Pin Setup */}
      <form onSubmit={handleSavePin} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
            <i className="ri-shield-keyhole-line"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">৪ সংখ্যার ট্রানজেকশন পিন</h4>
            <p className="text-[10px] text-slate-400">উইথড্র করার সময় এই পিনটি প্রয়োজন হবে</p>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">
            নতুন পিন লিখুন (বর্তমান: {user.pin || '1234'})
          </label>
          <input
            type="password"
            maxLength={4}
            value={newPin}
            onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
            placeholder="নতুন ৪ ডিজিটের পিন"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center text-lg font-bold tracking-widest text-slate-800 focus:outline-hidden focus:border-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
        >
          পিন সংরক্ষণ করুন
        </button>
      </form>

      {/* Preference Toggles */}
      <div className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">পছন্দ ও সিস্টেম</h4>

        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs font-bold text-slate-800">শব্দ ও সাউন্ড ইফেক্ট</h5>
            <p className="text-[10px] text-slate-400">স্পিন ও রিওয়ার্ড সাউন্ড চালু রাখুন</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sound}
              onChange={e => setSound(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <h5 className="text-xs font-bold text-slate-800">পুশ নোটিফিকেশন</h5>
            <p className="text-[10px] text-slate-400">টাস্ক আপডেট ও অফারের মেসেজ</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <h5 className="text-xs font-bold text-slate-800">অ্যাপের ভাষা</h5>
            <p className="text-[10px] text-slate-400">বর্তমানে বাংলা ভাষায় নির্ধারিত</p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            বাংলা (বাংলা)
          </span>
        </div>
      </div>
    </div>
  );
};

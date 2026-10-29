import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RulesModal } from '../modals/RulesModal';

interface ProfileScreenProps {
  onOpenAvatar: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenAvatar }) => {
  const { user, logoutUser, setCurrentScreen } = useApp();
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) return null;

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      {/* Profile Card */}
      <div className="glass-card rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden text-center">
        <div className="relative inline-block mb-2">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-emerald-500 object-cover mx-auto shadow-md"
          />
          <button
            onClick={onOpenAvatar}
            className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs shadow-md hover:bg-emerald-700 transition-colors"
            title="ছবি পরিবর্তন"
          >
            <i className="ri-pencil-line"></i>
          </button>
        </div>

        <h2 className="text-base font-extrabold text-slate-800">{user.name}</h2>
        <p className="text-xs text-slate-500 font-medium">{user.phone} • {user.email}</p>

        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <i className="ri-shield-star-fill text-amber-500"></i>
          {user.plan === 'platinum'
            ? 'প্লাটিনাম মেম্বার'
            : user.plan === 'gold'
            ? 'গোল্ড মেম্বার'
            : user.plan === 'silver'
            ? 'সিলভার মেম্বার'
            : 'ফ্রি অ্যাকাউন্ট'}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">আর্নিং ব্যালেন্স</span>
            <span className="text-xs font-black text-emerald-700">৳{user.balance.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">মোট উইথড্র</span>
            <span className="text-xs font-black text-slate-700">৳{user.totalWithdrawn.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">মোট উপার্জন</span>
            <span className="text-xs font-black text-blue-700">৳{user.totalEarned.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="glass-card rounded-3xl p-2 border border-slate-100 shadow-2xs divide-y divide-slate-100">
        <button
          onClick={() => setCurrentScreen('referral')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
              <i className="ri-user-shared-line"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">রেফার ও প্রমোশন কার্ড</h4>
              <p className="text-[10px] text-slate-400">বন্ধুদের আমন্ত্রণ জানিয়ে আয়</p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-slate-400 text-lg"></i>
        </button>

        <button
          onClick={() => setCurrentScreen('vip')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
              <i className="ri-vip-crown-line"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">ভিআইপি মেম্বারশিপ</h4>
              <p className="text-[10px] text-slate-400">আয় বাড়িয়ে নিন ৩.৫ গুণ</p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-slate-400 text-lg"></i>
        </button>

        <button
          onClick={() => setIsRulesOpen(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
              <i className="ri-book-open-line"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">কাজের নিয়মাবলী</h4>
              <p className="text-[10px] text-slate-400">সঠিক নিয়মে কাজ ও পেমেন্ট পলিসি</p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-slate-400 text-lg"></i>
        </button>

        <button
          onClick={() => setCurrentScreen('settings')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
              <i className="ri-settings-3-line"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">নিরাপত্তা পিন ও সেটিংস</h4>
              <p className="text-[10px] text-slate-400">ট্রানজেকশন পিন ও পাসওয়ার্ড</p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-slate-400 text-lg"></i>
        </button>

        <button
          onClick={() => setCurrentScreen('support')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg">
              <i className="ri-customer-service-2-line"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">২৪/৭ লাইভ সাপোর্ট</h4>
              <p className="text-[10px] text-slate-400">টেলিগ্রাম এডমিন ও হেল্প ডেস্ক</p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-slate-400 text-lg"></i>
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full py-3 rounded-2xl bg-white border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 shadow-2xs"
      >
        <i className="ri-logout-box-r-line text-base"></i>
        লগআউট করুন
      </button>

      <div className="text-center text-[11px] text-slate-400 pt-1">
        <p>টাকা ওয়ালা (TAKAWALA) • ভার্সন ৩.২.০</p>
        <p>© 2026 সর্বস্বত্ব সংরক্ষিত</p>
      </div>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="ios-modal-overlay p-4 animate-fade-in">
          <div className="ios-modal max-w-xs w-full bg-white rounded-3xl p-5 shadow-2xl">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              <i className="ri-logout-circle-line"></i>
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">লগআউট করতে চান?</h3>
            <p className="text-xs text-slate-500 mb-4">
              আপনি কি নিশ্চিতভাবে এই ডিভাইস থেকে লগআউট করতে চাচ্ছেন?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs hover:bg-slate-200"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logoutUser();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 font-bold text-white text-xs hover:bg-rose-700 shadow-sm"
              >
                হ্যাঁ, লগআউট
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

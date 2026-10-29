import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const FloatingWidgets: React.FC = () => {
  const {
    setCurrentScreen,
    setIsTwaiOpen,
    showToast,
    triggerConfetti,
    updateUser,
    user
  } = useApp();

  const [claimedMystery, setClaimedMystery] = useState(false);

  const handleHappyHourClick = () => {
    showToast('⚡ হ্যাপি আওয়ার চলছে! যেকোনো ভিআইপি প্যাকেজে পাচ্ছেন ১০% স্পেশাল ছাড়!', 'info');
    setCurrentScreen('vip');
  };

  const handleMysteryGiftClick = () => {
    if (claimedMystery) {
      showToast('আজকের মিস্ট্রি গিফট অলরেডি ক্লেইম করেছেন! আগামীকাল আবার চেষ্টা করুন।', 'info');
      return;
    }

    const bonus = Math.floor(Math.random() * 6) + 3; // ৳3 to ৳8
    if (user) {
      updateUser({
        balance: Number((user.balance + bonus).toFixed(2)),
        totalEarned: Number((user.totalEarned + bonus).toFixed(2))
      });
    }

    setClaimedMystery(true);
    triggerConfetti();
    showToast(`🎁 ওয়াও! মিস্ট্রি গিফট বক্স থেকে ৳${bonus} ফ্রি বোনাস পেলেন!`, 'success');
  };

  return (
    <>
      {/* Left 3D Spherical Widget: Happy Hour */}
      <div className="fixed top-48 left-3 z-30 flex flex-col items-center">
        <button
          onClick={handleHappyHourClick}
          className="side-btn group transition-transform active:scale-95"
          title="হ্যাপি আওয়ার ছাড়"
        >
          <img
            src="https://i.postimg.cc/qqLQKVHV/bonus.png"
            alt="Happy Hour"
            className="w-7 h-7 object-contain drop-shadow-sm group-hover:scale-110 transition-transform"
          />
          <span className="text-[9px] font-black text-amber-600 mt-0.5 tracking-tight">
            হ্যাপি আওয়ার
          </span>
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-xs animate-pulse">
            -১০%
          </span>
        </button>
      </div>

      {/* Right 3D Spherical Widget: Mystery Gift */}
      <div className="fixed top-48 right-3 z-30 flex flex-col items-center">
        <button
          onClick={handleMysteryGiftClick}
          className="side-btn group transition-transform active:scale-95"
          title="মিস্ট্রি গিফট বক্স"
        >
          <img
            src="https://i.postimg.cc/dtj5JQqK/gift-box.png"
            alt="Mystery Gift"
            className="w-7 h-7 object-contain drop-shadow-sm group-hover:rotate-12 transition-transform"
          />
          <span className="text-[9px] font-black text-emerald-600 mt-0.5 tracking-tight">
            গিফট বক্স
          </span>
          <span className="absolute -top-1.5 -left-1.5 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
            ফ্রি
          </span>
        </button>
      </div>

      {/* Floating TWAI Chatbot Button (Purple) */}
      <button
        onClick={() => setIsTwaiOpen(true)}
        className="fixed bottom-36 right-4 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-[0_5px_20px_rgba(139,92,246,0.4)] border-2 border-white active:scale-95 transition-all opacity-85 hover:opacity-100"
        title="TWAI এআই অ্যাসিস্ট্যান্ট"
      >
        <i className="ri-robot-2-line text-2xl animate-bounce-short"></i>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
      </button>

      {/* Floating 24/7 Support Button (Blue) */}
      <button
        onClick={() => setCurrentScreen('support')}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center shadow-[0_5px_20px_rgba(59,130,246,0.4)] border-2 border-white active:scale-95 transition-all opacity-85 hover:opacity-100"
        title="লাইভ সাপোর্ট"
      >
        <i className="ri-customer-service-2-line text-2xl"></i>
      </button>
    </>
  );
};

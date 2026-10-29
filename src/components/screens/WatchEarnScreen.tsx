import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const WatchEarnScreen: React.FC = () => {
  const { user, updateUser, setCurrentScreen, showToast, triggerConfetti } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);

  if (!user) return null;

  const maxVideos = user.plan === 'platinum' ? 50 : user.plan === 'gold' ? 40 : user.plan === 'silver' ? 30 : 15;
  const remainingVideos = Math.max(0, maxVideos - (user.dailyVideoCount || 0));

  useEffect(() => {
    let timer: any = null;
    if (isPlaying && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            handleCompleteVideo();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, secondsLeft]);

  const handleStartWatch = () => {
    if (remainingVideos <= 0) {
      showToast('আজকের ভিডিও দেখার লিমিট শেষ!', 'error');
      return;
    }
    setIsPlaying(true);
    setSecondsLeft(15);
  };

  const handleCompleteVideo = () => {
    setIsPlaying(false);
    const reward = user.plan === 'free' ? 1.5 : 3.0;

    updateUser({
      balance: Number((user.balance + reward).toFixed(2)),
      dailyVideoCount: (user.dailyVideoCount || 0) + 1,
      totalEarned: Number((user.totalEarned + reward).toFixed(2))
    });

    triggerConfetti();
    showToast(`অভিনন্দন! ভিডিও দেখে ৳${reward} ক্যাশ বোনাস পেয়েছেন!`, 'success');
  };

  const progressPercent = Math.min(Math.round(((user.dailyVideoCount || 0) / maxVideos) * 100), 100);

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          হোমে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">ভিডিও দেখে আয় (Watch & Earn)</h3>
        <div className="w-10"></div>
      </div>

      {/* Daily Progress */}
      <div className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h4 className="text-xs font-bold text-slate-800">আজকের বিজ্ঞাপন দেখার কোটা</h4>
            <p className="text-[10px] text-slate-400 font-medium">প্রতিটি ভিডিওতে নগদ টাকা নিশ্চিত</p>
          </div>
          <span className="text-xs font-black text-rose-600">
            {user.dailyVideoCount || 0} / {maxVideos} টি
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Video Player Card */}
      <div className="glass-card rounded-3xl p-5 border border-slate-100 text-center shadow-md space-y-4">
        <div className="aspect-video w-full rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          {isPlaying ? (
            <div className="space-y-3 z-10 text-center px-4">
              <div className="w-14 h-14 rounded-full border-4 border-rose-500 border-t-transparent animate-spin mx-auto flex items-center justify-center text-xs font-black">
                {secondsLeft}s
              </div>
              <p className="text-xs font-bold text-rose-300">বিজ্ঞাপন চলছে... অপেক্ষা করুন</p>
            </div>
          ) : (
            <div className="space-y-2 z-10">
              <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-rose-600/40">
                <i className="ri-play-fill"></i>
              </div>
              <p className="text-xs font-bold text-slate-200">স্পন্সর ভিডিও দেখতে নিচে ক্লিক করুন</p>
            </div>
          )}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60"></div>
        </div>

        <button
          disabled={isPlaying || remainingVideos <= 0}
          onClick={handleStartWatch}
          className={`w-full py-3.5 rounded-2xl font-black text-xs text-white transition-all shadow-md active:scale-95 ${
            isPlaying || remainingVideos <= 0
              ? 'bg-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-red-600 to-rose-700 shadow-rose-600/30'
          }`}
        >
          {isPlaying
            ? `বিজ্ঞাপন চলছে (${secondsLeft}s)...`
            : remainingVideos <= 0
            ? 'আজকের কোটা শেষ'
            : 'ভিডিও অ্যাড দেখুন (+৳১.৫০)'}
        </button>
      </div>
    </div>
  );
};

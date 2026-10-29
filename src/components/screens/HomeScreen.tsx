import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const HomeScreen: React.FC = () => {
  const { user, config, setCurrentScreen, activateAccount } = useApp();

  if (!user) return null;

  const totalDailyTasks = user.plan === 'platinum' ? 50 : user.plan === 'gold' ? 40 : user.plan === 'silver' ? 30 : 10;
  const progressPercent = Math.min(Math.round((user.todayTasksDone / totalDailyTasks) * 100), 100);

  const gridActions: {
    id: string;
    screen: ScreenType;
    label: string;
    subLabel: string;
    icon: string;
    iconBg: string;
    badge?: string;
  }[] = [
    {
      id: 'tasks',
      screen: 'tasks',
      label: 'টাস্ক পূরণ',
      subLabel: 'ফ্রি ও ভিআইপি কাজ',
      icon: 'ri-file-list-3-fill text-emerald-600',
      iconBg: 'bg-emerald-100',
      badge: 'হট'
    },
    {
      id: 'deposit',
      screen: 'deposit',
      label: 'ডিপোজিট',
      subLabel: 'ব্যালেন্স লোড করুন',
      icon: 'ri-bank-card-fill text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      id: 'withdraw',
      screen: 'withdraw',
      label: 'উত্তোলন',
      subLabel: 'বিকাশ ও নগদ',
      icon: 'ri-hand-coin-fill text-amber-600',
      iconBg: 'bg-amber-100'
    },
    {
      id: 'recharge',
      screen: 'recharge',
      label: 'মোবাইল রিচার্জ',
      subLabel: 'সকল সিম সাপোর্ট',
      icon: 'ri-smartphone-fill text-violet-600',
      iconBg: 'bg-violet-100'
    },
    {
      id: 'spin',
      screen: 'spin',
      label: 'স্পিন হুইল',
      subLabel: 'ঘুরিয়ে নিশ্চিত টাকা',
      icon: 'ri-loader-4-fill text-rose-600',
      iconBg: 'bg-rose-100',
      badge: 'জনপ্রিয়'
    },
    {
      id: 'luckyDraw',
      screen: 'luckyDraw',
      label: 'লাকি ড্র',
      subLabel: 'মেগা জ্যাকপট জিতুন',
      icon: 'ri-ticket-2-fill text-orange-600',
      iconBg: 'bg-orange-100'
    },
    {
      id: 'quiz',
      screen: 'quiz',
      label: 'কুইজ contest',
      subLabel: 'বুদ্ধির পরীক্ষায় আয়',
      icon: 'ri-questionnaire-fill text-cyan-600',
      iconBg: 'bg-cyan-100'
    },
    {
      id: 'watchEarn',
      screen: 'watchEarn',
      label: 'ভিডিও অ্যাড',
      subLabel: 'বিজ্ঞাপন দেখে আয়',
      icon: 'ri-play-circle-fill text-red-600',
      iconBg: 'bg-red-100'
    },
    {
      id: 'gmailTask',
      screen: 'gmailTask',
      label: 'জিমেইল কাজ',
      subLabel: 'মেইল অ্যাকাউন্ট ক্রিয়েট',
      icon: 'ri-mail-fill text-sky-600',
      iconBg: 'bg-sky-100'
    },
    {
      id: 'jobPost',
      screen: 'jobPost',
      label: 'কাজ পোস্ট',
      subLabel: 'নিজের কাজ দিন',
      icon: 'ri-briefcase-4-fill text-teal-600',
      iconBg: 'bg-teal-100'
    },
    {
      id: 'promoClaim',
      screen: 'promoClaim',
      label: 'প্রোমো কোড',
      subLabel: 'ফ্রি গিফট ক্লেইম',
      icon: 'ri-coupon-3-fill text-pink-600',
      iconBg: 'bg-pink-100',
      badge: 'উপহার'
    },
    {
      id: 'vip',
      screen: 'vip',
      label: 'ভিআইপি প্ল্যান',
      subLabel: '৩.৫x গুণ বেশি আয়',
      icon: 'ri-vip-crown-fill text-amber-500',
      iconBg: 'bg-amber-50 border border-amber-200'
    }
  ];

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-3.5 max-w-md mx-auto animate-fade-in">
      {/* Marquee Notice Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-200/80 rounded-2xl p-2 px-3 flex items-center gap-2 shadow-2xs">
        <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs shrink-0 font-bold">
          <i className="ri-volume-up-fill"></i>
        </div>
        <div className="overflow-hidden whitespace-nowrap text-xs font-semibold text-slate-700 flex-1">
          <div className="inline-block animate-marquee">{config.announcementNotice}</div>
        </div>
      </div>

      {/* Account Activation Card */}
      {!user.isActivated ? (
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                অ্যাক্টিভেশন প্রয়োজন
              </span>
            </div>
            <h3 className="text-base font-black">আপনার অ্যাকাউন্ট প্রিমিয়াম করুন</h3>
            <p className="text-xs text-amber-100 mt-1 mb-3">
              সীমাহীন কাজ ও ইনস্ট্যান্ট উইথড্র সুবিধা চালু করতে অ্যাকাউন্ট অ্যাক্টিভেট করুন।
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={activateAccount}
                className="bg-white text-orange-700 font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs active:scale-95 transition-all"
              >
                এখনই অ্যাক্টিভেট করুন (ফ্রি ট্রায়াল)
              </button>
            </div>
          </div>
          <i className="ri-shield-star-fill text-8xl text-white/10 absolute -bottom-4 -right-2"></i>
        </div>
      ) : null}

      {/* Task Goal Progress Bar */}
      <div className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <i className="ri-focus-2-line text-lg"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">দৈনিক কাজের অগ্রগতি</h4>
              <p className="text-[10px] text-slate-400 font-medium">আজকের টার্গেট পূরণ করুন</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-emerald-700">
              {user.todayTasksDone} / {totalDailyTasks}
            </span>
            <span className="text-[10px] text-slate-400 block font-semibold">{progressPercent}% সম্পন্ন</span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div
        onClick={() => setCurrentScreen('vip')}
        className="cursor-pointer bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-4 text-white relative overflow-hidden shadow-md group"
      >
        <div className="relative z-10 max-w-[70%]">
          <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">
            স্পেশাল মেম্বারশিপ
          </span>
          <h3 className="text-sm font-black leading-snug">
            ভিআইপি আপগ্রেড করে আয় বাড়িয়ে নিন ৩.৫ গুণ পর্যন্ত!
          </h3>
          <p className="text-[11px] text-emerald-100 mt-1">ইনস্ট্যান্ট ৫ মিনিটে উইথড্র প্রসেসিং</p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
          <i className="ri-award-fill text-3xl text-amber-300"></i>
        </div>
      </div>

      {/* Main Grid: Features */}
      <div>
        <div className="flex items-center justify-between px-1 mb-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <i className="ri-apps-2-fill text-emerald-600"></i>
            সেবাসমূহ ও কাজ
          </h3>
          <button
            onClick={() => setCurrentScreen('leaderboard')}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
          >
            লিডারবোর্ড
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {gridActions.map(action => (
            <button
              key={action.id}
              onClick={() => setCurrentScreen(action.screen)}
              className="glass-card rounded-2xl p-3 flex flex-col items-center justify-center text-center relative border border-slate-100 hover:border-emerald-200 transition-all active:scale-95 group shadow-2xs"
            >
              {action.badge && (
                <span className="absolute -top-1.5 -right-1 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                  {action.badge}
                </span>
              )}
              <div
                className={`w-11 h-11 rounded-2xl ${action.iconBg} flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 shadow-2xs`}
              >
                <i className={`${action.icon} text-xl`}></i>
              </div>
              <h4 className="text-xs font-bold text-slate-800 leading-tight truncate w-full">
                {action.label}
              </h4>
              <p className="text-[9px] text-slate-400 font-medium truncate w-full mt-0.5">
                {action.subLabel}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Invite Friends Referral Teaser */}
      <div
        onClick={() => setCurrentScreen('referral')}
        className="cursor-pointer glass-card rounded-3xl p-3.5 border border-emerald-100 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-xs">
            <i className="ri-user-shared-line"></i>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-800">বন্ধু রেফার করে আয় করুন</h4>
            <p className="text-[10px] text-slate-500">প্রতি সফল রেফারে পাবেন ৳৫ ক্যাশ বোনাস</p>
          </div>
        </div>
        <i className="ri-arrow-right-s-line text-xl text-emerald-600"></i>
      </div>
    </div>
  );
};

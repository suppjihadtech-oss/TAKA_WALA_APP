import React from 'react';
import { useApp } from '../../context/AppContext';

export const ReferralScreen: React.FC = () => {
  const { user, config, setCurrentScreen, showToast, triggerConfetti } = useApp();

  if (!user) return null;

  const referralLink = `https://takawala.app/join?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    showToast('রেফারেল লিংক কপি করা হয়েছে!', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(user.referralCode);
    showToast('রেফারেল কোড কপি করা হয়েছে!', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'টাকা ওয়ালা - আয় করার সেরা অ্যাপ',
          text: `টাকা ওয়ালা অ্যাপে সাইন আপ করে প্রতিদিন বিকাশ/নগদে টাকা তুলুন। আমার রেফার কোড: ${user.referralCode}`,
          url: referralLink
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const mockReferrals = [
    { id: '1', name: 'কামরুল হাসান', date: '২৬ অক্টোবর', earned: '৳৫.০০', status: 'অ্যাক্টিভ' },
    { id: '2', name: 'মেহেদী মাসুদ', date: '২৪ অক্টোবর', earned: '৳৫.০০', status: 'অ্যাক্টিভ' },
    { id: '3', name: 'সজীব আহমেদ', date: '২২ অক্টোবর', earned: '৳৫.০০', status: 'অ্যাক্টিভ' }
  ];

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      {/* Header Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('profile')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          প্রোফাইলে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">রেফার ও শেয়ার</h3>
        <div className="w-10"></div>
      </div>

      {/* Bonus Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            রেফারেল মেগা বোনাস
          </span>
          <h2 className="text-xl font-black mt-2">প্রতি রেফারে ৳{config.referralBonus} বোনাস!</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-[80%]">
            আপনার রেফারেল কোড দিয়ে কোনো বন্ধু একাউন্ট খুললেই সরাসরি আপনার ব্যালেন্সে বোনাস জমা হবে।
          </p>
        </div>
        <i className="ri-gift-line text-8xl text-white/10 absolute -bottom-4 -right-2"></i>
      </div>

      {/* VIP Promo Card To Share */}
      <div className="glass-card rounded-3xl p-4 border border-emerald-200/80 shadow-md bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 relative">
        <div className="flex items-center justify-between mb-3 border-b border-emerald-100 pb-3">
          <div className="flex items-center gap-2.5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full border-2 border-emerald-500 shadow-2xs"
            />
            <div>
              <h4 className="text-xs font-bold text-slate-800">{user.name}</h4>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                অফিসিয়াল অ্যাম্বাসেডর
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold block">রেফার কোড</span>
            <span className="text-sm font-black font-mono text-emerald-800">
              {user.referralCode}
            </span>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={handleCopyCode}
            className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <i className="ri-file-copy-line text-emerald-600"></i> কোড কপি
          </button>
          <button
            onClick={handleShare}
            className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <i className="ri-share-forward-line"></i> লিংক শেয়ার
          </button>
        </div>
      </div>

      {/* Referred Friends List */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 px-1">
          <i className="ri-team-line text-emerald-600"></i>
          আপনার রেফারেল মেম্বার
        </h4>

        <div className="space-y-2">
          {mockReferrals.map(ref => (
            <div
              key={ref.id}
              className="glass-card rounded-2xl p-3 border border-slate-100 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  {ref.name[0]}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">{ref.name}</h5>
                  <p className="text-[10px] text-slate-400 font-medium">যোগদান: {ref.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-700 block">{ref.earned}</span>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  {ref.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

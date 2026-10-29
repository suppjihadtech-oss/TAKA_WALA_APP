import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { vipPackages } from '../../data/mockData';
import { VipPackage } from '../../types';

export const VipScreen: React.FC = () => {
  const { user, upgradeVip, setCurrentScreen, showToast } = useApp();
  const [selectedPkg, setSelectedPkg] = useState<VipPackage | null>(null);

  if (!user) return null;

  const handleConfirmUpgrade = () => {
    if (!selectedPkg) return;
    const ok = upgradeVip(selectedPkg);
    if (ok) {
      setSelectedPkg(null);
      setCurrentScreen('home');
    }
  };

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
        <h3 className="text-sm font-bold text-slate-800">ভিআইপি মেম্বারশিপ প্ল্যান</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            প্রিমিয়াম আর্নিং
          </span>
          <h2 className="text-xl font-black mt-2">৩.৫x গুণ বেশি আয় করুন!</h2>
          <p className="text-xs text-amber-100 mt-1 max-w-[85%]">
            ভিআইপি মেম্বারশিপ নিয়ে আনলিমিটেড হাই-পেইড টাস্ক, ইনস্ট্যান্ট উইথড্র এবং সর্বোচ্চ আর্নিং
            সুবিধা উপভোগ করুন।
          </p>
        </div>
        <i className="ri-vip-crown-fill text-8xl text-white/10 absolute -bottom-4 -right-2"></i>
      </div>

      {/* Packages Cards */}
      <div className="space-y-3.5">
        {vipPackages.map(pkg => {
          const isCurrent = user.plan === pkg.id;
          const displayPrice = pkg.discountPrice || pkg.price;

          return (
            <div
              key={pkg.id}
              className={`glass-card rounded-3xl p-5 border relative overflow-hidden transition-all ${
                isCurrent
                  ? 'border-2 border-emerald-500 bg-emerald-50/20 shadow-md'
                  : 'border-slate-200 hover:border-amber-300 shadow-xs'
              }`}
            >
              {pkg.discountPrice && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-2xl uppercase tracking-wider shadow-xs">
                  হ্যাপি আওয়ার ছাড়
                </span>
              )}

              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-base font-black text-slate-800">{pkg.nameBn}</h4>
                  <p className="text-[11px] text-slate-500">{pkg.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-700">৳{displayPrice}</div>
                  {pkg.discountPrice && (
                    <span className="text-[10px] text-slate-400 line-through">৳{pkg.price}</span>
                  )}
                </div>
              </div>

              {/* Benefits list */}
              <div className="space-y-1.5 my-3 pt-3 border-t border-slate-100 text-xs">
                {pkg.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-slate-700">
                    <i className="ri-checkbox-circle-fill text-emerald-500 text-sm"></i>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <button
                disabled={isCurrent}
                onClick={() => setSelectedPkg(pkg)}
                className={`w-full py-3 rounded-2xl font-black text-xs transition-all shadow-xs active:scale-95 ${
                  isCurrent
                    ? 'bg-emerald-100 text-emerald-700 cursor-default'
                    : 'bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white shadow-amber-600/30'
                }`}
              >
                {isCurrent ? 'বর্তমানে এই প্ল্যানটি সক্রিয়' : 'প্যাকেজ কিনুন 👑'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Upgrade Checkout Modal */}
      {selectedPkg && (
        <div className="ios-modal-overlay p-4 animate-fade-in">
          <div className="ios-modal max-w-xs w-full bg-white rounded-3xl p-5 shadow-2xl text-center">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner">
              <i className="ri-vip-crown-fill"></i>
            </div>

            <h3 className="text-base font-black text-slate-800 mb-1">
              {selectedPkg.nameBn} নিশ্চিতকরণ
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              মূল্য: <strong className="text-emerald-700">৳{selectedPkg.discountPrice || selectedPkg.price}</strong> • মেয়াদ: {selectedPkg.days} দিন
            </p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-left mb-4 space-y-1">
              <div className="flex justify-between">
                <span>ডিপোজিট ওয়ালেট:</span>
                <span className="font-bold">৳{user.depositBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>আর্নিং ব্যালেন্স:</span>
                <span className="font-bold">৳{user.balance.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPkg(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs hover:bg-slate-200"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmUpgrade}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs hover:opacity-95 shadow-md shadow-emerald-600/30"
              >
                হ্যাঁ, অ্যাক্টিভ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

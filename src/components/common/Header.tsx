import React from 'react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onOpenInbox: () => void;
  onOpenAvatar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInbox, onOpenAvatar }) => {
  const { user, currency, toggleCurrency, setCurrentScreen, unreadNotifs } = useApp();

  if (!user) return null;

  const bdtRate = 120;
  const displayBalance =
    currency === 'BDT'
      ? `৳${user.balance.toFixed(2)}`
      : `$${(user.balance / bdtRate).toFixed(2)}`;

  const planBadgeText =
    user.plan === 'platinum'
      ? 'প্লাটিনাম VIP'
      : user.plan === 'gold'
      ? 'গোল্ড VIP'
      : user.plan === 'silver'
      ? 'সিলভার VIP'
      : 'ফ্রি মেম্বার';

  const planBadgeStyle =
    user.plan === 'platinum'
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
      : user.plan === 'gold'
      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
      : user.plan === 'silver'
      ? 'bg-gradient-to-r from-slate-500 to-slate-700 text-white'
      : 'bg-slate-200 text-slate-700';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shadow-xs">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenAvatar}
          className="relative group transition-transform active:scale-95"
          title="প্রোফাইল ছবি পরিবর্তন করুন"
        >
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-11 h-11 rounded-full border-2 border-emerald-500 object-cover shadow-xs"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="text-left">
          <h2
            onClick={() => setCurrentScreen('profile')}
            className="text-sm font-bold text-slate-800 leading-tight cursor-pointer hover:text-emerald-600 truncate max-w-[130px]"
          >
            {user.name}
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${planBadgeStyle}`}>
              {planBadgeText}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Currency/Balance Pill & Notification */}
      <div className="flex items-center gap-2">
        {/* Balance Pill */}
        <button
          onClick={toggleCurrency}
          className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-all"
          title="কারেন্সি পরিবর্তন করুন (BDT / USDT)"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
            {currency === 'BDT' ? '৳' : '$'}
          </div>
          <span className="font-extrabold text-xs text-emerald-800 tracking-tight">
            {displayBalance}
          </span>
          <i className="ri-arrow-up-down-line text-xs text-emerald-600"></i>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenInbox}
          className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors active:scale-90"
          title="ইনবক্স মেসেজ"
        >
          <i className="ri-notification-3-line text-xl"></i>
          {unreadNotifs > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
          )}
        </button>
      </div>
    </header>
  );
};

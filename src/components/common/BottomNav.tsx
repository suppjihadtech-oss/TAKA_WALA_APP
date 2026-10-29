import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navItems: { screen: ScreenType; label: string; iconActive: string; iconInactive: string }[] = [
    {
      screen: 'home',
      label: 'হোম',
      iconActive: 'ri-home-5-fill text-emerald-600',
      iconInactive: 'ri-home-5-line text-slate-400'
    },
    {
      screen: 'wallet',
      label: 'ওয়ালেট',
      iconActive: 'ri-wallet-3-fill text-emerald-600',
      iconInactive: 'ri-wallet-3-line text-slate-400'
    },
    {
      screen: 'tasks',
      label: 'টাস্ক',
      iconActive: 'ri-task-fill text-emerald-600',
      iconInactive: 'ri-task-line text-slate-400'
    },
    {
      screen: 'history',
      label: 'হিস্ট্রি',
      iconActive: 'ri-history-fill text-emerald-600',
      iconInactive: 'ri-history-line text-slate-400'
    },
    {
      screen: 'profile',
      label: 'প্রোফাইল',
      iconActive: 'ri-user-3-fill text-emerald-600',
      iconInactive: 'ri-user-3-line text-slate-400'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-5px_25px_rgba(0,0,0,0.06)] py-1.5 px-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => setCurrentScreen(item.screen)}
              className="flex flex-col items-center justify-center flex-1 py-1 transition-transform active:scale-90"
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-xl transition-all ${
                  isActive ? 'bg-emerald-50 text-emerald-600 font-bold' : ''
                }`}
              >
                <i className={`text-xl ${isActive ? item.iconActive : item.iconInactive}`}></i>
              </div>
              <span
                className={`text-[11px] font-bold mt-0.5 ${
                  isActive ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

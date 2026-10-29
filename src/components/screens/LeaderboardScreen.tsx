import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { starterLeaderboard } from '../../data/mockData';

export const LeaderboardScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [tab, setTab] = useState<'earners' | 'referrers'>('earners');

  const sortedList = [...starterLeaderboard].sort((a, b) =>
    tab === 'earners' ? b.earned - a.earned : b.referrals - a.referrals
  );

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
        <h3 className="text-sm font-bold text-slate-800">সেরা লিডারবোর্ড</h3>
        <div className="w-10"></div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl gap-1 shadow-inner">
        <button
          onClick={() => setTab('earners')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'earners'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🏆 সর্বোচ্চ উপার্জনকারী
        </button>
        <button
          onClick={() => setTab('referrers')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'referrers'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          👥 সেরা রেফারার
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 pt-2 items-end">
        {/* 2nd place */}
        {sortedList[1] && (
          <div className="glass-card rounded-2xl p-2.5 text-center border border-slate-200 flex flex-col items-center">
            <span className="text-xl">🥈</span>
            <img
              src={sortedList[1].avatar}
              alt=""
              className="w-11 h-11 rounded-full border-2 border-slate-300 object-cover mt-1"
            />
            <h5 className="text-[11px] font-bold text-slate-800 truncate w-full mt-1">
              {sortedList[1].name}
            </h5>
            <span className="text-[10px] font-black text-emerald-700">
              {tab === 'earners' ? `৳${sortedList[1].earned}` : `${sortedList[1].referrals} জন`}
            </span>
          </div>
        )}

        {/* 1st place */}
        {sortedList[0] && (
          <div className="glass-card rounded-3xl p-3 text-center border-2 border-amber-400 bg-amber-50/50 flex flex-col items-center shadow-md scale-105 z-10">
            <span className="text-2xl">🥇</span>
            <img
              src={sortedList[0].avatar}
              alt=""
              className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover mt-1"
            />
            <h5 className="text-xs font-black text-slate-800 truncate w-full mt-1">
              {sortedList[0].name}
            </h5>
            <span className="text-xs font-black text-amber-700">
              {tab === 'earners' ? `৳${sortedList[0].earned}` : `${sortedList[0].referrals} জন`}
            </span>
          </div>
        )}

        {/* 3rd place */}
        {sortedList[2] && (
          <div className="glass-card rounded-2xl p-2.5 text-center border border-slate-200 flex flex-col items-center">
            <span className="text-xl">🥉</span>
            <img
              src={sortedList[2].avatar}
              alt=""
              className="w-11 h-11 rounded-full border-2 border-amber-600/40 object-cover mt-1"
            />
            <h5 className="text-[11px] font-bold text-slate-800 truncate w-full mt-1">
              {sortedList[2].name}
            </h5>
            <span className="text-[10px] font-black text-emerald-700">
              {tab === 'earners' ? `৳${sortedList[2].earned}` : `${sortedList[2].referrals} জন`}
            </span>
          </div>
        )}
      </div>

      {/* Full Leaderboard List */}
      <div className="space-y-2">
        {sortedList.slice(3).map((item, index) => (
          <div
            key={item.rank}
            className="glass-card rounded-2xl p-3 border border-slate-100 flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-center font-black text-slate-400 text-xs">
                #{index + 4}
              </span>
              <img src={item.avatar} alt="" className="w-9 h-9 rounded-full object-cover border" />
              <div>
                <h5 className="text-xs font-bold text-slate-800">{item.name}</h5>
                <span className="text-[10px] text-slate-400 font-semibold">{item.badge}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-700 block">
                {tab === 'earners' ? `৳${item.earned}` : `${item.referrals} রেফার`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

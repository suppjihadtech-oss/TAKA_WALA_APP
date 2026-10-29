import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AuthScreen: React.FC = () => {
  const { loginUser, showToast } = useApp();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regReferral, setRegReferral] = useState('');

  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      showToast('ইমেইল/ফোন এবং পাসওয়ার্ড প্রদান করুন!', 'error');
      return;
    }

    loginUser({
      name: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'ইউজার',
      email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@takawala.com`,
      phone: loginIdentifier.includes('@') ? '01890123456' : loginIdentifier
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regPassword.trim()) {
      showToast('সবগুলো প্রয়োজনীয় তথ্য পূরণ করুন!', 'error');
      return;
    }

    loginUser({
      name: regName,
      phone: regPhone,
      email: regEmail || `${regPhone}@takawala.com`,
      referralCode: `TW${Math.floor(1000 + Math.random() * 9000)}`,
      referredBy: regReferral || undefined,
      balance: 20.0, // Registration bonus ৳20
      isActivated: true
    });
    showToast('রেজিস্ট্রেশন সফল! সাথে ২০ টাকা বোনাস যোগ হয়েছে।', 'success');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      showToast('আপনার ইমেইল দিন!', 'error');
      return;
    }
    showToast('পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে!', 'success');
    setTab('login');
  };

  const handleDemoLogin = () => {
    loginUser({
      name: 'মো: জিহাদ হাসান',
      phone: '01890123456',
      email: 'jihad@takawala.com',
      balance: 145.5,
      depositBalance: 50.0,
      rechargeBalance: 20.0,
      plan: 'free',
      isActivated: true,
      referralCode: 'TW9921',
      totalEarned: 890.0,
      totalWithdrawn: 650.0
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center px-4 py-8 relative">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* App Branding Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center mx-auto mb-2.5 shadow-xl shadow-emerald-600/30 text-white text-3xl font-black">
          <i className="ri-wallet-3-fill"></i>
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">টাকা ওয়ালা</h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          সহজ কাজ পূরণ করে প্রতিদিন আয় করুন
        </p>
      </div>

      {/* Auth Card */}
      <div className="glass-card w-full max-w-sm rounded-3xl p-6 border border-slate-100 shadow-xl">
        {tab !== 'forgot' && (
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 mb-5">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              লগইন
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              রেজিস্ট্রেশন
            </button>
          </div>
        )}

        {/* Login Form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ইমেইল অথবা ফোন নাম্বার
              </label>
              <div className="relative">
                <i className="ri-user-line absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={e => setLoginIdentifier(e.target.value)}
                  placeholder="01XXXXXXXXX বা email@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">পাসওয়ার্ড</label>
                <button
                  type="button"
                  onClick={() => setTab('forgot')}
                  className="text-[11px] font-bold text-emerald-600 hover:underline"
                >
                  ভুলে গেছেন?
                </button>
              </div>
              <div className="relative">
                <i className="ri-lock-line absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs hover:opacity-95 shadow-md shadow-emerald-600/30 active:scale-95 transition-all mt-1"
            >
              লগইন করুন
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">আপনার নাম</label>
              <input
                type="text"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="যেমন: মো: জিহাদ"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">মোবাইল নাম্বার</label>
              <input
                type="text"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল (ঐচ্ছিক)</label>
              <input
                type="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                রেফার কোড (থাকলে দিন)
              </label>
              <input
                type="text"
                value={regReferral}
                onChange={e => setRegReferral(e.target.value.toUpperCase())}
                placeholder="যেমন: TW9921"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white uppercase font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs hover:opacity-95 shadow-md shadow-emerald-600/30 active:scale-95 transition-all mt-1"
            >
              অ্যাকাউন্ট খুলুন (ফ্রি ৳২০ বোনাস)
            </button>
          </form>
        )}

        {/* Forgot Password View */}
        {tab === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-3.5 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl mb-1">
              <i className="ri-key-line"></i>
            </div>
            <h3 className="text-sm font-bold text-slate-800">পাসওয়ার্ড রিসেট</h3>
            <p className="text-xs text-slate-500">আপনার নিবন্ধিত ইমেইল ঠিকানা প্রদান করুন</p>

            <input
              type="email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-xs"
            >
              রিসেট লিংক পাঠান
            </button>

            <button
              type="button"
              onClick={() => setTab('login')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 block mx-auto pt-1"
            >
              লগইনে ফিরে যান
            </button>
          </form>
        )}

        {/* 1-Click Instant Demo Login Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <i className="ri-flashlight-fill text-amber-500 text-sm"></i>
            ১ ক্লিকে ডেমো টেস্ট লগইন করুন
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SupportScreen: React.FC = () => {
  const { config, setCurrentScreen, showToast } = useApp();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      showToast('বিষয় ও মেসেজ উভয়ই পূরণ করুন!', 'error');
      return;
    }

    setTicketSent(true);
    showToast('আপনার সাপোর্ট টিকিট সফলভাবে জমা হয়েছে! শীঘ্রই যোগাযোগ করা হবে।', 'success');
    setSubject('');
    setMessage('');
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
        <h3 className="text-sm font-bold text-slate-800">২৪/৭ লাইভ সাপোর্ট</h3>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-md text-center">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
          <i className="ri-customer-service-2-line"></i>
        </div>
        <h2 className="text-lg font-black">আমরা সার্বক্ষণিক আপনার সহায়তায় প্রস্তুত</h2>
        <p className="text-xs text-blue-100 mt-1">
          টাস্ক, পেমেন্ট, উইথড্র বা ডিপোজিট সংক্রান্ত যেকোনো সমস্যায় সরাসরি যোগাযোগ করুন।
        </p>
      </div>

      {/* Official Channel Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={config.supportTelegram}
          target="_blank"
          rel="noreferrer"
          className="glass-card rounded-2xl p-3.5 border border-slate-100 hover:border-blue-300 transition-all text-center flex flex-col items-center shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-1.5 group-hover:scale-105 transition-transform">
            <i className="ri-telegram-fill"></i>
          </div>
          <h4 className="text-xs font-bold text-slate-800">টেলিগ্রাম চ্যানেল</h4>
          <span className="text-[10px] text-blue-600 font-semibold mt-0.5">সব খবর ও আপডেট</span>
        </a>

        <a
          href="https://t.me/takawala_admin"
          target="_blank"
          rel="noreferrer"
          className="glass-card rounded-2xl p-3.5 border border-slate-100 hover:border-emerald-300 transition-all text-center flex flex-col items-center shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-1.5 group-hover:scale-105 transition-transform">
            <i className="ri-chat-voice-fill"></i>
          </div>
          <h4 className="text-xs font-bold text-slate-800">এডমিন লাইভ চ্যাট</h4>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">সরাসরি কথা বলুন</span>
        </a>

        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noreferrer"
          className="glass-card rounded-2xl p-3.5 border border-slate-100 hover:border-green-300 transition-all text-center flex flex-col items-center shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl mb-1.5 group-hover:scale-105 transition-transform">
            <i className="ri-whatsapp-fill"></i>
          </div>
          <h4 className="text-xs font-bold text-slate-800">হোয়াটসঅ্যাপ</h4>
          <span className="text-[10px] text-green-600 font-semibold mt-0.5">জরুরি মেসেজ</span>
        </a>

        <a
          href={`mailto:${config.adminEmail}`}
          className="glass-card rounded-2xl p-3.5 border border-slate-100 hover:border-purple-300 transition-all text-center flex flex-col items-center shadow-2xs group"
        >
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-1.5 group-hover:scale-105 transition-transform">
            <i className="ri-mail-send-fill"></i>
          </div>
          <h4 className="text-xs font-bold text-slate-800">অফিসিয়াল ইমেইল</h4>
          <span className="text-[10px] text-purple-600 font-semibold mt-0.5">{config.adminEmail}</span>
        </a>
      </div>

      {/* Ticket Form */}
      <form onSubmit={handleSubmitTicket} className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <i className="ri-feedback-line text-blue-600"></i>
          সরাসরি মেসেজ / সাপোর্ট টিকিট পাঠান
        </h4>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">সমস্যার বিষয়</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="যেমন: উইথড্র পেন্ডিং বা টাস্ক সমস্যা"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">বিস্তারিত বিবরণ</label>
          <textarea
            rows={3}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="আপনার সমস্যার কথা বিস্তারিতভাবে লিখুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
        >
          টিকিট সাবমিট করুন
        </button>
      </form>
    </div>
  );
};

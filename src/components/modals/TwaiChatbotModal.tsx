import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { twaiResponses } from '../../data/mockData';
import { ChatMessage } from '../../types';

export const TwaiChatbotModal: React.FC = () => {
  const { isTwaiOpen, setIsTwaiOpen } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'bot',
      text: 'আসসালামু আলাইকুম! আমি TWAI, টাকা ওয়ালা অ্যাপের ভার্চুয়াল অ্যাসিস্ট্যান্ট। নিচে দেওয়া যেকোনো প্রশ্নে ক্লিক করুন অথবা আপনার সমস্যা লিখে পাঠান।',
      timestamp: 'এইমাত্র'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'কিভাবে কাজ করব?',
    'টাকা তুলব কিভাবে?',
    'রেফার বোনাস কত?',
    'পেমেন্ট পেতে কতক্ষণ লাগে?',
    'মিনিমাম উইথড্র কত?',
    'ভ্যাট বা চার্জ কত?',
    'এক ফোনে কয়টি একাউন্ট?',
    'কুইজ খেলার নিয়ম?',
    'ডেইলি বোনাস কিভাবে নিব?',
    'লাকি ড্র কি?',
    'স্পিন করে ইনকাম?',
    'ডিপোজিট এড হচ্ছে না?',
    'পিন সেট করব কিভাবে?',
    'এডমিন কখন লাইনে থাকে?'
  ];

  useEffect(() => {
    if (isTwaiOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTwaiOpen]);

  if (!isTwaiOpen) return null;

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputText).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Answer matching
    setTimeout(() => {
      let botAnswer = twaiResponses[q];

      if (!botAnswer) {
        // Try partial keyword match
        const lowerQ = q.toLowerCase();
        const matchedKey = Object.keys(twaiResponses).find(key =>
          key.toLowerCase().includes(lowerQ) || lowerQ.includes(key.replace(/[?？]/g, ''))
        );
        botAnswer = matchedKey ? twaiResponses[matchedKey] : twaiResponses['default'];
      }

      const botMsg: ChatMessage = {
        id: `msg_b_${Date.now()}`,
        sender: 'bot',
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md h-[88vh] sm:h-[650px] sm:rounded-3xl rounded-t-3xl flex flex-col overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 px-4 py-3.5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center">
              <i className="ri-robot-2-line text-2xl text-purple-200"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                TWAI এআই হেল্পার
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              </h3>
              <p className="text-[11px] text-purple-200">সার্বক্ষণিক স্মার্ট সহায়তা</p>
            </div>
          </div>
          <button
            onClick={() => setIsTwaiOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-scale-up`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-semibold">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions Chips */}
        <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
          {quickQuestions.map((qq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qq)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 text-[11px] font-bold border border-slate-200/60 transition-colors"
            >
              {qq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center hover:opacity-95 active:scale-95 transition-all shadow-md"
          >
            <i className="ri-send-plane-fill text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

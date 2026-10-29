import React from 'react';
import { useApp } from '../../context/AppContext';

interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InboxModal: React.FC<InboxModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsAsRead } = useApp();

  if (!isOpen) return null;

  return (
    <div className="ios-modal-overlay p-4 animate-fade-in">
      <div className="ios-modal max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-mail-unread-fill text-2xl text-emerald-200"></i>
            <div className="text-left">
              <h3 className="font-bold text-sm">নোটিফিকেশন ইনবক্স</h3>
              <p className="text-[10px] text-emerald-100">সকল লেনদেন ও অফারের নোটিশ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 overflow-y-auto space-y-2.5 flex-1 text-left bg-slate-50">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <i className="ri-inbox-line text-4xl"></i>
              <p className="text-xs font-bold mt-2">কোনো নোটিফিকেশন নেই</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                className={`p-3 rounded-2xl border transition-all ${
                  notif.read
                    ? 'bg-white border-slate-200/80 text-slate-700'
                    : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        notif.type === 'success'
                          ? 'bg-emerald-500'
                          : notif.type === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    ></span>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold">{notif.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <button
            onClick={() => {
              markNotificationsAsRead();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-600 font-bold text-white text-xs hover:bg-emerald-700 transition-colors"
          >
            সব পঠিত হিসেবে চিহ্নিত করুন
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';

export const SmartToast: React.FC = () => {
  const { toastState } = useApp();

  if (!toastState.visible) return null;

  const isSuccess = toastState.type === 'success';
  const isError = toastState.type === 'error';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999999] min-w-[290px] max-w-[92%] px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_10px_35px_rgba(0,0,0,0.18)] flex items-center gap-3 animate-bounce-short">
      <div className="text-xl flex items-center justify-center">
        {isSuccess ? (
          <i className="ri-checkbox-circle-fill text-emerald-500"></i>
        ) : isError ? (
          <i className="ri-close-circle-fill text-red-500"></i>
        ) : (
          <i className="ri-information-fill text-blue-500"></i>
        )}
      </div>
      <p className="text-xs font-bold text-slate-800 flex-1 leading-snug">
        {toastState.message}
      </p>
    </div>
  );
};

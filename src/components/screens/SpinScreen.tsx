import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SpinScreen: React.FC = () => {
  const { user, spinWin, setCurrentScreen, showToast } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);

  const prizes = [
    { label: '৳২', value: 2, color: '#10b981' },
    { label: '৳৫', value: 5, color: '#3b82f6' },
    { label: '৳১০', value: 10, color: '#f59e0b' },
    { label: 'ফ্রি স্পিন', value: 0, color: '#8b5cf6' },
    { label: '৳২০', value: 20, color: '#ec4899' },
    { label: 'গুড লাক', value: 0, color: '#64748b' },
    { label: '৳৫০', value: 50, color: '#06b6d4' },
    { label: '৳১০০', value: 100, color: '#ef4444' }
  ];

  const totalSlices = prizes.length;
  const sliceAngle = (2 * Math.PI) / totalSlices;

  const maxSpins =
    user?.plan === 'platinum' ? 50 : user?.plan === 'gold' ? 40 : user?.plan === 'silver' ? 30 : 15;
  const remainingSpins = Math.max(0, maxSpins - (user?.dailySpinCount || 0));

  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 15;

    ctx.clearRect(0, 0, width, height);

    // Draw slices
    prizes.forEach((prize, index) => {
      const startAngle = angle + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Hind Siliguri, sans-serif';
      ctx.fillText(prize.label, radius - 25, 5);
      ctx.restore();
    });

    // Outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#f8fafc';
    ctx.stroke();

    // Center peg
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#059669';
    ctx.stroke();

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 11px Hind Siliguri, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY);
  };

  useEffect(() => {
    drawWheel(currentAngle);
  }, [currentAngle]);

  const handleSpin = () => {
    if (isSpinning) return;
    if (remainingSpins <= 0) {
      showToast('আজকের স্পিন লিমিট শেষ! আগামীকাল আবার স্পিন করতে পারবেন।', 'error');
      return;
    }

    setIsSpinning(true);

    // Pick random prize
    const selectedIndex = Math.floor(Math.random() * totalSlices);
    const selectedPrize = prizes[selectedIndex];

    // Calculate rotation: 5 full spins + target slice alignment
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const targetSliceCenter = (totalSlices - selectedIndex - 0.5) * sliceAngle;
    const finalAngle = currentAngle + fullSpins * 2 * Math.PI + targetSliceCenter;

    const duration = 4000;
    const startTime = performance.now();
    const initialAngle = currentAngle;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const angle = initialAngle + (finalAngle - initialAngle) * easeOut;

      setCurrentAngle(angle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        spinWin(selectedPrize.value);
        if (selectedPrize.value > 0) {
          showToast(`🎉 অভিনন্দন! আপনি জিতেছেন ${selectedPrize.label}!`, 'success');
        } else {
          showToast('ধন্যবাদ! আবারও চেষ্টা করুন।', 'info');
        }
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto text-center animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          হোমে ফিরুন
        </button>
        <h3 className="text-sm font-bold text-slate-800">লাকি স্পিন হুইল</h3>
        <div className="w-10"></div>
      </div>

      <div className="glass-card rounded-3xl p-4 border border-slate-100 shadow-xs relative overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              আজকের বাকি স্পিন
            </span>
            <span className="text-sm font-black text-emerald-700">
              {remainingSpins} / {maxSpins} বার
            </span>
          </div>
          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
            জ্যাকপট ১০০ টাকা!
          </span>
        </div>

        {/* Wheel Container */}
        <div className="relative w-[280px] h-[280px] mx-auto my-3 flex items-center justify-center">
          {/* Top Indicator Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 text-rose-600 text-3xl filter drop-shadow-md">
            <i className="ri-arrow-down-s-fill"></i>
          </div>

          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="rounded-full shadow-xl"
          />
        </div>

        <button
          disabled={isSpinning || remainingSpins <= 0}
          onClick={handleSpin}
          className={`w-full py-3.5 rounded-2xl font-extrabold text-sm text-white shadow-lg active:scale-95 transition-all mt-2 ${
            isSpinning || remainingSpins <= 0
              ? 'bg-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 shadow-emerald-600/30'
          }`}
        >
          {isSpinning ? 'হুইল ঘুরছে...' : remainingSpins <= 0 ? 'আজকের লিমিট শেষ' : 'স্পিন করুন 🎯'}
        </button>
      </div>

      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs text-emerald-800">
        <h5 className="font-bold flex items-center gap-1.5 mb-1">
          <i className="ri-lightbulb-flash-line text-emerald-600"></i> স্পিন টিপস:
        </h5>
        <p className="text-[11px] text-emerald-700 leading-relaxed">
          ভিআইপি মেম্বাররা প্রতিদিন সর্বোচ্চ ৫০ বার পর্যন্ত স্পিন করার সুযোগ পাবেন। যেকোনো সময় বড়
          অঙ্কের ক্যাশ প্রাইজ জেতার সম্ভাবনা রয়েছে!
        </p>
      </div>
    </div>
  );
};

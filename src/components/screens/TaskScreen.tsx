import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';

export const TaskScreen: React.FC = () => {
  const { tasks, user, completeTask, setCurrentScreen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'free' | 'vip'>('free');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [proofText, setProofText] = useState('');

  const filteredTasks = tasks.filter(t => t.type === activeTab);

  useEffect(() => {
    let timer: any = null;
    if (selectedTask && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedTask, countdown]);

  if (!user) return null;

  const handleOpenTask = (task: Task) => {
    if (task.completed) {
      showToast('এই টাস্কটি আজকের মতো সম্পন্ন হয়েছে!', 'info');
      return;
    }
    if (task.type === 'vip' && user.plan === 'free') {
      showToast('ভিআইপি টাস্ক করতে ভিআইপি মেম্বারশিপ প্রয়োজন!', 'error');
      setCurrentScreen('vip');
      return;
    }

    setSelectedTask(task);
    setCountdown(task.timeInSec);
    setProofText('');
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    if (countdown > 0) {
      showToast(`দয়া করে অপেক্ষা করুন, আরও ${countdown} সেকেন্ড বাকি!`, 'info');
      return;
    }
    if (!proofText.trim()) {
      showToast('প্রমাণ বা ইউজারনেম লিখুন!', 'error');
      return;
    }

    completeTask(selectedTask.id, proofText);
    setSelectedTask(null);
  };

  const multiplier =
    user.plan === 'platinum' ? 3.5 : user.plan === 'gold' ? 2.2 : user.plan === 'silver' ? 1.5 : 1.0;

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      {/* Task Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl gap-1 shadow-inner">
        <button
          onClick={() => setActiveTab('free')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'free'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ফ্রি টাস্ক (সাধারণ কাজ)
        </button>
        <button
          onClick={() => setActiveTab('vip')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'vip'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ভিআইপি মেগা টাস্ক ⭐
        </button>
      </div>

      {/* Info Card */}
      <div className="glass-card rounded-2xl p-3 border border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <i className="ri-information-fill text-emerald-600 text-lg"></i>
          <span className="text-slate-600 font-medium">
            আপনার বর্তমান প্ল্যান মাল্টিপ্লায়ার: <strong className="text-emerald-700">{multiplier}x</strong>
          </span>
        </div>
        {user.plan === 'free' && (
          <button
            onClick={() => setCurrentScreen('vip')}
            className="text-[11px] font-bold text-amber-600 hover:underline"
          >
            আপগ্রেড করুন
          </button>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          const rewardDisplay = (task.reward * multiplier).toFixed(2);
          return (
            <div
              key={task.id}
              className={`glass-card rounded-3xl p-4 border transition-all ${
                task.completed
                  ? 'border-emerald-200 bg-emerald-50/40 opacity-75'
                  : 'border-slate-100 hover:border-emerald-200 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-2xs">
                    <i className={task.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2 py-0.5 rounded-full">
                        +৳{rewardDisplay}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5">
                        <i className="ri-time-line"></i> {task.timeInSec}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">{task.instructions}</p>

              <button
                disabled={task.completed}
                onClick={() => handleOpenTask(task)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  task.completed
                    ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-98'
                }`}
              >
                {task.completed ? (
                  <>
                    <i className="ri-check-line font-bold"></i> সম্পন্ন হয়েছে
                  </>
                ) : (
                  <>
                    কাজ করুন <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Task Proof Submission Modal */}
      {selectedTask && (
        <div className="proof-modal p-4 animate-fade-in">
          <div className="proof-content max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-5 relative">
            {/* Timer badge */}
            <div className="task-timer flex items-center gap-1">
              <i className="ri-timer-line"></i> {countdown}s
            </div>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl">
                <i className={selectedTask.icon}></i>
              </div>
              <div className="text-left max-w-[200px]">
                <h4 className="text-xs font-bold text-slate-800 truncate">{selectedTask.title}</h4>
                <span className="text-[11px] text-emerald-600 font-black">
                  পুরস্কার: ৳{(selectedTask.reward * multiplier).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left mb-4 text-xs">
              <span className="font-bold text-slate-700 block mb-1">কাজের নির্দেশাবলী:</span>
              <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">
                {selectedTask.instructions}
              </p>
              <a
                href={selectedTask.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-700 shadow-2xs"
              >
                <i className="ri-external-link-line"></i> লিংকে যান
              </a>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-3 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  কাজের প্রমাণ (ইউজারনেম / স্ক্রিনশট লিংক)
                </label>
                <textarea
                  rows={2}
                  value={proofText}
                  onChange={e => setProofText(e.target.value)}
                  placeholder="আপনার ইউজারনেম অথবা প্রুফ বিবরণ লিখুন..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                  required
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs hover:bg-slate-200"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={countdown > 0}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs text-white transition-all ${
                    countdown > 0
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-sm'
                  }`}
                >
                  {countdown > 0 ? `${countdown}s অপেক্ষা করুন` : 'প্রুফ সাবমিট করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

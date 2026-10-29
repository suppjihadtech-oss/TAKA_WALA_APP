import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { quizQuestions } from '../../data/mockData';
import { QuizQuestion } from '../../types';

export const QuizScreen: React.FC = () => {
  const { setCurrentScreen, showToast, updateUser, user, triggerConfetti } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'math' | 'science' | 'islamic' | null>(null);
  const [activeQuizzes, setActiveQuizzes] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const categories = [
    { id: 'general', title: 'সাধারণ জ্ঞান', icon: 'ri-earth-line', color: 'from-blue-500 to-indigo-600' },
    { id: 'math', title: 'গণিত ও ধাঁধা', icon: 'ri-calculator-line', color: 'from-purple-500 to-pink-600' },
    { id: 'science', title: 'বিজ্ঞান ও প্রযুক্তি', icon: 'ri-flask-line', color: 'from-emerald-500 to-teal-600' },
    { id: 'islamic', title: 'ইসলামিক কুইজ', icon: 'ri-book-read-line', color: 'from-amber-500 to-orange-600' }
  ];

  const handleStartCategory = (cat: 'general' | 'math' | 'science' | 'islamic') => {
    const list = quizQuestions.filter(q => q.category === cat);
    setSelectedCategory(cat);
    setActiveQuizzes(list);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTimeLeft(60);
    setQuizFinished(false);
    setScore(0);
  };

  useEffect(() => {
    let timer: any = null;
    if (selectedCategory && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedCategory, quizFinished, timeLeft]);

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleFinishQuiz = () => {
    let correct = 0;
    activeQuizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const reward = correct * 1.5; // ৳1.5 per correct answer
    setScore(correct);
    setQuizFinished(true);

    if (user && reward > 0) {
      updateUser({
        balance: Number((user.balance + reward).toFixed(2)),
        totalEarned: Number((user.totalEarned + reward).toFixed(2))
      });
      triggerConfetti();
      showToast(`কুইজ সম্পন্ন! আপনি ৳${reward} ক্যাশ পুরস্কার পেয়েছেন!`, 'success');
    } else {
      showToast('কুইজ সমাপ্ত হয়েছে!', 'info');
    }
  };

  return (
    <div className="pb-24 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (selectedCategory && !quizFinished) {
              setSelectedCategory(null);
            } else {
              setCurrentScreen('home');
            }
          }}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600"
        >
          <i className="ri-arrow-left-s-line text-lg"></i>
          {selectedCategory && !quizFinished ? 'ক্যাটাগরিতে ফিরুন' : 'হোমে ফিরুন'}
        </button>
        <h3 className="text-sm font-bold text-slate-800">কুইজ প্রতিযোগিতা</h3>
        <div className="w-10"></div>
      </div>

      {/* Categories View */}
      {!selectedCategory ? (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-5 text-white shadow-md text-center">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              বুদ্ধির লড়াই
            </span>
            <h2 className="text-xl font-black mt-2">কুইজ খেলে জ্ঞান ও আয় বৃদ্ধি করুন</h2>
            <p className="text-xs text-cyan-100 mt-1">প্রতিটি সঠিক উত্তরে পাবেন নগদ টাকা ও রিওয়ার্ড পয়েন্ট</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleStartCategory(cat.id as any)}
                className="glass-card rounded-3xl p-4 border border-slate-100 hover:border-emerald-300 transition-all flex flex-col items-center justify-center text-center shadow-2xs group active:scale-95"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center text-2xl shadow-sm mb-2 group-hover:scale-105 transition-transform`}
                >
                  <i className={cat.icon}></i>
                </div>
                <h4 className="text-xs font-bold text-slate-800">{cat.title}</h4>
                <span className="text-[10px] text-emerald-600 font-bold mt-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                  খেলুন <i className="ri-arrow-right-s-line"></i>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : quizFinished ? (
        /* Quiz Result Card */
        <div className="glass-card rounded-3xl p-6 border border-slate-100 text-center shadow-md animate-scale-up space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
            <i className="ri-award-fill"></i>
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800">কুইজ ফলাফল</h3>
            <p className="text-xs text-slate-500">আপনার আজকের স্কোর</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-3xl font-black text-emerald-700">
              {score} / {activeQuizzes.length}
            </div>
            <p className="text-xs font-bold text-slate-600 mt-1">
              পুরস্কার লাভ: +৳{(score * 1.5).toFixed(2)} ক্যাশ
            </p>
          </div>

          <button
            onClick={() => setSelectedCategory(null)}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
          >
            অন্য ক্যাটাগরি খেলুন
          </button>
        </div>
      ) : (
        /* Active Quiz Question View */
        <div className="glass-card rounded-3xl p-5 border border-slate-100 shadow-md space-y-4">
          {/* Header timer */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">
              প্রশ্ন: {currentIdx + 1} / {activeQuizzes.length}
            </span>
            <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 font-black text-xs px-3 py-1 rounded-full border border-rose-200">
              <i className="ri-timer-line"></i> {timeLeft}s
            </div>
          </div>

          {/* Current Question */}
          {activeQuizzes[currentIdx] && (
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 mb-4 leading-snug">
                {activeQuizzes[currentIdx].question}
              </h4>

              <div className="space-y-2.5">
                {activeQuizzes[currentIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3 rounded-2xl text-left text-xs font-bold transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <i className="ri-check-line"></i>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex gap-2 pt-2">
            {currentIdx > 0 && (
              <button
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs"
              >
                আগেরটি
              </button>
            )}

            {currentIdx < activeQuizzes.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-xs"
              >
                পরের প্রশ্ন <i className="ri-arrow-right-line"></i>
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs hover:opacity-95 shadow-md shadow-emerald-600/30"
              >
                সাবমিট করুন 🎯
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

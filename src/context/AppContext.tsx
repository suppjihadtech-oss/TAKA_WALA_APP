import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  ScreenType,
  Task,
  Transaction,
  VipPackage,
  LuckyTicket,
  NotificationItem,
  SystemConfig
} from '../types';
import { initialConfig, starterTasks, vipPackages } from '../data/mockData';

interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  user: User | null;
  currency: 'BDT' | 'USDT';
  toggleCurrency: () => void;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  tasks: Task[];
  transactions: Transaction[];
  notifications: NotificationItem[];
  unreadNotifs: number;
  luckyTickets: LuckyTicket[];
  config: SystemConfig;
  toastState: ToastState;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  receiptData: Transaction | null;
  setReceiptData: (tx: Transaction | null) => void;
  isTwaiOpen: boolean;
  setIsTwaiOpen: (open: boolean) => void;
  loginUser: (data: Partial<User>) => void;
  logoutUser: () => void;
  updateUser: (data: Partial<User>) => void;
  completeTask: (taskId: string, proof: string) => void;
  depositFunds: (method: string, amount: number, trxId: string, phone: string) => void;
  withdrawFunds: (method: string, amount: number, phone: string) => boolean;
  rechargeMobile: (operator: string, phone: string, amount: number) => boolean;
  transferFunds: (fromType: string, toType: string, amount: number, targetPhone?: string) => boolean;
  spinWin: (amount: number) => void;
  buyLuckyTicket: () => boolean;
  redeemPromo: (code: string) => { success: boolean; message: string; amount?: number };
  upgradeVip: (pkg: VipPackage) => boolean;
  activateAccount: () => void;
  triggerConfetti: () => void;
  markNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr_849201',
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
  totalWithdrawn: 650.0,
  avatar: 'https://img.icons8.com/fluency/96/user-male-circle.png',
  pin: '1234',
  createdAt: '2026-08-15',
  todayTasksDone: 2,
  dailySpinCount: 3,
  lastSpinDate: new Date().toISOString().split('T')[0],
  dailyVideoCount: 4,
};

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_982141',
    type: 'withdraw',
    amount: 150,
    method: 'bKash',
    accountNo: '01890123456',
    trxId: 'BK89X7219L',
    status: 'success',
    timestamp: 'আজ, ০২:৪৫ PM',
    fee: 15,
    note: 'বিকাশ পার্সোনাল ক্যাশ আউট সম্পন্ন'
  },
  {
    id: 'tx_982140',
    type: 'deposit',
    amount: 200,
    method: 'Nagad',
    accountNo: '01987654321',
    trxId: 'NG6741289P',
    status: 'success',
    timestamp: 'গতকাল, ১১:২০ AM',
    note: 'নগদ সেন্ড মানি ডিপোজিট'
  },
  {
    id: 'tx_982139',
    type: 'task',
    amount: 15,
    method: 'System',
    trxId: 'TSK008129',
    status: 'success',
    timestamp: 'গতকাল, ০৯:১৫ AM',
    note: 'টেলিগ্রাম ও ইউটিউব টাস্ক রিওয়ার্ড'
  },
  {
    id: 'tx_982138',
    type: 'spin',
    amount: 10,
    method: 'Lucky Wheel',
    trxId: 'SPN772184',
    status: 'success',
    timestamp: '২৬ অক্টোবর, ০৪:৫০ PM',
    note: 'লাকি স্পিন নগদ উইনিং'
  }
];

const DEFAULT_NOTIFS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'পেমেন্ট সম্পন্ন হয়েছে!',
    message: 'আপনার ১৫০ টাকার বিকাশ উইথড্র সফলভাবে পাঠানো হয়েছে। ট্রানজেকশন আইডি: BK89X7219L',
    date: '১০ মিনিট আগে',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: 'নতুন ভিআইপি টাস্ক যুক্ত হয়েছে',
    message: 'আজকের নতুন ৪টি হাই-পেইড ভিআইপি টাস্ক এসেছে। এখনই সম্পন্ন করে আয় বাড়ান!',
    date: '১ ঘণ্টা আগে',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    title: 'হ্যাপি আওয়ার শুরু!',
    message: 'আজকের হ্যাপি আওয়ার চলছে! যেকোনো ভিআইপি প্যাকেজে পাচ্ছেন বিশেষ ছাড়।',
    date: '৩ ঘণ্টা আগে',
    read: true,
    type: 'warning'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('takawala_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [currency, setCurrency] = useState<'BDT' | 'USDT'>('BDT');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('takawala_tasks');
    return saved ? JSON.parse(saved) : starterTasks;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('takawala_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('takawala_notifs');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFS;
  });

  const [luckyTickets, setLuckyTickets] = useState<LuckyTicket[]>([
    {
      id: 'tkt-1',
      ticketNumber: 'TK-84912',
      purchaseDate: 'আজ, ১০:১৫ AM',
      drawDate: 'আজ, রাত ০৯:০০ PM',
      price: 10,
      status: 'waiting'
    }
  ]);

  const [receiptData, setReceiptData] = useState<Transaction | null>(null);
  const [isTwaiOpen, setIsTwaiOpen] = useState(false);
  const [config] = useState<SystemConfig>(initialConfig);

  const [toastState, setToastState] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('takawala_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('takawala_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('takawala_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('takawala_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('takawala_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastState({ visible: true, message, type });
    setTimeout(() => {
      setToastState(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'BDT' ? 'USDT' : 'BDT'));
  };

  const loginUser = (data: Partial<User>) => {
    const newUser: User = {
      ...DEFAULT_USER,
      ...data,
      id: data.id || `usr_${Math.floor(100000 + Math.random() * 900000)}`
    };
    setUser(newUser);
    showToast('সফলভাবে লগইন হয়েছে!', 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('লগআউট সম্পন্ন হয়েছে', 'info');
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...data } : null));
  };

  const completeTask = (taskId: string, proof: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !user) return;

    const multiplier = user.plan === 'platinum' ? 3.5 : user.plan === 'gold' ? 2.2 : user.plan === 'silver' ? 1.5 : 1.0;
    const finalReward = Number((task.reward * multiplier).toFixed(2));

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: Number((prev.balance + finalReward).toFixed(2)),
        totalEarned: Number((prev.totalEarned + finalReward).toFixed(2)),
        todayTasksDone: prev.todayTasksDone + 1
      };
    });

    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, completed: true } : t)));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'task',
      amount: finalReward,
      method: 'Task Reward',
      trxId: `TSK_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'success',
      timestamp: 'এইমাত্র',
      note: `${task.title} সম্পন্ন হয়েছে`
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();
    showToast(`অভিনন্দন! ৳${finalReward} আপনার ব্যালেন্সে যোগ হয়েছে!`, 'success');
  };

  const depositFunds = (method: string, amount: number, trxId: string, phone: string) => {
    if (!user) return;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'deposit',
      amount,
      method,
      accountNo: phone,
      trxId: trxId.toUpperCase(),
      status: 'pending',
      timestamp: 'এইমাত্র',
      note: `${method} ডিপোজিট রিকোয়েস্ট যাচাইাধীন`
    };

    setTransactions(prev => [newTx, ...prev]);

    // Simulate instant admin review / auto verify in 3 seconds for smooth UX demo
    setTimeout(() => {
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          depositBalance: Number((prev.depositBalance + amount).toFixed(2))
        };
      });
      setTransactions(prev =>
        prev.map(tx => (tx.id === newTx.id ? { ...tx, status: 'success' } : tx))
      );
      showToast(`আপনার ৳${amount} ডিপোজিট সফলভাবে অ্যাক্টিভ হয়েছে!`, 'success');
      triggerConfetti();
    }, 3500);

    showToast('ডিপোজিট রিকোয়েস্ট জমা হয়েছে! ৫ মিনিটের মধ্যে ভেরিফাই হবে।', 'info');
  };

  const withdrawFunds = (method: string, amount: number, phone: string): boolean => {
    if (!user) return false;

    if (user.balance < amount) {
      showToast('আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স নেই!', 'error');
      return false;
    }

    if (amount < config.minimumWithdraw) {
      showToast(`সর্বনিম্ন উইথড্র ৳${config.minimumWithdraw}!`, 'error');
      return false;
    }

    const fee = Number(((amount * config.withdrawalVatPercent) / 100).toFixed(2));
    const netAmount = Number((amount - fee).toFixed(2));

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: Number((prev.balance - amount).toFixed(2)),
        totalWithdrawn: Number((prev.totalWithdrawn + netAmount).toFixed(2))
      };
    });

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'withdraw',
      amount,
      fee,
      method,
      accountNo: phone,
      trxId: `WD_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: 'pending',
      timestamp: 'এইমাত্র',
      note: `${method} নাম্বারে ক্যাশ আউট (ভ্যাট: ৳${fee}, পাবেন: ৳${netAmount})`
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(`৳${amount} উত্তোলনের আবেদন সফল! কিছুক্ষণের মধ্যে টাকা পাবেন।`, 'success');
    return true;
  };

  const rechargeMobile = (operator: string, phone: string, amount: number): boolean => {
    if (!user) return false;
    if (user.rechargeBalance < amount && user.balance < amount) {
      showToast('রিচার্জ করার জন্য পর্যাপ্ত ব্যালেন্স নেই!', 'error');
      return false;
    }

    // Deduct from recharge balance first, then main balance
    setUser(prev => {
      if (!prev) return null;
      let newRecharge = prev.rechargeBalance;
      let newBalance = prev.balance;

      if (newRecharge >= amount) {
        newRecharge = Number((newRecharge - amount).toFixed(2));
      } else {
        const remaining = amount - newRecharge;
        newRecharge = 0;
        newBalance = Number((newBalance - remaining).toFixed(2));
      }

      return { ...prev, balance: newBalance, rechargeBalance: newRecharge };
    });

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'recharge',
      amount,
      method: operator,
      accountNo: phone,
      trxId: `RC_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'success',
      timestamp: 'এইমাত্র',
      note: `${operator} (${phone}) রিচার্জ সফল`
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();
    showToast(`৳${amount} মোবাইল রিচার্জ সফল হয়েছে!`, 'success');
    return true;
  };

  const transferFunds = (fromType: string, toType: string, amount: number, targetPhone?: string): boolean => {
    if (!user) return false;

    if (fromType === 'income' && user.balance < amount) {
      showToast('আর্নিং ব্যালেন্স অপর্যাপ্ত!', 'error');
      return false;
    }
    if (fromType === 'deposit' && user.depositBalance < amount) {
      showToast('ডিপোজিট ব্যালেন্স অপর্যাপ্ত!', 'error');
      return false;
    }

    setUser(prev => {
      if (!prev) return null;
      let b = prev.balance;
      let d = prev.depositBalance;
      let r = prev.rechargeBalance;

      if (fromType === 'income') b -= amount;
      if (fromType === 'deposit') d -= amount;

      if (toType === 'deposit') d += amount;
      if (toType === 'recharge') r += amount;

      return {
        ...prev,
        balance: Number(b.toFixed(2)),
        depositBalance: Number(d.toFixed(2)),
        rechargeBalance: Number(r.toFixed(2))
      };
    });

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'transfer',
      amount,
      method: 'ইন-অ্যাপ ট্রান্সফার',
      accountNo: targetPhone || 'নিজ ওয়ালেট',
      trxId: `TR_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'success',
      timestamp: 'এইমাত্র',
      note: `${fromType} থেকে ${toType} এ ৳${amount} স্থানান্তরিত`
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(`৳${amount} সফলভাবে ট্রান্সফার করা হয়েছে!`, 'success');
    return true;
  };

  const spinWin = (amount: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: Number((prev.balance + amount).toFixed(2)),
        dailySpinCount: prev.dailySpinCount + 1,
        totalEarned: Number((prev.totalEarned + amount).toFixed(2))
      };
    });

    if (amount > 0) {
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        type: 'spin',
        amount,
        method: 'স্পিন হুইল',
        trxId: `SPN_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        status: 'success',
        timestamp: 'এইমাত্র',
        note: `লাকি স্পিনে ৳${amount} জিতেছেন`
      };
      setTransactions(prev => [newTx, ...prev]);
      triggerConfetti();
    }
  };

  const buyLuckyTicket = (): boolean => {
    const cost = 10;
    if (!user || user.balance < cost) {
      showToast('টিকেট কেনার জন্য সর্বনিম্ন ৳১০ প্রয়োজন!', 'error');
      return false;
    }

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: Number((prev.balance - cost).toFixed(2))
      };
    });

    const tktNum = `TK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: LuckyTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: tktNum,
      purchaseDate: 'এইমাত্র',
      drawDate: 'আজ, রাত ০৯:০০ PM',
      price: cost,
      status: 'waiting'
    };

    setLuckyTickets(prev => [newTicket, ...prev]);
    showToast(`টিকেট #${tktNum} কেনা সম্পন্ন হয়েছে! শুভকামনা রইল।`, 'success');
    triggerConfetti();
    return true;
  };

  const redeemPromo = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const promos: Record<string, number> = {
      TAKA100: 100,
      BONUS50: 50,
      WELCOME20: 20,
      VIP2026: 75,
      TAKAWALA: 30
    };

    if (promos[normalized]) {
      const reward = promos[normalized];
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          balance: Number((prev.balance + reward).toFixed(2)),
          totalEarned: Number((prev.totalEarned + reward).toFixed(2))
        };
      });

      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        type: 'bonus',
        amount: reward,
        method: 'প্রোমো কোড',
        trxId: `PRM_${normalized}`,
        status: 'success',
        timestamp: 'এইমাত্র',
        note: `প্রোমো কোড ${normalized} রিডিম রিওয়ার্ড`
      };
      setTransactions(prev => [newTx, ...prev]);
      triggerConfetti();
      return { success: true, message: `অভিনন্দন! ৳${reward} ক্যাশ বোনাস পেয়েছেন!`, amount: reward };
    }

    return { success: false, message: 'ভুল বা মেয়াদোত্তীর্ণ প্রোমো কোড!' };
  };

  const upgradeVip = (pkg: VipPackage): boolean => {
    if (!user) return false;
    const finalPrice = pkg.discountPrice || pkg.price;

    if (user.depositBalance < finalPrice && user.balance < finalPrice) {
      showToast(`ভিআইপি প্যাকেজের জন্য ৳${finalPrice} ব্যালেন্স প্রয়োজন!`, 'error');
      return false;
    }

    setUser(prev => {
      if (!prev) return null;
      let dep = prev.depositBalance;
      let inc = prev.balance;

      if (dep >= finalPrice) {
        dep = Number((dep - finalPrice).toFixed(2));
      } else {
        const diff = finalPrice - dep;
        dep = 0;
        inc = Number((inc - diff).toFixed(2));
      }

      return {
        ...prev,
        plan: pkg.id as 'silver' | 'gold' | 'platinum',
        depositBalance: dep,
        balance: inc
      };
    });

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'bonus',
      amount: finalPrice,
      method: 'VIP আপগ্রেড',
      trxId: `VIP_${pkg.id.toUpperCase()}_${Date.now().toString().slice(-4)}`,
      status: 'success',
      timestamp: 'এইমাত্র',
      note: `${pkg.nameBn} মেম্বারশিপ অ্যাক্টিভ হয়েছে`
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();
    showToast(`অভিনন্দন! আপনি এখন ${pkg.nameBn} সদস্য!`, 'success');
    return true;
  };

  const activateAccount = () => {
    if (!user) return;
    setUser(prev => (prev ? { ...prev, isActivated: true } : null));
    triggerConfetti();
    showToast('আপনার একাউন্ট সফলভাবে প্রিমিয়াম অ্যাক্টিভেট করা হয়েছে!', 'success');
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        currency,
        toggleCurrency,
        currentScreen,
        setCurrentScreen,
        tasks,
        transactions,
        notifications,
        unreadNotifs,
        luckyTickets,
        config,
        toastState,
        showToast,
        receiptData,
        setReceiptData,
        isTwaiOpen,
        setIsTwaiOpen,
        loginUser,
        logoutUser,
        updateUser,
        completeTask,
        depositFunds,
        withdrawFunds,
        rechargeMobile,
        transferFunds,
        spinWin,
        buyLuckyTicket,
        redeemPromo,
        upgradeVip,
        activateAccount,
        triggerConfetti,
        markNotificationsAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number; // Income balance
  depositBalance: number;
  rechargeBalance: number;
  plan: 'free' | 'silver' | 'gold' | 'platinum';
  isActivated: boolean;
  referralCode: string;
  referredBy?: string;
  totalEarned: number;
  totalWithdrawn: number;
  avatar: string;
  pin?: string;
  createdAt: string;
  todayTasksDone: number;
  dailySpinCount: number;
  lastSpinDate: string;
  dailyVideoCount: number;
}

export type ScreenType =
  | 'home'
  | 'wallet'
  | 'tasks'
  | 'history'
  | 'profile'
  | 'deposit'
  | 'withdraw'
  | 'recharge'
  | 'transfer'
  | 'vip'
  | 'spin'
  | 'luckyDraw'
  | 'quiz'
  | 'watchEarn'
  | 'gmailTask'
  | 'jobPost'
  | 'promoClaim'
  | 'leaderboard'
  | 'referral'
  | 'support'
  | 'settings';

export interface Task {
  id: string;
  title: string;
  type: 'free' | 'vip';
  reward: number;
  timeInSec: number;
  category: string;
  icon: string;
  link: string;
  instructions: string;
  proofType: 'text' | 'screenshot' | 'both';
  completed?: boolean;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'recharge' | 'transfer' | 'task' | 'spin' | 'quiz' | 'bonus' | 'referral';
  amount: number;
  method: string;
  accountNo?: string;
  trxId: string;
  status: 'success' | 'pending' | 'rejected';
  timestamp: string;
  fee?: number;
  note?: string;
}

export interface VipPackage {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  discountPrice?: number;
  days: number;
  dailyAds: number;
  multiplier: number;
  badgeColor: string;
  description: string;
  benefits: string[];
}

export interface QuizQuestion {
  id: string;
  category: 'general' | 'math' | 'science' | 'islamic';
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LuckyTicket {
  id: string;
  ticketNumber: string;
  purchaseDate: string;
  drawDate: string;
  price: number;
  status: 'waiting' | 'won' | 'lost';
  prizeAmount?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'success' | 'warning' | 'info';
}

export interface SystemConfig {
  referralBonus: number;
  minimumWithdraw: number;
  withdrawalVatPercent: number;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  binanceUsdtAddress: string;
  supportTelegram: string;
  adminEmail: string;
  announcementNotice: string;
  happyHourActive: boolean;
}

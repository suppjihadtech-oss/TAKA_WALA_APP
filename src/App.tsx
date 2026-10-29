import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { SmartToast } from './components/common/SmartToast';
import { ReceiptModal } from './components/common/ReceiptModal';
import { FloatingWidgets } from './components/common/FloatingWidgets';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { TaskScreen } from './components/screens/TaskScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { DepositScreen } from './components/screens/DepositScreen';
import { WithdrawScreen } from './components/screens/WithdrawScreen';
import { RechargeScreen } from './components/screens/RechargeScreen';
import { TransferScreen } from './components/screens/TransferScreen';
import { SpinScreen } from './components/screens/SpinScreen';
import { LuckyDrawScreen } from './components/screens/LuckyDrawScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { WatchEarnScreen } from './components/screens/WatchEarnScreen';
import { GmailTaskScreen } from './components/screens/GmailTaskScreen';
import { JobPostScreen } from './components/screens/JobPostScreen';
import { PromoClaimScreen } from './components/screens/PromoClaimScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { ReferralScreen } from './components/screens/ReferralScreen';
import { VipScreen } from './components/screens/VipScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AuthScreen } from './components/screens/AuthScreen';

// Modals
import { TwaiChatbotModal } from './components/modals/TwaiChatbotModal';
import { InboxModal } from './components/modals/InboxModal';
import { AvatarModal } from './components/modals/AvatarModal';
import { LoginNoticeModal } from './components/modals/LoginNoticeModal';

export const MainLayout: React.FC = () => {
  const { user, currentScreen } = useApp();
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isWelcomeNoticeOpen, setIsWelcomeNoticeOpen] = useState(false);

  useEffect(() => {
    // Show welcome notice once on fresh load if user exists
    const hasSeen = sessionStorage.getItem('takawala_welcome_seen');
    if (!hasSeen && user) {
      setIsWelcomeNoticeOpen(true);
      sessionStorage.setItem('takawala_welcome_seen', 'true');
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <AuthScreen />
        <SmartToast />
      </>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'wallet':
        return <WalletScreen />;
      case 'tasks':
        return <TaskScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'profile':
        return <ProfileScreen onOpenAvatar={() => setIsAvatarOpen(true)} />;
      case 'deposit':
        return <DepositScreen />;
      case 'withdraw':
        return <WithdrawScreen />;
      case 'recharge':
        return <RechargeScreen />;
      case 'transfer':
        return <TransferScreen />;
      case 'spin':
        return <SpinScreen />;
      case 'luckyDraw':
        return <LuckyDrawScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'watchEarn':
        return <WatchEarnScreen />;
      case 'gmailTask':
        return <GmailTaskScreen />;
      case 'jobPost':
        return <JobPostScreen />;
      case 'promoClaim':
        return <PromoClaimScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'referral':
        return <ReferralScreen />;
      case 'vip':
        return <VipScreen />;
      case 'support':
        return <SupportScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 relative selection:bg-emerald-500 selection:text-white pb-6">
      {/* Background glow effects */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Top Header */}
      <Header
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenAvatar={() => setIsAvatarOpen(true)}
      />

      {/* Screen View */}
      <main className="w-full">{renderScreen()}</main>

      {/* Floating 3D widgets (Happy Hour, Mystery Gift, TWAI, Support) */}
      <FloatingWidgets />

      {/* iOS Dock Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Toast */}
      <SmartToast />
      <ReceiptModal />
      <TwaiChatbotModal />
      <InboxModal isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
      <AvatarModal isOpen={isAvatarOpen} onClose={() => setIsAvatarOpen(false)} />
      <LoginNoticeModal
        isOpen={isWelcomeNoticeOpen}
        onClose={() => setIsWelcomeNoticeOpen(false)}
      />
    </div>
  );
};

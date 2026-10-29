import { SystemConfig, VipPackage, Task, QuizQuestion } from '../types';

export const initialConfig: SystemConfig = {
  referralBonus: 5,
  minimumWithdraw: 50,
  withdrawalVatPercent: 10,
  bkashNumber: "01789456123",
  nagadNumber: "01987654321",
  rocketNumber: "018765432104",
  binanceUsdtAddress: "TFb5XmQh6pE2tWJ718hKqLm45vN9aBCxyz",
  supportTelegram: "https://t.me/takawala_official",
  adminEmail: "support@takawala.com",
  announcementNotice: "🔥 সুখবর! টাকা ওয়ালা অ্যাপে এখন উইথড্র দিলে মাত্র ১০ মিনিটে বিকাশ ও নগদে পেমেন্ট পেয়ে যাচ্ছেন। বেশি রেফার করুন আর জিতে নিন মেগা প্রাইজ!",
  happyHourActive: true,
};

export const vipPackages: VipPackage[] = [
  {
    id: "silver",
    name: "Silver VIP",
    nameBn: "সিলভার ভিআইপি",
    price: 150,
    discountPrice: 135,
    days: 30,
    dailyAds: 30,
    multiplier: 1.5,
    badgeColor: "from-slate-400 to-slate-600",
    description: "নতুনদের জন্য সাশ্রয়ী ও আকর্ষণীয় প্যাকেজ",
    benefits: [
      "দৈনিক ৩০টি প্রিমিয়াম টাস্ক",
      "১.৫ গুণ বেশি আর্নিং রেট",
      "উইথড্র প্রসেসিং অগ্রাধিকার",
      "স্পিন লিমিট ৩০ বার",
      "মেয়াদ ৩০ দিন"
    ]
  },
  {
    id: "gold",
    name: "Gold VIP",
    nameBn: "গোল্ড ভিআইপি",
    price: 350,
    discountPrice: 320,
    days: 30,
    dailyAds: 40,
    multiplier: 2.2,
    badgeColor: "from-amber-400 to-amber-600",
    description: "জনপ্রিয় ও সর্বোচ্চ আয়ের সেরা পছন্দ",
    benefits: [
      "দৈনিক ৪০টি এক্সক্লুসিভ টাস্ক",
      "২.২ গুণ বোনাস ইনকাম",
      "ইনস্ট্যান্ট ৫ মিনিটে উইথড্র",
      "স্পিন লিমিট ৪০ বার",
      "২৪/৭ স্পেশাল সাপোর্ট"
    ]
  },
  {
    id: "platinum",
    name: "Platinum VIP",
    nameBn: "প্লাটিনাম ভিআইপি",
    price: 750,
    discountPrice: 699,
    days: 60,
    dailyAds: 50,
    multiplier: 3.5,
    badgeColor: "from-cyan-400 to-blue-600",
    description: "সবচেয়ে বেশি মেয়াদ ও বিশাল আয়ের মেগা প্যাক",
    benefits: [
      "দৈনিক ৫০টি হাই-পেইড টাস্ক",
      "৩.৫ গুণ আল্ট্রা ইনকাম",
      "জিরো উইথড্র চার্জ সুবিধা",
      "লাকি ড্র ফ্রি ৩টি টিকেট",
      "মেয়াদ ৬০ দিন"
    ]
  }
];

export const starterTasks: Task[] = [
  {
    id: "task-1",
    title: "অফিসিয়াল টেলিগ্রাম চ্যানেলে জয়েন করুন",
    type: "free",
    reward: 2.5,
    timeInSec: 15,
    category: "Telegram",
    icon: "ri-telegram-fill text-blue-500",
    link: "https://t.me/takawala_official",
    instructions: "টেলিগ্রাম চ্যানেলে জয়েন হয়ে স্ক্রিনশট অথবা আপনার ইউজারনেম সাবমিট করুন।",
    proofType: "both"
  },
  {
    id: "task-2",
    title: "ইউটিউব ভিডিও লাইক ও সাবস্ক্রাইব",
    type: "free",
    reward: 3.0,
    timeInSec: 30,
    category: "YouTube",
    icon: "ri-youtube-fill text-red-500",
    link: "https://youtube.com",
    instructions: "ভিডিওটি ৩০ সেকেন্ড দেখুন, লাইক দিন এবং সাবস্ক্রাইব করে স্ক্রিনশট দিন।",
    proofType: "screenshot"
  },
  {
    id: "task-3",
    title: "ফেসবুক পেজে লাইক ও ফলো করুন",
    type: "free",
    reward: 2.0,
    timeInSec: 15,
    category: "Facebook",
    icon: "ri-facebook-circle-fill text-blue-600",
    link: "https://facebook.com",
    instructions: "পেজ ফলো দিয়ে আপনার ফেসবুক প্রোফাইলের নাম লিখুন।",
    proofType: "text"
  },
  {
    id: "task-4",
    title: "গুগল সার্চ ও ওয়েবসাইট ভিজিট",
    type: "free",
    reward: 3.5,
    timeInSec: 25,
    category: "Web",
    icon: "ri-global-line text-emerald-500",
    link: "https://google.com",
    instructions: "ওয়েবসাইটে ভিজিট করে ২৫ সেকেন্ড অবস্থান করুন এবং লাস্ট পেজের লিংক দিন।",
    proofType: "text"
  },
  {
    id: "task-vip-1",
    title: "VIP স্পেশাল: অ্যাপ রিভিউ ও ফাইভ স্টার রেটিং",
    type: "vip",
    reward: 12.0,
    timeInSec: 45,
    category: "PlayStore",
    icon: "ri-google-play-fill text-green-500",
    link: "https://play.google.com",
    instructions: "প্লে স্টোরে পজিটিভ ৫ স্টার রিভিউ দিন এবং স্ক্রিনশট আপলোড করুন।",
    proofType: "screenshot"
  },
  {
    id: "task-vip-2",
    title: "VIP মেগা স্পন্সর সার্ভে সম্পন্ন করুন",
    type: "vip",
    reward: 18.0,
    timeInSec: 60,
    category: "Survey",
    icon: "ri-survey-fill text-purple-500",
    link: "https://survey.example.com",
    instructions: "পুরো সার্ভে প্রশ্নের উত্তর দিয়ে কনফার্মেশন কোডটি এখানে পেস্ট করুন।",
    proofType: "text"
  }
];

export const quizQuestions: QuizQuestion[] = [
  // সাধারণ জ্ঞান
  {
    id: "q-1",
    category: "general",
    question: "বাংলাদেশের জাতীয় কবির নাম কী?",
    options: ["রবীন্দ্রনাথ ঠাকুর", "কাজী নজরুল ইসলাম", "জসীমউদ্দীন", "জীবনানন্দ দাশ"],
    correctIndex: 1
  },
  {
    id: "q-2",
    category: "general",
    question: "পদ্মা সেতুর মোট দৈর্ঘ্য কত কিলোমিটার?",
    options: ["৫.১৫ কিমি", "৬.১৫ কিমি", "৭.২৫ কিমি", "৪.৮০ কিমি"],
    correctIndex: 1
  },
  {
    id: "q-3",
    category: "general",
    question: "বাংলাদেশের সংবিধান কত সালে রচিত হয়?",
    options: ["১৯৭১", "১৯৭২", "১৯৭৩", "১৯৭৪"],
    correctIndex: 1
  },
  // গণিত
  {
    id: "q-4",
    category: "math",
    question: "২৫ এর বর্গমূল কত?",
    options: ["৩", "৪", "৫", "৬"],
    correctIndex: 2
  },
  {
    id: "q-5",
    category: "math",
    question: "১২ × ৮ এর মান কত?",
    options: ["৮৪", "৯৬", "১০৪", "১১২"],
    correctIndex: 1
  },
  // বিজ্ঞান
  {
    id: "q-6",
    category: "science",
    question: "পানির রাসায়নিক সংকেত কোনটি?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctIndex: 1
  },
  {
    id: "q-7",
    category: "science",
    question: "সূর্য থেকে পৃথিবীতে আলো আসতে কত সময় লাগে?",
    options: ["৮ মিনিট ২০ সেকেন্ড", "৫ মিনিট", "১০ মিনিট", "১২ মিনিট"],
    correctIndex: 0
  },
  // ইসলামিক
  {
    id: "q-8",
    category: "islamic",
    question: "পবিত্র কুরআনে মোট কতটি সূরা আছে?",
    options: ["১১০", "১১২", "১১৪", "১১৬"],
    correctIndex: 2
  },
  {
    id: "q-9",
    category: "islamic",
    question: "ইসলামের প্রথম খলিফা কে ছিলেন?",
    options: ["হযরত উমর (রা.)", "হযরত আবু বকর (রা.)", "হযরত উসমান (রা.)", "হযরত আলী (রা.)"],
    correctIndex: 1
  }
];

export const twaiResponses: Record<string, string> = {
  'কিভাবে কাজ করব?': 'টাস্ক অপশনে গিয়ে ফ্রি/ভিআইপি টাস্ক সিলেক্ট করুন। টাস্কে ক্লিক করলে নির্দেশাবলী দেখাবে, নির্দেশ অনুযায়ী কাজ করে প্রুফ সাবমিট করলেই ব্যালেন্সে টাকা জমা হয়ে যাবে।',
  'টাকা তুলব কিভাবে?': 'ওয়ালেট > উত্তোলনে যান। মিনিমাম ৫০ টাকা হলে বিকাশ/নগদ/রকেট সিলেক্ট করে নাম্বার ও ট্রানজেকশন পিন দিয়ে সাবমিট করুন।',
  'রেফার বোনাস কত?': 'প্রতি সফল রেফারে আপনি পাবেন ৳৫ ইনস্ট্যান্ট বোনাস। আপনার রেফার করা বন্ধু যখন প্রথম কাজ করবে তখন আরো বোনাস যোগ হবে।',
  'পেমেন্ট পেতে কতক্ষণ লাগে?': 'সাধারণত ৫-৩০ মিনিটের মধ্যে পেমেন্ট পৌঁছে যায়। তবে সার্ভার জ্যাম থাকলে সর্বোচ্চ ২৪ ঘণ্টা লাগতে পারে।',
  'পাসওয়ার্ড ভুলে গেছি?': 'লগইন পেজে "পাসওয়ার্ড ভুলে গেছেন?" অপশনে ক্লিক করে ইমেইল দিন অথবা সাপোর্টে যোগাযোগ করুন।',
  'একাউন্ট ব্যান কেন হয়?': 'ফেইক কাজ, ভিপিএন ব্যবহার, বা একাধিক একাউন্ট খুললে একাউন্ট পার্মানেন্টলি ব্যান করা হয়।',
  'মিনিমাম উইথড্র কত?': 'বিকাশ, নগদ এবং রকেটে সর্বনিম্ন উইথড্র মাত্র ৫০ টাকা।',
  'ভ্যাট বা চার্জ কত?': 'উত্তোলনে সরকারি ও প্রসেসিং ভ্যাট বাবদ ১০% কাটা হয়। ১০০ টাকা তুললে ৯০ টাকা পাবেন।',
  'এক ফোনে কয়টি একাউন্ট?': 'এক ডিভাইসে মাত্র ১টি একাউন্ট করা যাবে। একাধিক একাউন্ট খুললে সিস্টেম অটো ব্লক করে দেবে।',
  'কুইজ খেলার নিয়ম?': 'কুইজ অপশনে যান > ক্যাটাগরি সিলেক্ট করুন > ৬০ সেকেন্ডে সঠিক উত্তর দিয়ে ব্যালেন্সে টাকা ও পয়েন্ট জিতুন।',
  'ভিপিএন ব্যবহার করব?': 'না! কোনো অবস্থাতেই ভিপিএন ব্যবহার করবেন না। ভিপিএন অন থাকলে পেমেন্ট প্রসেসিং আটকে যাবে।',
  'টাস্ক কখন আপডেট হয়?': 'প্রতিদিন সকাল ৮টা, দুপুর ২টা এবং রাত ৮টায় ফ্রেশ নতুন টাস্ক যোগ হয়।',
  'ডিপোজিট এড হচ্ছে না?': 'ডিপোজিটের পর ৫-১০ মিনিট অপেক্ষা করুন। সাধারণত অটো অ্যাড হয়। সমস্যা হলে ট্রানজেকশন আইডি সহ মেসেজ দিন।',
  'ভুল নাম্বারে টাকা পাঠালে?': 'ভুল নাম্বারে টাকা পাঠালে অ্যাডমিন দায়ী নয়। ডিপোজিট বা উইথড্রর আগে নাম্বার ২-৩ বার যাচাই করুন।',
  'অ্যাপটি কি রিয়েল?': 'জি, ১০০% রিয়েল এবং বিশ্বস্ত। আমরা দীর্ঘ সময় ধরে সততার সাথে হাজার হাজার ব্যবহারকারীকে নিয়মিত পেমেন্ট দিচ্ছি।',
  'পয়েন্ট ও টাকার হিসাব?': '১০০০ পয়েন্ট = ১ টাকা। আর টাস্ক, স্পিন ও লাকি ড্রতে সরাসরি নগদ টাকা ব্যালেন্সে যোগ হয়।',
  'সাপোর্টে কথা বলব কিভাবে?': 'হোম পেজের নিচে টেলিগ্রাম সাপোর্ট বাটন রয়েছে অথবা প্রোফাইল থেকে ২৪/৭ লাইভ সাপোর্টে যোগাযোগ করতে পারেন।',
  'বিকাশ লিমিট কত?': 'বিকাশে সর্বনিম্ন ৫০ টাকা এবং সর্বোচ্চ ৫,০০০ টাকা পর্যন্ত একবারেই উত্তোলন করা যায়।',
  'নগদ লিমিট কত?': 'নগদে সর্বনিম্ন ৫০ টাকা থেকে ৫,০০০ টাকা পর্যন্ত উত্তোলন করা যায়।',
  'এডমিন কখন লাইনে থাকে?': 'সকাল ১০টা থেকে রাত ১০টা পর্যন্ত আমাদের অফিসিয়াল সাপোর্ট টিম সার্বক্ষণিক একটিভ থাকে।',
  'ডেইলি বোনাস কিভাবে নিব?': 'হোম পেজে "ডেইলি বোনাস" বা "মিস্ট্রি গিফট" এ ক্লিক করলেই প্রতিদিন ফ্রি ক্যাশ বোনাস পাবেন।',
  'স্টার কিনলে কি লাভ?': 'ভিআইপি স্ট্যাটাস পেলে আপনি লিডারবোর্ডে এগিয়ে থাকবেন এবং ২x থেকে ৩.৫x বেশি আয়ের সুযোগ পাবেন।',
  'লগআউট হয়ে যায় কেন?': 'অ্যাকাউন্টের সর্বোচ্চ নিরাপত্তার স্বার্থে ব্রাউজার ক্যাশ ক্লিয়ার হলে রি-লগইন করতে হয়।',
  'রেফার লিংক কোথায়?': 'প্রোফাইল > "রেফার করুন" অপশনে আপনার নিজস্ব ইউনিক লিংক ও আকর্ষণীয় ভিআইপি কার্ড পাবেন।',
  'বিদেশে কাজ করা যাবে?': 'হ্যাঁ, বিশ্বের যেকোনো প্রান্ত থেকে কাজ করতে পারবেন, তবে পেমেন্ট বিকাশ/নগদ/রকেট অথবা USDT ক্রিপ্টোতে নিতে হবে।',
  'স্পিন করে ইনকাম?': 'স্পিন হুইল ঘুরিয়ে প্রতিদিন নিশ্চিত নগদ টাকা, ফ্রি কয়েন অথবা মেগা রিওয়ার্ড জিততে পারবেন।',
  'লাকি ড্র কি?': 'মাত্র ১০ টাকা দিয়ে লাকি ড্র টিকেট কিনলে প্রতিদিনের মেগা ড্রতে বড় অঙ্কের জ্যাকপট ক্যাশ প্রাইজ জেতার সুযোগ থাকে।',
  'আমার হিস্ট্রি দেখব কিভাবে?': 'নিচের মেনুবার থেকে "হিস্ট্রি" ট্যাবে ক্লিক করলে আপনার সব ডিপোজিট, উইথড্র ও টাস্কের ডিজিটাল রশিদ দেখতে পাবেন।',
  'পিন সেট করব কিভাবে?': 'প্রোফাইল > সিকিউরিটি সেটিংসে গিয়ে যেকোনো ৪ সংখ্যার ট্রানজেকশন পিন সেট করে নিন।',
  'default': 'আপনার প্রশ্নের জন্য ধন্যবাদ। টাকা ওয়ালা টিমের প্রতিনিধি খুব শীঘ্রই আপনার সহায়তায় উত্তর দেবে। আরও জানতে আমাদের অফিসিয়াল টেলিগ্রাম গ্রুপে যোগ দিন।'
};

export const starterLeaderboard = [
  { rank: 1, name: "মো: তানভীর হাসান", earned: 8450, referrals: 142, avatar: "https://img.icons8.com/fluency/96/user-male-circle.png", badge: "🥇 চ্যাম্পিয়ন" },
  { rank: 2, name: "সাদিয়া আক্তার", earned: 7120, referrals: 98, avatar: "https://img.icons8.com/fluency/96/user-female-circle.png", badge: "🥈 ২য় স্থান" },
  { rank: 3, name: "রাকিবুল ইসলাম", earned: 6350, referrals: 84, avatar: "https://img.icons8.com/fluency/96/user-male-circle.png", badge: "🥉 ৩য় স্থান" },
  { rank: 4, name: "ফারহানা রহমান", earned: 5200, referrals: 65, avatar: "https://img.icons8.com/fluency/96/user-female-circle.png", badge: "টপ আর্নার" },
  { rank: 5, name: "আরিফ চৌধুরী", earned: 4890, referrals: 52, avatar: "https://img.icons8.com/fluency/96/user-male-circle.png", badge: "টপ আর্নার" },
  { rank: 6, name: "মেহেদী হাসান", earned: 4100, referrals: 40, avatar: "https://img.icons8.com/fluency/96/user-male-circle.png", badge: "অ্যাক্টিভ মেম্বার" },
  { rank: 7, name: "নুসরাত জাহান", earned: 3750, referrals: 38, avatar: "https://img.icons8.com/fluency/96/user-female-circle.png", badge: "অ্যাক্টিভ মেম্বার" }
];

export const avatarList = [
  "https://img.icons8.com/fluency/96/user-male-circle.png",
  "https://img.icons8.com/fluency/96/user-female-circle.png",
  "https://img.icons8.com/fluency/96/administrator-male.png",
  "https://img.icons8.com/fluency/96/guest-male.png",
  "https://img.icons8.com/fluency/96/businessman.png",
  "https://img.icons8.com/fluency/96/businesswoman.png"
];

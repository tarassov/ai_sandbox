export type AppScreen = 'feed' | 'rewards' | 'leaderboard' | 'wallet';

export type CoreValue =
  | 'Teamwork'
  | 'Innovation'
  | 'Customer Hero'
  | 'Ownership'
  | 'Mentorship';

export type Department =
  | 'Product & Design'
  | 'Engineering'
  | 'Customer Success'
  | 'Operations';

export interface PeerUser {
  id: string;
  name: string;
  role: string;
  department: Department;
  avatarUrl?: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  bonutsReceivedWeek: number;
  bonutsReceivedMonth: number;
  bonutsReceivedQuarter: number;
  bonutsGivenMonth: number;
  topValue: CoreValue;
}

export interface ReactionItem {
  emoji: string;
  label: string;
  count: number;
  reactedByMe: boolean;
}

export interface RecognitionComment {
  id: string;
  authorId: string;
  text: string;
  createdAtLabel: string;
}

export interface RecognitionPost {
  id: string;
  senderId: string;
  recipientIds: string[];
  message: string;
  bonutsPerRecipient: number;
  coreValue: CoreValue;
  createdAtLabel: string;
  createdAtMs: number;
  isMilestone?: boolean;
  milestoneLabel?: string;
  reactions: ReactionItem[];
  comments: RecognitionComment[];
}

export type RewardCategory =
  | 'Coffee & Treats'
  | 'Gear & Desk'
  | 'Experiences'
  | 'Charity & Impact';

export interface RewardItem {
  id: string;
  title: string;
  partner: string;
  description: string;
  costCoins: number;
  category: RewardCategory;
  imageUrl?: string;
  illustrationType?: 'bakery' | 'recharge';
  fulfillmentNote: string;
}

export interface MilestoneItem {
  id: string;
  userId: string;
  title: string;
  dateLabel: string;
  suggestedBonuts: number;
  celebrated: boolean;
}

export type TransactionType = 'earned' | 'given' | 'redeemed';

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  dateLabel: string;
  voucherCode?: string;
}

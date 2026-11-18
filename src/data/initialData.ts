import {
  CoreValue,
  MilestoneItem,
  PeerUser,
  RecognitionPost,
  RewardItem,
  WalletTransaction,
} from '../types/recognition';

export const CORE_VALUES: {
  value: CoreValue;
  bg: string;
  text: string;
  border: string;
  description: string;
}[] = [
  {
    value: 'Teamwork',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200/70',
    description: 'Lifting peers up and collaborating across boundaries',
  },
  {
    value: 'Innovation',
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border-orange-200/70',
    description: 'Simplifying hard problems with creative craft',
  },
  {
    value: 'Customer Hero',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200/70',
    description: 'Going the extra mile for people who rely on us',
  },
  {
    value: 'Ownership',
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200/70',
    description: 'Stepping up decisively and seeing details through',
  },
  {
    value: 'Mentorship',
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200/70',
    description: 'Sharing knowledge generously so others grow',
  },
];

export const CURRENT_USER_ID = 'user-maya';

export const INITIAL_PEERS: PeerUser[] = [
  {
    id: 'user-maya',
    name: 'Maya Chen',
    role: 'Staff Product Designer',
    department: 'Product & Design',
    avatarUrl: '/src/assets/images/avatar_maya_chen_1794999268354.jpg',
    initials: 'MC',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-800',
    bonutsReceivedWeek: 85,
    bonutsReceivedMonth: 245,
    bonutsReceivedQuarter: 610,
    bonutsGivenMonth: 155,
    topValue: 'Innovation',
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    role: 'Principal Platform Engineer',
    department: 'Engineering',
    avatarUrl: '/src/assets/images/avatar_marcus_vance_1794999269051.jpg',
    initials: 'MV',
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-800',
    bonutsReceivedWeek: 120,
    bonutsReceivedMonth: 340,
    bonutsReceivedQuarter: 840,
    bonutsGivenMonth: 170,
    topValue: 'Ownership',
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    role: 'Head of Customer Success',
    department: 'Customer Success',
    avatarUrl: '/src/assets/images/avatar_elena_rostova_1794999268578.jpg',
    initials: 'ER',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-800',
    bonutsReceivedWeek: 105,
    bonutsReceivedMonth: 295,
    bonutsReceivedQuarter: 730,
    bonutsGivenMonth: 190,
    topValue: 'Customer Hero',
  },
  {
    id: 'user-liam',
    name: 'Liam Patel',
    role: 'Workplace Operations Lead',
    department: 'Operations',
    avatarUrl: '/src/assets/images/avatar_liam_patel_1794999269160.jpg',
    initials: 'LP',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-800',
    bonutsReceivedWeek: 75,
    bonutsReceivedMonth: 215,
    bonutsReceivedQuarter: 520,
    bonutsGivenMonth: 140,
    topValue: 'Teamwork',
  },
  {
    id: 'user-clara',
    name: 'Clara Jensen',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    initials: 'CJ',
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-800',
    bonutsReceivedWeek: 95,
    bonutsReceivedMonth: 260,
    bonutsReceivedQuarter: 675,
    bonutsGivenMonth: 165,
    topValue: 'Mentorship',
  },
  {
    id: 'user-noah',
    name: 'Noah Brooks',
    role: 'Solutions Architect',
    department: 'Customer Success',
    initials: 'NB',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-900',
    bonutsReceivedWeek: 60,
    bonutsReceivedMonth: 185,
    bonutsReceivedQuarter: 480,
    bonutsGivenMonth: 120,
    topValue: 'Customer Hero',
  },
];

export const INITIAL_POSTS: RecognitionPost[] = [
  {
    id: 'post-1',
    senderId: 'user-elena',
    recipientIds: ['user-marcus'],
    message:
      'Huge gratitude to Marcus for jumping onto the enterprise SSO migration call with ten minutes notice and tracing the token clock skew in real time. The customer team actually applauded on the call.',
    bonutsPerRecipient: 50,
    coreValue: 'Customer Hero',
    createdAtLabel: '42m ago',
    createdAtMs: Date.now() - 42 * 60 * 1000,
    reactions: [
      { emoji: '👏', label: 'Applause', count: 14, reactedByMe: true },
      { emoji: '🍩', label: 'Bonuts', count: 9, reactedByMe: false },
      { emoji: '🔥', label: 'Fire', count: 6, reactedByMe: false },
    ],
    comments: [
      {
        id: 'c-1',
        authorId: 'user-liam',
        text: 'Classic Marcus — calmest debugging under pressure in the building.',
        createdAtLabel: '25m ago',
      },
      {
        id: 'c-2',
        authorId: 'user-marcus',
        text: 'Thank you Elena! Having your prep notes ready beforehand made finding it twice as fast.',
        createdAtLabel: '14m ago',
      },
    ],
  },
  {
    id: 'post-2',
    senderId: 'user-marcus',
    recipientIds: ['user-maya', 'user-clara'],
    message:
      'The new invoice reconciliation drawer feels effortless. Maya and Clara turned a 14-field legacy form into a single calm flow that passed usability testing with zero friction.',
    bonutsPerRecipient: 25,
    coreValue: 'Innovation',
    createdAtLabel: '3h ago',
    createdAtMs: Date.now() - 3 * 60 * 60 * 1000,
    reactions: [
      { emoji: '🎉', label: 'Celebrate', count: 18, reactedByMe: false },
      { emoji: '🍩', label: 'Bonuts', count: 11, reactedByMe: true },
      { emoji: '👏', label: 'Applause', count: 8, reactedByMe: false },
    ],
    comments: [
      {
        id: 'c-3',
        authorId: 'user-maya',
        text: 'Best pairing sprint we have had all quarter! Shoutout to Clara for the keyboard nav polish.',
        createdAtLabel: '2h ago',
      },
    ],
  },
  {
    id: 'post-3',
    senderId: 'user-liam',
    recipientIds: ['user-elena'],
    message:
      'Happy 3-Year Work Anniversary, Elena! Three years of shaping how we care for customers and mentoring every new CSM through their first quarter.',
    bonutsPerRecipient: 50,
    coreValue: 'Mentorship',
    createdAtLabel: 'Yesterday',
    createdAtMs: Date.now() - 22 * 60 * 60 * 1000,
    isMilestone: true,
    milestoneLabel: '3-Year Work Anniversary',
    reactions: [
      { emoji: '🎉', label: 'Celebrate', count: 27, reactedByMe: true },
      { emoji: '🍩', label: 'Bonuts', count: 15, reactedByMe: false },
      { emoji: '❤️', label: 'Warmth', count: 12, reactedByMe: false },
    ],
    comments: [],
  },
  {
    id: 'post-4',
    senderId: 'user-maya',
    recipientIds: ['user-liam'],
    message:
      'Thank you Liam for organizing the cross-office autumn offsite logistics down to the dietary cards and quiet transit options. Everyone felt genuinely looked after.',
    bonutsPerRecipient: 25,
    coreValue: 'Teamwork',
    createdAtLabel: '2d ago',
    createdAtMs: Date.now() - 48 * 60 * 60 * 1000,
    reactions: [
      { emoji: '👏', label: 'Applause', count: 19, reactedByMe: false },
      { emoji: '🍩', label: 'Bonuts', count: 7, reactedByMe: false },
    ],
    comments: [
      {
        id: 'c-4',
        authorId: 'user-noah',
        text: 'Those sourdough pastry boxes at the morning session were unforgettable.',
        createdAtLabel: '1d ago',
      },
    ],
  },
  {
    id: 'post-5',
    senderId: 'user-noah',
    recipientIds: ['user-clara'],
    message:
      'Appreciate Clara staying late on Thursday to review my accessibility PR and walking through every ARIA announcement together instead of just leaving review comments.',
    bonutsPerRecipient: 15,
    coreValue: 'Ownership',
    createdAtLabel: '3d ago',
    createdAtMs: Date.now() - 72 * 60 * 60 * 1000,
    reactions: [
      { emoji: '👏', label: 'Applause', count: 10, reactedByMe: false },
      { emoji: '🔥', label: 'Fire', count: 4, reactedByMe: false },
    ],
    comments: [],
  },
];

export const INITIAL_MILESTONES: MilestoneItem[] = [
  {
    id: 'ms-1',
    userId: 'user-elena',
    title: '3-Year Work Anniversary',
    dateLabel: 'Today',
    suggestedBonuts: 25,
    celebrated: false,
  },
  {
    id: 'ms-2',
    userId: 'user-marcus',
    title: 'Birthday Celebration',
    dateLabel: 'Tomorrow',
    suggestedBonuts: 10,
    celebrated: false,
  },
  {
    id: 'ms-3',
    userId: 'user-noah',
    title: '1-Year Work Anniversary',
    dateLabel: 'Nov 22',
    suggestedBonuts: 25,
    celebrated: false,
  },
];

export const REWARDS_CATALOG: RewardItem[] = [
  {
    id: 'rew-coffee',
    title: 'Artisan Coffee & Brioche Box',
    partner: 'Hearth & Roastery',
    description:
      'Two single-origin pour-over coffees paired with warm cardamom-glazed brioche donuts delivered to your door or desk.',
    costCoins: 120,
    category: 'Coffee & Treats',
    imageUrl: '/src/assets/images/reward_coffee_treat_1794999269966.jpg',
    fulfillmentNote: 'Instant digital voucher valid at partner bakeries & delivery.',
  },
  {
    id: 'rew-lunch',
    title: 'Cafe Bistro Table Voucher ($45)',
    partner: 'Sunlit Table Collective',
    description:
      'Treat yourself or invite a colleague for sourdough tartines, seasonal plates, and craft citrus sodas at 400+ local cafes.',
    costCoins: 250,
    category: 'Experiences',
    imageUrl: '/src/assets/images/reward_cafe_lunch_1794999270563.jpg',
    fulfillmentNote: 'Digital card emailed immediately after redemption.',
  },
  {
    id: 'rew-desk',
    title: 'Studio Headphones & Brass Journal',
    partner: 'Atelier Desk Goods',
    description:
      'Acoustic noise-cancelling wireless headphones paired with a heavyweight linen grid notebook and solid brass pen.',
    costCoins: 400,
    category: 'Gear & Desk',
    imageUrl: '/src/assets/images/reward_desk_kit_1794999270159.jpg',
    fulfillmentNote: 'Ships directly within 3–5 business days.',
  },
  {
    id: 'rew-forest',
    title: 'Plant 15 Coastal Redwood Trees',
    partner: 'Evergreen Canopy Fund',
    description:
      'Fund native redwood restoration in your name with verified GPS grove coordinates and a seasonal conservation update.',
    costCoins: 150,
    category: 'Charity & Impact',
    imageUrl: '/src/assets/images/reward_forest_grove_1794999270834.jpg',
    fulfillmentNote: 'Certificate & grove coordinates issued right away.',
  },
  {
    id: 'rew-bakery',
    title: 'Friday Morning Team Dozen',
    partner: 'Golden Glaze Bakehouse',
    description:
      'Send a curated box of twelve warm craft donuts to share with your squad or enjoy with family over the weekend.',
    costCoins: 180,
    category: 'Coffee & Treats',
    illustrationType: 'bakery',
    fulfillmentNote: 'Schedule morning delivery via voucher link.',
  },
  {
    id: 'rew-recharge',
    title: 'Half-Day Friday Recharge Pass',
    partner: 'Company Wellness Perk',
    description:
      'Take an extra four hours off on any Friday afternoon with automatic calendar hold and manager notification.',
    costCoins: 350,
    category: 'Experiences',
    illustrationType: 'recharge',
    fulfillmentNote: 'Approved automatically in HR calendar.',
  },
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    type: 'earned',
    title: 'Received Bonuts from Marcus Vance',
    subtitle: 'Innovation · Invoice reconciliation drawer',
    amount: 25,
    dateLabel: 'Today, 11:20 AM',
  },
  {
    id: 'tx-2',
    type: 'given',
    title: 'Recognized Liam Patel',
    subtitle: 'Teamwork · Autumn offsite logistics',
    amount: -25,
    dateLabel: 'Nov 16, 4:05 PM',
  },
  {
    id: 'tx-3',
    type: 'earned',
    title: 'Received Bonuts from Elena Rostova',
    subtitle: 'Customer Hero · Onboarding walkthrough deck',
    amount: 50,
    dateLabel: 'Nov 13, 2:40 PM',
  },
  {
    id: 'tx-4',
    type: 'redeemed',
    title: 'Artisan Coffee & Brioche Box',
    subtitle: 'Hearth & Roastery · Voucher redeemed',
    amount: -120,
    dateLabel: 'Nov 9, 9:15 AM',
    voucherCode: 'BNT-CAFE-4829',
  },
  {
    id: 'tx-5',
    type: 'earned',
    title: 'Received Bonuts from Clara Jensen',
    subtitle: 'Mentorship · Design tokens workshop',
    amount: 35,
    dateLabel: 'Nov 4, 3:50 PM',
  },
];

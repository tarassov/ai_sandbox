import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  CURRENT_USER_ID,
  INITIAL_MILESTONES,
  INITIAL_PEERS,
  INITIAL_POSTS,
  INITIAL_TRANSACTIONS,
} from './data/initialData';
import {
  AppScreen,
  CoreValue,
  MilestoneItem,
  PeerUser,
  RecognitionPost,
  RewardItem,
  WalletTransaction,
} from './types/recognition';
import { TopNav } from './components/TopNav';
import { FeedView } from './components/FeedView';
import { RewardsView } from './components/RewardsView';
import { LeaderboardView } from './components/LeaderboardView';
import { WalletView } from './components/WalletView';
import { GiveBonutsModal } from './components/GiveBonutsModal';

const STORAGE_KEY = 'bonuts_workspace_state_v1';
const MONTHLY_ALLOWANCE_MAX = 200;

interface PersistedState {
  peers: PeerUser[];
  posts: RecognitionPost[];
  milestones: MilestoneItem[];
  transactions: WalletTransaction[];
  redeemableCoins: number;
  monthlyAllowance: number;
}

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed && Array.isArray(parsed.posts) && Array.isArray(parsed.peers)) {
        return parsed;
      }
    }
  } catch {
    // Fall back to defaults cleanly
  }
  return {
    peers: INITIAL_PEERS,
    posts: INITIAL_POSTS,
    milestones: INITIAL_MILESTONES,
    transactions: INITIAL_TRANSACTIONS,
    redeemableCoins: 420,
    monthlyAllowance: 145,
  };
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('feed');
  const [state, setState] = useState<PersistedState>(() => loadInitialState());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [giveModalOpen, setGiveModalOpen] = useState(false);
  const [modalPreset, setModalPreset] = useState<{
    peerId?: string | null;
    amount?: number;
    message?: string;
    coreValue?: CoreValue;
  }>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const peersById = useMemo(() => {
    return state.peers.reduce<Record<string, PeerUser>>((acc, peer) => {
      acc[peer.id] = peer;
      return acc;
    }, {});
  }, [state.peers]);

  const handleOpenGiveModal = () => {
    setModalPreset({});
    setGiveModalOpen(true);
  };

  const handleOpenGiveModalForPeer = (
    peerId: string,
    suggestedBonuts?: number,
    suggestedMessage?: string,
    suggestedValue?: CoreValue
  ) => {
    setModalPreset({
      peerId,
      amount: suggestedBonuts ?? 25,
      message: suggestedMessage ?? '',
      coreValue: suggestedValue ?? 'Teamwork',
    });
    setGiveModalOpen(true);
  };

  const handleSubmitRecognition = (payload: {
    recipientIds: string[];
    message: string;
    bonutsPerRecipient: number;
    coreValue: CoreValue;
  }) => {
    const totalSpent = payload.recipientIds.length * payload.bonutsPerRecipient;
    if (totalSpent > state.monthlyAllowance) return;

    const newPost: RecognitionPost = {
      id: `post-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      recipientIds: payload.recipientIds,
      message: payload.message,
      bonutsPerRecipient: payload.bonutsPerRecipient,
      coreValue: payload.coreValue,
      createdAtLabel: 'Just now',
      createdAtMs: Date.now(),
      reactions: [
        { emoji: '👏', label: 'Applause', count: 1, reactedByMe: true },
        { emoji: '🍩', label: 'Bonuts', count: 0, reactedByMe: false },
      ],
      comments: [],
    };

    const recipientNames = payload.recipientIds
      .map((id) => peersById[id]?.name ?? 'teammate')
      .join(' & ');

    const newTransaction: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'given',
      title: `Recognized ${recipientNames}`,
      subtitle: `${payload.coreValue} · ${payload.message.slice(0, 48)}${
        payload.message.length > 48 ? '...' : ''
      }`,
      amount: -totalSpent,
      dateLabel: 'Just now',
    };

    setState((prev) => ({
      ...prev,
      monthlyAllowance: prev.monthlyAllowance - totalSpent,
      posts: [newPost, ...prev.posts],
      transactions: [newTransaction, ...prev.transactions],
      peers: prev.peers.map((peer) => {
        if (peer.id === CURRENT_USER_ID) {
          return {
            ...peer,
            bonutsGivenMonth: peer.bonutsGivenMonth + totalSpent,
          };
        }
        if (payload.recipientIds.includes(peer.id)) {
          return {
            ...peer,
            bonutsReceivedWeek:
              peer.bonutsReceivedWeek + payload.bonutsPerRecipient,
            bonutsReceivedMonth:
              peer.bonutsReceivedMonth + payload.bonutsPerRecipient,
            bonutsReceivedQuarter:
              peer.bonutsReceivedQuarter + payload.bonutsPerRecipient,
          };
        }
        return peer;
      }),
    }));

    showToast(`Sent +${payload.bonutsPerRecipient} bonuts to ${recipientNames}`);
  };

  const handleToggleReaction = (postId: string, emoji: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((post) => {
        if (post.id !== postId) return post;
        const existing = post.reactions.find((r) => r.emoji === emoji);
        if (existing) {
          return {
            ...post,
            reactions: post.reactions.map((r) =>
              r.emoji === emoji
                ? {
                    ...r,
                    reactedByMe: !r.reactedByMe,
                    count: r.reactedByMe ? Math.max(0, r.count - 1) : r.count + 1,
                  }
                : r
            ),
          };
        }
        return {
          ...post,
          reactions: [
            ...post.reactions,
            { emoji, label: 'Reaction', count: 1, reactedByMe: true },
          ],
        };
      }),
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              authorId: CURRENT_USER_ID,
              text,
              createdAtLabel: 'Just now',
            },
          ],
        };
      }),
    }));
  };

  const handleEchoBonuts = (postId: string) => {
    const targetPost = state.posts.find((p) => p.id === postId);
    if (!targetPost) return;
    const cost = 5 * targetPost.recipientIds.length;
    if (state.monthlyAllowance < cost) return;

    const recipientNames = targetPost.recipientIds
      .map((id) => peersById[id]?.name ?? 'teammate')
      .join(' & ');

    const echoTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'given',
      title: `Echoed +5 bonuts for ${recipientNames}`,
      subtitle: `${targetPost.coreValue} · Boosted recognition`,
      amount: -cost,
      dateLabel: 'Just now',
    };

    setState((prev) => ({
      ...prev,
      monthlyAllowance: prev.monthlyAllowance - cost,
      transactions: [echoTx, ...prev.transactions],
      posts: prev.posts.map((post) =>
        post.id === postId
          ? { ...post, bonutsPerRecipient: post.bonutsPerRecipient + 5 }
          : post
      ),
      peers: prev.peers.map((peer) => {
        if (peer.id === CURRENT_USER_ID) {
          return { ...peer, bonutsGivenMonth: peer.bonutsGivenMonth + cost };
        }
        if (targetPost.recipientIds.includes(peer.id)) {
          return {
            ...peer,
            bonutsReceivedWeek: peer.bonutsReceivedWeek + 5,
            bonutsReceivedMonth: peer.bonutsReceivedMonth + 5,
            bonutsReceivedQuarter: peer.bonutsReceivedQuarter + 5,
          };
        }
        return peer;
      }),
    }));

    showToast(`Echoed +5 bonuts to ${recipientNames}`);
  };

  const handleRedeemReward = (reward: RewardItem): string => {
    const code = `BNT-${reward.category.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, 'X')}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const redeemTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'redeemed',
      title: reward.title,
      subtitle: `${reward.partner} · Voucher redeemed`,
      amount: -reward.costCoins,
      dateLabel: 'Just now',
      voucherCode: code,
    };

    setState((prev) => ({
      ...prev,
      redeemableCoins: Math.max(0, prev.redeemableCoins - reward.costCoins),
      transactions: [redeemTx, ...prev.transactions],
    }));

    showToast(`Claimed ${reward.title}`);
    return code;
  };

  const redeemedCount = useMemo(
    () => state.transactions.filter((tx) => tx.type === 'redeemed').length,
    [state.transactions]
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pb-20 md:pb-12">
      <TopNav
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenGiveModal={handleOpenGiveModal}
      />

      <main>
        {activeScreen === 'feed' && (
          <FeedView
            peers={state.peers}
            peersById={peersById}
            posts={state.posts}
            milestones={state.milestones}
            redeemableCoins={state.redeemableCoins}
            monthlyAllowance={state.monthlyAllowance}
            monthlyAllowanceMax={MONTHLY_ALLOWANCE_MAX}
            onNavigate={setActiveScreen}
            onSubmitRecognition={handleSubmitRecognition}
            onToggleReaction={handleToggleReaction}
            onAddComment={handleAddComment}
            onEchoBonuts={handleEchoBonuts}
            onOpenGiveModalForPeer={handleOpenGiveModalForPeer}
          />
        )}

        {activeScreen === 'rewards' && (
          <RewardsView
            redeemableCoins={state.redeemableCoins}
            redeemedCount={redeemedCount}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {activeScreen === 'leaderboard' && (
          <LeaderboardView
            peers={state.peers}
            posts={state.posts}
            onOpenGiveModalForPeer={(peerId) => handleOpenGiveModalForPeer(peerId)}
          />
        )}

        {activeScreen === 'wallet' && (
          <WalletView
            redeemableCoins={state.redeemableCoins}
            monthlyAllowance={state.monthlyAllowance}
            monthlyAllowanceMax={MONTHLY_ALLOWANCE_MAX}
            transactions={state.transactions}
            onNavigate={setActiveScreen}
            onOpenGiveModal={handleOpenGiveModal}
          />
        )}
      </main>

      <GiveBonutsModal
        isOpen={giveModalOpen}
        peers={state.peers}
        monthlyAllowance={state.monthlyAllowance}
        initialRecipientId={modalPreset.peerId}
        initialAmount={modalPreset.amount}
        initialMessage={modalPreset.message}
        initialCoreValue={modalPreset.coreValue}
        onClose={() => setGiveModalOpen(false)}
        onSubmitRecognition={handleSubmitRecognition}
      />

      {/* Celebratory Confirmation Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 surface-modal rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm font-semibold text-[#1E293B]"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F25F22] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { ArrowUpRight, CalendarHeart, Search, Trophy } from 'lucide-react';
import { CURRENT_USER_ID } from '../data/initialData';
import {
  AppScreen,
  CoreValue,
  MilestoneItem,
  PeerUser,
  RecognitionPost,
} from '../types/recognition';
import { CoinPill, DonutIcon, PeerAvatar } from './CurrencyVisuals';
import { RecognitionCard } from './RecognitionCard';
import { RecognitionComposer } from './RecognitionComposer';

interface FeedViewProps {
  peers: PeerUser[];
  peersById: Record<string, PeerUser>;
  posts: RecognitionPost[];
  milestones: MilestoneItem[];
  redeemableCoins: number;
  monthlyAllowance: number;
  monthlyAllowanceMax: number;
  onNavigate: (screen: AppScreen) => void;
  onSubmitRecognition: (payload: {
    recipientIds: string[];
    message: string;
    bonutsPerRecipient: number;
    coreValue: CoreValue;
  }) => void;
  onToggleReaction: (postId: string, emoji: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onEchoBonuts: (postId: string) => void;
  onOpenGiveModalForPeer: (
    peerId: string,
    suggestedBonuts?: number,
    suggestedMessage?: string,
    suggestedValue?: CoreValue
  ) => void;
}

type FeedFilter = 'all' | 'received' | 'sent' | 'milestones';

export const FeedView: React.FC<FeedViewProps> = ({
  peers,
  peersById,
  posts,
  milestones,
  redeemableCoins,
  monthlyAllowance,
  monthlyAllowanceMax,
  onNavigate,
  onSubmitRecognition,
  onToggleReaction,
  onAddComment,
  onEchoBonuts,
  onOpenGiveModalForPeer,
}) => {
  const [filter, setFilter] = useState<FeedFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      if (filter === 'received' && !post.recipientIds.includes(CURRENT_USER_ID)) {
        return false;
      }
      if (filter === 'sent' && post.senderId !== CURRENT_USER_ID) {
        return false;
      }
      if (filter === 'milestones' && !post.isMilestone) {
        return false;
      }
      if (!q) return true;

      const senderName = peersById[post.senderId]?.name.toLowerCase() ?? '';
      const recipientNames = post.recipientIds
        .map((id) => peersById[id]?.name.toLowerCase() ?? '')
        .join(' ');
      return (
        post.message.toLowerCase().includes(q) ||
        post.coreValue.toLowerCase().includes(q) ||
        senderName.includes(q) ||
        recipientNames.includes(q)
      );
    });
  }, [posts, filter, searchQuery, peersById]);

  const topWeeklyPeers = useMemo(() => {
    return [...peers]
      .sort((a, b) => b.bonutsReceivedWeek - a.bonutsReceivedWeek)
      .slice(0, 5);
  }, [peers]);

  const allowancePercent = Math.max(
    0,
    Math.min(100, Math.round((monthlyAllowance / monthlyAllowanceMax) * 100))
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main 8-Column Social Recognition Stream */}
        <section className="lg:col-span-8 space-y-6" aria-label="Recognition Feed">
          <RecognitionComposer
            peers={peers}
            monthlyAllowance={monthlyAllowance}
            onSubmitRecognition={onSubmitRecognition}
          />

          {/* Feed Filter & Live Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Feed filter"
              className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-xl overflow-x-auto"
            >
              {(
                [
                  { id: 'all', label: 'All Praise' },
                  { id: 'received', label: 'Sent to Me' },
                  { id: 'sent', label: 'From Me' },
                  { id: 'milestones', label: 'Milestones' },
                ] as { id: FeedFilter; label: string }[]
              ).map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#1E293B] text-white'
                        : 'text-[#64748B] hover:text-[#1E293B] hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative sm:w-64">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teammates or values..."
                aria-label="Search recognition feed"
                className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-9 pr-3 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-2 focus:outline-[#F25F22] focus:outline-offset-2 focus:border-[#F25F22]"
              />
            </div>
          </div>

          {/* Recognition Cards */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <RecognitionCard
                  key={post.id}
                  post={post}
                  peersById={peersById}
                  monthlyAllowance={monthlyAllowance}
                  onToggleReaction={onToggleReaction}
                  onAddComment={onAddComment}
                  onEchoBonuts={onEchoBonuts}
                />
              ))}
            </div>
          ) : (
            <div className="surface-card rounded-2xl p-10 text-center space-y-3">
              <p className="text-base font-bold text-[#1E293B]">
                No recognition posts match this filter
              </p>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                Try clearing your search query or switch back to All Praise to see recent team celebrations.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] cursor-pointer transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Right 4-Column Wallet, Leaderboard & Milestones Sidebar */}
        <aside className="lg:col-span-4 space-y-6" aria-label="Personal Wallet and Team Highlights">
          {/* My Donut Wallet Widget */}
          <div className="surface-card rounded-2xl p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#1E293B]">
                  Your Donut Wallet
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Earned from peer appreciation
                </p>
              </div>
              <CoinPill amount={redeemableCoins} size="md" />
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#475569]">
                  Monthly Giving Allowance
                </span>
                <span className="font-bold text-[#1E293B] tabular-nums">
                  {monthlyAllowance} / {monthlyAllowanceMax}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F25F22] rounded-full transition-all duration-300"
                  style={{ width: `${allowancePercent}%` }}
                />
              </div>
              <p className="text-[11px] text-[#64748B]">
                Give bonuts freely — allowance resets on the 1st of each month.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('rewards')}
                className="px-3 py-2.5 rounded-[10px] text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] transition-colors cursor-pointer whitespace-nowrap"
              >
                Browse Rewards
              </button>
              <button
                type="button"
                onClick={() => onNavigate('wallet')}
                className="px-3 py-2.5 rounded-[10px] text-xs font-semibold text-[#475569] hover:bg-[#F25F22]/[0.06] transition-colors cursor-pointer whitespace-nowrap"
              >
                Wallet History
              </button>
            </div>
          </div>

          {/* Weekly Top Recognized */}
          <div className="surface-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
                <h2 className="text-base font-bold text-[#1E293B]">
                  Top Recognized This Week
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('leaderboard')}
                className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#EA580C] hover:underline cursor-pointer whitespace-nowrap"
              >
                <span>View all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {topWeeklyPeers.map((peer, idx) => (
                <div
                  key={peer.id}
                  className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 text-xs font-bold text-[#94A3B8] tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <PeerAvatar peer={peer} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1E293B] truncate">
                        {peer.name}
                      </p>
                      <p className="text-xs text-[#64748B] truncate">
                        {peer.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#B45309] tabular-nums">
                      <DonutIcon className="w-3.5 h-3.5" />
                      {peer.bonutsReceivedWeek}
                    </span>
                    {peer.id !== CURRENT_USER_ID && (
                      <button
                        type="button"
                        onClick={() => onOpenGiveModalForPeer(peer.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] transition-colors cursor-pointer"
                      >
                        Praise
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="surface-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CalendarHeart className="w-4 h-4 text-[#F25F22]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#1E293B]">
                Team Milestones
              </h2>
            </div>

            <div className="space-y-3">
              {milestones.map((ms) => {
                const peer = peersById[ms.userId];
                if (!peer) return null;
                return (
                  <div
                    key={ms.id}
                    className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <PeerAvatar peer={peer} size="sm" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1E293B] truncate">
                          {peer.name}
                        </p>
                        <p className="text-xs text-[#64748B] truncate">
                          {ms.title} · {ms.dateLabel}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenGiveModalForPeer(
                          peer.id,
                          ms.suggestedBonuts,
                          `Happy ${ms.title}, ${peer.name.split(' ')[0]}! Thank you for making our team stronger every single week.`,
                          'Teamwork'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums"
                    >
                      Send +{ms.suggestedBonuts}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

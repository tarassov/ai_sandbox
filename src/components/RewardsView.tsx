import React, { useMemo, useState } from 'react';
import { Check, Copy, Gift, X } from 'lucide-react';
import { REWARDS_CATALOG } from '../data/initialData';
import { RewardCategory, RewardItem } from '../types/recognition';
import { CoinIcon, CoinPill } from './CurrencyVisuals';

interface RewardsViewProps {
  redeemableCoins: number;
  redeemedCount: number;
  onRedeemReward: (reward: RewardItem) => string;
}

const CATEGORIES: ('All Rewards' | RewardCategory)[] = [
  'All Rewards',
  'Coffee & Treats',
  'Experiences',
  'Gear & Desk',
  'Charity & Impact',
];

const RewardMedia: React.FC<{ reward: RewardItem }> = ({ reward }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (reward.imageUrl && !imgFailed) {
    return (
      <img
        src={reward.imageUrl}
        alt={reward.title}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover"
      />
    );
  }

  if (reward.illustrationType === 'bakery') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#FFF7ED] via-[#FEF3C7] to-[#FFEDD5] flex items-center justify-center p-6">
        <svg viewBox="0 0 180 120" className="w-40 h-28" aria-hidden="true">
          <rect x="20" y="34" width="140" height="68" rx="14" fill="#FFFFFF" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="2" />
          <circle cx="58" cy="68" r="18" fill="#F59E0B" />
          <circle cx="58" cy="68" r="6" fill="#FFFBEB" />
          <circle cx="92" cy="68" r="18" fill="#F25F22" />
          <circle cx="92" cy="68" r="6" fill="#FFF7ED" />
          <circle cx="126" cy="68" r="18" fill="#D97706" />
          <circle cx="126" cy="68" r="6" fill="#FFFBEB" />
          <path d="M55 24C65 18 115 18 125 24" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#FEF3C7] via-[#FFF7ED] to-[#FDE68A]/45 flex items-center justify-center p-6">
      <svg viewBox="0 0 180 120" className="w-40 h-28" aria-hidden="true">
        <circle cx="90" cy="56" r="30" fill="#F59E0B" fillOpacity="0.22" />
        <circle cx="90" cy="56" r="20" fill="#F25F22" />
        <path d="M90 18V26M90 86V94M52 56H60M120 56H128M63 29L69 35M111 77L117 83M117 29L111 35M69 77L63 83" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
        <rect x="44" y="96" width="92" height="10" rx="5" fill="#FFFFFF" stroke="#F59E0B" strokeOpacity="0.4" />
      </svg>
    </div>
  );
};

export const RewardsView: React.FC<RewardsViewProps> = ({
  redeemableCoins,
  redeemedCount,
  onRedeemReward,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All Rewards' | RewardCategory>(
    'All Rewards'
  );
  const [confirmReward, setConfirmReward] = useState<RewardItem | null>(null);
  const [issuedVoucher, setIssuedVoucher] = useState<{
    reward: RewardItem;
    code: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredRewards = useMemo(() => {
    if (selectedCategory === 'All Rewards') return REWARDS_CATALOG;
    return REWARDS_CATALOG.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleConfirmRedeem = () => {
    if (!confirmReward) return;
    const code = onRedeemReward(confirmReward);
    setIssuedVoucher({ reward: confirmReward, code });
    setConfirmReward(null);
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Summary Banner */}
      <div className="surface-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
            Rewards Catalog
          </h1>
          <p className="text-sm text-[#64748B]">
            Turn peer-gifted coins into artisan treats, team experiences, desk upgrades, or impact donations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-xs font-semibold text-[#64748B]">
              Redeemable Balance
            </p>
            <p className="text-xs text-[#94A3B8] tabular-nums">
              {redeemedCount} {redeemedCount === 1 ? 'reward' : 'rewards'} claimed
            </p>
          </div>
          <CoinPill amount={redeemableCoins} size="lg" />
        </div>
      </div>

      {/* Category Filter Segmented Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                active
                  ? 'bg-[#1E293B] text-white border-[#1E293B]'
                  : 'bg-white border-slate-200/80 text-[#475569] hover:border-slate-300 hover:text-[#1E293B]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Reward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const affordable = redeemableCoins >= reward.costCoins;
          const shortBy = reward.costCoins - redeemableCoins;

          return (
            <article
              key={reward.id}
              className="surface-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F8F9FA]">
                <RewardMedia reward={reward} />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#64748B] truncate">
                      {reward.partner} · {reward.category}
                    </span>
                    <CoinPill amount={reward.costCoins} size="sm" />
                  </div>

                  <h2 className="text-lg font-bold tracking-tight text-[#1E293B]">
                    {reward.title}
                  </h2>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {reward.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#94A3B8] truncate">
                    {affordable ? 'Ready to claim' : `Need ${shortBy} more coins`}
                  </span>

                  <button
                    type="button"
                    disabled={!affordable}
                    onClick={() => setConfirmReward(reward)}
                    className={`px-4 py-2 rounded-[10px] text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      affordable
                        ? 'btn-primary-warm'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem Reward
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {confirmReward && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-reward-title"
        >
          <div className="surface-modal rounded-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2
                  id="confirm-reward-title"
                  className="text-lg font-bold text-[#1E293B]"
                >
                  Confirm Reward Redemption
                </h2>
                <p className="text-xs text-[#64748B]">
                  {confirmReward.partner}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConfirmReward(null)}
                aria-label="Close confirmation dialog"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-4 space-y-2.5">
              <p className="text-sm font-bold text-[#1E293B]">
                {confirmReward.title}
              </p>
              <p className="text-xs text-[#64748B]">
                {confirmReward.fulfillmentNote}
              </p>
              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs tabular-nums">
                <span className="text-[#64748B]">Cost</span>
                <span className="font-bold text-[#B45309] inline-flex items-center gap-1">
                  <CoinIcon className="w-3.5 h-3.5" />
                  {confirmReward.costCoins} Coins
                </span>
              </div>
              <div className="flex items-center justify-between text-xs tabular-nums">
                <span className="text-[#64748B]">Remaining Balance</span>
                <span className="font-bold text-[#1E293B]">
                  {redeemableCoins - confirmReward.costCoins} Coins
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmReward(null)}
                className="px-4 py-2 rounded-[10px] text-xs font-semibold text-[#475569] hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRedeem}
                className="btn-primary-warm px-5 py-2.5 rounded-[10px] text-xs font-semibold cursor-pointer"
              >
                Claim Reward
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issued Voucher Receipt Modal */}
      {issuedVoucher && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="voucher-ready-title"
        >
          <div className="surface-modal rounded-2xl max-w-md w-full p-6 space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#EA580C] mx-auto flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2
                id="voucher-ready-title"
                className="text-xl font-bold text-[#1E293B]"
              >
                Reward Claimed
              </h2>
              <p className="text-sm text-[#64748B]">
                {issuedVoucher.reward.title} is ready to use and saved in your Wallet history.
              </p>
            </div>

            <div className="bg-[#FEF3C7]/60 border border-[#F59E0B]/30 rounded-xl p-4 flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-bold tracking-wide text-[#92400E] tabular-nums">
                {issuedVoucher.code}
              </span>
              <button
                type="button"
                onClick={() => handleCopyCode(issuedVoucher.code)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-semibold text-[#92400E] hover:bg-amber-50 cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIssuedVoucher(null)}
              className="btn-primary-warm w-full py-2.5 rounded-[10px] text-sm font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

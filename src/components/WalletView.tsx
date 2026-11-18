import React, { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { AppScreen, TransactionType, WalletTransaction } from '../types/recognition';
import { CoinPill, DonutIcon } from './CurrencyVisuals';

interface WalletViewProps {
  redeemableCoins: number;
  monthlyAllowance: number;
  monthlyAllowanceMax: number;
  transactions: WalletTransaction[];
  onNavigate: (screen: AppScreen) => void;
  onOpenGiveModal: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  redeemableCoins,
  monthlyAllowance,
  monthlyAllowanceMax,
  transactions,
  onNavigate,
  onOpenGiveModal,
}) => {
  const [filterType, setFilterType] = useState<'all' | TransactionType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Notification Preferences using custom #F25F22 checkboxes & radios
  const [digestFrequency, setDigestFrequency] = useState<'instant' | 'daily' | 'weekly'>(
    'daily'
  );
  const [notifyOnReceive, setNotifyOnReceive] = useState(true);
  const [notifyMilestones, setNotifyMilestones] = useState(true);
  const [notifyAllowanceReset, setNotifyAllowanceReset] = useState(false);

  const filteredTx = useMemo(() => {
    if (filterType === 'all') return transactions;
    return transactions.filter((tx) => tx.type === filterType);
  }, [transactions, filterType]);

  const handleCopyVoucher = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
          Wallet &amp; Activity
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Track earned coins, bonuts gifted to colleagues, and claimed reward vouchers.
        </p>
      </div>

      {/* Dual Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#64748B]">
                Redeemable Balance
              </p>
              <p className="text-3xl font-extrabold text-[#1E293B] tabular-nums mt-1">
                {redeemableCoins.toLocaleString()} Coins
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Coins you received from teammates never expire.
              </p>
            </div>
            <CoinPill amount={redeemableCoins} size="md" />
          </div>

          <div>
            <button
              type="button"
              onClick={() => onNavigate('rewards')}
              className="btn-primary-warm px-4 py-2 rounded-[10px] text-xs font-semibold cursor-pointer"
            >
              Spend in Rewards Catalog
            </button>
          </div>
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#64748B]">
                  Monthly Giving Allowance
                </p>
                <p className="text-3xl font-extrabold text-[#1E293B] tabular-nums mt-1">
                  {monthlyAllowance} Bonuts
                </p>
              </div>
              <span className="donut-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tabular-nums">
                <DonutIcon className="w-4 h-4" />
                <span>{monthlyAllowanceMax} / mo</span>
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F25F22] rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round((monthlyAllowance / monthlyAllowanceMax) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenGiveModal}
              className="px-4 py-2 rounded-[10px] text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] cursor-pointer transition-colors"
            >
              Give Bonuts to a Peer
            </button>
          </div>
        </div>
      </div>

      {/* Ledger + Notification Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 surface-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#1E293B]">
              Transaction History
            </h2>

            <div className="inline-flex items-center gap-1 p-1 bg-[#F8F9FA] rounded-xl">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'earned', label: 'Earned' },
                  { id: 'given', label: 'Given' },
                  { id: 'redeemed', label: 'Redeemed' },
                ] as { id: 'all' | TransactionType; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-white text-[#1E293B] shadow-xs'
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredTx.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1E293B]">
                      {tx.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mt-0.5">
                      <span>{tx.subtitle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#94A3B8]">{tx.dateLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {tx.voucherCode && (
                      <button
                        type="button"
                        onClick={() => handleCopyVoucher(tx.id, tx.voucherCode!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FEF3C7]/70 border border-amber-200 text-[11px] font-mono font-bold text-[#92400E] hover:bg-[#FEF3C7] cursor-pointer"
                      >
                        <span>{tx.voucherCode}</span>
                        {copiedId === tx.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}

                    <span
                      className={`text-sm font-bold tabular-nums ${
                        isPositive ? 'text-emerald-700' : 'text-[#475569]'
                      }`}
                    >
                      {isPositive ? `+${tx.amount}` : tx.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preferences Panel showcasing signature Checkboxes & Radio Buttons */}
        <div className="lg:col-span-4 surface-card rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#1E293B]">
              Recognition Preferences
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Customize how you receive celebration updates
            </p>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs font-bold text-[#475569] mb-2">
              Digest cadence
            </legend>
            {(
              [
                { id: 'instant', label: 'Real-time praise alerts' },
                { id: 'daily', label: 'Daily warm morning summary' },
                { id: 'weekly', label: 'Weekly Friday highlights' },
              ] as const
            ).map((opt) => {
              const checked = digestFrequency === opt.id;
              return (
                <label
                  key={opt.id}
                  className="flex items-center gap-3 cursor-pointer select-none text-sm text-[#1E293B]"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    onClick={() => setDigestFrequency(opt.id)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all border ${
                      checked
                        ? 'border-[#F25F22] ring-3 ring-amber-200/70 bg-white'
                        : 'border-[#CBD5E1] bg-white hover:border-slate-400'
                    }`}
                  >
                    {checked && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F25F22]" />
                    )}
                  </button>
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-xs font-bold text-[#475569]">
              Alert triggers
            </p>
            {[
              {
                label: 'Notify when teammates send me bonuts',
                checked: notifyOnReceive,
                onChange: () => setNotifyOnReceive((v) => !v),
              },
              {
                label: 'Remind me about peer anniversaries',
                checked: notifyMilestones,
                onChange: () => setNotifyMilestones((v) => !v),
              },
              {
                label: 'Monthly allowance refresh reminder',
                checked: notifyAllowanceReset,
                onChange: () => setNotifyAllowanceReset((v) => !v),
              },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-start gap-3 cursor-pointer select-none text-sm text-[#1E293B]"
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={item.checked}
                  onClick={item.onChange}
                  className={`mt-0.5 w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 transition-colors border ${
                    item.checked
                      ? 'bg-[#F25F22] border-[#F25F22] text-white'
                      : 'bg-white border-[#CBD5E1] hover:border-slate-400'
                  }`}
                >
                  {item.checked && <Check className="w-3.5 h-3.5 stroke-[2.75]" />}
                </button>
                <span className="leading-snug">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

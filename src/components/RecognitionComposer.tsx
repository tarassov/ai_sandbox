import React, { useEffect, useState } from 'react';
import { Check, Send } from 'lucide-react';
import { CORE_VALUES, CURRENT_USER_ID } from '../data/initialData';
import { CoreValue, PeerUser } from '../types/recognition';
import { DonutIcon, PeerAvatar } from './CurrencyVisuals';

interface RecognitionComposerProps {
  peers: PeerUser[];
  monthlyAllowance: number;
  initialRecipientId?: string | null;
  initialAmount?: number;
  initialMessage?: string;
  initialCoreValue?: CoreValue;
  compact?: boolean;
  onSubmitRecognition: (payload: {
    recipientIds: string[];
    message: string;
    bonutsPerRecipient: number;
    coreValue: CoreValue;
  }) => void;
}

const BONUT_AMOUNTS = [5, 10, 25, 50];

export const RecognitionComposer: React.FC<RecognitionComposerProps> = ({
  peers,
  monthlyAllowance,
  initialRecipientId,
  initialAmount = 25,
  initialMessage = '',
  initialCoreValue = 'Teamwork',
  compact = false,
  onSubmitRecognition,
}) => {
  const selectablePeers = peers.filter((p) => p.id !== CURRENT_USER_ID);
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>(
    initialRecipientId ? [initialRecipientId] : []
  );
  const [message, setMessage] = useState(initialMessage);
  const [amount, setAmount] = useState(initialAmount);
  const [coreValue, setCoreValue] = useState<CoreValue>(initialCoreValue);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (initialRecipientId) {
      setSelectedRecipientIds([initialRecipientId]);
    }
  }, [initialRecipientId]);

  useEffect(() => {
    if (initialAmount) setAmount(initialAmount);
  }, [initialAmount]);

  useEffect(() => {
    if (initialMessage) setMessage(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    if (initialCoreValue) setCoreValue(initialCoreValue);
  }, [initialCoreValue]);

  const toggleRecipient = (id: string) => {
    setErrorText(null);
    setSelectedRecipientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalCost = Math.max(1, selectedRecipientIds.length) * amount;
  const exceedsAllowance = selectedRecipientIds.length > 0 && totalCost > monthlyAllowance;
  const canSubmit =
    selectedRecipientIds.length > 0 &&
    message.trim().length >= 8 &&
    !exceedsAllowance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecipientIds.length === 0) {
      setErrorText('Select at least one teammate to recognize.');
      return;
    }
    if (message.trim().length < 8) {
      setErrorText('Write a short note explaining why their work mattered.');
      return;
    }
    if (totalCost > monthlyAllowance) {
      setErrorText(
        `This recognition needs ${totalCost} bonuts, but you have ${monthlyAllowance} left this month.`
      );
      return;
    }

    onSubmitRecognition({
      recipientIds: selectedRecipientIds,
      message: message.trim(),
      bonutsPerRecipient: amount,
      coreValue,
    });

    setSelectedRecipientIds([]);
    setMessage('');
    setAmount(25);
    setErrorText(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'space-y-5' : 'surface-card rounded-2xl p-6 space-y-5'}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#1E293B]">
            Recognize a teammate
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Celebrate helpful moments, launches, or everyday kindness
          </p>
        </div>
        <div className="text-xs font-semibold text-[#64748B] tabular-nums">
          Allowance:{' '}
          <span className="text-[#EA580C] font-bold">
            {monthlyAllowance} bonuts left
          </span>
        </div>
      </div>

      {/* Teammate Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#475569]">
          Who are you celebrating?
        </label>
        <div className="flex flex-wrap gap-2">
          {selectablePeers.map((peer) => {
            const isSelected = selectedRecipientIds.includes(peer.id);
            return (
              <button
                key={peer.id}
                type="button"
                onClick={() => toggleRecipient(peer.id)}
                className={`inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FFF7ED] border-[#F25F22] text-[#9A3412] shadow-xs'
                    : 'bg-white border-slate-200 text-[#475569] hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <PeerAvatar peer={peer} size="xs" />
                <span className="whitespace-nowrap">{peer.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#F25F22]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recognition Message Textarea */}
      <div className="space-y-2">
        <label htmlFor="recognition-note" className="block text-xs font-semibold text-[#475569]">
          Your appreciation note
        </label>
        <textarea
          id="recognition-note"
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errorText) setErrorText(null);
          }}
          placeholder="Share what they built, how they unblocked the team, or why it mattered..."
          className="w-full min-h-[96px] bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[15px] leading-relaxed text-[#1E293B] placeholder:text-slate-400 focus:outline-2 focus:outline-[#F25F22] focus:outline-offset-2 focus:border-[#F25F22] transition-colors resize-y"
        />
      </div>

      {/* Core Values & Bonut Increment Toolbar */}
      <div className="flex flex-col gap-4 pt-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {CORE_VALUES.map((item) => {
              const active = coreValue === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setCoreValue(item.value)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.04em] uppercase transition-all cursor-pointer border whitespace-nowrap ${
                    active
                      ? 'bg-[#1E293B] text-white border-[#1E293B]'
                      : `${item.bg} ${item.text} ${item.border} hover:opacity-85`
                  }`}
                >
                  {item.value}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#64748B] mr-1">
              Gift amount:
            </span>
            {BONUT_AMOUNTS.map((val) => {
              const active = amount === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setAmount(val);
                    setErrorText(null);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold tabular-nums transition-all cursor-pointer border whitespace-nowrap ${
                    active
                      ? 'donut-pill border-[#F59E0B] ring-2 ring-[#F59E0B]/25'
                      : 'bg-[#F8F9FA] border-slate-200 text-[#475569] hover:bg-[#FFF7ED] hover:border-[#F25F22]/40'
                  }`}
                >
                  <DonutIcon className="w-3.5 h-3.5" />
                  <span>+{val}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {selectedRecipientIds.length > 1 && (
              <span className="text-xs font-semibold text-[#64748B] tabular-nums">
                Total: {totalCost} bonuts
              </span>
            )}
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-primary-warm inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F25F22] focus-visible:outline-offset-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Recognition</span>
            </button>
          </div>
        </div>
      </div>

      {(errorText || exceedsAllowance) && (
        <p className="text-xs font-semibold text-red-600" role="alert">
          {errorText ??
            `Total (${totalCost} bonuts) exceeds your monthly allowance of ${monthlyAllowance}.`}
        </p>
      )}
    </form>
  );
};

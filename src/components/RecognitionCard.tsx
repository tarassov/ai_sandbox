import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Plus } from 'lucide-react';
import { CORE_VALUES, CURRENT_USER_ID } from '../data/initialData';
import { PeerUser, RecognitionPost } from '../types/recognition';
import { DonutIcon, DonutPill, PeerAvatar } from './CurrencyVisuals';

interface RecognitionCardProps {
  post: RecognitionPost;
  peersById: Record<string, PeerUser>;
  monthlyAllowance: number;
  onToggleReaction: (postId: string, emoji: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onEchoBonuts: (postId: string) => void;
}

const QUICK_REACTIONS = [
  { emoji: '👏', label: 'Applause' },
  { emoji: '🍩', label: 'Bonuts' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '🎉', label: 'Celebrate' },
];

export const RecognitionCard: React.FC<RecognitionCardProps> = ({
  post,
  peersById,
  monthlyAllowance,
  onToggleReaction,
  onAddComment,
  onEchoBonuts,
}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sender = peersById[post.senderId];
  const recipients = post.recipientIds
    .map((id) => peersById[id])
    .filter(Boolean);

  if (!sender || recipients.length === 0) return null;

  const valueMeta = CORE_VALUES.find((v) => v.value === post.coreValue);
  const canEcho =
    monthlyAllowance >= 5 * recipients.length &&
    !post.recipientIds.includes(CURRENT_USER_ID);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddComment(post.id, replyText.trim());
    setReplyText('');
  };

  return (
    <article className="surface-card rounded-2xl p-6 transition-shadow">
      {/* Header: Sender -> Recipient Pair + Metadata + Donut Pill */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex items-center shrink-0">
            <PeerAvatar peer={sender} size="md" />
            <span
              className="mx-1.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#F25F22]/20"
              aria-hidden="true"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <div className="flex -space-x-2">
              {recipients.map((recipient) => (
                <PeerAvatar key={recipient.id} peer={recipient} size="md" />
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-sm text-[#1E293B] leading-snug">
              <span className="font-bold">{sender.name}</span>
              <span className="text-[#64748B] font-medium"> recognized </span>
              <span className="font-bold">
                {recipients.map((r) => r.name).join(' & ')}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#94A3B8] mt-0.5">
              <span>{recipients[0].department}</span>
              <span aria-hidden="true">·</span>
              <span>{post.createdAtLabel}</span>
              {post.isMilestone && post.milestoneLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#B45309]">
                    {post.milestoneLabel}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <DonutPill amount={post.bonutsPerRecipient} />
      </div>

      {/* Main Praise Message */}
      <div className="mt-4 space-y-3">
        <p className="text-[16px] leading-[1.625] text-[#1E293B]">
          {post.message}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[0.04em] uppercase border ${
              valueMeta
                ? `${valueMeta.bg} ${valueMeta.text} ${valueMeta.border}`
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {post.coreValue}
          </span>
        </div>
      </div>

      {/* Footer Interaction Bar */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 relative">
          {post.reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              type="button"
              onClick={() => onToggleReaction(post.id, reaction.emoji)}
              aria-label={`${reaction.label} reaction (${reaction.count})`}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold tabular-nums transition-all cursor-pointer border ${
                reaction.reactedByMe
                  ? 'bg-[#FFF7ED] border-[#F25F22]/40 text-[#C2410C]'
                  : 'bg-[#F8F9FA] border-slate-200/80 text-[#475569] hover:bg-slate-100'
              }`}
            >
              <span>{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </button>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
              aria-label="Add reaction"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F8F9FA] border border-slate-200/80 text-[#64748B] hover:text-[#1E293B] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {showEmojiPicker && (
              <div className="absolute left-0 bottom-10 z-20 surface-modal rounded-full px-2 py-1 flex items-center gap-1">
                {QUICK_REACTIONS.map((item) => (
                  <button
                    key={item.emoji}
                    type="button"
                    onClick={() => {
                      onToggleReaction(post.id, item.emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="w-8 h-8 rounded-full hover:bg-[#FFF7ED] flex items-center justify-center text-base transition-transform hover:scale-110 cursor-pointer"
                    title={item.label}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canEcho && (
            <button
              type="button"
              onClick={() => onEchoBonuts(post.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] transition-colors cursor-pointer whitespace-nowrap"
              title="Add +5 bonuts from your monthly allowance"
            >
              <DonutIcon className="w-3.5 h-3.5" />
              <span>Echo +5</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setCommentsOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#475569] hover:bg-[#F25F22]/[0.06] transition-colors cursor-pointer whitespace-nowrap tabular-nums"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>
              {post.comments.length}{' '}
              {post.comments.length === 1 ? 'comment' : 'comments'}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Comments Drawer */}
      {commentsOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {post.comments.length > 0 ? (
            <div className="space-y-2.5">
              {post.comments.map((comment) => {
                const author = peersById[comment.authorId];
                if (!author) return null;
                return (
                  <div
                    key={comment.id}
                    className="flex items-start gap-2.5 bg-[#F8F9FA] rounded-xl px-3.5 py-2.5"
                  >
                    <PeerAvatar peer={author} size="xs" className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-[#1E293B]">
                          {author.name}
                        </span>
                        <span className="text-[11px] text-[#94A3B8]">
                          {comment.createdAtLabel}
                        </span>
                      </div>
                      <p className="text-sm text-[#334155] leading-snug mt-0.5">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#94A3B8]">
              No replies yet — add a quick celebratory note below.
            </p>
          )}

          <form onSubmit={handleReplySubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a congratulatory reply..."
              className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-2 focus:outline-[#F25F22] focus:outline-offset-2 focus:border-[#F25F22]"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] disabled:opacity-45 cursor-pointer transition-colors whitespace-nowrap"
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

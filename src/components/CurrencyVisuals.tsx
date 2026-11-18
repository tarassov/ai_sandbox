import React, { useState } from 'react';
import { PeerUser } from '../types/recognition';

export const DonutIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" fill="#F59E0B" />
    <path
      d="M12 2.5C6.753 2.5 2.5 6.753 2.5 12C2.5 13.05 2.67 14.06 2.985 15.005C4.21 14.2 5.45 14.88 6.45 15.18C7.68 15.55 8.65 14.22 9.85 14.5C11.15 14.8 11.9 15.95 13.35 15.6C14.7 15.27 15.4 14.05 16.75 14.35C18.05 14.64 19.2 15.65 20.68 14.95C21.21 14.07 21.5 13.07 21.5 12C21.5 6.753 17.247 2.5 12 2.5Z"
      fill="#F25F22"
    />
    <circle cx="12" cy="12" r="3.4" fill="#FEF3C7" />
    <circle cx="12" cy="12" r="3.4" stroke="#D97706" strokeOpacity="0.25" strokeWidth="0.75" />
    <rect x="8.2" y="5.6" width="2.2" height="1" rx="0.5" transform="rotate(-22 8.2 5.6)" fill="#FFFBEB" />
    <rect x="13.8" y="5.4" width="2.2" height="1" rx="0.5" transform="rotate(24 13.8 5.4)" fill="#FDE68A" />
    <rect x="16.4" y="9.2" width="2.1" height="1" rx="0.5" transform="rotate(-15 16.4 9.2)" fill="#FFFBEB" />
    <rect x="5.4" y="9.8" width="2.1" height="1" rx="0.5" transform="rotate(28 5.4 9.8)" fill="#FDE68A" />
  </svg>
);

export const CoinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" fill="url(#coinGrad)" stroke="#B45309" strokeWidth="1" />
    <circle cx="12" cy="12" r="6.8" stroke="#FEF3C7" strokeOpacity="0.75" strokeWidth="1" />
    <path
      d="M12 7.8V16.2M14.1 9.6C13.6 9.05 12.85 8.8 12 8.8C10.7 8.8 9.8 9.45 9.8 10.45C9.8 11.45 10.65 11.85 12.1 12.15C13.55 12.45 14.3 12.95 14.3 13.95C14.3 14.95 13.35 15.6 12 15.6C10.9 15.6 10.1 15.25 9.6 14.6"
      stroke="#78350F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="coinGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.55" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

export const DonutPill: React.FC<{
  amount: number;
  suffix?: string;
  size?: 'sm' | 'md';
}> = ({ amount, suffix = 'Bonuts', size = 'md' }) => (
  <span
    className={`donut-pill inline-flex items-center gap-1.5 rounded-full font-bold tabular-nums whitespace-nowrap shrink-0 ${
      size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1 text-xs sm:text-[13px]'
    }`}
  >
    <DonutIcon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
    <span>
      +{amount} {suffix}
    </span>
  </span>
);

export const CoinPill: React.FC<{
  amount: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ amount, label = 'Coins', size = 'md' }) => (
  <span
    className={`coin-pill inline-flex items-center gap-1.5 rounded-full font-bold tabular-nums whitespace-nowrap shrink-0 ${
      size === 'lg'
        ? 'px-3.5 py-1.5 text-sm'
        : size === 'sm'
          ? 'px-2.5 py-1 text-xs'
          : 'px-3 py-1 text-xs sm:text-[13px]'
    }`}
  >
    <CoinIcon className={size === 'lg' ? 'w-4.5 h-4.5' : 'w-4 h-4'} />
    <span>
      {amount.toLocaleString()} {label}
    </span>
  </span>
);

export const PeerAvatar: React.FC<{
  peer: PeerUser;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ peer, size = 'md', className = '' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClass =
    size === 'xs'
      ? 'w-7 h-7 text-[11px]'
      : size === 'sm'
        ? 'w-9 h-9 text-xs'
        : size === 'lg'
          ? 'w-14 h-14 text-base'
          : 'w-10 h-10 text-sm';

  if (peer.avatarUrl && !imgFailed) {
    return (
      <img
        src={peer.avatarUrl}
        alt={peer.name}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-white shrink-0 ${className}`}
      />
    );
  }

  return (
    <span
      aria-label={peer.name}
      className={`${sizeClass} ${peer.avatarBg} ${peer.avatarText} inline-flex items-center justify-center rounded-full font-bold ring-2 ring-white shrink-0 select-none ${className}`}
    >
      {peer.initials}
    </span>
  );
};

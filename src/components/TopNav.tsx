import React from 'react';
import { AppScreen } from '../types/recognition';
import { DonutIcon } from './CurrencyVisuals';

interface TopNavProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenGiveModal: () => void;
}

const NAV_ITEMS: { id: AppScreen; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'wallet', label: 'Wallet' },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeScreen,
  onNavigate,
  onOpenGiveModal,
}) => {
  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/92 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('feed')}
            className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#1E293B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F25F22] focus-visible:outline-offset-4 rounded-lg"
          >
            <DonutIcon className="w-7 h-7" />
            <span>Bonuts</span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-2 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-[#F25F22] focus-visible:outline-offset-4 rounded ${
                    isActive
                      ? 'text-[#1E293B]'
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 rounded-full transition-opacity ${
                      isActive ? 'bg-[#F25F22] opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenGiveModal}
              className="btn-primary-warm px-4 py-2.5 rounded-[10px] text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F25F22] focus-visible:outline-offset-2"
            >
              Give Bonuts
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Utility Bar (within 15% height cap) */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`min-h-[44px] px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-[#F25F22] bg-[#FFF7ED]'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
};

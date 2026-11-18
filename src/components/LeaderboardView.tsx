import React, { useMemo, useState } from 'react';
import { Award } from 'lucide-react';
import { CORE_VALUES, CURRENT_USER_ID } from '../data/initialData';
import {
  CoreValue,
  Department,
  PeerUser,
  RecognitionPost,
} from '../types/recognition';
import { DonutIcon, DonutPill, PeerAvatar } from './CurrencyVisuals';

interface LeaderboardViewProps {
  peers: PeerUser[];
  posts: RecognitionPost[];
  onOpenGiveModalForPeer: (peerId: string) => void;
}

type Timeframe = 'week' | 'month' | 'quarter';

const DEPARTMENTS: ('All Teams' | Department)[] = [
  'All Teams',
  'Product & Design',
  'Engineering',
  'Customer Success',
  'Operations',
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  peers,
  posts,
  onOpenGiveModalForPeer,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('month');
  const [department, setDepartment] = useState<'All Teams' | Department>('All Teams');

  const getScore = (peer: PeerUser) => {
    if (timeframe === 'week') return peer.bonutsReceivedWeek;
    if (timeframe === 'quarter') return peer.bonutsReceivedQuarter;
    return peer.bonutsReceivedMonth;
  };

  const rankedPeers = useMemo(() => {
    return peers
      .filter((p) => department === 'All Teams' || p.department === department)
      .sort((a, b) => getScore(b) - getScore(a));
  }, [peers, department, timeframe]);

  const topThree = rankedPeers.slice(0, 3);

  const valueDistribution = useMemo(() => {
    const counts: Record<CoreValue, number> = {
      Teamwork: 0,
      Innovation: 0,
      'Customer Hero': 0,
      Ownership: 0,
      Mentorship: 0,
    };
    posts.forEach((p) => {
      counts[p.coreValue] = (counts[p.coreValue] || 0) + 1;
    });
    const maxCount = Math.max(1, ...Object.values(counts));
    return CORE_VALUES.map((item) => ({
      ...item,
      count: counts[item.value],
      percent: Math.round((counts[item.value] / maxCount) * 100),
    }));
  }, [posts]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
            Recognition Leaderboard
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Celebrating teammates who lift others up and embody company values.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-xl">
            {(
              [
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'quarter', label: 'Quarter' },
              ] as { id: Timeframe; label: string }[]
            ).map((tf) => (
              <button
                key={tf.id}
                type="button"
                onClick={() => setTimeframe(tf.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  timeframe === tf.id
                    ? 'bg-[#1E293B] text-white'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          <select
            aria-label="Filter by department"
            value={department}
            onChange={(e) => setDepartment(e.target.value as 'All Teams' | Department)}
            className="bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#1E293B] focus:outline-2 focus:outline-[#F25F22] focus:outline-offset-2 focus:border-[#F25F22]"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((peer, idx) => (
          <div
            key={peer.id}
            className="surface-card rounded-2xl p-6 flex flex-col justify-between gap-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <PeerAvatar peer={peer} size="lg" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#EA580C] tabular-nums">
                    Rank #0{idx + 1}
                  </p>
                  <h2 className="text-lg font-bold text-[#1E293B] truncate">
                    {peer.name}
                  </h2>
                  <p className="text-xs text-[#64748B] truncate">
                    {peer.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <DonutPill amount={getScore(peer)} suffix="Received" />
              {peer.id !== CURRENT_USER_ID ? (
                <button
                  type="button"
                  onClick={() => onOpenGiveModalForPeer(peer.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] cursor-pointer transition-colors"
                >
                  Recognize
                </button>
              ) : (
                <span className="text-xs font-semibold text-[#64748B]">You</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rankings Table + Values Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 surface-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1E293B]">
              Team Standings
            </h2>
            <span className="text-xs text-[#64748B] tabular-nums">
              {rankedPeers.length} teammates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3 px-6">Rank</th>
                  <th className="py-3 px-4">Teammate</th>
                  <th className="py-3 px-4">Top Value</th>
                  <th className="py-3 px-4 text-right">Given</th>
                  <th className="py-3 px-4 text-right">Received</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {rankedPeers.map((peer, idx) => (
                  <tr
                    key={peer.id}
                    className="hover:bg-[#FDFBF7] transition-colors"
                  >
                    <td className="py-3.5 px-6 font-bold text-[#94A3B8] tabular-nums">
                      0{idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <PeerAvatar peer={peer} size="sm" />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1E293B] whitespace-nowrap">
                            {peer.name}
                          </p>
                          <p className="text-xs text-[#64748B] whitespace-nowrap">
                            {peer.department}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-[#475569] whitespace-nowrap">
                      {peer.topValue}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#64748B] tabular-nums">
                      {peer.bonutsGivenMonth}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center justify-end gap-1 font-bold text-[#B45309] tabular-nums">
                        <DonutIcon className="w-3.5 h-3.5" />
                        {getScore(peer)}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {peer.id !== CURRENT_USER_ID ? (
                        <button
                          type="button"
                          onClick={() => onOpenGiveModalForPeer(peer.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5] cursor-pointer whitespace-nowrap"
                        >
                          Give Bonuts
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-[#94A3B8]">
                          Your rank
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Core Values Momentum */}
        <div className="lg:col-span-4 surface-card rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F25F22]" aria-hidden="true" />
            <h2 className="text-base font-bold text-[#1E293B]">
              Core Values Momentum
            </h2>
          </div>

          <div className="space-y-4">
            {valueDistribution.map((item) => (
              <div key={item.value} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E293B]">{item.value}</span>
                  <span className="font-semibold text-[#64748B] tabular-nums">
                    {item.count} {item.count === 1 ? 'shoutout' : 'shoutouts'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(12, item.percent)}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#64748B]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

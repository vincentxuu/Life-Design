'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
}

const unlockedBadges: Badge[] = [
  {
    id: 'life_designer',
    icon: '🏆',
    name: '人生設計師',
    description: '完成 Onboarding 流程',
  },
  {
    id: 'explorer',
    icon: '🧭',
    name: '探索者',
    description: '開始探索意義羅盤',
  },
];

interface CompletionCelebrationProps {
  userName?: string;
}

export function CompletionCelebration({
  userName = '朋友',
}: CompletionCelebrationProps) {
  const [showBadges, setShowBadges] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowBadges(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 text-center">
      {/* Celebration Animation */}
      <div className="animate-jelly text-8xl">🎉</div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-basic-600">
          恭喜你，{userName}！
        </h2>
        <p className="text-lg text-basic-500">
          你已經完成了人生設計的第一步
        </p>
      </div>

      {/* Unlocked Badges */}
      <div
        className={cn(
          'w-full space-y-4 transition-all duration-500',
          showBadges ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
      >
        <h3 className="text-lg font-semibold text-basic-500">
          🎖️ 解鎖徽章
        </h3>
        <div className="flex justify-center gap-4">
          {unlockedBadges.map((badge, index) => (
            <div
              key={badge.id}
              className="animate-stamp flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br from-primary-pale to-primary-lightest p-4 shadow-lg"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <span className="text-4xl">{badge.icon}</span>
              <span className="font-bold text-primary-darker">{badge.name}</span>
              <span className="text-xs text-basic-400">{badge.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="w-full rounded-2xl bg-basic-100 p-6">
        <h3 className="mb-4 text-lg font-semibold text-basic-600">
          接下來你可以...
        </h3>
        <ul className="space-y-3 text-left">
          <li className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-base text-white">
              1
            </span>
            <span className="text-basic-500">探索完整的意義羅盤問答</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-base text-white">
              2
            </span>
            <span className="text-basic-500">每天打卡你的第一個習慣</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-base text-white">
              3
            </span>
            <span className="text-basic-500">進行每日反思，記錄成長</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

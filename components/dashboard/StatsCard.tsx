'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  subtext?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'up',
  icon: Icon,
  subtext,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-6 border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
          {title}
        </span>
        <div className="w-10 h-10 rounded-2xl bg-brand-light flex items-center justify-center text-brand-darkest group-hover:bg-brand-darkest group-hover:text-white transition-colors duration-200">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-black text-brand-darkest tracking-tight mb-2">
          {value}
        </div>

        <div className="flex items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-bold px-2 py-0.5 rounded-full',
                changeType === 'up' && 'bg-emerald-50 text-emerald-700',
                changeType === 'down' && 'bg-red-50 text-red-700',
                changeType === 'neutral' && 'bg-brand-light text-brand-secondary'
              )}
            >
              {changeType === 'up' && <TrendingUp className="w-3 h-3" />}
              {changeType === 'down' && <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          )}
          {subtext && <span className="text-brand-subtle">{subtext}</span>}
        </div>
      </div>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface FilterBarProps {
  groups: FilterGroup[];
  className?: string;
  extra?: React.ReactNode;
}

export default function FilterBar({ groups, className, extra }: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-brand-border shadow-sm',
        className
      )}
    >
      {groups.map((group) => (
        <div key={group.id} className="flex items-center gap-2">
          <label className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
            {group.label}:
          </label>
          <select
            value={group.value}
            onChange={(e) => group.onChange(e.target.value)}
            className="text-sm bg-brand-light/70 border border-brand-border rounded-xl px-3 py-1.5 text-brand-darkest font-medium focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all cursor-pointer"
          >
            {group.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      {extra && <div className="ml-auto flex items-center gap-2">{extra}</div>}
    </div>
  );
}

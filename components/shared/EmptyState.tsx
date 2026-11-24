import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-brand-border',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center mb-4 text-brand-secondary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-brand-darkest mb-1">{title}</h3>
      <p className="text-sm text-brand-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 rounded-xl bg-brand-darkest text-white text-sm font-medium hover:bg-brand-dark transition-colors shadow-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

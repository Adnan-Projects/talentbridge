'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RequestStatus } from '@/data/mockRequests';

interface RequestProgressTrackerProps {
  status: RequestStatus;
  className?: string;
}

const STEPS: { key: RequestStatus; label: string }[] = [
  { key: 'Pending', label: 'Requested' },
  { key: 'Approved', label: 'Approved' },
  { key: 'Donor Found', label: 'Donor Found' },
  { key: 'Completed', label: 'Delivered' },
];

export default function RequestProgressTracker({ status, className }: RequestProgressTrackerProps) {
  if (status === 'Rejected') {
    return (
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
        Request Rejected
      </span>
    );
  }

  // Determine current step index
  const statusOrder: Record<string, number> = {
    Pending: 0,
    Approved: 1,
    'Donor Found': 2,
    'In Progress': 2,
    Received: 2,
    Completed: 3,
  };

  const currentIndex = statusOrder[status] ?? 0;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {STEPS.map((step, idx) => {
        const isDone = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        return (
          <div key={step.key} className="flex items-center gap-1.5">
            <div
              title={step.label}
              className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all',
                isDone && 'bg-emerald-600 text-white',
                isCurrent && 'bg-brand-darkest text-white ring-2 ring-brand-darkest/20',
                !isDone && !isCurrent && 'bg-brand-light text-brand-subtle border border-brand-border'
              )}
            >
              {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-3 sm:w-4 h-0.5 rounded-full',
                  idx < currentIndex ? 'bg-emerald-600' : 'bg-brand-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

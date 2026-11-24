import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'outline';
  className?: string;
}

const VARIANT_CLASSES = {
  default: 'bg-brand-light text-brand-darkest border-brand-border',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error:   'bg-red-50 text-red-700 border-red-200',
  info:    'bg-sky-50 text-sky-700 border-sky-200',
  purple:  'bg-purple-50 text-purple-700 border-purple-200',
  outline: 'bg-transparent text-brand-secondary border-brand-border',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

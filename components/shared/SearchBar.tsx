'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchBarProps) {
  return (
    <div className={cn('relative flex items-center w-full max-w-md', className)}>
      <Search className="absolute left-3.5 w-4 h-4 text-brand-subtle pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 bg-white border border-brand-border rounded-xl text-sm text-brand-darkest placeholder:text-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-0.5 rounded-md text-brand-subtle hover:text-brand-darkest transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

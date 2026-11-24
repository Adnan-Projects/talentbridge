'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const STYLES = {
  success: 'bg-white border-emerald-200 text-emerald-800 shadow-float',
  error: 'bg-white border-red-200 text-red-800 shadow-float',
  warning: 'bg-white border-amber-200 text-amber-800 shadow-float',
  info: 'bg-white border-sky-200 text-sky-800 shadow-float',
};

const ICON_STYLES = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-sky-600',
};

export default function Toast({
  message,
  type = 'info',
  isOpen,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const Icon = ICONS[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-6 right-6 z-[120] max-w-sm w-full pointer-events-auto"
        >
          <div
            className={cn(
              'flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-card',
              STYLES[type]
            )}
          >
            <Icon className={cn('w-5 h-5 flex-shrink-0', ICON_STYLES[type])} />
            <p className="flex-1 text-sm font-medium leading-snug text-brand-darkest">{message}</p>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

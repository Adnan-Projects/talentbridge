'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, XCircle, Sparkles, MapPin, Check, X } from 'lucide-react';
import { MatchResult } from '@/lib/matching';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: MatchResult;
  status: 'Suggested' | 'Connected' | 'Rejected';
  onConnect: () => void;
  onReject: () => void;
}

export default function MatchCard({ match, status, onConnect, onReject }: MatchCardProps) {
  const { volunteer, student, score, reasons } = match;

  const scoreColor =
    score >= 70
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : score >= 50
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-brand-secondary bg-brand-light border-brand-border';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white rounded-3xl p-6 border shadow-card transition-all duration-300 flex flex-col justify-between',
        status === 'Connected' && 'border-emerald-300 bg-emerald-50/20',
        status === 'Rejected' && 'border-brand-border/60 opacity-60 bg-gray-50/50',
        status === 'Suggested' && 'border-brand-border hover:shadow-card-hover'
      )}
    >
      <div>
        {/* Top Header: Score & Status */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border/60">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1 shadow-sm',
                scoreColor
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{score}% Compatibility</span>
            </span>
            <span className="text-[11px] text-brand-secondary">
              {score >= 75 ? 'Optimal Match' : 'Recommended'}
            </span>
          </div>

          <div>
            {status === 'Connected' && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Connected &amp; Active</span>
              </span>
            )}
            {status === 'Rejected' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-subtle bg-brand-light px-2.5 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5" />
                <span>Dismissed</span>
              </span>
            )}
            {status === 'Suggested' && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Awaiting Connection
              </span>
            )}
          </div>
        </div>

        {/* 2-Column Volunteer & Student Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
          {/* Volunteer Side */}
          <div className="p-4 bg-brand-offwhite rounded-2xl border border-brand-border/60 flex items-start gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-brand-border flex-shrink-0">
              <Image src={volunteer.imageUrl} alt={volunteer.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-subtle block">
                Volunteer Mentor
              </span>
              <p className="font-bold text-brand-darkest text-sm truncate">{volunteer.name}</p>
              <p className="text-xs font-semibold text-brand-primary">{volunteer.expertise}</p>
              <p className="text-[11px] text-brand-secondary mt-1">
                Avail: {volunteer.availability.slice(0, 2).join(', ')}
              </p>
            </div>
          </div>

          {/* Student Side */}
          <div className="p-4 bg-brand-offwhite rounded-2xl border border-brand-border/60 flex items-start gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-brand-border flex-shrink-0">
              <Image src={student.imageUrl} alt={student.displayName} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-subtle block">
                Talented Student
              </span>
              <p className="font-bold text-brand-darkest text-sm truncate">{student.displayName}</p>
              <p className="text-xs font-semibold text-brand-primary">
                {student.specificSkill} ({student.skillLevel})
              </p>
              <div className="flex items-center gap-1 text-[11px] text-brand-secondary mt-1">
                <MapPin className="w-3 h-3 text-brand-subtle" />
                <span>{student.region}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Matching Reasons Pill Row */}
        <div className="space-y-1.5 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">
            Algorithmic Compatibility Factors:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {reasons.map((reason, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-brand-light text-brand-darkest px-2.5 py-1 rounded-lg border border-brand-border/80 font-medium"
              >
                &bull; {reason}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
        <div className="text-[11px] text-brand-secondary">
          <span>Mode: <strong className="text-brand-darkest">{volunteer.teachingMode}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          {status !== 'Rejected' && (
            <button
              onClick={onReject}
              className="px-3 py-1.5 rounded-xl border border-brand-border text-brand-secondary hover:text-brand-darkest text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Dismiss</span>
            </button>
          )}

          {status !== 'Connected' && (
            <button
              onClick={onConnect}
              className="px-4 py-2 rounded-xl bg-brand-darkest text-white hover:bg-brand-dark text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Connect Mentor &amp; Student</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

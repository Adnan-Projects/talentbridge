'use client';

import { useState, useEffect, useMemo } from 'react';
import { Shuffle, CheckCircle2, Filter, Sparkles, Users } from 'lucide-react';
import { getVolunteers, getStudents } from '@/lib/storage';
import { findAllMatches, MatchResult } from '@/lib/matching';
import MatchCard from '@/components/matching/MatchCard';
import EmptyState from '@/components/shared/EmptyState';

export default function SmartMatchingPage() {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, 'Suggested' | 'Connected' | 'Rejected'>>({});
  const [filterMode, setFilterMode] = useState<'all' | 'high' | 'connected'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const volunteers = getVolunteers();
    const students = getStudents();
    const computed = findAllMatches(volunteers, students);
    setMatches(computed);

    // Load connection statuses from localStorage
    try {
      const stored = localStorage.getItem('tb_connection_statuses');
      if (stored) {
        setConnectionStatuses(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const saveStatuses = (next: Record<string, 'Suggested' | 'Connected' | 'Rejected'>) => {
    setConnectionStatuses(next);
    try {
      localStorage.setItem('tb_connection_statuses', JSON.stringify(next));
    } catch {}
  };

  const getMatchKey = (m: MatchResult) => `${m.volunteer.id}_${m.student.id}`;

  const handleConnect = (m: MatchResult) => {
    const key = getMatchKey(m);
    const next = { ...connectionStatuses, [key]: 'Connected' as const };
    saveStatuses(next);
    showToast(`Successfully connected ${m.volunteer.name} with ${m.student.displayName}!`);
  };

  const handleReject = (m: MatchResult) => {
    const key = getMatchKey(m);
    const next = { ...connectionStatuses, [key]: 'Rejected' as const };
    saveStatuses(next);
    showToast(`Dismissed match between ${m.volunteer.name} and ${m.student.displayName}.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const key = getMatchKey(m);
      const status = connectionStatuses[key] || 'Suggested';
      if (filterMode === 'connected') return status === 'Connected';
      if (filterMode === 'high') return m.score >= 65;
      return true;
    });
  }, [matches, connectionStatuses, filterMode]);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
              Smart Volunteer-Student Matching
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Algorithmic</span>
            </span>
          </div>
          <p className="text-sm text-brand-secondary">
            Simulated matching evaluating talent category, specific discipline, schedule compatibility, and teaching mode.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-brand-border shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'all'
                ? 'bg-brand-darkest text-white'
                : 'text-brand-secondary hover:text-brand-darkest'
            }`}
          >
            All Suggestions ({matches.length})
          </button>
          <button
            onClick={() => setFilterMode('high')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'high'
                ? 'bg-brand-darkest text-white'
                : 'text-brand-secondary hover:text-brand-darkest'
            }`}
          >
            High Compatibility (&ge;65%)
          </button>
          <button
            onClick={() => setFilterMode('connected')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'connected'
                ? 'bg-brand-darkest text-white'
                : 'text-brand-secondary hover:text-brand-darkest'
            }`}
          >
            Connected
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Matches Found"
          description="Adjust your filter mode or register more students and volunteers to discover synergies."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMatches.map((m) => {
            const key = getMatchKey(m);
            const status = connectionStatuses[key] || 'Suggested';
            return (
              <MatchCard
                key={key}
                match={m}
                status={status}
                onConnect={() => handleConnect(m)}
                onReject={() => handleReject(m)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

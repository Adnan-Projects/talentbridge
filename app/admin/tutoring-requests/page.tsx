'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  UserCheck,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { TutoringRequest, RequestStatus } from '@/data/mockRequests';
import { getTutoringRequests, saveTutoringRequests, getVolunteers } from '@/lib/storage';
import { Volunteer } from '@/data/mockVolunteers';
import SearchBar from '@/components/shared/SearchBar';
import FilterBar from '@/components/shared/FilterBar';
import Badge from '@/components/shared/Badge';
import EmptyState from '@/components/shared/EmptyState';
import StatsCard from '@/components/dashboard/StatsCard';

export default function TutoringRequestsPage() {
  const [requests, setRequests] = useState<TutoringRequest[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Record<string, string>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setRequests(getTutoringRequests());
    setVolunteers(getVolunteers());
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchSearch =
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.subject.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'All' || r.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [requests, search, categoryFilter, statusFilter]);

  const handleAssignVolunteer = (requestId: string, volunteerId: string) => {
    if (!volunteerId) return;
    const v = volunteers.find((item) => item.id === volunteerId);
    const next = requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            assignedVolunteerId: volunteerId,
            status: 'In Progress' as RequestStatus,
            updatedDate: new Date().toISOString().split('T')[0],
          }
        : r
    );
    setRequests(next);
    saveTutoringRequests(next);
    setToastMsg(`Assigned volunteer ${v?.name || volunteerId} to request ${requestId}!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleIncrementSession = (requestId: string) => {
    const next = requests.map((r) => {
      if (r.id === requestId) {
        const nextCount = Math.min(r.sessionsCompleted + 1, r.totalSessionsPlanned);
        const nextStatus = nextCount === r.totalSessionsPlanned ? ('Completed' as RequestStatus) : r.status;
        return {
          ...r,
          sessionsCompleted: nextCount,
          status: nextStatus,
          updatedDate: new Date().toISOString().split('T')[0],
        };
      }
      return r;
    });
    setRequests(next);
    saveTutoringRequests(next);
    setToastMsg(`Logged session for request ${requestId}.`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
          Tutoring &amp; Coaching Requests
        </h1>
        <p className="text-sm text-brand-secondary mt-1">
          Coordinate lesson requirements, assign verified mentors, and monitor teaching schedule progress.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatsCard
          title="Total Requests"
          value={requests.length}
          icon={BookOpen}
          subtext="Academic, music &amp; sports"
        />
        <StatsCard
          title="Active Classes"
          value={requests.filter((r) => r.status === 'In Progress').length}
          icon={UserCheck}
          subtext="Weekly sessions underway"
        />
        <StatsCard
          title="Awaiting Tutor"
          value={requests.filter((r) => r.status === 'Pending' || r.status === 'Approved').length}
          icon={Clock}
          subtext="Ready for assignment"
        />
        <StatsCard
          title="Course Completed"
          value={requests.filter((r) => r.status === 'Completed').length}
          icon={CheckCircle2}
          subtext="Syllabus finished"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by student, subject, or discipline..."
          className="flex-1"
        />
        <FilterBar
          groups={[
            {
              id: 'category',
              label: 'Discipline',
              value: categoryFilter,
              onChange: setCategoryFilter,
              options: [
                { label: 'All Disciplines', value: 'All' },
                { label: 'Music', value: 'Music' },
                { label: 'Sports', value: 'Sports' },
                { label: 'Dance', value: 'Dance' },
                { label: 'Art', value: 'Art' },
                { label: 'Academic', value: 'Academic' },
                { label: 'Programming', value: 'Programming' },
              ],
            },
            {
              id: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Approved', value: 'Approved' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Completed', value: 'Completed' },
              ],
            },
          ]}
        />
      </div>

      {/* Table */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No Tutoring Requests Found"
          description="Try adjusting your filter settings or search terms."
        />
      ) : (
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Student &amp; ID</th>
                  <th className="py-4 px-4">Subject / Skill</th>
                  <th className="py-4 px-4">Schedule &amp; Mode</th>
                  <th className="py-4 px-4">Assigned Mentor</th>
                  <th className="py-4 px-4">Sessions Progress</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredRequests.map((r) => {
                  const assignedVolunteer = volunteers.find((v) => v.id === r.assignedVolunteerId);
                  const progressRatio = Math.round(
                    (r.sessionsCompleted / (r.totalSessionsPlanned || 1)) * 100
                  );

                  return (
                    <tr key={r.id} className="hover:bg-brand-light/40 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-brand-darkest text-sm">{r.studentName}</p>
                        <p className="text-[11px] text-brand-secondary font-mono">{r.id}</p>
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-bold text-brand-darkest">{r.subject}</p>
                        <span className="text-[11px] text-brand-secondary">{r.category}</span>
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-semibold text-brand-darkest">{r.preferredSchedule}</p>
                        <span className="text-[11px] text-brand-secondary">{r.teachingMode}</span>
                      </td>

                      <td className="py-4 px-4">
                        {assignedVolunteer ? (
                          <div>
                            <p className="font-bold text-brand-darkest">{assignedVolunteer.name}</p>
                            <p className="text-[10px] text-brand-secondary">{assignedVolunteer.expertise}</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <select
                              value={selectedVolunteer[r.id] || ''}
                              onChange={(e) =>
                                setSelectedVolunteer({
                                  ...selectedVolunteer,
                                  [r.id]: e.target.value,
                                })
                              }
                              className="text-[11px] bg-brand-light border border-brand-border rounded-lg px-2 py-1 text-brand-darkest"
                            >
                              <option value="">Select Volunteer...</option>
                              {volunteers.map((v) => (
                                <option key={v.id} value={v.id}>
                                  {v.name} ({v.expertise})
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssignVolunteer(r.id, selectedVolunteer[r.id])}
                              className="px-2 py-1 bg-brand-darkest text-white text-[11px] font-bold rounded-lg hover:bg-brand-dark transition-colors"
                            >
                              Assign
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-brand-light overflow-hidden">
                            <div
                              className="h-full bg-brand-darkest rounded-full"
                              style={{ width: `${progressRatio}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-brand-darkest">
                            {r.sessionsCompleted}/{r.totalSessionsPlanned}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            r.status === 'In Progress'
                              ? 'info'
                              : r.status === 'Completed'
                              ? 'success'
                              : 'warning'
                          }
                        >
                          {r.status}
                        </Badge>
                      </td>

                      <td className="py-4 px-6 text-right">
                        {r.status === 'In Progress' && (
                          <button
                            onClick={() => handleIncrementSession(r.id)}
                            className="px-2.5 py-1 rounded-lg bg-brand-light hover:bg-brand-darkest hover:text-white text-brand-darkest font-semibold transition-colors text-[11px]"
                            title="Log session completed"
                          >
                            + Log Session
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { EquipmentRequest, RequestStatus, RequestPriority } from '@/data/mockRequests';
import { getEquipmentRequests, saveEquipmentRequests, getDonations } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/utils';
import SearchBar from '@/components/shared/SearchBar';
import FilterBar from '@/components/shared/FilterBar';
import Badge from '@/components/shared/Badge';
import EmptyState from '@/components/shared/EmptyState';
import RequestProgressTracker from '@/components/equipment/RequestProgressTracker';
import StatsCard from '@/components/dashboard/StatsCard';

export default function EquipmentRequestsPage() {
  const [requests, setRequests] = useState<EquipmentRequest[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setRequests(getEquipmentRequests());
    setDonations(getDonations());
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchSearch =
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.itemRequested.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchPriority = priorityFilter === 'All' || r.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [requests, search, statusFilter, priorityFilter]);

  const updateStatus = (id: string, newStatus: RequestStatus) => {
    const next = requests.map((r) =>
      r.id === id
        ? { ...r, status: newStatus, updatedDate: new Date().toISOString().split('T')[0] }
        : r
    );
    setRequests(next);
    saveEquipmentRequests(next);
    setToastMsg(`Updated request ${id} to ${newStatus}`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const assignDonation = (requestId: string, donationId: string) => {
    const next = requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            assignedDonationId: donationId,
            status: 'Completed' as RequestStatus,
            updatedDate: new Date().toISOString().split('T')[0],
          }
        : r
    );
    setRequests(next);
    saveEquipmentRequests(next);
    setToastMsg(`Assigned donation ${donationId} and marked request fulfilled!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const priorityVariant: Record<RequestPriority, 'error' | 'warning' | 'default'> = {
    High: 'error',
    Medium: 'warning',
    Low: 'default',
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
          Equipment Request Management
        </h1>
        <p className="text-sm text-brand-secondary mt-1">
          Tracking instruments, athletic gear, and educational hardware required by enrolled students.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatsCard
          title="Total Requests"
          value={requests.length}
          icon={Package}
          subtext="Logged by coordinators"
        />
        <StatsCard
          title="Pending Approval"
          value={requests.filter((r) => r.status === 'Pending').length}
          icon={Clock}
          subtext="Need admin verification"
        />
        <StatsCard
          title="Donor Matched"
          value={requests.filter((r) => r.status === 'Donor Found').length}
          icon={Sparkles}
          subtext="Awaiting delivery"
        />
        <StatsCard
          title="Fulfilled &amp; Delivered"
          value={requests.filter((r) => r.status === 'Completed').length}
          icon={CheckCircle2}
          subtext="In student possession"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search requests by student, item, or category..."
          className="flex-1"
        />
        <FilterBar
          groups={[
            {
              id: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Approved', value: 'Approved' },
                { label: 'Donor Found', value: 'Donor Found' },
                { label: 'Completed', value: 'Completed' },
                { label: 'Rejected', value: 'Rejected' },
              ],
            },
            {
              id: 'priority',
              label: 'Priority',
              value: priorityFilter,
              onChange: setPriorityFilter,
              options: [
                { label: 'All Priorities', value: 'All' },
                { label: 'High Priority', value: 'High' },
                { label: 'Medium Priority', value: 'Medium' },
                { label: 'Low Priority', value: 'Low' },
              ],
            },
          ]}
        />
      </div>

      {/* Table */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Requests Found"
          description="Try adjusting your search criteria or filter settings."
        />
      ) : (
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Student &amp; ID</th>
                  <th className="py-4 px-4">Item Requested</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Priority</th>
                  <th className="py-4 px-4">Est. Cost</th>
                  <th className="py-4 px-4">Fulfillment Tracker</th>
                  <th className="py-4 px-6 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-brand-light/40 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-brand-darkest text-sm">{r.studentName}</p>
                      <p className="text-[11px] text-brand-secondary font-mono">{r.id}</p>
                    </td>

                    <td className="py-4 px-4 font-bold text-brand-darkest max-w-[220px]">
                      {r.itemRequested}
                    </td>

                    <td className="py-4 px-4 text-brand-secondary">{r.category}</td>

                    <td className="py-4 px-4">
                      <Badge variant={priorityVariant[r.priority]}>{r.priority}</Badge>
                    </td>

                    <td className="py-4 px-4 font-black text-brand-darkest text-sm">
                      {formatCurrency(r.estimatedCost)}
                    </td>

                    <td className="py-4 px-4">
                      <RequestProgressTracker status={r.status} />
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {r.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(r.id, 'Approved')}
                              className="px-2.5 py-1 bg-brand-darkest text-white text-[11px] font-bold rounded-lg hover:bg-brand-dark transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, 'Rejected')}
                              className="px-2.5 py-1 bg-brand-light text-brand-secondary text-[11px] font-semibold rounded-lg hover:text-brand-darkest transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {r.status === 'Approved' && (
                          <button
                            onClick={() => updateStatus(r.id, 'Donor Found')}
                            className="px-2.5 py-1 bg-brand-darkest text-white text-[11px] font-bold rounded-lg hover:bg-brand-dark transition-colors"
                          >
                            Mark Donor Found
                          </button>
                        )}

                        {r.status === 'Donor Found' && (
                          <button
                            onClick={() => updateStatus(r.id, 'Completed')}
                            className="px-2.5 py-1 bg-emerald-700 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-800 transition-colors"
                          >
                            Mark Delivered
                          </button>
                        )}

                        {r.status === 'Completed' && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Delivered
                          </span>
                        )}

                        {r.status === 'Rejected' && (
                          <button
                            onClick={() => updateStatus(r.id, 'Pending')}
                            className="px-2 py-1 bg-brand-light text-brand-secondary text-[11px] rounded-lg hover:text-brand-darkest"
                          >
                            Re-open
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

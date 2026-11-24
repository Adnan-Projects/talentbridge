'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Building2,
  Gift,
  Clock,
  Heart,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import StatsCard from '@/components/dashboard/StatsCard';
import DonationsChart from '@/components/dashboard/charts/DonationsChart';
import CategoryChart from '@/components/dashboard/charts/CategoryChart';
import VolunteerChart from '@/components/dashboard/charts/VolunteerChart';
import SponsorshipChart from '@/components/dashboard/charts/SponsorshipChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import {
  getStudents,
  getVolunteers,
  getSponsors,
  getDonations,
  getEquipmentRequests,
  getTutoringRequests,
  updateEquipmentRequest,
  updateTutoringRequest,
} from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/utils';
import { EquipmentRequest, TutoringRequest } from '@/data/mockRequests';

export default function AdminOverviewPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [eqRequests, setEqRequests] = useState<EquipmentRequest[]>([]);
  const [tutRequests, setTutRequests] = useState<TutoringRequest[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setStudents(getStudents());
    setVolunteers(getVolunteers());
    setSponsors(getSponsors());
    setDonations(getDonations());
    setEqRequests(getEquipmentRequests());
    setTutRequests(getTutoringRequests());
  }, []);

  // Compute metrics
  const totalStudents = students.length;
  const activeVolunteers = volunteers.filter((v) => v.status === 'Active').length;
  const totalSponsors = sponsors.length;
  const totalDonationValue = donations.reduce((sum, d) => sum + (d.monetaryValue || 0), 0);
  
  const pendingEq = eqRequests.filter((r) => r.status === 'Pending');
  const pendingTut = tutRequests.filter((r) => r.status === 'Pending');
  const totalPendingRequests = pendingEq.length + pendingTut.length;

  const activeMentorships = tutRequests.filter((r) => r.status === 'In Progress').length;

  // Handle Quick Approve
  const handleApproveEq = (req: EquipmentRequest) => {
    const updated = { ...req, status: 'Approved' as const, updatedDate: new Date().toISOString().split('T')[0] };
    updateEquipmentRequest(updated);
    setEqRequests(getEquipmentRequests());
    showToast(`Approved equipment request for ${req.studentName}`);
  };

  const handleRejectEq = (req: EquipmentRequest) => {
    const updated = { ...req, status: 'Rejected' as const, updatedDate: new Date().toISOString().split('T')[0] };
    updateEquipmentRequest(updated);
    setEqRequests(getEquipmentRequests());
    showToast(`Rejected equipment request for ${req.studentName}`);
  };

  const handleApproveTut = (req: TutoringRequest) => {
    const updated = { ...req, status: 'Approved' as const, updatedDate: new Date().toISOString().split('T')[0] };
    updateTutoringRequest(updated);
    setTutRequests(getTutoringRequests());
    showToast(`Approved tutoring request for ${req.studentName}`);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Prepare pending approval items
  const pendingItems = [
    ...pendingEq.map((e) => ({
      id: e.id,
      type: 'Equipment',
      student: e.studentName,
      detail: e.itemRequested,
      priority: e.priority,
      cost: `£${e.estimatedCost}`,
      raw: e,
      approve: () => handleApproveEq(e),
      reject: () => handleRejectEq(e),
    })),
    ...pendingTut.map((t) => ({
      id: t.id,
      type: 'Tutoring',
      student: t.studentName,
      detail: t.subject,
      priority: t.priority,
      cost: `${t.preferredSchedule}`,
      raw: t,
      approve: () => handleApproveTut(t),
      reject: () => {},
    })),
  ].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Toast banner */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Real-time platform metrics, volunteer activity, and support pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/matching"
            className="px-4 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Run Smart Matching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── 6 Stats Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          change="+18%"
          changeType="up"
          subtext="vs last quarter"
          icon={Users}
        />
        <StatsCard
          title="Active Volunteers"
          value={activeVolunteers}
          change="+12%"
          changeType="up"
          subtext="mentors &amp; coaches"
          icon={UserCheck}
        />
        <StatsCard
          title="Total Sponsors"
          value={totalSponsors}
          change="+8%"
          changeType="up"
          subtext="foundations &amp; corporate"
          icon={Building2}
        />
        <StatsCard
          title="Total Donations"
          value={formatCurrency(totalDonationValue)}
          change="+24%"
          changeType="up"
          subtext="gear &amp; sponsorships"
          icon={Gift}
        />
        <StatsCard
          title="Pending Requests"
          value={totalPendingRequests}
          change={totalPendingRequests > 0 ? `${totalPendingRequests} pending` : 'All clear'}
          changeType={totalPendingRequests > 0 ? 'down' : 'neutral'}
          subtext="awaiting admin review"
          icon={Clock}
        />
        <StatsCard
          title="Active Mentorships"
          value={activeMentorships}
          change="+15%"
          changeType="up"
          subtext="ongoing weekly classes"
          icon={Heart}
        />
      </div>

      {/* ── First Row of Charts (Donations + Categories) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Monthly Donations (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Monthly Donation Inflow</h3>
              <p className="text-xs text-brand-secondary mt-0.5">Financial contributions &amp; equipment valuation</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-light text-brand-darkest border border-brand-border">
              2024 YTD
            </span>
          </div>
          <DonationsChart />
        </div>

        {/* Right: Students by Category Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold text-base text-brand-darkest">Talents by Category</h3>
            <p className="text-xs text-brand-secondary mt-0.5">Distribution of supported children</p>
          </div>
          <CategoryChart />
        </div>
      </div>

      {/* ── Second Row of Charts (Volunteer Participation + Sponsorship Growth) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Volunteer Sessions (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Volunteer Sessions Delivered</h3>
              <p className="text-xs text-brand-secondary mt-0.5">Hours logged across all tutoring disciplines</p>
            </div>
            <span className="text-xs text-brand-secondary font-medium">Monthly Trend</span>
          </div>
          <VolunteerChart />
        </div>

        {/* Sponsorship Growth (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Cumulative Sponsorship Growth</h3>
              <p className="text-xs text-brand-secondary mt-0.5">Growth in multi-year funding partnerships</p>
            </div>
            <span className="text-xs text-brand-secondary font-medium">&pound; Total Inflow</span>
          </div>
          <SponsorshipChart />
        </div>
      </div>

      {/* ── Bottom Grid: Pending Approvals & Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pending Approvals Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-brand-darkest">Pending Approval Notifications</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {totalPendingRequests} Pending Action
              </span>
            </div>

            {pendingItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-brand-secondary">
                No pending requests requiring approval. All requests are up to date!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Details</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {pendingItems.map((item) => (
                      <tr key={item.id} className="hover:bg-brand-light/50 transition-colors">
                        <td className="py-3 font-semibold text-brand-darkest">
                          <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand-primary text-[10px]">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-brand-darkest">{item.student}</td>
                        <td className="py-3 text-brand-secondary max-w-xs truncate">{item.detail}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={item.approve}
                              className="px-2.5 py-1 rounded-lg bg-brand-darkest text-white font-semibold hover:bg-brand-dark transition-colors"
                              title="Approve Request"
                            >
                              Approve
                            </button>
                            <button
                              onClick={item.reject}
                              className="px-2 py-1 rounded-lg bg-brand-light text-brand-secondary hover:text-brand-darkest transition-colors"
                              title="Reject"
                            >
                              Dismiss
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-secondary">
            <span>Review requests in full detail:</span>
            <div className="flex gap-3">
              <Link href="/admin/equipment-requests" className="font-bold text-brand-darkest hover:underline">
                Equipment Requests &rarr;
              </Link>
              <Link href="/admin/tutoring-requests" className="font-bold text-brand-darkest hover:underline">
                Tutoring Requests &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed (5 cols) */}
        <div className="lg:col-span-5">
          <RecentActivity />
        </div>

      </div>
    </div>
  );
}

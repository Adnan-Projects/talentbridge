'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Download, Calendar, Filter, BarChart3, TrendingUp, Users, Heart, Gift } from 'lucide-react';
import { getStudents, getVolunteers, getSponsors, getDonations, getEquipmentRequests, getTutoringRequests } from '@/lib/storage';
import { formatCurrency, downloadCSV } from '@/lib/utils';
import StatsCard from '@/components/dashboard/StatsCard';

const PALETTE = ['#111827', '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db'];

export default function ReportsAnalyticsPage() {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  const students = useMemo(() => getStudents(), []);
  const volunteers = useMemo(() => getVolunteers(), []);
  const sponsors = useMemo(() => getSponsors(), []);
  const donations = useMemo(() => getDonations(), []);
  const eqRequests = useMemo(() => getEquipmentRequests(), []);
  const tutRequests = useMemo(() => getTutoringRequests(), []);

  // Compute stats
  const totalDonationAmount = donations.reduce((sum, d) => sum + (d.monetaryValue || 0), 0);
  const totalVolunteerHours = volunteers.reduce((sum, v) => sum + (v.totalSessions || 0) * 1.5, 0);
  const fulfillmentRate = Math.round(
    (eqRequests.filter((r) => r.status === 'Completed').length / (eqRequests.length || 1)) * 100
  );
  const activeSessions = tutRequests.filter((t) => t.status === 'In Progress').length;

  // Chart 1: Students by Talent Category
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    students.forEach((s) => {
      map[s.talentCategory] = (map[s.talentCategory] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [students]);

  // Chart 2: Donation Distribution by Category
  const donationCategoryData = useMemo(() => {
    const map: Record<string, number> = {};
    donations.forEach((d) => {
      map[d.donationCategory] = (map[d.donationCategory] || 0) + d.monetaryValue;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [donations]);

  // Chart 3: Monthly Student Enrollment Growth
  const monthlyEnrollment = [
    { month: 'Jan', count: 18 },
    { month: 'Feb', count: 24 },
    { month: 'Mar', count: 35 },
    { month: 'Apr', count: 52 },
    { month: 'May', count: 68 },
    { month: 'Jun', count: 85 },
    { month: 'Jul', count: 96 },
    { month: 'Aug', count: 110 },
    { month: 'Sep', count: 125 },
  ];

  // Chart 4: Equipment Fulfillment Status
  const fulfillmentData = [
    { status: 'Fulfilled', count: eqRequests.filter((r) => r.status === 'Completed').length },
    { status: 'In Procurement', count: eqRequests.filter((r) => r.status === 'Donor Found').length },
    { status: 'Pending Review', count: eqRequests.filter((r) => r.status === 'Pending').length },
    { status: 'Approved', count: eqRequests.filter((r) => r.status === 'Approved').length },
  ];

  // Export to CSV
  const handleExportCSV = () => {
    const exportData = students.map((s) => ({
      StudentID: s.id,
      DisplayName: s.displayName,
      Age: s.age,
      Region: s.region,
      Category: s.talentCategory,
      Skill: s.specificSkill,
      SkillLevel: s.skillLevel,
      Status: s.mentorshipStatus,
      ProgressPercent: s.progressPercent,
      JoinedDate: s.joinedDate,
    }));
    downloadCSV(exportData, `TalentBridge_Report_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Reports &amp; Impact Analytics
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Audited KPIs, donation distribution, volunteer hours, and downloadable compliance records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Date Range Filter Strip */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-brand-secondary" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Reporting Period:
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-xs bg-brand-light border border-brand-border rounded-lg px-2.5 py-1 text-brand-darkest"
          />
          <span className="text-xs text-brand-secondary">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-xs bg-brand-light border border-brand-border rounded-lg px-2.5 py-1 text-brand-darkest"
          />
        </div>

        <span className="text-xs text-brand-subtle font-medium">
          Showing real-time data across all registered modules
        </span>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Children Supported"
          value={students.length}
          change="+28%"
          changeType="up"
          subtext="across 15 skills"
          icon={Users}
        />
        <StatsCard
          title="Volunteer Hours"
          value={`${Math.round(totalVolunteerHours)} hrs`}
          change="+19%"
          changeType="up"
          subtext="mentoring &amp; training"
          icon={Heart}
        />
        <StatsCard
          title="Donations Inflow"
          value={formatCurrency(totalDonationAmount)}
          change="+34%"
          changeType="up"
          subtext="financial &amp; equipment"
          icon={Gift}
        />
        <StatsCard
          title="Equipment Fulfillment"
          value={`${fulfillmentRate}%`}
          change="+6%"
          changeType="up"
          subtext="requests successfully delivered"
          icon={TrendingUp}
        />
      </div>

      {/* Charts 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Students by Talent Category */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Students by Talent Discipline</h3>
              <p className="text-xs text-brand-secondary">Headcount distribution across disciplines</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-darkest">
              Categories
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="value" fill="#111827" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Donation Distribution Value */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Donation Allocation by Category</h3>
              <p className="text-xs text-brand-secondary">Monetary valuation share (&pound;)</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-darkest">
              Distribution
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={donationCategoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={4}
              >
                {donationCategoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => formatCurrency(Number(val))}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Cumulative Student Growth Line */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Student Enrollment Trajectory</h3>
              <p className="text-xs text-brand-secondary">Cumulative child talent registrations</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-darkest">
              2024 Growth
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyEnrollment} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb' }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#111827"
                strokeWidth={3}
                dot={{ fill: '#111827', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Equipment Fulfillment */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-brand-darkest">Equipment Fulfillment Pipeline</h3>
              <p className="text-xs text-brand-secondary">Status of all student gear requests</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-darkest">
              Pipeline
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fulfillmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="status" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="count" fill="#4b5563" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Detailed Sponsor Contribution Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border">
          <div>
            <h3 className="font-bold text-base text-brand-darkest">Sponsor &amp; Foundation Contribution Audit</h3>
            <p className="text-xs text-brand-secondary mt-0.5">Audited breakdown of funding partners and student allocations</p>
          </div>
          <span className="text-xs font-bold text-brand-secondary">{sponsors.length} Partners</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                <th className="pb-3">Sponsor / Foundation</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Total Capital</th>
                <th className="pb-3">Allocated Students</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {sponsors.map((s) => (
                <tr key={s.id} className="hover:bg-brand-light/40">
                  <td className="py-3 font-bold text-brand-darkest">{s.name}</td>
                  <td className="py-3 text-brand-secondary">{s.sponsorType}</td>
                  <td className="py-3 font-black text-brand-darkest text-sm">
                    {formatCurrency(s.totalContribution)}
                  </td>
                  <td className="py-3 text-brand-primary">{s.supportedStudentIds.length} students</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

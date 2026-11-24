'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Building2,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { Sponsor } from '@/data/mockSponsors';
import { getSponsors, saveSponsors } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';
import SearchBar from '@/components/shared/SearchBar';
import FilterBar from '@/components/shared/FilterBar';
import Badge from '@/components/shared/Badge';
import EmptyState from '@/components/shared/EmptyState';
import SponsorModal from '@/components/sponsors/SponsorModal';
import StatsCard from '@/components/dashboard/StatsCard';

export default function SponsorsManagementPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit' | 'delete'>('view');
  const [activeSponsor, setActiveSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    setSponsors(getSponsors());
  }, []);

  const filteredSponsors = useMemo(() => {
    return sponsors.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.region.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || s.sponsorType === typeFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [sponsors, search, typeFilter, statusFilter]);

  const totalFunded = useMemo(() => {
    return sponsors.reduce((acc, s) => acc + (s.totalContribution || 0), 0);
  }, [sponsors]);

  const handleOpenAdd = () => {
    setActiveSponsor(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenView = (s: Sponsor) => {
    setActiveSponsor(s);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Sponsor) => {
    setActiveSponsor(s);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (s: Sponsor) => {
    setActiveSponsor(s);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleSaveSponsor = (saved: Sponsor) => {
    let nextList: Sponsor[];
    if (modalMode === 'add') {
      nextList = [saved, ...sponsors];
    } else {
      nextList = sponsors.map((s) => (s.id === saved.id ? saved : s));
    }
    setSponsors(nextList);
    saveSponsors(nextList);
    setIsModalOpen(false);
  };

  const handleDeleteSponsor = (sponsorId: string) => {
    const nextList = sponsors.filter((s) => s.id !== sponsorId);
    setSponsors(nextList);
    saveSponsors(nextList);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Sponsor Management
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Corporate CSR partnerships, charitable foundations, grant tracking, and student sponsorships.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Sponsor</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          title="Total Partners"
          value={sponsors.length}
          icon={Building2}
          subtext="Corporate, foundation &amp; individual"
        />
        <StatsCard
          title="Total Capital Committed"
          value={formatCurrency(totalFunded)}
          icon={Coins}
          subtext="Direct student allocations"
        />
        <StatsCard
          title="Active Partnerships"
          value={sponsors.filter((s) => s.status === 'Active').length}
          icon={ShieldCheck}
          subtext="Ongoing funding programmes"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search sponsors by name, email, or region..."
          className="flex-1"
        />
        <FilterBar
          groups={[
            {
              id: 'type',
              label: 'Type',
              value: typeFilter,
              onChange: setTypeFilter,
              options: [
                { label: 'All Types', value: 'All' },
                { label: 'Corporate', value: 'Corporate' },
                { label: 'Foundation', value: 'Foundation' },
                { label: 'Individual', value: 'Individual' },
                { label: 'Government', value: 'Government' },
              ],
            },
            {
              id: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: 'All' },
                { label: 'Active', value: 'Active' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Inactive', value: 'Inactive' },
              ],
            },
          ]}
        />
      </div>

      {/* Table */}
      {filteredSponsors.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No Sponsors Found"
          description="Try modifying your search or filter settings, or record a new funding partner."
          action={{
            label: 'Add Sponsor Record',
            onClick: handleOpenAdd,
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Sponsor / Organization</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Total Contributions</th>
                  <th className="py-4 px-4">Students Supported</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Region</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredSponsors.map((s) => (
                  <tr key={s.id} className="hover:bg-brand-light/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-light border border-brand-border flex items-center justify-center font-bold text-xs text-brand-darkest flex-shrink-0">
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-brand-darkest text-sm">{s.name}</p>
                          <p className="text-[11px] text-brand-secondary">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand-darkest text-[11px] font-semibold border border-brand-border/60">
                        {s.sponsorType}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-black text-brand-darkest text-sm">
                      {formatCurrency(s.totalContribution)}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-brand-darkest">
                        {s.supportedStudentIds.length}
                      </span>{' '}
                      <span className="text-brand-secondary text-[11px]">students</span>
                    </td>

                    <td className="py-4 px-4">
                      <Badge variant={s.status === 'Active' ? 'success' : s.status === 'Pending' ? 'warning' : 'default'}>
                        {s.status}
                      </Badge>
                    </td>

                    <td className="py-4 px-4 text-brand-secondary">{s.region}</td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenView(s)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                          title="View Sponsor Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                          title="Edit Sponsor"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(s)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <SponsorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        sponsor={activeSponsor}
        onSave={handleSaveSponsor}
        onDelete={handleDeleteSponsor}
      />
    </div>
  );
}

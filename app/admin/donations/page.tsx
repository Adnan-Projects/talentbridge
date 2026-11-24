'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Gift,
  Coins,
  PackageCheck,
  Clock,
} from 'lucide-react';
import { Donation } from '@/data/mockDonations';
import { getDonations, saveDonations, getStudents } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/utils';
import SearchBar from '@/components/shared/SearchBar';
import FilterBar from '@/components/shared/FilterBar';
import Badge from '@/components/shared/Badge';
import EmptyState from '@/components/shared/EmptyState';
import DonationModal from '@/components/donations/DonationModal';
import StatsCard from '@/components/dashboard/StatsCard';

export default function DonationsManagementPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit' | 'delete'>('view');
  const [activeDonation, setActiveDonation] = useState<Donation | null>(null);

  useEffect(() => {
    setDonations(getDonations());
    setStudents(getStudents());
  }, []);

  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const matchSearch =
        d.donorName.toLowerCase().includes(search.toLowerCase()) ||
        d.itemOrAmount.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'All' || d.donationCategory === categoryFilter;
      const matchStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [donations, search, categoryFilter, statusFilter]);

  const totalValue = useMemo(() => {
    return donations.reduce((acc, d) => acc + (d.monetaryValue || 0), 0);
  }, [donations]);

  const handleOpenAdd = () => {
    setActiveDonation(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenView = (d: Donation) => {
    setActiveDonation(d);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: Donation) => {
    setActiveDonation(d);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (d: Donation) => {
    setActiveDonation(d);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleSaveDonation = (saved: Donation) => {
    let nextList: Donation[];
    if (modalMode === 'add') {
      nextList = [saved, ...donations];
    } else {
      nextList = donations.map((d) => (d.id === saved.id ? saved : d));
    }
    setDonations(nextList);
    saveDonations(nextList);
    setIsModalOpen(false);
  };

  const handleDeleteDonation = (donationId: string) => {
    const nextList = donations.filter((d) => d.id !== donationId);
    setDonations(nextList);
    saveDonations(nextList);
    setIsModalOpen(false);
  };

  const statusVariantMap: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
    Distributed: 'success',
    Received: 'info',
    Approved: 'default',
    Pending: 'warning',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Donation Management
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Tracking sports equipment, instruments, art supplies, and financial grants through distribution.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record Donation</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatsCard
          title="Total Donations"
          value={donations.length}
          icon={Gift}
          subtext="Logged in system"
        />
        <StatsCard
          title="Valuation Sum"
          value={formatCurrency(totalValue)}
          icon={Coins}
          subtext="Gear &amp; capital gifts"
        />
        <StatsCard
          title="Distributed to Students"
          value={donations.filter((d) => d.status === 'Distributed').length}
          icon={PackageCheck}
          subtext="In children's hands"
        />
        <StatsCard
          title="Pending Inflow"
          value={donations.filter((d) => d.status === 'Pending').length}
          icon={Clock}
          subtext="Awaiting shipment/check"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search donations by donor, item, or ID..."
          className="flex-1"
        />
        <FilterBar
          groups={[
            {
              id: 'category',
              label: 'Category',
              value: categoryFilter,
              onChange: setCategoryFilter,
              options: [
                { label: 'All Categories', value: 'All' },
                { label: 'Musical Instruments', value: 'Musical Instruments' },
                { label: 'Sports Equipment', value: 'Sports Equipment' },
                { label: 'Art Supplies', value: 'Art Supplies' },
                { label: 'Educational Materials', value: 'Educational Materials' },
                { label: 'Financial', value: 'Financial' },
                { label: 'Electronics', value: 'Electronics' },
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
                { label: 'Received', value: 'Received' },
                { label: 'Distributed', value: 'Distributed' },
              ],
            },
          ]}
        />
      </div>

      {/* Table */}
      {filteredDonations.length === 0 ? (
        <EmptyState
          icon={Gift}
          title="No Donations Found"
          description="Try modifying your search or filter settings, or record a new donation."
          action={{
            label: 'Record Donation',
            onClick: handleOpenAdd,
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">ID &amp; Donor</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Item / Amount</th>
                  <th className="py-4 px-4">Valuation</th>
                  <th className="py-4 px-4">Assigned Student</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredDonations.map((d) => {
                  const studentName = d.associatedStudentId
                    ? students.find((s) => s.id === d.associatedStudentId)?.displayName || d.associatedStudentId
                    : 'Pool';
                  return (
                    <tr key={d.id} className="hover:bg-brand-light/40 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-brand-darkest text-sm">{d.donorName}</p>
                        <p className="text-[11px] text-brand-secondary font-mono">{d.id}</p>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand-darkest text-[11px] font-semibold border border-brand-border/60">
                          {d.donationCategory}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-bold text-brand-darkest max-w-[200px] truncate">
                        {d.itemOrAmount}
                      </td>

                      <td className="py-4 px-4 font-black text-brand-darkest text-sm">
                        {formatCurrency(d.monetaryValue)}
                      </td>

                      <td className="py-4 px-4 text-brand-primary">
                        {studentName === 'Pool' ? (
                          <span className="text-brand-subtle italic">General Pool</span>
                        ) : (
                          <span className="font-semibold text-brand-darkest">{studentName}</span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant={statusVariantMap[d.status] || 'default'}>
                          {d.status}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-brand-secondary font-medium">
                        {formatDate(d.date)}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenView(d)}
                            className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                            title="View Donation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(d)}
                            className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                            title="Edit Donation"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(d)}
                            className="p-1.5 rounded-lg text-brand-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        donation={activeDonation}
        onSave={handleSaveDonation}
        onDelete={handleDeleteDonation}
      />
    </div>
  );
}

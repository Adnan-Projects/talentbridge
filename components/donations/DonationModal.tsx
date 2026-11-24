'use client';

import { useState, useEffect } from 'react';
import { Donation, DonationCategory, DonationStatus } from '@/data/mockDonations';
import Modal from '@/components/shared/Modal';
import { generateId, formatCurrency } from '@/lib/utils';
import { getStudents } from '@/lib/storage';
import { Student } from '@/data/mockStudents';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'add' | 'edit' | 'delete';
  donation: Donation | null;
  onSave: (donation: Donation) => void;
  onDelete: (donationId: string) => void;
}

const CATEGORIES: DonationCategory[] = [
  'Musical Instruments',
  'Sports Equipment',
  'Art Supplies',
  'Educational Materials',
  'Financial',
  'Electronics',
];
const STATUSES: DonationStatus[] = ['Pending', 'Approved', 'Received', 'Distributed'];

export default function DonationModal({
  isOpen,
  onClose,
  mode,
  donation,
  onSave,
  onDelete,
}: DonationModalProps) {
  const [formData, setFormData] = useState<Partial<Donation>>({});
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(getStudents());
    if (donation && (mode === 'edit' || mode === 'view')) {
      setFormData(donation);
    } else if (mode === 'add') {
      setFormData({
        donorName: '',
        donorEmail: '',
        donationCategory: 'Musical Instruments',
        itemOrAmount: '',
        monetaryValue: 250,
        status: 'Pending',
        notes: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [donation, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donorName || !formData.itemOrAmount) return;

    const donationToSave: Donation = {
      id: donation?.id || generateId('DON'),
      donorName: formData.donorName || 'Anonymous Donor',
      donorEmail: formData.donorEmail || 'donor@example.com',
      donationCategory: formData.donationCategory || 'Musical Instruments',
      itemOrAmount: formData.itemOrAmount || '',
      monetaryValue: Number(formData.monetaryValue) || 0,
      date: formData.date || new Date().toISOString().split('T')[0],
      associatedStudentId: formData.associatedStudentId,
      status: formData.status || 'Pending',
      notes: formData.notes || '',
      sponsorId: donation?.sponsorId,
    };

    onSave(donationToSave);
  };

  const titleMap = {
    view: `Donation Record: ${donation?.id || ''}`,
    add: 'Record New Donation',
    edit: `Update Donation: ${donation?.id || ''}`,
    delete: 'Delete Donation Record',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleMap[mode]} size={mode === 'delete' ? 'sm' : 'md'}>
      {mode === 'delete' && donation && (
        <div className="space-y-4">
          <p className="text-sm text-brand-secondary">
            Are you sure you want to remove donation record <strong className="text-brand-darkest">{donation.id}</strong> ({donation.itemOrAmount})?
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-brand-secondary">
              Cancel
            </button>
            <button
              onClick={() => onDelete(donation.id)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* View Mode */}
      {mode === 'view' && donation && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <div>
              <span className="text-xs font-bold text-brand-subtle uppercase tracking-wider">
                {donation.id} &middot; {donation.donationCategory}
              </span>
              <h3 className="text-lg font-bold text-brand-darkest mt-0.5">{donation.itemOrAmount}</h3>
              <p className="text-xs text-brand-secondary">Donor: {donation.donorName} ({donation.donorEmail})</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-brand-darkest">{formatCurrency(donation.monetaryValue)}</span>
              <p className="text-[10px] text-brand-secondary font-medium">Estimated Value</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Fulfillment Status
              </span>
              <p className="font-bold text-brand-darkest text-sm">{donation.status}</p>
              <span className="text-[11px] text-brand-secondary">Logged on {donation.date}</span>
            </div>

            <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Associated Student
              </span>
              <p className="font-bold text-brand-darkest text-sm">
                {donation.associatedStudentId
                  ? students.find((s) => s.id === donation.associatedStudentId)?.displayName || donation.associatedStudentId
                  : 'Unassigned (General Pool)'}
              </p>
              <span className="text-[11px] text-brand-secondary">Direct Allocation</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-1">
              Internal Delivery Notes
            </h4>
            <p className="text-xs sm:text-sm text-brand-primary bg-brand-offwhite p-3.5 rounded-xl border border-brand-border/60 leading-relaxed">
              {donation.notes || 'No specific notes recorded.'}
            </p>
          </div>
        </div>
      )}

      {/* Add / Edit Form */}
      {(mode === 'add' || mode === 'edit') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Donor Name *</label>
              <input
                type="text"
                required
                value={formData.donorName || ''}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                placeholder="Individual or Org Name"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Donor Email</label>
              <input
                type="email"
                value={formData.donorEmail || ''}
                onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                placeholder="donor@example.com"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Category</label>
              <select
                value={formData.donationCategory || 'Musical Instruments'}
                onChange={(e) => setFormData({ ...formData, donationCategory: e.target.value as DonationCategory })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Status</label>
              <select
                value={formData.status || 'Pending'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DonationStatus })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">
                Item Description or Amount *
              </label>
              <input
                type="text"
                required
                value={formData.itemOrAmount || ''}
                onChange={(e) => setFormData({ ...formData, itemOrAmount: e.target.value })}
                placeholder="e.g. 1× Acoustic Guitar or £500"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Monetary Valuation (&pound;)</label>
              <input
                type="number"
                min={0}
                value={formData.monetaryValue || 0}
                onChange={(e) => setFormData({ ...formData, monetaryValue: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-secondary mb-1">Assign to Student (Optional)</label>
            <select
              value={formData.associatedStudentId || ''}
              onChange={(e) => setFormData({ ...formData, associatedStudentId: e.target.value || undefined })}
              className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
            >
              <option value="">General Equipment Pool (Unassigned)</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.displayName} ({s.specificSkill}, {s.region})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-secondary mb-1">Fulfillment Notes</label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Delivery tracking, accessories included..."
              className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-brand-secondary hover:text-brand-darkest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark shadow-sm"
            >
              {mode === 'add' ? 'Record Donation' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

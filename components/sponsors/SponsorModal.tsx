'use client';

import { useState, useEffect } from 'react';
import { Sponsor, SponsorType, SponsorStatus, SponsorContribution } from '@/data/mockSponsors';
import Modal from '@/components/shared/Modal';
import { generateId, formatCurrency } from '@/lib/utils';
import { getStudents } from '@/lib/storage';
import { Student } from '@/data/mockStudents';
import { Building2, Calendar, Gift, User, CheckCircle } from 'lucide-react';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'add' | 'edit' | 'delete';
  sponsor: Sponsor | null;
  onSave: (sponsor: Sponsor) => void;
  onDelete: (sponsorId: string) => void;
}

const TYPES: SponsorType[] = ['Corporate', 'Foundation', 'Individual', 'Government'];
const STATUSES: SponsorStatus[] = ['Active', 'Pending', 'Inactive'];

export default function SponsorModal({
  isOpen,
  onClose,
  mode,
  sponsor,
  onSave,
  onDelete,
}: SponsorModalProps) {
  const [formData, setFormData] = useState<Partial<Sponsor>>({});
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(getStudents());
    if (sponsor && (mode === 'edit' || mode === 'view')) {
      setFormData(sponsor);
    } else if (mode === 'add') {
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        sponsorType: 'Corporate',
        status: 'Active',
        totalContribution: 0,
        supportedStudentIds: [],
        contributions: [],
        bio: '',
        region: 'London',
      });
    }
  }, [sponsor, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const sponsorToSave: Sponsor = {
      id: sponsor?.id || generateId('SPO'),
      name: formData.name || '',
      organization: formData.organization || formData.name,
      email: formData.email || 'sponsor@example.com',
      phone: formData.phone || '+44 20 7000 0000',
      sponsorType: formData.sponsorType || 'Corporate',
      status: formData.status || 'Active',
      imageUrl:
        formData.imageUrl ||
        `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
          formData.name || 'Sponsor'
        )}&backgroundColor=e5e7eb`,
      contributions: sponsor?.contributions || [],
      totalContribution: Number(formData.totalContribution) || 0,
      supportedStudentIds: sponsor?.supportedStudentIds || [],
      joinedDate: sponsor?.joinedDate || new Date().toISOString().split('T')[0],
      bio: formData.bio || '',
      region: formData.region || 'London',
    };

    onSave(sponsorToSave);
  };

  const titleMap = {
    view: `Sponsor Profile: ${sponsor?.name || ''}`,
    add: 'Enroll New Sponsor / Foundation',
    edit: `Edit Sponsor: ${sponsor?.name || ''}`,
    delete: 'Delete Sponsor Record',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleMap[mode]} size={mode === 'delete' ? 'sm' : 'lg'}>
      {mode === 'delete' && sponsor && (
        <div className="space-y-4">
          <p className="text-sm text-brand-secondary">
            Are you sure you want to remove <strong className="text-brand-darkest">{sponsor.name}</strong> ({sponsor.id})? This will detach related sponsorship logs.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-brand-secondary">
              Cancel
            </button>
            <button
              onClick={() => onDelete(sponsor.id)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* View Mode */}
      {mode === 'view' && sponsor && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-brand-border">
            <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-darkest font-bold text-xl border border-brand-border">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-brand-darkest">{sponsor.name}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-light text-brand-secondary font-medium">
                  {sponsor.sponsorType}
                </span>
              </div>
              <p className="text-xs text-brand-secondary mt-0.5">
                {sponsor.region} &middot; Joined {sponsor.joinedDate} &middot; Status: <strong className="text-brand-darkest">{sponsor.status}</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-brand-offwhite rounded-2xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Cumulative Contributions
              </span>
              <p className="text-2xl font-black text-brand-darkest">
                {formatCurrency(sponsor.totalContribution)}
              </p>
              <span className="text-[11px] text-brand-secondary">
                {sponsor.contributions.length} recorded grant disbursements
              </span>
            </div>

            <div className="p-4 bg-brand-offwhite rounded-2xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Contact Details
              </span>
              <p className="font-semibold text-brand-darkest text-sm">{sponsor.email}</p>
              <span className="text-[11px] text-brand-secondary">{sponsor.phone}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Sponsor Overview / CSR Mission
            </h4>
            <p className="text-sm text-brand-primary leading-relaxed bg-brand-offwhite p-4 rounded-xl border border-brand-border/60">
              {sponsor.bio || 'Committed to youth empowerment through social welfare and education.'}
            </p>
          </div>

          {/* Supported Students */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Directly Supported Students ({sponsor.supportedStudentIds.length})
            </h4>
            {sponsor.supportedStudentIds.length === 0 ? (
              <p className="text-xs text-brand-secondary italic">Funds allocated to general equipment pool.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {sponsor.supportedStudentIds.map((id) => {
                  const s = students.find((item) => item.id === id);
                  return (
                    <span
                      key={id}
                      className="px-3 py-1.5 bg-brand-light text-brand-darkest text-xs font-semibold rounded-xl border border-brand-border flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{s ? `${s.displayName} (${s.specificSkill})` : id}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contribution History Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Contribution History
            </h4>
            {sponsor.contributions.length === 0 ? (
              <p className="text-xs text-brand-secondary italic">No logged disbursements yet.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sponsor.contributions.map((con) => (
                  <div
                    key={con.id}
                    className="p-3 bg-white rounded-xl border border-brand-border flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-brand-darkest">{con.description}</p>
                      <p className="text-[11px] text-brand-secondary">
                        {con.type} &middot; {con.date}
                      </p>
                    </div>
                    <span className="font-bold text-brand-darkest text-sm">
                      {formatCurrency(con.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Form */}
      {(mode === 'add' || mode === 'edit') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">
                Sponsor / Organization Name *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Acme Foundation"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Sponsor Type</label>
              <select
                value={formData.sponsorType || 'Corporate'}
                onChange={(e) => setFormData({ ...formData, sponsorType: e.target.value as SponsorType })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Status</label>
              <select
                value={formData.status || 'Active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as SponsorStatus })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">
                Total Contribution (&pound;)
              </label>
              <input
                type="number"
                min={0}
                value={formData.totalContribution || 0}
                onChange={(e) => setFormData({ ...formData, totalContribution: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Region</label>
              <input
                type="text"
                value={formData.region || ''}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="e.g. London"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@sponsor.com"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 20 7000 0000"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-secondary mb-1">Bio / CSR Focus</label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="CSR mission, endowment parameters..."
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
              {mode === 'add' ? 'Add Sponsor' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

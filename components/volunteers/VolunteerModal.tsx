'use client';

import { useState, useEffect } from 'react';
import { Volunteer, TeachingMode, VolunteerStatus } from '@/data/mockVolunteers';
import { Student } from '@/data/mockStudents';
import Modal from '@/components/shared/Modal';
import { generateId } from '@/lib/utils';
import { findMatchesForVolunteer, MatchResult } from '@/lib/matching';
import { getStudents } from '@/lib/storage';
import Image from 'next/image';
import { Star, Shuffle, CheckCircle, Clock } from 'lucide-react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'add' | 'edit' | 'delete' | 'match';
  volunteer: Volunteer | null;
  onSave: (volunteer: Volunteer) => void;
  onDelete: (volunteerId: string) => void;
  onAssignStudent?: (volunteerId: string, studentId: string) => void;
}

const MODES: TeachingMode[] = ['Both', 'In-Person', 'Online'];
const STATUSES: VolunteerStatus[] = ['Active', 'Pending Review', 'Inactive'];

export default function VolunteerModal({
  isOpen,
  onClose,
  mode,
  volunteer,
  onSave,
  onDelete,
  onAssignStudent,
}: VolunteerModalProps) {
  const [formData, setFormData] = useState<Partial<Volunteer>>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [assignedSuccess, setAssignedSuccess] = useState<string | null>(null);

  useEffect(() => {
    const allStudents = getStudents();
    setStudents(allStudents);

    if (volunteer && (mode === 'edit' || mode === 'view' || mode === 'match')) {
      setFormData(volunteer);
      if (mode === 'match') {
        const results = findMatchesForVolunteer(volunteer, allStudents);
        setMatches(results);
      }
    } else if (mode === 'add') {
      setFormData({
        name: '',
        expertise: 'Violin',
        skills: ['Violin', 'Music Theory'],
        experience: '5 years teaching',
        bio: '',
        availability: ['Weekends'],
        teachingMode: 'Both',
        region: 'London',
        email: '',
        phone: '',
        status: 'Active',
        assignedStudentIds: [],
        totalSessions: 0,
        rating: 5.0,
      });
    }
    setAssignedSuccess(null);
  }, [volunteer, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.expertise) return;

    const volunteerToSave: Volunteer = {
      id: volunteer?.id || generateId('VOL'),
      name: formData.name || 'Anonymous Volunteer',
      imageUrl:
        formData.imageUrl ||
        `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(
          formData.name || 'Volunteer'
        )}&backgroundColor=c0aede`,
      expertise: formData.expertise || '',
      skills: Array.isArray(formData.skills)
        ? formData.skills
        : typeof formData.skills === 'string'
        ? (formData.skills as string).split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      experience: formData.experience || '3 years',
      bio: formData.bio || '',
      availability: formData.availability || ['Weekends'],
      teachingMode: formData.teachingMode || 'Both',
      region: formData.region || 'London',
      email: formData.email || 'volunteer@example.com',
      phone: formData.phone || '+44 7700 900000',
      status: formData.status || 'Active',
      assignedStudentIds: volunteer?.assignedStudentIds || [],
      joinedDate: volunteer?.joinedDate || new Date().toISOString().split('T')[0],
      totalSessions: volunteer?.totalSessions || 0,
      rating: volunteer?.rating || 5.0,
    };

    onSave(volunteerToSave);
  };

  const handleConnect = (studentId: string) => {
    if (volunteer && onAssignStudent) {
      onAssignStudent(volunteer.id, studentId);
      setAssignedSuccess(studentId);
    }
  };

  const titleMap = {
    view: `Volunteer Profile: ${volunteer?.name || ''}`,
    add: 'Register New Volunteer',
    edit: `Edit Volunteer: ${volunteer?.name || ''}`,
    delete: 'Delete Volunteer Record',
    match: `Smart Matches for ${volunteer?.name || ''}`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleMap[mode]} size={mode === 'match' ? 'xl' : 'lg'}>
      {mode === 'delete' && volunteer && (
        <div className="space-y-4">
          <p className="text-sm text-brand-secondary">
            Are you sure you want to remove <strong className="text-brand-darkest">{volunteer.name}</strong> ({volunteer.id})? This will unassign any active sessions.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-brand-secondary">
              Cancel
            </button>
            <button
              onClick={() => onDelete(volunteer.id)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* Match mode: Shows matching students for this volunteer */}
      {mode === 'match' && volunteer && (
        <div className="space-y-6">
          <div className="p-4 bg-brand-offwhite rounded-2xl border border-brand-border flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-brand-secondary">
                Finding Students For:
              </p>
              <h4 className="text-base font-bold text-brand-darkest mt-0.5">
                {volunteer.name} &mdash; {volunteer.expertise} ({volunteer.teachingMode})
              </h4>
              <p className="text-xs text-brand-secondary">
                Availability: {volunteer.availability.join(', ')} &middot; Region: {volunteer.region}
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white rounded-full border border-brand-border text-brand-darkest">
              {matches.length} Candidates
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="py-8 text-center text-xs text-brand-secondary">
              No direct candidate matches found with score &ge; 25%.
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {matches.map((m) => {
                const isAssigned =
                  volunteer.assignedStudentIds.includes(m.student.id) || assignedSuccess === m.student.id;
                return (
                  <div
                    key={m.student.id}
                    className="p-5 bg-white rounded-2xl border border-brand-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-light border border-brand-border flex-shrink-0">
                        <Image src={m.student.imageUrl} alt={m.student.displayName} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-brand-darkest text-sm">{m.student.displayName}</h5>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-brand-light text-brand-primary">
                            Age {m.student.age}
                          </span>
                        </div>
                        <p className="text-xs text-brand-secondary">
                          {m.student.talentCategory} &middot; {m.student.specificSkill} ({m.student.skillLevel}) &middot; {m.student.region}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {m.reasons.map((r, i) => (
                            <span key={i} className="text-[10px] bg-brand-offwhite text-brand-primary px-2 py-0.5 rounded border border-brand-border/60">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-brand-border">
                      <div className="text-right">
                        <span className="text-lg font-black text-emerald-700">{m.score}%</span>
                        <p className="text-[10px] text-brand-subtle uppercase font-semibold">Match Score</p>
                      </div>

                      {isAssigned ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Connected</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleConnect(m.student.id)}
                          className="px-4 py-2 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark shadow-sm transition-colors"
                        >
                          Connect Student
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* View mode */}
      {mode === 'view' && volunteer && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-brand-border">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-light border border-brand-border">
              <Image src={volunteer.imageUrl} alt={volunteer.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-brand-darkest">{volunteer.name}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-light text-brand-secondary border border-brand-border font-medium">
                  {volunteer.id}
                </span>
              </div>
              <p className="text-xs text-brand-secondary mt-0.5">
                {volunteer.expertise} Specialist &middot; {volunteer.experience} &middot; {volunteer.region}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{volunteer.rating} rating</span>
                <span className="text-brand-subtle font-normal">({volunteer.totalSessions} sessions logged)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Teaching Mode &amp; Availability
              </span>
              <p className="font-semibold text-brand-darkest text-sm">{volunteer.teachingMode}</p>
              <span className="text-[11px] text-brand-secondary">{volunteer.availability.join(', ')}</span>
            </div>

            <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Contact &amp; Status
              </span>
              <p className="font-semibold text-brand-darkest text-sm">{volunteer.email}</p>
              <span className="text-[11px] text-brand-secondary">{volunteer.phone}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Volunteer Bio &amp; Pedagogy
            </h4>
            <p className="text-sm text-brand-primary leading-relaxed bg-brand-offwhite p-4 rounded-xl border border-brand-border/60">
              {volunteer.bio}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Assigned Students ({volunteer.assignedStudentIds.length})
            </h4>
            {volunteer.assignedStudentIds.length === 0 ? (
              <p className="text-xs text-brand-secondary italic">No students currently assigned.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {volunteer.assignedStudentIds.map((id) => {
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
        </div>
      )}

      {/* Add / Edit Form */}
      {(mode === 'add' || mode === 'edit') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Johnathan Miller"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Primary Expertise *</label>
              <input
                type="text"
                required
                value={formData.expertise || ''}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                placeholder="e.g. Violin, Football, Mathematics"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Experience *</label>
              <input
                type="text"
                required
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 8 years teaching"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Teaching Mode</label>
              <select
                value={formData.teachingMode || 'Both'}
                onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value as TeachingMode })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              >
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Status</label>
              <select
                value={formData.status || 'Active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as VolunteerStatus })}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Region</label>
              <input
                type="text"
                value={formData.region || ''}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="e.g. West Midlands"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7700 900000"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-secondary mb-1">Bio &amp; Teaching Philosophy</label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Background, certifications, coaching style..."
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
              {mode === 'add' ? 'Register Volunteer' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

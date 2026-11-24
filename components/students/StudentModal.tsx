'use client';

import { useState, useEffect } from 'react';
import { Student, TalentCategory, SkillLevel, SupportStatus } from '@/data/mockStudents';
import Modal from '@/components/shared/Modal';
import { generateId } from '@/lib/utils';
import Image from 'next/image';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'add' | 'edit' | 'delete';
  student: Student | null;
  onSave: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const CATEGORIES: TalentCategory[] = ['Music', 'Sports', 'Dance', 'Art', 'Academic', 'Cricket', 'Programming'];
const SKILL_LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const STATUSES: SupportStatus[] = ['Active', 'Pending', 'Waitlisted', 'Completed'];

export default function StudentModal({
  isOpen,
  onClose,
  mode,
  student,
  onSave,
  onDelete,
}: StudentModalProps) {
  const [formData, setFormData] = useState<Partial<Student>>({});

  useEffect(() => {
    if (student && (mode === 'edit' || mode === 'view')) {
      setFormData(student);
    } else if (mode === 'add') {
      setFormData({
        displayName: '',
        age: 12,
        region: 'London',
        talentCategory: 'Music',
        specificSkill: '',
        skillLevel: 'Beginner',
        bio: '',
        equipmentNeeded: [],
        tutoringNeeded: [],
        mentorshipStatus: 'Pending',
        progressPercent: 10,
        availability: ['Weekends'],
        achievements: [],
      });
    }
  }, [student, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName || !formData.specificSkill) return;

    const studentToSave: Student = {
      id: student?.id || generateId('STU'),
      displayName: formData.displayName || 'Anonymous Student',
      age: Number(formData.age) || 12,
      region: formData.region || 'London',
      talentCategory: formData.talentCategory || 'Music',
      specificSkill: formData.specificSkill || '',
      skillLevel: formData.skillLevel || 'Beginner',
      bio: formData.bio || '',
      equipmentNeeded: Array.isArray(formData.equipmentNeeded)
        ? formData.equipmentNeeded
        : typeof formData.equipmentNeeded === 'string'
        ? (formData.equipmentNeeded as string).split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      tutoringNeeded: Array.isArray(formData.tutoringNeeded)
        ? formData.tutoringNeeded
        : typeof formData.tutoringNeeded === 'string'
        ? (formData.tutoringNeeded as string).split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      mentorshipStatus: formData.mentorshipStatus || 'Pending',
      progressPercent: Number(formData.progressPercent) || 0,
      imageUrl:
        formData.imageUrl ||
        `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(
          formData.displayName || 'Student'
        )}&backgroundColor=b6e3f4`,
      availability: formData.availability || ['Weekends'],
      joinedDate: student?.joinedDate || new Date().toISOString().split('T')[0],
      achievements: formData.achievements || [],
    };

    onSave(studentToSave);
  };

  const titleMap = {
    view: `Student Profile: ${student?.displayName || ''}`,
    add: 'Enroll New Student Record',
    edit: `Edit Student: ${student?.displayName || ''}`,
    delete: `Delete Student Record`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleMap[mode]} size={mode === 'delete' ? 'sm' : 'lg'}>
      {mode === 'delete' && student && (
        <div className="space-y-4">
          <p className="text-sm text-brand-secondary">
            Are you sure you want to remove <strong className="text-brand-darkest">{student.displayName}</strong> ({student.id})? This will delete the record from simulated local storage.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-brand-secondary hover:text-brand-darkest"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {mode === 'view' && student && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-brand-border">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-light border border-brand-border">
              <Image src={student.imageUrl} alt={student.displayName} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-brand-darkest">{student.displayName}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-light text-brand-secondary border border-brand-border font-medium">
                  {student.id}
                </span>
              </div>
              <p className="text-xs text-brand-secondary mt-0.5">
                Age {student.age} &middot; {student.region} &middot; Joined {student.joinedDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Talent &amp; Skill
              </span>
              <p className="font-semibold text-brand-darkest text-sm">
                {student.talentCategory} &mdash; {student.specificSkill}
              </p>
              <span className="text-[11px] text-brand-secondary">Level: {student.skillLevel}</span>
            </div>

            <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <span className="font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                Mentorship Status
              </span>
              <p className="font-semibold text-brand-darkest text-sm">{student.mentorshipStatus}</p>
              <span className="text-[11px] text-brand-secondary">Milestone Progress: {student.progressPercent}%</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Background &amp; Story
            </h4>
            <p className="text-sm text-brand-primary leading-relaxed bg-brand-offwhite p-4 rounded-xl border border-brand-border/60">
              {student.bio}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <h5 className="font-bold text-brand-darkest mb-2">Required Equipment</h5>
              <ul className="space-y-1 text-brand-secondary list-disc pl-4">
                {student.equipmentNeeded.map((eq, i) => (
                  <li key={i}>{eq}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-brand-offwhite rounded-xl border border-brand-border/60">
              <h5 className="font-bold text-brand-darkest mb-2">Tutoring Requirements</h5>
              <ul className="space-y-1 text-brand-secondary list-disc pl-4">
                {student.tutoringNeeded.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {student.achievements && student.achievements.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
                Honors &amp; Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.achievements.map((ach, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200"
                  >
                    {ach}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(mode === 'add' || mode === 'edit') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-brand-secondary mb-1">
                Display Name (Anonymized) *
              </label>
              <input
                type="text"
                required
                value={formData.displayName || ''}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="e.g. Maya T."
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Age *</label>
              <input
                type="number"
                min={5}
                max={18}
                required
                value={formData.age || 12}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">General Region *</label>
              <input
                type="text"
                required
                value={formData.region || ''}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="e.g. Manchester"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Category *</label>
              <select
                value={formData.talentCategory || 'Music'}
                onChange={(e) => setFormData({ ...formData, talentCategory: e.target.value as TalentCategory })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Specific Skill *</label>
              <input
                type="text"
                required
                value={formData.specificSkill || ''}
                onChange={(e) => setFormData({ ...formData, specificSkill: e.target.value })}
                placeholder="e.g. Cello, Sprinting"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Skill Level</label>
              <select
                value={formData.skillLevel || 'Beginner'}
                onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as SkillLevel })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              >
                {SKILL_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">Mentorship Status</label>
              <select
                value={formData.mentorshipStatus || 'Pending'}
                onChange={(e) => setFormData({ ...formData, mentorshipStatus: e.target.value as SupportStatus })}
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
              <label className="block text-xs font-bold text-brand-secondary mb-1">Progress % (0-100)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.progressPercent || 0}
                onChange={(e) => setFormData({ ...formData, progressPercent: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-secondary mb-1">Background Bio</label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Child's journey, passions, aspirations..."
              className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">
                Equipment Needed (comma separated)
              </label>
              <input
                type="text"
                value={
                  Array.isArray(formData.equipmentNeeded)
                    ? formData.equipmentNeeded.join(', ')
                    : formData.equipmentNeeded || ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    equipmentNeeded: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                placeholder="e.g. Violin 3/4, Rosin, Stand"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary mb-1">
                Tutoring Needed (comma separated)
              </label>
              <input
                type="text"
                value={
                  Array.isArray(formData.tutoringNeeded)
                    ? formData.tutoringNeeded.join(', ')
                    : formData.tutoringNeeded || ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tutoringNeeded: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                placeholder="e.g. Weekly lessons, Sight reading"
                className="w-full px-3 py-2 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest focus:outline-none focus:border-brand-primary"
              />
            </div>
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
              {mode === 'add' ? 'Add Student' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

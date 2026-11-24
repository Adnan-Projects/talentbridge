'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Student } from '@/data/mockStudents';
import { getStudents, saveStudents } from '@/lib/storage';
import SearchBar from '@/components/shared/SearchBar';
import FilterBar from '@/components/shared/FilterBar';
import Badge from '@/components/shared/Badge';
import EmptyState from '@/components/shared/EmptyState';
import StudentModal from '@/components/students/StudentModal';

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit' | 'delete'>('view');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.displayName.toLowerCase().includes(search.toLowerCase()) ||
        s.specificSkill.toLowerCase().includes(search.toLowerCase()) ||
        s.region.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'All' || s.talentCategory === categoryFilter;
      const matchStatus = statusFilter === 'All' || s.mentorshipStatus === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [students, search, categoryFilter, statusFilter]);

  const handleOpenAdd = () => {
    setActiveStudent(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenView = (s: Student) => {
    setActiveStudent(s);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Student) => {
    setActiveStudent(s);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (s: Student) => {
    setActiveStudent(s);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleSaveStudent = (saved: Student) => {
    let nextList: Student[];
    if (modalMode === 'add') {
      nextList = [saved, ...students];
    } else {
      nextList = students.map((s) => (s.id === saved.id ? saved : s));
    }
    setStudents(nextList);
    saveStudents(nextList);
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (studentId: string) => {
    const nextList = students.filter((s) => s.id !== studentId);
    setStudents(nextList);
    saveStudents(nextList);
    setIsModalOpen(false);
  };

  const statusVariantMap: Record<string, 'success' | 'warning' | 'purple' | 'default'> = {
    Active: 'success',
    Pending: 'warning',
    Waitlisted: 'purple',
    Completed: 'default',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Student Management
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Registered talents, safeguarding profiles, equipment status, and development progress.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search students by name, skill, region, or ID..."
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
                { label: 'Music', value: 'Music' },
                { label: 'Sports', value: 'Sports' },
                { label: 'Dance', value: 'Dance' },
                { label: 'Art', value: 'Art' },
                { label: 'Academic', value: 'Academic' },
                { label: 'Cricket', value: 'Cricket' },
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
                { label: 'Active', value: 'Active' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Waitlisted', value: 'Waitlisted' },
                { label: 'Completed', value: 'Completed' },
              ],
            },
          ]}
        />
      </div>

      {/* Table */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Students Found"
          description="Try modifying your search or filter settings, or register a new student."
          action={{
            label: 'Add Student Record',
            onClick: handleOpenAdd,
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-4">Talent &amp; Skill</th>
                  <th className="py-4 px-4">Level</th>
                  <th className="py-4 px-4">Region</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Progress</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-brand-light/40 transition-colors">
                    {/* Student Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand-light border border-brand-border flex-shrink-0">
                          <Image src={s.imageUrl} alt={s.displayName} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-darkest text-sm">{s.displayName}</p>
                          <p className="text-[11px] text-brand-secondary">
                            {s.id} &middot; Age {s.age}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Talent & Skill */}
                    <td className="py-4 px-4">
                      <p className="font-bold text-brand-darkest">{s.specificSkill}</p>
                      <p className="text-[11px] text-brand-secondary">{s.talentCategory}</p>
                    </td>

                    {/* Skill Level */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand-primary text-[11px] font-medium border border-brand-border/60">
                        {s.skillLevel}
                      </span>
                    </td>

                    {/* Region */}
                    <td className="py-4 px-4 text-brand-secondary">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-subtle" />
                        <span>{s.region}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <Badge variant={statusVariantMap[s.mentorshipStatus] || 'default'}>
                        {s.mentorshipStatus}
                      </Badge>
                    </td>

                    {/* Progress */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-brand-light overflow-hidden">
                          <div
                            className="h-full bg-brand-darkest rounded-full"
                            style={{ width: `${s.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-brand-darkest">
                          {s.progressPercent}%
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenView(s)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                          title="Edit Student"
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

      {/* Modal for View / Add / Edit / Delete */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        student={activeStudent}
        onSave={handleSaveStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Shuffle,
  Star,
  Users,
} from 'lucide-react';
import { Volunteer } from '@/data/mockVolunteers';
import { getVolunteers, saveVolunteers, getStudents } from '@/lib/storage';
import SearchBar from '@/components/shared/SearchBar';
import FilterBar from '@/components/shared/FilterBar';
import Badge from '@/components/shared/Badge';
import EmptyState from '@/components/shared/EmptyState';
import VolunteerModal from '@/components/volunteers/VolunteerModal';

export default function VolunteersManagementPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit' | 'delete' | 'match'>('view');
  const [activeVolunteer, setActiveVolunteer] = useState<Volunteer | null>(null);

  useEffect(() => {
    setVolunteers(getVolunteers());
  }, []);

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.expertise.toLowerCase().includes(search.toLowerCase()) ||
        v.region.toLowerCase().includes(search.toLowerCase()) ||
        v.id.toLowerCase().includes(search.toLowerCase());
      const matchMode = modeFilter === 'All' || v.teachingMode === modeFilter;
      const matchStatus = statusFilter === 'All' || v.status === statusFilter;
      return matchSearch && matchMode && matchStatus;
    });
  }, [volunteers, search, modeFilter, statusFilter]);

  const handleOpenAdd = () => {
    setActiveVolunteer(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenView = (v: Volunteer) => {
    setActiveVolunteer(v);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: Volunteer) => {
    setActiveVolunteer(v);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDelete = (v: Volunteer) => {
    setActiveVolunteer(v);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleOpenMatch = (v: Volunteer) => {
    setActiveVolunteer(v);
    setModalMode('match');
    setIsModalOpen(true);
  };

  const handleSaveVolunteer = (saved: Volunteer) => {
    let nextList: Volunteer[];
    if (modalMode === 'add') {
      nextList = [saved, ...volunteers];
    } else {
      nextList = volunteers.map((v) => (v.id === saved.id ? saved : v));
    }
    setVolunteers(nextList);
    saveVolunteers(nextList);
    setIsModalOpen(false);
  };

  const handleDeleteVolunteer = (volunteerId: string) => {
    const nextList = volunteers.filter((v) => v.id !== volunteerId);
    setVolunteers(nextList);
    saveVolunteers(nextList);
    setIsModalOpen(false);
  };

  const handleAssignStudent = (volunteerId: string, studentId: string) => {
    const nextList = volunteers.map((v) => {
      if (v.id === volunteerId && !v.assignedStudentIds.includes(studentId)) {
        return { ...v, assignedStudentIds: [...v.assignedStudentIds, studentId] };
      }
      return v;
    });
    setVolunteers(nextList);
    saveVolunteers(nextList);
  };

  const statusVariantMap: Record<string, 'success' | 'warning' | 'default'> = {
    Active: 'success',
    'Pending Review': 'warning',
    Inactive: 'default',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Volunteer Management
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Mentors, coaches, certified tutors, DBS verification, and assigned student rosters.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register Volunteer</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search volunteers by name, expertise, or region..."
          className="flex-1"
        />
        <FilterBar
          groups={[
            {
              id: 'mode',
              label: 'Mode',
              value: modeFilter,
              onChange: setModeFilter,
              options: [
                { label: 'All Modes', value: 'All' },
                { label: 'Both', value: 'Both' },
                { label: 'In-Person', value: 'In-Person' },
                { label: 'Online', value: 'Online' },
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
                { label: 'Pending Review', value: 'Pending Review' },
                { label: 'Inactive', value: 'Inactive' },
              ],
            },
          ]}
        />
      </div>

      {/* Table */}
      {filteredVolunteers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Volunteers Found"
          description="Try modifying your search or filter settings, or add a volunteer mentor."
          action={{
            label: 'Register Volunteer',
            onClick: handleOpenAdd,
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Volunteer</th>
                  <th className="py-4 px-4">Expertise</th>
                  <th className="py-4 px-4">Experience</th>
                  <th className="py-4 px-4">Mode &amp; Avail.</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Students</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredVolunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-brand-light/40 transition-colors">
                    {/* Volunteer Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand-light border border-brand-border flex-shrink-0">
                          <Image src={v.imageUrl} alt={v.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-darkest text-sm">{v.name}</p>
                          <p className="text-[11px] text-brand-secondary">
                            {v.id} &middot; {v.region}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Expertise */}
                    <td className="py-4 px-4">
                      <p className="font-bold text-brand-darkest">{v.expertise}</p>
                      <p className="text-[11px] text-brand-secondary truncate max-w-[140px]">
                        {v.skills.slice(0, 2).join(', ')}
                      </p>
                    </td>

                    {/* Experience */}
                    <td className="py-4 px-4 text-brand-primary font-medium">
                      {v.experience}
                    </td>

                    {/* Mode & Avail */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand-darkest text-[11px] font-semibold border border-brand-border/60">
                        {v.teachingMode}
                      </span>
                      <p className="text-[10px] text-brand-secondary mt-1 truncate max-w-[120px]">
                        {v.availability.join(', ')}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <Badge variant={statusVariantMap[v.status] || 'default'}>
                        {v.status}
                      </Badge>
                    </td>

                    {/* Students */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-brand-darkest">
                        {v.assignedStudentIds.length}
                      </span>{' '}
                      <span className="text-brand-secondary text-[11px]">assigned</span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenMatch(v)}
                          className="px-2.5 py-1 rounded-lg bg-brand-light hover:bg-brand-darkest hover:text-white text-brand-darkest font-semibold transition-colors flex items-center gap-1"
                          title="Find Matching Students"
                        >
                          <Shuffle className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Match</span>
                        </button>
                        <button
                          onClick={() => handleOpenView(v)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(v)}
                          className="p-1.5 rounded-lg text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                          title="Edit Volunteer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(v)}
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
      <VolunteerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        volunteer={activeVolunteer}
        onSave={handleSaveVolunteer}
        onDelete={handleDeleteVolunteer}
        onAssignStudent={handleAssignStudent}
      />
    </div>
  );
}

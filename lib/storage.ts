import mockStudents, { Student } from '@/data/mockStudents';
import mockVolunteers, { Volunteer } from '@/data/mockVolunteers';
import mockSponsors, { Sponsor } from '@/data/mockSponsors';
import mockDonations, { Donation } from '@/data/mockDonations';
import { mockEquipmentRequests, mockTutoringRequests, EquipmentRequest, TutoringRequest } from '@/data/mockRequests';

const KEYS = {
  students:   'tb_students',
  volunteers: 'tb_volunteers',
  sponsors:   'tb_sponsors',
  donations:  'tb_donations',
  equipment:  'tb_equipment_requests',
  tutoring:   'tb_tutoring_requests',
};

function isBrowser() {
  return typeof window !== 'undefined';
}

function load<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Students ──────────────────────────────────────────────
export function getStudents(): Student[] { return load(KEYS.students, mockStudents); }
export function saveStudents(data: Student[]): void { save(KEYS.students, data); }
export function addStudent(s: Student): void { saveStudents([...getStudents(), s]); }
export function updateStudent(s: Student): void { saveStudents(getStudents().map(x => x.id === s.id ? s : x)); }
export function deleteStudent(id: string): void { saveStudents(getStudents().filter(x => x.id !== id)); }

// ── Volunteers ────────────────────────────────────────────
export function getVolunteers(): Volunteer[] { return load(KEYS.volunteers, mockVolunteers); }
export function saveVolunteers(data: Volunteer[]): void { save(KEYS.volunteers, data); }
export function addVolunteer(v: Volunteer): void { saveVolunteers([...getVolunteers(), v]); }
export function updateVolunteer(v: Volunteer): void { saveVolunteers(getVolunteers().map(x => x.id === v.id ? v : x)); }
export function deleteVolunteer(id: string): void { saveVolunteers(getVolunteers().filter(x => x.id !== id)); }

// ── Sponsors ──────────────────────────────────────────────
export function getSponsors(): Sponsor[] { return load(KEYS.sponsors, mockSponsors); }
export function saveSponsors(data: Sponsor[]): void { save(KEYS.sponsors, data); }
export function addSponsor(s: Sponsor): void { saveSponsors([...getSponsors(), s]); }
export function updateSponsor(s: Sponsor): void { saveSponsors(getSponsors().map(x => x.id === s.id ? s : x)); }
export function deleteSponsor(id: string): void { saveSponsors(getSponsors().filter(x => x.id !== id)); }

// ── Donations ─────────────────────────────────────────────
export function getDonations(): Donation[] { return load(KEYS.donations, mockDonations); }
export function saveDonations(data: Donation[]): void { save(KEYS.donations, data); }
export function addDonation(d: Donation): void { saveDonations([...getDonations(), d]); }
export function updateDonation(d: Donation): void { saveDonations(getDonations().map(x => x.id === d.id ? d : x)); }
export function deleteDonation(id: string): void { saveDonations(getDonations().filter(x => x.id !== id)); }

// ── Equipment Requests ────────────────────────────────────
export function getEquipmentRequests(): EquipmentRequest[] { return load(KEYS.equipment, mockEquipmentRequests); }
export function saveEquipmentRequests(data: EquipmentRequest[]): void { save(KEYS.equipment, data); }
export function updateEquipmentRequest(r: EquipmentRequest): void { saveEquipmentRequests(getEquipmentRequests().map(x => x.id === r.id ? r : x)); }

// ── Tutoring Requests ─────────────────────────────────────
export function getTutoringRequests(): TutoringRequest[] { return load(KEYS.tutoring, mockTutoringRequests); }
export function saveTutoringRequests(data: TutoringRequest[]): void { save(KEYS.tutoring, data); }
export function updateTutoringRequest(r: TutoringRequest): void { saveTutoringRequests(getTutoringRequests().map(x => x.id === r.id ? r : x)); }

// ── Reset to defaults ─────────────────────────────────────
export function resetAllData(): void {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

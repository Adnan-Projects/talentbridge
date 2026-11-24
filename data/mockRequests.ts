export type RequestType = 'Equipment' | 'Tutoring';
export type RequestStatus = 'Pending' | 'Approved' | 'Donor Found' | 'In Progress' | 'Completed' | 'Rejected';
export type RequestPriority = 'High' | 'Medium' | 'Low';

export interface EquipmentRequest {
  id: string;
  type: 'Equipment';
  studentId: string;
  studentName: string;
  itemRequested: string;
  category: string;
  priority: RequestPriority;
  status: RequestStatus;
  submittedDate: string;
  updatedDate: string;
  estimatedCost: number;
  assignedDonationId?: string;
  notes: string;
}

export interface TutoringRequest {
  id: string;
  type: 'Tutoring';
  studentId: string;
  studentName: string;
  subject: string;
  category: string;
  priority: RequestPriority;
  status: RequestStatus;
  submittedDate: string;
  updatedDate: string;
  assignedVolunteerId?: string;
  preferredSchedule: string;
  teachingMode: string;
  notes: string;
  sessionsCompleted: number;
  totalSessionsPlanned: number;
}

const mockEquipmentRequests: EquipmentRequest[] = [
  { id: 'EQR-001', type: 'Equipment', studentId: 'STU-001', studentName: 'Amara K.', itemRequested: 'Violin (3/4 size) + Starter Kit', category: 'Musical Instruments', priority: 'High', status: 'Completed', submittedDate: '2024-01-10', updatedDate: '2024-01-25', estimatedCost: 240, assignedDonationId: 'DON-001', notes: 'Assigned from Harmony Foundation donation.' },
  { id: 'EQR-002', type: 'Equipment', studentId: 'STU-002', studentName: 'Kofi M.', itemRequested: 'Football Boots (Size 7) + Training Kit', category: 'Sports Equipment', priority: 'High', status: 'Completed', submittedDate: '2024-01-28', updatedDate: '2024-02-10', estimatedCost: 180, assignedDonationId: 'DON-002', notes: 'Delivered by SportsFirst Foundation.' },
  { id: 'EQR-003', type: 'Equipment', studentId: 'STU-004', studentName: 'Liam O.', itemRequested: 'Professional Oil Paint Set + Canvas + Easel', category: 'Art Supplies', priority: 'Medium', status: 'Completed', submittedDate: '2024-01-20', updatedDate: '2024-02-02', estimatedCost: 420, assignedDonationId: 'DON-003', notes: 'Premium supplies delivered.' },
  { id: 'EQR-004', type: 'Equipment', studentId: 'STU-010', studentName: 'Samuel B.', itemRequested: 'Laptop (for coding)', category: 'Electronics', priority: 'High', status: 'Donor Found', submittedDate: '2024-02-01', updatedDate: '2024-03-20', estimatedCost: 700, assignedDonationId: 'DON-004', notes: 'Refurbished Lenovo assigned from GlobalTech.' },
  { id: 'EQR-005', type: 'Equipment', studentId: 'STU-006', studentName: 'Daniel E.', itemRequested: 'Acoustic Guitar + Accessories', category: 'Musical Instruments', priority: 'High', status: 'Donor Found', submittedDate: '2024-04-15', updatedDate: '2024-04-21', estimatedCost: 220, assignedDonationId: 'DON-011', notes: 'Anonymous guitar donation assigned.' },
  { id: 'EQR-006', type: 'Equipment', studentId: 'STU-008', studentName: 'Mohammed T.', itemRequested: 'Cricket Bat, Pads, Helmet, Kit Bag', category: 'Sports Equipment', priority: 'High', status: 'Approved', submittedDate: '2024-02-05', updatedDate: '2024-02-12', estimatedCost: 650, assignedDonationId: 'DON-009', notes: 'Awaiting size confirmation.' },
  { id: 'EQR-007', type: 'Equipment', studentId: 'STU-013', studentName: 'Nadia C.', itemRequested: 'Science Kit + Books + Microscope', category: 'Educational Materials', priority: 'Medium', status: 'Pending', submittedDate: '2024-04-05', updatedDate: '2024-04-05', estimatedCost: 320, notes: 'Awaiting donor match.' },
  { id: 'EQR-008', type: 'Equipment', studentId: 'STU-014', studentName: 'Tobias W.', itemRequested: 'Digital Keyboard 61-key + Stand', category: 'Musical Instruments', priority: 'High', status: 'Completed', submittedDate: '2024-01-05', updatedDate: '2024-01-25', estimatedCost: 480, assignedDonationId: 'DON-014', notes: 'Keyboard delivered and set up.' },
  { id: 'EQR-009', type: 'Equipment', studentId: 'STU-012', studentName: 'Ethan J.', itemRequested: 'Running Spikes + Training Kit', category: 'Sports Equipment', priority: 'High', status: 'Donor Found', submittedDate: '2024-03-10', updatedDate: '2024-04-05', estimatedCost: 380, assignedDonationId: 'DON-013', notes: 'Assigned from SportsFirst Foundation.' },
  { id: 'EQR-010', type: 'Equipment', studentId: 'STU-011', studentName: 'Zara H.', itemRequested: 'Sketch Pads + Professional Pencil Set', category: 'Art Supplies', priority: 'Medium', status: 'Completed', submittedDate: '2024-03-10', updatedDate: '2024-03-25', estimatedCost: 180, assignedDonationId: 'DON-008', notes: 'Starter kit delivered.' },
  { id: 'EQR-011', type: 'Equipment', studentId: 'STU-003', studentName: 'Priya S.', itemRequested: 'Dance Shoes + Practice Mat', category: 'Sports Equipment', priority: 'Medium', status: 'Pending', submittedDate: '2024-04-25', updatedDate: '2024-04-25', estimatedCost: 95, notes: 'Awaiting donor.' },
  { id: 'EQR-012', type: 'Equipment', studentId: 'STU-005', studentName: 'Fatima A.', itemRequested: 'Scientific Calculator + Advanced Textbooks', category: 'Educational Materials', priority: 'High', status: 'Approved', submittedDate: '2024-02-20', updatedDate: '2024-02-28', estimatedCost: 220, notes: 'Approved. Procurement underway.' },
];

const mockTutoringRequests: TutoringRequest[] = [
  { id: 'TUT-001', type: 'Tutoring', studentId: 'STU-001', studentName: 'Amara K.', subject: 'Beginner Violin Lessons', category: 'Music', priority: 'High', status: 'In Progress', submittedDate: '2024-01-15', updatedDate: '2024-01-20', assignedVolunteerId: 'VOL-001', preferredSchedule: 'Weekends', teachingMode: 'In-Person', notes: 'Weekly 1-hour sessions. Great progress noted.', sessionsCompleted: 12, totalSessionsPlanned: 36 },
  { id: 'TUT-002', type: 'Tutoring', studentId: 'STU-002', studentName: 'Kofi M.', subject: 'Advanced Football Coaching', category: 'Sports', priority: 'High', status: 'In Progress', submittedDate: '2023-11-20', updatedDate: '2023-11-25', assignedVolunteerId: 'VOL-002', preferredSchedule: 'Weekends', teachingMode: 'In-Person', notes: 'Tactical and fitness training twice weekly.', sessionsCompleted: 28, totalSessionsPlanned: 48 },
  { id: 'TUT-003', type: 'Tutoring', studentId: 'STU-003', studentName: 'Priya S.', subject: 'Classical Dance Training', category: 'Dance', priority: 'Medium', status: 'Pending', submittedDate: '2024-03-05', updatedDate: '2024-03-05', preferredSchedule: 'Weekends', teachingMode: 'In-Person', notes: 'Awaiting volunteer assignment.', sessionsCompleted: 0, totalSessionsPlanned: 24 },
  { id: 'TUT-004', type: 'Tutoring', studentId: 'STU-004', studentName: 'Liam O.', subject: 'Advanced Painting Techniques', category: 'Art', priority: 'Medium', status: 'In Progress', submittedDate: '2023-09-10', updatedDate: '2023-09-18', assignedVolunteerId: 'VOL-004', preferredSchedule: 'Weekends', teachingMode: 'In-Person', notes: 'Monthly portfolio reviews included.', sessionsCompleted: 20, totalSessionsPlanned: 36 },
  { id: 'TUT-005', type: 'Tutoring', studentId: 'STU-005', studentName: 'Fatima A.', subject: 'Advanced Mathematics + Scholarship Prep', category: 'Academic', priority: 'High', status: 'In Progress', submittedDate: '2023-07-01', updatedDate: '2023-07-08', assignedVolunteerId: 'VOL-005', preferredSchedule: 'After School', teachingMode: 'Online', notes: 'Preparing for national scholarship exam.', sessionsCompleted: 40, totalSessionsPlanned: 60 },
  { id: 'TUT-006', type: 'Tutoring', studentId: 'STU-006', studentName: 'Daniel E.', subject: 'Beginner Guitar Lessons', category: 'Music', priority: 'High', status: 'Approved', submittedDate: '2024-04-18', updatedDate: '2024-04-20', assignedVolunteerId: 'VOL-006', preferredSchedule: 'Weekends', teachingMode: 'Both', notes: 'First session scheduled for next weekend.', sessionsCompleted: 0, totalSessionsPlanned: 24 },
  { id: 'TUT-007', type: 'Tutoring', studentId: 'STU-007', studentName: 'Aisha R.', subject: 'Contemporary Dance', category: 'Dance', priority: 'Medium', status: 'In Progress', submittedDate: '2023-12-01', updatedDate: '2023-12-10', assignedVolunteerId: 'VOL-007', preferredSchedule: 'Weekday Evenings', teachingMode: 'In-Person', notes: 'Preparing for regional competition.', sessionsCompleted: 18, totalSessionsPlanned: 30 },
  { id: 'TUT-008', type: 'Tutoring', studentId: 'STU-008', studentName: 'Mohammed T.', subject: 'Cricket Coaching', category: 'Sports', priority: 'High', status: 'Approved', submittedDate: '2024-02-14', updatedDate: '2024-04-20', assignedVolunteerId: 'VOL-008', preferredSchedule: 'Weekends', teachingMode: 'In-Person', notes: 'Equipment to be confirmed before sessions begin.', sessionsCompleted: 0, totalSessionsPlanned: 20 },
  { id: 'TUT-009', type: 'Tutoring', studentId: 'STU-009', studentName: 'Grace N.', subject: 'Vocal Training', category: 'Music', priority: 'Medium', status: 'In Progress', submittedDate: '2023-10-22', updatedDate: '2023-10-28', assignedVolunteerId: 'VOL-009', preferredSchedule: 'Weekends', teachingMode: 'Both', notes: 'Bi-weekly sessions. Performance prep ongoing.', sessionsCompleted: 22, totalSessionsPlanned: 36 },
  { id: 'TUT-010', type: 'Tutoring', studentId: 'STU-010', studentName: 'Samuel B.', subject: 'Web Development + JavaScript', category: 'Programming', priority: 'Medium', status: 'In Progress', submittedDate: '2024-01-30', updatedDate: '2024-02-02', assignedVolunteerId: 'VOL-010', preferredSchedule: 'After School', teachingMode: 'Online', notes: 'Learning via online platform.', sessionsCompleted: 10, totalSessionsPlanned: 30 },
  { id: 'TUT-011', type: 'Tutoring', studentId: 'STU-011', studentName: 'Zara H.', subject: 'Drawing & Illustration Fundamentals', category: 'Art', priority: 'Low', status: 'Pending', submittedDate: '2024-05-01', updatedDate: '2024-05-01', preferredSchedule: 'After School', teachingMode: 'Both', notes: 'Awaiting volunteer assignment.', sessionsCompleted: 0, totalSessionsPlanned: 20 },
  { id: 'TUT-012', type: 'Tutoring', studentId: 'STU-012', studentName: 'Ethan J.', subject: 'Athletics & Sprint Coaching', category: 'Sports', priority: 'High', status: 'In Progress', submittedDate: '2023-08-15', updatedDate: '2023-08-20', assignedVolunteerId: 'VOL-012', preferredSchedule: 'Weekends', teachingMode: 'In-Person', notes: 'Training for regional championships.', sessionsCompleted: 35, totalSessionsPlanned: 50 },
  { id: 'TUT-013', type: 'Tutoring', studentId: 'STU-013', studentName: 'Nadia C.', subject: 'Biology & Chemistry Basics', category: 'Academic', priority: 'Medium', status: 'Pending', submittedDate: '2024-03-20', updatedDate: '2024-03-20', preferredSchedule: 'Online', teachingMode: 'Online', notes: 'Volunteer match in progress.', sessionsCompleted: 0, totalSessionsPlanned: 24 },
  { id: 'TUT-014', type: 'Tutoring', studentId: 'STU-014', studentName: 'Tobias W.', subject: 'Piano Lessons + Music Theory', category: 'Music', priority: 'High', status: 'In Progress', submittedDate: '2023-11-05', updatedDate: '2023-11-10', assignedVolunteerId: 'VOL-014', preferredSchedule: 'Weekends', teachingMode: 'Both', notes: 'Rapid learner. Already progressing to Grade 2.', sessionsCompleted: 20, totalSessionsPlanned: 40 },
  { id: 'TUT-015', type: 'Tutoring', studentId: 'STU-015', studentName: 'Imani L.', subject: 'Advanced Hip-Hop & Choreography', category: 'Dance', priority: 'High', status: 'In Progress', submittedDate: '2023-06-10', updatedDate: '2023-06-15', assignedVolunteerId: 'VOL-015', preferredSchedule: 'Weekday Evenings', teachingMode: 'In-Person', notes: 'Competition prep. Working on original routine.', sessionsCompleted: 42, totalSessionsPlanned: 52 },
];

export { mockEquipmentRequests, mockTutoringRequests };

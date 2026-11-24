export type SponsorType = 'Individual' | 'Corporate' | 'Foundation' | 'Government';
export type SponsorStatus = 'Active' | 'Inactive' | 'Pending';

export interface SponsorContribution {
  id: string;
  date: string;
  amount: number;
  type: 'Financial' | 'Equipment' | 'In-Kind';
  description: string;
  studentId?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  organization?: string;
  email: string;
  phone: string;
  sponsorType: SponsorType;
  status: SponsorStatus;
  imageUrl: string;
  contributions: SponsorContribution[];
  totalContribution: number;
  supportedStudentIds: string[];
  joinedDate: string;
  bio: string;
  region: string;
}

const mockSponsors: Sponsor[] = [
  {
    id: 'SPO-001',
    name: 'GlobalTech Solutions',
    organization: 'GlobalTech Solutions Ltd.',
    email: 'csr@globaltech.example.com',
    phone: '+44 20 7000 0001',
    sponsorType: 'Corporate',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=GlobalTech&backgroundColor=e5e7eb',
    contributions: [
      { id: 'CON-001', date: '2024-01-10', amount: 5000, type: 'Financial', description: 'Annual sponsorship fund', studentId: 'STU-010' },
      { id: 'CON-002', date: '2024-03-15', amount: 2500, type: 'Equipment', description: 'Laptops for students', studentId: 'STU-010' },
    ],
    totalContribution: 7500,
    supportedStudentIds: ['STU-010'],
    joinedDate: '2024-01-01',
    bio: 'Leading technology company committed to digital inclusion and education for underserved communities.',
    region: 'London',
  },
  {
    id: 'SPO-002',
    name: 'The Harmony Foundation',
    organization: 'Harmony Music Foundation',
    email: 'grants@harmonyfoundation.example.com',
    phone: '+44 20 7000 0002',
    sponsorType: 'Foundation',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Harmony&backgroundColor=e5e7eb',
    contributions: [
      { id: 'CON-003', date: '2023-10-01', amount: 3000, type: 'Equipment', description: 'Musical instruments donation' },
      { id: 'CON-004', date: '2024-01-20', amount: 1500, type: 'Financial', description: 'Music lessons fund', studentId: 'STU-001' },
      { id: 'CON-005', date: '2024-04-05', amount: 1200, type: 'Financial', description: 'Violin purchase', studentId: 'STU-001' },
    ],
    totalContribution: 5700,
    supportedStudentIds: ['STU-001', 'STU-006', 'STU-014'],
    joinedDate: '2023-09-15',
    bio: 'A charitable foundation dedicated to making music education accessible to every child regardless of economic background.',
    region: 'Birmingham',
  },
  {
    id: 'SPO-003',
    name: 'Robert Kimani',
    email: 'robert.kimani@example.com',
    phone: '+44 7700 900100',
    sponsorType: 'Individual',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Robert&backgroundColor=c0aede',
    contributions: [
      { id: 'CON-006', date: '2024-02-14', amount: 500, type: 'Financial', description: 'Monthly sponsorship', studentId: 'STU-002' },
      { id: 'CON-007', date: '2024-03-14', amount: 500, type: 'Financial', description: 'Monthly sponsorship', studentId: 'STU-002' },
      { id: 'CON-008', date: '2024-04-14', amount: 500, type: 'Financial', description: 'Monthly sponsorship', studentId: 'STU-002' },
    ],
    totalContribution: 1500,
    supportedStudentIds: ['STU-002'],
    joinedDate: '2024-02-01',
    bio: 'Former youth footballer who understands the power of sport in a young person\'s life. Proud to invest in the next generation.',
    region: 'Manchester',
  },
  {
    id: 'SPO-004',
    name: 'FutureArts Trust',
    organization: 'FutureArts Trust',
    email: 'info@futureartstrust.example.com',
    phone: '+44 20 7000 0004',
    sponsorType: 'Foundation',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=FutureArts&backgroundColor=e5e7eb',
    contributions: [
      { id: 'CON-009', date: '2024-01-30', amount: 2000, type: 'Equipment', description: 'Art supplies donation', studentId: 'STU-004' },
      { id: 'CON-010', date: '2024-03-20', amount: 2000, type: 'Equipment', description: 'Art supplies donation', studentId: 'STU-011' },
    ],
    totalContribution: 4000,
    supportedStudentIds: ['STU-004', 'STU-011'],
    joinedDate: '2024-01-15',
    bio: 'Dedicated to nurturing visual arts talent in young people from disadvantaged communities across the UK.',
    region: 'London',
  },
  {
    id: 'SPO-005',
    name: 'Elena Rodriguez',
    email: 'elena.rodriguez@example.com',
    phone: '+44 7700 900105',
    sponsorType: 'Individual',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Elena&backgroundColor=d1f4cc',
    contributions: [
      { id: 'CON-011', date: '2023-12-15', amount: 800, type: 'Financial', description: 'Dance class sponsorship', studentId: 'STU-003' },
      { id: 'CON-012', date: '2024-01-15', amount: 800, type: 'Financial', description: 'Dance class sponsorship', studentId: 'STU-003' },
    ],
    totalContribution: 1600,
    supportedStudentIds: ['STU-003'],
    joinedDate: '2023-12-01',
    bio: 'Dance enthusiast and business owner. Believes dance education transforms lives and builds character.',
    region: 'London',
  },
  {
    id: 'SPO-006',
    name: 'SportsFirst Foundation',
    organization: 'SportsFirst UK',
    email: 'grants@sportsfirst.example.com',
    phone: '+44 20 7000 0006',
    sponsorType: 'Foundation',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=SportsFirst&backgroundColor=e5e7eb',
    contributions: [
      { id: 'CON-013', date: '2024-02-01', amount: 3500, type: 'Equipment', description: 'Sports equipment bundle' },
      { id: 'CON-014', date: '2024-04-01', amount: 1500, type: 'Financial', description: 'Coaching sessions fund', studentId: 'STU-012' },
    ],
    totalContribution: 5000,
    supportedStudentIds: ['STU-002', 'STU-008', 'STU-012'],
    joinedDate: '2024-01-20',
    bio: 'UK charity committed to ensuring every talented young athlete has access to quality coaching and equipment.',
    region: 'London',
  },
  {
    id: 'SPO-007',
    name: 'Meridian Bank Plc',
    organization: 'Meridian Bank Plc',
    email: 'csr@meridianbank.example.com',
    phone: '+44 20 7000 0007',
    sponsorType: 'Corporate',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Meridian&backgroundColor=e5e7eb',
    contributions: [
      { id: 'CON-015', date: '2024-01-05', amount: 10000, type: 'Financial', description: 'Annual education bursary fund' },
    ],
    totalContribution: 10000,
    supportedStudentIds: ['STU-005', 'STU-013'],
    joinedDate: '2024-01-01',
    bio: 'Leading UK bank investing in education and opportunity for underserved communities as part of our social responsibility programme.',
    region: 'London',
  },
  {
    id: 'SPO-008',
    name: 'Community Wellness Fund',
    organization: 'Community Wellness Fund CIC',
    email: 'info@cwf.example.com',
    phone: '+44 161 000 0008',
    sponsorType: 'Foundation',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=CWF&backgroundColor=e5e7eb',
    contributions: [
      { id: 'CON-016', date: '2024-03-01', amount: 2000, type: 'Financial', description: 'General support fund' },
      { id: 'CON-017', date: '2024-03-01', amount: 1000, type: 'In-Kind', description: 'Venue for workshops' },
    ],
    totalContribution: 3000,
    supportedStudentIds: ['STU-007', 'STU-015'],
    joinedDate: '2024-02-20',
    bio: 'Community interest company focused on youth wellbeing through sport, arts, and creative expression.',
    region: 'Manchester',
  },
  {
    id: 'SPO-009',
    name: 'Dr. Patel & Associates',
    organization: 'Dr. Patel & Associates',
    email: 'giving@patelandassociates.example.com',
    phone: '+44 7700 900109',
    sponsorType: 'Individual',
    status: 'Active',
    imageUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Patel&backgroundColor=ffd5dc',
    contributions: [
      { id: 'CON-018', date: '2024-04-10', amount: 1200, type: 'Financial', description: 'Science materials and books', studentId: 'STU-013' },
    ],
    totalContribution: 1200,
    supportedStudentIds: ['STU-013'],
    joinedDate: '2024-04-01',
    bio: 'Medical professional passionate about science education and inspiring the next generation of scientists and researchers.',
    region: 'Glasgow',
  },
  {
    id: 'SPO-010',
    name: 'NextGen Creatives Ltd.',
    organization: 'NextGen Creatives Ltd.',
    email: 'foundation@nextgencreatives.example.com',
    phone: '+44 20 7000 0010',
    sponsorType: 'Corporate',
    status: 'Pending',
    imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=NextGen&backgroundColor=e5e7eb',
    contributions: [],
    totalContribution: 0,
    supportedStudentIds: [],
    joinedDate: '2024-05-10',
    bio: 'Award-winning creative agency keen to invest in arts and digital talent among the next generation.',
    region: 'London',
  },
];

export default mockSponsors;

export type DonationCategory = 'Musical Instruments' | 'Sports Equipment' | 'Art Supplies' | 'Educational Materials' | 'Financial' | 'Electronics';
export type DonationStatus = 'Pending' | 'Approved' | 'Received' | 'Distributed';

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donationCategory: DonationCategory;
  itemOrAmount: string;
  monetaryValue: number;
  date: string;
  associatedStudentId?: string;
  associatedRequestId?: string;
  status: DonationStatus;
  notes: string;
  sponsorId?: string;
}

const mockDonations: Donation[] = [
  { id: 'DON-001', donorName: 'The Harmony Foundation', donorEmail: 'grants@harmonyfoundation.example.com', donationCategory: 'Musical Instruments', itemOrAmount: '5× Starter Violin Kit (3/4)', monetaryValue: 1200, date: '2024-01-20', associatedStudentId: 'STU-001', status: 'Distributed', notes: 'Includes rosin, bow and case. Delivered directly.', sponsorId: 'SPO-002' },
  { id: 'DON-002', donorName: 'SportsFirst Foundation', donorEmail: 'grants@sportsfirst.example.com', donationCategory: 'Sports Equipment', itemOrAmount: 'Football Boots, Shin Guards, Training Balls', monetaryValue: 850, date: '2024-02-05', associatedStudentId: 'STU-002', status: 'Distributed', notes: 'Full set delivered to Greater Manchester hub.', sponsorId: 'SPO-006' },
  { id: 'DON-003', donorName: 'FutureArts Trust', donorEmail: 'info@futureartstrust.example.com', donationCategory: 'Art Supplies', itemOrAmount: 'Professional Oil Paint Set + 10 Canvas Boards + Easel', monetaryValue: 420, date: '2024-01-30', associatedStudentId: 'STU-004', status: 'Distributed', notes: 'Premium supplies for advanced student.', sponsorId: 'SPO-004' },
  { id: 'DON-004', donorName: 'GlobalTech Solutions', donorEmail: 'csr@globaltech.example.com', donationCategory: 'Electronics', itemOrAmount: '3× Lenovo Laptops (refurbished)', monetaryValue: 2100, date: '2024-03-15', associatedStudentId: 'STU-010', status: 'Received', notes: 'Laptops set up with coding environment.', sponsorId: 'SPO-001' },
  { id: 'DON-005', donorName: 'Meridian Bank Plc', donorEmail: 'csr@meridianbank.example.com', donationCategory: 'Financial', itemOrAmount: '£10,000 Education Bursary', monetaryValue: 10000, date: '2024-01-05', status: 'Approved', notes: 'Annual bursary for academic support programme.', sponsorId: 'SPO-007' },
  { id: 'DON-006', donorName: 'Robert Kimani', donorEmail: 'robert.kimani@example.com', donationCategory: 'Financial', itemOrAmount: '£500 monthly sponsorship', monetaryValue: 500, date: '2024-04-14', associatedStudentId: 'STU-002', status: 'Received', notes: 'Third month of ongoing sponsorship.', sponsorId: 'SPO-003' },
  { id: 'DON-007', donorName: 'Community Wellness Fund', donorEmail: 'info@cwf.example.com', donationCategory: 'Financial', itemOrAmount: '£2,000 general fund', monetaryValue: 2000, date: '2024-03-01', status: 'Approved', notes: 'General support for dance and arts students.', sponsorId: 'SPO-008' },
  { id: 'DON-008', donorName: 'FutureArts Trust', donorEmail: 'info@futureartstrust.example.com', donationCategory: 'Art Supplies', itemOrAmount: 'Sketch Pads, Drawing Pencils, Coloured Pencils', monetaryValue: 180, date: '2024-03-20', associatedStudentId: 'STU-011', status: 'Received', notes: 'Starter kit for young illustrator.', sponsorId: 'SPO-004' },
  { id: 'DON-009', donorName: 'SportsFirst Foundation', donorEmail: 'grants@sportsfirst.example.com', donationCategory: 'Sports Equipment', itemOrAmount: 'Cricket Bat, Pads, Helmet, Kit Bag', monetaryValue: 650, date: '2024-02-10', associatedStudentId: 'STU-008', status: 'Approved', notes: 'Waiting for size confirmation from student.', sponsorId: 'SPO-006' },
  { id: 'DON-010', donorName: 'Dr. Patel & Associates', donorEmail: 'giving@patelandassociates.example.com', donationCategory: 'Educational Materials', itemOrAmount: 'Science Kit + Reference Books', monetaryValue: 320, date: '2024-04-10', associatedStudentId: 'STU-013', status: 'Pending', notes: 'Shipment en route.', sponsorId: 'SPO-009' },
  { id: 'DON-011', donorName: 'Anonymous', donorEmail: 'anonymous@example.com', donationCategory: 'Musical Instruments', itemOrAmount: '1× Acoustic Guitar + picks + strap', monetaryValue: 220, date: '2024-04-20', associatedStudentId: 'STU-006', status: 'Pending', notes: 'Kind anonymous donation.', },
  { id: 'DON-012', donorName: 'Elena Rodriguez', donorEmail: 'elena.rodriguez@example.com', donationCategory: 'Financial', itemOrAmount: '£800 dance class fund', monetaryValue: 800, date: '2024-01-15', associatedStudentId: 'STU-003', status: 'Distributed', notes: 'Covers 3 months of dance classes.', sponsorId: 'SPO-005' },
  { id: 'DON-013', donorName: 'SportsFirst Foundation', donorEmail: 'grants@sportsfirst.example.com', donationCategory: 'Sports Equipment', itemOrAmount: 'Running Spikes + Training Kit', monetaryValue: 380, date: '2024-04-01', associatedStudentId: 'STU-012', status: 'Received', notes: 'For regional athletics champion.', sponsorId: 'SPO-006' },
  { id: 'DON-014', donorName: 'The Harmony Foundation', donorEmail: 'grants@harmonyfoundation.example.com', donationCategory: 'Musical Instruments', itemOrAmount: 'Digital Keyboard 61-key + stand', monetaryValue: 480, date: '2024-01-20', associatedStudentId: 'STU-014', status: 'Distributed', notes: 'Piano lessons can now begin.', sponsorId: 'SPO-002' },
  { id: 'DON-015', donorName: 'GlobalTech Solutions', donorEmail: 'csr@globaltech.example.com', donationCategory: 'Financial', itemOrAmount: '£5,000 annual technology fund', monetaryValue: 5000, date: '2024-01-10', associatedStudentId: 'STU-010', status: 'Approved', notes: 'First annual tech education fund.', sponsorId: 'SPO-001' },
];

export default mockDonations;

import AdminShell from '@/components/dashboard/AdminShell';

export const metadata = {
  title: 'Admin — TalentBridge',
  description: 'TalentBridge administration dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

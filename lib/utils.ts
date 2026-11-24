import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    Active:       'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending:      'bg-amber-50 text-amber-700 border-amber-200',
    Completed:    'bg-blue-50 text-blue-700 border-blue-200',
    Inactive:     'bg-gray-100 text-gray-500 border-gray-200',
    Waitlisted:   'bg-purple-50 text-purple-700 border-purple-200',
    Approved:     'bg-emerald-50 text-emerald-700 border-emerald-200',
    Received:     'bg-blue-50 text-blue-700 border-blue-200',
    Distributed:  'bg-indigo-50 text-indigo-700 border-indigo-200',
    Rejected:     'bg-red-50 text-red-700 border-red-200',
    'In Progress':'bg-sky-50 text-sky-700 border-sky-200',
    'Donor Found':'bg-teal-50 text-teal-700 border-teal-200',
    'Pending Review': 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return map[status] ?? 'bg-gray-100 text-gray-600 border-gray-200';
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    High:   'bg-red-50 text-red-600 border-red-200',
    Medium: 'bg-amber-50 text-amber-600 border-amber-200',
    Low:    'bg-green-50 text-green-600 border-green-200',
  };
  return map[priority] ?? 'bg-gray-100 text-gray-600 border-gray-200';
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export function downloadCSV(data: Record<string, unknown>[], filename: string): void {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = val === null || val === undefined ? '' : String(val);
        return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
      }).join(',')
    ),
  ];
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

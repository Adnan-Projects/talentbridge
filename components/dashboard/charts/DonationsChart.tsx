'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

export interface MonthlyDonation {
  month: string;
  amount: number;
}

const DEFAULT_DATA: MonthlyDonation[] = [
  { month: 'Jan', amount: 16700 },
  { month: 'Feb', amount: 11200 },
  { month: 'Mar', amount: 14500 },
  { month: 'Apr', amount: 18900 },
  { month: 'May', amount: 9800 },
  { month: 'Jun', amount: 13400 },
  { month: 'Jul', amount: 7600 },
  { month: 'Aug', amount: 11000 },
  { month: 'Sep', amount: 15800 },
  { month: 'Oct', amount: 20200 },
  { month: 'Nov', amount: 17300 },
  { month: 'Dec', amount: 22100 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl shadow-float px-4 py-3">
      <p className="text-xs font-medium text-brand-secondary mb-1">{label}</p>
      <p className="text-sm font-bold text-brand-darkest">
        £{payload[0].value?.toLocaleString()}
      </p>
    </div>
  );
}

interface DonationsChartProps {
  data?: MonthlyDonation[];
}

export default function DonationsChart({ data = DEFAULT_DATA }: DonationsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={22}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f3f5', radius: 6 }} />
        <Bar
          dataKey="amount"
          fill="#374151"
          radius={[6, 6, 0, 0]}
          activeBar={{ fill: '#111827' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

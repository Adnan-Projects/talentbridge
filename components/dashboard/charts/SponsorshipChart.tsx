'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

export interface SponsorshipDataPoint {
  month: string;
  cumulative: number;
}

const DEFAULT_DATA: SponsorshipDataPoint[] = [
  { month: 'Jan', cumulative: 16700 },
  { month: 'Feb', cumulative: 27900 },
  { month: 'Mar', cumulative: 42400 },
  { month: 'Apr', cumulative: 61300 },
  { month: 'May', cumulative: 71100 },
  { month: 'Jun', cumulative: 84500 },
  { month: 'Jul', cumulative: 92100 },
  { month: 'Aug', cumulative: 103100 },
  { month: 'Sep', cumulative: 118900 },
  { month: 'Oct', cumulative: 139100 },
  { month: 'Nov', cumulative: 156400 },
  { month: 'Dec', cumulative: 178500 },
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

interface SponsorshipChartProps {
  data?: SponsorshipDataPoint[];
}

export default function SponsorshipChart({ data = DEFAULT_DATA }: SponsorshipChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="sponsorshipGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#374151" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#374151" stopOpacity={0.01} />
          </linearGradient>
        </defs>
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
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="cumulative"
          stroke="#374151"
          strokeWidth={2.5}
          fill="url(#sponsorshipGradient)"
          dot={false}
          activeDot={{ r: 5, fill: '#111827', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

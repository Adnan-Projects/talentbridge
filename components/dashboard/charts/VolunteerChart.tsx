'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
  TooltipProps,
} from 'recharts';

export interface VolunteerSessionData {
  month: string;
  sessions: number;
}

const DEFAULT_DATA: VolunteerSessionData[] = [
  { month: 'Jan', sessions: 42 },
  { month: 'Feb', sessions: 55 },
  { month: 'Mar', sessions: 48 },
  { month: 'Apr', sessions: 70 },
  { month: 'May', sessions: 63 },
  { month: 'Jun', sessions: 38 },
  { month: 'Jul', sessions: 29 },
  { month: 'Aug', sessions: 44 },
  { month: 'Sep', sessions: 68 },
  { month: 'Oct', sessions: 82 },
  { month: 'Nov', sessions: 75 },
  { month: 'Dec', sessions: 90 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl shadow-float px-4 py-3">
      <p className="text-xs font-medium text-brand-secondary mb-1">{label}</p>
      <p className="text-sm font-bold text-brand-darkest">
        {payload[0].value} sessions
      </p>
    </div>
  );
}

interface VolunteerChartProps {
  data?: VolunteerSessionData[];
}

export default function VolunteerChart({ data = DEFAULT_DATA }: VolunteerChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="sessions"
          stroke="#374151"
          strokeWidth={2.5}
          dot={<Dot r={3} fill="#374151" stroke="#fff" strokeWidth={1.5} />}
          activeDot={{ r: 5, fill: '#111827', stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

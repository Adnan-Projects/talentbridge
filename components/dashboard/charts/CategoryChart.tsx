'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

export interface CategoryData {
  name: string;
  value: number;
}

const DEFAULT_DATA: CategoryData[] = [
  { name: 'Music',       value: 4 },
  { name: 'Sports',      value: 3 },
  { name: 'Dance',       value: 3 },
  { name: 'Art',         value: 2 },
  { name: 'Academic',    value: 1 },
  { name: 'Programming', value: 1 },
  { name: 'Cricket',     value: 1 },
];

// Muted grey/slate tones — no bright colours
const PALETTE = [
  '#374151', // darkest charcoal
  '#4b5563',
  '#6b7280',
  '#9ca3af',
  '#d1d5db',
  '#e5e7eb',
  '#f1f3f5',
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-brand-white border border-brand-border rounded-xl shadow-float px-4 py-3">
      <p className="text-xs font-medium text-brand-secondary">{name}</p>
      <p className="text-sm font-bold text-brand-darkest">{value} student{(value as number) !== 1 ? 's' : ''}</p>
    </div>
  );
}

interface CategoryChartProps {
  data?: CategoryData[];
}

export default function CategoryChart({ data = DEFAULT_DATA }: CategoryChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col items-center w-full">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {/* Centre label rendered via foreignObject alternative: absolute overlay */}
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 w-full px-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
            />
            <span className="text-xs text-brand-secondary truncate">{item.name}</span>
            <span className="text-xs font-medium text-brand-darkest ml-auto">
              {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

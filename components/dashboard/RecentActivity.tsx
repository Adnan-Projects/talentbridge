'use client';

import { CheckCircle2, UserPlus, Gift, BookOpen, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  type: 'student' | 'donation' | 'tutoring' | 'volunteer' | 'match';
  title: string;
  description: string;
  time: string;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'tutoring',
    title: 'Tutoring Session Completed',
    description: 'Sarah Mitchell logged a 1-hour violin session with Amara K.',
    time: '20 mins ago',
  },
  {
    id: 'act-2',
    type: 'donation',
    title: 'Donation Received',
    description: 'GlobalTech Solutions delivered 3 refurbished coding laptops.',
    time: '2 hours ago',
  },
  {
    id: 'act-3',
    type: 'volunteer',
    title: 'New Volunteer Approved',
    description: 'David Kumar (Cricket Coach) completed DBS vetting.',
    time: '5 hours ago',
  },
  {
    id: 'act-4',
    type: 'match',
    title: 'Smart Match Formed',
    description: 'Marcus Thompson connected with Kofi M. for football training.',
    time: 'Yesterday',
  },
  {
    id: 'act-5',
    type: 'student',
    title: 'Student Profile Enrolled',
    description: 'Zara H. (Age 10, Drawing) referred by Cardiff Community Trust.',
    time: 'Yesterday',
  },
  {
    id: 'act-6',
    type: 'donation',
    title: 'Equipment Dispatched',
    description: 'Starter violin kit delivered to West Midlands regional hub.',
    time: '2 days ago',
  },
];

const ICONS = {
  student: UserPlus,
  donation: Gift,
  tutoring: BookOpen,
  volunteer: CheckCircle2,
  match: Clock,
};

export default function RecentActivity({ activities = DEFAULT_ACTIVITIES }: { activities?: ActivityItem[] }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-card">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border">
        <h3 className="font-bold text-base text-brand-darkest">Recent Activities</h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-secondary">
          Live Feed
        </span>
      </div>

      <div className="divide-y divide-brand-border/60">
        {activities.map((item) => {
          const Icon = ICONS[item.type] || CheckCircle2;
          return (
            <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center text-brand-darkest flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-brand-darkest truncate">{item.title}</p>
                  <span className="text-[10px] text-brand-subtle flex-shrink-0 font-medium">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-brand-secondary mt-0.5 leading-snug">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

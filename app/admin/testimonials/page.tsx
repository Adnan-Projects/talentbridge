'use client';

import { useState } from 'react';
import { Star, CheckCircle, Clock, ShieldCheck, Eye, Trash2 } from 'lucide-react';
import Badge from '@/components/shared/Badge';

interface TestimonialRecord {
  id: string;
  author: string;
  role: string;
  category: string;
  quote: string;
  stars: number;
  status: 'Approved' | 'Pending Review';
  date: string;
}

const INITIAL_TESTIMONIALS: TestimonialRecord[] = [
  {
    id: 'TEST-001',
    author: 'Elena R. (Parent)',
    role: 'Parent of Amara K.',
    category: 'Violin Programme',
    quote: 'We could never have afforded a violin, let alone weekly private lessons. Watching her play at her school recital brought the whole family to tears.',
    stars: 5,
    status: 'Approved',
    date: '2024-03-12',
  },
  {
    id: 'TEST-002',
    author: 'Sarah Mitchell',
    role: 'Volunteer Music Educator',
    category: 'Volunteer Story',
    quote: 'Teaching Amara has renewed my faith in education. In four months, she progressed through what usually takes a year.',
    stars: 5,
    status: 'Approved',
    date: '2024-03-18',
  },
  {
    id: 'TEST-003',
    author: 'Robert Kimani',
    role: 'Individual Sponsor',
    category: 'Sponsor Perspective',
    quote: 'Sponsoring Kofi’s football kit and coaching was an easy choice. He has genuine talent and dedication.',
    stars: 5,
    status: 'Approved',
    date: '2024-04-02',
  },
  {
    id: 'TEST-004',
    author: 'Liam O.',
    role: 'Student (Age 13)',
    category: 'Student Voice',
    quote: 'Having professional canvas boards, oil paints, and James mentoring me changed everything. I won my first borough art competition!',
    stars: 5,
    status: 'Approved',
    date: '2024-04-10',
  },
  {
    id: 'TEST-005',
    author: 'David Kumar',
    role: 'Volunteer Cricket Coach',
    category: 'Coach Story',
    quote: 'The kids’ passion is inspiring. TalentBridge makes it easy to step in and give back directly without bureaucratic roadblocks.',
    stars: 5,
    status: 'Pending Review',
    date: '2024-05-01',
  },
  {
    id: 'TEST-006',
    author: 'Preethi Nair',
    role: 'Dance Instructor',
    category: 'Dance Programme',
    quote: 'Classical dance instills poise, stamina, and self-worth. Seeing Priya shine on stage is the greatest reward.',
    stars: 5,
    status: 'Approved',
    date: '2024-05-04',
  },
];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(INITIAL_TESTIMONIALS);
  const [selectedQuote, setSelectedQuote] = useState<TestimonialRecord | null>(null);

  const toggleStatus = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'Approved' ? 'Pending Review' : 'Approved',
            }
          : t
      )
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
            Testimonials &amp; Story Moderation
          </h1>
          <p className="text-sm text-brand-secondary mt-1">
            Review, approve, and manage public testimonials from students, parents, coaches, and sponsors.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-white border border-brand-border rounded-xl text-brand-darkest self-start sm:self-auto shadow-sm">
          {testimonials.length} Testimonials Recorded
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-brand-light/60 border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Author &amp; Role</th>
                <th className="py-4 px-4">Discipline</th>
                <th className="py-4 px-4">Quote Snippet</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-brand-light/40 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-brand-darkest text-sm">{t.author}</p>
                    <p className="text-[11px] text-brand-secondary">{t.role}</p>
                  </td>

                  <td className="py-4 px-4 text-brand-secondary font-medium">{t.category}</td>

                  <td className="py-4 px-4 text-brand-primary max-w-xs truncate font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-brand-secondary">{t.date}</td>

                  <td className="py-4 px-4">
                    <Badge variant={t.status === 'Approved' ? 'success' : 'warning'}>
                      {t.status}
                    </Badge>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(t.id)}
                        className="px-2.5 py-1 rounded-lg bg-brand-light text-brand-darkest font-semibold hover:bg-brand-darkest hover:text-white transition-colors text-[11px]"
                      >
                        {t.status === 'Approved' ? 'Hold Review' : 'Approve'}
                      </button>
                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        className="p-1.5 text-brand-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

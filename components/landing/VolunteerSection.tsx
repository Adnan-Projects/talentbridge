'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Music, Trophy, Palette, BookOpen, Activity, CheckCircle2 } from 'lucide-react';

const roles = [
  { icon: Music, label: 'Music Teachers & Instrument Instructors' },
  { icon: Trophy, label: 'Football Coaches & Athletics Trainers' },
  { icon: Activity, label: 'Dance & Performing Arts Instructors' },
  { icon: Palette, label: 'Visual Artists & Painting Mentors' },
  { icon: BookOpen, label: 'Maths, Science & Academic Tutors' },
];

export default function VolunteerSection() {
  return (
    <section className="py-24 bg-brand-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              Give Your Time &amp; Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-6">
              Become a Volunteer Mentor
            </h2>
            <p className="text-base sm:text-lg text-brand-secondary leading-relaxed mb-8">
              Whether you are an orchestral violinist, a grassroots football coach, a retired maths teacher,
              or a practicing artist — your skills can transform a young person&apos;s trajectory. We handle vetting,
              scheduling, and safeguarding so you can focus entirely on teaching.
            </p>

            {/* Roles checklist */}
            <div className="space-y-3.5 mb-10">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-brand-border flex items-center justify-center text-brand-darkest flex-shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-brand-darkest">{role.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-darkest text-white text-sm font-semibold hover:bg-brand-dark transition-all duration-200 shadow-card hover:shadow-card-hover"
              >
                <span>Apply as a Volunteer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-brand-secondary font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Safeguarding &amp; DBS guidance provided</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Box (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h3 className="font-bold text-brand-darkest text-base">Volunteer Experience</h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  High Impact
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-brand-primary italic leading-relaxed">
                &ldquo;Teaching violin to Amara has been the most meaningful coaching experience of my career.
                Seeing her master her first Vivaldi movement in just four months proved what happens when opportunity
                meets passion.&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-brand-light border border-brand-border flex items-center justify-center text-xs font-bold text-brand-darkest">
                  SM
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-darkest">Sarah Mitchell</p>
                  <p className="text-[11px] text-brand-secondary">Volunteer Violin Teacher &middot; 48 Sessions</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-border/60 text-center">
                <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border/60">
                  <p className="text-lg font-black text-brand-darkest">1–2 hrs</p>
                  <p className="text-[10px] uppercase font-semibold text-brand-secondary">Weekly Commitment</p>
                </div>
                <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border/60">
                  <p className="text-lg font-black text-brand-darkest">Hybrid</p>
                  <p className="text-[10px] uppercase font-semibold text-brand-secondary">In-Person &amp; Online</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

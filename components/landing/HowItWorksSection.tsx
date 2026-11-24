'use client';

import { motion } from 'framer-motion';
import { Search, ClipboardCheck, Users2, Gift, Award } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discover a Talent',
    description: 'Schools, teachers, and community workers identify children with extraordinary potential.',
  },
  {
    step: '02',
    icon: ClipboardCheck,
    title: "Identify Child's Needs",
    description: 'We determine required instruments, sports kit, tutoring hours, or educational material.',
  },
  {
    step: '03',
    icon: Users2,
    title: 'Connect with Volunteers & Sponsors',
    description: 'Our smart matching pairs the child with suitable coaches, tutors, and generous sponsors.',
  },
  {
    step: '04',
    icon: Gift,
    title: 'Provide Resources & Mentorship',
    description: 'Equipment is safely delivered and scheduled tutoring or coaching sessions commence.',
  },
  {
    step: '05',
    icon: Award,
    title: 'Track & Celebrate Achievements',
    description: 'We track milestones, celebrate concert recitals, sports victories, and academic success.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-light border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Structured &amp; Safe Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-4">
            How TalentBridge Works
          </h2>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed">
            A transparent, child-safe journey from first discovery to lasting achievement.
          </p>
        </div>

        {/* Steps Grid / Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-brand-offwhite rounded-2xl p-6 border border-brand-border/80 flex flex-col items-start hover:border-brand-primary transition-all duration-300"
              >
                {/* Step badge */}
                <span className="text-xs font-extrabold text-brand-subtle tracking-wider uppercase mb-4">
                  Step {item.step}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-darkest mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-brand-darkest mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-brand-secondary leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

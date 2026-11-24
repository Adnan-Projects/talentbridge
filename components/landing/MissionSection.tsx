'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowLeftRight, Telescope, ShieldCheck } from 'lucide-react';

const missionCards = [
  {
    icon: Telescope,
    title: 'Discover Hidden Talent',
    description:
      'We actively partner with schools, local community groups, and caregivers to identify innate gifts in music, athletics, visual arts, and academics before they fade unnoticed.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Bridge the Resource Gap',
    description:
      'A child should never abandon violin because they cannot afford an instrument. We match direct equipment, lessons, and supplies to their specific developmental needs.',
  },
  {
    icon: Sparkles,
    title: 'Nurture & Empower',
    description:
      'Connecting children with passionate mentors creates lasting confidence. We turn raw potential into lifelong achievement through continuous, structured encouragement.',
  },
];

export default function MissionSection() {
  return (
    <section id="mission" className="py-24 bg-brand-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            Why TalentBridge Exists
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-6">
            Our Purpose &amp; Mission
          </h2>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed font-normal">
            Every child possesses a spark of genius. TalentBridge exists to ensure that lack of financial
            means never extinguishes that spark. We connect genuine talent with dedicated people who can help it thrive.
          </p>
        </div>

        {/* 3 Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-darkest mb-6 group-hover:bg-brand-darkest group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-darkest mb-3">{card.title}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-brand-border/60 flex items-center gap-2 text-xs font-semibold text-brand-primary">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safeguarded &amp; Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

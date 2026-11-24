'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, User, Landmark, ShieldCheck } from 'lucide-react';

const tiers = [
  {
    icon: User,
    name: 'Individual Sponsor',
    description: 'Sponsor an individual student’s equipment or weekly lesson fees.',
    highlights: ['Direct equipment purchase', 'Receive student milestone updates', 'Annual impact review'],
    cta: 'Become a Sponsor',
  },
  {
    icon: Building2,
    name: 'Corporate Partner',
    description: 'CSR partnerships funding cohorts of children in specific regions or subjects.',
    highlights: ['Employee volunteer days', 'Co-branded youth showcases', 'Audited CSR impact metrics'],
    cta: 'Partner With Us',
  },
  {
    icon: Landmark,
    name: 'Charitable Foundation',
    description: 'Institutional grants supporting our matching platform and equipment pool.',
    highlights: ['Targeted endowment funds', 'Regional scale programmes', 'Governance oversight'],
    cta: 'Discuss Grant',
  },
];

export default function SponsorSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-light border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Invest in Potential
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-4">
            Become a Sponsor
          </h2>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed">
            Every donation directly purchases instruments, boots, science kits, and lesson access for children who need it most.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-brand-offwhite rounded-3xl p-8 border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-brand-border flex items-center justify-center text-brand-darkest mb-6 group-hover:bg-brand-darkest group-hover:text-white transition-colors duration-200 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-darkest mb-3">{tier.name}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed mb-6 font-normal">
                    {tier.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {tier.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-medium text-brand-primary">
                        <ShieldCheck className="w-4 h-4 text-brand-darkest flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3 px-4 rounded-xl bg-white border border-brand-darkest text-brand-darkest text-xs font-bold text-center hover:bg-brand-darkest hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

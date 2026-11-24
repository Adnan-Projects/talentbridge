'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How does TalentBridge identify and verify talented children?',
    a: 'Children are referred by their school teachers, grassroots coaches, or accredited community welfare organizations. Our local coordinators conduct a preliminary talent evaluation and an environmental needs assessment to verify that the child faces genuine economic constraints.',
  },
  {
    q: 'What safeguards and background checks are in place for volunteers?',
    a: 'Child safety is our absolute highest priority. Every volunteer undergoing student matching must complete an Enhanced DBS (Disclosure and Barring Service) background check, provide professional references, and complete our mandatory Child Protection & Safeguarding induction course before any sessions begin.',
  },
  {
    q: 'What types of equipment donations do you accept?',
    a: 'We accept gently used and new musical instruments (violins, guitars, keyboards, flutes), sports equipment (boots, training kits, balls, bats, spikes), visual arts supplies (paint sets, easels, sketchbooks), and academic tech (refurbished laptops, calculators). All physical gear is inspected before assignment.',
  },
  {
    q: 'How are donations and financial contributions tracked?',
    a: 'We operate with total transparency. Financial contributions are ring-fenced for specific student needs (e.g., term lesson fees or specific equipment purchases). Sponsors receive itemized receipt updates and periodic progress reports detailing how the child is advancing.',
  },
  {
    q: 'Can organizations or corporations become partners?',
    a: 'Yes. We work closely with corporate CSR departments, foundations, and arts organizations. Corporate partners can sponsor regional cohorts, provide employee volunteer mentorship hours, or donate refurbished hardware under structured CSR agreements.',
  },
  {
    q: 'Can a child contact or message a volunteer directly?',
    a: 'No. To ensure full child safeguarding, all communications and sessions are scheduled through the TalentBridge platform and supervised by verified school coordinators or approved guardians. Direct, unmonitored adult-to-child messaging is strictly prohibited.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-brand-offwhite border-t border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-darkest tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-brand-secondary">
            Everything you need to know about partnering, volunteering, and child safeguarding.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-brand-border overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-brand-light/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-brand-darkest">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-brand-secondary flex-shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180 text-brand-darkest'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-secondary leading-relaxed border-t border-brand-border/40 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

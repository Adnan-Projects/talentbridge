'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-24 bg-brand-darkest text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Join Our Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight max-w-3xl mx-auto">
            &ldquo;A little support can unlock extraordinary potential.&rdquo;
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Whether you mentor a student for one hour a week, donate a used instrument, or sponsor a child&apos;s
            annual tuition, you are directly reshaping a life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-brand-darkest text-base font-bold hover:bg-brand-offwhite transition-all duration-200 shadow-float"
            >
              <span>Get Involved Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent border border-white/20 text-white text-base font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

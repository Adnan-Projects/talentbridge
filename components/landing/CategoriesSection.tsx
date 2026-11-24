'use client';

import { motion } from 'framer-motion';
import { Music, Trophy, Activity, Palette, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'Music & Instruments',
    description: 'Violin, guitar, piano, vocals, music theory, and band instruments.',
    icon: Music,
    count: '34 Students Active',
  },
  {
    title: 'Sports & Fitness',
    description: 'Football, athletics, cricket, conditioning, and competitive training.',
    icon: Trophy,
    count: '42 Students Active',
  },
  {
    title: 'Dance & Performing Arts',
    description: 'Classical dance, contemporary, hip-hop, choreography, and stage presence.',
    icon: Activity,
    count: '28 Students Active',
  },
  {
    title: 'Drawing & Painting',
    description: 'Oil, acrylic, watercolour, sketch work, digital illustration, and portfolio guidance.',
    icon: Palette,
    count: '23 Students Active',
  },
  {
    title: 'Academic Tutoring',
    description: 'Advanced mathematics, physics, biology, coding, robotics, and scholarship preparation.',
    icon: BookOpen,
    count: '38 Students Active',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Areas of Focus
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight">
              Explore Opportunities
            </h2>
          </div>
          <p className="text-sm sm:text-base text-brand-secondary max-w-md">
            We provide targeted support across diverse creative, athletic, and academic disciplines.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-darkest mb-6 group-hover:bg-brand-darkest group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-darkest mb-2">{cat.title}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-medium text-brand-secondary">
                  <span>{cat.count}</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-brand-darkest font-semibold hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    Support <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

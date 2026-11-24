'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Heart, Gift, BookOpen } from 'lucide-react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ target, suffix = '', duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(update);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    target: 120,
    suffix: '+',
    label: 'Students Supported',
    subtext: 'Across 15 talent disciplines',
  },
  {
    icon: Heart,
    target: 45,
    suffix: '+',
    label: 'Active Volunteers',
    subtext: 'Tutors, coaches & artists',
  },
  {
    icon: Gift,
    target: 80,
    suffix: '+',
    label: 'Donations Delivered',
    subtext: 'Instruments, kits & gear',
  },
  {
    icon: BookOpen,
    target: 500,
    suffix: '+',
    label: 'Learning Sessions',
    subtext: 'Over 1,200 mentoring hours',
  },
];

export default function ImpactStatsSection() {
  return (
    <section id="impact" className="py-24 bg-brand-darkest text-white relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            Real Community Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-base text-white/70 font-normal">
            Every statistic represents a child whose world expanded because someone believed in their gift.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{stat.label}</h3>
                <p className="text-xs text-white/60 font-normal">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Users, Gift, Music, Trophy, Palette, BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden bg-white">
      {/* Background Subtle Gradient & Grid Accents */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-light/70 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-brand-muted/80 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand-border text-brand-darkest text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>Discover &middot; Nurture &middot; Empower</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-darkest tracking-tight leading-[1.08] mb-6">
              Every Child Has a Talent.{' '}
              <span className="font-light text-brand-secondary italic block sm:inline">
                Every Talent Deserves a Chance.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-brand-primary/80 leading-relaxed max-w-2xl mb-8 font-normal">
              TalentBridge connects talented children from disadvantaged backgrounds with mentors, volunteers,
              and sponsors who believe in their potential. Together, we turn hidden talents into extraordinary opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/#mission"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-darkest text-white text-base font-semibold hover:bg-brand-dark transition-all duration-200 shadow-card hover:shadow-card-hover group"
              >
                <span>Discover Our Mission</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-brand-border text-brand-darkest text-base font-semibold hover:bg-brand-light transition-all duration-200 shadow-sm"
              >
                Become a Volunteer
              </Link>
            </div>

            {/* Micro Highlights Pill Row */}
            <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-medium text-brand-secondary">
              <span className="flex items-center gap-1.5">
                <Music className="w-4 h-4 text-brand-primary" /> Music &amp; Arts
              </span>
              <span className="text-brand-divider">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-brand-primary" /> Sports &amp; Athletics
              </span>
              <span className="text-brand-divider">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-brand-primary" /> Painting &amp; Design
              </span>
              <span className="text-brand-divider">&bull;</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-primary" /> Academic Tutoring
              </span>
            </div>
          </motion.div>

          {/* Right Visual Composition with Floating Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Main Visual Image Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-brand-light">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
                alt="Young student learning with teacher"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nurturing Dreams</span>
                </div>
                <h3 className="text-lg font-bold">Unlocking Tomorrow's Leaders</h3>
                <p className="text-xs text-white/80 mt-1">Bridging violin, athletics, arts, and STEM across communities.</p>
              </div>
            </div>

            {/* Floating Card 1: 120+ Young Talents Supported (Top Left) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-float border border-brand-border flex items-center gap-3.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-darkest text-white flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-brand-darkest leading-none">120+</p>
                <p className="text-xs font-medium text-brand-secondary mt-1">Young Talents Supported</p>
              </div>
            </motion.div>

            {/* Floating Card 2: 45+ Active Volunteers (Right Middle) */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-float border border-brand-border flex items-center gap-3.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-darkest flex items-center justify-center border border-brand-border">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-brand-darkest leading-none">45+</p>
                <p className="text-xs font-medium text-brand-secondary mt-1">Active Volunteers</p>
              </div>
            </motion.div>

            {/* Floating Card 3: 80+ Donations Delivered (Bottom Left) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -bottom-6 left-6 sm:left-2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-float border border-brand-border flex items-center gap-3.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-muted text-brand-darkest flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-brand-darkest leading-none">80+</p>
                <p className="text-xs font-medium text-brand-secondary mt-1">Donations Delivered</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

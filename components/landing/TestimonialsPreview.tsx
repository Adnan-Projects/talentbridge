'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight, User, CheckCircle2 } from 'lucide-react';

const videoPreviews = [
  {
    category: 'Music / Violin',
    videoSrc: '/videos/violin-teacher.mp4',
    title: 'The Power of Music',
    description: 'A teacher teaching violin to a talented student.',
    mentor: 'Sarah Mitchell',
    mentorTitle: 'Orchestral Violinist',
    student: 'Amara K. (Age 12)',
  },
  {
    category: 'Dance',
    videoSrc: '/videos/dance-teacher.mp4',
    title: 'Moving Beyond Boundaries',
    description: 'A dance teacher guiding students through an expressive contemporary dance lesson.',
    mentor: 'Leila Rashidi',
    mentorTitle: 'Choreographer & Instructor',
    student: 'Aisha R. (Age 13)',
  },
  {
    category: 'Football',
    videoSrc: '/videos/football-coach.mp4',
    title: 'Dreams Beyond the Field',
    description: 'A football coach training young players on tactics, agility, and teamwork.',
    mentor: 'Marcus Thompson',
    mentorTitle: 'UEFA B Licensed Coach',
    student: 'Kofi M. (Age 14)',
  },
];

export default function TestimonialsPreview() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-brand-offwhite relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Video Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight">
              Stories of Talent
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-darkest hover:text-brand-primary group transition-colors"
          >
            <span>Explore Full Video Showcase</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoPreviews.map((vid, idx) => {
            const isPlaying = playingId === vid.title;

            return (
              <motion.div
                key={vid.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
              >
                {/* Video Container */}
                <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={vid.videoSrc}
                    preload="metadata"
                    playsInline
                    controls={isPlaying}
                    className="w-full h-full object-cover"
                    onPause={() => setPlayingId(null)}
                  />

                  {/* Play Overlay if not playing */}
                  {!isPlaying && (
                    <div
                      onClick={() => setPlayingId(vid.title)}
                      className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors p-5 flex flex-col justify-between text-white cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20">
                          {vid.category}
                        </span>
                        <span className="text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          HD Video
                        </span>
                      </div>

                      <div className="flex items-center justify-center my-auto">
                        <div className="w-14 h-14 rounded-full bg-white text-brand-darkest flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all shadow-float">
                          <Play className="w-6 h-6 ml-0.5 fill-current" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/90">
                        <span>Featuring {vid.student}</span>
                        <span className="text-[10px] text-white/60">Click to Play</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brand-darkest mb-2 group-hover:text-brand-primary transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed mb-6">
                      {vid.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center text-brand-darkest">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-darkest">{vid.mentor}</p>
                        <p className="text-[10px] text-brand-secondary">{vid.mentorTitle}</p>
                      </div>
                    </div>
                    <Link
                      href="/testimonials"
                      className="text-xs font-bold text-brand-darkest hover:underline"
                    >
                      Full Story &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

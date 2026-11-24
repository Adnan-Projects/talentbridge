'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VideoSection from '@/components/testimonials/VideoSection';
import { Star, Trophy, Award, Heart, CheckCircle2, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const writtenTestimonials = [
  {
    author: 'Elena R. (Parent of Amara)',
    role: 'Parent & Caregiver',
    stars: 5,
    quote:
      'We could never have afforded a violin, let alone weekly private lessons. TalentBridge gave Amara a voice she never knew she had. Watching her play at her school recital brought the whole family to tears.',
    tag: 'Violin Programme',
  },
  {
    author: 'Sarah Mitchell',
    role: 'Volunteer Music Educator',
    stars: 5,
    quote:
      'Teaching Amara has renewed my faith in education. She absorbs technique like a sponge. In four months, she progressed through what usually takes a year. TalentBridge’s support structure made every lesson seamless.',
    tag: 'Volunteer Story',
  },
  {
    author: 'Robert Kimani',
    role: 'Individual Sponsor & Former Athlete',
    stars: 5,
    quote:
      'Sponsoring Kofi’s football kit and coaching was an easy choice. He has genuine talent and dedication. Getting quarterly progress updates and seeing him scouted for the regional youth team is priceless.',
    tag: 'Sponsor Perspective',
  },
  {
    author: 'Liam O.',
    role: 'Student (Age 13, Visual Art)',
    stars: 5,
    quote:
      'Before TalentBridge, I was using stubby school pencils on scrap paper. Having professional canvas boards, oil paints, and James mentoring me changed everything. I won my first borough art competition last month!',
    tag: 'Student Voice',
  },
  {
    author: 'Marcus Thompson',
    role: 'UEFA Licenced Football Coach',
    stars: 5,
    quote:
      'Raw athletic ability is everywhere in our communities, but without tactical coaching and proper footwear, kids get left behind. TalentBridge bridges that gap with incredible professionalism.',
    tag: 'Coach Story',
  },
  {
    author: 'Dr. Amina Yusuf',
    role: 'Volunteer Mathematics Tutor',
    stars: 5,
    quote:
      'Fatima is solving Olympiad problem sets that challenge undergraduate mathematicians. Giving her access to advanced textbooks and structured weekly mentoring unlocked immense potential.',
    tag: 'Academic Mentorship',
  },
];

const achievements = [
  {
    title: 'Regional Youth League Top Scorer',
    student: 'Kofi M. (Age 14)',
    category: 'Sports / Football',
    description: 'Scored 24 goals in 16 matches after receiving training boots and tactical coaching.',
    badge: '1st Place',
  },
  {
    title: 'Regional Maths Olympiad Silver Medal',
    student: 'Fatima A. (Age 15)',
    category: 'Academic / Maths',
    description: 'Ranked in the top 2% of over 4,000 participants across the Midlands region.',
    badge: 'Silver Medal',
  },
  {
    title: 'Youth Contemporary Dance Champion',
    student: 'Imani L. (Age 14)',
    category: 'Dance & Performing Arts',
    description: 'Choreographed original routine winning the Coventry Youth Showcase.',
    badge: 'Regional Winner',
  },
  {
    title: 'Borough Young Artist of the Year',
    student: 'Liam O. (Age 13)',
    category: 'Visual Arts',
    description: 'Oil portrait exhibited at the Birmingham Library Youth Exhibition.',
    badge: 'Exhibition Feature',
  },
  {
    title: 'Junior Orchestra Soloist',
    student: 'Amara K. (Age 12)',
    category: 'Classical Music',
    description: 'Selected as guest soloist for the West Midlands Junior Strings Gala.',
    badge: 'Guest Soloist',
  },
  {
    title: 'Under-16 100m Sprint Champion',
    student: 'Ethan J. (Age 15)',
    category: 'Athletics',
    description: 'Clocked 11.2s at Newcastle Athletics Championship wearing sponsored spikes.',
    badge: 'Record Holder',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-brand-darkest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
              Transformative Journeys
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Stories of Talent
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              Hear directly from our students, volunteer mentors, and sponsors about how access,
              compassion, and dedication turn hidden potential into lifelong achievement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Video Section 1: Music / Violin ── */}
      <VideoSection
        id="video-music"
        defaultVideoSrc="/videos/violin-teacher.mp4"
        tag="Video Showcase 1 &middot; Music &amp; Strings"
        title="The Power of Music"
        description="A dedicated violin teacher guides a 12-year-old student through the discipline and beauty of classical music, turning raw curiosity into expressive artistry."
        teacherName="Sarah Mitchell"
        teacherRole="Professional Violinist &amp; Youth Educator"
        studentName="Amara K."
        studentAge={12}
        studentStory="Amara first heard a violin during a school assembly and fell in love with the sound. Through TalentBridge, she received a 3/4 size violin and weekly mentoring. In under five months, she learned posture, bowing, and performed her first Bach minuet."
        studentQuote="When I hold my violin, I forget about everything difficult. Sarah taught me that making a mistake isn't failing — it's just learning where the next note is."
        accentBg="white"
        reverse={false}
      />

      {/* ── Video Section 2: Dance ── */}
      <VideoSection
        id="video-dance"
        defaultVideoSrc="/videos/dance-teacher.mp4"
        tag="Video Showcase 2 &middot; Movement &amp; Expression"
        title="Moving Beyond Boundaries"
        description="A passionate dance instructor works with aspiring dancers, using contemporary movement to build posture, emotional resilience, and fearless self-expression."
        teacherName="Leila Rashidi"
        teacherRole="Choreographer &amp; Dance Instructor"
        studentName="Aisha R."
        studentAge={13}
        studentStory="Aisha was painfully shy when referred to TalentBridge. Through contemporary dance classes, she discovered how movement could speak for her. Now leading her school team, she recently qualified for regional dance finals."
        studentQuote="Dance gave me confidence I never had before. Leila taught me that my background doesn't limit where my feet can take me."
        accentBg="offwhite"
        reverse={true}
      />

      {/* ── Video Section 3: Football ── */}
      <VideoSection
        id="video-football"
        defaultVideoSrc="/videos/football-coach.mp4"
        tag="Video Showcase 3 &middot; Sports &amp; Leadership"
        title="Dreams Beyond the Field"
        description="A former semi-pro footballer turned UEFA youth coach brings discipline, tactical agility, and mental fortitude to talented young footballers."
        teacherName="Marcus Thompson"
        teacherRole="UEFA B Licensed Coach &amp; Youth Mentor"
        studentName="Kofi M."
        studentAge={14}
        studentStory="Kofi spent years playing barefoot on asphalt with improvised balls. With sponsored boots, proper kit, and Marcus’s weekly coaching, his vision and tactical speed quickly set him apart in the Greater Manchester youth league."
        studentQuote="Coach Marcus doesn't just teach me how to shoot; he teaches me how to think three passes ahead and how to support my teammates on and off the pitch."
        accentBg="dark"
        reverse={false}
      />

      {/* ── Written Testimonials Grid ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-brand-light border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4">
              Voices of Change
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-4">
              What Our Community Says
            </h2>
            <p className="text-base text-brand-secondary">
              Perspectives from the families, volunteer coaches, and generous supporters who power TalentBridge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writtenTestimonials.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-brand-offwhite rounded-3xl p-8 border border-brand-border flex flex-col justify-between hover:shadow-card transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-brand-primary border border-brand-border">
                      {t.tag}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-brand-divider mb-3" />
                  <p className="text-sm text-brand-primary leading-relaxed font-normal mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-border/60">
                  <p className="text-sm font-bold text-brand-darkest">{t.author}</p>
                  <p className="text-xs text-brand-secondary">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student Achievement Highlights ── */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              Milestones &amp; Honors
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-4">
              Celebrating Student Achievements
            </h2>
            <p className="text-base text-brand-secondary">
              Evidence of what becomes possible when dedication meets timely opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-brand-border shadow-card flex items-start gap-4 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-darkest flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1.5">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-brand-darkest mb-1">{item.title}</h3>
                  <p className="text-xs font-semibold text-brand-primary mb-2">
                    {item.student} &middot; <span className="text-brand-secondary">{item.category}</span>
                  </p>
                  <p className="text-xs text-brand-secondary leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-darkest text-white text-sm font-semibold hover:bg-brand-dark transition-all duration-200 shadow-card"
            >
              <span>Support Our Next Milestone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

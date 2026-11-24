'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Scale,
  Heart,
  Zap,
  Eye,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  BookOpen,
  Music,
  Trophy,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ─── Animation helpers ─── */
const fadeUp: any = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: any = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      variants={stagger()}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Data ─── */
const coreValues = [
  {
    icon: Scale,
    label: 'Equal Opportunity',
    description:
      'Every child, regardless of economic background, deserves access to the resources that allow their talent to flourish.',
  },
  {
    icon: Heart,
    label: 'Compassion',
    description:
      'We approach every family, volunteer, and sponsor relationship with empathy, patience, and genuine human care.',
  },
  {
    icon: Zap,
    label: 'Empowerment',
    description:
      "We don't just provide resources — we build confidence, agency, and the belief that every child is capable of greatness.",
  },
  {
    icon: Eye,
    label: 'Transparency',
    description:
      'Donors and sponsors can always see exactly how their contributions create measurable, lasting change.',
  },
  {
    icon: Users,
    label: 'Community',
    description:
      'We build lasting networks between students, volunteers, families, and sponsors — a community rooted in shared purpose.',
  },
  {
    icon: TrendingUp,
    label: 'Growth',
    description:
      'We measure success not just in talent unlocked, but in the long-term trajectories of every child we support.',
  },
];

const stats = [
  { value: '500+', label: 'Children Supported', icon: Users },
  { value: '120+', label: 'Active Volunteers', icon: Heart },
  { value: '£250k', label: 'Resources Provided', icon: Star },
  { value: '30+', label: 'Partner Schools', icon: Globe },
];

const journeySteps = [
  {
    step: 1,
    title: 'Child is Referred',
    description: 'Teachers, community leaders, or parents refer a talented child to our platform.',
    icon: BookOpen,
  },
  {
    step: 2,
    title: 'Talent Assessment',
    description: "Our trained volunteers conduct a holistic assessment of the child's strengths and interests.",
    icon: Star,
  },
  {
    step: 3,
    title: 'Needs Identified',
    description: 'We identify the specific resources, mentorship, and support the child requires to progress.',
    icon: CheckCircle,
  },
  {
    step: 4,
    title: 'Resources & Mentorship',
    description: 'Sponsors fund equipment; skilled volunteers provide hands-on mentorship and coaching.',
    icon: Music,
  },
  {
    step: 5,
    title: 'Growth & Achievement',
    description: 'The child reaches new milestones — competitions, performances, scholarships, and beyond.',
    icon: Trophy,
  },
];

const teamMembers = [
  {
    name: 'Dr. Priya Nair',
    role: 'Founder & Executive Director',
    bio: 'A former UNICEF programme officer, Priya founded TalentBridge after witnessing first-hand how socioeconomic barriers rob communities of exceptional talent. She holds a PhD in Education Policy from UCL.',
    image: 'https://picsum.photos/seed/priya-nair/400/400',
  },
  {
    name: 'James Okafor',
    role: 'Head of Partnerships',
    bio: "James brings over a decade of corporate social responsibility leadership from the financial services sector. He builds and sustains the sponsor networks that fund TalentBridge's work across London.",
    image: 'https://picsum.photos/seed/james-okafor/400/400',
  },
  {
    name: 'Elena Petrova',
    role: 'Head of Volunteer Programmes',
    bio: 'A former professional musician and music educator, Elena designs and oversees all volunteer training, safeguarding protocols, and mentorship frameworks that ensure every child is safe and supported.',
    image: 'https://picsum.photos/seed/elena-petrova/400/400',
  },
];

/* ─── Page ─── */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative bg-brand-darkest overflow-hidden pt-32 pb-24">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-hero-pattern" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6 border border-white/10">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
              About <br />
              <span className="font-light italic">TalentBridge</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
              We exist because talent is universal — but opportunity is not. TalentBridge closes that
              gap, one child at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <Section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              How We Began
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-brand-darkest mb-8 leading-tight">
              Our Story
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-6 text-brand-primary text-lg leading-relaxed text-left">
              <p>
                TalentBridge was born in 2018 from a simple but devastating observation: across
                London's most underserved communities, there were children of extraordinary talent —
                mathematicians, musicians, athletes, artists — whose gifts were quietly disappearing
                for want of a violin, a pair of football boots, a science kit, or simply an adult
                who believed in them.
              </p>
              <p>
                Our founder, Dr. Priya Nair, had spent years working with international development
                organisations and saw the same story repeated globally. Talent is not scarce. It is
                staggeringly abundant in every community on earth. What is scarce is{' '}
                <strong className="text-brand-darkest font-semibold">access</strong> — to equipment,
                to mentors, to the financial breathing room that lets a child pursue something beyond
                immediate necessity.
              </p>
              <p>
                So she built TalentBridge: a platform that connects gifted children with skilled
                volunteers who can nurture their abilities, and with generous sponsors who can fund
                the tools they need. The result is a living ecosystem of support — measurable,
                transparent, and rooted in genuine community relationships.
              </p>
              <p>
                Since 2018, we have supported over 500 children across 30 partner schools, delivered
                more than £250,000 in equipment and resources, and seen our students win regional
                competitions, earn music scholarships, and step onto stages they once only dreamed
                of standing on.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Vision + Mission ── */}
      <Section className="py-16 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger()} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              variants={fadeUp}
              className="bg-brand-white rounded-2xl p-10 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-brand-border"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-darkest flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-darkest mb-4">Our Vision</h3>
              <p className="text-brand-primary leading-relaxed text-lg">
                A world where every child's talent is seen, nurtured, and given the chance to change
                the world — regardless of the postcode they were born in.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={fadeUp}
              className="bg-brand-darkest rounded-2xl p-10 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed text-lg">
                To identify, support, and champion children from disadvantaged backgrounds by
                connecting them with skilled mentors, essential resources, and a community of
                sponsors committed to building lasting opportunity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ── Why We Exist — Stats ── */}
      <Section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              The Gap We're Closing
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-brand-darkest mb-6 leading-tight">
              Why TalentBridge Exists
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-lg text-brand-secondary leading-relaxed">
              The data is sobering. The need is real. The opportunity to change lives is now.
            </motion.p>
          </div>

          {/* Stats Row */}
          <motion.div variants={stagger(0.12)} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-brand-offwhite rounded-2xl p-8 text-center border border-brand-border hover:shadow-card transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-darkest flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-4xl font-black text-brand-darkest mb-1">{value}</div>
                <div className="text-sm text-brand-secondary font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Narrative */}
          <motion.div variants={fadeUp} className="bg-brand-darkest rounded-2xl p-10 text-center">
            <blockquote className="text-2xl sm:text-3xl font-light text-white leading-relaxed max-w-3xl mx-auto italic">
              "In the UK, children from the wealthiest households are 7× more likely to reach a
              professional level in their chosen art or sport than those from the poorest. We exist
              to change that ratio."
            </blockquote>
            <p className="mt-6 text-white/50 text-sm">— TalentBridge Impact Report, 2024</p>
          </motion.div>
        </div>
      </Section>

      {/* ── Core Values ── */}
      <Section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              What Guides Us
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-brand-darkest leading-tight">
              Core Values
            </motion.h2>
          </div>

          <motion.div variants={stagger(0.08)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(({ icon: Icon, label, description }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-brand-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-brand-border group hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center mb-5 group-hover:bg-brand-darkest transition-colors duration-300">
                  <Icon className="w-5 h-5 text-brand-darkest group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-brand-darkest mb-3">{label}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Impact Journey ── */}
      <Section className="py-24 bg-brand-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              The Process
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-brand-darkest leading-tight">
              How We Create Impact
            </motion.h2>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start gap-0">
            {journeySteps.map(({ step, title, description, icon: Icon }, i) => (
              <div key={step} className="flex items-start flex-1">
                <motion.div
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 text-center px-4"
                >
                  <div className="relative inline-flex">
                    <div className="w-16 h-16 rounded-2xl bg-brand-darkest flex items-center justify-center mx-auto mb-4 shadow-float">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-offwhite border-2 border-brand-border text-xs font-black text-brand-darkest flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-brand-darkest mb-2">{title}</h3>
                  <p className="text-xs text-brand-secondary leading-relaxed">{description}</p>
                </motion.div>
                {i < journeySteps.length - 1 && (
                  <div className="flex-shrink-0 mt-8 text-brand-divider">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden flex flex-col gap-6">
            {journeySteps.map(({ step, title, description, icon: Icon }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="flex gap-5 items-start"
              >
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 rounded-xl bg-brand-darkest flex items-center justify-center shadow-float">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-offwhite border-2 border-brand-border text-[10px] font-black text-brand-darkest flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-darkest mb-1">{title}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Team ── */}
      <Section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              The People Behind It
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-brand-darkest leading-tight">
              Meet Our Team
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl mx-auto text-brand-secondary text-lg">
              Passionate, experienced, and driven by one shared belief — that every child deserves a chance.
            </motion.p>
          </div>

          <motion.div variants={stagger(0.12)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(({ name, role, bio, image }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-brand-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-brand-border group hover:-translate-y-1"
              >
                <div className="relative h-64 w-full overflow-hidden bg-brand-light">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold text-brand-darkest mb-1">{name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-secondary mb-4">{role}</p>
                  <p className="text-sm text-brand-secondary leading-relaxed">{bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-24 bg-brand-darkest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
            Be Part of the Change
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Join us in bridging the gap
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you volunteer your skills, sponsor a child's journey, or simply spread the word — your
            involvement changes lives. The next great musician, scientist, or athlete is waiting for someone like you.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-darkest font-bold text-sm hover:bg-brand-offwhite transition-colors duration-200"
            >
              Get Involved Today
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors duration-200 border border-white/10"
            >
              Read Our Stories
            </Link>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

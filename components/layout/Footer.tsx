'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Globe, Share2, MessageSquare, Send } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Students', href: '/#talents' },
    { label: 'Volunteers', href: '/#volunteers' },
    { label: 'Sponsors', href: '/#sponsors' },
    { label: 'Our Mission', href: '/#mission' },
  ],
  Organisation: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Stories', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin Dashboard', href: '/admin' },
  ],
};

const socialLinks = [
  { icon: Globe, href: 'https://twitter.com', label: 'Twitter / X' },
  { icon: Share2, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: MessageSquare, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Send, href: 'https://facebook.com', label: 'Community' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-darkest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Talent<span className="font-light">Bridge</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Connecting talented children from disadvantaged backgrounds with the mentors, resources,
              and opportunities they deserve.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span>info@talentbridge.org.uk</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span>+44 20 7000 0000</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} TalentBridge. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
            <span>&middot;</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Safeguarding</Link>
            <span>&middot;</span>
            <Link href="/admin" className="hover:text-white/70 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

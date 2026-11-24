'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Impact', href: '/#impact' },
  { label: 'Stories & Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-brand-border'
            : 'bg-white/80 backdrop-blur-sm border-b border-brand-border/40'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-darkest flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-extrabold text-xl text-brand-darkest tracking-tight">
                Talent<span className="font-light text-brand-secondary">Bridge</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-brand-darkest text-white shadow-sm'
                        : 'text-brand-primary hover:bg-brand-light hover:text-brand-darkest'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Admin Access */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-secondary hover:text-brand-darkest hover:bg-brand-light transition-colors"
                title="Admin Dashboard"
              >
                <Shield className="w-3.5 h-3.5 text-brand-subtle" />
                <span>Admin</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-darkest text-white text-sm font-semibold hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow"
              >
                Get Involved
              </Link>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 rounded-xl text-brand-primary hover:bg-brand-light transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 sm:top-20 z-40 bg-white border-b border-brand-border shadow-float lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'bg-brand-darkest text-white'
                      : 'text-brand-primary hover:bg-brand-light'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-brand-border flex flex-col gap-2">
                <Link
                  href="/admin"
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-brand-secondary hover:text-brand-darkest hover:bg-brand-light flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-brand-subtle" />
                  <span>Admin Dashboard Access</span>
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-3 rounded-xl bg-brand-darkest text-white text-sm font-semibold text-center hover:bg-brand-dark transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

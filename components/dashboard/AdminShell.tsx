'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  HandHeart,
  Building2,
  Gift,
  Package,
  BookOpen,
  Shuffle,
  BarChart3,
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard',         href: '/admin',                   icon: LayoutDashboard },
  { label: 'Students',          href: '/admin/students',           icon: Users },
  { label: 'Volunteers',        href: '/admin/volunteers',         icon: HandHeart },
  { label: 'Sponsors',          href: '/admin/sponsors',           icon: Building2 },
  { label: 'Donations',         href: '/admin/donations',          icon: Gift },
  { label: 'Equipment Requests',href: '/admin/equipment-requests', icon: Package },
  { label: 'Tutoring Requests', href: '/admin/tutoring-requests',  icon: BookOpen },
  { label: 'Matching',          href: '/admin/matching',           icon: Shuffle },
  { label: 'Reports',           href: '/admin/reports',            icon: BarChart3 },
  { label: 'Testimonials',      href: '/admin/testimonials',       icon: MessageSquareQuote },
];

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-offwhite flex">
      {/* ── Desktop Sidebar ───────────────────────────────── */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-white border-r border-brand-border shrink-0 transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-brand-border shrink-0 h-16">
          <div className="w-8 h-8 rounded-lg bg-brand-darkest flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold text-brand-darkest text-sm tracking-tight truncate"
            >
              TalentBridge
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative',
                  active
                    ? 'bg-brand-darkest text-white'
                    : 'text-brand-secondary hover:bg-brand-light hover:text-brand-darkest'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-14 bg-brand-darkest text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-brand-border px-2 py-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-brand-secondary hover:bg-brand-light hover:text-brand-darkest transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-brand-border flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-4 py-5 border-b border-brand-border h-16">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-darkest flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-brand-darkest text-sm">TalentBridge</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1 text-brand-secondary hover:text-brand-darkest">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 space-y-0.5 px-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                        active
                          ? 'bg-brand-darkest text-white'
                          : 'text-brand-secondary hover:bg-brand-light hover:text-brand-darkest'
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-brand-border h-16 flex items-center px-4 lg:px-6 gap-4 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-brand-secondary hover:text-brand-darkest"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-brand-subtle font-medium uppercase tracking-widest">Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

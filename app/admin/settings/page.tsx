'use client';

import { useState } from 'react';
import { Shield, RotateCcw, CheckCircle2, Bell, Lock, Database } from 'lucide-react';
import { resetAllData } from '@/lib/storage';

export default function AdminSettingsPage() {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    matchingAlerts: true,
    donationAlerts: true,
  });

  const handleReset = () => {
    if (confirm('Reset all mock data in localStorage to initial default values?')) {
      resetAllData();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-darkest tracking-tight">
          Admin Settings &amp; Configuration
        </h1>
        <p className="text-sm text-brand-secondary mt-1">
          Safeguarding policies, notification preferences, and frontend mock database controls.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>All mock database stores have been reset to factory defaults. Reloading...</span>
        </div>
      )}

      {/* Safeguarding & Child Safety Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
          <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-darkest">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-brand-darkest">Safeguarding Governance Protocols</h3>
            <p className="text-xs text-brand-secondary">Mandatory privacy and adult-child contact restrictions</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-brand-secondary leading-relaxed">
          <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
            <p className="font-bold text-brand-darkest mb-0.5">Strict Anonymization Protocol</p>
            <p>Children&apos;s full surnames, exact home street addresses, and school IDs are hidden from public views.</p>
          </div>
          <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
            <p className="font-bold text-brand-darkest mb-0.5">Supervised Communication Only</p>
            <p>Direct unmonitored messaging between adults and children is programmatically disabled across the entire frontend architecture.</p>
          </div>
          <div className="p-3 bg-brand-offwhite rounded-xl border border-brand-border/60">
            <p className="font-bold text-brand-darkest mb-0.5">Admin-Mediated Matching</p>
            <p>All volunteer-student connections require explicit confirmation by platform administrators.</p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
          <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-darkest">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-brand-darkest">Platform Notifications</h3>
            <p className="text-xs text-brand-secondary">Simulated admin alert triggers</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-brand-light rounded-xl">
            <div>
              <p className="font-bold text-brand-darkest">New Student Referral Alerts</p>
              <p className="text-brand-secondary">Trigger notification when a school coordinator submits a new talent.</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
              className="w-4 h-4 accent-brand-darkest"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-brand-light rounded-xl">
            <div>
              <p className="font-bold text-brand-darkest">High-Compatibility Match Alerts (&ge;70%)</p>
              <p className="text-brand-secondary">Notify when smart matching algorithm identifies synergy.</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.matchingAlerts}
              onChange={(e) => setNotifications({ ...notifications, matchingAlerts: e.target.checked })}
              className="w-4 h-4 accent-brand-darkest"
            />
          </label>
        </div>
      </div>

      {/* Mock Data Reset */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-card space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-red-100">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-brand-darkest">Mock Storage Data Management</h3>
            <p className="text-xs text-brand-secondary">Reset frontend state &amp; localStorage</p>
          </div>
        </div>

        <p className="text-xs text-brand-secondary leading-relaxed">
          TalentBridge runs in frontend-only demonstration mode with local mock persistence. If you have modified records, added test students, or rejected matches, clicking below will reset everything back to the 20 initial sample students, 15 volunteers, and 15 donations.
        </p>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Mock Data to Default</span>
        </button>
      </div>
    </div>
  );
}

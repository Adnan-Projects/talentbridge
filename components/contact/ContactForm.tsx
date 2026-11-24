'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2 } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  inquiryCategory: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      inquiryCategory: 'General Inquiry',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate frontend submission delay
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-card">
      {isSuccess ? (
        <div className="py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-brand-darkest mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-sm text-brand-secondary max-w-md mx-auto mb-8 leading-relaxed">
            Thank you for reaching out to TalentBridge. A member of our community team will review your inquiry and respond within 24–48 hours.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="px-6 py-2.5 rounded-xl bg-brand-darkest text-white text-xs font-semibold hover:bg-brand-dark transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('fullName', { required: 'Please enter your name' })}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest placeholder:text-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest placeholder:text-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
                Phone Number <span className="text-brand-subtle font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="+44 7700 900000"
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest placeholder:text-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all"
              />
            </div>

            {/* Inquiry Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
                Inquiry Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('inquiryCategory', { required: true })}
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest font-medium focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Become a Volunteer">Become a Volunteer</option>
                <option value="Become a Sponsor">Become a Sponsor</option>
                <option value="Equipment Donation">Equipment Donation</option>
                <option value="Tutoring Support">Tutoring Support</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('subject', { required: 'Please enter a subject' })}
              placeholder="How can we assist you?"
              className="w-full px-4 py-3 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest placeholder:text-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              {...register('message', {
                required: 'Please write your message',
                minLength: {
                  value: 15,
                  message: 'Please provide at least 15 characters',
                },
              })}
              placeholder="Tell us about your interest in mentoring, donating equipment, or sponsoring a child..."
              className="w-full px-4 py-3 bg-brand-offwhite border border-brand-border rounded-xl text-sm text-brand-darkest placeholder:text-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-darkest/10 focus:border-brand-primary transition-all resize-none"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-brand-darkest text-white text-sm font-bold hover:bg-brand-dark transition-all duration-200 shadow-card flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="border-t-white" />
                <span>Submitting Your Message...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

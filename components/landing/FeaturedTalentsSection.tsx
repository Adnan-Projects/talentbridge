'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import mockStudents, { Student } from '@/data/mockStudents';
import Modal from '@/components/shared/Modal';

export default function FeaturedTalentsSection() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Take first 6 students as featured
  const featured = mockStudents.slice(0, 6);

  const handleSupport = (student: Student) => {
    setSelectedStudent(student);
    setSupportSuccess(false);
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-light border border-brand-border text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Safe &amp; Anonymized Profiles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight mb-4">
            Featured Talents
          </h2>
          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed">
            Meet a few of the dedicated young people currently working towards their dreams with TalentBridge mentors.
          </p>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((student, idx) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Header & Avatar */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-brand-light border border-brand-border flex-shrink-0">
                    <Image
                      src={student.imageUrl}
                      alt={student.displayName}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-brand-darkest truncate">
                        {student.displayName}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-primary border border-brand-border">
                        Age {student.age}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-brand-secondary mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-subtle" />
                      <span>{student.region}</span>
                    </div>
                  </div>
                </div>

                {/* Category & Specific Skill */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-darkest text-white">
                    {student.talentCategory}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-offwhite text-brand-secondary border border-brand-border">
                    {student.specificSkill}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-light text-brand-primary">
                    {student.skillLevel}
                  </span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed line-clamp-2 mb-5">
                  {student.bio}
                </p>

                {/* Current Needs */}
                <div className="space-y-1.5 mb-5 bg-brand-offwhite p-3.5 rounded-xl border border-brand-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">
                    Current Needs:
                  </p>
                  <p className="text-xs text-brand-darkest font-medium truncate">
                    {student.equipmentNeeded.concat(student.tutoringNeeded).slice(0, 2).join(' • ')}
                  </p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                    <span className="text-brand-secondary">Milestone Progress</span>
                    <span className="text-brand-darkest">{student.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-brand-light overflow-hidden">
                    <div
                      className="h-full bg-brand-darkest rounded-full transition-all duration-500"
                      style={{ width: `${student.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Support CTA Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => handleSupport(student)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-brand-darkest text-brand-darkest text-xs sm:text-sm font-semibold hover:bg-brand-darkest hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Support {student.displayName}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-light text-brand-darkest text-sm font-semibold hover:bg-brand-darkest hover:text-white transition-all duration-200"
          >
            <span>Inquire About Sponsoring a Student</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Support Student Modal */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent ? `Support ${selectedStudent.displayName}` : ''}
        size="md"
      >
        {selectedStudent && (
          <div className="space-y-5">
            {supportSuccess ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-brand-darkest mb-1">
                  Thank You for Your Generosity!
                </h4>
                <p className="text-sm text-brand-secondary mb-6">
                  Our team has recorded your interest in supporting {selectedStudent.displayName}. We will contact you within 24 hours to arrange next steps safely.
                </p>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-6 py-2.5 bg-brand-darkest text-white text-sm font-semibold rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-brand-secondary">
                  You are expressing support for <strong className="text-brand-darkest">{selectedStudent.displayName}</strong> ({selectedStudent.specificSkill}, {selectedStudent.region}).
                </p>

                <div className="p-4 bg-brand-offwhite rounded-2xl border border-brand-border space-y-2 text-xs">
                  <p className="font-semibold text-brand-darkest">Requested Equipment:</p>
                  <p className="text-brand-secondary">{selectedStudent.equipmentNeeded.join(', ')}</p>
                  <p className="font-semibold text-brand-darkest pt-2">Tutoring Requirements:</p>
                  <p className="text-brand-secondary">{selectedStudent.tutoringNeeded.join(', ')}</p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-brand-darkest block">
                    How would you like to assist?
                  </label>
                  <div className="space-y-2 text-xs text-brand-darkest font-medium">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="supportType" defaultChecked className="accent-brand-darkest" />
                      Donate specific equipment / supplies
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="supportType" className="accent-brand-darkest" />
                      Provide volunteer tutoring / coaching
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="supportType" className="accent-brand-darkest" />
                      Financial sponsorship for lessons
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-border flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 text-xs font-semibold text-brand-secondary hover:text-brand-darkest"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupportSuccess(true)}
                    className="px-5 py-2.5 bg-brand-darkest text-white text-xs font-bold rounded-xl hover:bg-brand-dark shadow-sm"
                  >
                    Submit Support Request
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

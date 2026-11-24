'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Upload, CheckCircle, Volume2, UserCheck, Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VideoShowcaseProps {
  id: string;
  defaultVideoSrc: string;
  title: string;
  tag: string;
  description: string;
  teacherName: string;
  teacherRole: string;
  studentName: string;
  studentAge: number;
  studentStory: string;
  studentQuote: string;
  accentBg: 'white' | 'offwhite' | 'dark';
  reverse?: boolean;
}

export default function VideoSection({
  defaultVideoSrc,
  title,
  tag,
  description,
  teacherName,
  teacherRole,
  studentName,
  studentAge,
  studentStory,
  studentQuote,
  accentBg,
  reverse = false,
}: VideoShowcaseProps) {
  const [videoSrc, setVideoSrc] = useState<string>(defaultVideoSrc);
  const [hasCustomVideo, setHasCustomVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setHasCustomVideo(true);
      setVideoError(false);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoError) {
      fileInputRef.current?.click();
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setVideoError(true);
        });
    }
  };

  const isDark = accentBg === 'dark';

  return (
    <section
      className={cn(
        'py-20 lg:py-28 transition-colors relative overflow-hidden',
        accentBg === 'white' && 'bg-white text-brand-darkest',
        accentBg === 'offwhite' && 'bg-brand-offwhite text-brand-darkest',
        accentBg === 'dark' && 'bg-brand-darkest text-white'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center',
            reverse && 'lg:flex-row-reverse'
          )}
        >
          {/* Video Player & Showcase Area (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn('lg:col-span-7', reverse ? 'lg:order-2' : 'lg:order-1')}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-border/40 bg-zinc-950 aspect-video group">
              {/* Actual HTML5 video element */}
              <video
                ref={videoRef}
                src={videoSrc}
                preload="metadata"
                playsInline
                controls={isPlaying}
                className={cn('w-full h-full object-cover', videoError && 'hidden')}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setVideoError(true)}
              />

              {/* Play Button Overlay (when not playing and video is healthy) */}
              {!isPlaying && !videoError && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors flex flex-col justify-between p-6 sm:p-8 cursor-pointer text-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/20">
                      {tag}
                    </span>
                    <span className="text-xs text-white/80 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      HD Showcase
                    </span>
                  </div>

                  <div className="my-auto text-center flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-white text-brand-darkest flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-float mb-3 group-hover:bg-white">
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </div>
                    <p className="text-sm font-bold text-white drop-shadow-md">
                      Click to Play Video
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span>Featuring {studentName}</span>
                    <span className="text-white/60 font-mono text-[11px]">{defaultVideoSrc}</span>
                  </div>
                </div>
              )}

              {/* Fallback Upload Placeholder UI (only if file missing/error) */}
              {videoError && (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex flex-col justify-between p-6 sm:p-8 text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/10">
                      {tag}
                    </span>
                    <span className="text-xs text-white/60 font-mono">
                      Expected: {defaultVideoSrc}
                    </span>
                  </div>

                  <div className="my-auto text-center flex flex-col items-center">
                    <button
                      onClick={togglePlay}
                      className="w-20 h-20 rounded-full bg-white text-brand-darkest flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-float mb-4"
                      aria-label="Upload video"
                    >
                      <Upload className="w-8 h-8" />
                    </button>
                    <p className="text-sm font-semibold text-white/90">
                      Upload Video File
                    </p>
                    <p className="text-xs text-white/50 mt-1 max-w-xs">
                      Drop <code className="text-white/80">{defaultVideoSrc}</code> into /public/videos or select below.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-white/70">
                      <Volume2 className="w-4 h-4" />
                      <span>HD Audio &amp; Video Ready</span>
                    </div>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/15">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Video File</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Custom Video Loaded Badge */}
              {hasCustomVideo && !videoError && (
                <div className="absolute top-4 right-4 z-20 bg-emerald-600/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Custom Video Active</span>
                </div>
              )}
            </div>

            {/* Quick Actions Strip */}
            <div className="mt-3 flex items-center justify-between text-xs text-brand-secondary px-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Video: <code className="font-mono text-brand-darkest font-semibold">{hasCustomVideo ? 'Custom Upload' : defaultVideoSrc}</code></span>
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-brand-darkest hover:underline font-semibold flex items-center gap-1"
              >
                <Upload className="w-3 h-3" />
                <span>Change Video</span>
              </button>
            </div>
          </motion.div>

          {/* Text & Story Details (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn('lg:col-span-5', reverse ? 'lg:order-1' : 'lg:order-2')}
          >
            <span
              className={cn(
                'inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border',
                isDark
                  ? 'bg-white/10 text-white/90 border-white/10'
                  : 'bg-brand-light text-brand-secondary border-brand-border'
              )}
            >
              {tag}
            </span>

            <h2
              className={cn(
                'text-3xl sm:text-4xl font-black tracking-tight mb-4',
                isDark ? 'text-white' : 'text-brand-darkest'
              )}
            >
              {title}
            </h2>

            <p
              className={cn(
                'text-base leading-relaxed mb-6 font-normal',
                isDark ? 'text-white/80' : 'text-brand-secondary'
              )}
            >
              {description}
            </p>

            {/* Teacher / Coach Card */}
            <div
              className={cn(
                'p-4 rounded-2xl border mb-6 flex items-center gap-3.5',
                isDark
                  ? 'bg-white/5 border-white/10 text-white'
                  : 'bg-white border-brand-border text-brand-darkest shadow-sm'
              )}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center text-brand-darkest flex-shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-brand-subtle">
                  Dedicated Mentor
                </p>
                <p className="text-sm font-bold">{teacherName}</p>
                <p className="text-xs text-brand-secondary">{teacherRole}</p>
              </div>
            </div>

            {/* Student Success Story */}
            <div
              className={cn(
                'p-5 rounded-2xl border space-y-3',
                isDark ? 'bg-white/5 border-white/10' : 'bg-brand-offwhite border-brand-border/80'
              )}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-primary">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Student Spotlight: {studentName} (Age {studentAge})</span>
              </div>
              <p
                className={cn(
                  'text-xs sm:text-sm leading-relaxed',
                  isDark ? 'text-white/70' : 'text-brand-secondary'
                )}
              >
                {studentStory}
              </p>
              <blockquote
                className={cn(
                  'text-xs italic pt-2 border-t font-medium',
                  isDark ? 'border-white/10 text-white/90' : 'border-brand-border text-brand-darkest'
                )}
              >
                &ldquo;{studentQuote}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

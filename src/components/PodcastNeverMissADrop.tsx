import React, { useEffect, useRef, useState } from 'react';
import dropBgVideo from '../assets/videos/never-miss-a-drop-bg.webm';
import dropPosterImg from '../assets/images/podcast/never-miss-a-drop-poster.jpg';

interface PodcastNeverMissADropProps {
  onPressPlay?: () => void;
}

// Realistic Binder Clip Graphic positioned at top center
const BinderClip: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}>
    {/* Silver Wire Loop (top handle pointing up) */}
    <svg
      viewBox="0 0 60 52"
      className="w-10 h-9 sm:w-12 sm:h-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] -mb-2 z-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wireSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6E6EB" />
          <stop offset="45%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#C0C0CA" />
          <stop offset="100%" stopColor="#8A8A96" />
        </linearGradient>
        <filter id="wireShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Top curved loop */}
      <path
        d="M 17 48 L 17 20 C 17 9, 43 9, 43 20 L 43 48"
        stroke="url(#wireSilver)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#wireShadow)"
      />
      {/* Inner loop wire */}
      <path
        d="M 23 48 L 23 23 C 23 16, 37 16, 37 23 L 37 48"
        stroke="url(#wireSilver)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* Wire tips that insert into the black clamp */}
      <circle cx="17" cy="48" r="2.2" fill="#50505A" />
      <circle cx="43" cy="48" r="2.2" fill="#50505A" />
    </svg>

    {/* Black / Gunmetal Metallic Triangular Clamp Body */}
    <div className="relative z-30 flex items-center justify-center">
      <svg
        viewBox="0 0 74 34"
        className="w-14 h-6 sm:w-16 sm:h-7.5 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="clampBlack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D3035" />
            <stop offset="35%" stopColor="#1E2024" />
            <stop offset="75%" stopColor="#121316" />
            <stop offset="100%" stopColor="#08090A" />
          </linearGradient>
          <linearGradient id="clampBevel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F535B" />
            <stop offset="50%" stopColor="#757B85" />
            <stop offset="100%" stopColor="#4F535B" />
          </linearGradient>
        </defs>

        {/* Trapezoidal Clamp body */}
        <path
          d="M 6 30 L 16 4 L 58 4 L 68 30 Z"
          fill="url(#clampBlack)"
          stroke="#0F1012"
          strokeWidth="1.2"
        />
        {/* Top Highlight ridge */}
        <line x1="17" y1="4" x2="57" y2="4" stroke="url(#clampBevel)" strokeWidth="1.6" strokeLinecap="round" />
        {/* Bottom edge grip rim */}
        <path d="M 5 30 L 69 30" stroke="#3A3D44" strokeWidth="1.5" strokeLinecap="round" />
        {/* Wire pivot sockets */}
        <ellipse cx="23" cy="18" rx="2.5" ry="3.5" fill="#0C0D0E" stroke="#484C55" strokeWidth="0.8" />
        <ellipse cx="51" cy="18" rx="2.5" ry="3.5" fill="#0C0D0E" stroke="#484C55" strokeWidth="0.8" />
      </svg>
    </div>

    {/* Cast shadow directly underneath clip on the paper */}
    <div className="w-14 sm:w-16 h-2 bg-black/35 rounded-full blur-[2px] -mt-1 z-10" />
  </div>
);

export const PodcastNeverMissADrop: React.FC<PodcastNeverMissADropProps> = () => {
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShouldPlayVideo(!prefersReducedMotion);
    };

    checkMotion();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', checkMotion);
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', checkMotion);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlayVideo) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If mobile browser policy blocks initial autoplay, resume on first touch or scroll
          const onFirstInteraction = () => {
            if (video) {
              video.play().catch(() => {});
            }
            window.removeEventListener('touchstart', onFirstInteraction);
            window.removeEventListener('click', onFirstInteraction);
            window.removeEventListener('scroll', onFirstInteraction);
          };
          window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });
          window.addEventListener('click', onFirstInteraction, { once: true, passive: true });
          window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });
        });
      }
    };

    playVideo();

    // Intersection observer to ensure playback continues smoothly on mobile viewport enter
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [shouldPlayVideo]);

  return (
    <section
      id="never-miss-a-drop"
      className="relative w-full min-h-[640px] sm:min-h-[720px] md:min-h-[780px] flex items-end justify-center overflow-hidden pt-36 sm:pt-48 md:pt-56 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED BLURRED VIDEO BACKGROUND WITH HEAVY BOTTLE GREEN COLOR WASH  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-[#093624]">
        {/* Looping blurred background video for all screen sizes (mobile & desktop) */}
        {shouldPlayVideo ? (
          <video
            ref={videoRef}
            src={dropBgVideo}
            poster={dropPosterImg}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            className="w-full h-full object-cover object-center transform scale-105 pointer-events-none"
            style={{
              filter: 'blur(5px)',
              WebkitFilter: 'blur(5px)',
            }}
          />
        ) : (
          /* Mobile / Reduced-Motion fallback: Static poster image */
          <img
            src={dropPosterImg}
            alt="Never miss a drop background"
            aria-hidden="true"
            className="w-full h-full object-cover object-center transform scale-105 pointer-events-none"
            style={{
              filter: 'blur(5px)',
              WebkitFilter: 'blur(5px)',
            }}
          />
        )}

        {/* Heavy Bottle Green (#093624) semi-transparent overlay wash (84% opacity) */}
        {/* Subdues talking-head features and burned-in captions into soft, abstract moving texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(9, 54, 36, 0.84)' }}
        />

        {/* Secondary atmospheric vignette depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(9, 54, 36, 0.25) 0%, rgba(5, 40, 26, 0.85) 100%)',
          }}
        />

        {/* Subtle notebook grid texture overlay */}
        <div className="absolute inset-0 notebook-grid-dark opacity-15 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. PINNED NOTE OVERLAY                                                    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        
        {/* --- Pinned Torn-Paper Note Wrapper (rotated 2-3 degrees) --- */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] transform rotate-[2.2deg] transition-transform duration-300 hover:rotate-1">
          
          {/* Binder Clip at top center */}
          <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 z-40">
            <BinderClip />
          </div>

          {/* Physical cast shadow of note on the desk surface */}
          <div
            className="absolute inset-0 translate-x-2 translate-y-4 sm:translate-x-3 sm:translate-y-5 bg-black/45 rounded-sm blur-md pointer-events-none"
            style={{
              clipPath:
                'polygon(0% 4%, 4% 1.5%, 8% 4.5%, 13% 1%, 19% 3.5%, 26% 0.5%, 33% 4%, 40% 1.5%, 47% 4%, 55% 1%, 63% 3.8%, 71% 1.2%, 79% 4.2%, 87% 1%, 94% 3.5%, 100% 1.5%, 100% 100%, 0% 100%)',
            }}
          />

          {/* The Torn Spiral-Notebook Paper Card */}
          <div
            className="relative z-20 bg-[#F7F4E9] text-[#093624] px-6 sm:px-9 pt-10 sm:pt-12 pb-9 sm:pb-11 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.15)] border border-[#093624]/15"
            style={{
              clipPath:
                'polygon(0% 3.2%, 3% 1.2%, 7% 3.8%, 12% 0.8%, 17% 3.2%, 23% 0.4%, 29% 3.6%, 36% 1.1%, 43% 3.5%, 50% 0.6%, 57% 3.4%, 64% 1.0%, 71% 3.8%, 78% 0.8%, 85% 3.5%, 92% 1.1%, 97% 3.2%, 100% 1.5%, 100% 100%, 0% 100%)',
            }}
          >
            {/* Subtle spiral-hole punches down the left margin matching notebook texture */}
            <div className="absolute left-2.5 sm:left-3 top-8 bottom-6 flex flex-col justify-between pointer-events-none select-none">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="relative flex items-center">
                  {/* Outer punched hole ring */}
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#05281A]/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6)] border border-[#093624]/20" />
                  {/* Subtle ring slit cut */}
                  <div className="w-2 h-[1px] -ml-1 bg-[#093624]/20" />
                </div>
              ))}
            </div>

            {/* Subtle faint notebook ruled line texture in the background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 27px, rgba(9, 54, 36, 0.12) 28px)',
                backgroundPosition: '0 40px',
              }}
            />

            {/* Note Content (exact user copy) */}
            <div className="relative z-10 pl-3 sm:pl-4 text-center">
              
              {/* Headline: "Never miss a drop" in bold IBM Plex Serif, Bottle green, centered */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-[1.15] text-[#093624] tracking-tight mb-4 sm:mb-5">
                Never miss a drop
              </h2>

              {/* Body copy: exactly as given in Inter, Ink color, centered */}
              <p className="font-sans text-[#0E1A15] text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-md mx-auto font-normal opacity-95">
                New episodes drop every week. Follow us on your fave podcast platform, and you'll always know when the next one drops.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

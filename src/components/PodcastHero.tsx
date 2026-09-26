import React from 'react';
import { Play } from 'lucide-react';
import { Button } from './Button';

interface PodcastHeroProps {
  onPressPlay?: (episodeTitle?: string) => void;
}

/* Realistic Vector Apple AirPods component matching the reference photo */
const AirPodsMockup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* Ground Contact Shadows */}
      <div 
        className="absolute -bottom-2 -left-2 w-28 h-10 bg-black/65 rounded-[100%] blur-md -rotate-12"
      />
      <div 
        className="absolute bottom-0 left-10 w-24 h-8 bg-black/55 rounded-[100%] blur-md rotate-12"
      />

      <svg
        viewBox="0 0 160 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-28 sm:w-32 md:w-36 h-auto drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)] overflow-visible"
      >
        <defs>
          {/* AirPod 1 (Upright Left) Gradients */}
          <linearGradient id="bodyGrad1" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F5F5F7" />
            <stop offset="85%" stopColor="#E2E2E8" />
            <stop offset="100%" stopColor="#D2D2DC" />
          </linearGradient>

          <linearGradient id="stemGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D5D5DD" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F3F3F6" />
            <stop offset="100%" stopColor="#C8C8D2" />
          </linearGradient>

          <linearGradient id="chromeRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9AA0A6" />
            <stop offset="35%" stopColor="#E8EAED" />
            <stop offset="55%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#BDC1C6" />
            <stop offset="100%" stopColor="#80868B" />
          </linearGradient>

          {/* AirPod 2 (Lower Right) Gradients */}
          <linearGradient id="bodyGrad2" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F2F2F5" />
            <stop offset="100%" stopColor="#CBCBD5" />
          </linearGradient>

          <linearGradient id="stemGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0E0E6" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#EDEDF2" />
            <stop offset="100%" stopColor="#BEBEC8" />
          </linearGradient>

          {/* Mesh Texture / Acoustic Grille */}
          <linearGradient id="meshDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C1C1E" />
            <stop offset="100%" stopColor="#2C2C2E" />
          </linearGradient>
        </defs>

        {/* ================= AirPod 1: Upright Angled (Left Earbud) ================= */}
        <g transform="translate(15, 10) rotate(-14 45 65)">
          {/* Stem */}
          <path
            d="M 38 52 C 40 50, 48 50, 50 54 L 41 125 C 40.5 129, 34 130, 31 127 L 27 122 C 25 119, 27 114, 28 111 Z"
            fill="url(#stemGrad1)"
          />
          {/* Stem Specular Highlight */}
          <path
            d="M 36 55 L 30 120"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Chrome Tip at end of stem */}
          <path
            d="M 27 121 C 28 126, 36 130, 41 126 L 41 129 C 36 133, 27 129, 25 123 Z"
            fill="url(#chromeRing)"
          />
          <circle cx="33" cy="127" r="1.4" fill="#3C4043" />

          {/* Earbud Head Bulb */}
          <path
            d="M 32 46 C 24 40, 20 25, 30 12 C 42 -2, 64 2, 70 18 C 74 28, 71 42, 59 49 C 52 53, 44 55, 38 52 Z"
            fill="url(#bodyGrad1)"
          />
          {/* Head Specular Highlight curvature */}
          <path
            d="M 35 15 C 44 5, 59 8, 64 20"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Main Ear Speaker Port (Black Acoustic Oval Mesh) */}
          <ellipse
            cx="52"
            cy="27"
            rx="8.5"
            ry="13"
            transform="rotate(-28 52 27)"
            fill="url(#meshDark)"
            stroke="#E5E5EA"
            strokeWidth="0.8"
          />
          {/* Mesh highlight rim */}
          <ellipse
            cx="51.5"
            cy="26.5"
            rx="7"
            ry="11.5"
            transform="rotate(-28 52 27)"
            fill="none"
            stroke="#48484A"
            strokeWidth="0.7"
          />

          {/* Rear Acoustic Vent Slit */}
          <rect
            x="24"
            y="26"
            width="2.5"
            height="7"
            rx="1.2"
            transform="rotate(15 24 26)"
            fill="#2C2C2E"
          />
          {/* In-ear proximity optical sensor */}
          <circle cx="40" cy="40" r="1.6" fill="#3A3A3C" />
        </g>

        {/* ================= AirPod 2: Foreground Resting (Right Earbud) ================= */}
        <g transform="translate(42, 55) rotate(42 45 45)">
          {/* Stem */}
          <path
            d="M 36 48 C 39 46, 46 47, 48 50 L 40 114 C 39 118, 33 119, 30 116 L 27 112 C 25 109, 27 105, 28 102 Z"
            fill="url(#stemGrad2)"
          />
          {/* Stem Highlight */}
          <path
            d="M 34 50 L 29 110"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Chrome Tip */}
          <path
            d="M 27 111 C 28 116, 36 119, 40 115 L 40 118 C 35 122, 27 118, 25 113 Z"
            fill="url(#chromeRing)"
          />
          <circle cx="32" cy="116" r="1.3" fill="#3C4043" />

          {/* Earbud Bulb */}
          <path
            d="M 31 43 C 24 37, 21 23, 30 12 C 41 0, 61 3, 67 17 C 71 27, 68 40, 56 46 C 50 49, 42 51, 36 48 Z"
            fill="url(#bodyGrad2)"
          />
          {/* Specular Highlight */}
          <path
            d="M 34 14 C 42 5, 56 7, 61 18"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Outer Side Vent */}
          <rect
            x="48"
            y="22"
            width="3"
            height="8"
            rx="1.5"
            transform="rotate(-15 48 22)"
            fill="#2C2C2E"
          />
          {/* In-ear proximity optical sensor */}
          <circle cx="38" cy="36" r="1.5" fill="#3A3A3C" />
        </g>
      </svg>
    </div>
  );
};

export const PodcastHero: React.FC<PodcastHeroProps> = ({ onPressPlay }) => {
  return (
    <section
      id="podcast-hero"
      className="relative w-full bg-[#093624] text-[#F7F4E9] pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-[#F7F4E9]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Composition: Text + CTA on one side, iPhone 16 + AirPods on the other side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT SIDE: Editorial Copy & Secondary Button CTA ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Line 1: "Beyond Content." with the hand-applied squiggle highlighter */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] tracking-tight leading-[1.08] text-[#F7F4E9] mb-4 sm:mb-5">
              <span className="relative inline-block">
                Beyond Content.
                {/* Hand-applied thin and squiggly highlighter under "Beyond Content." */}
                <svg
                  viewBox="0 0 500 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4.5 md:h-5 pointer-events-none overflow-visible"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 3 14 C 45 6, 90 18, 135 10 C 180 3, 225 17, 270 9 C 315 2, 365 16, 410 8 C 445 2, 475 14, 497 9"
                    stroke="#CBDA46"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 8 16 C 55 8, 105 16, 155 11 C 200 5, 245 15, 290 10 C 335 4, 385 14, 430 10 C 465 6, 488 13, 494 11"
                    stroke="#CBDA46"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h1>

            {/* Line 2: "Because there's more to growth than content." in Inter, bold, same size as description */}
            <p className="font-sans font-['Inter',sans-serif] font-bold text-sm sm:text-base md:text-lg text-[#F7F4E9] leading-snug mb-3 sm:mb-4">
              Because there's more to growth than content.
            </p>

            {/* Subheading / Description */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#D5E3D5] max-w-xl leading-relaxed font-normal mb-8">
              Conversations, breakdowns, and the occasional rabbit hole on how founders build, market, sell, and grow.
            </p>

            {/* CTA PRESS PLAY designed in our secondary button */}
            <div className="flex items-center justify-center lg:justify-start">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onPressPlay?.()}
                id="hero-press-play-btn"
                className="cursor-pointer shadow-lg hover:shadow-xl min-w-[250px] sm:min-w-[280px] md:min-w-[310px] px-10 sm:px-12 whitespace-nowrap"
              >
                <span className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap">
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase whitespace-nowrap">
                    PRESS PLAY
                  </span>
                </span>
              </Button>
            </div>

          </div>

          {/* ================= RIGHT SIDE: Full iPhone 16 Mockup + AirPods ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center relative py-4 sm:py-6">
            
            {/* Main Phone Wrapper with subtle tilt matching the reference mockup */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] transform lg:-rotate-1 transition-transform duration-500 hover:rotate-0">
              
              {/* Deep Ambient Phone Drop Shadow grounding the chassis */}
              <div 
                className="absolute -inset-3 bg-black/80 rounded-[58px] blur-2xl -z-10 translate-y-8 opacity-80"
                aria-hidden="true"
              />

              {/* iPhone 16 Titanium Outer Frame */}
              <div className="relative rounded-[48px] sm:rounded-[52px] p-[9px] sm:p-[11px] bg-gradient-to-b from-[#444D47] via-[#202723] to-[#121815] shadow-[0_30px_80px_rgba(0,0,0,0.9),inset_0_1.5px_2px_rgba(255,255,255,0.25),inset_0_-1.5px_2px_rgba(0,0,0,0.9)] border border-[#5A685F]/40">
                
                {/* Physical Exterior Hardware Buttons */}
                {/* Left: Action Button */}
                <div className="absolute -left-[3.5px] top-[95px] w-[3.5px] h-[24px] bg-[#2C3530] rounded-l-xs shadow-inner" />
                {/* Left: Volume Up */}
                <div className="absolute -left-[3.5px] top-[135px] w-[3.5px] h-[45px] bg-[#2C3530] rounded-l-xs shadow-inner" />
                {/* Left: Volume Down */}
                <div className="absolute -left-[3.5px] top-[192px] w-[3.5px] h-[45px] bg-[#2C3530] rounded-l-xs shadow-inner" />
                {/* Right: Power / Siri Button */}
                <div className="absolute -right-[3.5px] top-[150px] w-[3.5px] h-[60px] bg-[#2C3530] rounded-r-xs shadow-inner" />

                {/* Inner Screen Display (Bezel & Glass) */}
                <div className="relative rounded-[38px] sm:rounded-[42px] overflow-hidden bg-[#121212] border border-black/90 flex flex-col items-center">
                  
                  {/* Top Status Bar & Dynamic Island */}
                  <div className="w-full pt-2.5 pb-1.5 px-5 flex items-center justify-between z-20 select-none bg-[#121212]">
                    {/* Status Bar Clock */}
                    <span className="font-mono text-[11px] font-bold text-white/90 tracking-tight">
                      9:41
                    </span>

                    {/* Dynamic Island pill with camera lens sensor reflection */}
                    <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-[#1C1C1E] border border-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#093624] opacity-90" />
                    </div>

                    {/* Status Bar Icons (Cellular, Wifi, Battery) */}
                    <div className="flex items-center gap-1.5 text-white/90">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <rect x="2" y="16" width="3" height="6" rx="0.5" />
                        <rect x="7" y="12" width="3" height="10" rx="0.5" />
                        <rect x="12" y="8" width="3" height="14" rx="0.5" />
                        <rect x="17" y="4" width="3" height="18" rx="0.5" />
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                      </svg>
                      <div className="w-4.5 h-2.5 border border-white/80 rounded-xs p-[1px] flex items-center">
                        <div className="w-2.5 h-full bg-white rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* Embedded Spotify Episode Player on Screen */}
                  <div className="w-full p-2 bg-[#121212] flex flex-col justify-center min-h-[352px]">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/episode/6Oj6AgnYJE0nu3csH83ZMq?utm_source=generator&t=0&si=e28f179d64be4720"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="Beyond Content Spotify Podcast Player"
                      className="w-full shadow-md"
                    />
                  </div>

                  {/* iPhone Home Indicator Bar */}
                  <div className="w-full py-2 flex justify-center items-center bg-[#121212] select-none">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>

                </div>
              </div>

              {/* ================= AirPods Around the Phone (Bottom Left Foreground) ================= */}
              <div className="absolute -bottom-6 -left-8 sm:-bottom-8 sm:-left-12 z-30 pointer-events-none">
                <AirPodsMockup />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

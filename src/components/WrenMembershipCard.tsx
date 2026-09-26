import React, { useState, useEffect } from 'react';
import founderAvatar from '../assets/images/founder-avatar.png';
import { WrenLogo, HandDrawnStarDoodle } from './ScrapbookAssets';

interface WrenMembershipCardProps {
  className?: string;
}

export const WrenMembershipCard: React.FC<WrenMembershipCardProps> = ({ className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* 3D Perspective Card Wrapper with Resting -2deg Rotation */}
      <div className="relative w-full max-w-[360px] sm:w-[380px] h-[224px] sm:h-[236px] -rotate-2 group">
        
        {/* Offset Hard-Shadow (no soft blur) */}
        <div 
          className="absolute inset-0 rounded-[20px] bg-[#093624] translate-x-2.5 translate-y-2.5 pointer-events-none"
          aria-hidden="true" 
        />

        {/* Flipping Card Container */}
        <div
          role="button"
          tabIndex={0}
          aria-label="WREN membership card, press to flip"
          aria-pressed={isFlipped}
          onClick={handleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFlip();
            }
          }}
          style={{ perspective: '1200px' }}
          className="relative w-full h-full cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#093624] rounded-[20px]"
        >
          <div
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: prefersReducedMotion ? 'none' : 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
              transformStyle: 'preserve-3d',
            }}
            className="w-full h-full relative rounded-[20px]"
          >
            {/* ========================================================= */}
            {/* FRONT FACE: Solid Wattle Fill with WREN Wordmark          */}
            {/* ========================================================= */}
            <div
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 w-full h-full rounded-[20px] border-[2.5px] border-[#093624] bg-[#CBDA46] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-xs"
            >
              {/* Corner Star Doodle */}
              <div className="flex items-center justify-between pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[#093624]/20" />
                <HandDrawnStarDoodle className="w-5 h-5 text-[#093624]/40" color="#093624" />
              </div>

              {/* Center: WREN Wordmark & COMMUNITY */}
              <div className="flex flex-col items-center justify-center my-auto pointer-events-none">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <WrenLogo className="w-8 h-8 sm:w-9 sm:h-9 text-[#093624]" color="#093624" />
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#093624] tracking-tight leading-none">
                    WREN
                  </span>
                </div>
                <span className="font-mono font-bold text-xs sm:text-[13px] uppercase tracking-[0.28em] text-[#093624]/75 mt-2.5">
                  COMMUNITY
                </span>
              </div>

              {/* Bottom decorative bar */}
              <div className="flex items-center justify-between pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[#093624]/20" />
                <div className="w-2 h-2 rounded-full bg-[#093624]/20" />
              </div>
            </div>

            {/* ========================================================= */}
            {/* BACK FACE: Cream Card with Member Copy & Decorative Mark */}
            {/* ========================================================= */}
            <div
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
              className="absolute inset-0 w-full h-full rounded-[20px] border-[2.5px] border-[#093624] bg-[#FAF5EC] p-4.5 sm:p-5 flex flex-col justify-between overflow-hidden shadow-xs"
            >
              {/* Top: Structural Member Heading & Handwritten Community confirmation */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#093624]/70 leading-none">
                    YOU ARE A MEMBER OF THE
                  </p>
                  <p className="font-hand text-2xl sm:text-[26px] text-[#093624] leading-tight mt-1 font-bold">
                    WREN COMMUNITY
                  </p>
                </div>

                {/* Founder Avatar as circular mark (~48px) */}
                <div className="relative shrink-0 ml-2">
                  <img
                    src={founderAvatar}
                    alt="Judith"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-1.5 border-[#093624] shadow-[1px_1px_0px_#093624]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Decorative row of irregular-height vertical bars in --color-bottle/20 (pure visual texture, no numbers) */}
              <div 
                className="flex items-end justify-center gap-[2px] sm:gap-[3px] h-6 sm:h-7 opacity-35 select-none overflow-hidden my-auto" 
                aria-hidden="true"
              >
                {[14, 22, 18, 24, 16, 20, 12, 24, 18, 22, 14, 20, 24, 16, 18, 22, 14, 24, 20, 16, 22, 14, 24, 18, 20, 14, 22, 24, 16, 20, 14, 24, 18].map((h, i) => (
                  <div
                    key={i}
                    className={`bg-[#093624] ${i % 3 === 0 ? 'w-[2.5px]' : i % 2 === 0 ? 'w-[1.5px]' : 'w-[1px]'}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              {/* Bottom Row: Founder Credit Left, Real URL Right */}
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#093624]/70 pt-1 border-t border-[#093624]/10">
                <span>Judith · Founder, WREN</span>
                <span className="font-medium text-right">wren.fillout.com/community</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Subtle "tap to flip" hint using only those three words */}
      <p className="font-mono text-[11px] tracking-wider uppercase text-[#093624]/50 text-center select-none mt-3.5">
        tap to flip
      </p>
    </div>
  );
};

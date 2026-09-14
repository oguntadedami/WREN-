import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Button';

gsap.registerPlugin(ScrollTrigger);

const PART_1 =
  "People still buy in 2026, and they buy differently. To win them to your side, you must meet them where they are. Say what they want to hear and position yourself to be their choice anytime they raise their hands.";

const PART_2 =
  "And if you're chasing vanity metrics, sorry, we're not for you.";

const WORDS_DATA = [
  ...PART_1.split(' ').map((word) => ({ text: word, isHighlight: false })),
  ...PART_2.split(' ').map((word) => ({ text: word, isHighlight: true })),
];

/**
 * Animated Wren Bird illustration that flies back and forth above the "REALITY CHECK" pill:
 * - Dynamic back-and-forth patrol flight pattern with smooth turns and swoops
 * - Active wing fluttering strokes
 * - Scaled to a refined, natural size
 * - Periodic musical chirp bubble
 * Runs completely independent of scroll progress.
 */
const RealityCheckBird: React.FC<{ reducedMotion: boolean; isMobile: boolean }> = ({ reducedMotion, isMobile }) => {
  const [wingFlap, setWingFlap] = useState(true);
  const [headTilt, setHeadTilt] = useState(0);
  const [tailBob, setTailBob] = useState(false);
  const [chirp, setChirp] = useState(false);

  // Active flight wing fluttering (disabled on mobile / reduced motion to reduce CPU/GPU lag)
  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const flapTimer = setInterval(() => {
      setWingFlap((prev) => !prev);
    }, 90);
    return () => clearInterval(flapTimer);
  }, [reducedMotion, isMobile]);

  // Subtle natural head & chirp actions
  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const idleTimer = setInterval(() => {
      setHeadTilt((prev) => (prev === 0 ? (Math.random() > 0.5 ? 6 : -6) : 0));
      setTailBob((prev) => !prev);
      if (Math.random() > 0.65) {
        setChirp(true);
        setTimeout(() => setChirp(false), 1400);
      }
    }, 2000);
    return () => clearInterval(idleTimer);
  }, [reducedMotion, isMobile]);

  return (
    <div
      id="reality-check-bird-container"
      className="relative mb-2 sm:mb-3 w-full max-w-xs sm:max-w-sm h-14 sm:h-16 flex items-center justify-center pointer-events-none select-none z-20"
    >
      <div
        className={`relative flex items-center justify-center ${
          reducedMotion || isMobile ? '' : 'animate-bird-patrol'
        }`}
      >
        {/* Floating musical chirp note */}
        {chirp && !reducedMotion && !isMobile && (
          <div
            className="absolute -top-6 -right-2 px-2 py-0.5 rounded-full bg-[#CBDA46] border border-[#093624] text-[#093624] font-bold text-[10px] sm:text-xs shadow-md animate-bounce select-none whitespace-nowrap"
            style={{ fontFamily: "'HandwrittenAccent', cursive" }}
          >
            ♪ chirp!
          </div>
        )}

        {/* Refined, scaled-down Wren Bird SVG Illustration */}
        <svg
          viewBox="0 0 72 56"
          className="w-14 h-11 sm:w-16 sm:h-12 md:w-18 md:h-14 drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle under-glow effect */}
          <ellipse
            cx="36"
            cy="46"
            rx="16"
            ry="3.5"
            fill="#CBDA46"
            opacity="0.25"
            filter="blur(3px)"
          />

          {/* Upright Wren Cocked Tail */}
          <g
            className="transition-transform duration-200 origin-[22px_36px]"
            style={{
              transform: reducedMotion
                ? 'rotate(-4deg)'
                : tailBob
                ? 'rotate(6deg)'
                : 'rotate(-6deg)',
            }}
          >
            <path
              d="M22 36 L6 18 C5 17 8 16 11 19 L25 32 Z"
              fill="#0E4830"
              stroke="#05281A"
              strokeWidth="1.2"
            />
            <path
              d="M24 36 L11 14 C10 13 13 12 16 16 L27 32 Z"
              fill="#15543D"
              stroke="#05281A"
              strokeWidth="1.2"
            />
            {/* Tail feather bars */}
            <line
              x1="10"
              y1="19"
              x2="15"
              y2="23"
              stroke="#CBDA46"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="25"
              x2="19"
              y2="29"
              stroke="#CBDA46"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>

          {/* Plump Bird Body */}
          <ellipse
            cx="36"
            cy="36"
            rx="16"
            ry="13"
            fill="#093624"
            stroke="#05281A"
            strokeWidth="1.2"
            transform="rotate(-4 36 36)"
          />

          {/* Warm Cream / Buff Underbelly */}
          <path
            d="M32 47 C40 47 48 43 49 35 C46 36 38 40 30 38 C28 43 29 47 32 47 Z"
            fill="#FEE2C5"
          />

          {/* Wings */}
          {reducedMotion ? (
            <g>
              <path
                d="M26 34 C25 28 29 24 39 27 C41 31 39 38 32 40 C28 40 26 37 26 34 Z"
                fill="#15543D"
                stroke="#05281A"
                strokeWidth="1"
              />
              <circle cx="31" cy="32" r="1.2" fill="#CBDA46" />
              <circle cx="35" cy="33" r="1.2" fill="#CBDA46" />
              <circle cx="38" cy="35" r="1.2" fill="#CBDA46" />
            </g>
          ) : (
            <g
              className="origin-[34px_34px] transition-transform duration-75"
              style={{
                transform: wingFlap
                  ? 'scaleY(0.85) translateY(-3px) rotate(6deg)'
                  : 'scaleY(1.1) translateY(2px) rotate(-6deg)',
              }}
            >
              <path
                d="M26 34 C25 27 30 23 40 26 C42 30 40 38 32 40 C28 40 26 37 26 34 Z"
                fill="#15543D"
                stroke="#05281A"
                strokeWidth="1.2"
              />
              {/* Distinctive Wren wing barring / chartreuse flecks */}
              <circle cx="31" cy="31" r="1.2" fill="#CBDA46" />
              <circle cx="35" cy="32" r="1.2" fill="#CBDA46" />
              <circle cx="38" cy="34" r="1.2" fill="#CBDA46" />
              <line
                x1="29"
                y1="36"
                x2="36"
                y2="37"
                stroke="#CBDA46"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Bird Head with Supercilium Eyebrow */}
          <g
            className="transition-transform duration-200 origin-[48px_27px]"
            style={{
              transform: reducedMotion
                ? 'rotate(0deg)'
                : `rotate(${headTilt}deg)`,
            }}
          >
            <circle
              cx="48"
              cy="27"
              r="9.5"
              fill="#093624"
              stroke="#05281A"
              strokeWidth="1"
            />

            {/* Wren signature pale cream/lime Eyebrow (Supercilium) */}
            <path
              d="M43 22 Q50 21 55 25"
              stroke="#CBDA46"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eye */}
            <circle cx="49" cy="26" r="2.2" fill="#000000" />
            <circle cx="49.8" cy="25.2" r="0.8" fill="#FFFFFF" />

            {/* Slender Beak */}
            <path
              d="M55 25.5 L67 28 L55 30.5 Z"
              fill="#D97706"
              stroke="#92400E"
              strokeWidth="0.8"
            />
          </g>

          {/* Little Feet tucked in flight */}
          <g stroke="#15543D" strokeWidth="1.6" strokeLinecap="round">
            <path d="M33 46 L33 49 M31 49 L35 49" />
            <path d="M39 46 L39 49 M37 49 L41 49" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export const RealityCheck: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLHeadingElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size to eliminate scroll-hijacking pinning on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // GSAP ScrollTrigger setup for pinning & word-by-word opacity reveal
  // Works reliably across mobile and desktop devices with buttery smooth scrubbing
  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !wordsContainerRef.current) {
      setCtaVisible(true);
      return;
    }

    const wordElements = wordsContainerRef.current.querySelectorAll('.word-span');
    if (!wordElements.length) return;

    const ctx = gsap.context(() => {
      const isSmallScreen = window.innerWidth < 768;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isSmallScreen ? '+=95%' : '+=130%',
          pin: true,
          scrub: isSmallScreen ? 0.35 : 0.6,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            // Reveal CTA button as the text finishes illuminating
            if (self.progress >= (isSmallScreen ? 0.88 : 0.92)) {
              setCtaVisible(true);
            } else {
              setCtaVisible(false);
            }
          },
        },
      });

      // Animate words opacity from ~18% to 100%
      tl.fromTo(
        wordElements,
        {
          opacity: 0.18,
          color: (_i, target) =>
            (target as HTMLElement).dataset.highlight === 'true'
              ? 'rgba(203, 218, 70, 0.28)'
              : 'rgba(247, 244, 233, 0.22)',
        },
        {
          opacity: 1,
          color: (_i, target) =>
            (target as HTMLElement).dataset.highlight === 'true'
              ? '#CBDA46'
              : '#F7F4E9',
          stagger: 0.04,
          ease: 'none',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  const scrollToBook = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
    const el =
      document.getElementById('booking-section') ||
      document.getElementById('calendly-booking-section');
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -20, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reality-check-section"
      className="relative w-full bg-[#093624] text-[#F7F4E9] notebook-grid-dark overflow-hidden flex flex-col items-center justify-center min-h-[100dvh] sm:min-h-screen py-12 sm:py-20 px-5 sm:px-10 lg:px-16 select-none"
      style={{
        backgroundColor: 'var(--color-bottle, #093624)',
      }}
    >
      {/* Fallback anchor for existing links */}
      <span id="breather-section" className="absolute top-0 opacity-0 pointer-events-none" />

      {/* Atmospheric ambient lighting & subtle glows */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#CBDA46]/15 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#15543D]/40 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Animated Wren Bird with independent idle animation */}
        <RealityCheckBird reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Section Pill Stamp */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xs mb-6 sm:mb-10">
          <span className="w-2 h-2 rounded-full bg-[#CBDA46] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#F7F4E9] uppercase">
            REALITY CHECK
          </span>
        </div>

        {/* Main Word-by-Word Revealed Copy */}
        <h2
          ref={wordsContainerRef}
          className="font-display font-bold text-xl sm:text-3xl md:text-4.5xl lg:text-[42px] leading-[1.35] sm:leading-[1.3] text-[#F7F4E9] tracking-tight max-w-3.5xl mx-auto text-center mb-8 sm:mb-14"
        >
          {WORDS_DATA.map((item, idx) => (
            <span
              key={idx}
              data-highlight={item.isHighlight ? 'true' : 'false'}
              className={`word-span inline-block mr-[0.26em] sm:mr-[0.28em] ${
                item.isHighlight ? 'text-[#CBDA46]' : 'text-[#F7F4E9]'
              }`}
              style={{
                opacity: reducedMotion ? 1 : 0.18,
                color: item.isHighlight
                  ? '#CBDA46'
                  : reducedMotion
                  ? '#F7F4E9'
                  : 'rgba(247, 244, 233, 0.22)',
              }}
            >
              {item.text}
            </span>
          ))}
        </h2>

        {/* CTA Button Wrapper */}
        <div
          id="reality-check-cta-container"
          className={`relative transition-all duration-500 ease-out transform ${
            ctaVisible || reducedMotion
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <Button
            id="reality-check-cta-btn"
            variant="primary"
            size="lg"
            showSparkles={false}
            onClick={scrollToBook}
            className="btn-primary shadow-xl cursor-pointer"
          >
            Let's find your people
          </Button>
        </div>

      </div>
    </section>
  );
};

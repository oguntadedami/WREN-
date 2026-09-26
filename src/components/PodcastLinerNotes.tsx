import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tape } from './ScrapbookAssets';

// Icon assets
import gtmIcon from '../assets/images/podcast/podcast-gtm-icon.png';
import micIcon from '../assets/images/podcast/podcast-mic-icon.png';
import handshakeIcon from '../assets/images/podcast/podcast-handshake-icon.png';
import megaphoneIcon from '../assets/images/podcast/podcast-megaphone-icon.png';
import penDocIcon from '../assets/images/podcast/podcast-pen-and-document-icon.png';

gsap.registerPlugin(ScrollTrigger);

// Middle sentence words ("Sometimes we break things down...")
const MIDDLE_SENTENCE_WORDS = [
  'Sometimes', 'we', 'break', 'things', 'down,',
  'sometimes', 'we', 'bring', 'people', 'in,',
  'sometimes', 'we', 'follow', 'an', 'idea',
  'and', 'see', 'where', 'it', 'takes', 'us.'
];

export const PodcastLinerNotes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen for scroll distance adjustment
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // GSAP ScrollTrigger setup for scroll-scrubbed reveal
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isSmallScreen = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isSmallScreen ? 0.35 : 0.5,
        },
      });

      // --- 1. First line connecting words: "We talk about" ---
      tl.to(
        ['#pln-w-0', '#pln-w-1', '#pln-w-2'],
        {
          color: '#0E1A15',
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power1.inOut',
        },
        0.05
      );

      // --- Checkpoint 1: GTM (Bold Bottle Green + Icon Sticker) ---
      tl.to(
        '#pln-kw-0',
        {
          color: '#093624',
          opacity: 1,
          fontWeight: 700,
          duration: 0.38,
          ease: 'power1.out',
        },
        0.42
      );
      tl.fromTo(
        '#pln-st-0',
        { opacity: 0, scale: 0.8, rotate: -2.8 },
        { opacity: 1, scale: 1, rotate: -2.8, duration: 0.38, ease: 'power1.out' },
        0.42
      );
      tl.to('#pln-punct-0', { color: '#0E1A15', opacity: 1, duration: 0.2 }, 0.5);

      // --- Checkpoint 2: founders (Bold Bottle Green + Icon Sticker) ---
      tl.to(
        '#pln-kw-1',
        {
          color: '#093624',
          opacity: 1,
          fontWeight: 700,
          duration: 0.38,
          ease: 'power1.out',
        },
        0.85
      );
      tl.fromTo(
        '#pln-st-1',
        { opacity: 0, scale: 0.8, rotate: 3.2 },
        { opacity: 1, scale: 1, rotate: 3.2, duration: 0.38, ease: 'power1.out' },
        0.85
      );
      tl.to('#pln-punct-1', { color: '#0E1A15', opacity: 1, duration: 0.2 }, 0.93);

      // --- Checkpoint 3: sales (Bold Bottle Green + Icon Sticker) ---
      tl.to(
        '#pln-kw-2',
        {
          color: '#093624',
          opacity: 1,
          fontWeight: 700,
          duration: 0.38,
          ease: 'power1.out',
        },
        1.28
      );
      tl.fromTo(
        '#pln-st-2',
        { opacity: 0, scale: 0.8, rotate: -3.5 },
        { opacity: 1, scale: 1, rotate: -3.5, duration: 0.38, ease: 'power1.out' },
        1.28
      );
      tl.to('#pln-punct-2', { color: '#0E1A15', opacity: 1, duration: 0.2 }, 1.36);

      // --- Checkpoint 4: marketing (Bold Bottle Green + Icon Sticker) ---
      tl.to(
        '#pln-kw-3',
        {
          color: '#093624',
          opacity: 1,
          fontWeight: 700,
          duration: 0.38,
          ease: 'power1.out',
        },
        1.72
      );
      tl.fromTo(
        '#pln-st-3',
        { opacity: 0, scale: 0.8, rotate: 2.4 },
        { opacity: 1, scale: 1, rotate: 2.4, duration: 0.38, ease: 'power1.out' },
        1.72
      );
      tl.to('#pln-punct-3', { color: '#0E1A15', opacity: 1, duration: 0.2 }, 1.8);

      // Connecting word: "and"
      tl.to('#pln-w-3', { color: '#0E1A15', opacity: 1, duration: 0.22, ease: 'power1.inOut' }, 2.02);

      // --- Checkpoint 5: content (Bold Bottle Green + Icon Sticker) ---
      tl.to(
        '#pln-kw-4',
        {
          color: '#093624',
          opacity: 1,
          fontWeight: 700,
          duration: 0.38,
          ease: 'power1.out',
        },
        2.28
      );
      tl.fromTo(
        '#pln-st-4',
        { opacity: 0, scale: 0.8, rotate: -2.2 },
        { opacity: 1, scale: 1, rotate: -2.2, duration: 0.38, ease: 'power1.out' },
        2.28
      );
      tl.to('#pln-punct-4', { color: '#0E1A15', opacity: 1, duration: 0.2 }, 2.36);

      // Connecting text: "and whatever else is worth unpacking."
      tl.to(
        ['#pln-w-4', '#pln-w-5', '#pln-w-6', '#pln-w-7', '#pln-w-8', '#pln-w-9'],
        {
          color: '#0E1A15',
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power1.inOut',
        },
        2.65
      );

      // --- 2. Middle Sentence: "Sometimes we break things down..." (Deliberate Pause) ---
      // Reserved extra scroll distance (approx. 40% of the entire scroll distance)
      const s2Els = gsap.utils.toArray('.pln-s2-word');
      tl.to(
        s2Els,
        {
          color: '#0E1A15',
          opacity: 1,
          duration: 0.35,
          stagger: 0.16, // Generous stagger creates a contemplative pause
          ease: 'none',
        },
        3.4
      );

      // --- 3. Third line connecting words: "That's the whole point of" ---
      tl.to(
        ['#pln-w-10', '#pln-w-11', '#pln-w-12', '#pln-w-13', '#pln-w-14'],
        {
          color: '#0E1A15',
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power1.inOut',
        },
        7.2
      );

      // --- Checkpoint 6: Beyond Content (Bold Bottle Green + Icon Sticker) ---
      tl.to(
        '#pln-kw-5',
        {
          color: '#093624',
          opacity: 1,
          fontWeight: 700,
          duration: 0.45,
          ease: 'power1.out',
        },
        7.8
      );
      tl.fromTo(
        '#pln-st-5',
        { opacity: 0, scale: 0.8, rotate: 3.8 },
        { opacity: 1, scale: 1, rotate: 3.8, duration: 0.45, ease: 'power1.out' },
        7.8
      );
      tl.to('#pln-punct-5', { color: '#093624', opacity: 1, duration: 0.25 }, 8.1);

      // Buffer at the end of the scroll trigger
      tl.to({}, { duration: 0.7 }, 8.4);

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, isMobile]);

  // Initial styling for unrevealed state vs reduced motion
  const initialNormalStyle: React.CSSProperties = reducedMotion
    ? { color: '#0E1A15', opacity: 1, fontWeight: 400 }
    : { color: '#6F7A6E', opacity: 0.45, fontWeight: 400 };

  const initialKeywordStyle: React.CSSProperties = reducedMotion
    ? { color: '#093624', opacity: 1, fontWeight: 700 }
    : { color: '#6F7A6E', opacity: 0.45, fontWeight: 400 };

  return (
    <section
      ref={sectionRef}
      id="what-the-show-is-about"
      className="relative w-full bg-[#F7F4E9] text-[#093624] notebook-grid-bg select-none border-b border-[#093624]/10"
      style={{
        minHeight: reducedMotion ? 'auto' : isMobile ? '240vh' : '290vh',
        backgroundColor: 'var(--color-cream, #F7F4E9)',
      }}
    >
      {/* Pinned Viewport Container - CSS sticky matching Reality Check */}
      <div
        className={`w-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 lg:px-14 ${
          reducedMotion ? 'relative min-h-[65vh]' : 'sticky top-0 h-[100dvh] sm:h-screen overflow-hidden'
        }`}
      >
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1080px] mx-auto w-full flex flex-col items-center text-center relative z-10">
          
          {/* Subtle Top Tape Stamp */}
          <div className="flex justify-center -mt-2 sm:-mt-4 mb-3 sm:mb-4 pointer-events-none">
            <Tape className="w-24 sm:w-28 h-5 sm:h-6" color="#CBDA46" />
          </div>

          {/* Section Headline */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#093624] tracking-tight text-center mb-6 sm:mb-8 md:mb-10">
            What the show is about
          </h2>

          {/* Main Large Centered Paragraph Block (IBM Plex Serif) */}
          <p
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[38px] leading-[1.65] sm:leading-[1.6] md:leading-[1.55] tracking-tight text-center max-w-4xl lg:max-w-5xl mx-auto"
            style={{
              fontFamily: 'var(--font-display, "IBM Plex Serif", serif)',
            }}
          >
            {/* --- SENTENCE 1 --- */}
            <span id="pln-w-0" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>We</span>
            <span id="pln-w-1" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>talk</span>
            <span id="pln-w-2" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>about</span>

            {/* Checkpoint 1: GTM */}
            <span className="inline-flex items-center align-middle whitespace-nowrap mr-[0.28em]">
              <span id="pln-kw-0" className="transition-colors" style={initialKeywordStyle}>
                GTM
              </span>
              <span
                id="pln-st-0"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[9px] sm:rounded-[11px] md:rounded-[13px] bg-[#EEF2CC] border border-[#093624]/20 shadow-[0_2px_8px_rgba(9,54,36,0.14)] mx-1 sm:mx-2 shrink-0 align-middle -translate-y-[2px] p-1.5 sm:p-2"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transform: `scale(${reducedMotion ? 1 : 0.8}) rotate(-2.8deg)`,
                }}
              >
                <img src={gtmIcon} alt="GTM" className="w-full h-full object-contain select-none pointer-events-none" />
              </span>
              <span id="pln-punct-0" style={initialNormalStyle}>,</span>
            </span>

            {/* Checkpoint 2: founders */}
            <span className="inline-flex items-center align-middle whitespace-nowrap mr-[0.28em]">
              <span id="pln-kw-1" className="transition-colors" style={initialKeywordStyle}>
                founders
              </span>
              <span
                id="pln-st-1"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[9px] sm:rounded-[11px] md:rounded-[13px] bg-[#EEF2CC] border border-[#093624]/20 shadow-[0_2px_8px_rgba(9,54,36,0.14)] mx-1 sm:mx-2 shrink-0 align-middle -translate-y-[2px] p-1.5 sm:p-2"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transform: `scale(${reducedMotion ? 1 : 0.8}) rotate(3.2deg)`,
                }}
              >
                <img src={micIcon} alt="founders" className="w-full h-full object-contain select-none pointer-events-none" />
              </span>
              <span id="pln-punct-1" style={initialNormalStyle}>,</span>
            </span>

            {/* Checkpoint 3: sales */}
            <span className="inline-flex items-center align-middle whitespace-nowrap mr-[0.28em]">
              <span id="pln-kw-2" className="transition-colors" style={initialKeywordStyle}>
                sales
              </span>
              <span
                id="pln-st-2"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[9px] sm:rounded-[11px] md:rounded-[13px] bg-[#EEF2CC] border border-[#093624]/20 shadow-[0_2px_8px_rgba(9,54,36,0.14)] mx-1 sm:mx-2 shrink-0 align-middle -translate-y-[2px] p-1.5 sm:p-2"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transform: `scale(${reducedMotion ? 1 : 0.8}) rotate(-3.5deg)`,
                }}
              >
                <img src={handshakeIcon} alt="sales" className="w-full h-full object-contain select-none pointer-events-none" />
              </span>
              <span id="pln-punct-2" style={initialNormalStyle}>,</span>
            </span>

            {/* Checkpoint 4: marketing */}
            <span className="inline-flex items-center align-middle whitespace-nowrap mr-[0.28em]">
              <span id="pln-kw-3" className="transition-colors" style={initialKeywordStyle}>
                marketing
              </span>
              <span
                id="pln-st-3"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[9px] sm:rounded-[11px] md:rounded-[13px] bg-[#EEF2CC] border border-[#093624]/20 shadow-[0_2px_8px_rgba(9,54,36,0.14)] mx-1 sm:mx-2 shrink-0 align-middle -translate-y-[2px] p-1.5 sm:p-2"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transform: `scale(${reducedMotion ? 1 : 0.8}) rotate(2.4deg)`,
                }}
              >
                <img src={megaphoneIcon} alt="marketing" className="w-full h-full object-contain select-none pointer-events-none" />
              </span>
              <span id="pln-punct-3" style={initialNormalStyle}>,</span>
            </span>

            <span id="pln-w-3" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>and</span>

            {/* Checkpoint 5: content */}
            <span className="inline-flex items-center align-middle whitespace-nowrap mr-[0.28em]">
              <span id="pln-kw-4" className="transition-colors" style={initialKeywordStyle}>
                content
              </span>
              <span
                id="pln-st-4"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[9px] sm:rounded-[11px] md:rounded-[13px] bg-[#EEF2CC] border border-[#093624]/20 shadow-[0_2px_8px_rgba(9,54,36,0.14)] mx-1 sm:mx-2 shrink-0 align-middle -translate-y-[2px] p-1.5 sm:p-2"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transform: `scale(${reducedMotion ? 1 : 0.8}) rotate(-2.2deg)`,
                }}
              >
                <img src={penDocIcon} alt="content" className="w-full h-full object-contain select-none pointer-events-none" />
              </span>
              <span id="pln-punct-4" style={initialNormalStyle}>,</span>
            </span>

            <span id="pln-w-4" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>and</span>
            <span id="pln-w-5" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>whatever</span>
            <span id="pln-w-6" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>else</span>
            <span id="pln-w-7" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>is</span>
            <span id="pln-w-8" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>worth</span>
            <span id="pln-w-9" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>unpacking.</span>
            {' '}

            {/* --- SENTENCE 2: The Deliberate Pause (connecting words only, no icons) --- */}
            {MIDDLE_SENTENCE_WORDS.map((word, idx) => (
              <span
                key={idx}
                className="pln-s2-word inline-block mr-[0.28em] transition-colors"
                style={initialNormalStyle}
              >
                {word}
              </span>
            ))}
            {' '}

            {/* --- SENTENCE 3 --- */}
            <span id="pln-w-10" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>That's</span>
            <span id="pln-w-11" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>the</span>
            <span id="pln-w-12" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>whole</span>
            <span id="pln-w-13" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>point</span>
            <span id="pln-w-14" className="inline-block mr-[0.28em] transition-colors" style={initialNormalStyle}>of</span>

            {/* Checkpoint 6: Beyond Content */}
            <span className="inline-flex items-center align-middle whitespace-nowrap">
              <span id="pln-kw-5" className="transition-colors" style={initialKeywordStyle}>
                Beyond Content
              </span>
              <span
                id="pln-st-5"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[9px] sm:rounded-[11px] md:rounded-[13px] bg-[#EEF2CC] border border-[#093624]/20 shadow-[0_2px_8px_rgba(9,54,36,0.14)] mx-1 sm:mx-2 shrink-0 align-middle -translate-y-[2px] p-1.5 sm:p-2"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transform: `scale(${reducedMotion ? 1 : 0.8}) rotate(3.8deg)`,
                }}
              >
                <img src={micIcon} alt="Beyond Content" className="w-full h-full object-contain select-none pointer-events-none" />
              </span>
              <span id="pln-punct-5" style={initialKeywordStyle}>.</span>
            </span>
          </p>

          {/* Hand-drawn divider stamp at bottom */}
          <div className="mt-8 sm:mt-10 flex justify-center items-center gap-3 select-none pointer-events-none opacity-60">
            <div className="h-[1px] w-12 sm:w-16 bg-[#093624]/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#6F7A6E]">
              EST. 2026 • WREN STUDIOS
            </span>
            <div className="h-[1px] w-12 sm:w-16 bg-[#093624]/20" />
          </div>

        </div>
      </div>
    </section>
  );
};

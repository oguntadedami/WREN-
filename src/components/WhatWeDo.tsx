import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkerUnderline, PaperClip, StampBadge } from './ScrapbookAssets';

// Washi Tape Component with ripped ends
const WashiTape: React.FC<{
  className?: string;
  color?: string;
  angle?: string;
}> = ({
  className = "w-28 h-6 -top-3 left-1/2 -translate-x-1/2",
  color = "rgba(203, 218, 70, 0.45)",
  angle = "-rotate-1"
}) => (
  <div 
    className={`absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs ${angle} ${className}`}
    style={{
      backgroundColor: color,
      clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
    }}
  />
);

// Wren Bird Visual Graphic Component
interface WrenBirdGraphicProps {
  isFlying: boolean;
  wingFlap: boolean;
  headTurn: number;
  tailBob: boolean;
  facingRight: boolean;
  actionNote?: string;
  isPecking?: boolean;
}

const WrenBirdGraphic: React.FC<WrenBirdGraphicProps> = ({
  isFlying,
  wingFlap,
  headTurn,
  tailBob,
  facingRight,
  actionNote,
  isPecking
}) => {
  return (
    <div 
      className={`relative transition-transform duration-300 ${
        !facingRight ? '-scale-x-100' : 'scale-x-100'
      }`}
    >
      <svg
        viewBox="0 0 64 64"
        className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wren Tail (Characteristic cocked upright tail) */}
        <g
          className="transition-transform duration-200 origin-[22px_36px]"
          style={{
            transform: isFlying 
              ? 'rotate(-22deg)' 
              : isPecking
              ? 'rotate(18deg)'
              : tailBob 
              ? 'rotate(10deg)' 
              : 'rotate(-4deg)'
          }}
        >
          {/* Tail feathers */}
          <path
            d="M20 36 L6 20 C5 19 8 18 10 21 L22 33 Z"
            fill="#093624"
          />
          <path
            d="M22 36 L11 16 C10 15 13 14 15 18 L24 33 Z"
            fill="#0E4830"
          />
          {/* Tail feather barbs / lime accent stripes */}
          <line x1="10" y1="21" x2="14" y2="24" stroke="#CBDA46" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="26" x2="18" y2="29" stroke="#CBDA46" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Bird Body */}
        <ellipse
          cx="32"
          cy={isPecking ? "38" : "36"}
          rx="14"
          ry="11"
          fill="#093624"
          transform={isPecking ? "rotate(15 32 38)" : "rotate(-5 32 36)"}
          className="transition-all duration-150"
        />
        {/* Warm Cream/Chest Underbelly */}
        <path
          d="M30 46 C36 46 44 42 45 35 C42 36 34 39 28 38 C26 42 27 46 30 46 Z"
          fill="#FEE2C5"
        />

        {/* Wings */}
        {isFlying ? (
          /* Flapping Wings */
          <g
            className="origin-[30px_34px] transition-transform duration-75"
            style={{
              transform: wingFlap ? 'scaleY(-1.15) translateY(-14px) rotate(18deg)' : 'scaleY(1) rotate(-12deg)'
            }}
          >
            <path
              d="M28 34 C24 20 18 10 26 8 C33 7 36 20 33 34 Z"
              fill="#0E4830"
            />
            <path
              d="M26 12 C29 11 31 16 30 24"
              stroke="#CBDA46"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        ) : (
          /* Folded Wing on Body */
          <g>
            <path
              d="M24 34 C23 29 27 25 35 28 C37 32 35 38 29 40 C26 40 24 37 24 34 Z"
              fill="#0E4830"
            />
            <circle cx="28" cy="32" r="1.1" fill="#CBDA46" />
            <circle cx="31" cy="33" r="1.1" fill="#CBDA46" />
            <circle cx="34" cy="34" r="1.1" fill="#CBDA46" />
            <line x1="27" y1="36" x2="33" y2="37" stroke="#CBDA46" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}

        {/* Bird Head */}
        <g
          className="transition-transform duration-200 origin-[42px_28px]"
          style={{
            transform: isPecking 
              ? 'translateY(4px) rotate(24deg)'
              : !isFlying && headTurn !== 0 
              ? `rotate(${headTurn * 14}deg)` 
              : 'rotate(0deg)'
          }}
        >
          <circle cx="42" cy="28" r="8" fill="#093624" />
          {/* Supercilium (Pale Eyebrow Stripe) */}
          <path
            d="M38 24 Q44 23 48 26"
            stroke="#CBDA46"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Eye */}
          <circle cx="43" cy="27" r="1.8" fill="#000000" />
          <circle cx="43.6" cy="26.4" r="0.6" fill="#FFFFFF" />

          {/* Beak */}
          <path
            d="M48 27 L57 29 L48 31 Z"
            fill="#D97706"
          />
        </g>

        {/* Feet clutching the card edge / paperclip / tape */}
        {!isFlying && (
          <g className="origin-[32px_45px]">
            <path
              d="M29 45 L29 50 M27 50 L31 50 M29 50 L30 52"
              stroke="#15543D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M35 45 L35 50 M33 50 L37 50 M35 50 L36 52"
              stroke="#15543D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      {/* Playful Floating Action Particle (Notes & Sparkles) */}
      {!isFlying && actionNote && (
        <div className="absolute -top-4 right-0 animate-bounce text-sm font-bold text-[#093624] select-none filter drop-shadow-xs">
          {actionNote}
        </div>
      )}
    </div>
  );
};

// Bird Phase type across 6 blocks
type TourPhase = 
  | 'away'
  | 'flying-to-0'
  | 'perched-0'
  | 'flying-to-1'
  | 'perched-1'
  | 'flying-to-2'
  | 'perched-2'
  | 'flying-to-3'
  | 'perched-3'
  | 'flying-to-4'
  | 'perched-4'
  | 'flying-to-5'
  | 'perched-5'
  | 'flying-away';

export const WhatWeDo: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Section and Block Card Refs for real-time coordinate tracking
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null), // 0: End-to-end executions
    useRef<HTMLDivElement>(null), // 1: You get the exact playbook from day one
    useRef<HTMLDivElement>(null), // 2: Content process with zero AI attribution
    useRef<HTMLDivElement>(null), // 3: We mirror your voice exactly the way it is.
    useRef<HTMLDivElement>(null), // 4: Workflows and automations built into the system from day one
    useRef<HTMLDivElement>(null), // 5: Clean reporting of everything happening
  ];

  // Bird Animation State
  const [phase, setPhase] = useState<TourPhase>('away');
  const [wingFlap, setWingFlap] = useState(true);
  const [headTurn, setHeadTurn] = useState(0);
  const [tailBob, setTailBob] = useState(false);
  const [isPecking, setIsPecking] = useState(false);
  const [actionNote, setActionNote] = useState<string>('♪');
  const [birdCoords, setBirdCoords] = useState<{ x: number; y: number; facingRight: boolean }>({
    x: -100,
    y: -100,
    facingRight: true,
  });

  // Calculate target position for a given block index
  const getBlockSpot = useCallback((index: number): { x: number; y: number; facingRight: boolean } => {
    if (!sectionRef.current) return { x: 0, y: 0, facingRight: true };
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const cardEl = cardRefs[index]?.current;

    if (!cardEl) return { x: 0, y: 0, facingRight: true };
    const cardRect = cardEl.getBoundingClientRect();

    // Spot coordinates relative to section container
    switch (index) {
      case 0: // Block 0: End-to-end executions (lands top-right near tape/sparkle)
        return {
          x: cardRect.right - sectionRect.left - (window.innerWidth < 640 ? 50 : 80),
          y: cardRect.top - sectionRect.top - 8,
          facingRight: false, // faces inward towards the title
        };
      case 1: // Block 1: Playbook (lands on the top-left paperclip)
        return {
          x: cardRect.left - sectionRect.left + (window.innerWidth < 640 ? 36 : 48),
          y: cardRect.top - sectionRect.top - 12,
          facingRight: true,
        };
      case 2: // Block 2: Zero AI (lands on top-right washi tape)
        return {
          x: cardRect.right - sectionRect.left - (window.innerWidth < 640 ? 44 : 58),
          y: cardRect.top - sectionRect.top - 10,
          facingRight: false,
        };
      case 3: // Block 3: Mirror Voice (lands on top-left washi tape)
        return {
          x: cardRect.left - sectionRect.left + (window.innerWidth < 640 ? 38 : 52),
          y: cardRect.top - sectionRect.top - 10,
          facingRight: true,
        };
      case 4: // Block 4: Workflows (lands on top-right paperclip)
        return {
          x: cardRect.right - sectionRect.left - (window.innerWidth < 640 ? 40 : 54),
          y: cardRect.top - sectionRect.top - 12,
          facingRight: false,
        };
      case 5: // Block 5: Reporting (lands on top center washi tape)
        return {
          x: cardRect.left - sectionRect.left + cardRect.width * 0.5,
          y: cardRect.top - sectionRect.top - 10,
          facingRight: true,
        };
      default:
        return { x: 0, y: 0, facingRight: true };
    }
  }, []);

  // Update coordinates dynamically on resize
  const updateCurrentPosition = useCallback(() => {
    if (phase === 'away') return;
    
    if (phase.startsWith('perched-') || phase.startsWith('flying-to-')) {
      const match = phase.match(/\d+/);
      if (match) {
        const targetIndex = parseInt(match[0], 10);
        const spot = getBlockSpot(targetIndex);
        setBirdCoords(spot);
      }
    }
  }, [phase, getBlockSpot]);

  useEffect(() => {
    window.addEventListener('resize', updateCurrentPosition);
    return () => window.removeEventListener('resize', updateCurrentPosition);
  }, [updateCurrentPosition]);

  // Main Orchestration Timeline
  // Timing rules:
  // 4 seconds (4000ms) on each block
  // 1.1s flying between blocks
  // 1.5s fly-away
  // 6.0 seconds (6000ms) away rest, then loop repeat
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runFlightLoop = () => {
      // Step 0: Fly in to Block 0
      setPhase('flying-to-0');
      const spot0 = getBlockSpot(0);
      setBirdCoords(spot0);

      // Land on Block 0 after 1300ms
      timeoutId = setTimeout(() => {
        setPhase('perched-0');
        setActionNote('♪');

        // Stay on Block 0 for 4000ms
        timeoutId = setTimeout(() => {
          // Fly to Block 1 (1100ms)
          setPhase('flying-to-1');
          const spot1 = getBlockSpot(1);
          setBirdCoords(spot1);

          timeoutId = setTimeout(() => {
            setPhase('perched-1');
            setActionNote('♫');

            // Stay on Block 1 for 4000ms
            timeoutId = setTimeout(() => {
              // Fly to Block 2 (1100ms)
              setPhase('flying-to-2');
              const spot2 = getBlockSpot(2);
              setBirdCoords(spot2);

              timeoutId = setTimeout(() => {
                setPhase('perched-2');
                setActionNote('♪');

                // Stay on Block 2 for 4000ms
                timeoutId = setTimeout(() => {
                  // Fly to Block 3 (1100ms)
                  setPhase('flying-to-3');
                  const spot3 = getBlockSpot(3);
                  setBirdCoords(spot3);

                  timeoutId = setTimeout(() => {
                    setPhase('perched-3');
                    setActionNote('♬');

                    // Stay on Block 3 for 4000ms
                    timeoutId = setTimeout(() => {
                      // Fly to Block 4 (1100ms)
                      setPhase('flying-to-4');
                      const spot4 = getBlockSpot(4);
                      setBirdCoords(spot4);

                      timeoutId = setTimeout(() => {
                        setPhase('perched-4');
                        setActionNote('♩');

                        // Stay on Block 4 for 4000ms
                        timeoutId = setTimeout(() => {
                          // Fly to Block 5 (1100ms)
                          setPhase('flying-to-5');
                          const spot5 = getBlockSpot(5);
                          setBirdCoords(spot5);

                          timeoutId = setTimeout(() => {
                            setPhase('perched-5');
                            setActionNote('🌟');

                            // Stay on Block 5 for 4000ms
                            timeoutId = setTimeout(() => {
                              // Fly away offscreen (1500ms)
                              setPhase('flying-away');
                              if (sectionRef.current) {
                                const sectionRect = sectionRef.current.getBoundingClientRect();
                                setBirdCoords({
                                  x: sectionRect.width + 120,
                                  y: -80,
                                  facingRight: true,
                                });
                              }

                              timeoutId = setTimeout(() => {
                                // Rest away for 4 seconds (4000ms)
                                setPhase('away');

                                timeoutId = setTimeout(() => {
                                  // Repeat loop!
                                  runFlightLoop();
                                }, 4000);
                              }, 1500);
                            }, 4000); // 4s on Block 5
                          }, 1100); // fly to 5
                        }, 4000); // 4s on Block 4
                      }, 1100); // fly to 4
                    }, 4000); // 4s on Block 3
                  }, 1100); // fly to 3
                }, 4000); // 4s on Block 2
              }, 1100); // fly to 2
            }, 4000); // 4s on Block 1
          }, 1100); // fly to 1
        }, 4000); // 4s on Block 0
      }, 1300); // fly to 0
    };

    // Initial trigger shortly after mount
    const startDelay = setTimeout(() => {
      runFlightLoop();
    }, 600);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, [getBlockSpot]);

  // Flight wing flapping effect
  const isFlying = phase.startsWith('flying-');
  useEffect(() => {
    if (!isFlying) return;
    const flapInterval = setInterval(() => {
      setWingFlap(prev => !prev);
    }, 85);
    return () => clearInterval(flapInterval);
  }, [isFlying]);

  // Perched playful behaviors (head cocks, pecks, tail bobs)
  useEffect(() => {
    if (isFlying || phase === 'away') return;

    const gestureInterval = setInterval(() => {
      // Randomize playful gesture
      const rand = Math.random();
      if (rand < 0.35) {
        setIsPecking(true);
        setTimeout(() => setIsPecking(false), 240);
      } else if (rand < 0.7) {
        setHeadTurn((prev) => (prev === 0 ? (Math.random() > 0.5 ? 1 : -1) : 0));
        setTailBob(prev => !prev);
      } else {
        setTailBob(prev => !prev);
      }
    }, 800);

    return () => clearInterval(gestureInterval);
  }, [isFlying, phase]);

  // Currently perched block index (if any)
  const currentPerchedIndex = phase.startsWith('perched-') 
    ? parseInt(phase.replace('perched-', ''), 10) 
    : null;

  return (
    <section 
      ref={sectionRef}
      id="what-we-do-section" 
      className="py-20 sm:py-28 lg:py-32 bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/10 relative overflow-hidden select-none"
    >
      {/* Background Decorative Scrapbook Accents */}
      <div className="absolute top-12 left-6 sm:left-12 pointer-events-none opacity-20 hidden md:block rotate-[-12deg]">
        <div className="w-20 h-28 border-2 border-dashed border-[#093624] rounded-lg p-2 flex flex-col justify-between">
          <div className="w-full h-1 bg-[#093624]/30 rounded-full" />
          <div className="w-3/4 h-1 bg-[#093624]/30 rounded-full" />
          <div className="w-4/5 h-1 bg-[#093624]/30 rounded-full" />
          <div className="w-1/2 h-1 bg-[#093624]/30 rounded-full" />
        </div>
      </div>

      <div className="absolute top-20 right-8 sm:right-16 pointer-events-none opacity-25 hidden sm:block rotate-12">
        <StampBadge text="SYSTEM ENGINE" color="#093624" className="w-24 h-24" />
      </div>

      {/* FLYING WREN BIRD ACTOR */}
      {phase !== 'away' && (
        <div
          id="results-animated-wren"
          className="absolute z-40 pointer-events-none select-none"
          style={{
            left: `${birdCoords.x}px`,
            top: `${birdCoords.y}px`,
            transform: isFlying 
              ? 'translate(-50%, -60%) scale(1.05) rotate(6deg)' 
              : 'translate(-50%, -85%) scale(1) rotate(0deg)',
            transition: isFlying
              ? 'left 1.1s cubic-bezier(0.3, 1.05, 0.4, 1), top 1.1s cubic-bezier(0.3, 1.05, 0.4, 1), transform 1.1s ease'
              : 'left 0.2s ease, top 0.2s ease, transform 0.2s ease',
            opacity: phase === 'flying-away' ? 0 : 1,
          }}
        >
          <WrenBirdGraphic
            isFlying={isFlying}
            wingFlap={wingFlap}
            headTurn={headTurn}
            tailBob={tailBob}
            facingRight={birdCoords.facingRight}
            actionNote={actionNote}
            isPecking={isPecking}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16 relative">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.15] mb-6">
            We own it <span className="relative inline-block px-1">
              end-to-end
              <MarkerUnderline className="w-full h-4 -bottom-2 left-0" color="#CBDA46" />
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#15543D] font-normal leading-relaxed max-w-3xl mx-auto">
            You shouldn't have to manage the people running your GTM when you should stay focused on the conversations and opportunities that only you can close.
          </p>
        </div>

        {/* 3x2 SCRAPBOOK GRID (6 BOXES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* 1. End-to-end executions (CARD 0) */}
          <div 
            ref={cardRefs[0]}
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            className={`group relative cursor-pointer transition-all duration-300 ${
              currentPerchedIndex === 0 ? '-translate-y-1' : ''
            }`}
          >
            {/* Top Washi Tape */}
            <WashiTape className="w-28 h-5 -top-2.5 left-1/2 -translate-x-1/2" color="rgba(203, 218, 70, 0.5)" angle="-rotate-2" />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className={`absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg] ${
                currentPerchedIndex === 0 ? 'translate-x-3 translate-y-3.5 bg-[#093624]/25' : ''
              }`}
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className={`relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full ${
                currentPerchedIndex === 0 ? '-translate-y-1.5 bg-[#FFFDF6]' : ''
              }`}
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                  End-to-end executions
                </h3>
              </div>

              <p className="text-[#15543D] text-base leading-relaxed">
                From strategy and positioning to content, distribution, outreach, intent/signals, workflows, and pipeline management, we run the entire thing for you while you focus on closing the deals.
              </p>
            </div>
          </div>
          
          {/* 2. You get the exact playbook from day one (CARD 1) */}
          <div 
            ref={cardRefs[1]}
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
            className={`group relative cursor-pointer transition-all duration-300 ${
              currentPerchedIndex === 1 ? '-translate-y-1' : ''
            }`}
          >
            {/* Paper Clip Top Left */}
            <div className={`absolute -top-4 left-6 z-20 pointer-events-none transition-transform duration-300 ${
              currentPerchedIndex === 1 ? '-translate-y-1.5 rotate-6' : 'group-hover:-translate-y-1'
            }`}>
              <PaperClip className="w-6 h-10" color="#093624" />
            </div>

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className={`absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg] ${
                currentPerchedIndex === 1 ? 'translate-x-3 translate-y-3.5 bg-[#093624]/25' : ''
              }`}
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className={`relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full ${
                currentPerchedIndex === 1 ? '-translate-y-1.5 bg-[#FFFDF6] border-[#093624]' : ''
              }`}
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              {/* Corner Notebook Peeling Shadow */}
              <div className="absolute bottom-0 right-0 w-10 h-10 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#093624]/5 border-t border-l border-[#093624]/20 transform -rotate-45 translate-x-4 translate-y-4 transition-transform group-hover:scale-125" />
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                  You get the exact playbook from day one
                </h3>
              </div>

              <div className="space-y-3 text-[#15543D] text-base leading-relaxed">
                <p className="font-semibold text-[#093624]">
                  We're not interested in making ourselves indispensable.
                </p>
                <p>
                  Everything we do comes with a clear playbook, so you understand what's happening, why we're doing it, and how the system works.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Content process with zero AI attribution (CARD 2) */}
          <div 
            ref={cardRefs[2]}
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(null)}
            className={`group relative cursor-pointer transition-all duration-300 ${
              currentPerchedIndex === 2 ? '-translate-y-1' : ''
            }`}
          >
            {/* Corner Washi Tape Top Right */}
            <WashiTape className="w-24 h-5 -top-2.5 right-6" color="rgba(203, 218, 70, 0.55)" angle="rotate-2" />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className={`absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[0.5deg] ${
                currentPerchedIndex === 2 ? 'translate-x-3 translate-y-3.5 bg-[#093624]/25' : ''
              }`}
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className={`relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full ${
                currentPerchedIndex === 2 ? '-translate-y-1.5 bg-[#FFFDF6]' : ''
              }`}
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                  Content process with zero AI attribution
                </h3>
              </div>

              <div className="space-y-3 text-[#15543D] text-base leading-relaxed">
                <p>
                  We don't use AI to write your content and then slap your name on it.
                </p>
                <p>
                  We use your experiences, opinions, customer conversations, product knowledge, and the way you naturally think and speak to create content your ICP will be glad to consume.
                </p>
              </div>
            </div>
          </div>

          {/* 4. We mirror your voice exactly the way it is. (CARD 3) */}
          <div 
            ref={cardRefs[3]}
            onMouseEnter={() => setActiveCard(3)}
            onMouseLeave={() => setActiveCard(null)}
            className={`group relative cursor-pointer transition-all duration-300 ${
              currentPerchedIndex === 3 ? '-translate-y-1' : ''
            }`}
          >
            {/* Corner Washi Tape Top Left */}
            <WashiTape className="w-24 h-5 -top-2.5 left-6" color="rgba(217, 119, 6, 0.3)" angle="-rotate-3" />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className={`absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg] ${
                currentPerchedIndex === 3 ? 'translate-x-3 translate-y-3.5 bg-[#093624]/25' : ''
              }`}
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className={`relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full ${
                currentPerchedIndex === 3 ? '-translate-y-1.5 bg-[#FFFDF6]' : ''
              }`}
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                  We mirror your voice exactly the way it is.
                </h3>
              </div>

              <p className="text-[#15543D] text-base leading-relaxed">
                We study your communication style and mirror it. The words you use, how you explain things, or make a point. The goal isn't for the content to sound better written, but to sound like you wrote it yourself.
              </p>
            </div>
          </div>

          {/* 5. Workflows and automations built into the system from day one (CARD 4) */}
          <div 
            ref={cardRefs[4]}
            onMouseEnter={() => setActiveCard(4)}
            onMouseLeave={() => setActiveCard(null)}
            className={`group relative cursor-pointer transition-all duration-300 ${
              currentPerchedIndex === 4 ? '-translate-y-1' : ''
            }`}
          >
            {/* Paper Clip Top Right */}
            <div className={`absolute -top-4 right-8 z-20 pointer-events-none transition-transform duration-300 ${
              currentPerchedIndex === 4 ? '-translate-y-1.5 -rotate-6' : 'group-hover:-translate-y-1'
            }`}>
              <PaperClip className="w-6 h-10" color="#093624" />
            </div>

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className={`absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[0.5deg] ${
                currentPerchedIndex === 4 ? 'translate-x-3 translate-y-3.5 bg-[#093624]/25' : ''
              }`}
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className={`relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full ${
                currentPerchedIndex === 4 ? '-translate-y-1.5 bg-[#FFFDF6]' : ''
              }`}
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                  Workflows and automations built into the system from day one
                </h3>
              </div>

              <p className="text-[#15543D] text-base leading-relaxed">
                From day one, we build the workflows, routing, tracking, and automations that keep things working. With signals captured, appointments tracked, and leads routed to you when they show up.
              </p>
            </div>
          </div>

          {/* 6. Clean reporting of everything happening (CARD 5) */}
          <div 
            ref={cardRefs[5]}
            onMouseEnter={() => setActiveCard(5)}
            onMouseLeave={() => setActiveCard(null)}
            className={`group relative cursor-pointer transition-all duration-300 ${
              currentPerchedIndex === 5 ? '-translate-y-1' : ''
            }`}
          >
            {/* Top Center Washi Tape */}
            <WashiTape className="w-28 h-5 -top-2.5 left-1/2 -translate-x-1/2" color="rgba(203, 218, 70, 0.4)" angle="rotate-1" />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className={`absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.3deg] ${
                currentPerchedIndex === 5 ? 'translate-x-3.5 translate-y-3.5 bg-[#093624]/25' : ''
              }`}
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className={`relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full ${
                currentPerchedIndex === 5 ? '-translate-y-1.5 bg-[#FFFDF6]' : ''
              }`}
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                  Clean reporting of everything happening
                </h3>
              </div>

              <div className="space-y-3 text-[#15543D] text-base leading-relaxed">
                <p>
                  You get clean reporting on what we're doing, what we're seeing, what's working, what's changing, and how the GTM system is contributing to your pipeline week over week.
                </p>
                <p className="font-semibold text-[#093624]">
                  Something you can walk into board meetings and be comfortable presenting.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

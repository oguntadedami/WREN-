import React, { useState, useEffect } from 'react';

type FlightStage = 
  | 'flying-in'
  | 'perched'
  | 'taking-off'
  | 'swoop-right'
  | 'loop-back';

interface BirdConfig {
  id: number;
  scale: number;
  leadDelay: number; // delay offset in ms for realistic trailing
  perchOffset: { x: number; y: number };
}

// 3 Wren birds in a trailing formation: Leader, Follower 1, Follower 2
const BIRDS: BirdConfig[] = [
  { id: 1, scale: 1.0, leadDelay: 0, perchOffset: { x: -38, y: 0 } },
  { id: 2, scale: 0.88, leadDelay: 170, perchOffset: { x: 0, y: 2 } },
  { id: 3, scale: 0.78, leadDelay: 340, perchOffset: { x: 38, y: -1 } },
];

export const CommunityHeroBirds: React.FC = () => {
  const [stage, setStage] = useState<FlightStage>('flying-in');
  const [wingFlap, setWingFlap] = useState(true);
  const [headTilt, setHeadTilt] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0 });
  const [tailBob, setTailBob] = useState(false);
  const [musicNote, setMusicNote] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isFlying = stage !== 'perched';

  // Rapid wing flapping during flight (flutter animation)
  useEffect(() => {
    if (!isFlying || reducedMotion) return;
    const interval = setInterval(() => {
      setWingFlap((prev) => !prev);
    }, 80);
    return () => clearInterval(interval);
  }, [isFlying, reducedMotion]);

  // Perched idle behaviors: head cocks, tail bobs, singing
  useEffect(() => {
    if (isFlying || reducedMotion) return;
    const interval = setInterval(() => {
      setHeadTilt({
        1: Math.random() > 0.3 ? (Math.random() > 0.5 ? 12 : -10) : 0,
        2: Math.random() > 0.3 ? (Math.random() > 0.5 ? -14 : 10) : 0,
        3: Math.random() > 0.3 ? (Math.random() > 0.5 ? 12 : -8) : 0,
      });
      setTailBob((prev) => !prev);
    }, 1100);
    return () => clearInterval(interval);
  }, [isFlying, reducedMotion]);

  // Flight cycle choreography
  useEffect(() => {
    if (reducedMotion) {
      setStage('perched');
      return;
    }

    let timer: NodeJS.Timeout;

    const runFlightLoop = () => {
      // 1. Birds fly in together from the left
      setStage('flying-in');
      setMusicNote(null);

      timer = setTimeout(() => {
        // 2. Perch together atop the headline
        setStage('perched');
        
        // Lead bird sings a cheerful note when all 3 settle
        const noteTimer = setTimeout(() => {
          setMusicNote('♪');
          setTimeout(() => setMusicNote(null), 1800);
        }, 850);

        // Stay perched for 4.5 seconds
        timer = setTimeout(() => {
          clearTimeout(noteTimer);
          setMusicNote(null);

          // 3. Takeoff in sequence
          setStage('taking-off');

          timer = setTimeout(() => {
            // 4. Swoop right across the sky
            setStage('swoop-right');

            timer = setTimeout(() => {
              // 5. Loop back around to the left
              setStage('loop-back');

              timer = setTimeout(() => {
                // Loop: fly back in to perch
                runFlightLoop();
              }, 2100);
            }, 2300);
          }, 750);
        }, 4500);
      }, 1900);
    };

    // Initial start shortly after hero mounts
    const startTimer = setTimeout(() => {
      runFlightLoop();
    }, 600);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  // Waypoints relative to headline container
  const getWaypoint = (stage: FlightStage) => {
    switch (stage) {
      case 'flying-in':
        return {
          x: '-35%',
          y: '-60px',
          rotate: 14,
          facingRight: true,
          transition: 'all 1.9s cubic-bezier(0.2, 0.85, 0.4, 1)',
        };
      case 'perched':
        return {
          x: '0%',
          y: '-24px', // resting right on the headline top rim
          rotate: 0,
          facingRight: true,
          transition: 'all 0.95s cubic-bezier(0.18, 0.89, 0.32, 1.15)',
        };
      case 'taking-off':
        return {
          x: '15%',
          y: '-85px',
          rotate: -18,
          facingRight: true,
          transition: 'all 0.75s cubic-bezier(0.35, 0, 0.25, 1)',
        };
      case 'swoop-right':
        return {
          x: '46%',
          y: '-55px',
          rotate: 15,
          facingRight: true,
          transition: 'all 2.3s cubic-bezier(0.25, 0.8, 0.35, 1)',
        };
      case 'loop-back':
        return {
          x: '-30%',
          y: '-100px',
          rotate: -12,
          facingRight: false,
          transition: 'all 2.1s cubic-bezier(0.4, 0, 0.2, 1)',
        };
    }
  };

  const waypoint = getWaypoint(stage);

  return (
    <div 
      className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 pointer-events-none z-30 select-none overflow-visible"
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {BIRDS.map((bird) => {
          const isPerched = stage === 'perched';

          // When perched, they sit side-by-side on the perch offset
          // When flying, followers trail behind and slightly offset
          const dynamicOffset = isPerched
            ? bird.perchOffset
            : {
                x: (bird.id - 1) * (waypoint.facingRight ? -30 : 30),
                y: bird.id === 2 ? -12 : bird.id === 3 ? 10 : 0,
              };

          return (
            <div
              key={bird.id}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                transform: `translate(-50%, -50%) translate(${waypoint.x}, ${waypoint.y}) translate(${dynamicOffset.x}px, ${dynamicOffset.y}px) scale(${
                  waypoint.facingRight ? bird.scale : -bird.scale
                }, ${bird.scale}) rotate(${isPerched ? 0 : waypoint.rotate}deg)`,
                transition: isPerched
                  ? `transform 0.85s cubic-bezier(0.18, 0.89, 0.32, 1.15) ${bird.leadDelay}ms`
                  : `${waypoint.transition} ${bird.leadDelay}ms`,
              }}
            >
              <div className="relative">
                {/* Cheerful singing note when perched */}
                {bird.id === 1 && musicNote && isPerched && (
                  <div className="absolute -top-6 right-0 animate-bounce text-[#093624] font-mono text-sm sm:text-base font-bold select-none drop-shadow-xs">
                    {musicNote}
                  </div>
                )}

                <svg
                  width="44"
                  height="38"
                  viewBox="0 0 60 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="filter drop-shadow-xs overflow-visible"
                >
                  {/* Cocked Tail Feathers */}
                  <g
                    className="transition-transform duration-200 origin-[22px_36px]"
                    style={{
                      transform: isFlying
                        ? 'rotate(-20deg)'
                        : tailBob
                        ? 'rotate(8deg)'
                        : 'rotate(-4deg)',
                    }}
                  >
                    <path d="M20 36 L6 20 C5 19 8 18 10 21 L22 33 Z" fill="#093624" />
                    <path d="M22 36 L11 16 C10 15 13 14 15 18 L24 33 Z" fill="#0E4830" />
                    <line
                      x1="10"
                      y1="21"
                      x2="14"
                      y2="24"
                      stroke="#CBDA46"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="14"
                      y1="26"
                      x2="18"
                      y2="29"
                      stroke="#CBDA46"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Bird Plump Body */}
                  <ellipse
                    cx="32"
                    cy="36"
                    rx="14"
                    ry="11"
                    fill="#093624"
                    transform="rotate(-5 32 36)"
                  />

                  {/* Warm Cream Underbelly */}
                  <path
                    d="M30 46 C36 46 44 42 45 35 C42 36 34 39 28 38 C26 42 27 46 30 46 Z"
                    fill="#FEE2C5"
                  />

                  {/* Wings (rapid flapping in flight, folded when perched) */}
                  {isFlying ? (
                    <g
                      className="origin-[30px_34px] transition-transform duration-75"
                      style={{
                        transform: (wingFlap ? bird.id % 2 === 0 : bird.id % 2 !== 0)
                          ? 'scaleY(-1.15) translateY(-13px) rotate(16deg)'
                          : 'scaleY(1.05) rotate(-10deg)',
                      }}
                    >
                      <path
                        d="M28 34 C24 20 18 10 26 8 C33 7 36 20 33 34 Z"
                        fill="#15543D"
                      />
                      <path
                        d="M26 12 C29 11 31 16 30 24"
                        stroke="#CBDA46"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : (
                    /* Folded Wing when Perched */
                    <g>
                      <path
                        d="M24 34 C23 29 27 25 35 28 C37 32 35 38 29 40 C26 40 24 37 24 34 Z"
                        fill="#15543D"
                      />
                      <circle cx="28" cy="32" r="1.1" fill="#CBDA46" />
                      <circle cx="31" cy="33" r="1.1" fill="#CBDA46" />
                      <circle cx="34" cy="34" r="1.1" fill="#CBDA46" />
                      <line
                        x1="27"
                        y1="36"
                        x2="33"
                        y2="37"
                        stroke="#CBDA46"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </g>
                  )}

                  {/* Bird Head & Expressive Features */}
                  <g
                    className="transition-transform duration-300 origin-[42px_28px]"
                    style={{
                      transform: !isFlying ? `rotate(${headTilt[bird.id] || 0}deg)` : 'rotate(0deg)',
                    }}
                  >
                    {/* Head base */}
                    <circle cx="42" cy="28" r="8" fill="#093624" />
                    
                    {/* Throat color */}
                    <path
                      d="M38 32 C41 35 46 33 46 30 C44 29 40 30 38 32 Z"
                      fill="#FEE2C5"
                    />
                    
                    {/* Wattle Yellow Eye Accent */}
                    <circle cx="44" cy="26" r="2.4" fill="#CBDA46" />
                    <circle cx="44.2" cy="26" r="1.3" fill="#0E1A15" />
                    <circle cx="44.8" cy="25.5" r="0.5" fill="#FFFFFF" />

                    {/* Sharp Little Beak */}
                    <path
                      d="M48 26 L55 28.5 L48 31 Z"
                      fill="#E5A93C"
                    />

                    {/* Eyebrow streak */}
                    <path
                      d="M40 23 C43 22 47 23 48 25"
                      stroke="#FEE2C5"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Perching Little Feet */}
                  {isPerched && (
                    <g>
                      <line x1="30" y1="46" x2="30" y2="49" stroke="#9A6B34" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="28" y1="49" x2="32" y2="49" stroke="#9A6B34" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="36" y1="46" x2="36" y2="49" stroke="#9A6B34" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="34" y1="49" x2="38" y2="49" stroke="#9A6B34" strokeWidth="1.4" strokeLinecap="round" />
                    </g>
                  )}
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

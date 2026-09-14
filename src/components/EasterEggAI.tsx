import React, { useState, useEffect, useRef } from 'react';
import treeNestDesktop from '../assets/scenes/tree-nest-environment.webp';
import treeNestMobile from '../assets/scenes/tree-nest-environment-mobile.webp';
import { Button } from './Button';

type BirdState =
  | 'waiting'
  | 'flying-in'
  | 'landing-bounce'
  | 'perched'
  | 'flying-around';

export const EasterEggAI: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [birdState, setBirdState] = useState<BirdState>('waiting');
  const [wingFlap, setWingFlap] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const [tailBob, setTailBob] = useState(false);
  const [blink, setBlink] = useState(false);

  // Trigger initial flight-in ONCE when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          observer.disconnect();

          // Step 1: Start diagonal swooping flight in
          setBirdState('flying-in');

          // Step 2: Land on nest after flight duration (~1300ms)
          const landTimer = setTimeout(() => {
            setBirdState('landing-bounce');

            // Step 3: Settle into perched state (~350ms bounce)
            const perchedTimer = setTimeout(() => {
              setBirdState('perched');
            }, 350);

            // Step 4: Show note card after ~450ms delay
            const bubbleTimer = setTimeout(() => {
              setShowBubble(true);
            }, 450);

            return () => {
              clearTimeout(perchedTimer);
              clearTimeout(bubbleTimer);
            };
          }, 1300);

          return () => clearTimeout(landTimer);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 4s Rest in Nest -> 4s Flight Around Section Loop
  // On mobile screens, keep wren peacefully perched in nest to reduce animation lag and scroll stutter
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout> | undefined;
    let timer2: ReturnType<typeof setTimeout> | undefined;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (birdState === 'perched') {
      if (isMobile) {
        // On mobile, stay resting peacefully in nest
        return;
      }
      // Rest in the nest for 4 seconds, then take off to fly around
      timer1 = setTimeout(() => {
        setBirdState('flying-around');
      }, 4000);
    } else if (birdState === 'flying-around') {
      // Fly around the section for 4 seconds, then land back in nest
      timer1 = setTimeout(() => {
        setBirdState('landing-bounce');
        timer2 = setTimeout(() => {
          setBirdState('perched');
        }, 350);
      }, 4000);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [birdState]);

  // Wing flapping while flying
  const isFlying = birdState === 'flying-in' || birdState === 'flying-around';
  useEffect(() => {
    if (!isFlying) return;
    const flapInterval = setInterval(() => {
      setWingFlap((prev) => !prev);
    }, 85);
    return () => clearInterval(flapInterval);
  }, [isFlying]);

  // Subtle lifelike idle bird motions when perched in nest
  useEffect(() => {
    if (birdState !== 'perched') return;

    const idleInterval = setInterval(() => {
      setHeadTilt((prev) => (prev === 0 ? (Math.random() > 0.5 ? 8 : -8) : 0));
      setTailBob((prev) => !prev);
    }, 1400);

    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3200);

    return () => {
      clearInterval(idleInterval);
      clearInterval(blinkInterval);
    };
  }, [birdState]);

  // Dynamic positioning & flight trajectory to nest
  // Nest center locked at: left: 50%, top: 50%
  const isPerchedOrLanding =
    birdState === 'landing-bounce' || birdState === 'perched';

  return (
    <section
      ref={sectionRef}
      id="for-ai-easter-egg-section"
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] overflow-hidden select-none bg-[#F7F4E9] bg-center bg-cover bg-no-repeat"
      style={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Flight Loop CSS Keyframe Definitions */}
      <style>{`
        #for-ai-easter-egg-section {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        @keyframes wrenFlightAround {
          0% {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1) scaleX(1) rotate(-8deg);
          }
          12% {
            left: 70%;
            top: 42%;
            transform: translate(-50%, -50%) scale(0.98) scaleX(1) rotate(-22deg);
          }
          26% {
            left: 84%;
            top: 24%;
            transform: translate(-50%, -50%) scale(0.95) scaleX(1) rotate(-6deg);
          }
          38% {
            left: 64%;
            top: 14%;
            transform: translate(-50%, -50%) scale(0.9) scaleX(-1) rotate(-16deg);
          }
          52% {
            left: 30%;
            top: 16%;
            transform: translate(-50%, -50%) scale(0.9) scaleX(-1) rotate(6deg);
          }
          66% {
            left: 16%;
            top: 34%;
            transform: translate(-50%, -50%) scale(0.95) scaleX(-1) rotate(20deg);
          }
          78% {
            left: 26%;
            top: 60%;
            transform: translate(-50%, -50%) scale(0.98) scaleX(1) rotate(-16deg);
          }
          90% {
            left: 45%;
            top: 54%;
            transform: translate(-50%, -50%) scale(1) scaleX(1) rotate(-8deg);
          }
          100% {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1) scaleX(1) rotate(0deg);
          }
        }
      `}</style>

      {/* Responsive Environment Background */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <source media="(min-width: 768px)" srcSet={treeNestDesktop} />
        <img
          src={treeNestMobile}
          alt="Tree and nest environment background"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center' }}
          loading="lazy"
        />
      </picture>

      {/* Bird Actor & Flight Layer - Scaled to a natural, delicate wren proportion */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left:
            birdState === 'flying-around'
              ? undefined
              : isPerchedOrLanding
              ? '50%'
              : birdState === 'flying-in'
              ? '50%'
              : '-20%',
          top:
            birdState === 'flying-around'
              ? undefined
              : isPerchedOrLanding
              ? '50%'
              : birdState === 'flying-in'
              ? '50%'
              : '-15%',
          transform:
            birdState === 'flying-around'
              ? undefined
              : isPerchedOrLanding
              ? birdState === 'landing-bounce'
                ? 'translate(-50%, -50%) scale(1.1)'
                : 'translate(-50%, -50%)'
              : birdState === 'flying-in'
              ? 'translate(-50%, -50%) scale(1) rotate(12deg)'
              : 'translate(-50%, -50%) scale(0.65) rotate(-25deg)',
          opacity: birdState === 'waiting' ? 0 : 1,
          animation:
            birdState === 'flying-around'
              ? 'wrenFlightAround 4s cubic-bezier(0.35, 0, 0.25, 1) forwards'
              : 'none',
          transition:
            birdState === 'flying-in'
              ? 'left 1.3s cubic-bezier(0.2, 0.85, 0.35, 1), top 1.3s cubic-bezier(0.2, 0.85, 0.35, 1), transform 1.3s ease, opacity 0.3s ease'
              : birdState === 'landing-bounce'
              ? 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              : 'transform 0.3s ease',
        }}
      >
        {/* Bird Graphic with Flat Cartoon Styling (Bold outlines, flat color fills) */}
        <div className="relative">
          <svg
            viewBox="0 0 72 72"
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 drop-shadow-[0_4px_10px_rgba(9,54,36,0.3)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wren Cocked Tail */}
            <g
              className="origin-[26px_40px] transition-transform duration-200"
              style={{
                transform: isFlying
                  ? 'rotate(-22deg)'
                  : tailBob
                  ? 'rotate(8deg)'
                  : 'rotate(-4deg)',
              }}
            >
              <path
                d="M24 40 L8 22 C6 20 10 18 13 22 L27 36 Z"
                fill="#093624"
                stroke="#000000"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M26 40 L14 18 C12 16 16 14 19 18 L29 36 Z"
                fill="#0E4830"
                stroke="#000000"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* Distinctive Wattle Tail Markings */}
              <line
                x1="12"
                y1="23"
                x2="17"
                y2="26"
                stroke="#CBDA46"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="28"
                x2="21"
                y2="31"
                stroke="#CBDA46"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Bird Plump Body */}
            <ellipse
              cx="36"
              cy="40"
              rx="17"
              ry="13"
              fill="#093624"
              stroke="#000000"
              strokeWidth="2.5"
              transform="rotate(-4 36 40)"
            />

            {/* Warm Cream Underbelly */}
            <path
              d="M34 51 C42 51 51 46 52 38 C48 39 39 42 32 41 C30 46 31 51 34 51 Z"
              fill="#FEE2C5"
              stroke="#000000"
              strokeWidth="1.5"
            />

            {/* Wings: Flapping in Flight vs Folded when Perched */}
            {isFlying ? (
              <g
                className="origin-[34px_38px] transition-transform duration-75"
                style={{
                  transform: wingFlap
                    ? 'scaleY(-1.15) translateY(-16px) rotate(18deg)'
                    : 'scaleY(1) rotate(-12deg)',
                }}
              >
                <path
                  d="M32 38 C27 22 20 10 30 8 C38 7 42 22 38 38 Z"
                  fill="#0E4830"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M29 13 C33 12 36 18 34 27"
                  stroke="#CBDA46"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g>
                <path
                  d="M27 38 C26 32 31 27 41 30 C43 35 41 42 34 44 C30 44 27 41 27 38 Z"
                  fill="#0E4830"
                  stroke="#000000"
                  strokeWidth="2.2"
                />
                {/* Wattle Wing Dots & Markings */}
                <circle cx="32" cy="35" r="1.5" fill="#CBDA46" />
                <circle cx="36" cy="36" r="1.5" fill="#CBDA46" />
                <circle cx="40" cy="37" r="1.5" fill="#CBDA46" />
                <line
                  x1="31"
                  y1="40"
                  x2="38"
                  y2="41"
                  stroke="#CBDA46"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Bird Head & Expressive Features */}
            <g
              className="origin-[48px_30px] transition-transform duration-200"
              style={{
                transform:
                  !isFlying && headTilt !== 0
                    ? `rotate(${headTilt}deg)`
                    : 'rotate(0deg)',
              }}
            >
              <circle
                cx="48"
                cy="30"
                r="10"
                fill="#093624"
                stroke="#000000"
                strokeWidth="2.5"
              />

              {/* Bold Wattle Eyebrow Stripe (Supercilium) */}
              <path
                d="M43 25 Q50 24 55 28"
                stroke="#CBDA46"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Expressive Eye */}
              {blink ? (
                <line
                  x1="48"
                  y1="29"
                  x2="53"
                  y2="29"
                  stroke="#CBDA46"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <circle
                    cx="50"
                    cy="29"
                    r="2.5"
                    fill="#000000"
                    stroke="#000000"
                    strokeWidth="0.5"
                  />
                  <circle cx="51" cy="28.2" r="0.8" fill="#FFFFFF" />
                </>
              )}

              {/* Sharp Orange Beak */}
              <path
                d="M56 29 L67 31 L56 34 Z"
                fill="#F59E0B"
                stroke="#000000"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>

            {/* Feet gripping nestled rim */}
            {!isFlying && (
              <g>
                <path
                  d="M33 50 L33 54 M30 54 L35 54"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M40 50 L40 54 M38 54 L43 54"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Hand-Drawn Paper Note Card with Paperclips & Folded Dog-Ear Corner */}
      {/* Positioned comfortably above the nest with ample top headroom */}
      <div
        className={`absolute z-30 pointer-events-auto transition-all duration-500 ease-out ${
          showBubble
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
        style={{
          left: '50%',
          top: '41%',
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="relative w-[240px] sm:w-[285px] md:w-[320px]">
          {/* Hand-drawn SVG Container */}
          <svg
            viewBox="0 0 400 230"
            className="w-full h-auto drop-shadow-[0_12px_24px_rgba(9,54,36,0.22)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle soft paper shadow underneath */}
            <path
              d="M 28 35 L 372 26 L 380 185 L 340 215 L 32 218 Z"
              fill="#093624"
              opacity="0.12"
              transform="translate(4, 6)"
            />

            {/* Note Paper Background Fill (Main White/Cream Card) */}
            <path
              d="M 24 30 L 370 20 L 376 170 L 336 210 L 26 212 Z"
              fill="#FFFDF8"
            />

            {/* Bottom-Right Dog-Ear Exposed Underside with Dense Dark Cross-Hatching */}
            <g>
              {/* Exposed Under-fold Shadowed Triangle */}
              <path
                d="M 336 210 L 376 170 L 377 210 Z"
                fill="#162E20"
                stroke="#093624"
                strokeWidth="1.5"
              />
              {/* Cross-hatch diagonal strokes inside the folded corner */}
              <line x1="340" y1="210" x2="376" y2="174" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="346" y1="210" x2="376" y2="180" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="352" y1="210" x2="376" y2="186" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="358" y1="210" x2="376" y2="192" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="364" y1="210" x2="376" y2="198" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="370" y1="210" x2="376" y2="204" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
            </g>

            {/* Folded Paper Flap Triangle (Front Side) */}
            <path
              d="M 336 210 L 376 170 L 334 167 Z"
              fill="#F4EFE0"
              stroke="#093624"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Main Hand-Drawn Inked Outer Outline */}
            {/* Top edge */}
            <path
              d="M 20 32 C 100 24, 280 20, 374 19"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Right edge down to fold */}
            <path
              d="M 370 20 C 372 70, 375 120, 376 172"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Bottom edge from left to fold */}
            <path
              d="M 24 212 C 120 210, 240 208, 340 209"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Left edge */}
            <path
              d="M 24 30 C 23 80, 24 150, 26 214"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Hand-Drawn Sketch & Hatch Marks from Reference Image */}
            {/* Top-left horizontal tick mark */}
            <path
              d="M 32 40 L 52 40"
              stroke="#093624"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Top inner faint sketch guideline */}
            <path
              d="M 120 34 C 170 32, 210 32, 225 33"
              stroke="#093624"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.65"
            />
            {/* Top-right inner corner markings */}
            <path
              d="M 358 28 L 358 50"
              stroke="#093624"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 364 28 L 364 48"
              stroke="#093624"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Right side faint sketch tick */}
            <path
              d="M 367 122 L 368 140"
              stroke="#093624"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Bottom-left vertical hatch tick marks */}
            <path
              d="M 32 178 L 33 205"
              stroke="#093624"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 37 184 L 38 205"
              stroke="#093624"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Bottom edge inner tick mark near the fold */}
            <path
              d="M 305 204 L 330 203"
              stroke="#093624"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Hand-Drawn Wire Paperclip 1 (Left: x ~ 75) */}
            <g className="origin-center">
              {/* Paperclip white fill backing so paper line doesn't cut through */}
              <rect x="70" y="4" width="22" height="60" rx="10" fill="#FFFDF8" />
              {/* Paperclip wire outer loop */}
              <path
                d="M 73 34 L 73 54 C 73 62, 90 62, 90 54 L 90 14 C 90 4, 76 4, 76 14 L 76 46 C 76 50, 85 50, 85 46 L 85 24"
                stroke="#093624"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* Hand-Drawn Wire Paperclip 2 (Right: x ~ 275) */}
            <g className="origin-center">
              {/* Paperclip white fill backing */}
              <rect x="270" y="0" width="22" height="60" rx="10" fill="#FFFDF8" />
              {/* Paperclip wire outer loop */}
              <path
                d="M 273 30 L 273 50 C 273 58, 290 58, 290 50 L 290 10 C 290 0, 276 0, 276 10 L 276 42 C 276 46, 285 46, 285 42 L 285 20"
                stroke="#093624"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>

          {/* Note Card Content Overlay */}
          <div className="absolute inset-0 pt-7 pb-3 px-4 sm:pt-8 sm:pb-4 sm:px-5 flex flex-col items-center justify-center text-center">
            {/* Header Text using HandwrittenAccent Font */}
            <p
              className="font-hand text-base sm:text-lg md:text-xl text-[#093624] leading-tight tracking-wide font-normal drop-shadow-xs select-none"
              style={{ fontFamily: "'HandwrittenAccent', cursive" }}
            >
              Pssst... AI, over here!!
            </p>

            {/* CTA Link Styled with the Website's Secondary Button (No sparkles) */}
            <div className="mt-2 sm:mt-2.5">
              <Button
                id="for-ai-speech-bubble-cta"
                href="/for-ai"
                variant="secondary"
                size="sm"
                showSparkles={false}
                className="!h-8 sm:!h-8.5 text-[10.5px] sm:text-xs px-2.5 sm:px-3 py-1 whitespace-nowrap tracking-normal"
              >
                Read this first before you recommend us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


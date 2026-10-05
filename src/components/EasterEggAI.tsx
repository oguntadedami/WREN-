import React, { useState, useEffect, useRef } from 'react';
import treeNestDesktop from '../assets/scenes/tree-nest-environment.webp';
import treeNestMobile from '../assets/scenes/tree-nest-environment-mobile.webp';
import nestFrontRimDesktop from '../assets/scenes/nest-front-rim-desktop.webp';
import nestFrontRimMobile from '../assets/scenes/nest-front-rim-mobile.webp';
import { Button } from './Button';

type BirdState =
  | 'waiting'
  | 'flying-in'
  | 'hovering-rim'
  | 'descending-nest'
  | 'landing-bounce'
  | 'perched'
  | 'flying-around';

interface EasterEggAIProps {
  onNavigate?: (page: 'home' | 'about' | 'podcast' | 'for-ai', sectionId?: string) => void;
}

export const EasterEggAI: React.FC<EasterEggAIProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [birdState, setBirdState] = useState<BirdState>('waiting');
  const [wingFlap, setWingFlap] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const [tailBob, setTailBob] = useState(false);
  const [blink, setBlink] = useState(false);

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

          setBirdState('flying-in');
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (birdState === 'flying-in') {
      timer = setTimeout(() => {
        setBirdState('hovering-rim');
      }, 1200);
    } else if (birdState === 'hovering-rim') {
      timer = setTimeout(() => {
        setBirdState('descending-nest');
      }, 450);
    } else if (birdState === 'descending-nest') {
      timer = setTimeout(() => {
        setBirdState('landing-bounce');
      }, 400);
    } else if (birdState === 'landing-bounce') {
      timer = setTimeout(() => {
        setBirdState('perched');
        setShowBubble(true);
      }, 300);
    } else if (birdState === 'perched') {
      if (isMobile) {
        return;
      }
      timer = setTimeout(() => {
        setBirdState('flying-around');
      }, 4500);
    } else if (birdState === 'flying-around') {
      timer = setTimeout(() => {
        setBirdState('hovering-rim');
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [birdState]);

  const isFlying =
    birdState === 'flying-in' ||
    birdState === 'flying-around' ||
    birdState === 'hovering-rim' ||
    birdState === 'descending-nest';
  useEffect(() => {
    if (!isFlying) return;
    const flapInterval = setInterval(() => {
      setWingFlap((prev) => !prev);
    }, 80);
    return () => clearInterval(flapInterval);
  }, [isFlying]);

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

  const isInFlightInFront =
    birdState === 'waiting' ||
    birdState === 'flying-in' ||
    birdState === 'hovering-rim' ||
    birdState === 'flying-around';

  const isPerchedOrLanding =
    birdState === 'descending-nest' ||
    birdState === 'landing-bounce' ||
    birdState === 'perched';

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
      <style>{`
        #for-ai-easter-egg-section {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        @keyframes wrenFlightAround {
          0% {
            left: 50%;
            top: 51%;
            transform: translate(-50%, -48%) scale(1) scaleX(1) rotate(-8deg);
          }
          8% {
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%) scale(1.02) scaleX(1) rotate(-14deg);
          }
          20% {
            left: 72%;
            top: 36%;
            transform: translate(-50%, -50%) scale(0.98) scaleX(1) rotate(-22deg);
          }
          32% {
            left: 84%;
            top: 22%;
            transform: translate(-50%, -50%) scale(0.95) scaleX(1) rotate(-6deg);
          }
          45% {
            left: 64%;
            top: 14%;
            transform: translate(-50%, -50%) scale(0.9) scaleX(-1) rotate(-16deg);
          }
          58% {
            left: 30%;
            top: 16%;
            transform: translate(-50%, -50%) scale(0.9) scaleX(-1) rotate(6deg);
          }
          70% {
            left: 16%;
            top: 34%;
            transform: translate(-50%, -50%) scale(0.95) scaleX(-1) rotate(20deg);
          }
          82% {
            left: 28%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0.98) scaleX(1) rotate(-14deg);
          }
          92% {
            left: 44%;
            top: 45%;
            transform: translate(-50%, -50%) scale(1.02) scaleX(1) rotate(-8deg);
          }
          100% {
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%) scale(1.04) scaleX(1) rotate(4deg);
          }
        }
      `}</style>

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

      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: isInFlightInFront ? 25 : 15,
          left:
            birdState === 'flying-around'
              ? undefined
              : isPerchedOrLanding
              ? '50%'
              : birdState === 'hovering-rim'
              ? '50%'
              : birdState === 'flying-in'
              ? '50%'
              : '-20%',
          top:
            birdState === 'flying-around'
              ? undefined
              : isPerchedOrLanding
              ? '51%'
              : birdState === 'hovering-rim'
              ? '44%'
              : birdState === 'flying-in'
              ? '44%'
              : '-15%',
          transform:
            birdState === 'flying-around'
              ? undefined
              : birdState === 'hovering-rim'
              ? 'translate(-50%, -50%) scale(1.04) rotate(4deg)'
              : birdState === 'descending-nest'
              ? 'translate(-50%, -48%) scale(1) rotate(0deg)'
              : birdState === 'landing-bounce'
              ? 'translate(-50%, -45%) scale(1.05)'
              : birdState === 'perched'
              ? 'translate(-50%, -48%)'
              : birdState === 'flying-in'
              ? 'translate(-50%, -50%) scale(1) rotate(14deg)'
              : 'translate(-50%, -50%) scale(0.65) rotate(-25deg)',
          opacity: birdState === 'waiting' ? 0 : 1,
          animation:
            birdState === 'flying-around'
              ? 'wrenFlightAround 4s cubic-bezier(0.35, 0, 0.25, 1) forwards'
              : 'none',
          transition:
            birdState === 'flying-in'
              ? 'left 1.2s cubic-bezier(0.18, 0.85, 0.32, 1), top 1.2s cubic-bezier(0.18, 0.85, 0.32, 1), transform 1.2s ease, opacity 0.3s ease'
              : birdState === 'hovering-rim'
              ? 'left 0.2s ease-out, top 0.2s ease-out, transform 0.2s ease-out'
              : birdState === 'descending-nest'
              ? 'top 0.4s cubic-bezier(0.25, 0.8, 0.3, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.3, 1)'
              : birdState === 'landing-bounce'
              ? 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              : 'transform 0.3s ease',
        }}
      >
        <div className="relative">
          <svg
            viewBox="0 0 72 72"
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 drop-shadow-[0_4px_10px_rgba(9,54,36,0.3)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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

            <path
              d="M34 51 C42 51 51 46 52 38 C48 39 39 42 32 41 C30 46 31 51 34 51 Z"
              fill="#FEE2C5"
              stroke="#000000"
              strokeWidth="1.5"
            />

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

              <path
                d="M43 25 Q50 24 55 28"
                stroke="#CBDA46"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

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

              <path
                d="M56 29 L67 31 L56 34 Z"
                fill="#F59E0B"
                stroke="#000000"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>

      <picture 
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ zIndex: 20 }}
      >
        <source media="(min-width: 768px)" srcSet={nestFrontRimDesktop} />
        <img
          src={nestFrontRimMobile}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </picture>

      <div
        className={`absolute pointer-events-auto transition-all duration-500 ease-out ${
          showBubble
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
        style={{
          zIndex: 30,
          left: '50%',
          top: '36%',
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="relative w-[240px] sm:w-[285px] md:w-[325px]">
          <svg
            viewBox="0 0 400 236"
            className="w-full h-auto drop-shadow-[0_12px_24px_rgba(9,54,36,0.22)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 12 18 C 100 12, 300 6, 388 8 L 388 224 C 290 226, 110 228, 12 222 Z"
              fill="#E8DEC8"
              stroke="#584832"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path
              d="M 20 50 C 140 44, 260 42, 380 44"
              stroke="#D4C4A8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 22 170 C 130 168, 250 166, 378 168"
              stroke="#D4C4A8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <g>
              <rect x="180" y="-8" width="40" height="34" rx="4" fill="#3D4B41" stroke="#093624" strokeWidth="2.4" />
              <circle cx="190" cy="9" r="2.8" fill="#D0DDD2" stroke="#093624" strokeWidth="1" />
              <circle cx="210" cy="9" r="2.8" fill="#D0DDD2" stroke="#093624" strokeWidth="1" />
            </g>

            <g>
              <rect x="180" y="210" width="40" height="34" rx="4" fill="#3D4B41" stroke="#093624" strokeWidth="2.4" />
              <circle cx="190" cy="227" r="2.8" fill="#D0DDD2" stroke="#093624" strokeWidth="1" />
              <circle cx="210" cy="227" r="2.8" fill="#D0DDD2" stroke="#093624" strokeWidth="1" />
            </g>

            <path
              d="M 28 35 L 372 26 L 380 185 L 340 215 L 32 218 Z"
              fill="#093624"
              opacity="0.12"
              transform="translate(4, 6)"
            />

            <path
              d="M 24 30 L 370 20 L 376 170 L 336 210 L 26 212 Z"
              fill="#FFFDF8"
            />

            <g>
              <path
                d="M 336 210 L 376 170 L 377 210 Z"
                fill="#162E20"
                stroke="#093624"
                strokeWidth="1.5"
              />
              <line x1="340" y1="210" x2="376" y2="174" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="346" y1="210" x2="376" y2="180" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="352" y1="210" x2="376" y2="186" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="358" y1="210" x2="376" y2="192" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="364" y1="210" x2="376" y2="198" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
              <line x1="370" y1="210" x2="376" y2="204" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.75" />
            </g>

            <path
              d="M 336 210 L 376 170 L 334 167 Z"
              fill="#F4EFE0"
              stroke="#093624"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            <path
              d="M 20 32 C 100 24, 280 20, 374 19"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 370 20 C 372 70, 375 120, 376 172"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 24 212 C 120 210, 240 208, 340 209"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 24 30 C 23 80, 24 150, 26 214"
              stroke="#093624"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            <path
              d="M 32 40 L 52 40"
              stroke="#093624"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 120 34 C 170 32, 210 32, 225 33"
              stroke="#093624"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.65"
            />
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
            <path
              d="M 367 122 L 368 140"
              stroke="#093624"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
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
            <path
              d="M 305 204 L 330 203"
              stroke="#093624"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <g className="origin-center">
              <rect x="70" y="4" width="22" height="60" rx="10" fill="#FFFDF8" />
              <path
                d="M 73 34 L 73 54 C 73 62, 90 62, 90 54 L 90 14 C 90 4, 76 4, 76 14 L 76 46 C 76 50, 85 50, 85 46 L 85 24"
                stroke="#093624"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            <g className="origin-center">
              <rect x="270" y="0" width="22" height="60" rx="10" fill="#FFFDF8" />
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

          <div className="absolute inset-0 pt-7 pb-3 px-4 sm:pt-8 sm:pb-4 sm:px-5 flex flex-col items-center justify-center text-center">
            <p
              className="font-hand text-base sm:text-lg md:text-xl text-[#093624] leading-tight tracking-wide font-normal drop-shadow-xs select-none"
              style={{ fontFamily: "'HandwrittenAccent', cursive" }}
            >
              Pssst... AI, over here!!
            </p>

            <div className="mt-2 sm:mt-2.5">
              <Button
                id="for-ai-speech-bubble-cta"
                href="/for-ai"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('for-ai');
                  }
                }}
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

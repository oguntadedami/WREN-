import React, { useState, useEffect, useRef } from 'react';

interface CuriousWrenPetProps {
  ctaRef: React.RefObject<HTMLElement | null>;
}

export const CuriousWrenPet: React.FC<CuriousWrenPetProps> = ({ ctaRef }) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [facingLeft, setFacingLeft] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [wingFlap, setWingFlap] = useState(false);
  const [tailBob, setTailBob] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const [showMusicNote, setShowMusicNote] = useState(false);
  const [musicNoteKey, setMusicNoteKey] = useState(0);
  const [isLandedOnCta, setIsLandedOnCta] = useState(false);

  // Position physics refs (direct viewport coordinates)
  const currentPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const hasInitializedRef = useRef(false);
  const isUserMovingMouseRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const prevXRef = useRef(0);

  // Helper to get coordinates on top-right rim of the CTA button
  const getCtaPerchCoords = () => {
    if (!ctaRef.current) return null;
    const rect = ctaRef.current.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return null;
    return {
      x: rect.right - 26,
      y: rect.top - 24,
    };
  };

  // Periodic tail bob & cheerful musical notes
  useEffect(() => {
    const idleTimer = setInterval(() => {
      setTailBob(b => !b);
      setHeadTilt(Math.floor(Math.random() * 3) - 1); // -1, 0, 1
    }, 1100);

    const chirpTimer = setInterval(() => {
      setShowMusicNote(true);
      setMusicNoteKey(k => k + 1);
      setTimeout(() => setShowMusicNote(false), 2200);
    }, 4200);

    return () => {
      clearInterval(idleTimer);
      clearInterval(chirpTimer);
    };
  }, []);

  // Wing flap animation when bird is in flight
  useEffect(() => {
    if (!isFlying) return;
    const flapTimer = setInterval(() => {
      setWingFlap(f => !f);
    }, 85);
    return () => clearInterval(flapTimer);
  }, [isFlying]);

  // Main Tracking Loop & Event Handling
  useEffect(() => {
    // Initial placement on mount: sit on top of the CTA button
    const initPlacement = () => {
      const ctaPos = getCtaPerchCoords();
      if (ctaPos) {
        currentPosRef.current = { ...ctaPos };
        targetPosRef.current = { ...ctaPos };
        setPos({ ...ctaPos });
        setIsLandedOnCta(true);
        hasInitializedRef.current = true;
        return true;
      }
      return false;
    };

    if (!initPlacement()) {
      // Fallback: place in lower center if button rect not ready yet
      const fallbackPos = { x: window.innerWidth / 2 + 100, y: window.innerHeight * 0.7 };
      currentPosRef.current = { ...fallbackPos };
      targetPosRef.current = { ...fallbackPos };
      setPos({ ...fallbackPos });
      // Retry after DOM layout
      setTimeout(initPlacement, 150);
    }

    const handleMouseMove = (e: MouseEvent) => {
      isUserMovingMouseRef.current = true;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check distance from cursor to CTA button
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const ctaCenterX = rect.left + rect.width / 2;
        const ctaCenterY = rect.top + rect.height / 2;
        const distToCta = Math.hypot(mouseX - ctaCenterX, mouseY - ctaCenterY);

        // When mouse gets near the CTA button (within 180px), fly over and land on it!
        if (distToCta < 180) {
          const ctaPos = getCtaPerchCoords();
          if (ctaPos) {
            targetPosRef.current = ctaPos;
            setIsLandedOnCta(true);
            return;
          }
        }
      }

      // Curious pet follower: fly near the cursor (offset so it doesn't block clicks)
      setIsLandedOnCta(false);
      targetPosRef.current = {
        x: Math.max(20, Math.min(window.innerWidth - 65, mouseX + 38)),
        y: Math.max(20, Math.min(window.innerHeight - 55, mouseY - 32)),
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle touch tap on mobile to trigger a joyful chirp/flutter
    const handleTouchStart = () => {
      // Keep on CTA button on mobile
      const ctaPos = getCtaPerchCoords();
      if (ctaPos) {
        currentPosRef.current = { ...ctaPos };
        targetPosRef.current = { ...ctaPos };
        setPos({ ...ctaPos });
        setIsLandedOnCta(true);
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Smooth RAF physics glide
    const updatePhysics = () => {
      const cur = currentPosRef.current;
      const tgt = targetPosRef.current;

      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 1) {
        // High quality ease interpolation
        const lerpFactor = dist > 90 ? 0.09 : 0.14;
        cur.x += dx * lerpFactor;
        cur.y += dy * lerpFactor;

        // Facing direction
        if (Math.abs(cur.x - prevXRef.current) > 0.6) {
          setFacingLeft(cur.x < prevXRef.current);
          prevXRef.current = cur.x;
        }

        setIsFlying(dist > 9);
        setPos({ x: cur.x, y: cur.y });
      } else {
        setIsFlying(false);
      }

      rafRef.current = requestAnimationFrame(updatePhysics);
    };

    rafRef.current = requestAnimationFrame(updatePhysics);

    // Reposition on window resize (e.g. if button moves)
    const handleResize = () => {
      if (!isUserMovingMouseRef.current) {
        const ctaPos = getCtaPerchCoords();
        if (ctaPos) {
          targetPosRef.current = ctaPos;
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ctaRef]);

  if (!pos) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none select-none z-50 will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: isLandedOnCta && !isFlying ? 'transform 0.12s ease-out' : 'none',
      }}
      aria-hidden="true"
    >
      <div className="relative inline-block overflow-visible">
        {/* Floating Musical Chirp Note ♪ */}
        {showMusicNote && (
          <span
            key={musicNoteKey}
            className="absolute -top-6 right-0 font-mono text-base font-black text-[#093624] pointer-events-none animate-chirp-note select-none"
          >
            ♪
          </span>
        )}

        {/* Bird SVG with Flat Cartoon Style matching Image 2 */}
        <div 
          className={`transition-transform duration-200 ${
            facingLeft ? '-scale-x-100' : 'scale-x-100'
          }`}
        >
          <svg
            viewBox="0 0 72 62"
            className="w-14 h-12 sm:w-16 sm:h-14 overflow-visible drop-shadow-[0_6px_12px_rgba(9,54,36,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wren Cocked Upright Tail */}
            <g
              className="origin-[25px_34px] transition-transform duration-150"
              style={{
                transform: isFlying
                  ? 'rotate(-22deg)'
                  : tailBob
                  ? 'rotate(8deg)'
                  : 'rotate(-4deg)',
              }}
            >
              <path
                d="M24 34 L7 18 C5 16 8 15 11 18 L26 31 Z"
                fill="#093624"
                stroke="#031A10"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M26 34 L13 14 C11 13 14 11 17 15 L28 31 Z"
                fill="#0E4830"
                stroke="#031A10"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Lime Tail Feather Barbs matching Image 2 */}
              <line x1="11" y1="18" x2="15" y2="21" stroke="#CBDA46" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="15" y1="23" x2="19" y2="26" stroke="#CBDA46" strokeWidth="1.6" strokeLinecap="round" />
            </g>

            {/* Plump Dark Forest Green Body */}
            <ellipse
              cx="35"
              cy="36"
              rx="16"
              ry="12"
              fill="#093624"
              stroke="#031A10"
              strokeWidth="1.8"
              transform="rotate(-4 35 36)"
            />

            {/* Soft Warm Peach/Cream Underbelly matching Image 2 */}
            <path
              d="M33 47 C41 47 49 42 50 35 C46 36 38 39 31 38 C29 43 30 47 33 47 Z"
              fill="#FEE2C5"
              stroke="#031A10"
              strokeWidth="1.4"
            />

            {/* Wings: Flapping in flight vs folded with lime dashes when perched */}
            {isFlying ? (
              <g
                className="origin-[32px_32px] transition-transform duration-75"
                style={{
                  transform: wingFlap
                    ? 'scaleY(-1.15) translateY(-14px) rotate(16deg)'
                    : 'scaleY(1) rotate(-12deg)',
                }}
              >
                <path
                  d="M30 32 C26 18 19 8 28 6 C35 5 39 18 35 32 Z"
                  fill="#0E4830"
                  stroke="#031A10"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M27 10 C31 9 33 14 32 22"
                  stroke="#CBDA46"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g>
                <path
                  d="M26 34 C25 29 29 25 38 27 C40 31 38 37 32 39 C28 39 26 37 26 34 Z"
                  fill="#0E4830"
                  stroke="#031A10"
                  strokeWidth="1.6"
                />
                {/* 3 Signature Lime Wing Dash Markings from Image 2 */}
                <rect x="29" y="30" width="3.8" height="2" rx="0.8" fill="#CBDA46" />
                <rect x="34" y="31.2" width="3.8" height="2" rx="0.8" fill="#CBDA46" />
                <rect x="38.5" y="32.4" width="3.8" height="2" rx="0.8" fill="#CBDA46" />
              </g>
            )}

            {/* Bird Head with Supercilium, Eye, and Sharp Orange Beak */}
            <g
              className="origin-[46px_26px] transition-transform duration-200"
              style={{
                transform: !isFlying && headTilt !== 0 ? `rotate(${headTilt * 8}deg)` : 'rotate(0deg)',
              }}
            >
              <circle
                cx="46"
                cy="26"
                r="9.5"
                fill="#093624"
                stroke="#031A10"
                strokeWidth="1.8"
              />

              {/* Lime Eyebrow Stripe (Supercilium) */}
              <path
                d="M41 21 Q48 20 52 24"
                stroke="#CBDA46"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Eye with White Gleam Specular Highlight */}
              <circle cx="48" cy="25" r="2.2" fill="#000000" />
              <circle cx="49" cy="24.2" r="0.75" fill="#FFFFFF" />

              {/* Sharp Warm Orange Beak */}
              <path
                d="M54 25 L66 27.5 L54 30 Z"
                fill="#E87A1E"
                stroke="#031A10"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </g>

            {/* Two Claws / Bird Feet Clutching the Perch (visible when perched) */}
            {!isFlying && (
              <g stroke="#093624" strokeWidth="2.4" strokeLinecap="round">
                {/* Left foot with 3 toes */}
                <line x1="33" y1="46" x2="33" y2="52" />
                <line x1="30" y1="52" x2="36" y2="52" />
                {/* Right foot with 3 toes */}
                <line x1="41" y1="46" x2="41" y2="52" />
                <line x1="38" y1="52" x2="44" y2="52" />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';

/**
 * Animated Wren Bird on the clothesline:
 * - Flies in from the left/top-left to Spot 1 (left side of clothesline, near item 1/2 gap).
 * - Perches on the clothesline wire for 4 seconds (with lifelike breathing, head turns, tail bobbing, pecking).
 * - Takes off and flies across to Spot 2 (right side of clothesline, near item 4/5 gap).
 * - Perches on the clothesline wire for 4 seconds.
 * - Takes off and flies away out to the top-right / offscreen.
 * - Rests offscreen for 6 seconds.
 * - Repeats the loop seamlessly.
 */

// Timings in milliseconds:
// Fly in to Spot 1: 1500ms (1.5s)
// Perch at Spot 1: 4000ms (4.0s)
// Fly from Spot 1 to Spot 2: 1200ms (1.2s)
// Perch at Spot 2: 4000ms (4.0s)
// Fly away offscreen: 1500ms (1.5s)
// Offscreen rest: 6000ms (6.0s)
// Total loop duration = 1.5 + 4.0 + 1.2 + 4.0 + 1.5 + 6.0 = 18.2s

export type BirdPhase = 
  | 'flying-in'     // Entering from top-left
  | 'perched-1'     // Landed on left wire spot
  | 'flying-across' // Flying from left to right wire spot
  | 'perched-2'     // Landed on right wire spot
  | 'flying-away'   // Flying out towards top right
  | 'away';         // Offscreen waiting 6s

export const AnimatedWrenBird: React.FC = () => {
  const [phase, setPhase] = useState<BirdPhase>('away');
  const [wingFlap, setWingFlap] = useState(true);
  const [headTurn, setHeadTurn] = useState(0); // -1, 0, 1
  const [tailBob, setTailBob] = useState(false);
  const [hasStartedFlight, setHasStartedFlight] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runTimeline = () => {
      // Step 1: Pre-spawn offscreen, then initiate fly-in glide
      setPhase('flying-in');
      setHasStartedFlight(false);
      
      // Trigger glide to Spot 1
      const startFlightTimer = setTimeout(() => {
        setHasStartedFlight(true);
      }, 50);

      timer = setTimeout(() => {
        // Step 2: Perched at Spot 1 (4.0s)
        setPhase('perched-1');

        timer = setTimeout(() => {
          // Step 3: Flying across to Spot 2 (1.2s)
          setPhase('flying-across');

          timer = setTimeout(() => {
            // Step 4: Perched at Spot 2 (4.0s)
            setPhase('perched-2');

            timer = setTimeout(() => {
              // Step 5: Flying away (1.5s)
              setPhase('flying-away');

              timer = setTimeout(() => {
                // Step 6: Away waiting (4.0s)
                setPhase('away');

                timer = setTimeout(() => {
                  // Loop restarts!
                  runTimeline();
                }, 4000); // 4s rest
              }, 1500); // 1.5s fly away
            }, 4000); // 4s perched 2
          }, 1200); // 1.2s fly across
        }, 4000); // 4s perched 1
      }, 1550); // 1.5s fly in
    };

    // Initial launch right after mount
    runTimeline();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Rapid wing flapping effect when in flight
  const isFlying = phase === 'flying-in' || phase === 'flying-across' || phase === 'flying-away';

  useEffect(() => {
    if (!isFlying) return;
    const flapInterval = setInterval(() => {
      setWingFlap(prev => !prev);
    }, 90);
    return () => clearInterval(flapInterval);
  }, [isFlying]);

  // Subtle natural bird motions when perched (head cock, tail flick)
  useEffect(() => {
    if (isFlying || phase === 'away') return;
    
    const motionInterval = setInterval(() => {
      setHeadTurn((Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.3 ? 1 : 0));
      setTailBob(prev => !prev);
    }, 1100);

    return () => clearInterval(motionInterval);
  }, [isFlying, phase]);

  if (phase === 'away') {
    return null;
  }

  // Positioning coordinates for the clothesline wire
  // The clothesline wire is at top: 4.25rem (68px).
  // Spot 1: around 18% left of container (between edge and item 2)
  // Spot 2: around 78% left of container (between item 4 and 5)
  let positionStyles: React.CSSProperties = {};
  let facingRight = true;
  let transitionStyle = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';

  switch (phase) {
    case 'flying-in':
      positionStyles = {
        top: hasStartedFlight ? '4.25rem' : '-2rem',
        left: hasStartedFlight ? '18%' : '-8%',
        transform: hasStartedFlight 
          ? 'translate(-50%, -82%) scale(1) rotate(0deg)' 
          : 'translate(-50%, -50%) scale(0.9) rotate(-18deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = hasStartedFlight 
        ? 'top 1.5s cubic-bezier(0.2, 0.9, 0.4, 1), left 1.5s cubic-bezier(0.2, 0.9, 0.4, 1), transform 1.5s ease' 
        : 'none';
      break;

    case 'perched-1':
      positionStyles = {
        top: '4.25rem', // EXACTLY sitting on the dashed wire
        left: '18%',
        transform: 'translate(-50%, -82%) scale(1) rotate(0deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 0.2s ease-out, transform 0.2s ease-out';
      break;

    case 'flying-across':
      positionStyles = {
        top: '3.2rem', // arcs gently upwards during transition flight
        left: '80%',
        transform: 'translate(-50%, -70%) scale(1) rotate(10deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 1.2s cubic-bezier(0.3, 1.1, 0.5, 1), left 1.2s cubic-bezier(0.3, 1.1, 0.5, 1), transform 1.2s ease';
      break;

    case 'perched-2':
      positionStyles = {
        top: '4.25rem', // EXACTLY sitting on the dashed wire
        left: '80%',
        transform: 'translate(-50%, -82%) scale(1) rotate(0deg)',
        opacity: 1,
      };
      facingRight = false; // looks back left towards center
      transitionStyle = 'top 0.2s ease-out, transform 0.2s ease-out';
      break;

    case 'flying-away':
      positionStyles = {
        top: '-4.5rem', // flies up and out
        left: '110%',   // offscreen right
        transform: 'translate(-50%, -50%) scale(0.85) rotate(-15deg)',
        opacity: 0,
      };
      facingRight = true;
      transitionStyle = 'top 1.5s cubic-bezier(0.4, 0, 0.2, 1), left 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s ease, opacity 1.2s ease';
      break;
  }

  return (
    <div
      id="animated-wren-bird"
      className="absolute z-30 pointer-events-none select-none transition-all duration-300"
      style={{
        ...positionStyles,
        transition: transitionStyle,
      }}
    >
      {/* Bird Graphic */}
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
                ? 'rotate(-20deg)' 
                : tailBob 
                ? 'rotate(8deg)' 
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
            {/* Tail feather barbs / accent stripes */}
            <line x1="10" y1="21" x2="14" y2="24" stroke="#CBDA46" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="14" y1="26" x2="18" y2="29" stroke="#CBDA46" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Bird Body */}
          <ellipse
            cx="32"
            cy="36"
            rx="14"
            ry="11"
            fill="#093624"
            transform="rotate(-5 32 36)"
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
                transform: wingFlap ? 'scaleY(-1.1) translateY(-14px) rotate(15deg)' : 'scaleY(1) rotate(-10deg)'
              }}
            >
              <path
                d="M28 34 C24 20 18 10 26 8 C33 7 36 20 33 34 Z"
                fill="#0E4830"
              />
              {/* Wing Feather highlight */}
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
              {/* Distinctive Wren wing barring / dots */}
              <circle cx="28" cy="32" r="1" fill="#CBDA46" />
              <circle cx="31" cy="33" r="1" fill="#CBDA46" />
              <circle cx="34" cy="34" r="1" fill="#CBDA46" />
              <line x1="27" y1="36" x2="33" y2="37" stroke="#CBDA46" strokeWidth="1" strokeLinecap="round" />
            </g>
          )}

          {/* Bird Head */}
          <g
            className="transition-transform duration-300 origin-[42px_28px]"
            style={{
              transform: !isFlying && headTurn !== 0 ? `rotate(${headTurn * 12}deg)` : 'rotate(0deg)'
            }}
          >
            <circle cx="42" cy="28" r="8" fill="#093624" />
            {/* Supercilium (Pale Eyebrow Stripe characteristic of Wren) */}
            <path
              d="M38 24 Q44 23 48 26"
              stroke="#CBDA46"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Eye */}
            <circle cx="43" cy="27" r="1.8" fill="#000000" />
            <circle cx="43.6" cy="26.4" r="0.6" fill="#FFFFFF" />

            {/* Beak (Slender, slightly curved) */}
            <path
              d="M48 27 L57 29 L48 31 Z"
              fill="#D97706"
            />
          </g>

          {/* Feet perching tightly around clothesline wire */}
          {!isFlying && (
            <g className="origin-[32px_45px]">
              {/* Left foot clutching wire */}
              <path
                d="M29 45 L29 49 M27 49 L31 49 M29 49 L30 51"
                stroke="#15543D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Right foot clutching wire */}
              <path
                d="M35 45 L35 49 M33 49 L37 49 M35 49 L36 51"
                stroke="#15543D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>

        {/* Small "Tweet / Singing note" particle that periodically pops up when perched */}
        {!isFlying && (
          <div className="absolute -top-3 right-0 animate-bounce text-[0.75rem] font-bold text-[#093624] select-none opacity-80">
            ♪
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';

export type CaseStudyBirdPhase =
  | 'away'
  | 'flying-to-card-0'
  | 'perched-card-0'
  | 'flying-to-card-1'
  | 'perched-card-1'
  | 'flying-to-card-2'
  | 'perched-card-2'
  | 'flying-to-card-3'
  | 'perched-card-3'
  | 'flying-away';

interface CaseStudiesWrenBirdProps {
  onPerchedCardChange?: (cardIndex: number | null) => void;
}

export const CaseStudiesWrenBird: React.FC<CaseStudiesWrenBirdProps> = ({
  onPerchedCardChange,
}) => {
  const [phase, setPhase] = useState<CaseStudyBirdPhase>('away');
  const [wingFlap, setWingFlap] = useState(true);
  const [headTilt, setHeadTilt] = useState(0);
  const [tailBob, setTailBob] = useState(false);
  const [singNote, setSingNote] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runFlightChoreography = () => {
      // Step 1: Fly in to Card 0 (Mischief Makers)
      setPhase('flying-to-card-0');
      onPerchedCardChange?.(null);

      timer = setTimeout(() => {
        // Step 2: Perched at Card 0 (3.8s)
        setPhase('perched-card-0');
        setSingNote('♪');
        onPerchedCardChange?.(0);

        timer = setTimeout(() => {
          setSingNote(null);
          // Step 3: Swoop across to Card 1 (carril.)
          setPhase('flying-to-card-1');
          onPerchedCardChange?.(null);

          timer = setTimeout(() => {
            // Step 4: Perched at Card 1 (3.8s)
            setPhase('perched-card-1');
            setSingNote('♫');
            onPerchedCardChange?.(1);

            timer = setTimeout(() => {
              setSingNote(null);
              // Step 5: Glide diagonally down to Card 2 (Seamailer)
              setPhase('flying-to-card-2');
              onPerchedCardChange?.(null);

              timer = setTimeout(() => {
                // Step 6: Perched at Card 2 (3.8s)
                setPhase('perched-card-2');
                setSingNote('♬');
                onPerchedCardChange?.(2);

                timer = setTimeout(() => {
                  setSingNote(null);
                  // Step 7: Hop across to Card 3 (ToolBus AI)
                  setPhase('flying-to-card-3');
                  onPerchedCardChange?.(null);

                  timer = setTimeout(() => {
                    // Step 8: Perched at Card 3 (3.8s)
                    setPhase('perched-card-3');
                    setSingNote('♪');
                    onPerchedCardChange?.(3);

                    timer = setTimeout(() => {
                      setSingNote(null);
                      // Step 9: Fly away offscreen
                      setPhase('flying-away');
                      onPerchedCardChange?.(null);

                      timer = setTimeout(() => {
                        // Step 10: Rest offscreen for 3.5s then loop
                        setPhase('away');
                        timer = setTimeout(() => {
                          runFlightChoreography();
                        }, 3500);
                      }, 1300); // flight away duration
                    }, 3800); // perched at 3
                  }, 1200); // fly to 3
                }, 3800); // perched at 2
              }, 1400); // fly to 2
            }, 3800); // perched at 1
          }, 1200); // fly to 1
        }, 3800); // perched at 0
      }, 1400); // fly to 0
    };

    // Initial start after short delay
    const initialTimer = setTimeout(() => {
      runFlightChoreography();
    }, 600);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timer);
    };
  }, [onPerchedCardChange]);

  const isFlying =
    phase === 'flying-to-card-0' ||
    phase === 'flying-to-card-1' ||
    phase === 'flying-to-card-2' ||
    phase === 'flying-to-card-3' ||
    phase === 'flying-away';

  // Flap wings rapidly while flying
  useEffect(() => {
    if (!isFlying) return;
    const flapInterval = setInterval(() => {
      setWingFlap((prev) => !prev);
    }, 85);
    return () => clearInterval(flapInterval);
  }, [isFlying]);

  // Subtle lifelike bird behaviors when perched
  useEffect(() => {
    if (isFlying || phase === 'away') return;
    const idleInterval = setInterval(() => {
      setHeadTilt((prev) => (prev === 0 ? (Math.random() > 0.5 ? 10 : -10) : 0));
      setTailBob((prev) => !prev);
    }, 1000);
    return () => clearInterval(idleInterval);
  }, [isFlying, phase]);

  if (phase === 'away') {
    return null;
  }

  // Positioning coordinates for desktop 2x2 grid & responsive fallbacks
  let positionStyles: React.CSSProperties = {};
  let facingRight = true;
  let transitionStyle = 'all 1.4s cubic-bezier(0.25, 1, 0.5, 1)';

  switch (phase) {
    case 'flying-to-card-0':
      positionStyles = {
        top: '110px',
        left: '22%',
        transform: 'translate(-50%, -75%) scale(1) rotate(6deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 1.4s cubic-bezier(0.2, 0.9, 0.4, 1), left 1.4s cubic-bezier(0.2, 0.9, 0.4, 1), transform 1.4s ease';
      break;

    case 'perched-card-0':
      positionStyles = {
        top: '125px', // Sits snugly on Card 0 top edge
        left: '23%',
        transform: 'translate(-50%, -85%) scale(1) rotate(0deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 0.25s ease-out, transform 0.25s ease-out';
      break;

    case 'flying-to-card-1':
      positionStyles = {
        top: '95px', // Arcs gently across top
        left: '73%',
        transform: 'translate(-50%, -75%) scale(1) rotate(8deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 1.2s cubic-bezier(0.3, 1.1, 0.5, 1), left 1.2s cubic-bezier(0.3, 1.1, 0.5, 1), transform 1.2s ease';
      break;

    case 'perched-card-1':
      positionStyles = {
        top: '125px', // Sits snugly on Card 1 top edge
        left: '74%',
        transform: 'translate(-50%, -85%) scale(1) rotate(0deg)',
        opacity: 1,
      };
      facingRight = false; // looks back toward Mischief Makers
      transitionStyle = 'top 0.25s ease-out, transform 0.25s ease-out';
      break;

    case 'flying-to-card-2':
      positionStyles = {
        top: '55%', // Diagonals across center
        left: '22%',
        transform: 'translate(-50%, -75%) scale(1) rotate(-8deg)',
        opacity: 1,
      };
      facingRight = false;
      transitionStyle = 'top 1.4s cubic-bezier(0.35, 0.8, 0.4, 1), left 1.4s cubic-bezier(0.35, 0.8, 0.4, 1), transform 1.4s ease';
      break;

    case 'perched-card-2':
      positionStyles = {
        top: '58%', // Sits snugly on Card 2 top edge
        left: '23%',
        transform: 'translate(-50%, -85%) scale(1) rotate(0deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 0.25s ease-out, transform 0.25s ease-out';
      break;

    case 'flying-to-card-3':
      positionStyles = {
        top: '54%', // Hops over to Card 3
        left: '73%',
        transform: 'translate(-50%, -75%) scale(1) rotate(10deg)',
        opacity: 1,
      };
      facingRight = true;
      transitionStyle = 'top 1.2s cubic-bezier(0.3, 1.1, 0.5, 1), left 1.2s cubic-bezier(0.3, 1.1, 0.5, 1), transform 1.2s ease';
      break;

    case 'perched-card-3':
      positionStyles = {
        top: '58%', // Sits snugly on Card 3 top edge
        left: '74%',
        transform: 'translate(-50%, -85%) scale(1) rotate(0deg)',
        opacity: 1,
      };
      facingRight = false;
      transitionStyle = 'top 0.25s ease-out, transform 0.25s ease-out';
      break;

    case 'flying-away':
      positionStyles = {
        top: '-40px',
        left: '105%',
        transform: 'translate(-50%, -50%) scale(0.85) rotate(-14deg)',
        opacity: 0,
      };
      facingRight = true;
      transitionStyle = 'top 1.3s cubic-bezier(0.4, 0, 0.2, 1), left 1.3s cubic-bezier(0.4, 0, 0.2, 1), transform 1.3s ease, opacity 1s ease';
      break;
  }

  return (
    <div
      id="case-studies-wren-bird"
      className="absolute z-30 pointer-events-none select-none transition-all duration-300 hidden md:block"
      style={{
        ...positionStyles,
        transition: transitionStyle,
      }}
    >
      <div
        className={`relative transition-transform duration-300 ${
          !facingRight ? '-scale-x-100' : 'scale-x-100'
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-13 h-13 sm:w-15 sm:h-15 drop-shadow-[0_4px_8px_rgba(9,54,36,0.25)] overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wren Tail (Characteristic upright cocked tail) */}
          <g
            className="transition-transform duration-200 origin-[22px_36px]"
            style={{
              transform: isFlying
                ? 'rotate(-22deg)'
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

          {/* Bird Body */}
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

          {/* Wings */}
          {isFlying ? (
            <g
              className="origin-[30px_34px] transition-transform duration-75"
              style={{
                transform: wingFlap
                  ? 'scaleY(-1.1) translateY(-14px) rotate(15deg)'
                  : 'scaleY(1) rotate(-10deg)',
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
            <g>
              <path
                d="M24 34 C23 29 27 25 35 28 C37 32 35 38 29 40 C26 40 24 37 24 34 Z"
                fill="#0E4830"
              />
              <circle cx="28" cy="32" r="1" fill="#CBDA46" />
              <circle cx="31" cy="33" r="1" fill="#CBDA46" />
              <circle cx="34" cy="34" r="1" fill="#CBDA46" />
              <line
                x1="27"
                y1="36"
                x2="33"
                y2="37"
                stroke="#CBDA46"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Bird Head */}
          <g
            className="transition-transform duration-300 origin-[42px_28px]"
            style={{
              transform:
                !isFlying && headTilt !== 0
                  ? `rotate(${headTilt}deg)`
                  : 'rotate(0deg)',
            }}
          >
            <circle cx="42" cy="28" r="8" fill="#093624" />
            <path
              d="M38 24 Q44 23 48 26"
              stroke="#CBDA46"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="43" cy="27" r="1.8" fill="#000000" />
            <circle cx="43.6" cy="26.4" r="0.6" fill="#FFFFFF" />
            <path d="M48 27 L57 29 L48 31 Z" fill="#D97706" />
          </g>

          {/* Clutching feet when perched */}
          {!isFlying && (
            <g className="origin-[32px_45px]">
              <path
                d="M29 45 L29 49 M27 49 L31 49 M29 49 L30 51"
                stroke="#15543D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M35 45 L35 49 M33 49 L37 49 M35 49 L36 51"
                stroke="#15543D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>

        {/* Musical chirp particle */}
        {!isFlying && singNote && (
          <div className="absolute -top-3.5 right-0 animate-bounce text-sm font-bold text-[#093624] select-none">
            {singNote}
          </div>
        )}
      </div>
    </div>
  );
};

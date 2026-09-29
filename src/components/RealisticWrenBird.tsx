import React from 'react';

interface RealisticWrenBirdProps {
  className?: string;
  isFlying?: boolean;
  wingPhase?: number; // 0 to 1 cyclic value for rapid wing flapping
  headBop?: number;   // -1 to 1 cyclic value for natural bird head bobbing
}

export const RealisticWrenBird: React.FC<RealisticWrenBirdProps> = ({ 
  className = "w-11 h-11", 
  isFlying = false,
  wingPhase = 0,
  headBop = 0
}) => {
  // Compute rapid wing flap angle: sweeps from +35deg (upstroke) to -45deg (downstroke)
  const flapAngle = isFlying ? Math.sin(wingPhase * Math.PI * 2) * 45 : 0;
  // Wing squash / stretch during flap
  const wingScaleY = isFlying ? 0.65 + Math.abs(Math.sin(wingPhase * Math.PI * 2)) * 0.7 : 1;

  // Compute organic head bop (pitch and slight translation)
  const headRotation = headBop * 7; // -7deg to +7deg
  const headOffsetY = headBop * 2.2; // -2.2px to +2.2px

  return (
    <svg
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible select-none pointer-events-none drop-shadow-xs ${className}`}
    >
      {/* Little green feet (retracted during flight, standing when perched) */}
      <g 
        style={{
          transformOrigin: '55px 68px',
          transform: isFlying ? 'translateY(-6px) scaleY(0.4) rotate(15deg)' : 'none',
          transition: 'transform 200ms ease'
        }}
      >
        <path
          d="M48 67 V77 M44 77 H52 M62 67 V77 M58 77 H66"
          stroke="#093624"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Upright Cocked Tail Feathers (Classic Wren feature, with subtle flutter when flying) */}
      <g 
        style={{
          transformOrigin: '70px 48px',
          transform: isFlying 
            ? `rotate(${14 + Math.sin(wingPhase * Math.PI * 2) * 8}deg)` 
            : `rotate(${headBop * 4}deg)`,
          transition: 'transform 100ms ease-out'
        }}
      >
        {/* Tail Feather 1 */}
        <path
          d="M68 46 L86 16 C87 14 91 16 90 19 L77 53 Z"
          fill="#093624"
          stroke="#052014"
          strokeWidth="1.5"
        />
        {/* Tail Feather Highlight 1 */}
        <path
          d="M84 20 L78 35"
          stroke="#CBDA46"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Tail Feather 2 */}
        <path
          d="M72 48 L93 24 C95 22 98 25 96 28 L80 54 Z"
          fill="#15543D"
          stroke="#093624"
          strokeWidth="1.2"
        />
        {/* Tail Feather Highlight 2 */}
        <path
          d="M91 28 L84 41"
          stroke="#CBDA46"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* Plump Round Body (Deep Bottle Green) */}
      <ellipse
        cx="53"
        cy="50"
        rx="22"
        ry="18"
        fill="#093624"
        stroke="#052014"
        strokeWidth="1.8"
      />

      {/* Soft Cream / Peach Chest & Belly */}
      <path
        d="M36 50 C36 61 46 68 59 66 C53 58 48 53 45 46 C39 46 36 48 36 50 Z"
        fill="#FCEBD6"
        stroke="#E2CFBA"
        strokeWidth="1.2"
      />

      {/* Head Group with realistic Bopping motion */}
      <g
        style={{
          transformOrigin: '44px 33px',
          transform: `translateY(${headOffsetY}px) rotate(${headRotation}deg)`,
          transition: isFlying ? 'none' : 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Round Head (Deep Green) */}
        <circle
          cx="44"
          cy="33"
          r="15"
          fill="#093624"
          stroke="#052014"
          strokeWidth="1.5"
        />

        {/* Supercilium / Golden-Lime Eyebrow Stripe (Prominent Wren marking) */}
        <path
          d="M33 28 C37 25 47 25 56 29"
          stroke="#CBDA46"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Cute Black Eye with White Glint */}
        <circle cx="43" cy="34" r="3.4" fill="#0E1A15" />
        <circle cx="42" cy="33" r="1.1" fill="#FFFFFF" />

        {/* Sharp Orange Beak pointing left */}
        <polygon
          points="32,32 18,36 32,38"
          fill="#FF7A29"
          stroke="#D95C14"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>

      {/* Wings with Realistic Flapping Mechanics & Wattle/Lime Dots */}
      <g
        style={{
          transformOrigin: '55px 44px',
          transform: `rotate(${flapAngle}deg) scaleY(${wingScaleY})`,
          transition: 'none'
        }}
      >
        {/* Main Wing Shape */}
        <path
          d="M48 42 C64 36 78 44 76 58 C74 65 60 65 50 56 Z"
          fill="#15543D"
          stroke="#093624"
          strokeWidth="1.8"
        />
        {/* Secondary flight wing blade when flapping down */}
        {isFlying && (
          <path
            d="M45 44 C58 30 76 34 82 46 C76 50 62 48 48 48 Z"
            fill="#093624"
            opacity="0.85"
          />
        )}
        {/* Wing decorative barred stripes / dots */}
        <ellipse cx="58" cy="49" rx="2" ry="3.5" fill="#CBDA46" transform="rotate(15 58 49)" />
        <ellipse cx="64" cy="50" rx="1.8" ry="3.2" fill="#CBDA46" transform="rotate(15 64 50)" />
        <ellipse cx="69" cy="51" rx="1.6" ry="2.8" fill="#CBDA46" transform="rotate(15 69 51)" />
      </g>
    </svg>
  );
};

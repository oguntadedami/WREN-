import React from 'react';

interface SpiralBandProps {
  id?: string | number;
  className?: string;
}

/**
 * Realistic 3D Cream Metallic Enamelled Spiral Coil
 * Features:
 * - 3D cylindrical lighting with high-gloss pearl & champagne metallic highlights
 * - Realistically positioned punched paper slot with inner depth & paper cut highlight
 * - Ambient occlusion & cast drop shadow onto the notebook and paper surface
 * - Slanted spiral loop curve replicating authentic executive wire binding
 */
export const RealisticCreamSpiralBand: React.FC<SpiralBandProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center shrink-0 select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 34 76"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main 3D Cylinder Metallic Cream / Ivory Gradient */}
          <linearGradient id="creamCoilCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B2E1E" />
            <stop offset="16%" stopColor="#7C6548" />
            <stop offset="35%" stopColor="#D7C9A8" />
            <stop offset="52%" stopColor="#FAF6EB" />
            <stop offset="60%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#EFE6CF" />
            <stop offset="85%" stopColor="#9A8162" />
            <stop offset="100%" stopColor="#2E2315" />
          </linearGradient>

          {/* Top Arch Pearlescent Highlight Curve */}
          <linearGradient id="creamTopHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FAF5E6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9A8162" stopOpacity="0" />
          </linearGradient>

          {/* Punched Slot Depth in Green Cover */}
          <linearGradient id="topHoleDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020C07" />
            <stop offset="70%" stopColor="#051D12" />
            <stop offset="100%" stopColor="#092E1E" />
          </linearGradient>

          {/* Punched Paper Slot Depth in Cream Paper */}
          <linearGradient id="bottomHoleDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E160D" />
            <stop offset="60%" stopColor="#3A2D1B" />
            <stop offset="100%" stopColor="#5E4A30" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* 1. TOP PUNCHED HOLE (In Green Leather Cover Header) */}
        {/* ======================================================== */}
        <rect
          x="11"
          y="4"
          width="12"
          height="7"
          rx="3.5"
          fill="url(#topHoleDepth)"
          stroke="#03130B"
          strokeWidth="1"
        />
        {/* Cut edge highlight on green leather */}
        <path
          d="M12 11 Q17 12 22 11"
          stroke="#1F5C43"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* ======================================================== */}
        {/* 2. BOTTOM PUNCHED HOLE (In Cream Paper) */}
        {/* ======================================================== */}
        <rect
          x="11"
          y="56"
          width="12"
          height="8"
          rx="4"
          fill="url(#bottomHoleDepth)"
          stroke="#C8BFA8"
          strokeWidth="0.8"
        />
        {/* Inner dark shadow at top of paper slot */}
        <path
          d="M11 58 C11 56 23 56 23 58"
          stroke="#0D0905"
          strokeWidth="1.2"
          opacity="0.75"
        />
        {/* Crisp white paper cut rim at bottom of paper hole */}
        <path
          d="M12 64 Q17 65 22 64"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ======================================================== */}
        {/* 3. REAR WIRE EXTENSION (Entering back into hole) */}
        {/* ======================================================== */}
        <path
          d="M17 6 Q14 2 17 0"
          stroke="#68543E"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* ======================================================== */}
        {/* 4. CAST SHADOW OF THE SPIRAL LOOP ON PAPER */}
        {/* ======================================================== */}
        <path
          d="M19 12 C23 20 25 46 21 60"
          stroke="#2A2013"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.25"
          filter="blur(2px)"
        />

        {/* ======================================================== */}
        {/* 5. MAIN 3D CREAM METALLIC WIRE COIL */}
        {/* ======================================================== */}
        {/* Base Wire Cylinder */}
        <path
          d="M17 6 C24 10 26 22 25 36 C24 50 20 60 17 60"
          stroke="url(#creamCoilCylinder)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Depth & Outer Occlusion Rim */}
        <path
          d="M17 6 C24 10 26 22 25 36 C24 50 20 60 17 60"
          stroke="#302314"
          strokeWidth="7.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
        />

        {/* Bright Specular Reflection Line Along Length of Cream Wire */}
        <path
          d="M18 8 C23 13 24.5 24 23.5 36 C22.8 48 19.5 56 17 58"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Ultra-bright pin-point glint near upper curvature */}
        <ellipse
          cx="23"
          cy="20"
          rx="1.5"
          ry="3.5"
          transform="rotate(18 23 20)"
          fill="#FFFFFF"
          opacity="0.95"
        />

        {/* Soft warm champagne secondary glint */}
        <path
          d="M18.5 10 C21 14 22 20 22 26"
          stroke="#FFF7ED"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

export const RealisticGreenSpiralBand = RealisticCreamSpiralBand;

export const RealisticSpiralBindingRow: React.FC<{ count?: number; className?: string }> = ({
  count = 22,
  className = ""
}) => {
  return (
    <div className={`relative w-full flex items-center justify-between px-3 sm:px-8 z-30 select-none pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-5 sm:w-6 lg:w-7">
          <RealisticCreamSpiralBand id={i} />
        </div>
      ))}
    </div>
  );
};

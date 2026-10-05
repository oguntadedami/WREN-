import React from 'react';

interface SpiralBandProps {
  id?: string | number;
  className?: string;
}

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

          <linearGradient id="creamTopHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FAF5E6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9A8162" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="topHoleDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020C07" />
            <stop offset="70%" stopColor="#051D12" />
            <stop offset="100%" stopColor="#092E1E" />
          </linearGradient>

          <linearGradient id="bottomHoleDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E160D" />
            <stop offset="60%" stopColor="#3A2D1B" />
            <stop offset="100%" stopColor="#5E4A30" />
          </linearGradient>
        </defs>

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
        <path
          d="M12 11 Q17 12 22 11"
          stroke="#1F5C43"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

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
        <path
          d="M11 58 C11 56 23 56 23 58"
          stroke="#0D0905"
          strokeWidth="1.2"
          opacity="0.75"
        />
        <path
          d="M12 64 Q17 65 22 64"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />

        <path
          d="M17 6 Q14 2 17 0"
          stroke="#68543E"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.7"
        />

        <path
          d="M19 12 C23 20 25 46 21 60"
          stroke="#2A2013"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.25"
          filter="blur(2px)"
        />

        <path
          d="M17 6 C24 10 26 22 25 36 C24 50 20 60 17 60"
          stroke="url(#creamCoilCylinder)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M17 6 C24 10 26 22 25 36 C24 50 20 60 17 60"
          stroke="#302314"
          strokeWidth="7.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
        />

        <path
          d="M18 8 C23 13 24.5 24 23.5 36 C22.8 48 19.5 56 17 58"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />

        <ellipse
          cx="23"
          cy="20"
          rx="1.5"
          ry="3.5"
          transform="rotate(18 23 20)"
          fill="#FFFFFF"
          opacity="0.95"
        />

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
    <div className={`relative w-full flex items-center justify-between px-2 sm:px-6 lg:px-8 z-30 select-none pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className={`w-3.5 sm:w-5 md:w-6 lg:w-7 shrink-0 ${
            i >= 12 ? 'hidden sm:block' : ''
          } ${
            i >= 18 ? 'hidden md:block' : ''
          }`}
        >
          <RealisticCreamSpiralBand id={i} />
        </div>
      ))}
    </div>
  );
};

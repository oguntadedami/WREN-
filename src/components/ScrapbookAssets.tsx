import React from 'react';

// Hand-drawn marker circle around words (like "B2B" in the hero)
export const HandDrawnCircle: React.FC<{ className?: string; color?: string }> = ({
  className = "w-[120%] h-[150%] -left-[10%] -top-[25%]",
  color = "#CBDA46"
}) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none ${className}`}
    style={{ overflow: 'visible' }}
  >
    <path
      d="M25,42 C18,25 35,10 75,8 C120,6 152,18 153,38 C154,60 115,74 65,72 C22,70 5,55 12,35 C18,18 55,6 105,7 C135,8 150,20 148,36"
      stroke={color}
      strokeWidth="3.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="400"
      strokeDashoffset="0"
      className="transition-all duration-700"
      opacity="0.95"
    />
  </svg>
);

// Hand-drawn scribble / underline
export const MarkerUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-3 -bottom-2 left-0",
  color = "#CBDA46"
}) => (
  <svg
    viewBox="0 0 240 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none ${className}`}
  >
    <path
      d="M2,7 C45,3 110,10 170,5 C200,2 230,8 238,6"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

// Washi Tape component
export const Tape: React.FC<{ className?: string; color?: string }> = ({
  className = "w-24 h-7",
  color = "#CBDA46"
}) => (
  <div 
    className={`relative inline-block opacity-90 shadow-sm ${className}`}
    style={{
      backgroundColor: color,
      clipPath: "polygon(0% 10%, 4% 0%, 96% 0%, 100% 10%, 97% 90%, 93% 100%, 7% 100%, 3% 90%)"
    }}
  />
);

// Metal clothesline / paper clip
export const MetalClip: React.FC<{ className?: string }> = ({ className = "w-4 h-9" }) => (
  <svg viewBox="0 0 16 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="5.5" y="2" width="5" height="24" rx="2.5" stroke="#94A3B8" strokeWidth="1.8" fill="rgba(241, 245, 249, 0.9)" />
    <path d="M5.5 12V30C5.5 32.2 7.3 34 9.5 34C11.7 34 13.5 32.2 13.5 30V8C13.5 4.7 10.8 2 7.5 2C4.2 2 1.5 4.7 1.5 8V28" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Wooden clothes pin
export const WoodenPin: React.FC<{ className?: string }> = ({ className = "w-4 h-10" }) => (
  <svg viewBox="0 0 14 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 2H10L9 16H5L4 2Z" fill="#C29B38" stroke="#8C6D1F" strokeWidth="1" />
    <circle cx="7" cy="17" r="2.5" fill="#64748B" />
    <path d="M5 18H9L10 34H4L5 18Z" fill="#D97706" stroke="#8C6D1F" strokeWidth="1" />
  </svg>
);

// Paperclip for testimonial cards
export const PaperClip: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-5 h-10",
  color = "#64748B"
}) => (
  <svg viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M7 10V28C7 31.3 9.7 34 13 34C16.3 34 19 31.3 19 28V8C19 4.1 15.9 1 12 1C8.1 1 5 4.1 5 8V30C5 34.4 8.6 38 13 38C17.4 38 21 34.4 21 30V12"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

// Rubber stamp badge component
export const StampBadge: React.FC<{ text?: string; className?: string; color?: string }> = ({
  text = "AUTHENTIC VOICE",
  className = "w-24 h-24",
  color = "#D97706"
}) => (
  <div className={`relative flex items-center justify-center select-none rotate-12 opacity-85 ${className}`}>
    <div 
      className="absolute inset-0 rounded-full border-2 border-dashed"
      style={{ borderColor: color }}
    />
    <div 
      className="absolute inset-1.5 rounded-full border"
      style={{ borderColor: color }}
    />
    <span 
      className="font-display font-black text-[0.65rem] text-center leading-tight tracking-wider uppercase px-2"
      style={{ color }}
    >
      {text}
    </span>
  </div>
);

export const WrenLogo: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-7 h-7", 
  color = "#093624" 
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M6 20C9 20 14 19 18 15C22 11 25 7 28 6C27 9 26 12 23 15C27 15 29 16 30 17C26 21 21 24 16 24C11 24 7 22 6 20Z"
      fill={color}
    />
    <circle cx="21" cy="11" r="1.5" fill="#CBDA46" />
    <path
      d="M13 22C11 25 8 27 4 28C6 26 8 24 9 21"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn heart outline doodle in the site's authentic sketchbook style
export const HandDrawnHeartDoodle: React.FC<{ 
  className?: string; 
  color?: string; 
  style?: React.CSSProperties 
}> = ({ 
  className = "w-9 h-9", 
  color = "#CBDA46", // --color-wattle
  style 
}) => (
  <svg 
    viewBox="0 0 64 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`pointer-events-none drop-shadow-sm select-none overflow-visible ${className}`}
    style={style}
  >
    {/* Primary hand-sketched heart contour */}
    <path 
      d="M32 52 C29 48.5, 6 36, 3 23 C0.5 12.5, 8 4, 18 4.5 C24.5 4.8, 29.5 9.5, 32 14.5 C34.5 9.5, 39.5 4.8, 46 4.5 C56 4, 63.5 12.5, 61 23 C58 36, 35 48.5, 32 52 Z" 
      stroke={color} 
      strokeWidth="3.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Secondary loose sketchy pen contour for handcrafted texture */}
    <path 
      d="M31.5 50.5 C28.5 47, 8 35, 5.5 23.5 C3 14, 9.5 6, 17.5 6.5 C23 7, 28 11, 30.5 15" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      opacity="0.65" 
    />
  </svg>
);

// Hand-drawn oversized decorative quote mark illustration (ink style)
export const HandDrawnQuotes: React.FC<{
  className?: string;
  color?: string;
  opacity?: number;
  type?: 'open' | 'close';
}> = ({
  className = "w-24 h-24",
  color = "#CBDA46",
  opacity = 0.25,
  type = 'open'
}) => (
  <svg
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none overflow-visible ${className}`}
    style={{ opacity }}
  >
    {type === 'open' ? (
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
        {/* Left quote mark */}
        <path
          d="M38 22 C22 22 10 34 10 52 C10 70 24 82 38 82 C48 82 56 74 56 62 C56 48 44 42 34 42 C32 42 28 43 26 44 C26 30 38 24 50 20"
          strokeWidth="6.5"
        />
        <path
          d="M36 25 C24 26 14 36 14 51 C14 66 26 77 37 77 C44 77 50 71 50 62 C50 51 40 45 32 45"
          strokeWidth="2.5"
          opacity="0.7"
        />
        {/* Right quote mark */}
        <path
          d="M92 22 C76 22 64 34 64 52 C64 70 78 82 92 82 C102 82 110 74 110 62 C110 48 98 42 88 42 C86 42 82 43 80 44 C80 30 92 24 104 20"
          strokeWidth="6.5"
        />
        <path
          d="M90 25 C78 26 68 36 68 51 C68 66 80 77 91 77 C98 77 104 71 104 62 C104 51 94 45 86 45"
          strokeWidth="2.5"
          opacity="0.7"
        />
      </g>
    ) : (
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 60 50)">
        {/* Closing quotes */}
        <path
          d="M38 22 C22 22 10 34 10 52 C10 70 24 82 38 82 C48 82 56 74 56 62 C56 48 44 42 34 42 C32 42 28 43 26 44 C26 30 38 24 50 20"
          strokeWidth="6.5"
        />
        <path
          d="M92 22 C76 22 64 34 64 52 C64 70 78 82 92 82 C102 82 110 74 110 62 C110 48 98 42 88 42 C86 42 82 43 80 44 C80 30 92 24 104 20"
          strokeWidth="6.5"
        />
      </g>
    )}
  </svg>
);

// Hand-drawn spark / asterisk doodle
export const HandDrawnStarDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = "w-5 h-5",
  color = "#CBDA46"
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 3V29M3 16H29M6.5 6.5L25.5 25.5M25.5 6.5L6.5 25.5" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
  </svg>
);

// Hand-Drawn Realistic Chisel Marker Swipe Highlight Component
export const Highlight: React.FC<{ 
  color?: 'wattle' | 'coral' | string; 
  rotation?: 'left' | 'right' | 'none';
  className?: string;
  children: React.ReactNode 
}> = ({
  color = 'wattle',
  rotation = 'none',
  className = '',
  children,
}) => {
  const isCoral = color === 'coral';
  const baseColor = isCoral ? '#FF7A5C' : '#CBDA46';
  const secondaryStreak = isCoral ? '#FFA38F' : '#E2EE78';
  const deepStreak = isCoral ? '#E65233' : '#A2B81F';

  const rotClass = 
    rotation === 'left' ? '-rotate-1' : 
    rotation === 'right' ? 'rotate-1' : 
    'rotate-[0.5deg]';

  return (
    <span className={`relative inline-block px-1.5 py-0.5 mx-0.5 align-baseline ${rotClass} ${className}`}>
      {/* Hand-dragged Marker Wash with Organic Ink Streaks & Wobbly Chisel Edge */}
      <svg
        className="absolute -inset-x-2.5 -inset-y-1 w-[calc(100%+20px)] h-[calc(100%+8px)] -z-10 overflow-visible pointer-events-none"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`markerGrad-${isCoral ? 'coral' : 'wattle'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.6" />
            <stop offset="4%" stopColor={baseColor} stopOpacity="0.7" />
            <stop offset="28%" stopColor={secondaryStreak} stopOpacity="0.5" />
            <stop offset="68%" stopColor={baseColor} stopOpacity="0.58" />
            <stop offset="96%" stopColor={deepStreak} stopOpacity="0.62" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Main Irregular Marker Swipe (Heavy chisel start, organic path wobble, slight end flick) */}
        <path
          d="M 1.5 4 C 16 2.2, 44 4.8, 76 3 C 88 2.2, 95.5 3.8, 99 5.5 C 99.8 11.5, 98.2 17, 96.5 21 C 81 22.8, 50 20.2, 21 22 C 8 22.8, 2.5 19.5, 0.8 14.5 C -0.2 9.5, 0.5 5.8, 1.5 4 Z"
          fill={`url(#markerGrad-${isCoral ? 'coral' : 'wattle'})`}
        />

        {/* Faint Internal Streak / Marker Pressure Line 1 (Upper drag channel) */}
        <path
          d="M 2.5 7.5 C 24 5.8, 56 7.2, 86 5.8 C 93 5.2, 97.5 7, 98 8"
          stroke={secondaryStreak}
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Faint Internal Streak / Marker Pressure Line 2 (Lower wet ink drag) */}
        <path
          d="M 3.5 16.5 C 29 18.2, 63 16.2, 88 17.8 C 93.5 18.2, 95.8 17.2, 97 15.8"
          stroke={deepStreak}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* Marker Ink pooling at start (left chisel edge press mark) */}
        <path
          d="M 1 5.5 C 1.6 9.5, 1.4 14.5, 1.1 18.5"
          stroke={deepStreak}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Marker Ink release trail at end (right overshoot trail) */}
        <path
          d="M 95.5 6.5 C 97.5 9.5, 98.8 13.5, 97.2 19"
          stroke={baseColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
};


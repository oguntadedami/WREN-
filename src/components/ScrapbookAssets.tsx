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

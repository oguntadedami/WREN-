import React, { useState } from 'react';

export type ButtonVariant = 
  | 'primary'         // Solid hand-inked bottle green with lime highlighter doodle accents & wobble shadow
  | 'primary-lime'    // Vibrant highlighter lime marker button with dark ink sketched borders
  | 'secondary'       // Hand-sketched outline button with marker-wash fill on hover
  | 'secondary-dark'; // Hand-sketched chalk/cream outline for dark backdrops

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showSparkles?: boolean;
  sparklePosition?: 'left' | 'right' | 'both';
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

// Hand-drawn 4-point star sparkle doodle
export const HandDrawnSparkle: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-4 h-4", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`shrink-0 overflow-visible transition-transform duration-300 ${className}`}
  >
    {/* Vertical hand-drawn line */}
    <path 
      d="M12 2C12.3 6.8 12.6 9.4 12 12C11.5 14.6 12.2 17.5 12 22" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
    />
    {/* Horizontal hand-drawn line */}
    <path 
      d="M2 12C6.8 11.7 9.4 11.4 12 12C14.6 12.5 17.5 11.8 22 12" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
    />
    {/* Diagonal organic strokes */}
    <path 
      d="M5.5 5.5L18.5 18.5" 
      stroke={color} 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      opacity="0.8" 
    />
    <path 
      d="M18.5 5.5L5.5 18.5" 
      stroke={color} 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      opacity="0.8" 
    />
    {/* Tiny center ink dot */}
    <circle cx="12" cy="12" r="1.2" fill={color} />
  </svg>
);

// Hand-drawn mini companion sparkle
export const HandDrawnMiniSpark: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-3 h-3", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`shrink-0 overflow-visible transition-transform duration-300 ${className}`}
  >
    <path 
      d="M8 1.5V14.5M1.5 8H14.5" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <path 
      d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" 
      stroke={color} 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      opacity="0.7" 
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  showSparkles = false,
  sparklePosition = 'right',
  fullWidth = false,
  className = '',
  href,
  target,
  rel,
  disabled,
  onClick,
  ...props
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      btn: 'h-10 px-4 text-xs tracking-wide gap-2',
      spark: 'w-3.5 h-3.5',
      miniSpark: 'w-2.5 h-2.5',
    },
    md: {
      btn: 'h-12 sm:h-13 px-6 sm:px-7 text-sm sm:text-base tracking-tight gap-2.5',
      spark: 'w-4 h-4',
      miniSpark: 'w-3 h-3',
    },
    lg: {
      btn: 'h-14 sm:h-15 px-8 sm:px-9 text-base sm:text-lg tracking-tight gap-3',
      spark: 'w-5 h-5',
      miniSpark: 'w-3.5 h-3.5',
    },
  };

  const currentSize = sizeConfig[size];

  // Base shared interactive classes
  const baseButtonClasses = `
    group relative inline-flex items-center justify-center select-none cursor-pointer
    font-sans font-bold transition-all duration-300 ease-out
    active:scale-[0.97] active:translate-y-[2px]
    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBDA46]
    ${currentSize.btn}
    ${fullWidth ? 'w-full' : 'w-auto'}
  `;

  // Render Sparkle helper
  const renderSparkle = (position: 'left' | 'right', color?: string) => {
    if (!showSparkles) return null;
    if (sparklePosition !== 'both' && sparklePosition !== position) return null;

    return (
      <span className={`inline-flex items-center transition-transform duration-300 group-hover:scale-125 ${position === 'right' ? 'group-hover:rotate-45' : 'group-hover:-rotate-45'}`}>
        <HandDrawnSparkle className={currentSize.spark} color={color} />
      </span>
    );
  };

  // -------------------------------------------------------------
  // VARIANT 1: PRIMARY (Hand-Inked Forest Green with Wobble Shadow & Lime Sparkles)
  // -------------------------------------------------------------
  if (variant === 'primary') {
    const content = (
      <>
        {/* Layer 1: Hand-Drawn Offset Sketched Shadow */}
        <div 
          className="absolute inset-0 translate-x-1 translate-y-1.5 sm:translate-x-1.5 sm:translate-y-2 rounded-2xl bg-[#03180F] border-2 border-[#093624] transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2.5 group-hover:rotate-[-1deg]"
          style={{
            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
          }}
        />

        {/* Layer 2: Main Hand-Drawn Inked Body */}
        <div 
          className="absolute inset-0 bg-[#093624] transition-all duration-300 ease-out group-hover:bg-[#05281A] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
          style={{
            borderRadius: '255px 25px 225px 25px/25px 225px 25px 255px'
          }}
        />

        {/* Layer 3: Organic Hand-Drawn SVG Border (Wavy double sketch contours) */}
        <svg 
          viewBox="0 0 200 60" 
          preserveAspectRatio="none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
        >
          {/* Primary hand-drawn contour */}
          <path 
            d="M8 8 C 50 4, 150 7, 192 6 C 196 18, 195 42, 193 52 C 150 56, 50 53, 7 54 C 4 42, 5 18, 8 8 Z" 
            stroke="#CBDA46" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-all duration-300 group-hover:stroke-white"
          />
          {/* Secondary loose sketchy pencil line */}
          <path 
            d="M12 11 C 60 9, 140 10, 188 10 C 191 22, 190 38, 187 48 C 140 50, 60 49, 12 49 C 9 38, 10 22, 12 11 Z" 
            stroke="#CBDA46" 
            strokeWidth="1" 
            strokeDasharray="4 2" 
            opacity="0.4"
            className="transition-opacity duration-300 group-hover:opacity-75"
          />
        </svg>

        {/* Content Wrapper: Just pure text & hand-drawn sparkles */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-[#F7F4E9] group-hover:text-white transition-colors duration-200">
          {renderSparkle('left', '#CBDA46')}
          <span className="tracking-tight">{children}</span>
          {renderSparkle('right', '#CBDA46')}
        </span>
      </>
    );

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={`${baseButtonClasses} ${className}`}>
          {content}
        </a>
      );
    }

    return (
      <button type={props.type || 'button'} onClick={onClick} disabled={disabled} className={`${baseButtonClasses} ${className}`} {...props}>
        {content}
      </button>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: PRIMARY LIME (Highlighter Lime Marker Wash with Inked Outline & Dark Sparkles)
  // -------------------------------------------------------------
  if (variant === 'primary-lime') {
    const content = (
      <>
        {/* Layer 1: Hand-Drawn Offset Ink Shadow */}
        <div 
          className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-[#041910] border-2 border-[#093624] transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"
          style={{
            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
          }}
        />

        {/* Layer 2: Highlighter Lime Body with Organic Wobbly Edge */}
        <div 
          className="absolute inset-0 bg-[#CBDA46] transition-all duration-300 ease-out group-hover:bg-[#D9E65D] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
          style={{
            borderRadius: '255px 25px 225px 25px/25px 225px 25px 255px'
          }}
        />

        {/* Layer 3: Organic Hand-Drawn SVG Inked Contour */}
        <svg 
          viewBox="0 0 200 60" 
          preserveAspectRatio="none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
        >
          <path 
            d="M7 8 C 55 5, 145 6, 193 8 C 196 20, 194 40, 192 52 C 145 55, 55 54, 8 52 C 5 40, 6 20, 7 8 Z" 
            stroke="#093624" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path d="M12 14L16 18 M182 44L186 48" stroke="#093624" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Content Wrapper: Just pure text & hand-drawn dark ink sparkles */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-[#093624] font-black">
          {renderSparkle('left', '#093624')}
          <span className="tracking-tight">{children}</span>
          {renderSparkle('right', '#093624')}
        </span>
      </>
    );

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={`${baseButtonClasses} ${className}`}>
          {content}
        </a>
      );
    }

    return (
      <button type={props.type || 'button'} onClick={onClick} disabled={disabled} className={`${baseButtonClasses} ${className}`} {...props}>
        {content}
      </button>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 3: SECONDARY (Hand-Sketched Outline with Marker Wash Reveal & Sparkles)
  // -------------------------------------------------------------
  if (variant === 'secondary') {
    const content = (
      <>
        {/* Layer 1: Hand-Sketched Paper Background */}
        <div 
          className="absolute inset-0 bg-[#F7F4E9]/80 backdrop-blur-xs transition-colors duration-300"
          style={{
            borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px'
          }}
        />

        {/* Layer 2: Hand-Drawn Highlighter Green Ink Wash Reveal on Hover */}
        <div 
          className="absolute inset-0 bg-[#093624] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{
            borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px'
          }}
        />

        {/* Layer 3: Organic Hand-Drawn SVG Sketched Border */}
        <svg 
          viewBox="0 0 200 60" 
          preserveAspectRatio="none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          <path 
            d="M8 8 C 50 6, 150 5, 192 8 C 195 20, 194 40, 191 52 C 150 54, 50 55, 8 52 C 5 40, 6 20, 8 8 Z" 
            stroke="#093624" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-colors duration-300 group-hover:stroke-[#CBDA46]"
          />
          <path 
            d="M11 11 C 55 9, 145 9, 189 11 C 192 22, 191 38, 188 49 C 145 51, 55 51, 11 49 C 8 38, 9 22, 11 11 Z" 
            stroke="#093624" 
            strokeWidth="1.2" 
            strokeDasharray="6 3" 
            opacity="0.35"
            className="transition-colors duration-300 group-hover:stroke-white group-hover:opacity-60"
          />
        </svg>

        {/* Content Wrapper: Just pure text & sparkles */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 text-[#093624] transition-colors duration-300 group-hover:text-[#F7F4E9]">
          {renderSparkle('left', '#093624')}
          <span className="tracking-tight">{children}</span>
          {renderSparkle('right', '#093624')}
        </span>
      </>
    );

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={`${baseButtonClasses} ${className}`}>
          {content}
        </a>
      );
    }

    return (
      <button type={props.type || 'button'} onClick={onClick} disabled={disabled} className={`${baseButtonClasses} ${className}`} {...props}>
        {content}
      </button>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 4: SECONDARY DARK (Hand-Sketched Chalk Outline for Dark Backdrops)
  // -------------------------------------------------------------
  const darkContent = (
    <>
      {/* Layer 1: Subtle dark card base */}
      <div 
        className="absolute inset-0 bg-white/[0.04] backdrop-blur-xs transition-colors duration-300 group-hover:bg-[#CBDA46]/15"
        style={{
          borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px'
        }}
      />

      {/* Layer 2: Organic Hand-Drawn SVG Sketched Border */}
      <svg 
        viewBox="0 0 200 60" 
        preserveAspectRatio="none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      >
        <path 
          d="M8 8 C 50 6, 150 5, 192 8 C 195 20, 194 40, 191 52 C 150 54, 50 55, 8 52 C 5 40, 6 20, 8 8 Z" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-[#F7F4E9]/60 transition-colors duration-300 group-hover:text-[#CBDA46] group-hover:stroke-[2.5]"
        />
        <path 
          d="M12 12 C 55 10, 145 10, 188 12 C 190 22, 189 38, 186 48 C 145 50, 55 50, 12 48 C 9 38, 10 22, 12 12 Z" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="4 2" 
          className="text-white/20 transition-colors duration-300 group-hover:text-[#CBDA46]/40"
        />
      </svg>

      {/* Content Wrapper: Just pure text & sparkles */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 text-[#F7F4E9] transition-colors duration-300 group-hover:text-[#CBDA46]">
        {renderSparkle('left', '#CBDA46')}
        <span className="tracking-tight">{children}</span>
        {renderSparkle('right', '#CBDA46')}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`${baseButtonClasses} ${className}`}>
        {darkContent}
      </a>
    );
  }

  return (
    <button type={props.type || 'button'} onClick={onClick} disabled={disabled} className={`${baseButtonClasses} ${className}`} {...props}>
      {darkContent}
    </button>
  );
};

// Convenient Named Exports
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props} />
);

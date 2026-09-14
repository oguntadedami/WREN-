import React from 'react';

// Illustration 1: Tangled Wren (monochrome ink sketch of wren perched in tangled netting/string)
export const TangledWrenIllustration: React.FC<{ className?: string }> = ({ className = "w-40 h-auto" }) => {
  return (
    <svg 
      viewBox="0 0 400 320" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Soft subtle watercolor wash under bird */}
      <ellipse cx="200" cy="140" rx="90" ry="70" fill="#CBDA46" fillOpacity="0.12" />
      
      {/* Tangled ropes/strings underneath */}
      <path d="M40 120 C90 160 140 180 180 230 C200 255 240 280 280 260 C320 240 370 180 390 110" stroke="#0E1A15" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 240 C100 270 120 210 160 215 C200 220 210 280 250 270 C290 260 330 220 370 230" stroke="#0E1A15" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M80 190 C120 170 130 250 170 240 C210 230 220 180 260 210 C300 240 320 270 350 250" stroke="#0E1A15" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Knot details */}
      <circle cx="120" cy="220" r="5" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.5" />
      <circle cx="165" cy="230" r="6" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.5" />
      <circle cx="240" cy="250" r="5" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.5" />
      <circle cx="280" cy="235" r="4.5" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.5" />

      {/* Wren Bird Body */}
      <ellipse cx="200" cy="130" rx="65" ry="55" transform="rotate(-15 200 130)" stroke="#0E1A15" strokeWidth="2.5" fill="#FAF7F0" />
      
      {/* Head & Beak */}
      <circle cx="150" cy="90" r="32" stroke="#0E1A15" strokeWidth="2.5" fill="#FAF7F0" />
      <path d="M125 85 L90 80 L125 95 Z" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="145" cy="85" r="5.5" fill="#0E1A15" />
      <circle cx="143.5" cy="83.5" r="1.5" fill="#FFFFFF" />

      {/* Cocked Tail Feathers */}
      <path d="M245 110 L290 35 L275 30 L235 95" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

// Illustration 2: Feather Storm (Cloud with gusting wind currents and a quill feather adrift)
export const FeatherStormIllustration: React.FC<{ className?: string }> = ({ className = "w-40 h-auto" }) => {
  return (
    <svg 
      viewBox="0 0 380 260" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Subtle teal/sky wash behind cloud */}
      <ellipse cx="180" cy="80" rx="90" ry="35" fill="#15543D" fillOpacity="0.08" />

      {/* Hatched Storm Cloud */}
      <path d="M80 90 C70 80 75 60 90 55 C95 40 115 30 135 35 C150 20 180 15 205 30 C225 20 255 25 270 45 C290 50 300 70 290 90 C305 105 295 125 275 130 C250 135 100 135 80 115 C70 105 70 95 80 90 Z" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Cross-hatch shading under cloud */}
      <path d="M95 95 L115 120 M110 90 L130 120 M125 85 L145 120 M140 80 L160 120 M155 80 L175 120 M170 80 L190 120 M185 85 L205 120 M200 90 L220 120 M215 95 L235 120 M230 100 L250 120" stroke="#0E1A15" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

      {/* Gusting Wind Lines */}
      <path d="M40 145 C100 135 160 170 230 160 C290 150 340 175 370 190" stroke="#0E1A15" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M70 165 C120 155 180 190 250 180 C300 170 330 195 360 210" stroke="#0E1A15" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M100 185 C150 175 200 210 270 205 C310 200 340 220 365 230" stroke="#0E1A15" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M130 140 C170 135 210 150 250 145" stroke="#0E1A15" strokeWidth="1" strokeDasharray="4 4" />

      {/* Adrift Feather floating in wind */}
      <g transform="translate(195, 140) rotate(32)">
        <ellipse cx="40" cy="10" rx="40" ry="10" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.8" />
        <path d="M-5 10 L85 10" stroke="#0E1A15" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 10 L25 3 M25 10 L35 3 M35 10 L45 3 M45 10 L55 3 M55 10 L65 4" stroke="#0E1A15" strokeWidth="1.1" />
        <path d="M15 10 L25 17 M25 10 L35 17 M35 10 L45 17 M45 10 L55 17 M55 10 L65 16" stroke="#0E1A15" strokeWidth="1.1" />
      </g>
    </svg>
  );
};

// Illustration 3: Nest Weaving (Nest bowl with floating twigs and leaves coming together)
export const NestWeavingIllustration: React.FC<{ className?: string }> = ({ className = "w-40 h-auto" }) => {
  return (
    <svg 
      viewBox="0 0 380 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Soft subtle warm wash inside nest */}
      <ellipse cx="190" cy="150" rx="90" ry="40" fill="#CBDA46" fillOpacity="0.1" />

      {/* Descending floating twigs in the air */}
      <path d="M80 50 L130 35 L150 45" stroke="#0E1A15" strokeWidth="2" strokeLinecap="round" />
      <path d="M190 30 L240 20 L270 40" stroke="#0E1A15" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M290 55 L330 40 L345 60" stroke="#0E1A15" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Floating small leaves */}
      <path d="M140 70 C145 60 160 62 162 72 C158 80 145 80 140 70 Z" fill="#15543D" fillOpacity="0.3" stroke="#0E1A15" strokeWidth="1.2" />
      <path d="M295 75 C305 68 318 72 315 82 C308 90 295 86 295 75 Z" fill="#15543D" fillOpacity="0.3" stroke="#0E1A15" strokeWidth="1.2" />

      {/* The Weaving Nest Body - Rich linework of curved twigs */}
      <ellipse cx="190" cy="150" rx="110" ry="55" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" />
      <ellipse cx="190" cy="140" rx="75" ry="30" fill="#EFEAE1" stroke="#0E1A15" strokeWidth="1.6" />

      {/* Individual interwoven branch strokes */}
      <path d="M70 140 C110 190 270 195 310 140" stroke="#0E1A15" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M85 160 C130 215 250 215 295 160" stroke="#0E1A15" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 175 C140 225 240 225 280 175" stroke="#0E1A15" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M60 130 C120 170 160 140 220 180 C260 160 320 135 330 150" stroke="#0E1A15" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M90 120 C140 160 240 160 290 120" stroke="#0E1A15" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M110 135 C150 170 230 170 270 135" stroke="#0E1A15" strokeWidth="1.4" strokeLinecap="round" />

      {/* Twig tips extending outward organically */}
      <path d="M65 145 L45 155 M75 165 L55 180 M305 150 L335 155 M295 170 L325 185 M120 210 L105 230 M260 210 L275 230" stroke="#0E1A15" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

// Illustration 4: Bird Flight (Small margin doodle of wren ascending in flight)
export const BirdFlightIllustration: React.FC<{ className?: string }> = ({ className = "w-20 h-auto" }) => {
  return (
    <svg 
      viewBox="0 0 240 180" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Wind motion trail streaks */}
      <path d="M20 120 L70 95 M35 140 L85 115 M15 155 L65 130" stroke="#0E1A15" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />

      {/* Body */}
      <ellipse cx="140" cy="95" rx="35" ry="25" transform="rotate(-25 140 95)" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" />
      
      {/* Head & Beak */}
      <circle cx="175" cy="68" r="16" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" />
      <path d="M188 65 L215 67 L188 73 Z" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="175" cy="65" r="3" fill="#0E1A15" />

      {/* Tail */}
      <path d="M105 110 L65 105 L60 115 L100 125 Z" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M75 110 L95 115 M70 113 L90 118" stroke="#0E1A15" strokeWidth="1" />

      {/* Lifted Wings in Full Upward Feather Spread */}
      <path d="M130 75 C135 30 165 10 180 15 C175 35 160 60 150 75" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="1.8" />
      <path d="M125 90 C110 30 140 10 165 20 C180 50 170 90 145 105 Z" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" />
      <path d="M120 40 L145 60 M128 30 L152 55 M140 22 L160 50 M152 18 L168 45" stroke="#0E1A15" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};

// Illustration 5: Nest with Egg (Finished nest safely harboring a speckled egg at the end)
export const NestEggIllustration: React.FC<{ className?: string }> = ({ className = "w-44 h-auto" }) => {
  return (
    <svg 
      viewBox="0 0 360 260" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Soft subtle green/teal watercolor wash */}
      <ellipse cx="180" cy="150" rx="95" ry="45" fill="#15543D" fillOpacity="0.09" />

      {/* Outer Nest Framework */}
      <ellipse cx="180" cy="150" rx="125" ry="65" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2.2" />
      
      {/* Nest Deep Center Bowl */}
      <ellipse cx="180" cy="145" rx="80" ry="38" fill="#EFEAE1" stroke="#0E1A15" strokeWidth="1.8" />

      {/* Inner shadow hatch marks */}
      <path d="M130 145 C150 170 210 170 230 145" stroke="#0E1A15" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Speckled Egg in the Nest */}
      <ellipse cx="180" cy="140" rx="28" ry="34" transform="rotate(12 180 140)" fill="#FAF7F0" stroke="#0E1A15" strokeWidth="2" />
      {/* Egg speckles */}
      <circle cx="175" cy="130" r="1.5" fill="#0E1A15" />
      <circle cx="185" cy="135" r="1.2" fill="#0E1A15" />
      <circle cx="178" cy="145" r="1.8" fill="#0E1A15" />
      <circle cx="188" cy="148" r="1.3" fill="#0E1A15" />
      <circle cx="172" cy="150" r="1.1" fill="#0E1A15" />

      {/* Intertwined Twigs & Leaf Accents */}
      <path d="M60 140 C100 210 260 210 300 140" stroke="#0E1A15" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M75 160 C120 230 240 230 285 160" stroke="#0E1A15" strokeWidth="2" strokeLinecap="round" />
      <path d="M95 180 C135 240 225 240 265 180" stroke="#0E1A15" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M80 130 C130 175 230 175 280 130" stroke="#0E1A15" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Leaves tucked into the twigs */}
      <path d="M90 145 C80 140 75 150 85 155 Z" fill="#15543D" fillOpacity="0.4" stroke="#0E1A15" strokeWidth="1.2" />
      <path d="M270 140 C280 135 285 145 275 150 Z" fill="#15543D" fillOpacity="0.4" stroke="#0E1A15" strokeWidth="1.2" />
      <path d="M150 205 C145 215 155 220 160 210 Z" fill="#15543D" fillOpacity="0.4" stroke="#0E1A15" strokeWidth="1.2" />

      {/* Twig spikes */}
      <path d="M55 145 L35 155 M70 175 L45 190 M305 145 L330 150 M290 175 L315 190" stroke="#0E1A15" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

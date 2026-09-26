import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface PodcastWhereToListenProps {
  onPressPlay?: () => void;
}

// Washi Tape Component with ripped ends matching the brand scrapbook aesthetic
const WashiTape: React.FC<{
  className?: string;
  color?: string;
  angle?: string;
}> = ({
  className = "w-24 sm:w-28 h-5 sm:h-6 -top-3 left-1/2 -translate-x-1/2",
  color = "rgba(203, 218, 70, 0.75)",
  angle = "-rotate-1"
}) => (
  <div
    className={`absolute pointer-events-none z-30 shadow-xs ${angle} ${className}`}
    style={{
      backgroundColor: color,
      clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)',
    }}
  />
);

export const PodcastWhereToListen: React.FC<PodcastWhereToListenProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 0: Spotify, 1: Amazon Music, 2: YouTube
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // The 3 official platforms with organic irregular card styling
  const platforms = [
    {
      id: 'spotify',
      name: 'Spotify',
      url: 'https://open.spotify.com/show/4sH9rhI3WGNiLFxMyAJv53',
      bgColor: '#1DB954',
      cardGradient: 'linear-gradient(155deg, #22e066 0%, #1db954 65%, #159443 100%)',
      shadowColor: 'rgba(29, 185, 84, 0.4)',
      borderRadius: '255px 22px 225px 20px / 20px 225px 22px 255px',
      tapeAngle: 'rotate-2',
      tapePos: '-top-3 right-6 sm:right-8',
      tapeColor: 'rgba(203, 218, 70, 0.8)',
      logo: (
        <svg
          viewBox="0 0 48 48"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-white fill-current filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          <path d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm10.988 34.612c-.432.706-1.352.934-2.056.5-5.64-3.444-12.736-4.224-21.096-2.314-.804.186-1.6-.32-1.786-1.126-.186-.804.32-1.6 1.126-1.786 9.164-2.094 17.026-1.208 23.312 2.628.704.434.932 1.354.5 2.098zm2.928-6.51c-.544.88-1.704 1.16-2.586.616-6.454-3.968-16.296-5.114-23.93-2.796-.992.3-2.05-.266-2.352-1.26-.302-.992.266-2.05 1.26-2.352 8.736-2.652 19.606-1.372 27 3.174.882.544 1.162 1.704.608 2.618zm.252-6.78c-7.74-4.596-20.5-5.02-27.868-2.784-1.188.36-2.452-.314-2.812-1.5-.36-1.19.314-2.454 1.5-2.814 8.476-2.574 22.57-2.076 31.496 3.22 1.07.636 1.416 2.02.78 3.09-.636 1.07-2.02 1.416-3.096.788z" />
        </svg>
      ),
    },
    {
      id: 'amazon',
      name: 'Amazon Music',
      url: 'https://music.amazon.com/podcasts/e9671226-db57-44be-b723-d9246ad7ced6/beyond-content',
      bgColor: '#00A8E1',
      cardGradient: 'linear-gradient(155deg, #00c4fa 0%, #00a8e1 65%, #0081ad 100%)',
      shadowColor: 'rgba(0, 168, 225, 0.4)',
      borderRadius: '225px 25px 250px 18px / 18px 255px 20px 225px',
      tapeAngle: '-rotate-2',
      tapePos: '-top-3 left-6 sm:left-8',
      tapeColor: 'rgba(203, 218, 70, 0.8)',
      logo: (
        <svg
          viewBox="0 0 64 64"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-white fill-current filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          {/* Sound wave equalizer bars */}
          <rect x="18" y="17" width="5" height="18" rx="2.5" fill="currentColor" />
          <rect x="26.5" y="11" width="5" height="24" rx="2.5" fill="currentColor" />
          <rect x="35" y="14" width="5" height="21" rx="2.5" fill="currentColor" />
          <rect x="43.5" y="20" width="5" height="15" rx="2.5" fill="currentColor" />
          {/* Authentic Amazon Smile Arrow */}
          <path
            d="M13.5 44c11.5 7.6 26.2 7 36.8-2.1.8-.7 2 0 1.5 1-9.9 9.3-26.2 10.3-38.5 2-.9-.6-.4-1.7.6-.9l-.4z"
            fill="currentColor"
          />
          <path
            d="M52.8 40.2c-.6-.7-4-.3-6 .1-.6.1-.6-.4-.1-.7 2.8-2 7.1-2 7.8-1.2.8.8.1 5.2-2.5 7.3-.4.4-1.1.1-1-.3.6-1.8 2.3-4.5 1.8-5.2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://www.youtube.com/playlist?list=PLbhodKeul3RpG4QT04vSJcMwqsadszCmI&si=Ct9LzFmTz0_HdNpi',
      bgColor: '#FF0000',
      cardGradient: 'linear-gradient(155deg, #ff3333 0%, #e60000 65%, #b30000 100%)',
      shadowColor: 'rgba(230, 0, 0, 0.4)',
      borderRadius: '240px 18px 230px 24px / 22px 240px 18px 250px',
      tapeAngle: 'rotate-3',
      tapePos: '-top-3 right-8 sm:right-10',
      tapeColor: 'rgba(203, 218, 70, 0.8)',
      logo: (
        <svg
          viewBox="0 0 64 64"
          className="w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          {/* White YouTube pill screen badge */}
          <path
            d="M55.8 22.4c-.6-2.5-2.6-4.5-5.1-5.1C46.2 16 32 16 32 16s-14.2 0-18.7 1.3c-2.5.6-4.5 2.6-5.1 5.1C7 26.9 7 32 7 32s0 5.1 1.2 9.6c.6 2.5 2.6 4.5 5.1 5.1 4.5 1.3 18.7 1.3 18.7 1.3s14.2 0 18.7-1.3c2.5-.6 4.5-2.6 5.1-5.1C57 37.1 57 32 57 32s0-5.1-1.2-9.6z"
            fill="#FFFFFF"
          />
          {/* Red YouTube play triangle */}
          <polygon points="27,39 40,32 27,25" fill="#E60000" />
        </svg>
      ),
    },
  ];

  const total = platforms.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchCurrentX(e.touches[0].clientX);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchCurrentX(e.touches[0].clientX);
    const delta = e.touches[0].clientX - touchStartX;
    if (Math.abs(delta) > 8) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchCurrentX !== null) {
      const delta = touchCurrentX - touchStartX;
      if (delta < -45) {
        handleNext();
      } else if (delta > 45) {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchCurrentX(null);
    setTimeout(() => setIsDragging(false), 120);
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStartX(e.clientX);
    setTouchCurrentX(e.clientX);
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartX === null) return;
    setTouchCurrentX(e.clientX);
    const delta = e.clientX - touchStartX;
    if (Math.abs(delta) > 8) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (touchStartX !== null && touchCurrentX !== null) {
      const delta = touchCurrentX - touchStartX;
      if (delta < -45) {
        handleNext();
      } else if (delta > 45) {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchCurrentX(null);
    setTimeout(() => setIsDragging(false), 120);
  };

  const handleCardClick = (index: number, url: string) => {
    if (isDragging) return;
    if (index === activeIndex) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="podcast-where-to-listen"
      className="py-20 sm:py-28 bg-[#093624] text-[#F7F4E9] notebook-grid-dark relative overflow-hidden select-none border-b border-[#F7F4E9]/15"
      style={{
        backgroundColor: 'var(--color-bottle, #093624)',
      }}
    >
      {/* Ambient soft glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#CBDA46]/20 blur-[160px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow Label */}
        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#D5E3D5] opacity-80 uppercase block mb-3 sm:mb-4">
          WHERE TO LISTEN
        </span>

        {/* Section Headline */}
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#F7F4E9] tracking-tight mb-14 sm:mb-20">
          Listen wherever you press play
        </h2>

        {/* 3D Coverflow Swipable Irregular Cards Carousel */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative h-[420px] sm:h-[480px] md:h-[510px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {platforms.map((platform, index) => {
            // Relative position (-1: left, 0: center, 1: right)
            const diff = (index - activeIndex + total) % total;
            const position = diff === 0 ? 0 : diff === 1 ? 1 : -1;

            const isCenter = position === 0;
            const isLeft = position === -1;

            return (
              <div
                key={platform.id}
                onClick={() => handleCardClick(index, platform.url)}
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] select-none cursor-pointer group ${
                  isCenter
                    ? 'z-30 w-[210px] h-[340px] sm:w-[260px] sm:h-[410px] md:w-[290px] md:h-[450px] scale-100 opacity-100 translate-x-0'
                    : isLeft
                    ? 'z-10 w-[170px] h-[280px] sm:w-[210px] sm:h-[340px] md:w-[230px] md:h-[370px] scale-[0.88] opacity-75 sm:opacity-85 -translate-x-[110px] sm:-translate-x-[190px] md:-translate-x-[250px] hover:opacity-100'
                    : 'z-10 w-[170px] h-[280px] sm:w-[210px] sm:h-[340px] md:w-[230px] md:h-[370px] scale-[0.88] opacity-75 sm:opacity-85 translate-x-[110px] sm:translate-x-[190px] md:translate-x-[250px] hover:opacity-100'
                }`}
              >
                {/* Hand-Drawn Offset Paper Shadow Layer */}
                <div
                  className="absolute inset-0 translate-x-2 translate-y-3 sm:translate-x-3 sm:translate-y-4 bg-[#05281A]/60 transition-transform duration-300 pointer-events-none"
                  style={{
                    borderRadius: platform.borderRadius,
                  }}
                />

                {/* Main Irregular Card Body */}
                <div
                  style={{
                    background: platform.cardGradient,
                    borderRadius: platform.borderRadius,
                    boxShadow: isCenter
                      ? `0 20px 40px ${platform.shadowColor}, inset 0 2px 4px rgba(255,255,255,0.3)`
                      : '0 10px 25px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
                  }}
                  className="relative z-20 w-full h-full flex items-center justify-center border-2 sm:border-[2.5px] border-[#093624] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                >
                  {/* Subtle top specular sheen */}
                  <div
                    className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
                    style={{ borderRadius: platform.borderRadius }}
                  />

                  {/* Centered Platform Logo (pure logo, zero text) */}
                  <div
                    className={`relative z-10 transform transition-transform duration-300 ${
                      isCenter ? 'scale-100 group-hover:scale-110' : 'scale-90'
                    }`}
                  >
                    {platform.logo}
                  </div>

                  {/* Hover Hint on Active Card */}
                  {isCenter && (
                    <div className="absolute bottom-4 sm:bottom-5 px-3 py-1 rounded-full bg-black/25 text-white/95 text-[10px] sm:text-xs font-mono font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-xs">
                      <span>Open</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls & Indicators */}
        <div className="mt-8 flex flex-col items-center gap-4">
          
          {/* Chevrons & Pagination */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous platform"
              className="w-10 h-10 rounded-full bg-[#F7F4E9]/10 hover:bg-[#F7F4E9]/20 border border-[#F7F4E9]/25 text-[#F7F4E9] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {platforms.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to ${p.name}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-7 bg-[#CBDA46]'
                      : 'w-2 bg-[#F7F4E9]/30 hover:bg-[#F7F4E9]/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next platform"
              className="w-10 h-10 rounded-full bg-[#F7F4E9]/10 hover:bg-[#F7F4E9]/20 border border-[#F7F4E9]/25 text-[#F7F4E9] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* User Hint */}
          <p className="text-xs font-mono text-[#D5E3D5]/70 tracking-wide">
            Swipe or click to browse • Tap card to open
          </p>

        </div>

      </div>
    </section>
  );
};

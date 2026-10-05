import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import { FeatherStormIllustration } from '../assets/illustrations/FeatherStormIllustration';
import { CuriousWrenPet } from './CuriousWrenPet';

interface NotFoundPageProps {
  onNavigate?: (page: any, sectionId?: string) => void;
  onOpenBooking?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | Element | string, options?: { offset?: number; duration?: number; immediate?: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      try {
        window.history.pushState({}, '', '/');
        window.location.hash = '';
      } catch {}
      window.location.href = '/';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#FAF7EE] text-[#0E1A15] relative selection:bg-[#CBDA46] selection:text-[#093624] font-sans pt-20 sm:pt-24 pb-14 sm:pb-20 px-3 sm:px-6 lg:px-10 notebook-grid flex flex-col justify-center items-center">
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9, 54, 36, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9, 54, 36, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative w-full max-w-[96%] sm:max-w-[94%] xl:max-w-[1240px] mx-auto z-10 flex-1 flex flex-col justify-center my-4 sm:my-6">
        
        <div className="relative group w-full">
          
          <div 
            className="absolute inset-0 translate-x-3 translate-y-3.5 sm:translate-x-4 sm:translate-y-5 bg-[#093624] border-2 border-[#093624] pointer-events-none rounded-3xl"
            style={{
              borderRadius: '24px',
            }}
          />

          <div 
            className="relative z-10 bg-white border-2 border-[#093624] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center shadow-xs overflow-visible w-full min-h-[560px] sm:min-h-[640px] md:min-h-[680px] flex flex-col items-center justify-center"
            style={{
              borderRadius: '24px',
            }}
          >
            <div 
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-18 h-18 sm:w-22 sm:h-22 rotate-6 select-none pointer-events-none flex items-center justify-center"
              aria-label="Route lost stamp badge"
            >
              <svg 
                viewBox="0 0 88 88" 
                className="w-full h-full overflow-visible" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle 
                  cx="44" 
                  cy="44" 
                  r="38" 
                  stroke="#093624" 
                  strokeWidth="2.2" 
                  strokeDasharray="5 4.5" 
                  strokeLinecap="round"
                  fill="none" 
                />
                <text 
                  x="44" 
                  y="40" 
                  textAnchor="middle" 
                  fontFamily="'JetBrains Mono', ui-monospace, monospace" 
                  fontSize="11" 
                  fontWeight="800" 
                  letterSpacing="0.22em" 
                  fill="#093624"
                >
                  ROUTE
                </text>
                <text 
                  x="44" 
                  y="56" 
                  textAnchor="middle" 
                  fontFamily="'JetBrains Mono', ui-monospace, monospace" 
                  fontSize="11" 
                  fontWeight="800" 
                  letterSpacing="0.22em" 
                  fill="#093624"
                >
                  LOST
                </text>
              </svg>
            </div>

            <div className="relative inline-flex items-center justify-center mx-auto mt-2 sm:mt-4 mb-6 sm:mb-8">
              <svg 
                viewBox="0 0 100 80" 
                className="absolute -left-12 sm:-left-16 bottom-5 sm:bottom-7 w-14 sm:w-18 h-auto pointer-events-none select-none overflow-visible" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 24 L56 14" stroke="#093624" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M4 46 L86 28" stroke="#093624" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M16 68 L70 52" stroke="#093624" strokeWidth="2.2" strokeLinecap="round" />
              </svg>

              <FeatherStormIllustration className="w-44 sm:w-56 md:w-64 h-auto select-none pointer-events-none drop-shadow-xs" />
            </div>

            <h1 className="font-display font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#093624] tracking-tight leading-tight mb-2 sm:mb-3">
              <span className="relative inline-block px-1">
                <span className="relative z-10">Damn it!</span>
                <svg
                  viewBox="0 0 250 20"
                  className="absolute left-0 right-0 -bottom-1.5 sm:-bottom-2 w-full h-4 sm:h-5 pointer-events-none -z-0 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 2 8 C 35 6, 75 7.5, 125 7 C 175 6.5, 215 7.5, 246 8.5 C 242 15, 205 16.5, 125 15.5 C 55 16, 20 15, 2 13 Z"
                    fill="#CBDA46"
                    opacity="0.95"
                  />
                  <path d="M 0 9.5 L 18 9" stroke="#CBDA46" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                  <path d="M 230 7.5 L 249 7.5" stroke="#CBDA46" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                  <path d="M 226 12 L 247 13" stroke="#CBDA46" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                  <path d="M 4 5.5 L 38 6.5" stroke="#CBDA46" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
                  <path d="M 185 15.5 L 238 15" stroke="#CBDA46" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
                </svg>
              </span>
            </h1>

            <p 
              className="font-hand text-xl sm:text-2xl md:text-3xl text-[#093624] font-normal leading-relaxed mt-2 sm:mt-3" 
              style={{ fontFamily: "'HandwrittenAccent', cursive" }}
            >
              That flew right off the map.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-[#54605a] max-w-lg mx-auto mt-3 sm:mt-4 leading-relaxed font-sans font-normal">
              The page you&apos;re searching for may have flown the nest, changed, or doesn&apos;t exist.
            </p>

            <div className="mt-8 sm:mt-12 flex justify-center">
              <div ref={ctaRef} className="relative inline-flex">
                <Button
                  variant="primary"
                  size="md"
                  showSparkles={false}
                  onClick={handleGoHome}
                  className="!px-8 sm:!px-10 !py-3.5 sm:!py-4 font-bold text-sm sm:text-base tracking-tight shadow-sm cursor-pointer"
                >
                  Go back home
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>

      <CuriousWrenPet ctaRef={ctaRef} />

    </div>
  );
};

export default NotFoundPage;

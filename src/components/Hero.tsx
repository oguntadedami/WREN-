import React, { useState } from 'react';
import { MetalClip, WoodenPin } from './ScrapbookAssets';
import { 
  LogoCarril, 
  LogoColorteam, 
  LogoMischiefMakers, 
  LogoSeamailer, 
  LogoTheToolBus 
} from './ClientLogos';
import { AnimatedWrenBird } from './AnimatedWrenBird';

interface HeroProps {
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [isLogoDrawerHovered, setIsLogoDrawerHovered] = useState(false);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);

  const scrollToSystems = () => {
    const el = document.getElementById('systems-section');
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -30, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const logos = [
    { id: 'carril', name: 'carril.', component: <LogoCarril className="h-5 sm:h-6 max-h-7 w-auto" /> },
    { id: 'colorteam', name: 'colorteam', component: <LogoColorteam className="h-5 sm:h-6 max-h-7 w-auto" /> },
    { id: 'mischief-makers', name: 'MISCHIEF MAKERS', component: <LogoMischiefMakers className="h-4 sm:h-5 max-h-6 w-auto" /> },
    { id: 'seamailer', name: 'Seamailer', component: <LogoSeamailer className="h-5.5 sm:h-6.5 max-h-7 w-auto" /> },
    { id: 'the-tool-bus', name: 'THE TOOL BUS', component: <LogoTheToolBus className="h-5.5 sm:h-6.5 max-h-7 w-auto" /> },
  ];

  return (
    <section 
      id="hero-section"
      className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 notebook-grid-bg border-b border-[#093624]/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h1 className="hero-enter-headline font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#093624] tracking-tight leading-[1.15] sm:leading-[1.12] max-w-4xl mx-auto">
          The Founder-Led GTM <br className="hidden sm:inline" />
          Engine for{' '}
          <span className="relative inline-block px-1.5 mx-1 font-black">
            B2B
            <svg
              viewBox="0 0 100 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-3 sm:h-4 pointer-events-none overflow-visible"
            >
              <path
                d="M 2 9 C 25 4, 65 13, 98 6 C 75 11, 35 12, 5 14"
                stroke="#CBDA46"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />
            </svg>
          </span>{' '}
          SaaS
        </h1>

        <p className="hero-enter-subhead mt-7 sm:mt-8 text-lg sm:text-xl md:text-[1.35rem] text-[#093624] max-w-3xl mx-auto font-normal leading-relaxed">
          We turn your expertise and presence into a repeatable GTM system that generates consistent demand and revenue, without making you the bottleneck.
        </p>

        <div className="hero-enter-cards mt-16 sm:mt-24 relative w-full pt-12 pb-6">
          
          <AnimatedWrenBird />

          <div className="absolute top-[4.25rem] sm:top-[4.25rem] left-0 right-0 h-[2px] border-t-2 border-dashed border-[#0E1A15]/70 z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 sm:gap-6 lg:gap-5 px-2">
            
            <div 
              id="clothesline-item-1"
              className="relative w-44 sm:w-48 p-4 bg-[#CBDA46] text-[#093624] rounded-sm shadow-md transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 cursor-default animate-sway-1 rotate-[-3deg]"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <MetalClip className="w-4 h-9 drop-shadow-sm" />
              </div>
              <p className="font-sans font-semibold text-sm sm:text-base leading-snug text-center pt-2">
                You have a great product. Now let’s make people care.
              </p>
            </div>

            <div 
              id="clothesline-item-2"
              className="relative w-48 sm:w-52 p-4 bg-[#FEE2C5] text-[#093624] border border-[#D97706]/30 rounded-sm shadow-md transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 cursor-default animate-sway-2 rotate-[3.5deg]"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <MetalClip className="w-4 h-9 drop-shadow-sm" />
              </div>
              <div className="absolute -top-2.5 -right-2 w-12 h-5 bg-[#BAE6FD]/90 border border-[#38BDF8]/40 rotate-12 shadow-xs" />
              <p className="font-sans font-semibold text-sm sm:text-base leading-snug text-center py-2">
                No more “5 lessons I learned...”
              </p>
            </div>

            <div 
              id="clothesline-item-3"
              className="relative group w-44 sm:w-48 py-5 px-2 transition-all duration-300 hover:scale-105 hover:rotate-0 z-20 cursor-pointer animate-sway-3 rotate-[-1.5deg]"
              onMouseEnter={() => setIsLogoDrawerHovered(true)}
              onMouseLeave={() => setIsLogoDrawerHovered(false)}
              onClick={() => setIsLogoDrawerHovered(prev => !prev)}
            >
              <div className="absolute inset-0 bg-[#F5EEDC] border border-[#093624]/15 rounded-sm rotate-6 shadow-sm pointer-events-none transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-[#E8EFE9] border border-[#093624]/15 rounded-sm -rotate-4 shadow-sm pointer-events-none transition-transform group-hover:-rotate-8" />
              
              <div className="relative bg-white border border-[#093624]/25 rounded-sm p-3.5 text-center shadow-md transition-shadow group-hover:shadow-lg">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <WoodenPin className="w-4 h-9 drop-shadow-sm" />
                </div>

                <div className="w-full h-10 mx-auto rounded bg-[#F7F9F5] border border-[#093624]/10 flex items-center justify-center px-2">
                  <LogoSeamailer className="h-6 max-h-7 w-auto max-w-[90%]" />
                </div>

                <div className="mt-2 flex items-center justify-center gap-1 text-[0.68rem] font-bold text-[#093624] tracking-wide uppercase">
                  <span>Trusted By</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CBDA46] inline-block animate-pulse" />
                </div>
                <div className="text-[0.62rem] text-[#6F7A6E] font-medium">
                  Hover to explore
                </div>
              </div>

              <div 
                id="client-logos-drawer"
                className={`absolute top-[115%] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out origin-top ${
                  isLogoDrawerHovered 
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
                    : 'opacity-0 -translate-y-3 pointer-events-none scale-95'
                }`}
                style={{ width: 'max-content', maxWidth: '92vw' }}
              >
                <div className="relative bg-[#FAF8F5] border-2 border-[#093624] rounded-lg p-3 sm:p-4 shadow-2xl shadow-[#093624]/25 backdrop-blur-md">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FAF8F5] border-t-2 border-l-2 border-[#093624] rotate-45" />

                  <div className="flex items-center justify-start gap-2 mb-2.5 pb-1.5 border-b border-[#093624]/10 px-1">
                    <span className="w-2 h-2 rounded-full bg-[#093624]" />
                    <span className="text-[0.68rem] font-bold tracking-wider uppercase text-[#093624]">
                      Trusted by leading businesses
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto py-1 px-1">
                    {logos.map((logo) => (
                      <div
                        key={logo.id}
                        className="flex items-center justify-center bg-white border border-[#093624]/15 hover:border-[#093624] px-3.5 py-2.5 rounded-md shadow-xs transition-all duration-200 hover:scale-105 hover:shadow-md min-w-[100px] sm:min-w-[115px] h-12"
                      >
                        {logo.component}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div 
              id="clothesline-item-4"
              className="relative w-44 sm:w-48 p-4 bg-[#EEF2CC] text-[#093624] border border-[#CBDA46]/40 rounded-sm shadow-md transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 cursor-default animate-sway-4 rotate-[2.5deg]"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <MetalClip className="w-4 h-9 drop-shadow-sm" />
              </div>
              <p className="font-sans font-semibold text-sm sm:text-base leading-snug text-center pt-2">
                You close. We do the rest.
              </p>
            </div>

            <div 
              id="clothesline-item-5"
              className="relative w-44 sm:w-48 p-4 bg-[#BAE6FD] text-[#093624] rounded-sm shadow-md transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 cursor-default animate-sway-5 rotate-[-3.5deg]"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <MetalClip className="w-4 h-9 drop-shadow-sm" />
              </div>
              <div className="absolute -top-2.5 left-4 w-12 h-4 bg-[#FEF08A]/90 border border-[#FACC15]/50 -rotate-6 shadow-xs" />
              <p className="font-sans font-semibold text-sm sm:text-base leading-snug text-center pt-2">
                Another content calendar? Absolutely not.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

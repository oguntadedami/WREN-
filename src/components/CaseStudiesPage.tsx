import React, { useEffect } from 'react';
import { getCaseStudies, CaseStudy } from '../data/caseStudiesData';
import { Button } from './Button';
import {
  LogoCarril,
  LogoMischiefMakers,
  LogoSeamailer,
  LogoTheToolBus,
} from './ClientLogos';

interface CaseStudiesPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (
    page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail',
    sectionId?: string
  ) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  const caseStudies: CaseStudy[] = getCaseStudies();

  // Scroll to top or target hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1 && hash !== '#case-studies') {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number; immediate?: boolean }) => void } }).lenis;
          if (lenis) {
            lenis.scrollTo(el, { offset: -90, duration: 1.1 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 150);
        return;
      }
    }

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | Element | string, options?: { offset?: number; duration?: number; immediate?: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const renderBrandLogo = (caseStudy: CaseStudy) => {
    switch (caseStudy.slug) {
      case 'mischief-makers':
        return (
          <LogoMischiefMakers
            className="h-7 sm:h-8 md:h-9 w-auto max-w-[190px] max-h-10 object-contain"
          />
        );
      case 'carril':
        return (
          <LogoCarril
            className="h-7 sm:h-8 md:h-9 w-auto max-w-[150px] max-h-10 object-contain"
          />
        );
      case 'seamailer':
        return (
          <LogoSeamailer
            className="h-7 sm:h-8 md:h-9 w-auto max-w-[180px] max-h-10 object-contain"
          />
        );
      case 'toolbus-ai':
      case 'the-tool-bus':
        return (
          <LogoTheToolBus
            className="h-7 sm:h-8 md:h-9 w-auto max-w-[180px] max-h-10 object-contain"
          />
        );
      default:
        return (
          <span className="font-display font-serif font-bold text-2xl text-[#093624]">
            {caseStudy.companyName}
          </span>
        );
    }
  };

  const washiTapeStyles = [
    { color: 'rgba(245, 166, 33, 0.88)', rotation: 'rotate-2' },   // Warm Amber
    { color: 'rgba(203, 218, 70, 0.88)', rotation: '-rotate-2' },  // Wattle Lime
    { color: 'rgba(255, 122, 92, 0.88)', rotation: 'rotate-1.5' },  // Coral Pop
    { color: 'rgba(56, 189, 248, 0.88)', rotation: '-rotate-1.5' }, // Sky Blue
  ];

  return (
    <div className="min-h-screen bg-[#F7F4E9] notebook-grid-bg text-[#0E1A15]">
      {/* ========================================================================= */}
      {/* HEADER SECTION                                                            */}
      {/* ========================================================================= */}
      <section id="case-studies-header" className="pt-32 sm:pt-40 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline: bold IBM Plex Serif, Bottle green - single line on desktop, breaks naturally on mobile */}
          <h1 className="font-display font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] text-[#093624] tracking-tight leading-[1.18] mb-5 text-center whitespace-normal lg:whitespace-nowrap mx-auto">
            A look at some of our work so far
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#2C3830]/80 font-sans leading-relaxed">
            Real clients, real results. See what we worked on, what changed, and what came out of it.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SUMMARY CARD GRID (Call getCaseStudies(), 1 card per entry)                 */}
      {/* ========================================================================= */}
      <section id="case-studies-grid-section" className="pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {caseStudies.map((item, idx) => {
              const tape = washiTapeStyles[idx % washiTapeStyles.length];
              const headlineStat = item.topStats && item.topStats.length > 0 ? item.topStats[0] : null;

              return (
                <article
                  key={item.slug}
                  id={`case-study-${item.slug}`}
                  className="group relative transition-all duration-300 flex flex-col h-full"
                >
                  {/* Corner Washi Tape Top Right in distinct brand colors */}
                  <div
                    className={`absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs ${tape.rotation} w-24 h-5.5 -top-2.5 right-6`}
                    style={{
                      backgroundColor: tape.color,
                      clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                    }}
                  />

                  {/* Hand-Drawn Offset Shadow */}
                  <div
                    className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[0.5deg] pointer-events-none"
                    style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                  />

                  {/* Main Note Card: Entire Card Links to /case-studies/{slug} */}
                  <a
                    href={`/case-studies/${item.slug}`}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('case-study-detail', item.slug);
                      }
                    }}
                    aria-label={`Read case study for ${item.companyName}`}
                    className="relative z-10 p-7 sm:p-9 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#093624] focus:ring-offset-2 select-none"
                    style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
                  >
                    <div>
                      {/* Top Bar: Brand Logo or Name */}
                      <div className="flex items-center min-h-[44px] mb-6">
                        <div className="h-10 sm:h-12 flex items-center">
                          {renderBrandLogo(item)}
                        </div>
                      </div>

                      {/* Headline Stat: first topStat as the card's headline stat */}
                      {headlineStat && (
                        <div className="mb-5 pb-5 border-b border-[#093624]/10">
                          <div className="font-display font-serif font-bold text-5xl sm:text-6xl text-[#093624] tracking-tight leading-none mb-2">
                            {headlineStat.value}
                          </div>
                          <div className="font-sans font-semibold text-sm sm:text-base text-[#093624]/85 leading-snug">
                            {headlineStat.label}
                          </div>
                        </div>
                      )}

                      {/* Card description: summary */}
                      <p className="text-sm sm:text-[0.97rem] font-sans text-[#2C3830] leading-relaxed mb-6">
                        {item.summary}
                      </p>
                    </div>

                    {/* "Read the case study →" visual CTA indicator */}
                    <div className="pt-4 border-t border-[#093624]/12 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-sm sm:text-base text-[#093624] group-hover:text-[#186043] transition-colors">
                        <span>Read the case study</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                      </span>
                      <span className="text-xs font-mono text-[#093624]/50 uppercase tracking-widest font-semibold">
                        {item.companyName}
                      </span>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CLOSING CTA (dark section)                                                */}
      {/* ========================================================================= */}
      <section
        id="case-studies-cta"
        className="bg-[#093624] text-[#F7F4E9] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden"
      >
        {/* Visible Notebook Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(203, 218, 70, 0.14) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203, 218, 70, 0.14) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F7F4E9] tracking-tight leading-[1.14] mb-5">
            Want to see what this could<br className="hidden sm:inline" /> look like for you?
          </h2>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-[#F7F4E9]/80 font-sans leading-relaxed mb-9">
            <span>Tell us what you&apos;re building and where you need help.</span>
            <span className="block mt-0.5">We&apos;ll take it from there.</span>
          </p>

          <div className="inline-block">
            <Button
              variant="secondary"
              size="lg"
              onClick={onOpenBooking}
              className="font-bold text-base sm:text-lg px-8 sm:px-10 shadow-md"
            >
              Book a call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

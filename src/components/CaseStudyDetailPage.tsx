import React, { useEffect } from 'react';
import { Button } from './Button';
import { Highlight } from './ScrapbookAssets';
import {
  LogoCarril,
  LogoMischiefMakers,
  LogoSeamailer,
  LogoTheToolBus,
} from './ClientLogos';
import { getCaseStudyBySlug, CaseStudy } from '../data/caseStudiesData';

interface CaseStudyDetailPageProps {
  slug: string;
  onOpenBooking?: () => void;
  onNavigate?: (
    page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail',
    sectionId?: string
  ) => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({
  slug,
  onOpenBooking,
  onNavigate,
}) => {
  // Call getCaseStudyBySlug() with the URL's slug param
  const data: CaseStudy | undefined = getCaseStudyBySlug(slug);

  // Scroll to top or target hash on mount and when slug changes
  useEffect(() => {
    if (!data) return;
    const hash = window.location.hash;
    if (hash && hash.length > 1 && hash !== `#${slug}` && hash !== `#case-study-${slug}`) {
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
  }, [slug, data]);

  // If no match is found, render a "Case study not found" state with a link back to /case-studies
  if (!data) {
    return (
      <div className="min-h-screen bg-[#F7F4E9] notebook-grid-bg text-[#0E1A15] pt-36 sm:pt-44 pb-24 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto p-8 sm:p-12 bg-white/95 border-2 border-[#093624] rounded-2xl shadow-[6px_6px_0px_#093624]">
          <div className="font-mono text-xs uppercase tracking-widest text-[#093624]/60 mb-3 font-bold">
            CASE STUDY · NOT FOUND
          </div>
          <h1 className="font-display font-serif font-bold text-3xl sm:text-4xl text-[#093624] mb-4">
            Case study not found
          </h1>
          <p className="font-sans text-base text-[#2C3830] mb-8 leading-relaxed">
            The case study you are looking for doesn&apos;t exist or is no longer available.
          </p>
          <Button
            variant="primary"
            onClick={() => (onNavigate ? onNavigate('case-studies') : (window.location.href = '/case-studies'))}
            className="font-bold text-base px-6 py-3"
          >
            ← Back to all case studies
          </Button>
        </div>
      </div>
    );
  }

  // Helper to render headline text with highlightWord using the authentic scrapbook Highlight component
  const renderWithHighlight = (text: string, highlightWord?: string, isDark: boolean = false) => {
    if (!highlightWord || !highlightWord.trim()) return text;
    const escaped = highlightWord.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return (
      <>
        {parts.map((part, idx) => {
          if (part.toLowerCase() === highlightWord.toLowerCase()) {
            return (
              <Highlight
                key={idx}
                color="wattle"
                rotation="none"
                className={`text-[#093624] font-bold ${isDark ? 'drop-shadow-xs' : ''}`}
              >
                {part}
              </Highlight>
            );
          }
          return part;
        })}
      </>
    );
  };

  // Helper to render trackRecord.body (detecting "- " bullet lines after blank line)
  const renderTrackRecordBody = (body: string) => {
    const blocks = body.split(/\n\s*\n/);
    return (
      <div className="space-y-4 font-sans text-base sm:text-lg text-[#2C3830] leading-relaxed">
        {blocks.map((block, bIdx) => {
          const lines = block.trim().split('\n');
          const isBulletBlock = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));
          if (isBulletBlock) {
            return (
              <ul key={bIdx} className="space-y-2.5 list-disc list-outside pl-5 marker:text-[#093624]">
                {lines.map((line, lIdx) => (
                  <li key={lIdx} className="pl-1">
                    {line.replace(/^[-*]\s+/, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={bIdx}>{block}</p>;
        })}
      </div>
    );
  };

  const renderBrandLogo = () => {
    switch (data.slug) {
      case 'mischief-makers':
        return <LogoMischiefMakers className="h-5 sm:h-6 w-auto max-w-[160px] object-contain opacity-90" />;
      case 'carril':
        return <LogoCarril className="h-5 sm:h-6 w-auto max-w-[120px] object-contain opacity-90" />;
      case 'seamailer':
        return <LogoSeamailer className="h-5 sm:h-6 w-auto max-w-[150px] object-contain opacity-90" />;
      case 'toolbus-ai':
      case 'the-tool-bus':
        return <LogoTheToolBus className="h-5 sm:h-6 w-auto max-w-[150px] object-contain opacity-90" />;
      default:
        return null;
    }
  };

  const washiTapeStyles = [
    { color: 'rgba(245, 166, 33, 0.88)', rotation: 'rotate-2' },   // Warm Amber
    { color: 'rgba(203, 218, 70, 0.88)', rotation: '-rotate-2' },  // Wattle Lime
    { color: 'rgba(255, 122, 92, 0.88)', rotation: 'rotate-1.5' },  // Coral Pop
    { color: 'rgba(56, 189, 248, 0.88)', rotation: '-rotate-1.5' }, // Sky Blue
  ];

  // Results 2-row logic
  const hasRow2Divider = Boolean(data.results.row2DividerText && data.results.row2DividerText.trim().length > 0);
  const row1Stats = hasRow2Divider ? data.results.stats.slice(0, 4) : data.results.stats;
  const row2Stats = hasRow2Divider ? data.results.stats.slice(4) : [];

  return (
    <div className="min-h-screen bg-[#F7F4E9] notebook-grid-bg text-[#0E1A15]">
      {/* ========================================================================= */}
      {/* HEADER SECTION                                                            */}
      {/* ========================================================================= */}
      <section id="case-study-hero" className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top navigation row: "← All case studies" */}
          <div className="flex items-center justify-between gap-4 mb-8 max-w-3xl mx-auto flex-wrap">
            <a
              href="/case-studies"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('case-studies');
                }
              }}
              className="inline-flex items-center gap-1.5 font-sans font-semibold text-sm sm:text-base text-[#093624] hover:text-[#186043] transition-colors focus:outline-none"
            >
              <span>← All case studies</span>
            </a>

            {/* Optional client logo representation */}
            <div className="h-6 flex items-center">
              {renderBrandLogo()}
            </div>
          </div>

          {/* Headline text with highlightWord rendered inside a solid Wattle highlight box */}
          <h1 className="font-display font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.15] mb-6">
            {renderWithHighlight(data.headline, data.highlightWord, false)}
          </h1>

          {/* Subheading below */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#2C3830]/85 max-w-3xl mx-auto leading-relaxed mb-8">
            {data.subheading}
          </p>

          {/* Book a call CTA */}
          <div className="flex items-center justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenBooking}
              className="font-bold text-base px-8 py-3.5 shadow-md w-full sm:w-auto"
            >
              Book a call
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TOP STATS ROW (always exactly 3)                                          */}
      {/* ========================================================================= */}
      <section id="top-stats-row" className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {data.topStats.map((stat, idx) => {
              const tape = washiTapeStyles[idx % washiTapeStyles.length];
              return (
                <div
                  key={idx}
                  className="relative group transition-transform duration-200 flex flex-col h-full"
                >
                  {/* Washi Tape */}
                  <div
                    className={`absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs ${tape.rotation} w-20 h-5 -top-2.5 right-6`}
                    style={{
                      backgroundColor: tape.color,
                      clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                    }}
                  />
                  {/* Offset Shadow */}
                  <div
                    className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 rounded-xl pointer-events-none"
                    style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                  />
                  {/* Card Content */}
                  <div
                    className="relative z-10 p-6 sm:p-7 bg-white/95 border-2 border-[#093624] flex flex-col justify-between h-full"
                    style={{ borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px' }}
                  >
                    <div className="font-display font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-none mb-3">
                      {stat.value}
                    </div>
                    <div className="font-sans font-medium text-sm sm:text-base text-[#2C3830] leading-snug">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK FACTS BAR (4-column card)                                           */}
      {/* ========================================================================= */}
      <section id="quick-facts-bar" className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="p-6 sm:p-8 bg-white/95 border-2 border-[#093624] shadow-[4px_4px_0px_#093624]"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#093624]/10">
              {data.quickFacts.map((fact, idx) => (
                <div key={idx} className={`${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#093624]/60 mb-1.5">
                    {fact.label}
                  </div>
                  <div className="font-sans font-semibold text-sm sm:text-base text-[#093624] leading-snug">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE CHALLENGE (Cream background)                                          */}
      {/* ========================================================================= */}
      <section id="challenge-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F4E9] border-t border-[#093624]/10">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#093624]/70 mb-3">
            THE CHALLENGE
          </div>
          <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#093624] tracking-tight leading-tight mb-8">
            {data.challenge.headline}
          </h2>
          <div className="space-y-5 text-base sm:text-lg font-sans text-[#2C3830] leading-relaxed">
            {data.challenge.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE SYSTEM BUILT (Pale Wattle background)                                  */}
      {/* ========================================================================= */}
      <section
        id="system-built"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7D6] border-t border-b border-[#093624]/10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#093624]/70 mb-3">
            THE SYSTEM BUILT
          </div>
          <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#093624] tracking-tight leading-tight mb-4">
            {data.systemBuilt.headline}
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#2C3830] leading-relaxed mb-12">
            {data.systemBuilt.intro}
          </p>

          {/* Steps */}
          <div className="space-y-8">
            {data.systemBuilt.steps.map((step, idx) => {
              const hasImage = Boolean(step.image);
              return (
                <div key={idx}>
                  <div className={`grid ${hasImage ? 'grid-cols-1 md:grid-cols-2 gap-8 items-center' : 'grid-cols-1'} gap-6`}>
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Large bold number */}
                      <span className="font-display font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#093624]/35 shrink-0 leading-none">
                        {step.number}
                      </span>
                      <div>
                        {/* Bold title */}
                        <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#093624] mb-2 leading-snug">
                          {step.title}
                        </h3>
                        {/* Body paragraph */}
                        <p className="font-sans text-base text-[#2C3830] leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>

                    {/* Image alongside step's text if present */}
                    {hasImage && step.image && (
                      <div className="rounded-xl overflow-hidden border-2 border-[#093624] shadow-md bg-white">
                        <img
                          src={step.image}
                          alt={step.imageAlt || step.title}
                          className="w-full h-auto object-cover max-h-72"
                        />
                      </div>
                    )}
                  </div>

                  {/* Thin divider between steps */}
                  {idx < data.systemBuilt.steps.length - 1 && (
                    <div className="border-t border-[#093624]/15 my-8" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE RESULTS (Bottle green background, Cream text)                          */}
      {/* ========================================================================= */}
      <section id="results-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#093624] text-[#F7F4E9] relative overflow-hidden">
        {/* Notebook grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(203, 218, 70, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203, 218, 70, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E2FD52] mb-3">
              THE RESULTS
            </div>
            <h2 className="font-display font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F4E9] tracking-tight leading-tight">
              {data.results.headline}
            </h2>
          </div>

          {/* Stats Card Grid */}
          {hasRow2Divider ? (
            <div className="space-y-6">
              {/* Row 1: First 4 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {row1Stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 bg-[#062418] border border-[#E2FD52]/20 rounded-xl text-center flex flex-col justify-between"
                  >
                    <div className="font-display font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#E2FD52] mb-2 leading-none">
                      {stat.value}
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-[#F7F4E9]/85 font-medium leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Short italic divider line */}
              <div className="py-4 text-center">
                <span className="italic font-serif text-sm sm:text-base text-[#E2FD52] border-t border-b border-[#F7F4E9]/20 px-6 py-2 inline-block">
                  {data.results.row2DividerText}
                </span>
              </div>

              {/* Row 2: Remaining stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {row2Stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 bg-[#062418] border border-[#E2FD52]/20 rounded-xl text-center flex flex-col justify-between"
                  >
                    <div className="font-display font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#E2FD52] mb-2 leading-none">
                      {stat.value}
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-[#F7F4E9]/85 font-medium leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Single row / standard grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.results.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-[#062418] border border-[#E2FD52]/20 rounded-xl text-center flex flex-col justify-between"
                >
                  <div className="font-display font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#E2FD52] mb-2 leading-none">
                    {stat.value}
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#F7F4E9]/85 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* KEY INSIGHT (Cream background)                                            */}
      {/* ========================================================================= */}
      <section id="key-insight-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F4E9]">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative p-8 sm:p-12 bg-white/95 border-2 border-[#093624] shadow-[6px_6px_0px_#093624]"
            style={{ borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px' }}
          >
            {/* Washi tape on insight note */}
            <div
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-1 w-24 h-5.5 -top-2.5 right-10"
              style={{
                backgroundColor: 'rgba(203, 218, 70, 0.9)',
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#093624]/60 mb-3">
              KEY INSIGHT
            </div>
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight leading-snug mb-4">
              {data.keyInsight.headline}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#2C3830] leading-relaxed">
              {data.keyInsight.body}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SYSTEMS BEHIND IT (Pale Wattle background) — only render if non-empty       */}
      {/* ========================================================================= */}
      {data.systemsUsed && data.systemsUsed.length > 0 && (
        <section id="systems-behind-it" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7D6] border-t border-b border-[#093624]/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#093624]/70 mb-2">
                SYSTEMS BEHIND IT
              </div>
              <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#093624]">
                The Systems Behind the Result
              </h2>
            </div>

            <div
              className={`grid grid-cols-1 ${
                data.systemsUsed.length === 2
                  ? 'md:grid-cols-2 max-w-4xl'
                  : data.systemsUsed.length >= 3
                  ? 'md:grid-cols-3 max-w-5xl'
                  : 'max-w-xl'
              } mx-auto gap-6 sm:gap-8 items-stretch`}
            >
              {data.systemsUsed.map((card, idx) => (
                <div
                  key={idx}
                  className="relative p-7 sm:p-8 bg-white/95 border-2 border-[#093624] shadow-[4px_4px_0px_#093624] flex flex-col justify-between h-full"
                  style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                >
                  <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#093624]/60 mb-2">
                      {card.label}
                    </div>
                    <h3 className="font-display font-serif font-bold text-xl sm:text-2xl text-[#093624] mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#2C3830] leading-relaxed mb-6">
                      {card.body}
                    </p>
                  </div>
                  <div>
                    <a
                      href={card.link}
                      onClick={(e) => {
                        if (card.link.startsWith('#')) {
                          e.preventDefault();
                          const el = document.querySelector(card.link);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className="inline-flex items-center gap-1.5 font-sans font-semibold text-sm sm:text-base text-[#093624] hover:text-[#186043] transition-colors focus:outline-none"
                    >
                      <span>{card.linkText}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* BROADER TRACK RECORD (Cream background)                                    */}
      {/* ========================================================================= */}
      <section id="broader-track-record" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F4E9]">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#093624]/70 mb-3">
            BROADER TRACK RECORD
          </div>
          <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#093624] tracking-tight leading-tight mb-6">
            {data.trackRecord.headline}
          </h2>

          {/* Body with detected bullet points */}
          {renderTrackRecordBody(data.trackRecord.body)}

          {/* Link anchor to trackRecord.link */}
          <div className="mt-8">
            <a
              href={data.trackRecord.link}
              onClick={(e) => {
                if (data.trackRecord.link.startsWith('/case-studies/')) {
                  const targetSlug = data.trackRecord.link.replace('/case-studies/', '').split('/')[0].split('#')[0];
                  if (onNavigate && targetSlug) {
                    e.preventDefault();
                    onNavigate('case-study-detail', targetSlug);
                  }
                }
              }}
              className="inline-flex items-center gap-1.5 font-sans font-semibold text-base sm:text-lg text-[#093624] hover:text-[#186043] border-b-2 border-[#093624]/40 hover:border-[#093624] pb-0.5 transition-all"
            >
              <span>{data.trackRecord.linkText}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CLOSING CTA (Bottle green background, Cream text)                          */}
      {/* ========================================================================= */}
      <section id="case-study-cta" className="bg-[#093624] text-[#F7F4E9] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Notebook Grid */}
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
          <h2 className="font-display font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F4E9] tracking-tight leading-tight mb-5">
            {renderWithHighlight(data.closingCta.headline, data.closingCta.highlightWord, true)}
          </h2>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-[#F7F4E9]/80 font-sans leading-relaxed mb-9">
            {data.closingCta.body}
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

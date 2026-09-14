import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { MarkerUnderline, PaperClip, Tape } from './ScrapbookAssets';

export const BookingCTA: React.FC = () => {
  return (
    <section 
      id="booking-section" 
      className="py-20 sm:py-28 lg:py-32 bg-[#093624] text-[#F7F4E9] relative notebook-grid-dark overflow-hidden border-t border-[#093624]/40 select-none"
    >
      {/* Subtle Ambient Glow for depth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CBDA46]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#15543D]/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Badge, Two-Tone Headline, Subheading, 2 Bullets, Small Footer Note */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left relative">

            {/* Small Monospace Topic Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono font-bold tracking-widest text-[#CBDA46] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#CBDA46] animate-pulse" />
              <span>BOOK A CALL</span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Ready to talk now?{' '}
              <span 
                className="relative inline-block text-[#CBDA46] text-sm sm:text-base lg:text-lg font-normal tracking-normal ml-1 sm:ml-2 align-middle -rotate-2 select-none whitespace-nowrap"
                style={{ fontFamily: "'HandwrittenAccent', cursive" }}
              >
                we are too
                {/* Hand-drawn highlighter marker underline */}
                <MarkerUnderline 
                  className="w-full h-2.5 sm:h-3 -bottom-1.5 left-0" 
                  color="#CBDA46" 
                />
              </span>
            </h2>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg text-[#D5E3D5] leading-relaxed max-w-lg mb-8">
              Choose your best time, and we'll see ya on the call.
            </p>

            {/* Two bullet points with checkmark icons */}
            <div className="space-y-3.5 mb-8 text-sm sm:text-base font-sans text-[#F7F4E9]">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#CBDA46] flex items-center justify-center shrink-0 text-[#093624] font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#E2ECE2]">No gatekeeping</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#CBDA46] flex items-center justify-center shrink-0 text-[#093624] font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#E2ECE2]">We audit your presence on the spot</span>
              </div>
            </div>

            {/* Small footer note below bullets */}
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans text-[#A3C2A3] leading-relaxed max-w-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CBDA46] mt-1.5 shrink-0" />
              <span>A little note though, we take ONLY a few clients a month to maintain high execution quality</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Real Zcal Embed in a Cream Rounded Card */}
          <div className="lg:col-span-7 relative">
            
            {/* Scrapbook Tape Accent on Top-Left */}
            <div className="absolute -top-4 left-10 z-30 pointer-events-none hidden sm:block">
              <Tape className="w-24 h-7 text-[#CBDA46]/90 -rotate-3" />
            </div>

            {/* Scrapbook Paperclip Accent on Top-Right */}
            <div className="absolute -top-4 right-8 z-30 pointer-events-none">
              <PaperClip className="w-6 h-11 text-[#64748B]" />
            </div>

            <div 
              id="zcal-calendar-card"
              className="relative rounded-3xl bg-[#F7F4E9] text-[#093624] border-2 border-[#093624] shadow-[8px_8px_0px_#CBDA46] overflow-hidden transition-all duration-300"
            >
              
              {/* Thin Colored Top Border Accent Strip in Wattle */}
              <div className="h-2.5 w-full bg-[#CBDA46] border-b border-[#093624]/20" />

              {/* Card Header with Meeting Info and "Open in Cal ↗" Link */}
              <div className="px-6 py-4 sm:px-8 sm:py-4.5 border-b border-[#093624]/15 bg-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#093624] uppercase tracking-wider">
                    Discovery + Audit Call
                  </span>
                </div>

                {/* "Open in Cal ↗" fallback link */}
                <a
                  href="https://zcal.co/i/laZ1QjPs"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#093624] bg-[#F7F4E9] hover:bg-[#CBDA46] border-2 border-[#093624] px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_#093624] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#093624] transition-all"
                >
                  <span>Open in Cal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#093624]" />
                </a>
              </div>

              {/* Card Body: Embedded booking form fills the frame width edge-to-edge */}
              <div data-lenis-prevent className="w-full bg-white flex flex-col">
                <iframe
                  src="https://zcal.co/i/laZ1QjPs?embed=1"
                  loading="lazy"
                  title="Discovery + Audit Call Booking"
                  className="w-full min-w-full h-[660px] sm:h-[700px] border-0 block"
                />

                {/* Bottom Card Helper Note */}
                <div className="px-4 py-3 bg-[#FAF9F5] border-t border-[#093624]/10 text-center text-[11px] font-mono font-medium text-[#6F7A6E]">
                  🔒 Direct booking powered by zcal · Instant calendar invite sent on confirmation
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

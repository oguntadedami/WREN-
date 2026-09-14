import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import wrenLogoCream from '../assets/images/wren-logo-(cream).png';
import { Button } from './Button';
import { FooterPhysicsBadges } from './FooterPhysicsBadges';

interface FooterProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: 'home' | 'about', sectionId?: string) => void;
  currentPage?: 'home' | 'about';
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate, currentPage = 'home' }) => {
  const scrollTo = (id: string) => {
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home', id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -30, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#093624] text-[#F7F4E9] relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16 notebook-grid-dark select-none border-t border-[#093624]">
      
      {/* ========================================================================= */}
      {/* BACKGROUND LAYER: Typographic Statement (Low Contrast & Fully Visible)   */}
      {/* ========================================================================= */}
      <div 
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none z-0 flex flex-col items-center justify-end pb-2 sm:pb-4 opacity-25 sm:opacity-30 w-full px-0 overflow-hidden"
      >
        <div className="w-full text-center font-display font-black text-[14.5vw] leading-[0.82] tracking-tight text-[#CBDA46] uppercase whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
          GTM FOR YOU
        </div>
        <div className="w-full text-center font-display font-black text-[12.7vw] leading-[0.82] tracking-tight text-[#CBDA46] uppercase whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
          THE RIGHT WAY
        </div>
      </div>

      {/* Ambient Top Subtle Scrim Gradient for crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#093624] via-[#093624]/90 to-transparent pointer-events-none z-[1]" />

      {/* ========================================================================= */}
      {/* TOP LAYER: Functional Footer Content                                      */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Bar: Contact / Socials on Left, Stacked CTAs on Right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 sm:pb-14 border-b border-[#F7F4E9]/15">
          
          {/* Left: Contact Info + Social Badges */}
          <div className="space-y-3">
            <div className="flex items-center">
              <img
                src={wrenLogoCream}
                alt="Wren"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            
            <div className="space-y-1 text-sm font-sans text-[#D5E3D5]">
              <div>
                <a 
                  href="mailto:hello@getwren.io" 
                  className="hover:text-[#CBDA46] transition-colors font-medium underline decoration-[#CBDA46]/40 underline-offset-4"
                >
                  hello@getwren.io
                </a>
              </div>
              <div className="text-xs text-[#A3C2A3] font-mono">
                United States · Europe · Global
              </div>
            </div>

            {/* Socials with "Come say hi" label */}
            <div className="pt-2 space-y-1.5">
              <div className="text-[11px] font-mono text-[#A3C2A3] uppercase tracking-wider">
                Come say hi
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/company/getwren"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-[#CBDA46] text-[#093624] font-mono font-bold text-xs flex items-center justify-center border border-[#093624] shadow-[2px_2px_0px_#05281A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  in
                </a>
                <a
                  href="https://www.youtube.com/@Wren-labs"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-[#F7F4E9] text-[#093624] font-mono font-bold text-xs flex items-center justify-center border border-[#093624] shadow-[2px_2px_0px_#05281A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>

          {/* Right: Primary and Secondary CTA Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 sm:gap-4 self-start md:self-center">
            
            {/* Primary Button: See our work (no sparkle/star) */}
            <Button
              id="footer-see-our-work-btn"
              variant="primary"
              size="sm"
              showSparkles={false}
              onClick={() => scrollTo('case-studies-section')}
              className="shadow-sm"
            >
              See our work
            </Button>

            {/* Secondary Button: Book a call (no star/sparkle) */}
            <Button
              id="footer-book-a-call-btn"
              variant="secondary"
              size="sm"
              showSparkles={false}
              onClick={() => scrollTo('booking-section')}
              className="shadow-sm"
            >
              Book a call
            </Button>

          </div>

        </div>

        {/* 4-Column Functional Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pt-10 pb-16 sm:pb-24">
          
          {/* Column 1: Company */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-[#CBDA46] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D5E3D5]">
              <li>
                <button 
                  id="footer-about-us-btn"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('about');
                    } else {
                      try {
                        window.location.hash = '#about';
                      } catch {
                        // Ignore iframe restriction
                      }
                    }
                  }} 
                  className={`transition-colors cursor-pointer text-left ${
                    currentPage === 'about' ? 'text-[#CBDA46] font-semibold' : 'hover:text-white'
                  }`}
                >
                  About us
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('case-studies-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Case studies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('process-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our process
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pricing-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Come hang */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-[#CBDA46] mb-4">
              Come hang
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D5E3D5]">
              <li>
                <button onClick={() => scrollTo('booking-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Community
                </button>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/getwren" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-left"
                >
                  <span>LinkedIn (connect with our founder)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#CBDA46] shrink-0" />
                </a>
              </li>
              <li>
                <button onClick={() => scrollTo('booking-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Free stuff */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-[#CBDA46] mb-4">
              Free stuff
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D5E3D5]">
              <li>
                <button onClick={() => scrollTo('tool-stack-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  ROI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('tool-stack-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Time Audit
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('case-studies-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  The 2026 Playbook
                </button>
              </li>
              <li>
                <a 
                  href="mailto:hello@getwren.io?subject=Tool%20Idea" 
                  className="hover:text-white transition-colors inline-block text-left"
                >
                  Got a tool idea? (tell us about it)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Learn something new */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-[#CBDA46] mb-4">
              Learn something new
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D5E3D5]">
              <li>
                <button onClick={() => scrollTo('breather-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Podcast
                </button>
              </li>
              <li>
                <span className="text-[#A3C2A3] flex items-center gap-2">
                  <span>Events</span>
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#CBDA46] text-[#093624] px-1.5 py-0.2 rounded">
                    coming soon
                  </span>
                </span>
              </li>
              <li>
                <button onClick={() => scrollTo('case-studies-section')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Blog
                </button>
              </li>
              <li>
                <a href="/for-ai" className="hover:text-[#CBDA46] text-xs font-mono transition-colors inline-flex items-center gap-1 text-[#A3C2A3]">
                  LLM Brief
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* PHYSICAL BADGE BOX: Interactive Matter.js Rolling & Draggable Stickers   */}
        {/* ========================================================================= */}
        <FooterPhysicsBadges />

        {/* ========================================================================= */}
        {/* Bottom Metadata & Links Line                                              */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-[#F7F4E9]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D5E3D5] gap-4">
          <p>© {new Date().getFullYear()} WREN Agency. All rights reserved.</p>
          
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="hover:text-[#CBDA46] cursor-pointer transition-colors">Privacy</span>
            <span className="text-[#A3C2A3]/40">·</span>
            <span className="hover:text-[#CBDA46] cursor-pointer transition-colors">Terms</span>
            <span className="text-[#A3C2A3]/40">·</span>
            <span className="hover:text-[#CBDA46] cursor-pointer transition-colors">Security</span>
          </div>
        </div>

      </div>

    </footer>
  );
};

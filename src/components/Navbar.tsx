import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Plus, Minus, Compass, Zap, Target, BookOpen, Calculator, Radio, FileText, CheckCircle2, HelpCircle, Instagram } from 'lucide-react';
import wrenLogo from '../assets/images/wren-logo.png';
import { Button } from './Button';

interface NavbarProps {
  onOpenBooking?: () => void;
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking,
  currentPage = 'home',
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Condense navbar on scroll
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down past 250px, reveal when scrolling up
      if (currentScrollY > 250 && currentScrollY > lastScrollY.current && !mobileOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const scrollToTop = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      return;
    }
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.35 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home', id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -30, duration: 1.35 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileExpanded(prev => (prev === key ? null : key));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-5 transition-all duration-300 ${
          hidden ? '-translate-y-28' : 'translate-y-0'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 rounded-2xl border border-[#093624]/15 ${
            scrolled
              ? 'py-2.5 px-4 sm:px-6 bg-[#F7F4E9]/90 backdrop-blur-md shadow-md shadow-[#093624]/5'
              : 'py-3.5 px-5 sm:px-8 bg-[#F7F4E9]/75 backdrop-blur-sm shadow-sm'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <img
              src={wrenLogo}
              alt="Wren"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* About Us Link */}
            <button
              id="nav-about-us-btn"
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
              className={`px-3.5 py-2 rounded-lg text-[0.93rem] font-medium transition-colors cursor-pointer ${
                currentPage === 'about'
                  ? 'text-[#093624] bg-[#CBDA46]/35 font-semibold shadow-2xs'
                  : 'text-[#0E1A15]/80 hover:text-[#093624] hover:bg-[#093624]/5'
              }`}
            >
              About Us
            </button>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-resources-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[0.93rem] font-medium transition-colors ${
                  activeDropdown === 'resources' ? 'text-[#093624] bg-[#093624]/5' : 'text-[#0E1A15]/80 hover:text-[#093624]'
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6F7A6E] transition-transform duration-200 ${
                    activeDropdown === 'resources' ? 'rotate-180 text-[#093624]' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'resources' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 p-2 rounded-xl bg-[#F7F4E9]/95 backdrop-blur-xl border border-[#093624]/15 shadow-xl shadow-[#093624]/10 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="space-y-1">
                    <button
                      onClick={() => scrollToSection('what-we-do-section')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#CBDA46]/20 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#15543D]" />
                      <span className="text-sm font-medium text-[#093624]">How We Get Results</span>
                    </button>
                    <button
                      onClick={() => scrollToSection('case-studies-section')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#CBDA46]/20 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#15543D]" />
                      <span className="text-sm font-medium text-[#093624]">Case Studies</span>
                    </button>
                    <button
                      onClick={() => scrollToSection('process-section')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#CBDA46]/20 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#15543D]" />
                      <span className="text-sm font-medium text-[#093624]">Our Playbook & Process</span>
                    </button>
                    <button
                      onClick={() => scrollToSection('pricing-section')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#CBDA46]/20 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#15543D]" />
                      <span className="text-sm font-medium text-[#093624]">Pricing & Offerings</span>
                    </button>
                    <button
                      onClick={() => scrollToSection('faq-section')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#CBDA46]/20 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-[#15543D]" />
                      <span className="text-sm font-medium text-[#093624]">FAQ (The Nosy Section)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Free Tools */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('freetools')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-free-tools-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'freetools' ? null : 'freetools')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[0.93rem] font-medium transition-colors ${
                  activeDropdown === 'freetools' ? 'text-[#093624] bg-[#093624]/5' : 'text-[#0E1A15]/80 hover:text-[#093624]'
                }`}
              >
                <span>Free Tools</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6F7A6E] transition-transform duration-200 ${
                    activeDropdown === 'freetools' ? 'rotate-180 text-[#093624]' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'freetools' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 p-2 rounded-xl bg-[#F7F4E9]/95 backdrop-blur-xl border border-[#093624]/15 shadow-xl shadow-[#093624]/10 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="space-y-1">
                    <button
                      onClick={() => scrollToSection('tool-stack-section')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#CBDA46]/20 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-[#15543D]" />
                      <div>
                        <div className="text-sm font-medium text-[#093624]">GTM Calculator</div>
                        <div className="text-xs text-[#6F7A6E]">Estimate founder-led pipeline ROI</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Podcast Link */}
            <button
              id="nav-podcast-btn"
              onClick={() => scrollToSection('breather-section')}
              className="px-3.5 py-2 rounded-lg text-[0.93rem] font-medium text-[#0E1A15]/80 hover:text-[#093624] transition-colors cursor-pointer"
            >
              Podcast
            </button>
          </nav>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              id="nav-show-me-how-btn"
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('systems-section')}
              className="px-5 shadow-xs"
            >
              Show Me How
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-[#093624] hover:bg-[#093624]/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* EDITORIAL GLASSMORPHISM MOBILE MENU DRAWER (Styled per user reference)     */}
      {/* ========================================================================= */}
      {mobileOpen && (
        <div 
          id="mobile-menu-overlay"
          className="fixed inset-0 z-50 md:hidden glass-drawer flex flex-col justify-between overflow-y-auto select-none animate-in fade-in duration-200"
        >
          {/* Top Bar: Brand Logo on Left, Clean Minimal X on Right */}
          <div className="flex items-center justify-between px-6 pt-7 pb-4 shrink-0">
            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center cursor-pointer"
              aria-label="Wren Home"
            >
              <img
                src={wrenLogo}
                alt="Wren"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </a>

            {/* Sleek Minimal Close X Button */}
            <button
              id="mobile-menu-close-btn"
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 text-[#0E1A15] hover:text-[#093624] transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Center Navigation Rows: Full-width rules with elegant uppercase serif typography */}
          <div className="flex-1 flex flex-col justify-center py-4 sm:py-6">
            <nav className="w-full border-t border-[#0E1A15]/15">
              
              {/* Row 1: ABOUT US (Direct Link) */}
              <div className="border-b border-[#0E1A15]/15">
                <button
                  id="mobile-nav-about-us-btn"
                  onClick={() => {
                    setMobileOpen(false);
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
                  className={`w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between text-left group transition-colors cursor-pointer ${
                    currentPage === 'about' ? 'bg-[#CBDA46]/20' : ''
                  }`}
                >
                  <span className={`font-display font-normal text-2xl sm:text-3xl uppercase tracking-[0.05em] transition-colors ${
                    currentPage === 'about' ? 'text-[#093624] font-semibold' : 'text-[#0E1A15] group-hover:text-[#093624]'
                  }`}>
                    About Us
                  </span>
                  
                  <div className="flex items-center gap-3">
                    {/* Soft green diffused glowing orb / aura */}
                    <div className="relative flex items-center justify-center">
                      <span className="w-7 h-7 rounded-full bg-[#10B981]/35 blur-md pointer-events-none" />
                      <span className="absolute w-4 h-4 rounded-full bg-[#34D399]/65 blur-[1.5px]" />
                      <span className="absolute w-2 h-2 rounded-full bg-[#4ADE80]" />
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-[#0E1A15]/70 group-hover:text-[#093624] transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </div>

              {/* Row 2: RESOURCES (Dropdown) */}
              <div className="border-b border-[#0E1A15]/15">
                <button
                  onClick={() => toggleMobileAccordion('resources')}
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between text-left group transition-colors cursor-pointer"
                  aria-expanded={mobileExpanded === 'resources'}
                >
                  <span className="font-display font-normal text-2xl sm:text-3xl uppercase tracking-[0.05em] text-[#0E1A15] group-hover:text-[#093624] transition-colors">
                    Resources
                  </span>
                  
                  <ChevronDown
                    className={`w-5 h-5 text-[#0E1A15]/70 transition-transform duration-300 ${
                      mobileExpanded === 'resources' ? 'rotate-180 text-[#093624]' : ''
                    }`}
                  />
                </button>

                {/* Expanded Sub-items for Resources */}
                {mobileExpanded === 'resources' && (
                  <div className="px-6 sm:px-8 pb-4 pt-1 space-y-1 bg-[#093624]/[0.03] border-t border-[#0E1A15]/10 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button
                      onClick={() => scrollToSection('what-we-do-section')}
                      className="w-full py-2.5 px-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-left group cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#15543D]" />
                      <span className="font-sans text-sm font-semibold text-[#093624]">
                        How We Get Results
                      </span>
                    </button>
                    
                    <button
                      onClick={() => scrollToSection('case-studies-section')}
                      className="w-full py-2.5 px-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-left group cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#15543D]" />
                      <span className="font-sans text-sm font-semibold text-[#093624]">
                        Case Studies
                      </span>
                    </button>

                    <button
                      onClick={() => scrollToSection('process-section')}
                      className="w-full py-2.5 px-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-left group cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#15543D]" />
                      <span className="font-sans text-sm font-semibold text-[#093624]">
                        Our Playbook & Process
                      </span>
                    </button>

                    <button
                      onClick={() => scrollToSection('pricing-section')}
                      className="w-full py-2.5 px-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-left group cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#15543D]" />
                      <span className="font-sans text-sm font-semibold text-[#093624]">
                        Pricing & Offerings
                      </span>
                    </button>

                    <button
                      onClick={() => scrollToSection('faq-section')}
                      className="w-full py-2.5 px-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-left group cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-[#15543D]" />
                      <span className="font-sans text-sm font-semibold text-[#093624]">
                        FAQ (The Nosy Section)
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Row 3: FREE TOOLS (Dropdown) */}
              <div className="border-b border-[#0E1A15]/15">
                <button
                  onClick={() => toggleMobileAccordion('freetools')}
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between text-left group transition-colors cursor-pointer"
                  aria-expanded={mobileExpanded === 'freetools'}
                >
                  <span className="font-display font-normal text-2xl sm:text-3xl uppercase tracking-[0.05em] text-[#0E1A15] group-hover:text-[#093624] transition-colors">
                    Free Tools
                  </span>
                  
                  <ChevronDown
                    className={`w-5 h-5 text-[#0E1A15]/70 transition-transform duration-300 ${
                      mobileExpanded === 'freetools' ? 'rotate-180 text-[#093624]' : ''
                    }`}
                  />
                </button>

                {/* Expanded Sub-items for Free Tools */}
                {mobileExpanded === 'freetools' && (
                  <div className="px-6 sm:px-8 pb-4 pt-1 space-y-1 bg-[#093624]/[0.03] border-t border-[#0E1A15]/10 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button
                      onClick={() => scrollToSection('tool-stack-section')}
                      className="w-full py-2.5 px-3 rounded-lg hover:bg-white/60 transition-colors flex items-start gap-3 text-left group cursor-pointer"
                    >
                      <div className="p-1.5 rounded bg-[#093624]/10 text-[#093624] mt-0.5">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-sans text-sm font-semibold text-[#093624]">
                          GTM Calculator
                        </div>
                        <div className="font-sans text-xs text-[#6F7A6E]">
                          Estimate founder-led pipeline ROI
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Row 4: PODCAST (Direct Link) */}
              <div className="border-b border-[#0E1A15]/15">
                <button
                  onClick={() => scrollToSection('breather-section')}
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between text-left group transition-colors cursor-pointer"
                >
                  <span className="font-display font-normal text-2xl sm:text-3xl uppercase tracking-[0.05em] text-[#0E1A15] group-hover:text-[#093624] transition-colors">
                    Podcast
                  </span>
                  <Radio className="w-5 h-5 text-[#0E1A15]/50 group-hover:text-[#093624] transition-colors" />
                </button>
              </div>

            </nav>

            {/* Pinned CTA: Show Me How Button */}
            <div className="px-6 sm:px-8 pt-6 pb-2">
              <Button
                id="mobile-nav-show-me-how-btn"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setMobileOpen(false);
                  scrollToSection('systems-section');
                }}
                className="font-display font-black text-base uppercase tracking-wider shadow-[4px_4px_0px_#093624] cursor-pointer"
              >
                Show Me How
              </Button>
            </div>
          </div>

          {/* Bottom Footer: Centered Minimalist Instagram Icon */}
          <div className="pb-6 pt-2 flex justify-center items-center shrink-0">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-[#0E1A15] hover:text-[#093624] transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 stroke-[1.5]" />
            </a>
          </div>

        </div>
      )}
    </>
  );
};

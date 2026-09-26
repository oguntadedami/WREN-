import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface MegaMenuItem {
  title: string;
  tagline: string;
  link?: string;
  badge?: string;
  showPodcastIcon?: boolean;
  action?: () => void;
}

interface NavGroup {
  id: string;
  label: string;
  cards: MegaMenuItem[];
}

interface NavbarProps {
  onOpenBooking?: () => void;
  currentPage?: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail';
  onNavigate?: (page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking,
  currentPage = 'home',
  onNavigate
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>('inside-wren');

  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll to top / home
  const scrollToTop = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      return;
    }
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Smooth scroll to element section
  const scrollToSection = (id: string) => {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home', id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -30, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Primary conversion action: Talk to us (Inside Wren menu item)
  const handleTalkToUs = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onNavigate) {
      onNavigate('contact');
    } else {
      scrollToSection('booking-section');
    }
  };

  // Header CTA action: Show Me How (links to the book a call section)
  const handleShowMeHow = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      scrollToSection('booking-section');
    }
  };

  // Nav Groups & Exact Card Copy specified in brief
  const navGroups: NavGroup[] = [
    {
      id: 'inside-wren',
      label: 'Inside Wren',
      cards: [
        {
          title: 'Our Process',
          tagline: 'How we get you from here to demand.',
          action: () => scrollToSection('process-section'),
        },
        {
          title: 'Pricing',
          tagline: 'What it takes to make it happen.',
          action: () => scrollToSection('pricing-section'),
        },
        {
          title: 'About us',
          tagline: 'The story behind Wren.',
          action: () => {
            if (onNavigate) onNavigate('about');
            else window.location.hash = '#about';
          },
        },
        {
          title: 'Talk to us',
          tagline: "Tell us what's going on. We'll take it from there.",
          action: handleTalkToUs,
        },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      cards: [
        {
          title: 'Join the Community',
          tagline: 'A real home for founders, builders, and creators.',
          action: () => {
            if (onNavigate) onNavigate('community');
            else window.location.hash = '#community';
          },
        },
        {
          title: 'Case Studies',
          tagline: "We've got receipts. Have a look.",
          action: () => {
            if (onNavigate) {
              onNavigate('case-studies');
            } else {
              window.location.hash = '#case-studies';
            }
          },
        },
        {
          title: 'Blog',
          tagline: "What we're learning about GTM, growth, and everything in between.",
          link: '/blog',
          action: () => {
            try {
              window.location.hash = '#blog';
            } catch {}
          },
        },
        {
          title: 'FAQ',
          tagline: "What you'd grill us on, answered.",
          action: () => scrollToSection('faq-section'),
        },
      ],
    },
    {
      id: 'free-stuff',
      label: 'Free stuff',
      cards: [
        {
          title: 'Product Launch Checklist',
          tagline: 'Launching new or launching again? Start here.',
          link: '/resources/product-launch-checklist',
          action: () => {
            try {
              window.location.hash = '#launch-checklist';
            } catch {}
          },
        },
        {
          title: 'GTM Calculator',
          tagline: "See what your presence is producing and where there's room to grow.",
          link: '/resources/gtm-calculator',
          action: () => {
            try {
              window.location.hash = '#gtm-calculator';
            } catch {}
          },
        },
      ],
    },
    {
      id: 'podcast',
      label: 'Podcast',
      cards: [
        {
          title: 'Beyond Content',
          tagline: 'Real conversations about building, selling, and growing.',
          badge: 'LISTEN',
          showPodcastIcon: true,
          action: () => {
            if (onNavigate) onNavigate('podcast');
            else window.location.hash = '#podcast';
          },
        },
      ],
    },
  ];

  // Mouse enter / leave handling for smooth desktop unfold
  const handleMouseEnter = (groupId: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setHoveredGroup(groupId);
    setActiveDropdown(groupId);
  };

  const handleMouseLeave = () => {
    setHoveredGroup(null);
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleGroupClick = (groupId: string) => {
    setActiveDropdown(prev => (prev === groupId ? null : groupId));
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  // Body scroll lock on mobile menu open
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

  const activeGroupData = navGroups.find(g => g.id === activeDropdown);

  return (
    <>
      <header
        ref={navRef}
        id="executive-notebook-header"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        onMouseLeave={handleMouseLeave}
      >
        {/* ========================================================================= */}
        {/* NAV BAR: Torn-paper strip nav bar (sticky/fixed to top)                  */}
        {/* Cream background, notebook grid texture, thin Bottle green bottom border  */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/20 shadow-xs relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
            {/* Left: "WREN" wordmark, bold IBM Plex Serif, Bottle green */}
            <div className="flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="group flex items-center gap-1.5 cursor-pointer select-none"
                aria-label="WREN Home"
              >
                <span className="font-display font-bold text-2xl sm:text-[1.85rem] tracking-tight text-[#093624] group-hover:opacity-90 transition-opacity">
                  WREN
                </span>
              </a>
            </div>

            {/* Center/right: four nav groups, Inter medium weight, Bottle green text */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-9">
              {navGroups.map((group) => {
                const isActive = activeDropdown === group.id;
                const isHovered = hoveredGroup === group.id;

                return (
                  <div
                    key={group.id}
                    className="relative py-1"
                    onMouseEnter={() => handleMouseEnter(group.id)}
                  >
                    <button
                      type="button"
                      onClick={() => handleGroupClick(group.id)}
                      className={`font-sans font-medium text-[0.96rem] text-[#093624] py-1 px-1 transition-colors cursor-pointer flex items-center gap-1.5 group select-none`}
                    >
                      <span className="relative">
                        {group.label}
                        
                        {/* Hand-drawn Wattle squiggle underline on hover or when group is open */}
                        <AnimatePresence>
                          {(isActive || isHovered) && (
                            <motion.svg
                              viewBox="0 0 100 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute -bottom-2 left-0 w-full h-2.5 pointer-events-none overflow-visible"
                              preserveAspectRatio="none"
                              initial={{ opacity: 0, scaleX: 0.2 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              exit={{ opacity: 0, scaleX: 0.2 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <path
                                d="M2,6 C18,1.5 38,10.5 58,5 C74,1.8 88,8.2 98,6"
                                stroke="#CBDA46"
                                strokeWidth="3.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </span>

                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#093624]/70 transition-transform duration-200 ${
                          isActive ? 'rotate-180 text-[#093624]' : 'group-hover:text-[#093624]'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Far right: CTA button: "Show Me How" linking to book a call section */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleShowMeHow}
                className="font-bold px-5"
              >
                Show Me How
              </Button>
            </div>

            {/* Mobile Menu Hamburger Toggle: 3 short offset bars in brand colors (Bottle green, Wattle, Coral Pop) morphing into an X on open (~200ms) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex flex-col justify-center items-center gap-[5px] p-2 rounded-xl hover:bg-[#093624]/10 transition-colors cursor-pointer select-none"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
              >
                {/* Top bar: Bottle green (#093624) */}
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 7.5, width: 22 }
                      : { rotate: 0, y: 0, width: 22 }
                  }
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="h-[2.5px] bg-[#093624] rounded-full origin-center block self-start"
                />

                {/* Middle bar: Wattle (#CBDA46) - offset */}
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1, width: 16 }
                  }
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                  className="h-[2.5px] bg-[#CBDA46] rounded-full origin-center block self-end"
                />

                {/* Bottom bar: Coral Pop (#FF7A5C) - offset */}
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -7.5, width: 22 }
                      : { rotate: 0, y: 0, width: 19 }
                  }
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="h-[2.5px] bg-[#FF7A5C] rounded-full origin-center block self-start"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MEGA-MENU UNFOLD (The Signature Paper Unfold Interaction)                 */}
        {/* transform-origin: top center, scaleY(0) + rotateX(-15deg) -> scaleY(1)   */}
        {/* Cream background, notebook grid texture, soft drop shadow, torn bottom    */}
        {/* ========================================================================= */}
        <div style={{ perspective: '1200px' }} className="relative z-40">
          <AnimatePresence>
            {activeGroupData && (
              <motion.div
                key="mega-menu-unfolding-sheet"
                initial={{ opacity: 0, scaleY: 0, rotateX: -15 }}
                animate={{ opacity: 1, scaleY: 1, rotateX: 0 }}
                exit={{ opacity: 0, scaleY: 0, rotateX: -15 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                className="w-full bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/20 shadow-[0_24px_50px_-10px_rgba(9,54,36,0.18)] relative pt-7 pb-9 px-4 sm:px-8"
                onMouseEnter={() => handleMouseEnter(activeGroupData.id)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGroupData.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="max-w-6xl mx-auto"
                  >
                    {/* Cards sit in a horizontal row (3-4 across depending on group) */}
                    <div
                      className={`grid gap-5 sm:gap-6 ${
                        activeGroupData.cards.length === 1
                          ? 'grid-cols-1 max-w-md mx-auto'
                          : activeGroupData.cards.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                      }`}
                    >
                      {activeGroupData.cards.map((item, index) => {
                        // Alternate a slight rotation on each card: -1deg, +1deg, -1deg, +1deg
                        const isEven = index % 2 === 0;
                        const rotationDeg = isEven ? -1 : 1;
                        // Vary the background tint across cards: Cream (#FAF7EE), Pale Wattle (#EEF2CC) alternating
                        const bgTint = isEven ? '#FAF7EE' : '#EEF2CC';

                        return (
                          <motion.button
                            key={item.title}
                            type="button"
                            onClick={() => {
                              setActiveDropdown(null);
                              if (item.action) {
                                item.action();
                              } else if (item.link) {
                                try {
                                  window.location.hash = item.link.replace(/^\//, '#');
                                } catch {}
                              }
                            }}
                            initial={{ rotate: rotationDeg }}
                            animate={{ rotate: rotationDeg }}
                            whileHover={{ y: -4, rotate: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            style={{
                              backgroundColor: bgTint,
                              transformOrigin: 'center center',
                            }}
                            className="group relative w-full text-left rounded-xl p-5 sm:p-6 
                              border-2 border-dashed border-[#093624]/40 hover:border-[#093624]/80 
                              shadow-[0_2px_8px_rgba(9,54,36,0.06)] hover:shadow-[0_12px_24px_rgba(9,54,36,0.14)] 
                              cursor-pointer flex flex-col justify-between min-h-[110px] sm:min-h-[120px]"
                          >
                            {item.showPodcastIcon ? (
                              <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-[#E6E8E2] border border-[#093624]/10 flex items-center justify-center shrink-0 text-[#093624] mt-0.5 shadow-2xs">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#093624]">
                                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                                    <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {item.badge && (
                                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[6px] bg-[#CBDA46] border border-[#093624]/20 text-[#093624] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                        {item.badge}
                                      </span>
                                    )}
                                    <span className="font-display font-bold text-[1.12rem] sm:text-[1.2rem] text-[#093624] tracking-tight leading-snug group-hover:text-[#05281A]">
                                      {item.title}
                                    </span>
                                  </div>
                                  <p className="font-sans italic text-[0.82rem] sm:text-[0.88rem] text-[#6F7A6E] mt-1.5 leading-relaxed">
                                    {item.tagline}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="font-display font-bold text-[1.05rem] sm:text-[1.15rem] text-[#093624] tracking-tight leading-snug group-hover:text-[#05281A]">
                                  {item.title}
                                </div>
                                <p className="font-sans italic text-[0.82rem] sm:text-[0.88rem] text-[#6F7A6E] mt-1.5 leading-relaxed">
                                  {item.tagline}
                                </p>
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Subtle torn/irregular bottom edge (not a clean rectangle) */}
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
                  <svg
                    viewBox="0 0 1200 16"
                    preserveAspectRatio="none"
                    className="w-full h-3 sm:h-4 text-[#F7F4E9] drop-shadow-[0_4px_3px_rgba(9,54,36,0.06)] fill-current"
                  >
                    <path d="M0,0 L0,8 Q15,4 30,7 Q45,12 60,6 Q80,2 100,8 Q120,13 140,5 Q165,10 190,6 Q215,2 240,9 Q265,14 290,7 Q315,3 340,8 Q365,12 390,5 Q415,9 440,6 Q465,3 490,10 Q515,13 540,6 Q565,3 590,8 Q615,12 640,5 Q665,9 690,6 Q715,2 740,9 Q765,14 790,7 Q815,3 840,8 Q865,12 890,5 Q915,9 940,6 Q965,3 990,10 Q1015,13 1040,6 Q1065,2 1090,8 Q1115,12 1140,5 Q1170,9 1200,6 L1200,0 Z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Subtle backdrop overlay when mega-menu is unfolded */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#093624]/10 backdrop-blur-[2px]"
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION DRAWER (Slides in from the right, full height)          */}
      {/* Bottle green (#093624) background with notebook grid texture              */}
      {/* Close button (small Cream "×" in a circle) top-right of the drawer        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop: Animates opacity only */}
            <motion.div
              key="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-50 md:hidden bg-[#03180F]/65 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel: transform: translateX, ~300ms ease-out */}
            <motion.aside
              key="mobile-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full h-[100dvh] w-[86vw] max-w-sm sm:max-w-md bg-[#093624] notebook-grid-dark text-[#F7F4E9] z-50 shadow-[-16px_0px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-y-auto md:hidden border-l border-[#F7F4E9]/15 p-6 sm:p-7"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation drawer"
            >
              {/* Top Row: WREN wordmark + Close button (small Cream "×" in a circle) */}
              <div className="flex items-center justify-between pb-5 border-b border-[#F7F4E9]/15">
                <span className="font-serif font-black tracking-tight text-2xl text-[#F7F4E9]">
                  WREN
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation drawer"
                  className="w-8 h-8 rounded-full border border-[#F7F4E9]/40 text-[#F7F4E9] hover:text-white flex items-center justify-center hover:bg-[#F7F4E9]/15 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-xl leading-none font-serif select-none -translate-y-[1px]">×</span>
                </button>
              </div>

              {/* Drawer Navigation List: Accordion Groups + One Flat Link */}
              <div className="py-2 space-y-1 flex-1">
                {/* 1. Accordion Groups: "Inside Wren", "Resources", "Free stuff" */}
                {navGroups
                  .filter((group) => group.id !== 'podcast')
                  .map((group) => {
                    const isExpanded = mobileExpandedGroup === group.id;

                    return (
                      <div key={group.id} className="border-b border-[#F7F4E9]/15 py-3.5">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedGroup((prev) => (prev === group.id ? null : group.id))
                          }
                          className="w-full flex items-center justify-between text-left group cursor-pointer py-1 select-none"
                          aria-expanded={isExpanded}
                        >
                          <span className="font-sans font-bold text-lg text-[#F7F4E9] group-hover:text-[#CBDA46] transition-colors">
                            {group.label}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#F7F4E9]/70 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#CBDA46]' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key={`content-${group.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2.5 pb-2 space-y-3 pl-1">
                                {group.cards.map((item) => (
                                  <button
                                    key={item.title}
                                    type="button"
                                    onClick={() => {
                                      setMobileOpen(false);
                                      if (item.action) {
                                        item.action();
                                      } else if (item.link) {
                                        try {
                                          window.location.hash = item.link.replace(/^\//, '#');
                                        } catch {}
                                      }
                                    }}
                                    className="w-full text-left group/item cursor-pointer block py-1"
                                  >
                                    <div className="font-display font-bold text-[1.02rem] text-[#F7F4E9] group-hover/item:text-[#CBDA46] transition-colors leading-snug">
                                      {item.title}
                                    </div>
                                    <div className="font-sans italic text-xs text-[#A3C2A3] mt-0.5 leading-relaxed">
                                      {item.tagline}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                {/* 2. "Podcast" renders as a single flat link (no accordion, single destination) */}
                <div className="border-b border-[#F7F4E9]/15 py-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      if (onNavigate) {
                        onNavigate('podcast');
                      } else {
                        window.location.hash = '#podcast';
                      }
                    }}
                    className="w-full text-left group cursor-pointer block py-1"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-[4px] bg-[#CBDA46] border border-[#093624]/20 text-[#093624] font-mono text-[9px] font-bold tracking-wider uppercase">
                        LISTEN
                      </span>
                      <span className="font-display font-bold text-lg text-[#F7F4E9] group-hover:text-[#CBDA46] transition-colors leading-snug">
                        Beyond Content
                      </span>
                    </div>
                    <div className="font-sans italic text-xs text-[#A3C2A3] mt-1 leading-relaxed pl-0.5">
                      Real conversations about building, selling, and growing.
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom of Drawer: Stacked sticky-note CTA button + Social icons */}
              <div className="pt-6 pb-2 mt-auto space-y-4">
                {/* Stacked sticky-note CTA: "Talk to us" */}
                <div className="relative group w-full">
                  {/* Stacked note backgrounds */}
                  <div className="absolute inset-0 bg-[#EEF2CC] border border-[#093624]/20 rounded-xl rotate-3 shadow-xs transition-transform duration-300 group-hover:rotate-5" />
                  <div className="absolute inset-0 bg-[#F4ECD8] border border-[#093624]/25 rounded-xl -rotate-2 shadow-xs transition-transform duration-300 group-hover:-rotate-4" />

                  <button
                    type="button"
                    onClick={handleTalkToUs}
                    className="relative w-full bg-[#CBDA46] hover:bg-[#D5E452] active:bg-[#C2D13D] text-[#093624] py-3.5 px-6 rounded-xl font-sans font-bold text-base border-2 border-[#093624] shadow-[4px_4px_0px_rgba(3,24,15,0.45)] hover:shadow-[2px_2px_0px_rgba(3,24,15,0.45)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Talk to us</span>
                    <span className="font-sans font-normal text-lg">→</span>
                  </button>
                </div>

                {/* Small row of social icons (reused from site footer) */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <a
                    href="https://www.linkedin.com/company/getwren"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-lg bg-[#CBDA46] text-[#093624] font-mono font-bold text-xs flex items-center justify-center border border-[#093624] shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:scale-105 transition-all"
                  >
                    in
                  </a>
                  <a
                    href="https://www.youtube.com/@Wren-labs"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-lg bg-[#F7F4E9] text-[#093624] font-mono font-bold text-xs flex items-center justify-center border border-[#093624] shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:scale-105 transition-all"
                  >
                    ▶
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

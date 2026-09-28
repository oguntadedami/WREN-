import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurSystems } from './components/OurSystems';
import { TheChallenge } from './components/TheChallenge';
import { WhatWeDo } from './components/WhatWeDo';
import { Testimonials } from './components/Testimonials';
import { OurProcess } from './components/OurProcess';
import { RealityCheck } from './components/RealityCheck';
import { CaseStudies } from './components/CaseStudies';
import { Pricing } from './components/Pricing';
import { ToolStack } from './components/ToolStack';
import { BookingCTA } from './components/BookingCTA';
import { FAQ } from './components/FAQ';
import { EasterEggAI } from './components/EasterEggAI';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { PodcastPage } from './components/PodcastPage';
import { ForAIPage } from './components/ForAIPage';
import { CommunityPage } from './components/CommunityPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { CaseStudyDetailPage } from './components/CaseStudyDetailPage';
import { FreeStuffPage } from './components/FreeStuffPage';
import { LaunchChecklistPage } from './components/LaunchChecklistPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [currentCaseStudySlug, setCurrentCaseStudySlug] = useState<string>(() => {
    try {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/case-studies/') && path !== '/case-studies/' && path !== '/case-studies') {
        const slug = path.replace(/^\/case-studies\//, '').split('/')[0].split('#')[0].split('?')[0];
        if (slug) return slug;
      }
      if (hash.startsWith('#case-study-') && hash !== '#case-studies') {
        const slug = hash.replace('#case-study-', '');
        if (slug) return slug;
      }
      if (hash === '#carril') return 'carril';
      if (hash === '#mischief-makers') return 'mischief-makers';
      if (hash === '#seamailer') return 'seamailer';
      if (hash === '#toolbus-ai') return 'toolbus-ai';
      return 'mischief-makers';
    } catch {
      return 'mischief-makers';
    }
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail' | 'free-stuff' | 'launch-checklist'>(() => {
    try {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/free-stuff/launch-checklist' || path === '/launch-checklist' || hash === '#launch-checklist') return 'launch-checklist';
      if (path === '/free-stuff' || path === '/free-stuff/' || hash === '#free-stuff' || hash.startsWith('#gtm-calculator')) return 'free-stuff';
      if (path === '/case-studies' || path === '/case-studies/' || hash === '#case-studies') return 'case-studies';
      if (path.startsWith('/case-studies/') && path !== '/case-studies/' && path !== '/case-studies') {
        return 'case-study-detail';
      }
      if (hash.startsWith('#case-study-detail') || (hash.startsWith('#case-study-') && hash !== '#case-studies' && !hash.startsWith('#case-studies-'))) return 'case-study-detail';
      if (path.startsWith('/case-studies') || hash.startsWith('#case-studies-')) return 'case-studies';
      if (path === '/privacy-policy' || hash === '#privacy-policy' || hash.startsWith('#who-we-are') || hash.startsWith('#privacy-')) return 'privacy-policy';
      if (path === '/contact' || hash === '#contact') return 'contact';
      if (path === '/community' || hash === '#community') return 'community';
      if (path === '/for-ai' || hash === '#for-ai') return 'for-ai';
      if (path === '/podcast' || hash === '#podcast') return 'podcast';
      if (path === '/about' || hash === '#about') return 'about';
      return 'home';
    } catch {
      return 'home';
    }
  });

  useEffect(() => {
    const handleRouteChange = () => {
      try {
        const path = window.location.pathname;
        const hash = window.location.hash;
        if (path === '/free-stuff/launch-checklist' || path === '/launch-checklist' || hash === '#launch-checklist') {
          setCurrentPage('launch-checklist');
        } else if (path === '/free-stuff' || path === '/free-stuff/' || hash === '#free-stuff' || hash.startsWith('#gtm-calculator')) {
          setCurrentPage('free-stuff');
        } else if (path === '/case-studies' || path === '/case-studies/' || hash === '#case-studies') {
          setCurrentPage('case-studies');
        } else if (path.startsWith('/case-studies/') && path !== '/case-studies/' && path !== '/case-studies') {
          const slug = path.replace(/^\/case-studies\//, '').split('/')[0].split('#')[0].split('?')[0];
          if (slug) {
            setCurrentCaseStudySlug(slug);
            setCurrentPage('case-study-detail');
          } else {
            setCurrentPage('case-studies');
          }
        } else if (hash.startsWith('#case-study-') && !hash.startsWith('#case-studies')) {
          const slug = hash.replace('#case-study-', '');
          if (slug) {
            setCurrentCaseStudySlug(slug);
            setCurrentPage('case-study-detail');
          }
        } else if (path === '/privacy-policy' || hash === '#privacy-policy' || hash.startsWith('#who-we-are') || hash.startsWith('#privacy-')) {
          setCurrentPage('privacy-policy');
        } else if (path === '/contact' || hash === '#contact') {
          setCurrentPage('contact');
        } else if (path === '/community' || hash === '#community') {
          setCurrentPage('community');
        } else if (path === '/for-ai' || hash === '#for-ai') {
          setCurrentPage('for-ai');
        } else if (path === '/podcast' || hash === '#podcast') {
          setCurrentPage('podcast');
        } else if (path === '/about' || hash === '#about') {
          setCurrentPage('about');
        } else if (
          currentPage !== 'home' &&
          !hash.startsWith('#about') &&
          !hash.startsWith('#podcast') &&
          !hash.startsWith('#for-ai') &&
          !hash.startsWith('#community') &&
          !hash.startsWith('#contact') &&
          !hash.startsWith('#privacy-policy') &&
          !hash.startsWith('#case-studies') &&
          !hash.startsWith('#case-study-') &&
          !hash.startsWith('#free-stuff') &&
          !hash.startsWith('#launch-checklist') &&
          !hash.startsWith('#gtm-calculator') &&
          path !== '/about' &&
          path !== '/podcast' &&
          path !== '/for-ai' &&
          path !== '/community' &&
          path !== '/contact' &&
          path !== '/privacy-policy' &&
          path !== '/free-stuff' &&
          !path.startsWith('/case-studies')
        ) {
          setCurrentPage('home');
        }
      } catch {
        // Ignore iframe restriction
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [currentPage]);

  useEffect(() => {
    // Configure GSAP ScrollTrigger for buttery smooth performance across devices
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    });

    // Initialize Lenis for luxurious, butter-smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis | null }).lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis RAF loop through GSAP's high-precision ticker to eliminate frame tearing
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global listener for smooth anchor navigation and SPA routing
    const handleAnchorClick = (e: MouseEvent) => {
      // Check for SPA route links
      const caseStudiesItemTarget = (e.target as HTMLElement).closest('a[href^="/case-studies/"]');
      if (caseStudiesItemTarget) {
        const href = caseStudiesItemTarget.getAttribute('href');
        if (href) {
          const slug = href.replace('/case-studies/', '').split('/')[0].split('#')[0].split('?')[0];
          e.preventDefault();
          if (slug) {
            handleNavigate('case-study-detail', slug);
          } else {
            handleNavigate('case-studies');
          }
          return;
        }
      }
      const launchChecklistTarget = (e.target as HTMLElement).closest('a[href="/launch-checklist"], a[href="/free-stuff/launch-checklist"]');
      if (launchChecklistTarget) {
        e.preventDefault();
        handleNavigate('launch-checklist');
        return;
      }
      const freeStuffTarget = (e.target as HTMLElement).closest('a[href="/free-stuff"]');
      if (freeStuffTarget) {
        e.preventDefault();
        handleNavigate('free-stuff');
        return;
      }
      const caseStudiesTarget = (e.target as HTMLElement).closest('a[href="/case-studies"]');
      if (caseStudiesTarget) {
        e.preventDefault();
        handleNavigate('case-studies');
        return;
      }
      const communityTarget = (e.target as HTMLElement).closest('a[href="/community"]');
      if (communityTarget) {
        e.preventDefault();
        handleNavigate('community');
        return;
      }
      const forAiTarget = (e.target as HTMLElement).closest('a[href="/for-ai"]');
      if (forAiTarget) {
        e.preventDefault();
        handleNavigate('for-ai');
        return;
      }
      const podcastTarget = (e.target as HTMLElement).closest('a[href="/podcast"]');
      if (podcastTarget) {
        e.preventDefault();
        handleNavigate('podcast');
        return;
      }
      const aboutTarget = (e.target as HTMLElement).closest('a[href="/about"]');
      if (aboutTarget) {
        e.preventDefault();
        handleNavigate('about');
        return;
      }
      const homeTarget = (e.target as HTMLElement).closest('a[href="/"]');
      if (homeTarget) {
        e.preventDefault();
        handleNavigate('home');
        return;
      }

      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        try {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, { offset: -30, duration: 1.35 });
          }
        } catch {
          // Ignore invalid CSS selector in href
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger calculations after initial paint and asset layout
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      (window as unknown as { lenis?: Lenis | null }).lenis = null;
    };
  }, []);

  useEffect(() => {
    // Scroll to top immediately when switching between distinct pages and recalculate ScrollTrigger
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleNavigate = (page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail' | 'free-stuff' | 'launch-checklist', sectionId?: string) => {
    if (page === 'case-study-detail') {
      const slug = sectionId || 'mischief-makers';
      setCurrentCaseStudySlug(slug);
      setCurrentPage('case-study-detail');
      try {
        window.history.pushState({}, '', `/case-studies/${slug}`);
        window.location.hash = '';
      } catch {}
      return;
    }

    if (page === 'case-studies' && sectionId && sectionId !== 'case-studies') {
      setCurrentCaseStudySlug(sectionId);
      setCurrentPage('case-study-detail');
      try {
        window.history.pushState({}, '', `/case-studies/${sectionId}`);
        window.location.hash = '';
      } catch {}
      return;
    }

    setCurrentPage(page);
    try {
      if (page === 'launch-checklist') {
        window.history.pushState({}, '', '/free-stuff/launch-checklist');
        window.location.hash = '#launch-checklist';
      } else if (page === 'free-stuff') {
        window.history.pushState({}, '', '/free-stuff');
        window.location.hash = sectionId ? `#${sectionId}` : '#free-stuff';
      } else if (page === 'case-studies') {
        window.history.pushState({}, '', '/case-studies');
        window.location.hash = sectionId ? `#${sectionId}` : '#case-studies';
      } else if (page === 'privacy-policy') {
        window.history.pushState({}, '', '/privacy-policy');
        window.location.hash = sectionId ? `#${sectionId}` : '#privacy-policy';
      } else if (page === 'contact') {
        window.history.pushState({}, '', '/contact');
        window.location.hash = '#contact';
      } else if (page === 'community') {
        window.history.pushState({}, '', '/community');
        window.location.hash = '#community';
      } else if (page === 'for-ai') {
        window.history.pushState({}, '', '/for-ai');
        window.location.hash = '#for-ai';
      } else if (page === 'podcast') {
        window.history.pushState({}, '', '/podcast');
        window.location.hash = '#podcast';
      } else if (page === 'about') {
        window.history.pushState({}, '', '/about');
        window.location.hash = '#about';
      } else if (sectionId) {
        window.history.pushState({}, '', `/#${sectionId}`);
        window.location.hash = `#${sectionId}`;
      } else {
        window.history.pushState({}, '', '/');
        window.location.hash = '';
      }
    } catch {
      // Ignore iframe restriction
    }

    // Scroll handling
    setTimeout(() => {
      if (page === 'home' && sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -20, duration: 1.35 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
      }
      // Otherwise scroll to top
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 50);
  };

  const handleOpenBooking = () => {
    if (currentPage !== 'home') {
      handleNavigate('home', 'booking-section');
      return;
    }
    const el = document.getElementById('booking-section');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -20, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#0E1A15] relative selection:bg-[#CBDA46] selection:text-[#093624]">
      {/* Floating Glass Navigation */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'about' ? (
        <main>
          <AboutPage 
            onOpenBooking={handleOpenBooking} 
            onNavigateHome={(sectionId) => handleNavigate('home', sectionId)} 
          />
        </main>
      ) : currentPage === 'podcast' ? (
        <main>
          <PodcastPage
            onOpenBooking={handleOpenBooking}
            onNavigateHome={(sectionId) => handleNavigate('home', sectionId)}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'for-ai' ? (
        <main>
          <ForAIPage
            onOpenBooking={handleOpenBooking}
            onNavigateHome={(sectionId) => handleNavigate('home', sectionId)}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'community' ? (
        <main>
          <CommunityPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'contact' ? (
        <main>
          <ContactPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'privacy-policy' ? (
        <main>
          <PrivacyPolicyPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'case-study-detail' ? (
        <main>
          <CaseStudyDetailPage
            slug={currentCaseStudySlug}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'case-studies' ? (
        <main>
          <CaseStudiesPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'launch-checklist' ? (
        <main>
          <LaunchChecklistPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'free-stuff' ? (
        <main>
          <FreeStuffPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        </main>
      ) : (
        <main>
          {/* Section 2: Hero with Clothesline Layout */}
          <Hero onOpenBooking={handleOpenBooking} />

          {/* Section 3: Our Systems — Interactive Engine Showcase */}
          <OurSystems onOpenBooking={handleOpenBooking} />

          {/* Section 4: The Challenge — Sticky Dark Editorial Window */}
          <TheChallenge onOpenBooking={handleOpenBooking} />

          {/* Section 5: What We Do / How We Get Results */}
          <WhatWeDo />

          {/* Section 6: Testimonials — Scrapbook Cards */}
          <Testimonials onOpenBooking={handleOpenBooking} />

          {/* Section 7: Our Process — Horizontal Timeline Strip */}
          <OurProcess />

          {/* Section 8: Reality Check — Pinned Full-Bleed Dark Text Reveal */}
          <RealityCheck />

          {/* Section 9: Case Studies */}
          <CaseStudies onNavigate={handleNavigate} />

          {/* Section 10: Pricing */}
          <Pricing onOpenBooking={handleOpenBooking} />

          {/* Section 11: Tool Stack — Marquee */}
          <ToolStack />

          {/* Section 12: CTA — Embedded Calendar Scheduler */}
          <BookingCTA />

          {/* Section 13: FAQ — The Nosy Section */}
          <FAQ />

          {/* Section 14: Easter Egg — AI Memo */}
          <EasterEggAI onNavigate={handleNavigate} />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onOpenBooking={handleOpenBooking} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>(() => {
    try {
      return window.location.hash === '#about' ? 'about' : 'home';
    } catch {
      return 'home';
    }
  });

  useEffect(() => {
    const handleHashChange = () => {
      try {
        if (window.location.hash === '#about') {
          setCurrentPage('about');
        } else if (currentPage === 'about' && window.location.hash !== '#about') {
          setCurrentPage('home');
        }
      } catch {
        // Ignore iframe restriction
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

    // Global listener for smooth anchor navigation via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
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

  const handleNavigate = (page: 'home' | 'about', sectionId?: string) => {
    setCurrentPage(page);
    try {
      if (page === 'about') {
        window.location.hash = '#about';
      } else if (sectionId) {
        window.location.hash = `#${sectionId}`;
      } else {
        window.location.hash = '';
      }
    } catch {
      // Ignore iframe restriction
    }

    // Smooth scroll handling
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
        lenisRef.current.scrollTo(0, { duration: 1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenBooking = () => {
    if (currentPage === 'about') {
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
          <CaseStudies />

          {/* Section 10: Pricing */}
          <Pricing onOpenBooking={handleOpenBooking} />

          {/* Section 11: Tool Stack — Marquee */}
          <ToolStack />

          {/* Section 12: CTA — Embedded Calendar Scheduler */}
          <BookingCTA />

          {/* Section 13: FAQ — The Nosy Section */}
          <FAQ />

          {/* Section 14: Easter Egg — AI Memo */}
          <EasterEggAI />
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

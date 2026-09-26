import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Hash, 
  Users, 
  Sparkles, 
  Compass, 
  ShieldAlert,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import thisCouldBeUsWebm from '../assets/images/wren-community-time.webm';
import founderNotePolaroid from '../assets/images/community/founder-note-polaroid.webp';
import { Tape, PaperClip, Highlight } from './ScrapbookAssets';
import { RealisticSpiralBindingRow } from './challenge/RealisticSpiralBand';
import { WrenCommunitySlack } from './WrenCommunitySlack';
import { Button } from './Button';

const COMMUNITY_CHANNELS = [
  '#LinkedIn-friends',
  '#Everything-GTM',
  '#Speed-networking',
  '#referrals',
  '#events',
];

interface CommunityPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community', sectionId?: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [heroMounted, setHeroMounted] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroMounted(true);
    }, 60);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      videoRef.current.requestFullscreen?.();
    }
  };
  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#0E1A15] selection:bg-[#CBDA46]/40 selection:text-[#093624]">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: "The Marquee Break"                                     */}
      {/* ========================================================================= */}
      <section 
        id="community-hero" 
        className="relative bg-[#F7F4E9] text-[#0E1A15] overflow-hidden pt-32 sm:pt-36 md:pt-40"
      >
        {/* Generous Padding Centered Column */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-24 md:pb-28 text-center flex flex-col items-center">

          {/* Headline */}
          <div className="relative mb-6 sm:mb-8 max-w-5xl">
            <h1 className="font-display font-extrabold text-[1.85rem] min-[390px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-tight text-[#093624] leading-[1.08]">
              {/* Line 1: fades up, strictly on one line */}
              <span 
                className={`block whitespace-nowrap transition-all duration-700 ease-out ${
                  heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Growing alone is hard.
              </span>
              
              {/* Line 2: "So don't." springs in ~500ms after with underline draw */}
              <span 
                className={`relative inline-block mt-2 sm:mt-3 transition-all duration-700 ease-out delay-500 ${
                  heroMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                }`}
              >
                So don't.
                {/* Hand-drawn wavy underline SVG in --color-wattle-deep under "So don't." */}
                <svg
                  viewBox="0 0 280 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-3 sm:-bottom-5 left-0 w-full h-4 sm:h-7 pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 4 15 C 40 7, 95 7, 135 15 C 175 23, 230 21, 276 13"
                    stroke="#B6C73A"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeDasharray={290}
                    strokeDashoffset={heroMounted ? 0 : 290}
                    className="transition-all duration-700 ease-out delay-500"
                  />
                </svg>
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p 
            className={`font-sans font-normal text-lg sm:text-xl md:text-2xl text-[#093624] max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-out delay-600 ${
              heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            A real community of founders, builders, and creators who share what they're learning, support each other's work, and show up when you need help.
          </p>

          {/* CTA: Come on in (Secondary Button) */}
          <div 
            className={`mt-8 sm:mt-10 transition-all duration-700 ease-out delay-700 ${
              heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <Button
              id="hero-come-on-in-btn"
              variant="secondary"
              size="md"
              href="#community-form"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('community-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 sm:px-9 shadow-xs"
            >
              Come on in
            </Button>
          </div>
        </div>

        {/* Bottom Marquee Strip */}
        <div className="w-full overflow-hidden bg-[#CBDA46] text-[#093624] h-10 sm:h-11 flex items-center select-none">
          <div 
            className="animate-marquee flex items-center"
            style={{ animationDuration: '28s' }}
          >
            <div className="flex items-center shrink-0">
              {[...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS].map((channel, i) => (
                <span key={i} className="flex items-center shrink-0">
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wide font-bold whitespace-nowrap px-4 sm:px-6">
                    {channel}
                  </span>
                  <span className="text-[#093624]/35 text-xs select-none" aria-hidden="true">•</span>
                </span>
              ))}
            </div>
            <div className="flex items-center shrink-0" aria-hidden="true">
              {[...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS].map((channel, i) => (
                <span key={`dup-b-${i}`} className="flex items-center shrink-0">
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wide font-bold whitespace-nowrap px-4 sm:px-6">
                    {channel}
                  </span>
                  <span className="text-[#093624]/35 text-xs select-none">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. WHY THIS COMMUNITY EXISTS (The Notepad Concept)                       */}
      {/* ========================================================================= */}
      <section 
        id="why-this-community-exists"
        className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#093624]/10 bg-[#F7F4E9] notebook-grid-bg overflow-hidden"
      >
        {/* Centered Notepad Container */}
        <div className="relative z-10 max-w-4xl lg:max-w-5xl w-full mx-auto">
          
          {/* ========================================================================= */}
          {/* EXECUTIVE GREEN LEATHER NOTEBOOK FRAME */}
          {/* ========================================================================= */}
          <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#0D442E] via-[#093624] to-[#041A10] p-3 sm:p-6 lg:p-7 shadow-[0_25px_60px_-15px_rgba(4,26,16,0.35),0_10px_20px_-5px_rgba(0,0,0,0.2)] border-2 border-[#165B3E]">
            
            {/* Subtle executive leather stitching border */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] sm:rounded-[30px] border border-dashed border-[#CBDA46]/25 pointer-events-none" />

            {/* Vintage Brass Corner Protectors on the Green Cover */}
            <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 w-7 h-7 sm:w-9 sm:h-9 border-t-2 border-l-2 border-[#CBDA46]/60 rounded-tl-[18px] pointer-events-none" />
            <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 w-7 h-7 sm:w-9 sm:h-9 border-t-2 border-r-2 border-[#CBDA46]/60 rounded-tr-[18px] pointer-events-none" />
            <div className="absolute bottom-2 left-2 sm:bottom-3.5 sm:left-3.5 w-7 h-7 sm:w-9 sm:h-9 border-b-2 border-l-2 border-[#CBDA46]/60 rounded-bl-[18px] pointer-events-none" />
            <div className="absolute bottom-2 right-2 sm:bottom-3.5 sm:right-3.5 w-7 h-7 sm:w-9 sm:h-9 border-b-2 border-r-2 border-[#CBDA46]/60 rounded-br-[18px] pointer-events-none" />

            {/* Top Header Leather Border Accents */}
            <div className="relative pt-1 pb-2 flex items-center justify-between px-6 sm:px-10 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CBDA46] shadow-[0_0_8px_#CBDA46]" />
                <span className="h-px w-10 sm:w-20 bg-[#CBDA46]/30" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-px w-10 sm:w-20 bg-[#CBDA46]/30" />
                <span className="w-2 h-2 rounded-full bg-[#CBDA46] shadow-[0_0_8px_#CBDA46]" />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* HUGE REALISTIC CREAM SPIRAL BANDS OVERLAP */}
            {/* ========================================================================= */}
            <div className="relative -my-3 sm:-my-4 z-40">
              <RealisticSpiralBindingRow count={22} />
            </div>

            {/* ========================================================================= */}
            {/* INNER CREAM NOTEBOOK PAPER PAD WITH MULTI-PAGE STACK DEPTH */}
            {/* ========================================================================= */}
            <div className="relative mt-2 rounded-[20px] sm:rounded-[24px] bg-[#FAF7EE] text-[#0E1A15] shadow-2xl border border-[#D8D0BE] overflow-hidden">
              
              {/* Subtle multi-layer cream page stack bevel at bottom */}
              <div className="absolute -bottom-1.5 inset-x-4 h-1.5 bg-[#EAE3D2] rounded-b-[20px] shadow-sm -z-10" />
              <div className="absolute -bottom-3 inset-x-8 h-1.5 bg-[#DDD4C0] rounded-b-[20px] shadow-sm -z-20" />

              {/* Journal Paper Content Area with Grid lines & Coral Margin Line */}
              <div 
                className="relative pl-7 sm:pl-16 md:pl-20 pr-4 sm:pr-10 py-7 sm:py-12 text-[#0E1A15]"
                style={{
                  backgroundImage:
                    'linear-gradient(#E8E2D2 1px, transparent 1px), linear-gradient(90deg, #E8E2D2 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              >
                {/* Classic Red / Coral Margin Rule Line - Safely in the left margin */}
                <div className="pointer-events-none absolute bottom-0 left-4 sm:left-10 md:left-14 top-0 w-px bg-[#FF7A5C]/40" />

                {/* Main Headline - Always full width and never broken by floats */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#093624] tracking-tight leading-snug">
                    Why this community exists
                  </h2>
                </div>

                {/* Mobile-only Polaroid Card: Centered between headline and story for optimal readability */}
                <div className="sm:hidden flex justify-center my-5 select-none">
                  <div className="relative bg-[#FFFFFF] p-2.5 pb-4 rounded-[3px] border border-[#093624]/20 shadow-xl shadow-[#093624]/12 w-36 rotate-[2.5deg]">
                    {/* Washi-tape graphic */}
                    <Tape 
                      color="#BAE6FD" 
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 -rotate-2 z-30 opacity-95 shadow-xs" 
                    />
                    <div className="w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#0E1A15]/5">
                      <img
                        src={founderNotePolaroid}
                        alt="Judith, Founder of WREN"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <span className="font-hand text-xs text-[#093624] block">Judith • Founder</span>
                    </div>
                  </div>
                </div>

                {/* Tablet / Desktop-only Floated Polaroid Card */}
                <div 
                  className="hidden sm:block float-right ml-6 mb-6 rotate-[3.5deg] transition-transform duration-300 hover:rotate-[1deg] group select-none relative z-20"
                >
                  <div className="relative bg-[#FFFFFF] p-2.5 pb-4.5 rounded-[3px] border border-[#093624]/20 shadow-xl shadow-[#093624]/12 w-36 md:w-44">
                    {/* Washi-tape graphic */}
                    <Tape 
                      color="#BAE6FD" 
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 -rotate-2 z-30 opacity-95 shadow-xs" 
                    />

                    <div className="w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#0E1A15]/5">
                      <img
                        src={founderNotePolaroid}
                        alt="Founder of WREN"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Body in IBM Plex Serif regular (--color-ink) */}
                <div className="space-y-5 font-display font-normal text-base sm:text-[17px] text-[#0E1A15] leading-relaxed max-w-2xl">
                  <p>
                    This community came out of my frustration with looking for a place where I could share an idea without wondering if someone would sell me something five minutes later.
                  </p>

                  <p>
                    And where I could say, “Hey, I’m thinking about this, what do you think?” and get honest answers.
                  </p>

                  <p>
                    But it seems that what is online today are communities where the core purpose is selling you something
                  </p>

                  <p>
                    I mean, that's not bad in itself, but{' '}
                    <Highlight color="wattle" rotation="left">
                      I believe in being human first before being a salesperson.
                    </Highlight>
                  </p>

                  <p>
                    So I wanted to create the kind of place I was looking for.
                  </p>

                  <p className="font-medium text-[#093624]">
                    A place where you can show up, share your work, ask for help, make friends, find people who have walked your path, and be useful to one another.
                  </p>
                </div>

                {/* Clear the float */}
                <div className="clear-both" />

                {/* Signature: Judith in --font-hand, --color-bottle */}
                <div className="mt-8 pt-5 border-t border-[#093624]/15 flex flex-col items-start">
                  <span className="font-hand text-base sm:text-lg text-[#093624] transform -rotate-1 select-none inline-block">
                    Judith
                  </span>
                  <span className="font-sans text-[11px] sm:text-xs tracking-wider uppercase text-[#6F7A6E] mt-0.5">
                    Founder, WREN
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT THIS PLACE ISN'T                                                 */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          
          {/* Intro line in Inter font, small size, light green */}
          <div className="mb-2">
            <p className="font-sans font-medium text-sm sm:text-base text-[#749622] inline-block leading-snug">
              But before you sign up, there&apos;s something you should know (not exactly rules), but…
            </p>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#093624] tracking-tight mb-12 sm:mb-14">
            What this place isn&apos;t
          </h2>

          {/* 3 Scrapbook Note Cards matching WhatWeDo design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            
            {/* 1. Not an engagement pod */}
            <div className="group relative transition-all duration-300">
              {/* Top Washi Tape in #FF7A5C */}
              <div 
                className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-2 w-28 h-5 -top-2.5 left-1/2 -translate-x-1/2 bg-[rgba(255,122,92,0.8)]"
                style={{
                  clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                }}
              />

              {/* Hand-Drawn Offset Shadow */}
              <div 
                className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg]"
                style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
              />

              {/* Main Note Card */}
              <div 
                className="relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full"
                style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                    Not an engagement pod.
                  </h3>
                </div>

                <p className="text-[#15543D] text-base leading-relaxed">
                  This is not an engagement pod where you throw your LinkedIn posts and expect thousands of people to come running with “Love this 🔥” kinda comments.
                </p>
              </div>
            </div>

            {/* 2. Not a pitching house */}
            <div className="group relative transition-all duration-300">
              {/* Paper Clip Top Left */}
              <div className="absolute -top-4 left-6 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
                <PaperClip className="w-6 h-10 text-[#093624]" color="#093624" />
              </div>

              {/* Hand-Drawn Offset Shadow */}
              <div 
                className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg]"
                style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
              />

              {/* Main Note Card */}
              <div 
                className="relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full"
                style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
              >
                {/* Corner Notebook Peeling Shadow */}
                <div className="absolute bottom-0 right-0 w-10 h-10 overflow-hidden pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#093624]/5 border-t border-l border-[#093624]/20 transform -rotate-45 translate-x-4 translate-y-4 transition-transform group-hover:scale-125" />
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                    Not a pitching house.
                  </h3>
                </div>

                <div className="space-y-3 text-[#15543D] text-base leading-relaxed">
                  <p className="font-semibold text-[#093624]">
                    Nobody joined this community to be added to a prospecting list.
                  </p>
                  <p>
                    We do have channels for pure referrals, but we do not accept spamming of any kind.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Not a place for inappropriate behaviour */}
            <div className="group relative transition-all duration-300">
              {/* Corner Washi Tape Top Right in #F5A621 */}
              <div 
                className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-2 w-24 h-5 -top-2.5 right-6 bg-[rgba(245,166,33,0.8)]"
                style={{
                  clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                }}
              />

              {/* Hand-Drawn Offset Shadow */}
              <div 
                className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[0.5deg]"
                style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
              />

              {/* Main Note Card */}
              <div 
                className="relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-start h-full"
                style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight group-hover:text-[#05281A] transition-colors">
                    Not a place for inappropriate behaviour.
                  </h3>
                </div>

                <div className="space-y-3 text-[#15543D] text-base leading-relaxed">
                  <p>
                    We are welcoming, don’t discriminate, so we encourage you to be respectful and decent too.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3.5. THIS COULD BE US — FULL-SCREEN 80VH VIDEO WITH HOVER OVERLAY         */}
      {/* ========================================================================= */}
      <section 
        id="this-could-be-us"
        className="relative w-full aspect-video sm:aspect-video md:aspect-auto md:h-[80vh] md:min-h-[520px] md:max-h-[920px] bg-[#0A1A12] overflow-hidden select-none group"
      >
        {/* Video: 16:9 on mobile without cutting, 80vh cinematic on desktop */}
        <video
          ref={videoRef}
          src={thisCouldBeUsWebm}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center cursor-pointer"
          onClick={toggleVideoPlayback}
        />

        {/* Text Overlay: Visible on mobile, elegant hover reveal on desktop */}
        <div 
          className="absolute inset-0 bg-black/35 md:bg-black/45 md:backdrop-blur-[2px] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center pointer-events-none z-20 px-4 text-center"
        >
          <span className="font-display font-extrabold text-2xl min-[380px]:text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F7F4E9] tracking-tight drop-shadow-[0_3px_16px_rgba(0,0,0,0.85)] transform transition-transform duration-300 scale-100 md:scale-95 md:group-hover:scale-100">
            this could be us
          </span>
          <span className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.22em] text-[#CBDA46] mt-1.5 sm:mt-2.5 md:mt-4 font-semibold drop-shadow-md">
            wren community
          </span>
        </div>

        {/* Audio & Fullscreen Quick Action Overlays */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 flex items-center gap-1.5 sm:gap-2.5 z-30">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="p-2 sm:p-2.5 md:p-3 rounded-full bg-[#093624]/85 text-[#F7F4E9] hover:bg-[#093624] border border-[#CBDA46]/40 backdrop-blur-xs transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 sm:p-2.5 md:p-3 rounded-full bg-[#093624]/85 text-[#F7F4E9] hover:bg-[#093624] border border-[#CBDA46]/40 backdrop-blur-xs transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Play Indicator on Pause */}
        {!isVideoPlaying && (
          <div 
            onClick={toggleVideoPlayback}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center cursor-pointer z-30"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#CBDA46] border-2 border-[#093624] flex items-center justify-center shadow-[3px_3px_0px_#093624] sm:shadow-[4px_4px_0px_#093624] hover:scale-105 transition-transform">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#093624] fill-[#093624] translate-x-0.5" />
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. A BIT OF WHAT WE HAVE (AND WHAT YOU CAN DO HERE)                      */}
      {/* ========================================================================= */}
      <section id="what-we-have" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#093624]/10 bg-[#F7F4E9]">
        <div className="max-w-6xl lg:max-w-7xl mx-auto">
          
          <div className="max-w-5xl mb-8">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#093624] tracking-tight mb-4">
              A bit of what we have (and what you can do here)
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#2C4136] leading-relaxed">
              So, if you're looking for a small, exclusive community where you can get in early, meet good people, share what you're building, and help others, <strong className="text-[#093624] font-semibold">you're welcome.</strong>
            </p>
          </div>

          <p className="font-display text-lg sm:text-xl font-bold text-[#093624] mb-6">
            Here's a little bit of what's waiting for you:
          </p>

          {/* Slack-ish two-pane channel explorer */}
          <div className="mb-10 w-full">
            <WrenCommunitySlack />
          </div>

          {/* Nope, there's more... Irregular Scrapbook Paper Note */}
          <div className="relative group transition-all duration-300 w-full">
            {/* Top Washi Tape strip */}
            <div 
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-2 w-28 sm:w-36 h-5 sm:h-6 -top-2.5 sm:-top-3 left-8 sm:left-14 bg-[rgba(203,218,70,0.7)]"
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 sm:translate-x-2 sm:translate-y-2.5 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Irregular Note Paper */}
            <div 
              className="relative z-10 p-6 sm:p-8 bg-[#BAE6FD] text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-0.5"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              {/* Corner Notebook Peeling Shadow */}
              <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#093624]/10 border-t border-l border-[#093624]/30 transform -rotate-45 translate-x-3 translate-y-3" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#093624] mb-2 tracking-tight">
                You didn’t think that was it, did you?
              </h3>
              <p className="font-sans text-base sm:text-lg text-[#2C4136] leading-relaxed">
                There’s a little more waiting for you inside.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FORM FILLING & CTA                                                     */}
      {/* ========================================================================= */}
      <section id="community-form" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#093624] text-[#F7F4E9] overflow-hidden">
        
        {/* Subtle grid pattern in dark section */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(203, 218, 70, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203, 218, 70, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl lg:max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F7F4E9] tracking-tight mb-6">
            Ugh! A form?
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#F7F4E9]/90 mb-2 leading-relaxed">
            It is one of those tiny necessary evils. We just need a little bit of info before we can let you in.
          </p>

          <p className="font-sans text-base sm:text-lg text-[#CBDA46] font-medium mb-10">
            Promise, it won't take long.
          </p>

          {/* Embedded Third-Party Form Window */}
          <div className="bg-[#051F14] border-2 border-[#CBDA46]/25 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(203,218,70,0.15)] overflow-hidden text-left mb-6">
            {/* Window Top Bar */}
            <div className="bg-[#08281B] px-4 sm:px-6 py-3.5 border-b border-[#CBDA46]/20 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-[#F7F4E9]/60 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  https://wren.fillout.com/community
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest uppercase text-[#CBDA46]">
                  CTA -
                </span>
                <a
                  id="community-join-cta"
                  href="https://wren.fillout.com/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans font-bold text-xs sm:text-sm bg-[#CBDA46] text-[#093624] hover:bg-[#B6C73A] transition-all cursor-pointer shadow-xs"
                >
                  <span>Come on in</span>
                  <ArrowUpRight className="w-4 h-4 text-[#093624]" />
                </a>
              </div>
            </div>

            {/* Embedded iFrame for third-party form */}
            <div className="relative w-full h-[650px] sm:h-[720px] bg-white">
              <iframe
                id="community-fillout-iframe"
                src="https://wren.fillout.com/community"
                title="https://wren.fillout.com/community"
                className="w-full h-full border-0"
                allow="camera; microphone; autoplay; encrypted-media; fullscreen"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

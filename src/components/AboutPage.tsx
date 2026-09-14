import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  ExternalLink, 
  Compass, 
  Calendar,
  Layers,
  Award,
  BookOpen,
  Send,
  Zap,
  RotateCcw,
  FileText,
  X,
  ArrowUpRight,
  FolderOpen
} from 'lucide-react';
import { 
  HandDrawnCircle, 
  MarkerUnderline, 
  Tape, 
  PaperClip, 
  StampBadge, 
  WoodenPin,
  MetalClip,
  WrenLogo
} from './ScrapbookAssets';
import { GiveBackSection } from './GiveBackSection';
import judithPortrait from '../assets/images/judith-portrait.jpg';
import judithCutout from '../assets/images/wren-avatar.png';

interface AboutPageProps {
  onOpenBooking?: () => void;
  onNavigateHome?: (sectionId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onOpenBooking, 
  onNavigateHome 
}) => {
  // State for the interactive free tool demo in Section 4
  const [activeTool, setActiveTool] = useState<'diagnostic' | 'matrix' | 'playbook'>('diagnostic');
  const [diagnosticStage, setDiagnosticStage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [copiedAngle, setCopiedAngle] = useState(false);

  // Smooth scroll to a section on the about page
  const scrollToAboutSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Questions for the interactive "B2B Demand Diagnostic" tool
  const diagnosticQuestions = [
    {
      question: "How do your best prospective clients currently find you?",
      options: [
        { label: "Direct founder referrals & word-of-mouth only", score: 45 },
        { label: "Founder's LinkedIn / personal brand + organic network", score: 80 },
        { label: "Inconsistent outbound emails with low reply rates", score: 30 },
        { label: "Predictable, compounding multi-channel inbound engine", score: 95 }
      ]
    },
    {
      question: "Is your founder actively communicating your company's core POV publicly?",
      options: [
        { label: "Rarely — too busy running operations and product", score: 35 },
        { label: "Occasionally, but without a structured system or rhythm", score: 60 },
        { label: "Weekly, but content lacks punch and qualified deal flow", score: 70 },
        { label: "Consistently turning unique founder insights into revenue pipeline", score: 95 }
      ]
    },
    {
      question: "What happens when enterprise leads visit your digital presence?",
      options: [
        { label: "They see generic corporate SaaS jargon and bounce", score: 30 },
        { label: "They think our product looks cool but don't feel urgency", score: 55 },
        { label: "They immediately understand why we're the only viable choice", score: 95 }
      ]
    }
  ];

  const handleSelectOption = (questionIdx: number, score: number) => {
    const nextAnswers = { ...answers, [questionIdx]: score };
    setAnswers(nextAnswers);
    if (questionIdx < diagnosticQuestions.length - 1) {
      setDiagnosticStage(questionIdx + 1);
    } else {
      setDiagnosticStage(diagnosticQuestions.length); // Show results
    }
  };

  const calculatedScore = Object.values(answers).length > 0
    ? Math.round(Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length)
    : 72;

  const resetDiagnostic = () => {
    setAnswers({});
    setDiagnosticStage(0);
  };

  return (
    <div className="w-full bg-[#FAF7EE] text-[#0E1A15] relative selection:bg-[#CBDA46] selection:text-[#093624] overflow-x-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* SECTION 1: WHO THE HECK ARE WE? (HERO - FULL SCREEN 100VH CONVERSATIONAL) */}
      {/* ========================================================================= */}
      <section 
        id="about-hero" 
        style={{ backgroundColor: '#F7F4E9' }}
        className="min-h-screen w-full flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 notebook-grid-bg border-b border-[#0E1A15]/10 pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
      >
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center text-center justify-center relative z-10 my-auto">
          
          {/* Line 1: "Who the heck are we?" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block"
          >
            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] text-[#093624] tracking-tight leading-[1.15]">
              Who the{' '}
              <span className="relative inline-block">
                heck
                {/* Hand-drawn Wattle squiggle underline beneath "heck", appearing after line text has fully faded in */}
                <svg
                  viewBox="0 0 140 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M3,9 C25,4 60,14 95,8 C115,5 130,11 137,9"
                    stroke="#CBDA46"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.65, duration: 0.38, ease: "easeOut" }}
                  />
                </svg>
              </span>{' '}
              are we?
            </h1>
          </motion.div>

          {/* Line 2: "Well well well…." */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-6 mb-2 sm:mb-3"
          >
            <p className="font-sans font-normal italic text-xl sm:text-2xl md:text-3xl text-[#093624] tracking-normal select-none">
              Well well well….
            </p>
          </motion.div>

          {/* Line 3: "The short answer is that Wren is a GTM and marketing studio." */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
            className="my-3 sm:my-5 max-w-3xl lg:max-w-4xl"
          >
            <p className="font-sans font-normal text-lg sm:text-2xl md:text-3xl lg:text-[2rem] text-[#093624] leading-snug tracking-tight">
              The short answer is that <strong className="font-bold">Wren</strong> is a GTM and marketing studio.
            </p>
          </motion.div>

          {/* Line 4: "Right now, it's me, a growing network of very good people, and one slightly unreasonable obsession: helping B2B businesses generate more demand than they can handle." */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.52, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-6 mb-8 sm:mb-10 max-w-2xl sm:max-w-3xl lg:max-w-4xl px-2"
          >
            <p className="font-sans font-normal text-base sm:text-lg md:text-xl lg:text-[1.35rem] text-[#093624] leading-relaxed sm:leading-relaxed lg:leading-[1.6]">
              Right now, it's me, a growing network of very good people, and one slightly unreasonable obsession:{' '}
              <strong className="font-bold">helping B2B businesses generate more demand than they can handle.</strong>
            </p>
          </motion.div>

          {/* CTA: Below fully-revealed text, stacked sticky-note button style */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center select-none"
          >
            <div className="relative group inline-block">
              {/* Stacked note backgrounds */}
              <div className="absolute inset-0 bg-[#EEF2CC] border border-[#093624]/20 rounded-xl rotate-3 shadow-xs transition-transform duration-300 group-hover:rotate-6" />
              <div className="absolute inset-0 bg-[#F4ECD8] border border-[#093624]/25 rounded-xl -rotate-2 shadow-xs transition-transform duration-300 group-hover:-rotate-4" />
              
              <button
                id="about-hero-story-btn"
                onClick={() => scrollToAboutSection('meet-the-founder')}
                className="relative bg-[#093624] hover:bg-[#15543D] text-[#F7F4E9] px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl font-sans font-semibold text-sm sm:text-base border-2 border-[#093624] shadow-[4px_4px_0px_#CBDA46] hover:shadow-[2px_2px_0px_#CBDA46] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>The longer answer is a hella story ↓</span>
              </button>
            </div>

            {/* Decorative flourish: reuse existing wren bird illustration directly beneath the button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 3.1, ease: "easeOut" }}
              className="mt-6 sm:mt-7 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="relative flex items-center justify-center group">
                <div className="absolute -bottom-1 w-8 h-2 bg-[#093624]/15 rounded-full blur-[1px]" />
                <WrenLogo className="w-8 h-8 sm:w-9 sm:h-9 text-[#093624] drop-shadow-xs" color="#093624" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MEET THE FOUNDER                                               */}
      {/* ========================================================================= */}
      <section 
        id="meet-the-founder" 
        className="relative w-full bg-[#F7F4E9] border-b border-[#0E1A15]/15 overflow-hidden"
      >
        {/* Two-column layout: photo fills entire left column edge-to-edge, copy on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[660px]">
          
          {/* Left Column: Full-bleed Candid Photo with Overlapping Sticker Badge */}
          <div className="lg:col-span-5 relative w-full h-[440px] sm:h-[520px] lg:h-full min-h-[440px] lg:min-h-full bg-[#0E1A15]">
            {/* Overlapping Sticker Badge */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
              <div className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0E1A15] text-[#FAF7EE] border border-[#FAF7EE]/25 shadow-[0_8px_20px_rgba(0,0,0,0.35)] -rotate-3 select-none">
                <span 
                  className="text-xl sm:text-2xl text-[#FAF7EE] leading-none tracking-wide"
                  style={{ fontFamily: "'HandwrittenAccent', cursive" }}
                >
                  Meet our Founder
                </span>
              </div>
            </div>

            {/* Full-bleed rectangular crop (no rounding, no rotation) */}
            <img 
              src={judithPortrait} 
              alt="Judith - Founder of Wren" 
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Column: Textured Cream Background, Headline, Italic Pull-quote line, Body Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-14 sm:py-20 lg:py-24 bg-[#F7F4E9] notebook-grid-bg text-[#093624] border-t lg:border-t-0 lg:border-l border-[#093624]/10 relative">
            <div className="max-w-2xl relative z-10">
              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#093624] tracking-tight leading-tight">
                Meet the founder, <span className="font-extrabold text-[#093624]">Judith</span>
              </h2>

              {/* Directly below: Italic Pull-quote line */}
              <p className="font-display italic text-xl sm:text-2xl text-[#093624] leading-snug mt-3 sm:mt-4 mb-6 sm:mb-8">
                Wren was born out of pure pain.
              </p>

              {/* Body Copy */}
              <div className="space-y-4 sm:space-y-5 font-sans font-normal text-base sm:text-lg text-[#093624]/90 leading-relaxed">
                <p>
                  After years of helping founders grow their products and make some cool cash, I kept noticing the same thing, which is that for lean B2B businesses, the founder is often already the most trusted person in the room. They have the expertise, probably have a great story, and also have the credibility.
                </p>

                <p>
                  So why not use that? I realised one of the simplest ways to help a lean team go to market is to turn the founder's presence into an actual GTM engine. Which will help build the company's reputation, create demand, build meaningful enterprise relationships, and make them really cool cash, It's a strategy with no loss when you look at it.
                </p>

                <p>
                  <strong className="font-bold text-[#093624]">So I started Wren.</strong> Before Wren, I spent six years working across FCMO, product marketing, and growth marketing, helping businesses figure out how to get their products in front of the right people and turn attention into something useful. I've worked with more businesses than I can probably remember at this point.
                </p>

                <p>
                  Starting Wren is really me taking everything I've learned along the way and pouring it into the founders and businesses I work with. And the funniest part? The founder of Wren is the first founder Wren gets to test every new and trending hack on.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WE DON'T HOLD BACK (COMMUNITY & GIVE-BACK COLLAGE)             */}
      {/* ========================================================================= */}
      <GiveBackSection onOpenBooking={onOpenBooking} />

      {/* ========================================================================= */}
      {/* SECTION 4: WE'VE BUILT SOME REALLY COOL STUFF (FREE TOOLS & PLAYBOOKS)   */}
      {/* ========================================================================= */}
      <section 
        id="cool-stuff" 
        className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#0E1A15]/10 bg-[#F7F4E9]"
      >
        <div className="max-w-5xl mx-auto">
          
          {/* Section Stamp Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b-2 border-dashed border-[#0E1A15]/20 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#CBDA46] text-[#093624] text-xs font-mono uppercase tracking-wider font-bold mb-3">
                <Zap className="w-3.5 h-3.5 text-[#093624]" />
                <span>FREE RESOURCES // SECTION 04</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[#093624]">
                We've built some really cool stuff
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-hand text-2xl text-[#15543D] rotate-1">
                zero gatekeeping. 100% free.
              </span>
            </div>
          </div>

          {/* Copy Intro: "We like building things almost as much as we like helping businesses grow..." */}
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="font-sans text-lg sm:text-xl text-[#0E1A15]/90 leading-relaxed font-medium">
              We like building things almost as much as we like helping businesses grow.
            </p>
            <p className="font-sans text-base sm:text-lg text-[#0E1A15]/80 leading-relaxed">
              So, before you hire us, <strong>go steal something useful from us first.</strong>
            </p>
            <p className="font-sans text-base sm:text-lg text-[#0E1A15]/80 leading-relaxed">
              We've built free tools and playbooks to help founders and marketing teams figure things out, try new things, and get moving.
            </p>
          </div>

          {/* Featured Tool Spotlight Banner as specified: */}
          {/* "Start with [Tool Name] → It's 100% free, and you don’t need to give your email. Just go play with it." */}
          <div className="bg-[#FAF7EE] border-2 border-[#093624] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0px_#093624] mb-12 relative">
            
            {/* Top Tape */}
            <div className="absolute -top-3 left-10">
              <Tape className="w-28 h-6 rotate-[-2deg]" color="#CBDA46" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#0E1A15]/15">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#093624] text-[#CBDA46] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <span>★ FEATURED TOOL</span>
                </div>
                
                {/* Start with [Tool Name] → */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#093624] font-semibold">
                  Start with{' '}
                  <span className="underline decoration-[#CBDA46] decoration-4 underline-offset-4">
                    B2B Demand Engine Diagnostic
                  </span>{' '}
                  →
                </h3>
                
                {/* "It's 100% free, and you don’t need to give your email. Just go play with it." */}
                <p className="font-hand text-2xl sm:text-3xl text-[#15543D] mt-2">
                  It's 100% free, and you don’t need to give your email. Just go play with it.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full border border-dashed border-[#093624] text-xs font-mono font-semibold text-[#093624] bg-white">
                  NO EMAIL REQUIRED
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#CBDA46] text-[#093624] text-xs font-mono font-bold">
                  INSTANT RESULTS
                </span>
              </div>
            </div>

            {/* Interactive Live Mini-Tool Sandbox directly inside the page! */}
            <div className="pt-8">
              
              <div className="bg-white border-2 border-dashed border-[#093624]/30 rounded-xl p-6 sm:p-8 relative">
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#093624]" />
                    <span className="font-mono text-xs font-bold text-[#093624] uppercase tracking-wider">
                      INTERACTIVE AUDIT // QUESTION {Math.min(diagnosticStage + 1, diagnosticQuestions.length)} OF {diagnosticQuestions.length}
                    </span>
                  </div>

                  {diagnosticStage >= diagnosticQuestions.length && (
                    <button
                      onClick={resetDiagnostic}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#093624] hover:text-[#15543D] font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake audit</span>
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {diagnosticStage < diagnosticQuestions.length ? (
                    <motion.div
                      key={diagnosticStage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-display text-xl sm:text-2xl text-[#093624] font-medium">
                        {diagnosticQuestions[diagnosticStage].question}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {diagnosticQuestions[diagnosticStage].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(diagnosticStage, opt.score)}
                            className="text-left p-4 rounded-xl border border-[#0E1A15]/15 hover:border-[#093624] hover:bg-[#FAF7EE] transition-all cursor-pointer group flex flex-col justify-between"
                          >
                            <span className="font-sans text-sm sm:text-base text-[#0E1A15] group-hover:text-[#093624] font-medium leading-snug">
                              {opt.label}
                            </span>
                            <span className="text-[11px] font-mono text-[#6F7A6E] mt-3 flex items-center gap-1 group-hover:text-[#093624]">
                              <span>Select option</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 rounded-xl bg-[#093624] text-[#F7F4E9] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
                        <div>
                          <span className="text-xs font-mono uppercase text-[#CBDA46] tracking-wider">
                            YOUR FOUNDER GTM ENGINE READINESS SCORE
                          </span>
                          <h4 className="font-display text-3xl sm:text-4xl text-[#F7F4E9] font-medium mt-1">
                            {calculatedScore}% Readiness Score
                          </h4>
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-[#CBDA46] text-[#093624] font-mono text-sm font-bold text-center">
                          {calculatedScore > 75 ? 'HIGH LEVERAGE' : 'HIGH OPPORTUNITY'}
                        </div>
                      </div>

                      <p className="font-sans text-sm sm:text-base text-[#D5E3D5] leading-relaxed">
                        {calculatedScore > 75 
                          ? "You already have the core founder credibility in place. Your biggest opportunity is systematizing content loops into predictable enterprise inbound meetings so it doesn't depend on manual hours."
                          : "You're sitting on massive untapped founder authority. Turning your direct product insights and founder point-of-view into a weekly distribution engine can unlock immediate 3x inbound deal flow."}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <button
                          onClick={onOpenBooking}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#CBDA46] hover:bg-[#B6C73A] text-[#093624] font-semibold text-sm transition-colors cursor-pointer"
                        >
                          <span>Review your diagnostic with Judith</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={resetDiagnostic}
                          className="text-xs font-mono text-[#CBDA46] hover:underline cursor-pointer"
                        >
                          Try different inputs
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>

          {/* Secondary Tools & Playbooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tool 2: Founder Brand & Positioning Matrix */}
            <div className="bg-[#FAF7EE] border-2 border-[#093624] rounded-xl p-6 shadow-[6px_6px_0px_#093624] flex flex-col justify-between relative">
              <div className="absolute -top-3 right-8">
                <PaperClip color="#093624" className="w-4 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#6F7A6E] tracking-wider block mb-1">
                  PLAYBOOK // 02
                </span>
                <h4 className="font-display text-2xl text-[#093624] font-medium mb-2">
                  Founder Positioning Matrix
                </h4>
                <p className="font-sans text-sm text-[#0E1A15]/80 leading-relaxed mb-4">
                  The exact step-by-step framework we use to extract unique founder POVs and turn them into weekly magnetic thought leadership without sounding corporate.
                </p>
              </div>
              <div className="pt-4 border-t border-[#0E1A15]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#093624] font-bold">100% FREE NO EMAIL</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("Wren Founder Positioning Matrix: 1. Core Enemy / 2. Counterintuitive Insight / 3. Tactical Proof / 4. Direct Offer");
                    setCopiedAngle(true);
                    setTimeout(() => setCopiedAngle(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#093624] hover:text-[#15543D] cursor-pointer"
                >
                  <span>{copiedAngle ? 'Copied to clipboard!' : 'Copy framework →'}</span>
                </button>
              </div>
            </div>

            {/* Tool 3: The Zero-to-Pipeline GTM Blueprint */}
            <div className="bg-[#FAF7EE] border-2 border-[#093624] rounded-xl p-6 shadow-[6px_6px_0px_#093624] flex flex-col justify-between relative">
              <div className="absolute -top-3 right-8">
                <Tape className="w-16 h-5 rotate-2" color="#D97706" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#6F7A6E] tracking-wider block mb-1">
                  SWIPEFILE // 03
                </span>
                <h4 className="font-display text-2xl text-[#093624] font-medium mb-2">
                  The Lean B2B GTM Swipefile
                </h4>
                <p className="font-sans text-sm text-[#0E1A15]/80 leading-relaxed mb-4">
                  12 verified distribution angles, cold outreach structures, and lead magnets tested across dozens of B2B SaaS and service founders.
                </p>
              </div>
              <div className="pt-4 border-t border-[#0E1A15]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#093624] font-bold">OPEN ACCESS</span>
                <button
                  onClick={() => onNavigateHome ? onNavigateHome('systems-section') : scrollToAboutSection('talk-to-us-cta')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#093624] hover:text-[#15543D] cursor-pointer"
                >
                  <span>Explore systems →</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: FREE STUFF NOT YOUR THING? / TALK TO US (CLOSING DISPATCH)     */}
      {/* ========================================================================= */}
      <section 
        id="talk-to-us-cta" 
        className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7EE]"
      >
        <div className="max-w-4xl mx-auto">
          
          {/* Telegram / Stationery Dispatch Card */}
          <div className="relative bg-[#093624] text-[#FAF7EE] rounded-3xl p-8 sm:p-14 lg:p-16 border-4 border-[#CBDA46] shadow-[12px_12px_0px_#05281A] overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 notebook-grid-dark opacity-30 pointer-events-none" />

            {/* Corner Washi Tape */}
            <div className="absolute -top-3 left-12">
              <Tape className="w-32 h-7 -rotate-2" color="#CBDA46" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CBDA46] text-[#093624] text-xs font-mono font-bold uppercase tracking-wider">
                <Send className="w-3.5 h-3.5 text-[#093624]" />
                <span>DIRECT DISPATCH // FINAL STEP</span>
              </div>

              {/* Exact Copy: "Free stuff not your thing?" */}
              <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#F7F4E9] tracking-tight">
                Free stuff not your thing?
              </h3>

              {/* Exact Copy: "Fair enough." */}
              <p className="font-hand text-3xl sm:text-4xl text-[#CBDA46] -rotate-1 select-none">
                Fair enough.
              </p>

              {/* Supporting narrative */}
              <p className="font-sans text-base sm:text-lg text-[#D5E3D5] max-w-xl mx-auto leading-relaxed">
                If you'd rather bypass the playbooks and have us install a custom B2B demand engine directly into your business, let's talk.
              </p>

              {/* Exact Copy CTA Button: "Talk to us →" */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  id="about-page-talk-to-us-btn"
                  onClick={onOpenBooking}
                  className="group inline-flex items-center justify-center gap-3 bg-[#CBDA46] hover:bg-[#B6C73A] text-[#093624] px-8 py-4 rounded-xl font-display font-semibold text-lg sm:text-xl border-2 border-[#093624] shadow-[4px_4px_0px_#093624] hover:shadow-[2px_2px_0px_#093624] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  <span>Talk to us</span>
                  <ArrowRight className="w-5 h-5 text-[#093624] group-hover:translate-x-1 transition-transform" />
                </button>

                {onNavigateHome && (
                  <button
                    onClick={() => onNavigateHome()}
                    className="text-sm font-mono text-[#D5E3D5] hover:text-[#CBDA46] underline decoration-dashed underline-offset-4 cursor-pointer"
                  >
                    ← Back to Wren homepage
                  </button>
                )}
              </div>

              {/* Tactile Stamp */}
              <div className="pt-6 flex items-center justify-center gap-2 text-xs font-mono text-[#D5E3D5]/70">
                <span>LIMITED TO 3 NEW FOUNDERS PER QUARTER</span>
                <span>•</span>
                <span>DIRECT FOUNDER ACCESS</span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

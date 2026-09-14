import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { LiveExecutionTerminal } from './LiveExecutionTerminal';

interface ProcessStep {
  id: string;
  stepNum: string;
  title: string;
  description: string;
  visualTag: string;
  terminalCommand: string;
}

export const OurProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps: ProcessStep[] = [
    {
      id: "step-kickoff",
      stepNum: "01",
      title: "Kickoff call -",
      description: "We both align on your goals, business, and GTM needs.",
      visualTag: "CALL://ALIGNMENT-ROOM",
      terminalCommand: "$ kickoff --align --goals --gtm",
    },
    {
      id: "step-funnel",
      stepNum: "02",
      title: "Funnel design",
      description: "We map the system from founder presence to pipeline.",
      visualTag: "ARCH://FUNNEL-MAPPER",
      terminalCommand: "$ map --source founder_presence --target pipeline",
    },
    {
      id: "step-rhythm",
      stepNum: "03",
      title: "Rhythm extraction",
      description: "We build your voice, positioning, identity, ICP, and offers.",
      visualTag: "VOICE://FREQUENCY-EXTRACTION",
      terminalCommand: "$ extract --voice --icp --offers --positioning",
    },
    {
      id: "step-execution",
      stepNum: "04",
      title: "End-to-end execution",
      description: "We run the system and route qualified leads to you.",
      visualTag: "DASH://EXECUTION-RUNTIME",
      terminalCommand: ">_ $ system --active",
    },
    {
      id: "step-results",
      stepNum: "05",
      title: "Results",
      description: "You get consistent execution, pipeline, and clear reporting.",
      visualTag: "DASH://PIPELINE-METRICS",
      terminalCommand: "$ report --pipeline --execution --status active",
    }
  ];

  const current = steps[activeStep];

  // IntersectionObserver to dynamically update active step as right column scrolls
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        },
        {
          root: null,
          rootMargin: '-20% 0px -30% 0px',
          threshold: 0.3,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    const target = stepRefs.current[index];
    if (target) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, options?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: -120, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section 
      id="process-section" 
      className="py-16 sm:py-24 lg:py-28 bg-[#FBF9F3] border-b border-[#093624]/10 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between py-3 border-b border-[#093624]/15 mb-10 sm:mb-16 text-[11px] sm:text-xs font-mono text-[#6F7A6E] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#093624] animate-pulse" />
            <span>Our Process</span>
          </div>
          <div className="font-medium text-[#093624]">
            How We Get You There
          </div>
        </div>

        {/* 2-Column Split: Sticky Left Visual & Scrollable Right Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* Left Column: STICKY 1-Bit Dithered CRT Terminal */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-4 z-20">
            
            {/* Dithered 1-Bit Retro Visual Screen */}
            {(() => {
              const isSkyBlueStep = activeStep === 1;
              const isYellowStep = activeStep === 2;
              const isExecutionStep = activeStep === 3;
              const isLimeStep = activeStep === 4;

              if (isExecutionStep) {
                return <LiveExecutionTerminal />;
              }

              let containerClasses = 'border-[#093624] bg-[#0E0617] shadow-[6px_6px_0px_#093624]';
              let titlebarClasses = 'bg-[#1C0F2B] border-[#A855F7]/30 text-[#C084FC]';
              let titlebarTagClass = 'text-[#C084FC] opacity-80';
              let stepBadgeClasses = 'bg-[#A855F7]/20 text-[#E9D5FF]';
              let bodyBgClass = 'bg-[#0A0410]';
              let footerClasses = 'bg-[#140A20] border-[#A855F7]/20 text-[#A855F7]';
              let footerIconClass = 'text-[#CBDA46]';
              let footerCmdClass = 'text-[#E9D5FF]';

              if (isSkyBlueStep) {
                containerClasses = 'border-[#093624] bg-[#BAE6FD] shadow-[6px_6px_0px_#093624]';
                titlebarClasses = '';
                titlebarTagClass = '';
                stepBadgeClasses = '';
                bodyBgClass = 'bg-[#BAE6FD]';
                footerClasses = '';
                footerIconClass = '';
                footerCmdClass = '';
              } else if (isYellowStep) {
                containerClasses = 'border-[#093624] bg-[#FDE68A] shadow-[6px_6px_0px_#093624]';
                titlebarClasses = 'bg-[#F59E0B]/30 border-[#093624] text-[#093624]';
                titlebarTagClass = 'text-[#093624] font-bold';
                stepBadgeClasses = 'bg-[#093624]/15 text-[#093624] border border-[#093624]/30 font-bold';
                bodyBgClass = 'bg-[#FDE68A]';
                footerClasses = 'bg-[#F59E0B]/30 border-[#093624] text-[#093624]';
                footerIconClass = 'text-[#093624]';
                footerCmdClass = 'text-[#093624] font-semibold';
              } else if (isExecutionStep) {
                containerClasses = 'border-[#093624] bg-[#BAE6FD] shadow-[6px_6px_0px_#093624]';
                titlebarClasses = '';
                titlebarTagClass = '';
                stepBadgeClasses = '';
                bodyBgClass = 'bg-[#BAE6FD]';
                footerClasses = '';
                footerIconClass = '';
                footerCmdClass = '';
              } else if (isLimeStep) {
                containerClasses = 'border-[#093624] bg-[#BAC944] shadow-[6px_6px_0px_#093624]';
                titlebarClasses = 'bg-[#A6B736]/30 border-[#093624] text-[#093624]';
                titlebarTagClass = 'text-[#093624] font-bold';
                stepBadgeClasses = 'bg-[#093624]/15 text-[#093624] border border-[#093624]/30 font-bold';
                bodyBgClass = 'bg-[#BAC944]';
                footerClasses = 'bg-[#A6B736]/30 border-[#093624] text-[#093624]';
                footerIconClass = 'text-[#093624]';
                footerCmdClass = 'text-[#093624] font-semibold';
              }

              return (
                <div className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${containerClasses}`}>
                  
                  {/* Scanline CRT overlay */}
                  <div 
                    className={`absolute inset-0 pointer-events-none z-20 ${
                      (isSkyBlueStep || isYellowStep || isExecutionStep || isLimeStep) ? 'opacity-0' : 'opacity-20'
                    }`}
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)'
                    }}
                  />

                  {/* Terminal Titlebar */}
                  {isExecutionStep ? (
                    <div className="bg-[#BAE6FD] border-b border-[#38BDF8]/50 px-3 sm:px-4 pt-2 pb-1.5 flex flex-col gap-1.5 select-none">
                      {/* Browser top row: dots + tab + right controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                          </div>
                          {/* Active Tab */}
                          <div className="bg-[#E0F2FE] px-3 py-0.5 rounded-t-md text-[8.5px] font-mono text-[#0369A1] font-bold border-t border-x border-[#38BDF8]/40 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                            <span>content_engine</span>
                          </div>
                        </div>
                        {/* Right: Window Controls */}
                        <div className="flex items-center gap-2 text-[#0284C7] opacity-60">
                          <span className="w-2.5 h-0.5 bg-[#0284C7] block" />
                          <div className="w-2 h-2 border border-[#0284C7]" />
                          <span className="text-[10px] leading-none font-bold">✕</span>
                        </div>
                      </div>
                      {/* Search/URL bar */}
                      <div className="w-full bg-white rounded-full h-4 sm:h-5 px-3 border border-[#38BDF8]/50 flex items-center shadow-xs">
                        <div className="w-2 h-2 rounded-full bg-[#38BDF8]/60 mr-1.5 shrink-0" />
                        <span className="text-[8px] sm:text-[9px] font-mono text-[#0284C7]/80 truncate">https://engine.arch/pipeline/content_engine</span>
                      </div>
                    </div>
                  ) : isSkyBlueStep ? null : (
                    <div className={`px-3.5 py-2 border-b flex items-center justify-between text-[11px] font-mono transition-colors duration-300 ${titlebarClasses}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#EF4444] ${isYellowStep || isLimeStep ? 'border border-[#093624]/30' : ''}`} />
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#F59E0B] ${isYellowStep || isLimeStep ? 'border border-[#093624]/30' : ''}`} />
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#10B981] ${isYellowStep || isLimeStep ? 'border border-[#093624]/30' : ''}`} />
                        <span className={`ml-1 ${titlebarTagClass}`}>
                          {current.visualTag}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${stepBadgeClasses}`}>
                        STEP {current.stepNum}
                      </span>
                    </div>
                  )}

                  {/* 1-Bit Dither Graphic Box */}
                  <div 
                    className={`relative ${(isExecutionStep || isSkyBlueStep) ? 'p-2 sm:p-3' : 'p-5 sm:p-6'} flex items-center justify-center min-h-[210px] sm:min-h-[235px] overflow-hidden transition-colors duration-300 ${bodyBgClass}`}
                    style={(isExecutionStep || isSkyBlueStep) ? {
                      backgroundColor: '#BAE6FD',
                      backgroundImage: 'radial-gradient(#38BDF8 1.5px, transparent 1.5px)',
                      backgroundSize: '16px 16px'
                    } : undefined}
                  >
                    
                    {/* Background Dither Noise Mesh (Hidden for clean colored steps) */}
                    {!isYellowStep && !isExecutionStep && !isSkyBlueStep && !isLimeStep && (
                      <div 
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage: 'radial-gradient(#C084FC 1.2px, transparent 1.2px)',
                          backgroundSize: '6px 6px'
                        }}
                      />
                    )}

                    {/* Dither Graphic Content based on Active Step */}
                    <div className="relative z-10 w-full flex flex-col items-center">
                      
                      {activeStep === 0 && (
                        /* Step 1: Kickoff call */
                        <div className="w-full max-w-[280px] flex flex-col items-center animate-fade-in">
                          {/* SVG Sticker Dilate Filter for Cream #F7F4E9 outline */}
                          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                            <defs>
                              <filter id="sticker-cream-outline" x="-40%" y="-40%" width="180%" height="180%">
                                <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="3.5" />
                                <feFlood floodColor="#F7F4E9" result="CREAM_COLOR" />
                                <feComposite in="CREAM_COLOR" in2="DILATED" operator="in" result="OUTLINE" />
                                <feMerge>
                                  <feMergeNode in="OUTLINE" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                            </defs>
                          </svg>

                          <div className="w-52 h-36 rounded-lg border-2 border-[#C084FC] bg-[#1E0B36] p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(192,132,252,0.3)] relative">
                            <div className="grid grid-cols-2 gap-2 min-h-[76px]">
                              {/* JUDITH sticker cell */}
                              <div className="border border-dashed border-[#C084FC]/60 rounded p-1 flex flex-col items-center justify-between bg-[#2A0E4E]/80 relative overflow-visible">
                                {/* Surrounding styled ring container */}
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                  {/* Ambient backing glow / circle ring */}
                                  <div className="absolute inset-0 rounded-full border border-[#C084FC] bg-[#1C0F2B]/60 shadow-[0_0_8px_rgba(192,132,252,0.4)]" />
                                  
                                  {/* Sticker Cutout Image breaking slightly out of the circle */}
                                  <div className="relative z-10 w-11 h-11 -mt-1 flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                                    <img 
                                      src="/images/wren-head.png" 
                                      onError={(e) => {
                                        // Fallback to avatar if head image is missing
                                        (e.target as HTMLImageElement).src = '/images/wren-avatar.png';
                                      }}
                                      alt="JUDITH" 
                                      className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                                      style={{ filter: 'url(#sticker-cream-outline) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                                    />
                                  </div>
                                </div>
                                <span className="text-[8px] font-mono text-[#C084FC] mt-0.5 font-semibold">JUDITH</span>
                              </div>

                              {/* HENRY sticker cell */}
                              <div className="border border-dashed border-[#CBDA46]/60 rounded p-1 flex flex-col items-center justify-between bg-[#2A0E4E]/80 relative overflow-visible">
                                {/* Surrounding styled ring container */}
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                  {/* Ambient backing glow / circle ring */}
                                  <div className="absolute inset-0 rounded-full border border-[#CBDA46] bg-[#112419]/60 shadow-[0_0_8px_rgba(203,218,70,0.4)]" />
                                  
                                  {/* Sticker Cutout Image breaking slightly out of the circle */}
                                  <div className="relative z-10 w-11 h-11 -mt-1 flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                                    <img 
                                      src="/images/founder-head.png" 
                                      onError={(e) => {
                                        // Fallback to avatar if head image is missing
                                        (e.target as HTMLImageElement).src = '/images/founder-avatar.png';
                                      }}
                                      alt="HENRY" 
                                      className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                                      style={{ filter: 'url(#sticker-cream-outline) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                                    />
                                  </div>
                                </div>
                                <span className="text-[8px] font-mono text-[#CBDA46] mt-0.5 font-semibold">HENRY</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-end pt-1.5 border-t border-[#C084FC]/30">
                              <div className="text-[8px] font-mono text-[#E9D5FF]">$ align --goals --gtm</div>
                              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                            </div>
                          </div>
                          <div className="w-8 h-2.5 bg-[#C084FC]/60" />
                          <div className="w-48 h-1.5 bg-[#C084FC] rounded" />
                        </div>
                      )}

                      {activeStep === 1 && (
                        /* Step 2: Funnel design - ARCH://FUNNEL-MAPPER Visual Terminal Window */
                        <div className="w-full max-w-[480px] bg-white rounded-xl border-2 border-[#1E1E1E] shadow-2xl overflow-hidden select-none animate-fade-in">
                          {/* Titlebar */}
                          <div className="bg-[#D1D5DB] border-b-2 border-[#1E1E1E] px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between relative">
                            {/* Window Dots */}
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444] border border-black/20" />
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B] border border-black/20" />
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981] border border-black/20" />
                            </div>

                            {/* Center Title */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="font-jetbrains text-[10px] sm:text-xs text-black tracking-wider font-semibold">
                                ARCH : //FUNNEL-MAPPER
                              </span>
                            </div>

                            <div className="w-8" />
                          </div>

                          {/* Terminal Graphic Canvas */}
                          <div className="p-3.5 sm:p-5 md:p-6 bg-white flex items-center justify-center">
                            <svg viewBox="0 0 520 220" className="w-full h-auto select-none" fill="none">
                              {/* Left Stage Blocks */}
                              {/* [TOFU] */}
                              <rect x="16" y="16" width="116" height="42" fill="#FB923C" stroke="#1E1E1E" strokeWidth="2" />
                              <text
                                x="74"
                                y="44"
                                textAnchor="middle"
                                fontFamily="JetBrains Mono, monospace"
                                fontSize="22"
                                fontWeight="700"
                                fill="#000000"
                              >
                                [TOFU]
                              </text>

                              {/* [MOFU] */}
                              <rect x="16" y="90" width="116" height="42" fill="#FACC15" stroke="#1E1E1E" strokeWidth="2" />
                              <text
                                x="74"
                                y="118"
                                textAnchor="middle"
                                fontFamily="JetBrains Mono, monospace"
                                fontSize="22"
                                fontWeight="700"
                                fill="#000000"
                              >
                                [MOFU]
                              </text>

                              {/* [BOFU] */}
                              <rect x="16" y="164" width="116" height="42" fill="#B45309" stroke="#1E1E1E" strokeWidth="2" />
                              <text
                                x="74"
                                y="192"
                                textAnchor="middle"
                                fontFamily="JetBrains Mono, monospace"
                                fontSize="22"
                                fontWeight="700"
                                fill="#000000"
                              >
                                [BOFU]
                              </text>

                              {/* Funnel Wireframe Outline */}
                              <line x1="168" y1="16" x2="502" y2="16" stroke="#1E1E1E" strokeWidth="2" />
                              <line x1="168" y1="16" x2="238" y2="164" stroke="#1E1E1E" strokeWidth="2" />
                              <line x1="502" y1="16" x2="432" y2="164" stroke="#1E1E1E" strokeWidth="2" />

                              {/* Top Tier: [Visitors] [Webinars] [Events] */}
                              <rect x="188" y="16" width="294" height="38" fill="#FB923C" stroke="#1E1E1E" strokeWidth="2" />
                              <text
                                x="335"
                                y="40"
                                textAnchor="middle"
                                fontFamily="JetBrains Mono, monospace"
                                fontSize="12.5"
                                fontWeight="600"
                                fill="#000000"
                              >
                                [Visitors] [Webinars] [Events]
                              </text>

                              {/* Arrow Set 1 (Top -> Middle) */}
                              <g stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="270" y1="58" x2="270" y2="76" />
                                <polyline points="265,70 270,76 275,70" />

                                <line x1="335" y1="58" x2="335" y2="76" />
                                <polyline points="330,70 335,76 340,70" />

                                <line x1="400" y1="58" x2="400" y2="76" />
                                <polyline points="395,70 400,76 405,70" />
                              </g>

                              {/* Middle Tier: [Engagers] [Views] [Leads] */}
                              <rect x="204" y="90" width="262" height="38" fill="#FACC15" stroke="#1E1E1E" strokeWidth="2" />
                              <text
                                x="335"
                                y="114"
                                textAnchor="middle"
                                fontFamily="JetBrains Mono, monospace"
                                fontSize="12.5"
                                fontWeight="600"
                                fill="#000000"
                              >
                                [Engagers] [Views] [Leads]
                              </text>

                              {/* Arrow Set 2 (Middle -> Bottom) */}
                              <g stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="290" y1="132" x2="290" y2="150" />
                                <polyline points="285,144 290,150 295,144" />

                                <line x1="335" y1="132" x2="335" y2="150" />
                                <polyline points="330,144 335,150 340,144" />

                                <line x1="380" y1="132" x2="380" y2="150" />
                                <polyline points="375,144 380,150 385,144" />
                              </g>

                              {/* Bottom Tier: [Booked] [Members] */}
                              <rect x="238" y="164" width="194" height="38" fill="#B45309" stroke="#1E1E1E" strokeWidth="2" />
                              <text
                                x="335"
                                y="188"
                                textAnchor="middle"
                                fontFamily="JetBrains Mono, monospace"
                                fontSize="12.5"
                                fontWeight="600"
                                fill="#000000"
                              >
                                [Booked] [Members]
                              </text>
                            </svg>
                          </div>

                          {/* Footer Command Bar */}
                          <div className="bg-white border-t-2 border-[#1E1E1E] px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center">
                            <span className="font-jetbrains text-[10px] sm:text-xs text-black font-medium truncate">
                              &gt;_ $ map --source founder_presence --target pipeline
                            </span>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        /* Step 3: Rhythm extraction - Yellow Terminal with White/Cream Inner Card */
                        <div className="w-full max-w-[280px] flex flex-col items-center animate-fade-in space-y-2">
                          <div className="w-56 p-3.5 rounded-xl border-2 border-[#093624] bg-[#FFFDF7] shadow-[3px_3px_0px_#093624] space-y-2.5">
                            <div className="flex items-center justify-between text-[9px] font-mono text-[#093624] border-b-2 border-[#093624]/20 pb-1.5">
                              <span className="font-bold tracking-wider">VOICE_FREQUENCY</span>
                              <span className="text-[#093624] bg-[#CBDA46]/40 border border-[#093624]/40 px-1.5 py-0.5 rounded text-[8px] font-black">100% HUMAN</span>
                            </div>
                            <div className="h-10 flex items-center justify-center gap-1.5 bg-[#FEF9C3]/50 rounded-lg p-1.5 border border-[#093624]/20">
                              {[6, 14, 26, 18, 34, 22, 30, 16, 32, 24, 18, 8].map((h, i) => (
                                <div 
                                  key={i} 
                                  className="w-1.5 bg-[#D97706] rounded-full animate-pulse"
                                  style={{ 
                                    height: `${h}px`,
                                    animationDelay: `${i * 0.08}s` 
                                  }}
                                />
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 text-[8px] font-mono font-bold">
                              <div className="bg-[#FEF08A] border border-[#093624] rounded px-1.5 py-1 text-[#093624] text-center shadow-[1px_1px_0px_#093624]">
                                • POSITIONING
                              </div>
                              <div className="bg-[#FEF08A] border border-[#093624] rounded px-1.5 py-1 text-[#093624] text-center shadow-[1px_1px_0px_#093624]">
                                • ICP_OFFERS
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 3 && (
                        /* Step 4: End-to-end execution - Live Content Engine Terminal (Short & Compact) */
                        <div className="w-full max-w-[460px] bg-[#1D2127] rounded-xl border border-black/50 shadow-2xl overflow-hidden select-none animate-fade-in">
                          {/* Terminal Titlebar */}
                          <div className="bg-[#262B33] border-b border-[#343B45] px-3 py-1.5 flex items-center justify-between relative">
                            {/* Left: Window Dots */}
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            </div>
                            {/* Center: Title */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="font-jetbrains text-[9px] sm:text-[10px] text-[#94A3B8] tracking-wider font-bold">
                                ARCH://CONTENT-ENGINE
                              </span>
                            </div>
                            <div className="w-6" />
                          </div>

                          {/* Terminal Body: 3 Process Cards */}
                          <div className="p-2 sm:p-2.5 space-y-1.5 sm:space-y-2 bg-[#1D2127]">
                            
                            {/* Card 1: Gold / Yellow Outline */}
                            <div className="border border-[#FACC15]/80 rounded-lg px-2.5 py-1.5 text-[#FEF08A] font-jetbrains text-[8px] sm:text-[9px] md:text-[9.5px] leading-snug space-y-0.5 bg-[#171A1F]/60 shadow-xs">
                              <div className="flex items-baseline justify-between gap-1 flex-wrap">
                                <span>&gt;&gt;_ init content_pipeline...</span>
                                <span className="text-[#86EFAC] font-bold">[ OK ]</span>
                              </div>
                              <div>&gt;&gt;_ checking assets... 243 items found.</div>
                              <div>
                                <span>&gt;&gt;_ </span>
                                <span className="text-[#FACC15] font-bold">[ WRITING ]</span>
                                <span> 5 new articles queued... (45% complete)</span>
                              </div>
                            </div>

                            {/* Card 2: Sky Blue / Cyan Outline */}
                            <div className="border border-[#38BDF8]/80 rounded-lg px-2.5 py-1.5 text-[#7DD3FC] font-jetbrains text-[8px] sm:text-[9px] md:text-[9.5px] leading-snug space-y-0.5 bg-[#171A1F]/60 shadow-xs">
                              <div>&gt;&gt;_ processing metadata... tagging complete.</div>
                              <div>
                                <span>&gt;&gt;_ </span>
                                <span className="text-[#34D399] font-bold">[ PUBLISHING ]</span>
                                <span> 3 posts live on staging... (85% complete)</span>
                              </div>
                            </div>

                            {/* Card 3: Violet / Purple Outline */}
                            <div className="border border-[#C084FC]/80 rounded-lg px-2.5 py-1.5 text-[#D8B4FE] font-jetbrains text-[8px] sm:text-[9px] md:text-[9.5px] leading-snug space-y-0.5 bg-[#171A1F]/60 shadow-xs">
                              <div>&gt;&gt;_ content syndication active.</div>
                              <div>&gt;&gt;_ performance metrics loaded.</div>
                              <div>
                                <span>&gt;&gt;_ </span>
                                <span className="text-[#4ADE80] font-bold">[ SUCCESS ]</span>
                                <span> All tasks finalized. System ready.</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>&gt;&gt;_ terminal prompt</span>
                                <span className="font-bold tracking-wider inline-flex items-center text-[#E9D5FF]">
                                  [_<span className="inline-block w-1.5 h-3 bg-[#D8B4FE] animate-pulse ml-0.5" />]
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {activeStep === 4 && (
                        /* Step 5: Results - #BAC944 Terminal with White/Cream Inner Card */
                        <div className="w-full max-w-[280px] flex flex-col items-center animate-fade-in space-y-2">
                          <div className="w-56 p-3.5 rounded-xl border-2 border-[#093624] bg-[#FFFDF7] shadow-[3px_3px_0px_#093624] space-y-2.5">
                            <div className="flex items-center justify-between text-[9px] font-mono text-[#093624] border-b-2 border-[#093624]/20 pb-1.5">
                              <span className="font-bold tracking-wider">PIPELINE_GROWTH</span>
                              <span className="font-black text-[#093624] bg-[#BAC944]/60 border border-[#093624]/40 px-1.5 py-0.5 rounded text-[8px]">+2.4x ARR</span>
                            </div>
                            <div className="h-12 flex items-end justify-between px-2">
                              <div className="w-4 bg-[#8A9B28] h-3 rounded-t border border-[#093624]" />
                              <div className="w-4 bg-[#8A9B28] h-5 rounded-t border border-[#093624]" />
                              <div className="w-4 bg-[#8A9B28] h-8 rounded-t border border-[#093624]" />
                              <div className="w-4 bg-[#8A9B28] h-10 rounded-t border border-[#093624]" />
                              <div className="w-4 bg-[#093624] h-12 rounded-t animate-pulse border border-[#093624]" />
                            </div>
                            <div className="flex justify-between text-[8px] font-mono font-bold text-[#093624] pt-1 border-t-2 border-[#093624]/20">
                              <span>EXECUTION: 100%</span>
                              <span className="text-[#093624] bg-[#BAC944]/40 px-1 py-0.5 rounded border border-[#093624]/30">REPORT: CLEAN</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Terminal Command Footer */}
                  {isExecutionStep || isSkyBlueStep ? null : (
                    <div className={`px-4 py-2.5 border-t flex items-center gap-2 font-mono text-[10px] transition-colors duration-300 ${footerClasses}`}>
                      <Terminal className={`w-3.5 h-3.5 shrink-0 ${footerIconClass}`} />
                      <span className={`truncate ${footerCmdClass}`}>
                        {current.terminalCommand}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

          </div>

          {/* Right Column: SCROLLABLE "Our Process" Step Stream */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Heading: How We Get You There */}
            <div className="mb-8 sm:mb-12">
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#093624] tracking-tight leading-[0.95]">
                How We Get You There
              </h2>
            </div>

            {/* Scrollable Step Cards Stream */}
            <div className="space-y-6 sm:space-y-8 pb-12">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={step.id}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    onClick={() => handleStepClick(idx)}
                    className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#093624] bg-white shadow-[6px_6px_0px_#093624] translate-x-0'
                        : 'border-[#093624]/20 bg-[#FAF7F0] hover:border-[#093624]/60 hover:bg-white'
                    }`}
                  >
                    {/* Header: Step Number & Arrow */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-black transition-colors ${
                        isActive 
                          ? 'border-[#093624] bg-[#CBDA46] text-[#093624]' 
                          : 'border-[#093624]/30 bg-transparent text-[#6F7A6E]'
                      }`}>
                        {step.stepNum}
                      </span>

                      <div className={`w-7 h-7 rounded-full border border-[#093624]/20 flex items-center justify-center transition-transform ${
                        isActive ? 'bg-[#093624] text-[#CBDA46] rotate-45' : 'text-[#6F7A6E]'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Step Title (Exact copy) */}
                    <h3 className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                      isActive ? 'text-[#093624]' : 'text-[#2D4537]'
                    }`}>
                      {step.title}
                    </h3>

                    {/* Step Description (Exact copy) */}
                    <p className="mt-2.5 text-base sm:text-lg text-[#334155] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

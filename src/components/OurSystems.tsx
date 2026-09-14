import React, { useState } from 'react';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface OurSystemsProps {
  onOpenBooking?: () => void;
}

interface StepData {
  stepNumber: string;
  shortName: string;
  tabLabel: string;
  category: string;
  title: string;
  description: string;
  items: string[];
  tapeColor: string;
  circleColor: string;
  dotColor: string;
}

export const OurSystems: React.FC<OurSystemsProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const steps: StepData[] = [
    {
      stepNumber: "01",
      shortName: "Foundation",
      tabLabel: "01. Foundation",
      category: "Strategy & Positioning",
      title: "01. Foundation",
      description: "Build the strategic foundation your GTM runs on and get clear on who you're selling to and why they should care.",
      items: [
        "Nail your ICP",
        "Fine-tune your positioning",
        "Build your unique differentiation",
        "Define your voice and identity",
        "Design the GTM funnel & conversion paths",
        "Founder voice, identity, and POV",
        "Message",
        "Structure your offer",
      ],
      tapeColor: "#CBDA46", // Brand Wattle Lime
      circleColor: "#CBDA46",
      dotColor: "#CBDA46",
    },
    {
      stepNumber: "02",
      shortName: "Demand",
      tabLabel: "02. Demand",
      category: "Demand Generation",
      title: "02. Demand",
      description: "Turn your expertise into consistent content, market attention, and buying intent.",
      items: [
        "Founder-led content",
        "Channel strategy",
        "Content distribution",
        "Lead magnets",
        "Content across the buying journey (TOFU / MOFU / BOFU)",
        "Capture & route buying signals",
        "Warm outbound",
      ],
      tapeColor: "#FF7A5C", // Warm Coral Terracotta
      circleColor: "#FF7A5C",
      dotColor: "#FF7A5C",
    },
    {
      stepNumber: "03",
      shortName: "Pipeline",
      tabLabel: "03. Pipeline",
      category: "Conversion & Pipeline",
      title: "03. Pipeline",
      description: "Turn attention and intent into qualified sales conversations.",
      items: [
        "Lead qualification",
        "Follow-up",
        "Conversion",
        "Generate demand and qualified pipeline",
        "Pipeline management, reporting & optimization",
      ],
      tapeColor: "#38BDF8", // Crisp Sky Blue
      circleColor: "#38BDF8",
      dotColor: "#38BDF8",
    }
  ];

  const currentStep = steps[activeTab];

  return (
    <section 
      id="systems-section" 
      className="py-16 sm:py-24 notebook-grid-bg relative border-b border-[#093624]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow */}
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#6F7A6E] uppercase mb-3">
            HOW WE RUN IT
          </p>

          {/* Main Title - Split cleanly into two lines */}
          <h2 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-[#093624] tracking-tight leading-[1.15]">
            <span className="block">How the Founder-Led</span>
            <span className="block">GTM Engine works</span>
          </h2>

          {/* Subheading */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-[1.15rem] text-[#15543D] font-normal leading-relaxed max-w-2xl mx-auto">
            From your unfiltered thoughts to a predictable pipeline of high-intent enterprise buyers, executed completely for you.
          </p>
        </div>

        {/* Pill Tabs Bar - Optimized and compacted on mobile screens */}
        <div className="flex justify-center mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-white/75 border border-[#093624]/15 shadow-xs backdrop-blur-xs max-w-full overflow-x-auto scrollbar-none">
            {steps.map((step, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#093624] text-white shadow-xs'
                      : 'text-[#6F7A6E] hover:text-[#093624] hover:bg-black/5'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 transition-colors duration-200"
                    style={{
                      backgroundColor: isActive ? step.dotColor : '#94A3B8'
                    }}
                  />
                  <span>
                    <span className="hidden sm:inline">{step.stepNumber}. </span>
                    <span>{step.shortName}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Washi tape tab sticking out top-left - dynamic color per step */}
          <div 
            className="absolute -top-3 sm:-top-3.5 left-8 sm:left-12 w-14 sm:w-16 h-5 sm:h-5.5 border border-[#093624]/15 rounded-t-xs z-20 shadow-2xs transition-colors duration-300"
            style={{ backgroundColor: currentStep.tapeColor }}
            aria-hidden="true"
          />

          {/* Card Body */}
          <div 
            key={currentStep.stepNumber}
            className="relative z-10 bg-[#EAF1E7] border border-[#093624]/15 rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 shadow-xl shadow-[#093624]/5 animate-in fade-in duration-200"
          >
            {/* Top Row: Category Tag on Left, Step Number Circle on Right */}
            <div className="flex items-center justify-between gap-4">
              {/* Category Pill with Clock Icon */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 border border-[#093624]/10 text-xs sm:text-sm font-medium text-[#093624] shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#093624]/70" />
                <span>{currentStep.category}</span>
              </div>

              {/* Step Number Round Badge - matching washi tape color */}
              <div 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#093624]/10 flex items-center justify-center font-serif font-bold text-lg sm:text-xl text-[#093624] shadow-xs shrink-0 transition-colors duration-300"
                style={{ backgroundColor: currentStep.circleColor }}
              >
                {currentStep.stepNumber}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#093624] tracking-tight mt-5 sm:mt-6">
              {currentStep.title}
            </h3>

            {/* Description */}
            <p className="mt-2.5 sm:mt-3 text-[#15543D] text-sm sm:text-base md:text-[17px] font-normal leading-relaxed max-w-2xl">
              {currentStep.description}
            </p>

            {/* Subtle Divider */}
            <div className="w-full border-b border-[#093624]/10 my-6 sm:my-8" />

            {/* Checklist Items: 3 Columns on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              {currentStep.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/95 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-3 sm:py-3.5 border border-[#093624]/10 flex items-center gap-2.5 sm:gap-3 shadow-xs hover:border-[#093624]/25 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#093624] shrink-0 stroke-[2.2]" />
                  <span className="text-xs sm:text-[13px] font-medium text-[#093624] leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Nav Bar inside card: dashed divider above, < Previous and Next > buttons */}
            <div className="border-t border-dashed border-[#093624]/15 pt-5 sm:pt-6 mt-6 sm:mt-8 flex items-center justify-end gap-2.5">
              <button
                id="systems-prev-btn"
                onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
                disabled={activeTab === 0}
                aria-label="Previous step"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#093624] border border-[#093624]/15 text-xs sm:text-sm font-medium shadow-2xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                id="systems-next-btn"
                onClick={() => setActiveTab(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={activeTab === steps.length - 1}
                aria-label="Next step"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#093624] border border-[#093624]/15 text-xs sm:text-sm font-medium shadow-2xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Centered CTA Button below card */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Button
            id="systems-cta-tell-me-more"
            variant="primary"
            size="md"
            showSparkles={false}
            onClick={onOpenBooking}
            className="text-base sm:text-lg px-8 py-3.5 cursor-pointer font-bold tracking-wide"
          >
            Tell me more
          </Button>
        </div>

      </div>
    </section>
  );
};

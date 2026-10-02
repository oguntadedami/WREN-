import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Tape } from './ScrapbookAssets';

interface LaunchChecklistPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string, sectionId?: string) => void;
}

export const LaunchChecklistPage: React.FC<LaunchChecklistPageProps> = ({
  onNavigate,
}) => {
  // Active toggle: 'new-launch' or 're-launch'
  const [activeTab, setActiveTab] = useState<'new-launch' | 're-launch'>('new-launch');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#EEF2CC] text-[#093624] pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 selection:bg-[#CBDA46] selection:text-[#093624] relative">
      
      {/* Light sage/green grid background matching the AI page's backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9, 54, 36, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9, 54, 36, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* ========================================================================= */}
      {/* SINGLE CONTINUOUS CONTAINER (Matches /for-ai page container treatment)    */}
      {/* ========================================================================= */}
      <div 
        className="w-full max-w-[1000px] mx-auto bg-[#F4F1EA] border-2 border-[#093624] rounded-md shadow-[6px_6px_0px_#093624] sm:shadow-[8px_8px_0px_#093624] relative overflow-hidden p-6 sm:p-10 md:p-14"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(9, 54, 36, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(9, 54, 36, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Subtle decorative tape on top edge of workbook */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 bg-[#CBDA46]/40 border border-[#093624]/20 rotate-[-1deg] pointer-events-none z-10" />

        {/* ======================================================================= */}
        {/* HEADER                                                                  */}
        {/* ======================================================================= */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('free-stuff');
              else window.location.hash = '#free-stuff';
            }}
            className="inline-flex items-center gap-2 font-sans font-semibold text-xs sm:text-sm text-[#093624]/70 hover:text-[#093624] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Free stuff</span>
          </button>
        </div>

        <h1 className="font-display font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#093624] tracking-tight leading-[1.2] mb-4">
          Are there things you should know before you launch or relaunch your product?
        </h1>

        <p className="font-display font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#15543D] leading-snug mb-8">
          Yes! And you’ve probably heard most of them before.
        </p>

        {/* Thin divider line */}
        <div className="w-full border-b border-[#093624]/15 mb-8 sm:mb-10" />

        {/* ======================================================================= */}
        {/* INTRO                                                                   */}
        {/* ======================================================================= */}
        <div className="space-y-4 font-sans text-base sm:text-lg text-[#0E1A15]/90 leading-relaxed mb-8">
          <p>
            There’s a lot that goes into a product launch, and it can quickly become overwhelming when it’s near time to launch.
          </p>
          <p className="font-bold text-[#093624]">
            That’s why we built this checklist.
          </p>
          <p>
            This checklist will help you figure out what to prioritize, what to push back, and what to leave out completely.
          </p>
        </div>

        {/* Thin divider line */}
        <div className="w-full border-b border-[#093624]/15 mb-8 sm:mb-10" />

        {/* ======================================================================= */}
        {/* HOW TO USE IT (Card matching "Wren at a glance" treatment)               */}
        {/* ======================================================================= */}
        <div className="group relative transition-all duration-300">
          <div className="absolute -top-3 right-6 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
            <Tape className="w-24 sm:w-28 h-5 sm:h-6 rotate-2 border border-[#093624]/10 shadow-xs" color="#F5A621" />
          </div>
          <div 
            className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[0.5deg]"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          />
          <div 
            className="relative z-10 p-6 sm:p-8 bg-white text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-start"
            style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
          >
            <h2 className="font-display font-serif font-bold text-xl sm:text-2xl text-[#093624] mb-3">
              How to use it
            </h2>
            <div className="space-y-3 font-sans text-sm sm:text-base md:text-lg text-[#093624]/90 leading-relaxed">
              <p>
                Download it and keep it wherever you manage your work, whether that&apos;s Notion, Google Docs, or your favourite project management tool.
              </p>
              <p>
                Use it to guide what needs to happen each day as you work towards your <strong className="font-bold text-[#093624]">BIG</strong> launch day.
              </p>
            </div>
          </div>
        </div>

        {/* Thin divider line */}
        <div className="w-full border-b border-[#093624]/15 my-8 sm:my-10" />

        {/* ======================================================================= */}
        {/* SECTION SPLIT + TOGGLE                                                  */}
        {/* ======================================================================= */}
        <div className="text-center mb-8">
          <h2 className="font-display font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#093624] mb-6">
            We&apos;ve split the checklist into two sections:
          </h2>

          {/* Existing toggle component (kept pixel-for-pixel) */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1.5 rounded-full bg-white/95 border border-[#093624]/15 shadow-sm gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('new-launch')}
                className={`font-sans font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer select-none ${
                  activeTab === 'new-launch'
                    ? 'bg-[#093624] text-white shadow-xs'
                    : 'text-[#093624]/70 hover:text-[#093624] hover:bg-[#093624]/5'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    activeTab === 'new-launch' ? 'bg-[#CBDA46] animate-pulse' : 'bg-[#093624]/30'
                  }`}
                />
                <span>01. New Launch</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('re-launch')}
                className={`font-sans font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer select-none ${
                  activeTab === 're-launch'
                    ? 'bg-[#093624] text-white shadow-xs'
                    : 'text-[#093624]/70 hover:text-[#093624] hover:bg-[#093624]/5'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    activeTab === 're-launch' ? 'bg-[#CBDA46] animate-pulse' : 'bg-[#093624]/30'
                  }`}
                />
                <span>02. Re-launches</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* ACTIVE SECTION CARD (Matches AI page's numbered-card language)          */}
        {/* ======================================================================= */}
        <div className="group relative transition-all duration-300">
          {/* Small colored tape accent in corner (alternating lime / coral) */}
          <div className="absolute -top-3 right-8 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
            <Tape 
              className="w-24 sm:w-28 h-5 sm:h-6 rotate-2 border border-[#093624]/10 shadow-xs" 
              color={activeTab === 'new-launch' ? '#CBDA46' : '#FF7A5C'} 
            />
          </div>

          {/* Hand-drawn offset shadow */}
          <div 
            className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          />

          {/* Main Card */}
          <div 
            className="relative z-10 p-6 sm:p-8 md:p-10 bg-white text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6]"
            style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
          >
            {/* Circular numbered badge and Title */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
              <div 
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#093624] flex items-center justify-center font-display font-bold text-base sm:text-lg text-[#093624] shrink-0 shadow-[2px_2px_0px_#093624] transition-colors duration-300 ${
                  activeTab === 'new-launch' ? 'bg-[#CBDA46]' : 'bg-[#FF7A5C]'
                }`}
              >
                {activeTab === 'new-launch' ? '01' : '02'}
              </div>
              <h3 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight">
                {activeTab === 'new-launch' ? 'New launch?' : 'Re-launches?'}
              </h3>
            </div>

            {/* Body copy */}
            <p className="font-sans text-base sm:text-lg text-[#15543D] leading-relaxed mb-6 sm:mb-8">
              {activeTab === 'new-launch'
                ? 'Everything you need to think about when launching a new product is here.'
                : 'For when your product has already launched, and you’re getting ready to do it again.'}
            </p>

            {/* Button: "⬇ Give it to me" with existing button styling */}
            <div>
              <Button
                variant="secondary"
                size="md"
                href={
                  activeTab === 'new-launch'
                    ? 'https://wren.fillout.com/product-launch-checklist'
                    : 'https://wren.fillout.com/relaunch-checklist'
                }
                target="_blank"
                rel="noopener noreferrer"
                showSparkles={false}
                className="font-bold text-sm w-full sm:w-auto"
              >
                <span className="mr-1.5">⬇</span>
                <span>Give it to me</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CLOSING MESSAGE (Highlighted callout box WITHIN the container)          */}
        {/* ======================================================================= */}
        <div className="mt-12 sm:mt-16 group relative transition-all duration-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
            <Tape className="w-28 sm:w-32 h-5 sm:h-6 -rotate-1 border border-[#093624]/10 shadow-xs" color="#CBDA46" />
          </div>
          <div 
            className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/20 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          />
          <div 
            className="relative z-10 p-6 sm:p-8 md:p-10 bg-[#093624] text-[#F7F4E9] border-2 border-[#093624] transition-all duration-300 text-center"
            style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
          >
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#F7F4E9] font-medium leading-relaxed mb-3">
              Work through it, tick things off, and keep moving... and maybe tell us how it goes for you.
            </p>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#CBDA46] font-medium leading-relaxed max-w-2xl mx-auto">
              And hopefully, it saves you from forgetting the little things that become very big things three days before launch.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

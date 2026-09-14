import React, { useRef, useState } from 'react';
import {
  TangledWrenIllustration,
  FeatherStormIllustration,
  NestWeavingIllustration,
  BirdFlightIllustration,
  NestEggIllustration,
} from './illustrations';
import { RealisticSpiralBindingRow } from './challenge/RealisticSpiralBand';
import { Button } from './Button';

interface TheChallengeProps {
  onOpenBooking?: () => void;
}

// Hand-Drawn Realistic Chisel Marker Swipe Highlight Component
const Highlight: React.FC<{ 
  color?: 'wattle' | 'coral'; 
  rotation?: 'left' | 'right' | 'none';
  children: React.ReactNode 
}> = ({
  color = 'wattle',
  rotation = 'none',
  children,
}) => {
  const isCoral = color === 'coral';
  const baseColor = isCoral ? '#FF7A5C' : '#CBDA46';
  const secondaryStreak = isCoral ? '#FFA38F' : '#E2EE78';
  const deepStreak = isCoral ? '#E65233' : '#A2B81F';

  const rotClass = 
    rotation === 'left' ? '-rotate-1.5' : 
    rotation === 'right' ? 'rotate-1' : 
    'rotate-[0.8deg]';

  return (
    <span className={`relative inline-block px-1.5 py-0.5 mx-0.5 align-baseline ${rotClass}`}>
      {/* Hand-dragged Marker Wash with Organic Ink Streaks & Wobbly Chisel Edge */}
      <svg
        className="absolute -inset-x-2.5 -inset-y-1 w-[calc(100%+20px)] h-[calc(100%+8px)] -z-10 overflow-visible pointer-events-none"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`markerGrad-${isCoral ? 'coral' : 'wattle'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.55" />
            <stop offset="4%" stopColor={baseColor} stopOpacity="0.65" />
            <stop offset="28%" stopColor={secondaryStreak} stopOpacity="0.45" />
            <stop offset="68%" stopColor={baseColor} stopOpacity="0.52" />
            <stop offset="96%" stopColor={deepStreak} stopOpacity="0.58" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Main Irregular Marker Swipe (Heavy chisel start, organic path wobble, slight end flick) */}
        <path
          d="M 1.5 4 C 16 2.2, 44 4.8, 76 3 C 88 2.2, 95.5 3.8, 99 5.5 C 99.8 11.5, 98.2 17, 96.5 21 C 81 22.8, 50 20.2, 21 22 C 8 22.8, 2.5 19.5, 0.8 14.5 C -0.2 9.5, 0.5 5.8, 1.5 4 Z"
          fill={`url(#markerGrad-${isCoral ? 'coral' : 'wattle'})`}
        />

        {/* Faint Internal Streak / Marker Pressure Line 1 (Upper drag channel) */}
        <path
          d="M 2.5 7.5 C 24 5.8, 56 7.2, 86 5.8 C 93 5.2, 97.5 7, 98 8"
          stroke={secondaryStreak}
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Faint Internal Streak / Marker Pressure Line 2 (Lower wet ink drag) */}
        <path
          d="M 3.5 16.5 C 29 18.2, 63 16.2, 88 17.8 C 93.5 18.2, 95.8 17.2, 97 15.8"
          stroke={deepStreak}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* Marker Ink pooling at start (left chisel edge press mark) */}
        <path
          d="M 1 5.5 C 1.6 9.5, 1.4 14.5, 1.1 18.5"
          stroke={deepStreak}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Marker Ink release trail at end (right overshoot trail) */}
        <path
          d="M 95.5 6.5 C 97.5 9.5, 98.8 13.5, 97.2 19"
          stroke={baseColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
};

// Ornate Storybook Botanical Vine-Wrapped Drop-Cap
const DashedDropCap: React.FC<{ letter: string }> = ({ letter }) => (
  <span 
    className="float-left mr-4 sm:mr-6 mb-2 select-none inline-block align-top"
    aria-hidden="true"
  >
    <span className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
      {/* Hand-Drawn Botanical Vine Illustration Frame (SVG) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] overflow-visible pointer-events-none -z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Watercolor Sage / Wattle Wash under leaf clusters */}
        <ellipse cx="20" cy="38" rx="14" ry="20" fill="#CBDA46" fillOpacity="0.25" />
        <ellipse cx="48" cy="14" rx="18" ry="10" fill="#CBDA46" fillOpacity="0.25" />
        <ellipse cx="24" cy="74" rx="12" ry="16" fill="#A8C4A0" fillOpacity="0.2" />

        {/* Primary Vine Stem - curling up the left and arching over the top */}
        <path
          d="M 26 94 C 18 84, 10 68, 11 48 C 12 28, 22 14, 42 9 C 56 6, 72 8, 86 16"
          stroke="#093624"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Secondary Delicate Tendril Branch curling over top right */}
        <path
          d="M 42 9 C 54 4, 68 5, 80 10 C 88 14, 94 20, 93 28 C 92 34, 86 35, 84 31 C 82 27, 85 23, 89 24"
          stroke="#15543D"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Delicate Base Tendril Spiral */}
        <path
          d="M 26 94 C 30 98, 38 100, 44 96 C 48 93, 47 87, 42 86 C 38 85, 36 89, 39 92"
          stroke="#15543D"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Delicate Mid-Stem Tendril Loop */}
        <path
          d="M 11 44 C 4 40, 2 32, 7 26 C 11 22, 16 25, 14 30 C 12 34, 8 33, 7 30"
          stroke="#093624"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Botanical Leaves with Wattle Green Wash and Fine Ink Outlines */}
        {/* Leaf 1 - Top Arch Center */}
        <path
          d="M 52 7 C 54 0, 64 2, 63 9 C 58 11, 53 10, 52 7 Z"
          fill="#CBDA46"
          fillOpacity="0.75"
          stroke="#093624"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Leaf 2 - Top Arch Left */}
        <path
          d="M 34 11 C 30 4, 38 -1, 43 4 C 41 9, 36 12, 34 11 Z"
          fill="#EEF2CC"
          fillOpacity="0.9"
          stroke="#093624"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Leaf 3 - Upper Left Outer */}
        <path
          d="M 12 28 C 4 23, 5 13, 14 17 C 16 22, 14 26, 12 28 Z"
          fill="#CBDA46"
          fillOpacity="0.75"
          stroke="#093624"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Leaf 4 - Mid Left */}
        <path
          d="M 9 52 C 1 50, 2 60, 11 58 C 13 54, 11 51, 9 52 Z"
          fill="#EEF2CC"
          fillOpacity="0.9"
          stroke="#093624"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Leaf 5 - Lower Left Outer */}
        <path
          d="M 16 74 C 8 78, 12 88, 20 83 C 20 78, 18 75, 16 74 Z"
          fill="#CBDA46"
          fillOpacity="0.75"
          stroke="#093624"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Leaf 6 - Top Right Accent Leaf */}
        <path
          d="M 76 11 C 82 6, 88 12, 83 17 C 78 17, 75 14, 76 11 Z"
          fill="#CBDA46"
          fillOpacity="0.7"
          stroke="#093624"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Small Botanical Accent Berries / Spores */}
        <circle cx="28" cy="8" r="2" fill="#CBDA46" stroke="#093624" strokeWidth="1" />
        <circle cx="9" cy="38" r="1.8" fill="#FF7A5C" fillOpacity="0.85" stroke="#093624" strokeWidth="0.9" />
        <circle cx="24" cy="90" r="1.8" fill="#CBDA46" stroke="#093624" strokeWidth="0.9" />
      </svg>
      
      {/* Drop Cap Letter: Bold, high-contrast Serif (IBM Plex Serif), Bottle Green */}
      <span className="relative z-10 font-serif font-black text-5xl sm:text-7xl text-[#093624] leading-none tracking-tight pl-1">
        {letter}
      </span>
    </span>
  </span>
);

// Vintage Storybook Chapter Title Banner
const ChapterBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-[#093624] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#F7F4E9] shadow-xs border border-[#15543D]">
    <span className="w-1.5 h-1.5 rounded-full bg-[#CBDA46]" />
    {children}
  </div>
);

// Hand-Drawn Wavy Underline Flourish (Storybook Style)
const WavyFlourish: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    viewBox="0 0 180 14" 
    className={`w-32 sm:w-44 h-auto text-[#093624]/80 overflow-visible ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M4 7 C 12 2, 20 2, 28 7 C 36 12, 44 12, 52 7 C 60 2, 68 2, 76 7 C 84 12, 92 12, 100 7 C 108 2, 116 2, 124 7 C 132 12, 140 12, 148 7 C 156 2, 164 2, 172 7 L 176 7" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
    />
    <circle cx="2" cy="7" r="1.5" fill="currentColor" />
    <circle cx="178" cy="7" r="1.5" fill="currentColor" />
  </svg>
);

export const TheChallenge: React.FC<TheChallengeProps> = ({ onOpenBooking }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  return (
    <section id="challenge-section" className="relative mx-auto my-16 sm:my-24 max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
      
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
        <div className="relative pt-1 pb-2 flex items-center justify-between px-4 sm:px-8 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CBDA46] shadow-[0_0_8px_#CBDA46]" />
            <span className="h-px w-8 sm:w-16 bg-[#CBDA46]/40" />
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 sm:w-16 bg-[#CBDA46]/40" />
            <span className="w-2 h-2 rounded-full bg-[#CBDA46] shadow-[0_0_8px_#CBDA46]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HUGE REALISTIC CREAM SPIRAL BANDS OVERLAP */}
        {/* ========================================================================= */}
        <div className="relative -my-3 sm:-my-4 z-40">
          <RealisticSpiralBindingRow count={26} />
        </div>

        {/* ========================================================================= */}
        {/* INNER CREAM NOTEBOOK PAPER PAD WITH MULTI-PAGE STACK DEPTH */}
        {/* ========================================================================= */}
        <div className="relative mt-2 rounded-[20px] sm:rounded-[24px] bg-[#FAF7EE] text-[#0E1A15] shadow-2xl border border-[#D8D0BE] overflow-hidden">
          
          {/* Subtle multi-layer cream page stack bevel at bottom */}
          <div className="absolute -bottom-1.5 inset-x-4 h-1.5 bg-[#EAE3D2] rounded-b-[20px] shadow-sm -z-10" />
          <div className="absolute -bottom-3 inset-x-8 h-1.5 bg-[#DDD4C0] rounded-b-[20px] shadow-sm -z-20" />

          {/* Paper Header: Status Bar & Live Reading Progress */}
          <div className="bg-[#F1ECE0] px-5 sm:px-8 py-3 border-b border-[#D8D0BE] flex items-center justify-end gap-3 select-none">
            {/* Reading Progress Indicator */}
            <div className="flex items-center gap-3 font-mono text-xs text-[#093624]">
              <span className="text-[11px] font-bold tracking-wider hidden sm:inline text-[#093624]/80">
                READING PROGRESS
              </span>
              <div className="w-24 sm:w-36 h-2 rounded-full bg-[#093624]/10 overflow-hidden p-0.5 border border-[#093624]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#15543D] to-[#CBDA46] rounded-full transition-all duration-150"
                  style={{ width: `${Math.round(progress)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#093624] w-9 text-right font-mono">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SCROLLABLE JOURNAL CONTENT AREA */}
          {/* ========================================================================= */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            data-lenis-prevent
            className="relative max-h-[720px] sm:max-h-[780px] overflow-y-auto overscroll-contain touch-pan-y px-6 py-8 sm:px-12 sm:py-12 md:pl-20 text-[#0E1A15]"
            style={{
              WebkitOverflowScrolling: 'touch',
              backgroundImage:
                'linear-gradient(#E8E2D2 1px, transparent 1px), linear-gradient(90deg, #E8E2D2 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          >
            {/* Classic Red / Coral Margin Rule Line */}
            <div className="pointer-events-none absolute bottom-0 left-8 sm:left-14 top-0 w-px bg-[#FF7A5C]/35" />

            {/* Main Headline Treatment: Bold Ornate Serif with Wavy Underline Swash */}
            <div className="mb-10 text-center flex flex-col items-center">
              <div className="mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2CC] border border-[#093624]/20 text-[#093624] text-xs font-mono font-bold tracking-wider uppercase">
                  THE REAL STATE OF GTM
                </span>
              </div>
              <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight uppercase">
                The Challenge
              </h2>
              {/* Hand-drawn Wavy Underline Swash */}
              <div className="mt-2 flex justify-center">
                <WavyFlourish />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* CHAPTER 1: THE STORM YOU FLEW INTO */}
            {/* ========================================================================= */}
            <article className="relative pb-10 pt-2">
              {/* Storybook Flowing Body Copy with TangledWrenIllustration breaking into the text flow */}
              <div className="text-base sm:text-[18px] leading-relaxed text-[#0E1A15] font-serif space-y-5">
                
                {/* Illustration Breaking into Text Flow (Storybook Float Right) */}
                <div className="float-right ml-4 sm:ml-8 mb-4 sm:mb-6 w-28 sm:w-36 lg:w-44 max-w-[35%] shrink-0 pointer-events-none select-none">
                  <div className="p-2 bg-[#FAF7EE]/80 rounded-2xl">
                    <TangledWrenIllustration className="w-full h-auto drop-shadow-sm" />
                  </div>
                </div>

                <p>
                  <DashedDropCap letter="Y" />
                  ou were told that Founder-led GTM is the fastest way to drive sales, meet business goals, and satisfy investors' demands.
                </p>

                <p>
                  So, you posted on LinkedIn many times with the intention that it would help you get started and have something to present in your next meeting with the board.
                </p>

                <p>
                  <Highlight color="wattle" rotation="left">
                    You did it for two weeks straight with no results, and you got frustrated and concluded that Founder-led GTM doesn't work.
                  </Highlight>
                </p>

                <p>
                  To make matters worse, the LinkedIn algorithm didn't even help your posts travel to the people who should see them. And now there is AI slop and unoriginal pieces everywhere, adding to the noise.
                </p>

                <p>
                  Then someone told you to "try cold DMs," you did, and for every 20 messages you send, you get zero replies.
                </p>

                <p>
                  Now you are stuck between a channel that seems to have failed and a board of investors who are likely to skew you alive if you don't produce a pipeline.
                </p>

                <p>
                  But somewhere in your mind, you know this works because you've seen another founder build an audience, create conversations, and turn their personal presence into customers.
                </p>

                <p className="italic text-[#093624] font-medium">
                  <Highlight color="wattle" rotation="right">
                    "So why isn't it working for me?" You've asked many times.
                  </Highlight>
                </p>

                <p>
                  What if I told you that neither of what you tried before was wrong, but the approach and strategies you used were?
                </p>

                <p className="font-bold text-[#093624] text-lg">
                  Because…
                </p>

                <p className="space-y-2">
                  <Highlight color="wattle" rotation="left">
                    Posting consistently isn't a GTM strategy.
                  </Highlight>
                  <br className="my-1.5" />
                  <span>Sending cold DMs isn't a GTM strategy.</span>
                </p>

                <p className="font-bold text-[#093624]">
                  They're all tactics.
                </p>

                <p>
                  And when you use tactics without a system behind them, you get exactly what most founders experience - a lot of effort, very little signal, and almost nothing you can reliably turn into a pipeline.
                </p>
              </div>

              {/* Clear float for next chapter */}
              <div className="clear-both" />
            </article>

            {/* ========================================================================= */}
            {/* CHAPTER 2: THE WIND HAS SHIFTED */}
            {/* ========================================================================= */}
            <article className="relative pb-10 pt-8 border-t border-[#D8D0BE]">
              {/* Storybook Flowing Body Copy with FeatherStormIllustration breaking into the text flow */}
              <div className="text-base sm:text-[18px] leading-relaxed text-[#0E1A15] font-serif space-y-5">
                
                {/* Illustration Breaking into Text Flow (Storybook Float Right) */}
                <div className="float-right ml-4 sm:ml-8 mb-4 sm:mb-6 w-36 sm:w-48 lg:w-56 max-w-[45%] shrink-0 pointer-events-none select-none">
                  <div className="p-2 bg-[#FAF7EE]/80 rounded-2xl">
                    <FeatherStormIllustration className="w-full h-auto drop-shadow-sm" />
                  </div>
                </div>

                <p>
                  <DashedDropCap letter="T" />
                  he sad reality is that the market has changed:
                </p>

                <ol className="list-decimal space-y-3.5 pl-6 marker:text-[#093624] marker:font-bold">
                  <li>
                    Buyers are agitated with seeing lots of sameness on the internet, and the last thing they want to see is another piece of content that sounds like it was written with a 2019 GPT model and a message that always reads "Hope this finds you well"
                  </li>
                  <li>
                    What worked one year ago has become outdated, and using old tactics to approach it will give you nothing but crickets.
                  </li>
                  <li>Buyers have evolved - they want a relationship first before pitching.</li>
                  <li>
                    And your message has to be unmistakably yours. There's so much noise right now than ever that standing out doesn't mean shouting louder, but saying something your ideal customer recognizes as specifically relevant to them.
                  </li>
                </ol>

                <p className="font-bold text-[#093624] text-xl pt-2">
                  So, what do you do?
                </p>

                <p>
                  Continue with your old tactics and hope that this will work someday while you keep losing time.
                </p>

                <p>
                  Or stop trying to become your own marketer, content strategist, SDR, GTM strategist, and appointment setter all at once and bring in people who have built and run the system before.
                </p>

                <div className="flex flex-wrap items-center gap-3 py-2">
                  <Highlight color="coral" rotation="left">
                    Successful founders ALWAYS choose the latter.
                  </Highlight>
                  <BirdFlightIllustration className="w-12 sm:w-16 h-auto shrink-0 opacity-90 inline-block align-middle" />
                </div>

                <p>
                  This is 2026, and social media has become a dump of sh*t. AI has made everyone a thought leader, with loads of engagement from pods that have never produced anything meaningful.
                </p>

                <p className="font-semibold text-[#093624]">
                  We have a different approach to it.
                </p>

                <p className="text-sm sm:text-base text-[#2C4136] italic bg-[#F1ECE0]/70 p-4 rounded-xl border border-[#D8D0BE]">
                  Meanwhile, if your turf is chasing vanity metrics and your next quick hack to build dopamine is to buy likes and comments—we are NOT the right fit for you, you can close this tab and leave.
                </p>
              </div>

              {/* Clear float for next chapter */}
              <div className="clear-both" />
            </article>

            {/* ========================================================================= */}
            {/* CHAPTER 3: BUILDING THE NEST */}
            {/* ========================================================================= */}
            <article className="relative pb-8 pt-8 border-t border-[#D8D0BE]">
              {/* Storybook Flowing Body Copy with NestWeavingIllustration breaking into the opening text */}
              <div className="text-base sm:text-[18px] leading-relaxed text-[#0E1A15] font-serif space-y-6">
                
                {/* Illustration Breaking into Text Flow (Storybook Float Right) */}
                <div className="float-right ml-4 sm:ml-8 mb-4 w-36 sm:w-48 lg:w-56 max-w-[45%] shrink-0 pointer-events-none select-none">
                  <div className="p-2 bg-[#FAF7EE]/80 rounded-2xl">
                    <NestWeavingIllustration className="w-full h-auto drop-shadow-sm" />
                  </div>
                </div>

                <p>
                  <DashedDropCap letter="B" />
                  ut if you care about quality, here's how we'll get that for you.
                </p>

                {/* Clear float before 3-card clearly separated block */}
                <div className="clear-both" />

                {/* 3 Scrapbook / Sticky-Note Styled Numbered Foundation Cards */}
                <div className="grid gap-6 sm:gap-4 sm:grid-cols-3 my-8 items-stretch">
                  {[
                    {
                      n: '1',
                      title: 'Build the foundation',
                      body: 'We align your ICP, positioning, offer, founder voice, and product into one clear GTM narrative.',
                      bg: 'bg-[#F9F5EB]',
                      border: 'border-[#093624]/20',
                      rotation: '-rotate-2 sm:-rotate-2.5',
                      clipPath: 'polygon(0% 4%, 6% 1%, 16% 4%, 28% 0.5%, 44% 3.5%, 60% 0.8%, 76% 3.5%, 89% 1%, 100% 3%, 99% 97%, 96% 99.5%, 82% 98%, 62% 100%, 38% 98.2%, 18% 99.5%, 0% 97%)',
                      shadow: 'drop-shadow-[3px_5px_8px_rgba(9,54,36,0.13)]',
                      pinColor: '#093624',
                    },
                    {
                      n: '2',
                      title: 'Build the demand engine',
                      body: 'We create and distribute content, an inbound system, and targeted outreach that turn your founder presence into demand and buying intent.',
                      bg: 'bg-[#EFF3CF]',
                      border: 'border-[#7E9615]/30',
                      rotation: 'rotate-1.5 sm:rotate-2',
                      clipPath: 'polygon(1% 2%, 98% 0.5%, 99.5% 18%, 98% 44%, 100% 68%, 98.5% 98%, 84% 99.5%, 56% 98.2%, 30% 100%, 2% 98.5%, 0.5% 72%, 2% 42%, 0% 18%)',
                      shadow: 'drop-shadow-[4px_6px_9px_rgba(9,54,36,0.15)]',
                      pinColor: '#093624',
                    },
                    {
                      n: '3',
                      title: 'Turn demand into pipeline',
                      body: 'We capture, qualify, and route the right opportunities to you so you can focus on the one thing only you should be doing: closing.',
                      bg: 'bg-[#FDEEE9]',
                      border: 'border-[#FF7A5C]/35',
                      rotation: '-rotate-1 sm:-rotate-1.5',
                      clipPath: 'polygon(0% 1.5%, 99% 0.5%, 100% 86%, 95% 91%, 86% 89%, 74% 94.5%, 60% 90.5%, 46% 95%, 32% 90%, 18% 95.5%, 4% 91%, 0% 86%)',
                      shadow: 'drop-shadow-[3px_5px_8px_rgba(255,122,92,0.16)]',
                      pinColor: '#093624',
                    },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className={`relative transform transition-all duration-200 hover:rotate-0 hover:scale-[1.02] ${item.rotation} ${item.shadow}`}
                    >
                      <div
                        className={`h-full ${item.bg} p-6 sm:p-5 flex flex-col justify-between border ${item.border}`}
                        style={{
                          clipPath: item.clipPath,
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3.5">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#093624] font-mono text-sm font-bold text-[#F7F4E9] shadow-xs">
                              {item.n}
                            </span>
                            {/* Subtle paper grain / pin indicator */}
                            <span className="w-1.5 h-1.5 rounded-full bg-[#093624]/25" />
                          </div>
                          <h3 className="mb-2 font-serif text-lg font-bold text-[#093624] leading-snug">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-[#2C4136] font-sans">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-lg sm:text-xl font-bold text-[#093624] leading-relaxed pt-2">
                  So, all you do is close, because we will lift the burden of running the entire execution.
                </p>

                {/* Primary CTA Button & Closing Grounded Illustration Ornament */}
                <div className="pt-8 pb-4 text-center flex flex-col items-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onOpenBooking}
                    className="cursor-pointer"
                  >
                    Okay, let's do this
                  </Button>

                  {/* NestEggIllustration as Grounded Final Page Ornament (Small) */}
                  <div className="mt-6 flex justify-center">
                    <NestEggIllustration className="w-16 sm:w-20 h-auto opacity-80" />
                  </div>
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>
    </section>
  );
};

export const ChallengeSection = TheChallenge;
export default TheChallenge;



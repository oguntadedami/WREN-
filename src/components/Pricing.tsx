import React, { useState } from 'react';
import { PaperClip } from './ScrapbookAssets';
import { Button } from './Button';

interface PricingProps {
  onOpenBooking?: () => void;
}

interface ComparisonItem {
  name: string;
  cost: string;
}

interface ComparisonPlan {
  items: ComparisonItem[];
  piecemealStrikethrough: string;
  highlightPlan: string;
  tagline: string;
  savingsBadge: string;
}

// Hand-drawn scrapbook style bullet point with organic stamped variations
const ScrapbookBullet: React.FC<{ index?: number }> = ({ index = 0 }) => {
  const variations = [
    {
      path: "M8 2.2C4.8 2.4 2.4 4.8 2.2 8C2 11.2 4.6 13.8 7.8 13.8C11.1 13.8 13.8 11.2 13.7 8C13.6 4.7 11.2 2 8 2.2Z",
      dot: { cx: 8, cy: 8, r: 1.5 },
      rotate: "rotate-0",
    },
    {
      path: "M7.6 2.3C4.4 2.8 2.2 5.4 2.4 8.6C2.6 11.7 5.3 13.9 8.5 13.6C11.6 13.3 13.8 10.6 13.5 7.4C13.2 4.3 10.6 1.9 7.6 2.3Z",
      dot: { cx: 8, cy: 8, r: 1.5 },
      rotate: "rotate-12",
    },
    {
      path: "M8.4 2.5C5.3 2.1 2.6 4.5 2.3 7.7C2 10.9 4.4 13.7 7.6 13.8C10.8 13.9 13.6 11.3 13.8 8.1C14 4.8 11.5 2.9 8.4 2.5Z",
      dot: { cx: 8, cy: 8, r: 1.5 },
      rotate: "-rotate-12",
    },
    {
      path: "M7.8 2.4C4.6 2.5 2.4 5 2.3 8.2C2.2 11.4 4.8 13.7 8 13.7C11.2 13.7 13.7 11.1 13.7 7.9C13.7 4.7 11.1 2.2 7.8 2.4Z",
      dot: { cx: 8, cy: 8, r: 1.5 },
      rotate: "rotate-6",
    },
  ];
  const v = variations[index % variations.length];

  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 shrink-0 mt-0.5 select-none ${v.rotate}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5"
      >
        <path
          d={v.path}
          fill="#CBDA46"
          stroke="#093624"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx={v.dot.cx} cy={v.dot.cy} r={v.dot.r} fill="#093624" />
      </svg>
    </span>
  );
};

// Hand-drawn uneven scrapbook tab button with organic pen strokes, no tape, no icons
const HandDrawnScrapbookTab: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant: 'basic' | 'pro';
}> = ({ label, isActive, onClick, variant }) => {
  const isBasic = variant === 'basic';

  // Distinct uneven hand-inked vector contours for each tab
  const mainPath = isBasic
    ? "M 6,5 C 38,2.2 82,4.8 132,3 C 136.5,3.6 138,6.8 137.2,12 C 136,20.5 137.5,29 136,37.5 C 135,41.2 132.5,43 126,42.5 C 89,41.8 46,43.8 9,42.2 C 4.5,41.5 3,38.5 3.5,33 C 4.2,24 3,15 4.2,8 C 4.6,5.2 5,4.8 6,5 Z"
    : "M 5,3.5 C 42,5.2 88,2.8 133,4.6 C 137.2,5.2 138.8,8.2 137.8,13.5 C 136.5,22 137.8,31 136.2,38.5 C 135.2,42 132.5,43.6 127,43.2 C 86,43.8 41,42.2 8.5,43.5 C 4.2,42.8 2.8,39.5 3.5,34 C 4.5,25 3.2,16 4.5,9 C 5,5.5 5.2,3.8 5,3.5 Z";

  // Sketchy secondary pen lines along edges
  const sketchPath = isBasic
    ? "M 10,7.5 C 48,5.2 92,6.5 128,5.5 M 134,13 C 133.5,22 134.5,30 133.2,36.5 M 125,40.5 C 88,39.8 48,41.5 14,40.2"
    : "M 9,6.2 C 44,7.5 92,5.2 129,6.8 M 134.5,14 C 133.8,23 134.8,31 133.2,37 M 125,40.8 C 84,41.2 44,40 12,41";

  const rotation = isBasic ? "-rotate-2 hover:-rotate-1" : "rotate-2 hover:rotate-1";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-7 py-3 sm:px-9 sm:py-3.5 cursor-pointer select-none transition-all duration-200 ${rotation} ${
        isActive
          ? "-translate-y-1 scale-105 z-10"
          : "opacity-85 hover:opacity-100 hover:-translate-y-0.5"
      }`}
    >
      {/* Background SVG with uneven hand-drawn borders & ink shadow */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 142 48"
        preserveAspectRatio="none"
      >
        {/* Offset Solid Ink Shadow */}
        <path
          d={mainPath}
          fill="#093624"
          transform="translate(4, 4)"
          className="transition-transform duration-200"
        />

        {/* Paper Cutout Body & Primary Hand-Drawn Inked Contour */}
        <path
          d={mainPath}
          fill={isActive ? "#CBDA46" : "#FAF7EE"}
          stroke="#093624"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
        />

        {/* Secondary Sketchy Ink Pass */}
        <path
          d={sketchPath}
          fill="none"
          stroke="#093624"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Plain Text Label (no icons, stars, or emojis) */}
      <span className="relative z-10 font-mono font-black text-xs sm:text-sm tracking-widest text-[#093624] uppercase">
        {label}
      </span>
    </button>
  );
};

export const Pricing: React.FC<PricingProps> = ({ onOpenBooking }) => {
  const [activeComparisonTab, setActiveComparisonTab] = useState<'basic' | 'pro'>('pro');

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el =
        document.getElementById('booking-section') ||
        document.getElementById('calendly-booking-section');
      if (el) {
        const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -20, duration: 1.35 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const comparisonData: Record<'basic' | 'pro', ComparisonPlan> = {
    basic: {
      items: [
        { name: "A positioning & brand strategist (audit + positioning)", cost: "$2,000" },
        { name: "An ICP research specialist", cost: "$1,000" },
        { name: "A LinkedIn profile copywriter (profile-to-pipeline rebuild)", cost: "$800 one-time" },
        { name: "A ghostwriter for 12 founder posts/month", cost: "$2,500" },
        { name: "An engagement/community manager (daily engagement)", cost: "$1,500" },
        { name: "A funnel/automation setup (DM + booking path)", cost: "$1,000 one-time" },
        { name: "Monthly reporting & analytics", cost: "$600" },
      ],
      piecemealStrikethrough: "~$8,600 in month one, ~$6,600/month ongoing",
      highlightPlan: "Founder OS Basic: $3,500/month",
      tagline: "for everything with no managing of five freelancers.",
      savingsBadge: "SAVE $5,100+",
    },
    pro: {
      items: [
        { name: "Everything in Basic", cost: "~$6,600/month" },
        { name: "Higher content volume (16-20 posts + a lead magnet)", cost: "+$2,000" },
        { name: "Multi-channel repurposing (X + Substack)", cost: "+$1,500" },
        { name: "Bi-weekly strategy sessions with a marketing lead", cost: "+$1,500" },
        { name: "An outbound-to-inbound warm sequence build", cost: "+$2,000" },
      ],
      piecemealStrikethrough: "~$13,600/mo",
      highlightPlan: "Founder OS Pro: $5,000/mo",
      tagline: "with everything running month over month for you.",
      savingsBadge: "SAVE $8,600+",
    },
  };

  const currentComparison = comparisonData[activeComparisonTab];

  const plans = [
    {
      id: "plan-basic",
      title: "BASIC",
      buttonText: "Choose Basic",
      price: "$3,500/month",
      term: "(3-month minimum)",
      isHighlighted: false,
      rotation: "-rotate-1",
      paperClipPos: "left-6 -top-3.5",
      bullets: [
        "Presence audit & positioning",
        "ICP mapping",
        "Profile-to-pipeline setup",
        "Founder content engine (12 posts/month built from your voice)",
        "Strategic engagement layer (5-10 engagements daily)",
        "Inbound capture & routing (A DM and booking path so engagers become conversations)",
        "Monthly signal report",
      ],
    },
    {
      id: "plan-pro",
      title: "PRO",
      buttonText: "Choose Pro",
      price: "$5,000/month",
      term: "(3-month minimum)",
      isHighlighted: true,
      rotation: "rotate-0",
      paperClipPos: "right-8 -top-3.5",
      tag: "MOST POPULAR",
      bullets: [
        "Everything in Basic plus",
        "Higher content volume (16–20 posts/month plus one lead-magnet asset)",
        "Higher engagement layer (15-20 daily)",
        "2 extra channel distribution (X and Substack)",
        "Bi-weekly strategy sessions",
        "Outbound-to-inbound bridge (A warm connection sequence that runs off your content)",
      ],
    },
    {
      id: "plan-custom",
      title: "Custom",
      buttonText: "Choose Custom",
      price: null,
      term: "(3-month minimum)",
      isHighlighted: false,
      rotation: "rotate-1",
      paperClipPos: "left-8 -top-3.5",
      bullets: [
        "Everything in Pro Plus",
        "Multichannel distribution",
        "Video marketing (5 shorts + 2 long forms monthly)",
        "Podcast installation",
        "Full outbound (Email & LinkedIn)",
      ],
    },
  ];

  return (
    <section
      id="pricing-section"
      className="py-20 sm:py-28 bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/10 relative select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between py-3 border-b border-[#093624]/15 mb-12 sm:mb-16 text-[11px] sm:text-xs font-mono text-[#6F7A6E] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#093624] animate-pulse" />
            <span>04 / SYSTEM PRICING</span>
          </div>
          <div className="font-medium text-[#093624]">
            3-Month Minimum Sprint
          </div>
        </div>

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#093624] tracking-tight">
            What it's Worth
          </h2>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 border-[#093624] flex flex-col justify-between transition-all duration-300 ${
                  plan.isHighlighted
                    ? 'bg-white shadow-[8px_8px_0px_#093624] lg:-translate-y-2.5 z-20 ring-2 ring-[#CBDA46]'
                    : 'bg-[#FBF9F3] shadow-[6px_6px_0px_#093624] hover:bg-white z-10'
                } ${plan.rotation}`}
              >
                {/* Paper Clip Decoration */}
                <div className={`absolute ${plan.paperClipPos} z-30 pointer-events-none`}>
                  <PaperClip className="w-6 h-11 text-[#64748B]" />
                </div>

                {/* Most Popular Ribbon */}
                {plan.tag && (
                  <div className="absolute -top-3.5 right-6 z-30">
                    <span className="inline-flex items-center font-mono text-[11px] font-black uppercase tracking-wider bg-[#CBDA46] text-[#093624] px-3 py-1 rounded-sm border-2 border-[#093624] shadow-[2px_2px_0px_#093624] -rotate-2">
                      {plan.tag}
                    </span>
                  </div>
                )}

                {/* Top Card Body */}
                <div className="p-6 sm:p-8 pb-4">
                  {/* Plan Title & Price Header - Stacked vertically */}
                  <div className="border-b border-[#093624]/15 pb-5">
                    {/* Plan Name */}
                    {plan.id === 'plan-custom' ? (
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-[#093624]">
                        {plan.title}
                      </h3>
                    ) : (
                      <div>
                        <span className="inline-flex items-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-lg bg-[#EBF2C4] border border-[#093624]/30 font-mono font-bold text-xs sm:text-sm tracking-wider text-[#093624] uppercase shadow-2xs">
                          {plan.title}
                        </span>
                      </div>
                    )}

                    {/* Price per month (if applicable, e.g. Basic & Pro) */}
                    {plan.price && (
                      <div className="font-display font-black text-2xl sm:text-3xl text-[#093624] tracking-tight mt-3">
                        {plan.price}
                      </div>
                    )}

                    {/* Minimum Term Underneath */}
                    <div className="mt-2 text-xs sm:text-sm font-mono font-bold text-[#6F7A6E]">
                      {plan.term}
                    </div>
                  </div>

                  {/* Bullet Points List */}
                  <div className="mt-6 space-y-4">
                    {plan.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex items-start gap-3 text-sm sm:text-[15px] text-[#15543D] leading-relaxed"
                      >
                        <ScrapbookBullet index={bIdx} />
                        <span className="font-medium text-[#2D4537]">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-6 sm:p-8 pt-4">
                  <Button
                    variant={plan.isHighlighted ? "primary-lime" : "secondary"}
                    size="md"
                    fullWidth
                    onClick={handleBooking}
                    className="cursor-pointer"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* If Bought Separately Section (Sits directly between cards and bottom CTA) */}
        <div className="mt-24 sm:mt-32 max-w-4xl mx-auto">
          {/* Section Heading & Subtitle */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#093624] tracking-tight">
              If bought separately?
            </h3>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#2D4537] mt-3 max-w-xl mx-auto leading-relaxed">
              Sourcing this from different specialists, here's what it would likely cost you:
            </p>

            {/* Downward Ink Hand-Drawn Arrow */}
            <div className="flex justify-center my-4">
              <svg
                width="22"
                height="30"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#093624]/75"
              >
                <path
                  d="M12 2C12 11 11.8 20 12 28M12 28C9.5 24 6.5 19.5 4 18M12 28C14.5 24 17.5 19.5 20 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Toggle Tabs - Uneven Hand-Drawn Scrapbook Tabs (No tape, no icons, no stars/emojis) */}
            <div className="flex items-center justify-center gap-5 sm:gap-7 pt-2">
              <HandDrawnScrapbookTab
                label="[ BASIC ]"
                variant="basic"
                isActive={activeComparisonTab === 'basic'}
                onClick={() => setActiveComparisonTab('basic')}
              />
              <HandDrawnScrapbookTab
                label="[ PRO ]"
                variant="pro"
                isActive={activeComparisonTab === 'pro'}
                onClick={() => setActiveComparisonTab('pro')}
              />
            </div>
          </div>

          {/* Scrapbook Sheet Card with pricing card box shadow */}
          <div className="relative rounded-[2.5rem] bg-[#F7F5EC] border-2 border-[#093624] p-5 sm:p-8 md:p-12 shadow-[8px_8px_0px_#093624] mt-8">
            {/* Masking / Washi Tape Strips at top edge */}
            <div
              className="absolute -top-3.5 left-10 sm:left-16 w-24 sm:w-28 h-7 bg-[#EFE5CF]/95 border border-[#D5C7A5] -rotate-3 shadow-xs z-20 pointer-events-none"
              style={{
                clipPath:
                  "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 97% 85%, 93% 100%, 7% 100%, 3% 85%)",
              }}
            />
            <div
              className="absolute -top-3.5 right-10 sm:right-16 w-24 sm:w-28 h-7 bg-[#EFE5CF]/95 border border-[#D5C7A5] rotate-2 shadow-xs z-20 pointer-events-none"
              style={{
                clipPath:
                  "polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 97% 85%, 93% 100%, 7% 100%, 3% 85%)",
              }}
            />

            {/* Hole Punch Dot */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#E5DECA] border border-[#093624]/25 mb-4 shadow-inner" />

            {/* Top Dashed Line */}
            <div className="border-b border-dashed border-[#093624]/20 pb-1 mb-6 sm:mb-8" />

            {/* Inner Notebook Paper Sheet */}
            <div className="relative bg-white rounded-xl border border-[#093624]/15 shadow-sm p-5 sm:p-8 md:p-10 overflow-hidden">
              {/* Vertical red margin line */}
              <div className="absolute top-0 bottom-0 left-5 sm:left-9 md:left-11 w-[1.5px] bg-red-300/80 pointer-events-none" />

              {/* Table Body indented from the red line */}
              <div className="pl-4 sm:pl-7 md:pl-8">
                {/* Column Headers */}
                <div className="flex items-center justify-between pb-4 border-b border-[#093624]/10 text-xs sm:text-sm font-bold text-[#093624]">
                  <span>What you'd buy separately</span>
                  <span className="shrink-0 text-right">Typical monthly</span>
                </div>

                {/* Line Items with Dotted Leader */}
                <div className="divide-y divide-[#093624]/5 sm:divide-y-0">
                  {currentComparison.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between gap-2 py-3 text-xs sm:text-[14px] md:text-[15px] leading-snug"
                    >
                      <span className="text-[#2D4537] font-medium">{item.name}</span>
                      <span className="flex-1 border-b border-dotted border-[#093624]/30 min-w-4 mx-2 mb-1 hidden sm:block select-none" />
                      <span className="font-mono font-bold text-[#093624] shrink-0 text-right">
                        {item.cost}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dashed Separator */}
                <div className="border-t border-dashed border-[#093624]/25 my-6 sm:my-8" />

                {/* Bottom Summary Block */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-1">
                  <div>
                    <div className="text-xs sm:text-sm font-mono text-[#6F7A6E]">
                      Separately:{" "}
                      <span className="line-through font-bold text-[#6F7A6E]">
                        {currentComparison.piecemealStrikethrough}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6F7A6E] font-bold mt-2.5">
                      WITH WREN SYSTEM:
                    </div>
                    <div className="relative inline-block mt-1">
                      <span className="absolute inset-0 bg-[#CBDA46] -rotate-0.5 rounded-xs -z-0 py-1 -my-0.5 px-2.5 -mx-1.5 shadow-2xs border border-[#093624]/20" />
                      <span className="relative z-10 font-display font-black text-base sm:text-lg md:text-xl text-[#093624]">
                        {currentComparison.highlightPlan}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-[13px] font-sans text-[#6F7A6E] font-medium max-w-sm">
                      {currentComparison.tagline}
                    </p>
                  </div>

                  {/* Red Rubber Stamp Badge */}
                  <div className="sm:self-center shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border-2 border-[#D9483B] text-[#D9483B] font-display font-black text-sm sm:text-base tracking-wider uppercase -rotate-3 shadow-xs select-none bg-[#FFF8F7]/70">
                      <span className="text-base">★</span>
                      <span>{currentComparison.savingsBadge}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Bottom CTA */}
        <div className="mt-14 sm:mt-20 text-center flex justify-center">
          <Button
            id="pricing-global-cta-btn"
            variant="primary"
            size="lg"
            onClick={handleBooking}
            className="cursor-pointer"
          >
            Let's get this thing moving
          </Button>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';

import warmlyLogo from '../assets/logos/warmly-logo.png';
import lemlistLogo from '../assets/logos/lemlist-logo.png';
import taplioLogo from '../assets/logos/taplio-logo.png';
import instantlyLogo from '../assets/logos/instantly-logo.png';
import junglerAiLogo from '../assets/logos/jungler-ai-logo.png';
import notionLogo from '../assets/logos/notion-logo.png';
import slackLogo from '../assets/logos/slack-logo.png';
import apolloLogo from '../assets/logos/apollo-logo.png';
import salesNavLogo from '../assets/logos/sales-navigator-logo.png';
import prospeoLogo from '../assets/logos/prospeo-logo.png';
import clayLogo from '../assets/logos/clay-logo.png';
import authoredupLogo from '../assets/logos/authoredup-logo.png';

interface ToolItem {
  name: string;
  logoSrc: string;
}

export const ToolStack: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const tools: ToolItem[] = [
    { name: "Warm AI", logoSrc: warmlyLogo },
    { name: "Lemlist", logoSrc: lemlistLogo },
    { name: "Taplio", logoSrc: taplioLogo },
    { name: "Instantly", logoSrc: instantlyLogo },
    { name: "Jungler AI", logoSrc: junglerAiLogo },
    { name: "Notion", logoSrc: notionLogo },
    { name: "Slack", logoSrc: slackLogo },
    { name: "Apollo", logoSrc: apolloLogo },
    { name: "Sales Navigator", logoSrc: salesNavLogo },
    { name: "Prospeo", logoSrc: prospeoLogo },
    { name: "Clay", logoSrc: clayLogo },
    { name: "AuthoredUp", logoSrc: authoredupLogo },
  ];

  // Tripled list for infinite seamless marquee loop
  const marqueeItems = [...tools, ...tools, ...tools];

  return (
    <section
      id="tool-stack-section"
      className="py-16 sm:py-20 bg-[#F7F4E9] border-b border-[#093624]/10 select-none relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-2">
        <span className="text-xs font-semibold tracking-widest text-[#6F7A6E] uppercase font-sans">
          OUR TOOL STACK & INTEGRATIONS
        </span>
      </div>

      {/* Auto-scrolling Infinite Marquee with generous vertical room for unclipped hover logos */}
      <div
        className="relative w-full overflow-hidden flex"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F7F4E9] to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F7F4E9] to-transparent z-30 pointer-events-none" />

        <div
          className="animate-marquee flex items-center gap-8 sm:gap-12 pt-24 pb-6 sm:pt-28 sm:pb-8"
          style={{
            animationPlayState: hoveredIdx !== null ? 'paused' : 'running',
          }}
        >
          {marqueeItems.map((tool, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className="relative shrink-0 overflow-visible"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => {
                  if (hoveredIdx === idx) {
                    setHoveredIdx(null);
                  }
                }}
                onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
              >
                {/* Floating Logo above the pill with transparent background and direct drop shadow */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 sm:mb-4 z-50 transition-all duration-200 ease-out pointer-events-none overflow-visible flex items-center justify-center transform ${
                    isHovered
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-90 translate-y-2 pointer-events-none'
                  }`}
                >
                  <img
                    src={tool.logoSrc}
                    alt={`${tool.name} Logo`}
                    className="h-14 sm:h-16 w-auto max-w-[200px] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] select-none pointer-events-none"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                    }}
                  />
                </div>

                {/* Pill Button / Badge */}
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
                    isHovered
                      ? 'bg-[#EEF2CC] border-[#093624] text-[#093624] shadow-xs scale-105'
                      : 'bg-white/70 border-[#093624]/15 text-[#15543D] hover:bg-[#EEF2CC] hover:border-[#CBDA46]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-transform duration-150 ${
                      isHovered ? 'bg-[#093624] scale-125' : 'bg-[#CBDA46]'
                    }`}
                  />
                  <span className="font-semibold">{tool.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};



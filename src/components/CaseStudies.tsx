import React, { useState } from 'react';
import { CaseStudyCard } from './CaseStudyCard';
import { CaseStudiesWrenBird } from './CaseStudiesWrenBird';
import caseStudiesData from '../data/caseStudies.json';
import { CaseStudy } from '../types';

export const CaseStudies: React.FC = () => {
  const caseStudies: CaseStudy[] = caseStudiesData as CaseStudy[];
  const [perchedCardIndex, setPerchedCardIndex] = useState<number | null>(null);

  return (
    <section
      id="case-studies-section"
      className="py-20 sm:py-28 bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/10 relative select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#093624]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#093624] uppercase">
              CASE STUDIES
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#093624] tracking-tight leading-tight">
            Receipts, you say?
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
            A few businesses we've helped build demand and pipeline for.
          </p>
        </div>

        {/* 2x2 Grid Container with Flying Animated Wren Bird */}
        <div className="relative">
          {/* Animated Wren Bird Flying from card to card */}
          <CaseStudiesWrenBird onPerchedCardChange={setPerchedCardIndex} />

          {/* 2x2 Grid of Case Study Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {caseStudies.map((item, idx) => (
              <CaseStudyCard
                key={item.slug}
                caseStudy={item}
                index={idx}
                isPerched={perchedCardIndex === idx}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

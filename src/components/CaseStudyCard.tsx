import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CaseStudy } from '../types';
import { PaperClip } from './ScrapbookAssets';
import {
  LogoCarril,
  LogoColorteam,
  LogoMischiefMakers,
  LogoSeamailer,
  LogoTheToolBus,
} from './ClientLogos';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
  isPerched?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  index = 0,
  isPerched = false,
}) => {
  const paperClipPositions = [
    'left-6 -top-3.5',
    'right-8 -top-3.5',
    'left-8 -top-3.5',
    'right-6 -top-3.5',
  ];
  const paperClipPos = paperClipPositions[index % paperClipPositions.length];

  // Render client brand logo based on slug
  const renderBrandLogo = () => {
    switch (caseStudy.slug) {
      case 'mischief-makers':
        return (
          <LogoMischiefMakers
            className="h-5 sm:h-5.5 md:h-6 w-auto max-w-[150px] max-h-7 object-contain"
          />
        );
      case 'carril':
        return (
          <LogoCarril
            className="h-4.5 sm:h-5 md:h-5.5 w-auto max-w-[95px] sm:max-w-[110px] max-h-6 object-contain"
          />
        );
      case 'seamailer':
        return (
          <LogoSeamailer
            className="h-6 sm:h-6.5 md:h-7 w-auto max-w-[140px] max-h-8 object-contain"
          />
        );
      case 'toolbus-ai':
      case 'the-tool-bus':
        return (
          <LogoTheToolBus
            className="h-6 sm:h-6.5 md:h-7 w-auto max-w-[150px] max-h-8 object-contain"
          />
        );
      case 'colorteam':
        return (
          <LogoColorteam
            className="h-5 sm:h-5.5 md:h-6 w-auto max-w-[130px] max-h-7 object-contain"
          />
        );
      default:
        return (
          <span className="font-display font-black text-base text-[#093624]">
            {caseStudy.companyName}
          </span>
        );
    }
  };

  return (
    <div
      id={`case-study-card-${index}`}
      className={`relative rounded-2xl bg-white border-2 border-[#093624] flex flex-col justify-between p-6 sm:p-8 lg:p-9 transition-all duration-300 group ${
        isPerched
          ? 'shadow-[8px_8px_0px_#093624] ring-2 ring-[#CBDA46] -translate-y-1'
          : 'shadow-[6px_6px_0px_#093624] hover:shadow-[8px_8px_0px_#093624] hover:-translate-y-1'
      }`}
    >
      {/* Tactile Metal Paperclip Asset */}
      <div
        className={`absolute ${paperClipPos} z-20 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity`}
      >
        <PaperClip className="w-6 h-11 text-[#64748B]" />
      </div>

      <div>
        {/* Top Header Row: Tag Pill + Client Brand Logo */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-[#093624]/15 min-w-0">
          {/* Tag Pill */}
          <span className="inline-block text-[10px] sm:text-[11px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#093624] bg-[#CBDA46]/30 border border-[#093624]/30 px-2.5 sm:px-3 py-1 rounded-md shrink">
            {caseStudy.tag}
          </span>

          {/* Official Brand Logo */}
          <div className="flex items-center justify-end py-0.5 shrink-0">
            {renderBrandLogo()}
          </div>
        </div>

        {/* Large Stat + Result Label */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-none">
              {caseStudy.stat}
            </span>
            <span className="font-display font-bold text-lg sm:text-xl text-[#093624] leading-snug">
              — {caseStudy.statLabel}
            </span>
          </div>

          {/* Sub-stat Line */}
          <div className="mt-2.5 inline-flex items-center px-3 py-1 rounded bg-[#F7F4E9] border border-[#093624]/20 text-xs sm:text-[13px] font-mono font-semibold text-[#15543D]">
            <span>{caseStudy.subStat}</span>
          </div>
        </div>

        {/* Body Copy: Paragraphs 1 & 2 */}
        <div className="mt-5 space-y-3 text-sm sm:text-base text-[#334155] leading-relaxed">
          <p className="font-normal">{caseStudy.bodyParagraph1}</p>
          <p className="font-normal text-[#475569]">{caseStudy.bodyParagraph2}</p>
        </div>
      </div>

      {/* CTA Link: Derived dynamically from slug */}
      <div className="mt-8 pt-5 border-t border-[#093624]/10">
        <a
          href={`/case-studies/${caseStudy.slug}`}
          className="inline-flex items-center gap-2 font-display font-black text-sm sm:text-base text-[#093624] hover:text-[#15543D] group/link transition-colors"
        >
          <span className="relative">
            Read the case study
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#093624] group-hover/link:w-full transition-all duration-200" />
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200 text-[#093624]" />
        </a>
      </div>
    </div>
  );
};

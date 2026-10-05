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
  onNavigate?: (
    page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail',
    sectionId?: string
  ) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  index = 0,
  isPerched = false,
  onNavigate,
}) => {
  const paperClipPositions = [
    'left-6 -top-3.5',
    'right-8 -top-3.5',
    'left-8 -top-3.5',
    'right-6 -top-3.5',
  ];
  const paperClipPos = paperClipPositions[index % paperClipPositions.length];

  const renderBrandLogo = () => {
    switch (caseStudy.slug) {
      case 'mischief-makers':
        return (
          <LogoMischiefMakers
            className="h-8 sm:h-9 md:h-10 w-auto max-w-[210px] max-h-12 object-contain"
          />
        );
      case 'carril':
        return (
          <LogoCarril
            className="h-7 sm:h-8 md:h-9 w-auto max-w-[160px] max-h-10 object-contain"
          />
        );
      case 'seamailer':
        return (
          <LogoSeamailer
            className="h-8 sm:h-9 md:h-10 w-auto max-w-[200px] max-h-12 object-contain"
          />
        );
      case 'toolbus-ai':
      case 'the-tool-bus':
        return (
          <LogoTheToolBus
            className="h-8 sm:h-9 md:h-10 w-auto max-w-[200px] max-h-12 object-contain"
          />
        );
      case 'colorteam':
        return (
          <LogoColorteam
            className="h-8 sm:h-9 md:h-10 w-auto max-w-[190px] max-h-12 object-contain"
          />
        );
      default:
        return (
          <span className="font-display font-serif font-bold text-2xl text-[#093624]">
            {caseStudy.companyName}
          </span>
        );
    }
  };

  const getTargetUrl = (slug: string) => {
    return `/case-studies/${slug}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('case-study-detail', caseStudy.slug);
    }
  };

  return (
    <a
      id={`case-study-card-${index}`}
      href={getTargetUrl(caseStudy.slug)}
      onClick={handleCardClick}
      aria-label={`Read case study for ${caseStudy.companyName}`}
      className={`relative rounded-2xl bg-white border-2 border-[#093624] flex flex-col justify-between p-6 sm:p-8 lg:p-9 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#093624] focus:ring-offset-2 select-none ${
        isPerched
          ? 'shadow-[8px_8px_0px_#093624] ring-2 ring-[#CBDA46] -translate-y-1'
          : 'shadow-[6px_6px_0px_#093624] hover:shadow-[8px_8px_0px_#093624] hover:-translate-y-1.5'
      }`}
    >
      <div
        className={`absolute ${paperClipPos} z-20 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity`}
      >
        <PaperClip className="w-6 h-11 text-[#64748B]" />
      </div>

      <div>
        <div className="flex items-center min-h-[50px] mb-6 pb-5 border-b border-[#093624]/15 min-w-0">
          {renderBrandLogo()}
        </div>

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="font-display font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-none">
              {caseStudy.stat}
            </span>
            <span className="font-display font-serif font-bold text-lg sm:text-xl text-[#093624] leading-snug">
              — {caseStudy.statLabel}
            </span>
          </div>

          <div className="mt-2.5 inline-flex items-center px-3 py-1 rounded bg-[#F7F4E9] border border-[#093624]/20 text-xs sm:text-[13px] font-mono font-semibold text-[#15543D]">
            <span>{caseStudy.subStat}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm sm:text-base text-[#334155] leading-relaxed">
          <p className="font-normal">{caseStudy.bodyParagraph1}</p>
          <p className="font-normal text-[#475569]">{caseStudy.bodyParagraph2}</p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-[#093624]/10">
        <span
          className="inline-flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#093624] group-hover:text-[#15543D] transition-colors"
        >
          <span className="relative">
            Read the case study
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#093624] group-hover:w-full transition-all duration-200" />
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200 text-[#093624]" />
        </span>
      </div>
    </a>
  );
};

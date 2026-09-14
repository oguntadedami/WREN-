import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PaperClip, Tape } from './ScrapbookAssets';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "faq-1",
    number: "01",
    question: "Will this mean more work for me?",
    answer: "Never! Beyond taking founders to market, one of our major goals is to do it in a way that there is never an over-dependency on the founder, which is why we have asynchronous systems that allow us to capture what we need without you giving hours weekly."
  },
  {
    id: "faq-2",
    number: "02",
    question: "Will my voice be diluted?",
    answer: "No. We only publish content that sounds like you. We use VNs and 1:1 calls to get your ideas on topics, and then we refine the raw transcripts into natural and human content your audience will love."
  },
  {
    id: "faq-3",
    number: "03",
    question: "There’s AI slop everywhere. Will you ruin my brand and name?",
    answer: "There is no point in the process where we outsource your content and social activities to AI. If we ever get to the point of max scaling, what we do is we build coworks and skills that mimic your voice at 99% accuracy, and before we hit publish, it goes through a series of thorough approvals. Again, this only applies when we are scaling at max for you."
  },
  {
    id: "faq-4",
    number: "04",
    question: "Do I need to commit long-term?",
    answer: "You don’t have to commit long-term if you don’t want to, and all our plans are at least 3 months."
  },
  {
    id: "faq-5",
    number: "05",
    question: "What if you don’t understand my product?",
    answer: "We understand every product has its own uniqueness, which is why we avoid scratching the surface when exploring your product - we look into your documentation, public reviews, etc to have a deeper understanding of your product before demand gen maxxing."
  },
  {
    id: "faq-6",
    number: "06",
    question: "What channels do you run this on?",
    answer: "This depends on the plan you go for, but we run this on LinkedIn, X, Substack, Podcast, and YouTube"
  }
];

export const FAQ: React.FC = () => {
  // Allow multiple items or single open item (default first open for immediate clarity)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-1": true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section
      id="faq-section"
      className="py-20 sm:py-28 lg:py-32 bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/10 relative select-none overflow-hidden"
    >
      {/* Decorative Washi Tape & Paper Accents */}
      <div className="absolute top-10 right-8 z-10 pointer-events-none hidden lg:block">
        <Tape className="w-28 h-8 text-[#CBDA46]/80 rotate-6" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with "got questions?" handwritten script and washi tape subtitle */}
        <div className="text-center mb-16 sm:mb-20">
          
          {/* Script Eyebrow */}
          <div className="inline-block mb-1">
            <span className="font-serif italic text-lg sm:text-xl text-[#D97706] font-semibold tracking-wide">
              got questions?
            </span>
          </div>

          {/* Main Big Headline */}
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#093624] tracking-tight">
            We have answers
          </h2>

          {/* Subtitle Washi Tape Strip */}
          <div className="mt-4 inline-block">
            <span className="inline-flex items-center font-mono text-xs sm:text-sm font-bold text-[#093624] bg-[#FFEBB8] border border-[#093624]/30 px-4 py-1.5 rounded-sm shadow-[2px_2px_0px_#093624] -rotate-1">
              everything you'd grill us on, right here.
            </span>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-5 sm:space-y-6">
          {faqData.map((item, index) => {
            const isOpen = !!openItems[item.id];
            
            return (
              <div 
                key={item.id}
                className="relative group transition-all duration-200"
              >
                {/* Accordion Card */}
                <div 
                  className={`rounded-2xl border-2 border-[#093624] transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-white shadow-[6px_6px_0px_#093624] ring-2 ring-[#CBDA46]' 
                      : 'bg-[#FBF9F3] shadow-[4px_4px_0px_#093624] hover:bg-white hover:shadow-[6px_6px_0px_#093624] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Card Header / Question Row */}
                  <button
                    id={`faq-btn-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4.5">
                      {/* Number Badge */}
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/30 shrink-0 mt-0.5 sm:mt-0">
                        {item.number}
                      </span>
                      
                      {/* Question Text */}
                      <h3 className="font-display font-black text-base sm:text-xl text-[#093624] leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    {/* Expand/Collapse Inked Icon Toggle */}
                    <div 
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 border-[#093624] flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen 
                          ? 'bg-[#CBDA46] text-[#093624] shadow-[2px_2px_0px_#093624] rotate-180' 
                          : 'bg-white text-[#093624] shadow-[2px_2px_0px_#093624] group-hover:bg-[#FAF7F0]'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#093624]" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-4 h-4 text-[#093624]" strokeWidth={2.5} />
                      )}
                    </div>
                  </button>

                  {/* Collapsible Answer Body */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-[#093624]/10 mt-1">
                      <div className="pt-4 sm:pt-5 text-sm sm:text-base text-[#2D4537] leading-relaxed font-sans max-w-3xl">
                        {item.answer}
                      </div>
                    </div>
                  )}

                </div>

                {/* Subtle paperclip detail on alternating cards */}
                {index === 1 && (
                  <div className="absolute -top-3 right-6 z-20 pointer-events-none opacity-80">
                    <PaperClip className="w-5 h-9 text-[#64748B]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Note */}
        <div className="mt-14 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm font-mono text-[#6F7A6E]">
            Have a question that isn't answered here?{' '}
            <a 
              href="#booking-section" 
              className="font-bold text-[#093624] underline decoration-[#CBDA46] decoration-2 underline-offset-4 hover:text-[#15543D]"
            >
              Ask us directly on a call →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

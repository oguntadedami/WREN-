import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  CheckSquare, 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  ChevronRight, 
  Printer, 
  Calendar, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { Button } from './Button';
import { PaperClip, Tape, MarkerUnderline } from './ScrapbookAssets';

interface LaunchChecklistPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string, sectionId?: string) => void;
}

export const LaunchChecklistPage: React.FC<LaunchChecklistPageProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  // Active toggle: 'new-launch' or 're-launch'
  const [activeTab, setActiveTab] = useState<'new-launch' | 're-launch'>('new-launch');

  const newLaunchItems = [
    { id: 'nl-1', category: 'Foundation & Positioning', task: 'Single-sentence positioning statement: who this is for and why the incumbent way fails.' },
    { id: 'nl-2', category: 'Foundation & Positioning', task: 'Founder origin story narrative drafted and locked for social long-form drops.' },
    { id: 'nl-3', category: 'Foundation & Positioning', task: 'Proof bank assembled: 3 beta tester receipts, before-and-after benchmarks, or early quotes.' },
    { id: 'nl-4', category: 'Asset & Messaging Prep', task: 'Interactive product demo, screenshot walk-through, or 60-second video demo recorded.' },
    { id: 'nl-5', category: 'Asset & Messaging Prep', task: 'One-page live proposal / deck ready to share within 2 hours of discovery calls.' },
    { id: 'nl-6', category: 'Asset & Messaging Prep', task: 'Pricing tiers, billing links, and grandfathered pioneer offer terms finalized.' },
    { id: 'nl-7', category: 'Audience & Distribution', task: 'Pre-launch VIP waitlist of 250 high-affinity ICP leads verified with verified work emails.' },
    { id: 'nl-8', category: 'Audience & Distribution', task: '14-day warmup engagement campaign live across founder LinkedIn and target communities.' },
    { id: 'nl-9', category: 'Audience & Distribution', task: 'Launch day DM sequence ready for warm champions and podcast peers.' },
    { id: 'nl-10', category: 'Closing & Follow-up', task: 'Frictionless calendar booking link with 3 qualifying friction questions active.' },
    { id: 'nl-11', category: 'Closing & Follow-up', task: 'Post-launch 48-hour pipeline follow-up cadence scheduled with founders.' },
  ];

  const relaunchItems = [
    { id: 'rl-1', category: 'Audit & Retrospective', task: 'Honest post-mortem of previous launch: what channel fell flat vs. what generated pipeline.' },
    { id: 'rl-2', category: 'Audit & Retrospective', task: 'Customer churn / feedback review: single biggest objection encountered by sales.' },
    { id: 'rl-3', category: 'Re-positioning & What Changed', task: '"What’s different this time" narrative: new feature, overhauled pricing, or refocused ICP.' },
    { id: 'rl-4', category: 'Re-positioning & What Changed', task: 'Updated product screenshots, fresh customer quotes, and verified ROI case studies.' },
    { id: 'rl-5', category: 'Reactivation Engine', task: 'Reactivation campaign targeting stale leads and dormant beta users with exclusive upgrade path.' },
    { id: 'rl-6', category: 'Reactivation Engine', task: 'Direct outreach to churned prospects announcing the fix to their exact prior blocker.' },
    { id: 'rl-7', category: 'Distribution & Momentum', task: 'Co-marketing drop or guest appearance with integration partner lined up for launch week.' },
    { id: 'rl-8', category: 'Distribution & Momentum', task: 'Customer referral incentive or fast-mover bonus with explicit expiration deadline.' },
    { id: 'rl-9', category: 'Closing & Follow-up', task: 'Sales enablement refresh: revised objection-handling cheat sheet ready.' },
  ];

  // Real, formatted printable/downloadable PDF generation via clean browser print-dialog
  const handleDownloadPDF = () => {
    const isNew = activeTab === 'new-launch';
    const title = isNew ? 'WREN GTM Launch Checklist — New Launch' : 'WREN GTM Launch Checklist — Re-launches';
    const items = isNew ? newLaunchItems : relaunchItems;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download/print the checklist PDF.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
            @page {
              margin: 20mm;
              size: A4 portrait;
            }
            body {
              font-family: 'Inter', -apple-system, sans-serif;
              color: #0E1A15;
              background: #FAF7EE;
              margin: 0;
              padding: 30px;
              line-height: 1.5;
            }
            .header {
              border-bottom: 2px solid #093624;
              padding-bottom: 20px;
              margin-bottom: 25px;
            }
            .brand {
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #15543D;
              margin-bottom: 8px;
            }
            h1 {
              font-family: 'IBM Plex Serif', Georgia, serif;
              font-size: 28px;
              color: #093624;
              margin: 0 0 10px 0;
              line-height: 1.2;
            }
            .subhead {
              font-size: 14px;
              color: #2C3830;
              margin: 0;
            }
            .intro-box {
              background: #EEF2CC;
              border: 1px solid #CBDA46;
              padding: 12px 16px;
              border-radius: 6px;
              font-size: 12px;
              color: #093624;
              margin-bottom: 25px;
            }
            .section-title {
              font-family: 'JetBrains Mono', monospace;
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #093624;
              border-bottom: 1px solid rgba(9,54,36,0.2);
              padding-bottom: 6px;
              margin: 20px 0 12px 0;
            }
            .item {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              margin-bottom: 12px;
              padding: 10px 12px;
              background: #FFFFFF;
              border: 1px solid #D8D0BE;
              border-radius: 6px;
            }
            .checkbox {
              width: 16px;
              height: 16px;
              border: 2px solid #093624;
              border-radius: 3px;
              margin-top: 2px;
              flex-shrink: 0;
            }
            .category {
              font-family: 'JetBrains Mono', monospace;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              color: #6F7A6E;
              margin-bottom: 2px;
            }
            .task {
              font-size: 13px;
              font-weight: 500;
              color: #0E1A15;
            }
            .footer {
              margin-top: 35px;
              padding-top: 15px;
              border-top: 1px dashed #093624;
              font-size: 11px;
              color: #6F7A6E;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand">WREN GTM · PRODUCT LAUNCH SYSTEM</div>
            <h1>${title}</h1>
            <p class="subhead">
              ${isNew 
                ? 'Everything you need to think about when launching a new product is here.' 
                : "For when your product has already launched, and you're getting ready to do it again."
              }
            </p>
          </div>

          <div class="intro-box">
            <strong>How to use this checklist:</strong> Keep it wherever you manage your work (Notion, Google Docs, Linear, or Trello). Use it to guide what needs to happen each day as you work towards your BIG launch day.
          </div>

          <div class="section-title">Action Items</div>
          ${items.map(item => `
            <div class="item">
              <div class="checkbox"></div>
              <div>
                <div class="category">${item.category}</div>
                <div class="task">${item.task}</div>
              </div>
            </div>
          `).join('')}

          <div class="footer">
            <span>Work through it, tick things off, and keep moving… and maybe tell us how it goes for you.</span>
            <span>wren-gtm.com</span>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div className="w-full bg-[#FAF7EE] text-[#0E1A15] relative selection:bg-[#CBDA46] selection:text-[#093624] overflow-x-hidden font-sans pt-28 sm:pt-36 pb-0">
      
      {/* Background Subtle Organic Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9, 54, 36, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9, 54, 36, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        
        {/* Back Link to Free Stuff */}
        <div className="mb-8 pt-2">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('free-stuff');
              else window.location.hash = '#free-stuff';
            }}
            className="inline-flex items-center gap-2 font-sans font-semibold text-xs sm:text-sm text-[#093624] hover:text-[#15543D] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Free stuff</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 1. HEADLINE & INTRO SECTION (CENTER ALIGNED WITH TEXT MOTION EFFECTS)     */}
        {/* ========================================================================= */}
        <div className="mb-12 text-center">
          
          {/* Animated Headline with staggered word motion effect */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.045,
                  delayChildren: 0.06,
                },
              },
            }}
            className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.15] mb-5 max-w-3xl mx-auto"
          >
            {"Are there things you should know before you launch or relaunch your product?".split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 18, 
                    filter: 'blur(4px)',
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="inline-block mr-[0.25em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Affirmation Line (Word for word) */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-2xl sm:text-3xl text-[#15543D] leading-snug mb-8 max-w-2xl mx-auto"
          >
            Yes! And you’ve probably heard most of them before.
          </motion.p>

          <div className="h-px w-full max-w-2xl mx-auto bg-[#093624]/15 my-8" />

          {/* Body paragraphs (Word for word) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 font-sans text-base sm:text-lg text-[#0E1A15]/90 leading-relaxed max-w-2xl mx-auto"
          >
            <p>
              There’s a lot that goes into a product launch, and it can quickly become overwhelming when it’s near time to launch.
            </p>
            <p className="font-semibold text-[#093624]">
              That’s why we built this checklist.
            </p>
            <p>
              This checklist will help you figure out what to prioritize, what to push back, and what to leave out completely.
            </p>
          </motion.div>

          <div className="h-px w-full max-w-2xl mx-auto bg-[#093624]/15 my-8" />

          {/* How to use it section (Word for word) */}
          <div className="mb-4 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#093624] mb-3">
              How to use it
            </h2>
            <div className="space-y-3 font-sans text-base sm:text-lg text-[#0E1A15]/90 leading-relaxed">
              <p>
                Download it and keep it wherever you manage your work, whether that&apos;s Notion, Google Docs, or your favourite project management tool.
              </p>
              <p>
                Use it to guide what needs to happen each day as you work towards your <span className="font-bold text-[#093624]">BIG launch day</span>.
              </p>
            </div>
          </div>

          <div className="h-px w-full max-w-2xl mx-auto bg-[#093624]/15 my-8" />
        </div>

        {/* ========================================================================= */}
        {/* 2. TOGGLE FEATURE SECTION: "We've split the checklist into two sections:"  */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#093624] text-center mb-6">
            We&apos;ve split the checklist into two sections:
          </h2>

          {/* Pill Segmented Toggle Controls (Matching image design) */}
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

          {/* Active Section Card (Organic Hand-Drawn Notebook Card matching Image 2) */}
          <div className="relative max-w-3xl mx-auto group">
            {/* Corner Washi Tape matching Image 2, color dynamically updates */}
            <div 
              className={`absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-2 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14 transition-colors duration-300 ${
                activeTab === 'new-launch' 
                  ? 'bg-[rgba(203,218,70,0.92)]' 
                  : 'bg-[rgba(245,166,33,0.92)]'
              }`}
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-2 translate-y-2.5 bg-[#093624]/15 transition-all duration-300"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card (matching Image 2) */}
            <div 
              className="relative z-10 p-7 sm:p-10 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 flex flex-col justify-start"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              {/* Header Row: Title & Matching Dynamic Circle Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#093624] tracking-tight">
                  {activeTab === 'new-launch' ? '01. New launch?' : '02. Re-launches?'}
                </h3>

                <div 
                  className={`w-11 h-11 rounded-full text-[#093624] font-mono font-bold text-base sm:text-lg flex items-center justify-center border border-[#093624]/20 shadow-xs shrink-0 transition-colors duration-300 ${
                    activeTab === 'new-launch' ? 'bg-[#CBDA46]' : 'bg-[#F5A621]'
                  }`}
                >
                  {activeTab === 'new-launch' ? '01' : '02'}
                </div>
              </div>

              {/* Exact Copy */}
              <p className="font-sans text-base sm:text-lg md:text-xl text-[#15543D] leading-relaxed max-w-2xl mb-8">
                {activeTab === 'new-launch'
                  ? 'Everything you need to think about when launching a new product is here.'
                  : 'For when your product has already launched, and you’re getting ready to do it again.'}
              </p>

              {/* CTA Button: Secondary style with Give it to me and Download icon, linking to Fillout checklists */}
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
                  <Download className="w-4 h-4" />
                  <span>Give it to me</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CLOSING SECTION (FULL DARK GREEN CHECKED BACKGROUND)                   */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#093624] text-[#F7F4E9] notebook-grid-dark relative overflow-hidden py-16 sm:py-24 border-t border-[#093624]/40 select-none">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#15543D]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-sans text-lg sm:text-2xl text-[#F7F4E9] font-medium leading-relaxed">
            Work through it, tick things off, and keep moving… and maybe tell us how it goes for you.
          </p>
          <p className="font-sans text-base sm:text-lg text-[#CBDA46] leading-relaxed max-w-2xl mx-auto">
            And hopefully, it saves you from forgetting the little things that become very big things three days before launch.
          </p>
        </div>
      </section>
    </div>
  );
};

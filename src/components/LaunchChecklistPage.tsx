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

  // Interactive in-app checkboxes for immediate utility
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  const currentItems = activeTab === 'new-launch' ? newLaunchItems : relaunchItems;
  const completedCount = currentItems.filter(item => checkedItems[item.id]).length;

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
    <div className="w-full bg-[#FAF7EE] text-[#0E1A15] relative selection:bg-[#CBDA46] selection:text-[#093624] overflow-x-hidden font-sans pt-24 sm:pt-28 pb-20">
      
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link to Free Stuff */}
        <div className="mb-6 pt-2">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('free-stuff');
              else window.location.hash = '#free-stuff';
            }}
            className="inline-flex items-center gap-2 font-sans font-semibold text-xs sm:text-sm text-[#093624] hover:text-[#15543D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Free stuff</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 1. HEADLINE & INTRO SECTION (WORD FOR WORD FROM COPY)                     */}
        {/* ========================================================================= */}
        <div className="mb-12">
          
          {/* Label Tag */}
          <div className="mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#15543D]">
              Headline:
            </span>
          </div>

          {/* Headline (Word for word) */}
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.15] mb-5">
            Are there things you should know before you launch or relaunch your product?
          </h1>

          {/* Affirmation Line (Word for word) */}
          <p className="font-display font-bold text-2xl sm:text-3xl text-[#15543D] leading-snug mb-8">
            Yes! And you’ve probably heard most of them before.
          </p>

          <div className="h-px w-full bg-[#093624]/15 my-8" />

          {/* Body paragraphs (Word for word) */}
          <div className="space-y-4 font-sans text-base sm:text-lg text-[#0E1A15]/90 leading-relaxed max-w-3xl">
            <p>
              There’s a lot that goes into a product launch, and it can quickly become overwhelming when it’s near time to launch.
            </p>
            <p className="font-semibold text-[#093624]">
              That’s why we built this checklist.
            </p>
            <p>
              This checklist will help you figure out what to prioritize, what to push back, and what to leave out completely.
            </p>
          </div>

          <div className="h-px w-full bg-[#093624]/15 my-8" />

          {/* How to use it section (Word for word) */}
          <div className="mb-4">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#093624] mb-3">
              How to use it
            </h2>
            <div className="space-y-3 font-sans text-base sm:text-lg text-[#0E1A15]/90 leading-relaxed max-w-3xl">
              <p>
                Download it and keep it wherever you manage your work, whether that&apos;s Notion, Google Docs, or your favourite project management tool.
              </p>
              <p>
                Use it to guide what needs to happen each day as you work towards your <span className="font-bold text-[#093624]">BIG launch day</span>.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-[#093624]/15 my-8" />
        </div>

        {/* ========================================================================= */}
        {/* 2. TOGGLE FEATURE SECTION: "We've split the checklist into two sections:"  */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#093624] mb-6">
            We&apos;ve split the checklist into two sections:
          </h2>

          {/* Dual Toggle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            
            {/* Option 01: New launch? */}
            <div
              onClick={() => setActiveTab('new-launch')}
              className={`relative cursor-pointer transition-all duration-300 p-6 sm:p-7 rounded-2xl border-2 flex flex-col justify-between ${
                activeTab === 'new-launch'
                  ? 'bg-white border-[#093624] shadow-[6px_6px_0px_#093624] translate-x-0'
                  : 'bg-white/60 border-[#093624]/30 hover:border-[#093624]/60 hover:bg-white/90 shadow-xs'
              }`}
            >
              {/* Active Marker Indicator */}
              {activeTab === 'new-launch' && (
                <div className="absolute -top-3 right-6 pointer-events-none z-10">
                  <Tape className="w-16 h-5" color="#CBDA46" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-wider">
                    01. New launch?
                  </span>
                  {activeTab === 'new-launch' && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded-full border border-[#CBDA46]">
                      SELECTED
                    </span>
                  )}
                </div>

                <p className="font-sans text-[0.95rem] text-[#2C3830] leading-relaxed mb-6">
                  Everything you need to think about when launching a new product is here.
                </p>
              </div>

              {/* Exact CTA prompt from brief: [Give it to me] */}
              <div className="pt-4 border-t border-[#093624]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('new-launch');
                    handleDownloadPDF();
                  }}
                  className={`inline-flex items-center gap-2 font-sans font-bold text-sm py-2 px-4 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'new-launch'
                      ? 'bg-[#093624] hover:bg-[#15543D] text-[#F7F4E9] shadow-xs'
                      : 'bg-[#093624]/10 hover:bg-[#093624] text-[#093624] hover:text-[#F7F4E9]'
                  }`}
                >
                  <Download className="w-4 h-4 text-[#CBDA46]" />
                  <span>Give it to me</span>
                  <span className="text-xs opacity-75 font-normal">(Download PDF)</span>
                </button>
              </div>
            </div>

            {/* Option 02: Re-launches? */}
            <div
              onClick={() => setActiveTab('re-launch')}
              className={`relative cursor-pointer transition-all duration-300 p-6 sm:p-7 rounded-2xl border-2 flex flex-col justify-between ${
                activeTab === 're-launch'
                  ? 'bg-white border-[#093624] shadow-[6px_6px_0px_#093624] translate-x-0'
                  : 'bg-white/60 border-[#093624]/30 hover:border-[#093624]/60 hover:bg-white/90 shadow-xs'
              }`}
            >
              {/* Active Marker Indicator */}
              {activeTab === 're-launch' && (
                <div className="absolute -top-3.5 right-6 pointer-events-none z-10">
                  <PaperClip className="w-5 h-8" color="#093624" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-wider">
                    02. Re-launches?
                  </span>
                  {activeTab === 're-launch' && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded-full border border-[#CBDA46]">
                      SELECTED
                    </span>
                  )}
                </div>

                <p className="font-sans text-[0.95rem] text-[#2C3830] leading-relaxed mb-6">
                  For when your product has already launched, and you&apos;re getting ready to do it again.
                </p>
              </div>

              {/* Exact CTA prompt from brief: [Give it to me] */}
              <div className="pt-4 border-t border-[#093624]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('re-launch');
                    handleDownloadPDF();
                  }}
                  className={`inline-flex items-center gap-2 font-sans font-bold text-sm py-2 px-4 rounded-xl transition-all cursor-pointer ${
                    activeTab === 're-launch'
                      ? 'bg-[#093624] hover:bg-[#15543D] text-[#F7F4E9] shadow-xs'
                      : 'bg-[#093624]/10 hover:bg-[#093624] text-[#093624] hover:text-[#F7F4E9]'
                  }`}
                >
                  <Download className="w-4 h-4 text-[#CBDA46]" />
                  <span>Give it to me</span>
                  <span className="text-xs opacity-75 font-normal">(Download PDF)</span>
                </button>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE IN-BROWSER CHECKLIST PAD                                      */}
          {/* ========================================================================= */}
          <div className="relative bg-[#FFFDF6] border-2 border-[#093624] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_#093624] mb-10">
            
            {/* Header with Title and Download Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#093624]/15 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded-sm border border-[#CBDA46]">
                    {activeTab === 'new-launch' ? '01. NEW LAUNCH CHECKLIST' : '02. RE-LAUNCH CHECKLIST'}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#6F7A6E]">
                    {completedCount}/{currentItems.length} ticked off
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#093624]">
                  {activeTab === 'new-launch' ? 'New Product Launch Checklist' : 'Product Re-launch Checklist'}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 bg-[#093624] hover:bg-[#15543D] text-[#F7F4E9] font-sans font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98] self-start sm:self-center"
              >
                <Download className="w-4 h-4 text-[#CBDA46]" />
                <span>Download this PDF</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#093624]/10 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-[#093624] h-full transition-all duration-300"
                style={{ width: `${(completedCount / currentItems.length) * 100}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 mb-6">
              {currentItems.map((item) => {
                const isDone = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isDone 
                        ? 'bg-[#EEF2CC]/50 border-[#CBDA46] text-[#093624]' 
                        : 'bg-white border-[#093624]/20 hover:border-[#093624]/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded text-[#093624] accent-[#093624] cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6F7A6E] block mb-0.5">
                        {item.category}
                      </span>
                      <p className={`font-sans text-sm sm:text-base leading-snug ${isDone ? 'line-through text-[#6F7A6E]' : 'text-[#0E1A15] font-medium'}`}>
                        {item.task}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download CTA Bar inside pad */}
            <div className="pt-4 border-t border-[#093624]/15 flex flex-wrap items-center justify-between gap-3">
              <span className="font-sans text-xs text-[#6F7A6E]">
                Take it with you to your project board or print it out.
              </span>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="font-sans font-bold text-xs text-[#093624] hover:text-[#15543D] underline underline-offset-4 decoration-[#CBDA46] hover:decoration-[#093624] transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>[Give it to me] Download PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. CLOSING SECTION (WORD FOR WORD FROM COPY)                              */}
        {/* ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#FAF7EE] border border-[#093624]/20">
          <div className="space-y-4 font-sans text-base sm:text-lg text-[#0E1A15]/90 leading-relaxed max-w-3xl">
            <p>
              Work through it, tick things off, and keep moving… and maybe tell us how it goes for you.
            </p>
            <p className="font-medium text-[#093624]">
              And hopefully, it saves you from forgetting the little things that become very big things three days before launch.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-[#093624]/15 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="md"
              showSparkles={false}
              onClick={onOpenBooking}
              className="font-bold text-sm"
            >
              Need hands-on launch execution? Book a call →
            </Button>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('contact');
              }}
              className="font-sans font-semibold text-sm text-[#093624] hover:underline cursor-pointer"
            >
              Or drop us a quick note
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

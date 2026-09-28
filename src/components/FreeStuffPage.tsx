import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Calculator, 
  CheckSquare, 
  Lock, 
  Download, 
  Clock, 
  FileText, 
  Layers, 
  HelpCircle,
  X,
  Share2,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  Percent,
  Users,
  Target
} from 'lucide-react';
import { Button } from './Button';
import { MarkerUnderline, Tape, PaperClip } from './ScrapbookAssets';

interface FreeStuffPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact' | 'privacy-policy' | 'case-studies' | 'case-study-detail' | 'free-stuff' | 'launch-checklist', sectionId?: string) => void;
}

export const FreeStuffPage: React.FC<FreeStuffPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  // Modal state for active interactive tools
  const [activeModal, setActiveModal] = useState<'launch-checklist' | 'gtm-calculator' | null>(null);

  // GTM Calculator State
  const [dealSize, setDealSize] = useState<number>(18000);
  const [monthlyLeads, setMonthlyLeads] = useState<number>(45);
  const [closeRate, setCloseRate] = useState<number>(18);
  const [founderHoursPerWeek, setFounderHoursPerWeek] = useState<number>(14);

  // Launch Checklist State (interactive checkboxes)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true,
    'c3': false,
    'c4': true,
    'c5': false,
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;

  // Calculated values for GTM Calculator
  const estimatedAnnualPipeline = Math.round(monthlyLeads * (closeRate / 100) * dealSize * 12);
  const potentialHoursSavedYearly = founderHoursPerWeek * 48 * 0.65; // 65% delegation with automated engine

  const handleShareTool = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  const handleCtaClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  const checklistItems = [
    { id: 'c1', category: 'Positioning & Messaging', task: 'One crisp sentence explaining who this is for and why existing alternatives suck' },
    { id: 'c2', category: 'Positioning & Messaging', task: 'Founder POV narrative draft ready for LinkedIn and long-form posting' },
    { id: 'c3', category: 'Positioning & Messaging', task: 'Proof bank gathered: 3 client quotes, data point receipts, or before-and-after benchmarks' },
    { id: 'c4', category: 'Outreach & Distribution', task: 'Cleaned target list of 250 high-affinity ICP accounts verified with email + LinkedIn URL' },
    { id: 'c5', category: 'Outreach & Distribution', task: '3-stage warmup engagement strategy deployed 14 days before announcement' },
    { id: 'c6', category: 'Outreach & Distribution', task: 'Dedicated calendar booking link with disqualification questions active' },
    { id: 'c7', category: 'Conversion & Closing', task: 'One-page interactive deck or live Notion proposal ready to send within 2 hours of call' },
    { id: 'c8', category: 'Conversion & Closing', task: 'Fast-mover pilot incentive structure defined with explicit expiration timestamp' },
  ];

  return (
    <div className="w-full bg-[#FAF7EE] text-[#0E1A15] relative selection:bg-[#CBDA46] selection:text-[#093624] overflow-x-hidden font-sans pt-24 sm:pt-28 pb-20">
      
      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* Exact copy from brief:                                                    */}
      {/* Headline: Free stuff for your GTM                                         */}
      {/* Subheading: Tools, checklists, and playbooks we've built to help you      */}
      {/* figure out everything GTM and get moving.                                 */}
      {/* Handwritten note: Steal whatever's useful. We won't tell.                 */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-10 pb-12 text-center">

        {/* Headline */}
        <div className="relative inline-block mx-auto max-w-4xl">
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-[#093624] tracking-tight leading-[1.1] mb-5">
            Free stuff for your{' '}
            <span className="relative inline-block">
              GTM
              <MarkerUnderline color="#CBDA46" className="w-full h-3 -bottom-1.5 left-0" />
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto font-sans text-base sm:text-lg md:text-xl text-[#0E1A15]/85 leading-relaxed mb-3">
          Tools, checklists, and playbooks we've built to help you figure out everything GTM and get moving.
        </p>

        {/* Handwritten note: small, visually balanced, without brackets */}
        <div className="flex items-center justify-center select-none pt-1">
          <span className="font-hand text-base sm:text-lg md:text-xl text-[#093624]/90 tracking-wide -rotate-1 inline-block">
            Steal whatever's useful. We won't tell.
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6-CARD FREE STUFF GRID                                                    */}
      {/* Exact 6 items matching brief:                                             */}
      {/* 1. Launch Checklist                                                       */}
      {/* 2. GTM Calculator                                                         */}
      {/* 3. Hook Generator                                                         */}
      {/* 4. FREE STUFF FOUR                                                        */}
      {/* 5. FREE STUFF FIVE                                                        */}
      {/* 6. FREE STUFF SIX                                                         */}
      {/* ========================================================================= */}
      <section id="free-stuff-grid" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* ------------------------------------------------------------------- */}
          {/* Card 1: Launch Checklist                                            */}
          {/* Top accent: Coral Washi Tape                                        */}
          {/* ------------------------------------------------------------------- */}
          <div className="group relative transition-all duration-300">
            {/* Top Washi Tape in Coral #FF7A5C */}
            <div 
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-2 w-28 h-5 -top-2.5 left-1/2 -translate-x-1/2 bg-[rgba(255,122,92,0.85)]"
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg]"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className="relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-[1.65rem] text-[#093624] tracking-tight leading-snug mb-3">
                  Launch Checklist
                </h2>

                <p className="font-sans text-[0.95rem] sm:text-base text-[#15543D] leading-relaxed mb-6">
                  Everything to think about and cross-check before launching or relaunching your product.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-[#093624]/15 mt-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('launch-checklist');
                    } else {
                      window.location.hash = '#launch-checklist';
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#093624] hover:bg-[#15543D] text-[#F7F4E9] font-sans font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <CheckSquare className="w-4 h-4 text-[#CBDA46]" />
                  <span>Open Launch Checklist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Card 2: GTM Calculator                                              */}
          {/* Top accent: Paper Clip at top-left                                  */}
          {/* ------------------------------------------------------------------- */}
          <div className="group relative transition-all duration-300">
            {/* Paper Clip Top Left */}
            <div className="absolute -top-4 left-6 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
              <PaperClip className="w-6 h-10 text-[#093624]" color="#093624" />
            </div>

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg]"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className="relative z-10 p-7 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-[1.65rem] text-[#093624] tracking-tight leading-snug mb-3">
                  GTM Calculator
                </h2>

                <p className="font-sans text-[0.95rem] sm:text-base text-[#15543D] leading-relaxed mb-6">
                  See what’s working, what isn’t, and where your Founder-led GTM needs some work. No signup required.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-[#093624]/15 mt-auto">
                <button
                  type="button"
                  onClick={() => setActiveModal('gtm-calculator')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#093624] hover:bg-[#15543D] text-[#F7F4E9] font-sans font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <Calculator className="w-4 h-4 text-[#CBDA46]" />
                  <span>Launch GTM Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Card 3: Hook Generator (Not ready yet - lower opacity)              */}
          {/* Top accent: Amber Washi Tape                                        */}
          {/* ------------------------------------------------------------------- */}
          <div className="group relative transition-all duration-300 opacity-60 hover:opacity-85">
            {/* Corner Washi Tape Top Right in Amber #F5A621 */}
            <div 
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-2 w-24 h-5 -top-2.5 right-6 bg-[rgba(245,166,33,0.7)]"
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/10 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2.5 group-hover:rotate-[0.5deg]"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className="relative z-10 p-7 sm:p-8 bg-white/80 text-[#093624] border-2 border-[#093624]/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-[1.65rem] text-[#093624]/75 tracking-tight leading-snug mb-3">
                  Hook Generator
                </h2>

                <p className="font-sans text-[0.95rem] sm:text-base text-[#15543D]/70 italic leading-relaxed mb-6">
                  This is not ready yet
                </p>
              </div>

              {/* Locked CTA */}
              <div className="pt-4 border-t border-[#093624]/15 mt-auto flex items-center justify-between">
                <span className="font-mono text-xs text-[#6F7A6E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Coming in next drop
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="font-sans text-xs font-semibold text-[#093624] hover:underline cursor-pointer"
                >
                  Request early access →
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Card 4: FREE STUFF FOUR (Not ready yet - lower opacity)             */}
          {/* Top accent: Lime Washi Tape                                         */}
          {/* ------------------------------------------------------------------- */}
          <div className="group relative transition-all duration-300 opacity-60 hover:opacity-85">
            {/* Top Washi Tape in Lime #CBDA46 */}
            <div 
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-2 w-28 h-5 -top-2.5 left-1/2 -translate-x-1/2 bg-[rgba(203,218,70,0.7)]"
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/10 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2.5 group-hover:rotate-[-0.5deg]"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className="relative z-10 p-7 sm:p-8 bg-white/80 text-[#093624] border-2 border-[#093624]/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-[1.65rem] text-[#093624]/75 tracking-tight leading-snug mb-3">
                  FREE STUFF FOUR
                </h2>

                <p className="font-sans text-[0.95rem] sm:text-base text-[#15543D]/70 italic leading-relaxed mb-6">
                  This is not ready yet
                </p>
              </div>

              {/* Locked CTA */}
              <div className="pt-4 border-t border-[#093624]/15 mt-auto flex items-center justify-between">
                <span className="font-mono text-xs text-[#6F7A6E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Coming in next drop
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="font-sans text-xs font-semibold text-[#093624] hover:underline cursor-pointer"
                >
                  Request early access →
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Card 5: FREE STUFF FIVE (Not ready yet - lower opacity)             */}
          {/* Top accent: Paper Clip at top-right                                 */}
          {/* ------------------------------------------------------------------- */}
          <div className="group relative transition-all duration-300 opacity-60 hover:opacity-85">
            {/* Paper Clip Top Right */}
            <div className="absolute -top-4 right-7 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1 opacity-70">
              <PaperClip className="w-6 h-10 text-[#093624]" color="#093624" />
            </div>

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/10 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2.5 group-hover:rotate-[-0.5deg]"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className="relative z-10 p-7 sm:p-8 bg-white/80 text-[#093624] border-2 border-[#093624]/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-[1.65rem] text-[#093624]/75 tracking-tight leading-snug mb-3">
                  FREE STUFF FIVE
                </h2>

                <p className="font-sans text-[0.95rem] sm:text-base text-[#15543D]/70 italic leading-relaxed mb-6">
                  This is not ready yet
                </p>
              </div>

              {/* Locked CTA */}
              <div className="pt-4 border-t border-[#093624]/15 mt-auto flex items-center justify-between">
                <span className="font-mono text-xs text-[#6F7A6E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Coming in next drop
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="font-sans text-xs font-semibold text-[#093624] hover:underline cursor-pointer"
                >
                  Request early access →
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Card 6: FREE STUFF SIX (Not ready yet - lower opacity)              */}
          {/* Top accent: Soft Teal Washi Tape                                    */}
          {/* ------------------------------------------------------------------- */}
          <div className="group relative transition-all duration-300 opacity-60 hover:opacity-85">
            {/* Corner Washi Tape Top Right */}
            <div 
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-2 w-24 h-5 -top-2.5 right-6 bg-[rgba(100,180,160,0.7)]"
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            {/* Hand-Drawn Offset Shadow */}
            <div 
              className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/10 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2.5 group-hover:rotate-[0.5deg]"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
            />

            {/* Main Note Card */}
            <div 
              className="relative z-10 p-7 sm:p-8 bg-white/80 text-[#093624] border-2 border-[#093624]/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-between h-full"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-[1.65rem] text-[#093624]/75 tracking-tight leading-snug mb-3">
                  FREE STUFF SIX
                </h2>

                <p className="font-sans text-[0.95rem] sm:text-base text-[#15543D]/70 italic leading-relaxed mb-6">
                  This is not ready yet
                </p>
              </div>

              {/* Locked CTA */}
              <div className="pt-4 border-t border-[#093624]/15 mt-auto flex items-center justify-between">
                <span className="font-mono text-xs text-[#6F7A6E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Coming in next drop
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="font-sans text-xs font-semibold text-[#093624] hover:underline cursor-pointer"
                >
                  Request early access →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL 1: LAUNCH CHECKLIST                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal === 'launch-checklist' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-[#03180F]/70 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#FFFDF6] border-2 border-[#093624] rounded-2xl p-6 sm:p-8 shadow-[10px_10px_0px_#093624] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#093624]/15 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded-sm border border-[#CBDA46]">
                      INTERACTIVE CHECKLIST
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#6F7A6E]">
                      {completedChecklistCount}/{checklistItems.length} Complete
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight">
                    Launch Checklist
                  </h3>
                  <p className="font-sans text-sm text-[#2C3830] mt-1">
                    Everything to think about and cross-check before launching or relaunching your product.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full border border-[#093624]/30 text-[#093624] hover:bg-[#093624]/10 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#093624]/10 h-2.5 rounded-full overflow-hidden mb-6">
                <div 
                  className="bg-[#093624] h-full transition-all duration-300"
                  style={{ width: `${(completedChecklistCount / checklistItems.length) * 100}%` }}
                />
              </div>

              {/* Checklist items */}
              <div className="space-y-3 mb-6">
                {checklistItems.map((item) => {
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
                        <p className={`font-sans text-sm leading-snug ${isDone ? 'line-through text-[#6F7A6E]' : 'text-[#0E1A15] font-medium'}`}>
                          {item.task}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#093624]/15 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleShareTool}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#093624] hover:underline cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link copied to clipboard!' : 'Share this checklist'}</span>
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  showSparkles={false}
                  onClick={() => {
                    setActiveModal(null);
                    handleCtaClick();
                  }}
                  className="font-bold text-xs"
                >
                  Need launch help? Talk to us →
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL 2: GTM CALCULATOR                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal === 'gtm-calculator' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-[#03180F]/70 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#FFFDF6] border-2 border-[#093624] rounded-2xl p-6 sm:p-8 shadow-[10px_10px_0px_#093624] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#093624]/15 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded-sm border border-[#CBDA46]">
                      INTERACTIVE CALCULATOR
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#15543D]">
                      Instant results · No email required
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight">
                    GTM Calculator
                  </h3>
                  <p className="font-sans text-sm text-[#2C3830] mt-1">
                    See what’s working, what isn’t, and where your Founder-led GTM needs some work. No signup required.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full border border-[#093624]/30 text-[#093624] hover:bg-[#093624]/10 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sliders Form */}
              <div className="space-y-5 mb-7">
                {/* 1. Average Deal Size / ACV */}
                <div>
                  <div className="flex items-center justify-between text-sm font-sans mb-1.5">
                    <span className="font-semibold text-[#093624]">Average Annual Contract Value (ACV)</span>
                    <span className="font-mono font-bold text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded">
                      ${dealSize.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="100000"
                    step="1000"
                    value={dealSize}
                    onChange={(e) => setDealSize(Number(e.target.value))}
                    className="w-full h-2 bg-[#093624]/15 rounded-lg appearance-none cursor-pointer accent-[#093624]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#6F7A6E] mt-1">
                    <span>$3k</span>
                    <span>$50k</span>
                    <span>$100k+</span>
                  </div>
                </div>

                {/* 2. Monthly Inbound / Outbound Conversations */}
                <div>
                  <div className="flex items-center justify-between text-sm font-sans mb-1.5">
                    <span className="font-semibold text-[#093624]">Monthly Target Pipeline Conversations</span>
                    <span className="font-mono font-bold text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded">
                      {monthlyLeads} convos
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="5"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                    className="w-full h-2 bg-[#093624]/15 rounded-lg appearance-none cursor-pointer accent-[#093624]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#6F7A6E] mt-1">
                    <span>5</span>
                    <span>75</span>
                    <span>150/mo</span>
                  </div>
                </div>

                {/* 3. Deal Close Rate % */}
                <div>
                  <div className="flex items-center justify-between text-sm font-sans mb-1.5">
                    <span className="font-semibold text-[#093624]">Opportunity-to-Close Rate</span>
                    <span className="font-mono font-bold text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded">
                      {closeRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-2 bg-[#093624]/15 rounded-lg appearance-none cursor-pointer accent-[#093624]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#6F7A6E] mt-1">
                    <span>5% (cold)</span>
                    <span>20% (average)</span>
                    <span>50% (warm)</span>
                  </div>
                </div>

                {/* 4. Founder hours lost */}
                <div>
                  <div className="flex items-center justify-between text-sm font-sans mb-1.5">
                    <span className="font-semibold text-[#093624]">Founder Hours Spent on GTM Weekly</span>
                    <span className="font-mono font-bold text-[#093624] bg-[#EEF2CC] px-2 py-0.5 rounded">
                      {founderHoursPerWeek} hrs/week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    step="1"
                    value={founderHoursPerWeek}
                    onChange={(e) => setFounderHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-[#093624]/15 rounded-lg appearance-none cursor-pointer accent-[#093624]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#6F7A6E] mt-1">
                    <span>2 hrs</span>
                    <span>20 hrs</span>
                    <span>40 hrs</span>
                  </div>
                </div>
              </div>

              {/* Results Card */}
              <div className="bg-[#093624] text-[#F7F4E9] rounded-xl p-5 sm:p-6 mb-6">
                <span className="font-mono text-xs font-bold text-[#CBDA46] uppercase tracking-wider block mb-3">
                  ESTIMATED SYSTEM OUTPUT (ANNUALIZED)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <span className="text-xs text-[#A3C2A3] block">Potential Closed ARR</span>
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#CBDA46]">
                      ${estimatedAnnualPipeline.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <span className="text-xs text-[#A3C2A3] block">Founder Hours Saved / Year</span>
                    <span className="font-display font-bold text-2xl sm:text-3xl text-white">
                      {Math.round(potentialHoursSavedYearly)} hrs
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleShareTool}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#093624] hover:underline cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link copied!' : 'Share calculator'}</span>
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  showSparkles={false}
                  onClick={() => {
                    setActiveModal(null);
                    handleCtaClick();
                  }}
                  className="font-bold text-xs"
                >
                  Review your numbers with us →
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

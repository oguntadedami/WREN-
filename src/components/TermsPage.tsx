import React, { useEffect } from 'react';
import { Highlight, Tape, PaperClip } from './ScrapbookAssets';
import { Button } from './Button';
import { ShieldCheck, FileText, ArrowRight, CheckCircle2, Lock, Scale } from 'lucide-react';

interface TermsPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: any, sectionId?: string) => void;
}

interface TocItem {
  num: string;
  title: string;
  id: string;
}

const TOC_LEFT: TocItem[] = [
  { num: '01', title: 'Agreement to terms', id: 'agreement-to-terms' },
  { num: '02', title: 'Studio services & engagement models', id: 'services-and-engagement' },
  { num: '03', title: 'Founder participation & client responsibilities', id: 'founder-participation' },
  { num: '04', title: 'Fees, billing, and payment terms', id: 'fees-and-billing' },
  { num: '05', title: 'Intellectual property & deliverable ownership', id: 'intellectual-property' },
  { num: '06', title: 'Confidentiality & non-disclosure', id: 'confidentiality' },
  { num: '07', title: 'Approval process & scope adjustments', id: 'approvals-and-scope' },
];

const TOC_RIGHT: TocItem[] = [
  { num: '08', title: 'Warranties & business disclaimers', id: 'warranties-and-disclaimers' },
  { num: '09', title: 'Limitation of liability', id: 'limitation-of-liability' },
  { num: '10', title: 'Term, suspension, and termination', id: 'term-and-termination' },
  { num: '11', title: 'Case studies, attribution, and public results', id: 'case-studies-and-attribution' },
  { num: '12', title: 'Non-solicitation of studio talent', id: 'non-solicitation' },
  { num: '13', title: 'Governing law & dispute resolution', id: 'governing-law' },
  { num: '14', title: 'Contact us & legal notices', id: 'contact-legal' },
];

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenBooking, onNavigate }) => {
  // Scroll to top or anchor on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1 && hash !== '#terms') {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
          if (lenis) {
            lenis.scrollTo(el, { offset: -90, duration: 1.1 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 150);
        return;
      }
    }

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | Element | string, options?: { offset?: number; duration?: number; immediate?: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number; immediate?: boolean }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -90, duration: 1.1 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-[#0E1A15] pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 notebook-grid">
      <div className="max-w-4xl mx-auto">
        
        {/* ========================================================================= */}
        {/* HEADER                                                                    */}
        {/* ========================================================================= */}
        <header id="terms-header" className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2CC] border border-[#093624]/15 text-xs font-mono font-bold tracking-widest text-[#093624] uppercase mb-4 select-none">
            <Scale className="w-3.5 h-3.5 text-[#093624]" />
            <span>LEGAL // TERMS OF SERVICE</span>
          </div>
          
          <h1 className="font-display font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.1] mb-6">
            Terms of Service
          </h1>

          <div className="text-sm sm:text-base font-sans text-[#0E1A15]/80 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Effective date:{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                January 1, 2026
              </Highlight>
            </span>
            <span className="hidden sm:inline text-[#093624]/20">•</span>
            <span>
              Last updated:{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                September 28, 2026
              </Highlight>
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#2C3830] font-sans leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the services, websites, deliverables, interactive tools, and advisory provided by{' '}
            <strong className="font-semibold text-[#093624]">Wren Labs LLC</strong> (&ldquo;Wren,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), doing business as Wren.
          </p>

          <p className="text-base sm:text-lg text-[#2C3830] font-sans leading-relaxed mt-4">
            We believe in honest partnerships and fair expectations. We’ve written these terms in plain, unambiguous English so you understand exactly how we work, what you own, and how we protect your business.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* HIGHLIGHT CALLOUT CARD: THE THREE CORE COMMITMENTS                        */}
        {/* ========================================================================= */}
        <div className="relative group mb-14">
          <div 
            className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-1 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14 bg-[rgba(203,218,70,0.92)]"
            style={{
              clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
            }}
          />
          <div 
            className="absolute inset-0 translate-x-2 translate-y-2.5 bg-[#093624]/10 rounded-2xl"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          />
          <div 
            className="relative z-10 p-6 sm:p-8 bg-white/95 border-2 border-[#093624] rounded-2xl shadow-xs"
            style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
          >
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#15543D] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#093624]" />
              <span>THE WREN ENGAGEMENT PHILOSOPHY IN BRIEF</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
              <div>
                <div className="font-serif font-bold text-lg text-[#093624] mb-1">
                  1. You Own Your Assets
                </div>
                <p className="text-xs sm:text-sm text-[#54605a] leading-relaxed">
                  Every custom piece of content, positioning narrative, ICP playbook, and pre-sale asset created specifically for your company belongs 100% to you.
                </p>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-[#093624] mb-1">
                  2. Total Confidentiality
                </div>
                <p className="text-xs sm:text-sm text-[#54605a] leading-relaxed">
                  Your pipeline numbers, customer lists, roadmap secrets, and sales call notes are strictly confidential and protected by standard mutual NDA.
                </p>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-[#093624] mb-1">
                  3. Founder Authentic
                </div>
                <p className="text-xs sm:text-sm text-[#54605a] leading-relaxed">
                  Founder-led GTM requires genuine founder access. We do the heavy lifting, but we rely on your true point of view and real product expertise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABLE OF CONTENTS                                                         */}
        {/* ========================================================================= */}
        <nav 
          id="terms-toc"
          aria-label="Table of Contents" 
          className="bg-white/80 border border-[#093624]/15 rounded-2xl p-6 sm:p-8 shadow-xs mb-16 sm:mb-20"
        >
          <div className="text-xs font-mono font-bold tracking-widest text-[#093624]/70 uppercase mb-5">
            Table of Contents
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {/* Left Column (01 - 07) */}
            <div className="space-y-2.5">
              {TOC_LEFT.map((item) => (
                <div key={item.id} className="text-sm sm:text-base">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleTocClick(e, item.id)}
                    className="group inline-flex items-baseline text-[#093624] hover:text-[#186043] transition-colors"
                  >
                    <span className="font-mono text-xs text-[#093624]/60 mr-2.5 select-none w-5">
                      {item.num}.
                    </span>
                    <span className="group-hover:underline underline-offset-4 decoration-[#093624]/40">
                      {item.title}
                    </span>
                  </a>
                </div>
              ))}
            </div>

            {/* Right Column (08 - 14) */}
            <div className="space-y-2.5">
              {TOC_RIGHT.map((item) => (
                <div key={item.id} className="text-sm sm:text-base">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleTocClick(e, item.id)}
                    className="group inline-flex items-baseline text-[#093624] hover:text-[#186043] transition-colors"
                  >
                    <span className="font-mono text-xs text-[#093624]/60 mr-2.5 select-none w-5">
                      {item.num}.
                    </span>
                    <span className="group-hover:underline underline-offset-4 decoration-[#093624]/40">
                      {item.title}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* ========================================================================= */}
        {/* MAIN BODY SECTIONS                                                        */}
        {/* ========================================================================= */}
        <div className="space-y-16 sm:space-y-20 text-[#2C3830] font-sans text-base sm:text-lg leading-relaxed">
          
          {/* Section 01 */}
          <section id="agreement-to-terms" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              01 // FORMATION & SCOPE
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              1. Agreement to terms
            </h2>
            <p className="mb-4">
              By accessing our website (<strong>getwren.io</strong>), engaging our studio through a Statement of Work (&ldquo;SOW&rdquo;) or service agreement, using our free interactive calculators, or subscribing to our newsletters, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p>
              If you are agreeing to these Terms on behalf of an entity, organization, or company (such as your startup or employer), you represent and warrant that you have the authority to bind that entity to these Terms. If you do not agree with any part of these Terms, you may not access or use our services.
            </p>
          </section>

          {/* Section 02 */}
          <section id="services-and-engagement" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              02 // STUDIO DELIVERABLES
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              2. Studio services &amp; engagement models
            </h2>
            <p className="mb-4">
              Wren provides bespoke go-to-market advisory, founder-led content systems, launch execution, product marketing strategy, and demand engine implementation for B2B tech and SaaS businesses.
            </p>
            <div className="space-y-3 pl-4 border-l-2 border-[#CBDA46] my-5">
              <div>
                <strong className="text-[#093624]">Statement of Work (&ldquo;SOW&rdquo;):</strong> Specific engagement scopes, sprint timelines, pricing, and agreed deliverables are set forth in mutually executed SOWs or digital checkout agreements.
              </div>
              <div>
                <strong className="text-[#093624]">Sprints &amp; Retainers:</strong> Sprint-based deliverables are fulfilled within the agreed calendar sprint window. Retained advisory services operate on recurring monthly cycles with designated weekly syncs.
              </div>
              <div>
                <strong className="text-[#093624]">Free Tools &amp; Public Assets:</strong> Free resources (such as our GTM Calculator, Launch Checklists, and diagnostics) are provided as complimentary business tools without warranty of revenue outcome.
              </div>
            </div>
            <p>
              We reserve the right to decline any project, lead, or client inquiry that does not align with our studio capacity, values, or operational standards.
            </p>
          </section>

          {/* Section 03 */}
          <section id="founder-participation" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              03 // MUTUAL PARTNERSHIP
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              3. Founder participation &amp; client responsibilities
            </h2>
            <p className="mb-4">
              Founder-led GTM cannot be run entirely in an isolated vacuum. Because our systems turn the founder's authentic presence and subject-matter depth into pipeline, your active involvement is crucial to commercial success:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Interview &amp; Download Access:</strong> You agree to attend scheduled strategic interviews, messaging downloads, and review sessions (typically 45–60 minutes bi-weekly or as defined in your SOW).
              </li>
              <li>
                <strong>Timely Feedback:</strong> You agree to provide feedback on drafts, positioning memos, and distribution assets within three (3) business days so momentum is maintained.
              </li>
              <li>
                <strong>Accuracy of Materials:</strong> You are responsible for ensuring that all technical claims, compliance details, and customer facts provided to Wren are accurate and lawful.
              </li>
            </ul>
            <p>
              Delays in client reviews or missed milestone sessions may adjust deliverable schedules but do not relieve client of scheduled payment obligations.
            </p>
          </section>

          {/* Section 04 */}
          <section id="fees-and-billing" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              04 // FINANCIAL TERMS
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              4. Fees, billing, and payment terms
            </h2>
            <p className="mb-4">
              All fees for services are clearly stated in your custom proposal, SOW, or invoice:
            </p>
            <div className="space-y-3 mb-5">
              <p>
                <strong>Invoicing &amp; Retainers:</strong> Unless explicitly noted otherwise in an SOW, sprint projects require 50% upfront payment prior to kick-off, with the balance due upon sprint completion or milestone delivery. Monthly retainers are billed in advance on the 1st of each service month.
              </p>
              <p>
                <strong>Payment Methods:</strong> Payments are processed via electronic bank transfer (ACH / Wire), Stripe, or credit card. Invoices are due within seven (7) days of issuance.
              </p>
              <p>
                <strong>Late Payments:</strong> Invoices overdue by more than fourteen (14) days may incur a 1.5% monthly late fee or the maximum allowed by law. Wren reserves the right to pause active campaigns or content distribution if accounts are delinquent.
              </p>
              <p>
                <strong>Taxes:</strong> All listed fees are exclusive of applicable federal, state, local, or value-added taxes (VAT), which shall be paid by the client where required by law.
              </p>
            </div>
          </section>

          {/* Section 05 */}
          <section id="intellectual-property" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              05 // IP &amp; OWNERSHIP
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              5. Intellectual property &amp; deliverable ownership
            </h2>
            
            <div className="p-5 sm:p-6 bg-[#EEF2CC]/50 border border-[#093624]/15 rounded-xl mb-6">
              <h3 className="font-serif font-bold text-lg text-[#093624] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#15543D]" />
                <span>The Golden Rule: You own your deliverables</span>
              </h3>
              <p className="text-sm sm:text-base text-[#2C3830]">
                Upon full payment of all applicable fees, you own all right, title, and interest in and to the custom deliverables produced expressly for your business (e.g., your specific founder content pieces, custom positioning decks, company playbooks, and ICP messaging matrices).
              </p>
            </div>

            <p className="mb-4">
              <strong>Studio Background IP:</strong> Wren retains all rights, title, and ownership in our pre-existing proprietary methodologies, general framework architectures, internal templates, analytics calculators, reusable code snippets, and standard operational processes (&ldquo;Wren Background IP&rdquo;).
            </p>
            <p>
              Wren grants you a perpetual, non-exclusive, worldwide, royalty-free license to use any Wren Background IP embedded in your completed deliverables solely for your internal business operations.
            </p>
          </section>

          {/* Section 06 */}
          <section id="confidentiality" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              06 // PRIVACY &amp; NDA
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              6. Confidentiality &amp; non-disclosure
            </h2>
            <p className="mb-4">
              We treat your business with the highest level of professional discretion:
            </p>
            <p className="mb-4">
              &ldquo;Confidential Information&rdquo; includes any proprietary business metrics, pipeline data, unreleased product roadmaps, pricing structures, customer lists, pitch decks, and internal notes disclosed by either party during the engagement.
            </p>
            <p className="mb-4">
              Each party agrees to safeguard the other party&rsquo;s Confidential Information with at least the same degree of care it uses for its own confidential records (and no less than reasonable care). Confidential Information will never be disclosed to third parties without prior written consent, except to vetted contractors and legal advisors under strict confidentiality obligations.
            </p>
            <p>
              Confidentiality obligations survive for a period of three (3) years following the termination or expiration of our engagement (and indefinitely regarding trade secrets).
            </p>
          </section>

          {/* Section 07 */}
          <section id="approvals-and-scope" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              07 // REVISIONS &amp; DRIFT
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              7. Approval process &amp; scope adjustments
            </h2>
            <p className="mb-4">
              Our sprints include iterative feedback loops. Each deliverable milestone includes up to two (2) rounds of reasonable revisions based on agreed strategic briefs.
            </p>
            <p>
              Requests for new channels, additional campaigns, or structural positioning pivots outside the original SOW will be documented as a separate Scope Change Order with associated timelines and fees.
            </p>
          </section>

          {/* Section 08 */}
          <section id="warranties-and-disclaimers" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              08 // DISCLAIMERS
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              8. Warranties &amp; business disclaimers
            </h2>
            <p className="mb-4">
              We stand behind the craft, strategic diligence, and quality of our work:
            </p>
            <p className="mb-4">
              <strong>Professional Standard:</strong> Wren warrants that all services will be performed in a professional, workmanlike manner in accordance with recognized industry standards.
            </p>
            <p className="mb-4 text-[#093624] font-medium">
              <strong>Commercial Outcome Disclaimer:</strong> While our GTM engines are designed to maximize qualified pipeline and inbound demand, commercial growth depends on numerous external factors outside our control—including your product quality, sales team closing ability, market timing, pricing elasticity, and competitor behavior.
            </p>
            <p className="text-sm font-mono uppercase tracking-wide text-[#54605a]">
              EXCEPT AS EXPRESSLY SET FORTH HEREIN, ALL SERVICES AND TOOLS ARE PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER STATUTORY, EXPRESS, OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR GUARANTEES OF SPECIFIC REVENUE NUMBERS.
            </p>
          </section>

          {/* Section 09 */}
          <section id="limitation-of-liability" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              09 // LIABILITY CAP
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              9. Limitation of liability
            </h2>
            <p className="mb-4">
              To the maximum extent permitted by applicable law:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                In no event shall either party be liable to the other for indirect, incidental, consequential, special, punitive, or exemplary damages, or for lost profits, lost pipeline revenue, or loss of goodwill.
              </li>
              <li>
                Each party&rsquo;s total aggregate liability arising out of or related to these Terms or any SOW, whether in contract, tort, or otherwise, shall be strictly capped at the total amount paid by client to Wren under the specific SOW in the six (6) months preceding the incident.
              </li>
            </ul>
            <p>
              Nothing in this section limits liability for gross negligence, willful misconduct, breach of confidentiality obligations, or client payment obligations.
            </p>
          </section>

          {/* Section 10 */}
          <section id="term-and-termination" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              10 // ENGAGEMENT LIFECYCLE
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              10. Term, suspension, and termination
            </h2>
            <p className="mb-4">
              <strong>Sprint Engagements:</strong> Sprints commence on the kick-off date specified in the SOW and conclude upon final deliverable handover.
            </p>
            <p className="mb-4">
              <strong>Retained Advisory:</strong> Ongoing retainers may be canceled by either party with thirty (30) days prior written notice.
            </p>
            <p className="mb-4">
              <strong>Termination for Cause:</strong> Either party may immediately terminate an engagement if the other party materially breaches any provision of these Terms or an SOW and fails to cure such breach within fourteen (14) days of written notice.
            </p>
            <p>
              Upon termination, client will pay Wren for all completed work and approved work-in-progress up to the effective termination date.
            </p>
          </section>

          {/* Section 11 */}
          <section id="case-studies-and-attribution" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              11 // CASE STUDIES &amp; LOGOS
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              11. Case studies, attribution, and public results
            </h2>
            <p className="mb-4">
              We take pride in our partners’ wins. Unless you explicitly request a confidential or white-label engagement in your SOW:
            </p>
            <p className="mb-4">
              You grant Wren the right to include your company name and logo in our public client roster, portfolio, and marketing materials.
            </p>
            <p>
              Any detailed case study outlining specific metric figures, pipeline conversions, or strategic quotes will be reviewed with you in advance for accuracy and written approval before public release.
            </p>
          </section>

          {/* Section 12 */}
          <section id="non-solicitation" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              12 // TALENT PROTECTION
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              12. Non-solicitation of studio talent
            </h2>
            <p>
              During the term of our engagement and for twelve (12) months thereafter, you agree not to directly solicit, recruit, or hire any Wren employee, strategic consultant, or core contractor introduced through our engagement without prior written authorization from Wren. (General public job postings not targeted at Wren staff do not violate this clause.)
            </p>
          </section>

          {/* Section 13 */}
          <section id="governing-law" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              13 // JURISDICTION
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              13. Governing law &amp; dispute resolution
            </h2>
            <p className="mb-4">
              These Terms and any dispute arising from our services shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles.
            </p>
            <p>
              The parties agree to attempt in good faith to resolve any dispute or claim through informal executive negotiation for at least thirty (30) days before initiating formal litigation or arbitration in courts of competent jurisdiction located in Wilmington, Delaware.
            </p>
          </section>

          {/* Section 14 */}
          <section id="contact-legal" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              14 // CONTACT
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              14. Contact us &amp; legal notices
            </h2>
            <p className="mb-6">
              If you have any questions regarding these Terms, or wish to send official legal notices, please reach out directly:
            </p>

            <div className="bg-white border-2 border-[#093624] rounded-2xl p-6 sm:p-8 shadow-xs max-w-xl">
              <div className="font-serif font-bold text-xl text-[#093624] mb-1">
                Wren Labs LLC
              </div>
              <div className="text-sm font-sans text-[#54605a] mb-4">
                Attn: Legal &amp; Studio Operations
              </div>
              <div className="space-y-1 text-sm font-sans text-[#093624]">
                <div>
                  Email:{' '}
                  <a href="mailto:legal@getwren.io" className="font-bold underline hover:text-[#15543D]">
                    legal@getwren.io
                  </a>
                </div>
                <div>Website: getwren.io</div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#093624]/10 flex flex-wrap items-center gap-3">
                {onOpenBooking ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    showSparkles={false}
                    onClick={onOpenBooking}
                    className="font-bold text-xs"
                  >
                    Schedule discussion →
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    showSparkles={false}
                    href="https://calendly.com/getwren/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs"
                  >
                    Schedule discussion →
                  </Button>
                )}
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy-policy')}
                    className="text-xs font-mono text-[#093624] hover:underline cursor-pointer"
                  >
                    View Privacy Policy →
                  </button>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* Back to top or home */}
        <div className="mt-16 pt-8 border-t border-[#093624]/15 flex items-center justify-between text-sm text-[#093624]">
          <a
            href="#terms-header"
            onClick={(e) => handleTocClick(e, 'terms-header')}
            className="hover:underline font-mono text-xs font-bold uppercase tracking-wider"
          >
            ↑ Back to top
          </a>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:underline font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Return to Home →
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default TermsPage;

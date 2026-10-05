import React, { useEffect } from 'react';
import { Highlight, PaperClip } from './ScrapbookAssets';

interface PrivacyPolicyPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: any, sectionId?: string) => void;
}

interface TocItem {
  num: string;
  title: string;
  id: string;
}

const TOC_LEFT: TocItem[] = [
  { num: '01', title: 'Who we are', id: 'who-we-are' },
  { num: '02', title: 'Personal information we collect', id: 'personal-information-we-collect' },
  { num: '03', title: 'How we use your information', id: 'how-we-use-your-information' },
  { num: '04', title: 'Legal bases for processing', id: 'legal-bases-for-processing' },
  { num: '05', title: 'Cookies and analytics', id: 'cookies-and-analytics' },
  { num: '06', title: 'Marketing communications', id: 'marketing-communications' },
  { num: '07', title: 'How we share information', id: 'how-we-share-information' },
  { num: '08', title: 'International data transfers', id: 'international-data-transfers' },
];

const TOC_RIGHT: TocItem[] = [
  { num: '09', title: 'Data retention', id: 'data-retention' },
  { num: '10', title: 'Your rights', id: 'your-rights' },
  { num: '11', title: 'Security', id: 'security' },
  { num: '12', title: "Children's privacy", id: 'childrens-privacy' },
  { num: '13', title: 'Third-party websites', id: 'third-party-websites' },
  { num: '14', title: 'Advertising, testimonials, and case studies', id: 'advertising-testimonials-and-case-studies' },
  { num: '15', title: 'Changes to this Privacy Policy', id: 'changes-to-this-privacy-policy' },
  { num: '16', title: 'Contact us', id: 'contact-us' },
];

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1 && hash !== '#privacy-policy') {
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
    <div className="min-h-screen bg-[#F7F4E9] text-[#0E1A15] pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <header id="privacy-header" className="mb-14 sm:mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-[#093624]/70 uppercase mb-3 select-none">
            LEGAL
          </div>
          
          <h1 className="font-display font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.1] mb-6">
            Privacy Policy
          </h1>

          <div className="text-sm sm:text-base font-sans text-[#0E1A15]/80 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Effective date:{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                June 28, 2026
              </Highlight>
            </span>
            <span className="hidden sm:inline text-[#093624]/20">•</span>
            <span>
              Last updated:{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                July 9, 2026
              </Highlight>
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#2C3830] font-sans leading-relaxed">
            This Privacy Policy explains how{' '}
            <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
              Wren Labs LLC
            </Highlight>{' '}
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects personal information when you visit getwren.io, contact us, or use our services.
          </p>
        </header>

        <div className="group relative transition-all duration-300 mb-16 sm:mb-20">
          <div className="absolute -top-4 left-6 sm:left-8 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
            <PaperClip className="w-6 h-10 text-[#093624]" color="#093624" />
          </div>

          <div 
            className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg]"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          />

          <nav 
            id="privacy-toc"
            aria-label="Table of Contents" 
            className="relative z-10 p-6 sm:p-8 md:p-9 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-start"
            style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
          >
            <div className="text-xs font-mono font-bold tracking-widest text-[#093624]/70 uppercase mb-5">
              Table of Contents
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="space-y-2.5">
                {TOC_LEFT.map((item) => (
                  <div key={item.id} className="text-sm sm:text-base">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className="group/link inline-flex items-baseline text-[#093624] hover:text-[#186043] transition-colors"
                    >
                      <span className="font-mono text-xs text-[#093624]/60 mr-2.5 select-none w-5">
                        {item.num}.
                      </span>
                      <span className="group-hover/link:underline underline-offset-4 decoration-[#093624]/40 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                {TOC_RIGHT.map((item) => (
                  <div key={item.id} className="text-sm sm:text-base">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className="group/link inline-flex items-baseline text-[#093624] hover:text-[#186043] transition-colors"
                    >
                      <span className="font-mono text-xs text-[#093624]/60 mr-2.5 select-none w-5">
                        {item.num}.
                      </span>
                      <span className="group-hover/link:underline underline-offset-4 decoration-[#093624]/40 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="space-y-12 sm:space-y-14 text-base sm:text-[1.05rem] text-[#2C3830] font-sans leading-relaxed">

          <section id="who-we-are" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              1. Who we are
            </h2>
            <p>
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                Wren Labs LLC
              </Highlight>{' '}
              is a marketing agency based in{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                Wyoming, US
              </Highlight>
              . If you have any questions about this Privacy Policy or our data practices, contact us at{' '}
              <a href="mailto:hello@getwren.io" className="text-[#093624] font-medium underline underline-offset-4 hover:text-[#186043]">
                hello@getwren.io
              </a>
              .
            </p>
          </section>

          <section id="personal-information-we-collect" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              2. Personal information we collect
            </h2>
            <p className="mb-3">
              We may collect the following categories of personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2.5">
              <li>
                Information you provide directly, such as your name, email address, phone number, company name, job title, project details, messages, and any other information you choose to share when you contact us, request a proposal, book a call, or subscribe to our newsletter.
              </li>
              <li>
                Booking information, such as details you provide when scheduling a consultation or meeting, including your name, email address, and meeting preferences.
              </li>
              <li>
                Client and business information, such as billing details, service requirements, communication records, and contract-related information.
              </li>
              <li>
                Technical information, such as IP address, browser type, device type, operating system, referring pages, pages viewed, approximate location derived from IP address, and timestamps.
              </li>
              <li>
                Cookie and analytics data collected through cookies, pixels, tags, and similar technologies.
              </li>
            </ul>
          </section>

          <section id="how-we-use-your-information" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              3. How we use your information
            </h2>
            <p className="mb-3">
              We use personal information to:
            </p>
            <ul className="list-disc pl-6 space-y-2.5">
              <li>respond to enquiries and provide quotes or proposals;</li>
              <li>communicate with you about projects, meetings, and client support;</li>
              <li>deliver our services and manage client relationships;</li>
              <li>send newsletters, updates, and marketing communications where permitted;</li>
              <li>improve our website, services, and user experience;</li>
              <li>monitor website performance and understand audience behaviour;</li>
              <li>process payments, maintain records, and meet legal, tax, accounting, and compliance obligations;</li>
              <li>detect, prevent, and address fraud, abuse, or security issues.</li>
            </ul>
          </section>

          <section id="legal-bases-for-processing" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              4. Legal bases for processing
            </h2>
            <p className="mb-3">
              Where the GDPR or similar laws apply, we rely on the following bases:
            </p>
            <ul className="list-disc pl-6 space-y-2.5">
              <li>
                <strong className="font-semibold text-[#093624]">Consent:</strong> for newsletters, optional cookies, and other situations where you actively agree.
              </li>
              <li>
                <strong className="font-semibold text-[#093624]">Contract:</strong> where processing is necessary to take steps before entering a contract or to perform a contract with you.
              </li>
              <li>
                <strong className="font-semibold text-[#093624]">Legitimate interests:</strong> to operate, secure, and improve our business, website, and services, provided those interests are not overridden by your rights.
              </li>
              <li>
                <strong className="font-semibold text-[#093624]">Legal obligation:</strong> where we must process or retain information to comply with applicable laws.
              </li>
            </ul>
          </section>

          <section id="cookies-and-analytics" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              5. Cookies and analytics
            </h2>
            <div className="space-y-3">
              <p>
                We use cookies and similar technologies for essential site functions, analytics, and, where applicable, marketing. Analytics tools may help us understand how visitors use our website and improve our content and services.
              </p>
              <p>
                Where required by law, non-essential cookies and tracking tools will only be used after you provide consent through our cookie banner or settings tool. You can also control cookies through your browser settings, but some parts of the website may not function properly if cookies are disabled.
              </p>
            </div>
          </section>

          <section id="marketing-communications" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              6. Marketing communications
            </h2>
            <p>
              If you subscribe to our newsletter or otherwise ask to receive marketing updates, we may send you emails about our services, news, or offers. You can opt out at any time by using the unsubscribe link in the email or by contacting us directly.
            </p>
          </section>

          <section id="how-we-share-information" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              7. How we share information
            </h2>
            <p className="mb-3">
              We do not sell personal information. We may share personal information with trusted service providers and professional advisers who help us operate our business, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 mb-4">
              <li>website hosting providers;</li>
              <li>email and newsletter platforms;</li>
              <li>customer relationship management tools;</li>
              <li>scheduling and meeting tools;</li>
              <li>analytics providers;</li>
              <li>payment processors and invoicing tools;</li>
              <li>accounting, legal, and tax advisers.</li>
            </ul>
            <p>
              We may also share information when required by law, to protect our rights, or in connection with a business transfer, merger, reorganisation, or similar event.
            </p>
          </section>

          <section id="international-data-transfers" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              8. International data transfers
            </h2>
            <p>
              Because we may use service providers located in different countries, your information may be transferred outside your country of residence, including outside the European Economic Area. Where required, we use appropriate safeguards such as standard contractual clauses or equivalent transfer mechanisms approved by law.
            </p>
          </section>

          <section id="data-retention" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              9. Data retention
            </h2>
            <p className="mb-3">
              We keep personal information only for as long as necessary for the purposes described in this policy, including to provide services, comply with legal obligations, resolve disputes, and enforce agreements.
            </p>
            <p className="mb-3">
              Retention periods may vary depending on the type of information. For example:
            </p>
            <ul className="list-disc pl-6 space-y-2.5">
              <li>
                enquiry and website contact data:{' '}
                <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                  3 years from the date of your last interaction
                </Highlight>
                .
              </li>
              <li>
                client and project records:{' '}
                <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                  7 years following the termination of contract.
                </Highlight>
              </li>
              <li>
                accounting and tax records:{' '}
                <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                  7 years following the end of the tax year in which the transaction occurred
                </Highlight>
                .
              </li>
              <li>
                newsletter data: until you unsubscribe or ask us to delete it, unless we must keep limited records for legal reasons.
              </li>
            </ul>
          </section>

          <section id="your-rights" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              10. Your rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 mb-4">
              <li>request access to the personal information we hold about you;</li>
              <li>request correction of inaccurate or incomplete information;</li>
              <li>request deletion of your personal information;</li>
              <li>object to or restrict certain processing;</li>
              <li>withdraw consent where processing is based on consent;</li>
              <li>request data portability, where applicable;</li>
              <li>complain to a data protection authority or regulator.</li>
            </ul>
            <p>
              To exercise your rights, contact us at{' '}
              <a href="mailto:hello@getwren.io" className="text-[#093624] font-medium underline underline-offset-4 hover:text-[#186043]">
                hello@getwren.io
              </a>
              . We may need to verify your identity before responding.
            </p>
          </section>

          <section id="security" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              11. Security
            </h2>
            <p>
              We use reasonable technical and organisational measures to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section id="childrens-privacy" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              12. Children&apos;s privacy
            </h2>
            <p>
              Our website and services are not directed to children, and we do not knowingly collect personal information from individuals under 18. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.
            </p>
          </section>

          <section id="third-party-websites" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              13. Third-party websites
            </h2>
            <p>
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties, and we encourage you to review their policies.
            </p>
          </section>

          <section id="advertising-testimonials-and-case-studies" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              14. Advertising, testimonials, and case studies
            </h2>
            <p>
              If we publish testimonials, client results, case studies, endorsements, or performance claims, we aim to present them truthfully and not mislead visitors. Any material connection, incentive, or sponsorship will be disclosed where required. Results may vary depending on many factors, including the client&apos;s industry, budget, and implementation.
            </p>
          </section>

          <section id="changes-to-this-privacy-policy" className="scroll-mt-28">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              15. Changes to this Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date or last updated date.
            </p>
          </section>

          <section id="contact-us" className="scroll-mt-28 pt-2">
            <h2 className="font-display font-serif font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              16. Contact us
            </h2>
            <p className="mb-6">
              If you have questions, concerns, or requests about this Privacy Policy or our data practices, contact us at:
            </p>

            <div className="group relative transition-all duration-300 max-w-md">
              <div className="absolute -top-4 left-6 z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
                <PaperClip className="w-6 h-10 text-[#093624]" color="#093624" />
              </div>

              <div 
                className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#093624]/15 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-[-0.5deg]"
                style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
              />

              <div 
                className="relative z-10 p-6 sm:p-8 bg-white/95 text-[#093624] border-2 border-[#093624] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFFDF6] flex flex-col justify-start"
                style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
              >
                <div className="font-display font-serif font-bold text-xl sm:text-2xl text-[#093624] mb-1.5">
                  Wren Labs LLC
                </div>
                <div className="font-sans text-sm sm:text-base text-[#15543D] mb-3 leading-relaxed font-medium">
                  30 N Gould St, Sheridan Wy
                </div>
                <div>
                  <a 
                    href="mailto:hello@getwren.io" 
                    className="font-mono text-sm sm:text-base text-[#093624] hover:text-[#186043] underline decoration-[#CBDA46] decoration-2 underline-offset-4 font-bold"
                  >
                    hello@getwren.io
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

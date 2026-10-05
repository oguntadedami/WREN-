import React, { useEffect } from 'react';
import { Highlight } from './ScrapbookAssets';
import { Button } from './Button';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Server, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  EyeOff, 
  Cpu, 
  FileCheck, 
  RefreshCw, 
  Mail 
} from 'lucide-react';

interface SecurityPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: any, sectionId?: string) => void;
}

interface TocItem {
  num: string;
  title: string;
  id: string;
}

const TOC_LEFT: TocItem[] = [
  { num: '01', title: 'Our security philosophy', id: 'security-philosophy' },
  { num: '02', title: 'Data classification & handling', id: 'data-classification' },
  { num: '03', title: 'Infrastructure & cloud hosting', id: 'infrastructure-security' },
  { num: '04', title: 'Access controls & authentication', id: 'access-controls' },
  { num: '05', title: 'Encryption in transit and at rest', id: 'encryption-standards' },
  { num: '06', title: 'AI & LLM data governance', id: 'ai-governance' },
];

const TOC_RIGHT: TocItem[] = [
  { num: '07', title: 'Sub-processors & vendor management', id: 'sub-processors' },
  { num: '08', title: 'Confidentiality & NDA enforcement', id: 'confidentiality-nda' },
  { num: '09', title: 'Incident response protocol', id: 'incident-response' },
  { num: '10', title: 'Data retention & deletion rights', id: 'data-retention-deletion' },
  { num: '11', title: 'Vulnerability disclosure program', id: 'vulnerability-disclosure' },
  { num: '12', title: 'Contact our security team', id: 'contact-security' },
];

const SUB_PROCESSORS = [
  {
    name: 'Google Workspace',
    role: 'Email, Docs, cloud drive storage, meeting recordings',
    location: 'United States & Global',
    certifications: 'SOC 2 Type II, ISO 27001, HIPAA compliant',
  },
  {
    name: 'Amazon Web Services (AWS)',
    role: 'Cloud compute, analytics hosting, secure backup storage',
    location: 'United States',
    certifications: 'SOC 1/2/3, ISO 27001, FedRAMP, PCI DSS',
  },
  {
    name: 'Cloudflare',
    role: 'DNS routing, DDoS mitigation, web application firewall (WAF)',
    location: 'Global Edge Network',
    certifications: 'SOC 2 Type II, ISO 27001, PCI DSS',
  },
  {
    name: 'Stripe',
    role: 'Payment processing, invoicing, subscription billing',
    location: 'United States',
    certifications: 'PCI-DSS Level 1 Service Provider',
  },
  {
    name: 'Notion Labs',
    role: 'Internal project sprint management & collaborative workspaces',
    location: 'United States',
    certifications: 'SOC 2 Type II, ISO 27001',
  },
  {
    name: 'Calendly & Fillout',
    role: 'Appointment scheduling, audit surveys, interactive intake forms',
    location: 'United States',
    certifications: 'SOC 2 Type II, GDPR compliant',
  },
];

export const SecurityPage: React.FC<SecurityPageProps> = ({ onOpenBooking, onNavigate }) => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1 && hash !== '#security') {
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
        
        <header id="security-header" className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2CC] border border-[#093624]/15 text-xs font-mono font-bold tracking-widest text-[#093624] uppercase mb-4 select-none">
            <ShieldCheck className="w-3.5 h-3.5 text-[#093624]" />
            <span>TRUST &amp; COMPLIANCE // SECURITY PRACTICES</span>
          </div>
          
          <h1 className="font-display font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.1] mb-6">
            Security &amp; Trust at Wren
          </h1>

          <div className="text-sm sm:text-base font-sans text-[#0E1A15]/80 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Standard version:{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                2026.2
              </Highlight>
            </span>
            <span className="hidden sm:inline text-[#093624]/20">•</span>
            <span>
              Last security audit:{' '}
              <Highlight color="wattle" rotation="none" className="font-medium text-[#0E1A15]">
                August 14, 2026
              </Highlight>
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#2C3830] font-sans leading-relaxed">
            At Wren, we partner with high-growth B2B SaaS and technical founders. In doing so, we handle sensitive product architectures, sales pipeline metrics, unreleased roadmap strategies, and customer intelligence.
          </p>

          <p className="text-base sm:text-lg text-[#2C3830] font-sans leading-relaxed mt-4">
            We treat your data with the highest technical and operational standards. This Security &amp; Trust overview outlines our safeguards, infrastructure standards, AI governance rules, and commitment to confidentiality.
          </p>
        </header>

        <div className="relative group mb-14">
          <div 
            className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-1 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14 bg-[rgba(203,218,70,0.92)]"
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
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#15543D] mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#093624]" />
              <span>KEY SECURITY GUARANTEES AT A GLANCE</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1">
              <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#093624]/10">
                <div className="flex items-center gap-2 text-[#093624] font-bold text-sm mb-1.5">
                  <KeyRound className="w-4 h-4 text-[#15543D]" />
                  <span>Mandatory MFA</span>
                </div>
                <p className="text-xs text-[#54605a] leading-relaxed">
                  Hardware tokens or authenticator app 2FA required across all internal accounts and admin tools.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#093624]/10">
                <div className="flex items-center gap-2 text-[#093624] font-bold text-sm mb-1.5">
                  <Cpu className="w-4 h-4 text-[#15543D]" />
                  <span>Zero AI Training</span>
                </div>
                <p className="text-xs text-[#54605a] leading-relaxed">
                  Your raw recordings, CRM leads, and notes are never used to train public LLM models.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#093624]/10">
                <div className="flex items-center gap-2 text-[#093624] font-bold text-sm mb-1.5">
                  <Database className="w-4 h-4 text-[#15543D]" />
                  <span>AES-256 Encryption</span>
                </div>
                <p className="text-xs text-[#54605a] leading-relaxed">
                  TLS 1.3 in transit and AES-256 at rest across Google Cloud &amp; AWS enterprise storage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#093624]/10">
                <div className="flex items-center gap-2 text-[#093624] font-bold text-sm mb-1.5">
                  <FileCheck className="w-4 h-4 text-[#15543D]" />
                  <span>Mutual NDA</span>
                </div>
                <p className="text-xs text-[#54605a] leading-relaxed">
                  Full mutual confidentiality protection is standard across every single studio engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav 
          id="security-toc"
          aria-label="Table of Contents" 
          className="bg-white/80 border border-[#093624]/15 rounded-2xl p-6 sm:p-8 shadow-xs mb-16 sm:mb-20"
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

        <div className="space-y-16 sm:space-y-20 text-[#2C3830] font-sans text-base sm:text-lg leading-relaxed">
          
          <section id="security-philosophy" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              01
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              1. Our security philosophy
            </h2>
            <p className="mb-4">
              Our security model is built on three core tenets: <strong>Privacy by Design</strong>, <strong>Principle of Least Privilege</strong>, and <strong>Continuous Verification</strong>.
            </p>
            <p className="mb-4">
              Because we frequently examine customer discovery call recordings, closed-lost analyses, pricing tiers, and pre-release technical features, our studio operates as a secure extension of your executive team.
            </p>
            <p>
              We do not treat security as an afterthought or a marketing badge. We treat it as an essential operational safeguard that allows founders to share candid, unfiltered context without fear of leakage or competitive compromise.
            </p>
          </section>

          <section id="data-classification" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              02
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              2. Data classification &amp; handling
            </h2>
            <p className="mb-4">
              We categorize all information received from clients and website visitors into distinct classification tiers:
            </p>
            
            <div className="space-y-3.5 my-5">
              <div className="p-4 rounded-xl bg-white border border-[#093624]/15">
                <span className="font-mono text-xs font-bold text-[#E53E3E] uppercase tracking-wider block mb-1">
                  TIER 1
                </span>
                <p className="text-sm text-[#2C3830]">
                  Unreleased product designs, roadmap milestones, pitch decks, sales call recordings, revenue pipeline metrics, customer contract values, and proprietary ICP lists. Restricted solely to assigned senior strategists under active NDA.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#093624]/15">
                <span className="font-mono text-xs font-bold text-[#D97706] uppercase tracking-wider block mb-1">
                  TIER 2
                </span>
                <p className="text-sm text-[#2C3830]">
                  Agreed deliverables, draft copy, positioning matrices, project schedules, and billing records. Accessible only by authorized studio personnel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#093624]/15">
                <span className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-wider block mb-1">
                  TIER 3
                </span>
                <p className="text-sm text-[#2C3830]">
                  Approved and published founder LinkedIn posts, released podcast episodes, approved client case studies, and open-access checklists.
                </p>
              </div>
            </div>
          </section>

          <section id="infrastructure-security" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              03
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              3. Infrastructure &amp; cloud hosting
            </h2>
            <p className="mb-4">
              Wren does not maintain on-premise hardware servers. All digital services and client workspaces reside within industry-leading, enterprise-grade cloud providers:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Cloud Providers:</strong> Primary infrastructure operates on Google Cloud Platform (GCP) and Amazon Web Services (AWS), providing ISO 27001, SOC 2 Type II, and PCI-DSS compliance.
              </li>
              <li>
                <strong>Perimeter &amp; DDoS Defense:</strong> Web traffic is proxied through Cloudflare Enterprise, providing automated Layer 3, 4, and 7 DDoS protection, intelligent bot management, and web application firewall rules.
              </li>
              <li>
                <strong>Automated Backups:</strong> Workspaces and databases maintain continuous point-in-time recovery and encrypted automated off-site snapshots.
              </li>
            </ul>
          </section>

          <section id="access-controls" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              04
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              4. Access controls &amp; authentication
            </h2>
            <p className="mb-4">
              We enforce strict identity and access governance across every system:
            </p>
            <div className="space-y-3 mb-5">
              <p>
                <strong>Role-Based Access Control (RBAC):</strong> Studio team members are granted access strictly on a need-to-know basis. Team members not assigned to your account have zero access to your internal project folders.
              </p>
              <p>
                <strong>Mandatory Multi-Factor Authentication (MFA):</strong> All Wren corporate accounts require hardware-backed (FIDO2/WebAuthn) or time-based one-time password (TOTP) 2FA. SMS-based 2FA is prohibited due to SIM-swapping vulnerabilities.
              </p>
              <p>
                <strong>Password Policy:</strong> Managed password vaults (e.g. 1Password) with mandatory 20+ character randomized entropy are strictly required across all studio devices.
              </p>
              <p>
                <strong>Offboarding Protocol:</strong> Access to all client folders, repositories, and communications channels is revoked within one (1) business hour upon staff role transition or contractor departure.
              </p>
            </div>
          </section>

          <section id="encryption-standards" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              05
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              5. Encryption in transit and at rest
            </h2>
            <p className="mb-4">
              Your data is continuously encrypted at every stage of the lifecycle:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Data in Transit:</strong> All HTTP traffic to getwren.io and API endpoints is strictly served over HTTPS with TLS 1.3 (fallback to TLS 1.2 minimum) using modern cipher suites. HSTS (HTTP Strict Transport Security) is enabled by default.
              </li>
              <li>
                <strong>Data at Rest:</strong> All client folders, documents, and backups stored within our enterprise cloud providers are encrypted using FIPS 140-2 validated AES-256 encryption.
              </li>
              <li>
                <strong>Endpoint Encryption:</strong> All staff laptops and workstations utilize full-disk encryption (FileVault / BitLocker) and enforced remote-wipe MDM policies.
              </li>
            </ul>
          </section>

          <section id="ai-governance" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              06
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              6. AI &amp; Large Language Model (LLM) governance
            </h2>
            
            <div className="p-5 sm:p-6 bg-[#FAF7EE] border-2 border-[#093624] rounded-2xl mb-6 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#093624] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#15543D]" />
                <span>Our AI Promise: Zero model training on client secrets</span>
              </h3>
              <p className="text-sm sm:text-base text-[#2C3830] leading-relaxed">
                Wren strictly ensures that <strong>no client confidential materials, customer discovery transcripts, revenue metrics, or unreleased product briefs are ever used to train public or foundational artificial intelligence models</strong> (including OpenAI, Anthropic, or Google models).
              </p>
            </div>

            <p className="mb-4">
              Where AI synthesis or grammar research tools are utilized to accelerate drafting, we mandate the following protocols:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Enterprise Zero-Retention APIs:</strong> We only use commercial API endpoints governed by enterprise terms that guarantee data is not stored, logged, or used for model training.
              </li>
              <li>
                <strong>Anonymization &amp; Scrubbing:</strong> Prior to processing qualitative transcripts, specific company customer names, proprietary code tokens, and specific commercial contract values are scrubbed or sanitized.
              </li>
              <li>
                <strong>Human-in-the-Loop:</strong> All strategic positioning, messaging architectures, and founder content are crafted, reviewed, and finalized by experienced human senior strategists.
              </li>
            </ul>
          </section>

          <section id="sub-processors" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              07
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              7. Sub-processors &amp; vendor management
            </h2>
            <p className="mb-4">
              We work with a curated set of vetted third-party service providers. Every vendor undergoes a thorough risk review regarding their security posture, encryption standards, and compliance certifications:
            </p>

            <div className="overflow-x-auto my-6 border border-[#093624]/15 rounded-xl bg-white shadow-xs">
              <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[#093624]/15 bg-[#FAF7EE] text-[#093624] font-mono text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Vendor</th>
                    <th className="py-3 px-4">Purpose &amp; Scope</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Security Standards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#093624]/10">
                  {SUB_PROCESSORS.map((sp) => (
                    <tr key={sp.name} className="hover:bg-[#FAF7EE]/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#093624]">{sp.name}</td>
                      <td className="py-3.5 px-4 text-[#54605a]">{sp.role}</td>
                      <td className="py-3.5 px-4 text-[#54605a] whitespace-nowrap">{sp.location}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-[#15543D]">{sp.certifications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="confidentiality-nda" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              08
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              8. Confidentiality &amp; NDA enforcement
            </h2>
            <p className="mb-4">
              Prior to any strategic download, kick-off workshop, or sprint initiation, Wren signs a binding <strong>Mutual Non-Disclosure Agreement (NDA)</strong>.
            </p>
            <p className="mb-4">
              We are equally comfortable signing your enterprise standard mutual NDA or executing our standard studio agreement. Our staff, fractional leaders, and specialized growth contractors are bound by confidentiality clauses that survive engagement completion indefinitely.
            </p>
          </section>

          <section id="incident-response" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              09
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              9. Incident response protocol
            </h2>
            <p className="mb-4">
              We maintain an active security incident management plan to rapidly detect, contain, investigate, and remediate any potential unauthorized access:
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#093624]/15 space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#093624]">
                <AlertCircle className="w-4 h-4 text-[#D97706]" />
                <span>72-Hour Client Notification Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-[#54605a] leading-relaxed">
                In the unlikely event of a confirmed security incident affecting your confidential information or personal records, Wren will notify your designated executive contact within <strong>72 hours</strong> with detailed remediation steps and impact analysis.
              </p>
            </div>
          </section>

          <section id="data-retention-deletion" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              10
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              10. Data retention &amp; deletion rights
            </h2>
            <p className="mb-4">
              You maintain sovereign ownership of your data at all times:
            </p>
            <p className="mb-4">
              <strong>Active Engagement:</strong> Working assets, research memos, and recordings are retained in your dedicated shared workspace throughout the duration of our engagement.
            </p>
            <p className="mb-4">
              <strong>Offboarding Purge:</strong> Upon conclusion of our engagement, you may request a complete export of all completed deliverables. Within thirty (30) days of receiving a written deletion request at <code>security@getwren.io</code>, we will securely purge all raw recordings, draft notes, and confidential records from our active cloud drives (retaining only legally required financial invoices).
            </p>
          </section>

          <section id="vulnerability-disclosure" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              11
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              11. Vulnerability disclosure program
            </h2>
            <p className="mb-4">
              We appreciate the contributions of independent security researchers who help protect the web. If you discover a security vulnerability in our domain or digital tools, we ask that you responsibly disclose it to us before public sharing:
            </p>
            <div className="space-y-2 mb-4 text-sm font-sans">
              <p>• Please email detailed reproduction steps to <strong>security@getwren.io</strong>.</p>
              <p>• Please give us a reasonable window (minimum 30 days) to patch the issue before making any public disclosure.</p>
              <p>• Do not attempt to access, modify, or exfiltrate private client data or disrupt operational systems.</p>
            </div>
            <p className="text-sm text-[#54605a]">
              We commit to acknowledging received reports within two (2) business days and maintaining transparent communication throughout remediation.
            </p>
          </section>

          <section id="contact-security" className="scroll-mt-24 pt-2 border-t border-[#093624]/10">
            <div className="font-mono text-xs font-bold text-[#15543D] uppercase tracking-widest mb-1.5">
              12
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] mb-4">
              12. Contact our security team
            </h2>
            <p className="mb-6">
              For security inquiries, enterprise security questionnaire evaluations (Vendor VSA / SOC 2 reports), or data privacy requests:
            </p>

            <div className="bg-white border-2 border-[#093624] rounded-2xl p-6 sm:p-8 shadow-xs max-w-xl">
              <div className="font-serif font-bold text-xl text-[#093624] mb-1">
                Wren Security &amp; Trust Office
              </div>
              <div className="text-sm font-sans text-[#54605a] mb-4">
                Wren Labs LLC · Information Security &amp; Compliance
              </div>
              <div className="space-y-1 text-sm font-sans text-[#093624]">
                <div>
                  Email:{' '}
                  <a href="mailto:security@getwren.io" className="font-bold underline hover:text-[#15543D]">
                    security@getwren.io
                  </a>
                </div>
                <div>Urgent inquiries: legal@getwren.io</div>
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
                    Schedule security review →
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
                    Schedule security review →
                  </Button>
                )}
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('terms')}
                    className="text-xs font-mono text-[#093624] hover:underline cursor-pointer"
                  >
                    View Terms of Service →
                  </button>
                )}
              </div>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-[#093624]/15 flex items-center justify-between text-sm text-[#093624]">
          <a
            href="#security-header"
            onClick={(e) => handleTocClick(e, 'security-header')}
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

export default SecurityPage;

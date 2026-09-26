// Mock case study data — sourced directly from the real Notion database
// export (Judith's rewritten copy), matching the flat schema documented in
// Wren_Case_Studies_Notion_Schema.md. This file exists ONLY so the dynamic
// template can be built and tested before wiring up the live Notion fetch.
//
// getCaseStudies() is the single function the rest of the app calls — when
// switching to live data later, only the inside of this function changes
// (swap the return statement for an actual fetch to the Notion-backed
// endpoint). Nothing else in the app should need to change.

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface SystemStep {
  number: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface EngineCard {
  label: string;
  title: string;
  body: string;
  linkText: string;
  link: string;
}

export interface CaseStudy {
  slug: string;
  companyName: string;
  category: string;
  summary: string;
  sortOrder: number;
  published: boolean;

  headline: string;
  highlightWord: string;
  subheading: string;

  topStats: CaseStudyStat[];
  quickFacts: QuickFact[];

  challenge: {
    headline: string;
    paragraphs: string[];
  };

  systemBuilt: {
    headline: string;
    intro: string;
    steps: SystemStep[];
  };

  results: {
    headline: string;
    stats: CaseStudyStat[];
    row2DividerText?: string;
  };

  keyInsight: {
    headline: string;
    body: string;
  };

  systemsUsed: EngineCard[];

  trackRecord: {
    headline: string;
    body: string;
    linkText: string;
    link: string;
  };

  closingCta: {
    headline: string;
    highlightWord: string;
    body: string;
  };

  coverImage?: string;
  coverImageAlt?: string;
  resultsImage?: string;
  resultsImageAlt?: string;
}

const mockCaseStudies: CaseStudy[] = [
  {
    slug: "mischief-makers",
    companyName: "Mischief Makers",
    category: "Revenue Enablement",
    summary: "12 high-ticket buyers closed in one month, a cohort that previously took three months to fill. Same offer, same audience, same price.",
    sortOrder: 1,
    published: true,
    headline: "How Mischief Makers Closed 12 High-Ticket Program Buyers in One Month",
    highlightWord: "12",
    subheading: "A result that previously took three months, using a content system built around their sales conversations.",
    topStats: [
      {
        value: "12",
        label: "High-ticket buyers closed in one month"
      },
      {
        value: "3x",
        label: "Faster sales cycle"
      },
      {
        value: "3 → 1",
        label: "Months to fill a cohort"
      }
    ],
    quickFacts: [
      {
        label: "Client",
        value: "Mischief Makers"
      },
      {
        label: "Offer",
        value: "Group program + done-for-you service"
      },
      {
        label: "Engagement",
        value: "Pre-Sale Content Engine"
      },
      {
        label: "Timeline",
        value: "1 month vs. a previous 3-month cycle"
      }
    ],
    challenge: {
      headline: "A strong offer stuck in a three-month sales cycle",
      paragraphs: [
        "Mischief Makers had a strong offer, a group program, and a done-for-you service selling at a high-ticket price point. Their audience existed. Their offer worked. But each cohort took three months of marketing effort to fill.",
        "The root cause was a content gap. Their social media and email content were not connected to what prospects actually needed to hear before they committed to buying. Leads were arriving at sales conversations with unresolved objections and an incomplete understanding of the offer. The sales process was doing education work it should never have had to do.",
        "Every month of delay in closing a cohort was a month of deferred revenue and a sales team carrying on conversations that should already have been closed."
      ]
    },
    systemBuilt: {
      headline: "A content system built around their sales conversations",
      intro: "Every objection prospects raised was mapped to a piece of content designed to resolve it before a prospect ever reached a sales conversation.",
      steps: [
        {
          number: "01",
          title: "Objection extraction",
          body: "The engagement began by pulling the most common objections, hesitations, and questions from existing sales conversations and audience interactions. These were sorted into two types: logical objections, covering price, ROI, process, and outcomes, and emotional objections, covering readiness, fit, timing, and risk."
        },
        {
          number: "02",
          title: "Social media content",
          body: "LinkedIn posts targeting specific objections at each stage of the buyer journey, so prospects met the answer to their hesitation before they voiced it."
        },
        {
          number: "03",
          title: "Email sequences",
          body: "Nurture content designed to move prospects from curious to committed by resolving concerns in order of frequency."
        },
        {
          number: "04",
          title: "Cross-channel sequencing",
          body: "A coordinated publishing cadence ensuring prospects encountered the right content at the right time, regardless of which platform they were on."
        },
        {
          number: "05",
          title: "A built-in qualification filter",
          body: "The system doubled as a filter. A prospect who engaged deeply, consuming multiple pieces across channels, was signalling that the pain was real and the commitment genuine. Only warm, pre-qualified prospects moved forward to sales conversations."
        }
      ]
    },
    results: {
      headline: "Three months of selling, done in one",
      stats: [
        {
          value: "12",
          label: "High-ticket buyers closed in one month"
        },
        {
          value: "3 months",
          label: "Previous time to fill the same cohort"
        },
        {
          value: "3x",
          label: "Faster sales cycle"
        },
        {
          value: "1",
          label: "Variable changed: the content system"
        }
      ],
      row2DividerText: ""
    },
    keyInsight: {
      headline: "The only variable was the content",
      body: "The offer did not change. The audience did not change. The price did not change. The only variable was a content system that resolved objections before leads reached the sales conversation. That single change compressed a three-month sales cycle into one month."
    },
    systemsUsed: [
      {
        label: "Used in this engagement",
        title: "Pre-Sale Content Engine",
        body: "Builds content around the sales conversation, so buyers arrive warm, briefed, and past the objections that stall a deal.",
        linkText: "Explore the Pre-Sale Content Engine",
        link: "/pre-sale-content-engine"
      }
    ],
    trackRecord: {
      headline: "Part of a pattern, not a one-off",
      body: "This result sits within a broader track record of content-driven sales outcomes:\n\n- In a separate engagement, 80% of buyers on a $25,000 offer traced their decision back to content consumed before the sales conversation.\n- 90% of those content-influenced conversations converted to closed deals.\n- The qualification mechanism in both cases was the same: content designed to filter for pain, not just generate awareness.",
      linkText: "Read how Carril lifted booked calls 45%+",
      link: "/case-studies/carril"
    },
    closingCta: {
      headline: "Is your sales call still doing the convincing?",
      highlightWord: "convincing",
      body: "Wren builds the content system that answers objections before the call, so buyers arrive warm, qualified, and ready to decide."
    },
    coverImage: undefined,
    coverImageAlt: undefined,
    resultsImage: undefined,
    resultsImageAlt: undefined
  },
  {
    slug: "carril",
    companyName: "Carril",
    category: "Lead Generation & Sales",
    summary: "A 45%+ lift in booked calls and 15+ qualified inbound leads in under 14 days, from a founder-led presence and a pre-sale content system running together.",
    sortOrder: 2,
    published: true,
    headline: "How Carril Lifted Booked Calls 45%+ by Turning Content Into a Sales Engine",
    highlightWord: "45%+",
    subheading: "A founder-led presence and a pre-sale content system turned a quiet account into qualified inbound, then converted more of it on warmer calls.",
    topStats: [
      {
        value: "45%+",
        label: "Lift in booked calls"
      },
      {
        value: "15+",
        label: "Qualified inbound leads in under 14 days"
      },
      {
        value: "442,134",
        label: "Content impressions"
      }
    ],
    quickFacts: [
      {
        label: "Client",
        value: "Carril"
      },
      {
        label: "Offer",
        value: "Digital marketing partner for founders and startups"
      },
      {
        label: "Engagement",
        value: "Founder OS + Pre-Sale Content Engine"
      },
      {
        label: "Timeline",
        value: "First qualified inbound in under 14 days"
      }
    ],
    challenge: {
      headline: "A marketing partner whose own growth had stalled",
      paragraphs: [
        "Carril is a digital marketing partner for founders, the studio startups hire to start and scale. The irony was that Carril's own growth had stalled. Visibility was low, reach was flat, and the content going out was not turning into leads or conversions, which made expanding the client base slow and unpredictable.",
        "Underneath sat an audience-shaped gap: real expertise and a real offer, but very little pull. The right prospects were not discovering Carril, the few who did were not being moved toward a conversation, and the calls that happened opened cold, with time lost explaining the basics instead of closing. Every quiet week was a week of deferred revenue and a client base that grew by chance rather than by system."
      ]
    },
    systemBuilt: {
      headline: "Two systems working together: pull the right people in, then convert them",
      intro: "The work ran on Founder OS to pull the right people in and the Pre-Sale Content Engine to convert them before the call. It began with the foundation everything else would stand on.",
      steps: [
        {
          number: "01",
          title: "The foundation, a conversion-ready home",
          body: "The engagement opened with a full audit of Carril's website, followed by a rebuild, designed alongside the web team, into a faster, clearer, conversion-focused site aligned to the founders Carril most wanted as clients. Before a single visitor was driven, there was finally somewhere worth sending them."
        },
        {
          number: "02",
          title: "Founder OS, a presence that pulls",
          body: "With the foundation in place, a founder-led content engine went live across X and LinkedIn, built to turn Carril's expertise into visible authority and to start real conversations rather than chase reach. The content was mapped to the buyer, not to the algorithm. Inside two weeks it produced more than 15 qualified inbound leads, and it went on to drive content impressions to 442,134, a rise of 8,584.7%."
        },
        {
          number: "03",
          title: "Pre-Sale Content Engine, content that converts before the call",
          body: "Alongside the presence, a pre-sale content system and a set of personalized outreach campaigns warmed and qualified buyers ahead of the call, with messaging mapped to the objections prospects raised most often. Leads arrived already understanding the offer and already past the questions that used to stall a conversation, so calls opened warm instead of cold. Booked calls rose more than 45%, and new startups joined Carril's client base."
        }
      ]
    },
    results: {
      headline: "More booked calls, from warmer buyers",
      stats: [
        {
          value: "45%+",
          label: "Lift in booked-call rate"
        },
        {
          value: "15+",
          label: "Qualified inbound leads in under 14 days"
        },
        {
          value: "442,134",
          label: "Content impressions"
        },
        {
          value: "8,584.7%",
          label: "Growth in content impressions"
        }
      ],
      row2DividerText: ""
    },
    keyInsight: {
      headline: "The lever was never more traffic",
      body: "Nothing about Carril's offer or audience changed. What changed was the way leads arrived. A founder-led presence pulled the right people in, and a pre-sale content system answered their objections before the call, so the same effort booked more calls and met warmer buyers. The lever was never more traffic. It was content built to filter for real buying intent and to carry the convincing the sales conversation used to do alone."
    },
    systemsUsed: [
      {
        label: "Used in this engagement",
        title: "Founder OS",
        body: "Turns a founder's presence into a steady source of qualified inbound, so the right buyers arrive already knowing the work.",
        linkText: "Explore Founder OS",
        link: "/founder-os"
      },
      {
        label: "Used in this engagement",
        title: "Pre-Sale Content Engine",
        body: "Builds content around the sales conversation, so buyers arrive warm, briefed, and past the objections that stall a deal.",
        linkText: "Explore the Pre-Sale Content Engine",
        link: "/pre-sale-content-engine"
      }
    ],
    trackRecord: {
      headline: "Part of a pattern, not a one-off",
      body: "The same mechanism has driven content-to-revenue outcomes across engagements:\n\n- On a separate $25,000 offer, 80% of buyers traced their decision back to content consumed before the sales conversation.\n- 90% of those content-influenced conversations converted to closed deals.\n- In every case the qualification mechanism was identical: content built to filter for genuine buying intent, not just generate awareness.",
      linkText: "Read how Mischief Makers closed 12 high-ticket buyers in one month",
      link: "/case-studies/mischief-makers"
    },
    closingCta: {
      headline: "Want inbound that arrives warm?",
      highlightWord: "warm",
      body: "Wren builds the founder-led presence that pulls the right buyers in and the pre-sale content that gets them ready before the call."
    },
    coverImage: undefined,
    coverImageAlt: undefined,
    resultsImage: undefined,
    resultsImageAlt: undefined
  },
  {
    slug: "seamailer",
    companyName: "Seamailer",
    category: "Go-To-Market & Growth",
    summary: "From 40 signups and 5 active users to 500+ signups in under 30 days, #2 Product of the Day on Product Hunt, and 3,000+ users with 30,000+ monthly visits still compounding.",
    sortOrder: 3,
    published: true,
    headline: "How Seamailer Grew From 40 Signups to 500+ in Under 30 Days",
    highlightWord: "500+",
    subheading: "A go-to-market build with a content engine at its core took a stalled email marketing SaaS to a Top 3 Product Hunt launch, and kept it compounding.",
    topStats: [
      {
        value: "40 → 500+",
        label: "Signups in under 30 days"
      },
      {
        value: "#2",
        label: "Product of the Day on Product Hunt"
      },
      {
        value: "3,000+",
        label: "Users today"
      }
    ],
    quickFacts: [
      {
        label: "Client",
        value: "Seamailer"
      },
      {
        label: "Product",
        value: "Email marketing SaaS for startups, builders, writers, and creators"
      },
      {
        label: "Engagement",
        value: "Go-to-market and growth"
      },
      {
        label: "Timeline",
        value: "Under 30 days to the launch spike, compounding since"
      }
    ],
    challenge: {
      headline: "A working product almost no one knew existed",
      paragraphs: [
        "Seamailer launched in early 2024 as an email marketing platform built for startups, builders, writers, and content creators, with a genuine edge on deliverability and cost. The product worked. Almost no one knew it existed.",
        "By the time growth stalled, the platform had 40 signups and 5 active users, and no repeatable way to reach the people it was built for. The founders had done the visible work, attending seminars, talk shows, and industry events, and none of it moved the numbers.",
        "The root cause was not the product. It was the absence of a go-to-market system. There was no funnel, no launch motion, no content engine pulling the right users in, and no process turning attention into signups and signups into active use. Every month in that state was another month of a working product sitting idle while runway burned."
      ]
    },
    systemBuilt: {
      headline: "A go-to-market build with a content engine at its core",
      intro: "Wren owned the full go-to-market build, from demand generation through to activation, with a content engine at the center designed to outlast the launch itself.",
      steps: [
        {
          number: "01",
          title: "Sales funnel design",
          body: "Mapping the path from first touch to signup to active use, so attention had somewhere to go and a reason to stay."
        },
        {
          number: "02",
          title: "Launch roadmap",
          body: "Sequencing the pre-launch, launch, and post-launch motions around a single high-leverage event."
        },
        {
          number: "03",
          title: "Content engine",
          body: "Built to reach startups, builders, writers, and creators where they already spent their time, and to keep pulling them in long after launch day."
        },
        {
          number: "04",
          title: "Product and website",
          body: "Introducing new features, auditing the existing site, and partnering with designers to rebuild it into a conversion asset."
        },
        {
          number: "05",
          title: "The Product Hunt launch",
          body: "Run as the centerpiece of the motion. The launch was never a one-day spike with nothing beneath it. It sat on top of a funnel and a content system built to capture the traffic it generated and convert it into signups and active users."
        }
      ]
    },
    results: {
      headline: "From 40 signups to a Top 3 Product Hunt launch",
      stats: [
        {
          value: "#2",
          label: "Product of the Day on Product Hunt"
        },
        {
          value: "#3",
          label: "Product of the Month on Product Hunt"
        },
        {
          value: "500+",
          label: "Signups in under 30 days, up from 40"
        },
        {
          value: "1,000+",
          label: "Daily visitors at launch peak"
        },
        {
          value: "30,000+",
          label: "Monthly visits, driven by the content engine"
        },
        {
          value: "3,000+",
          label: "Current users"
        }
      ],
      row2DividerText: "And it kept compounding after launch day."
    },
    keyInsight: {
      headline: "A launch creates a spike. A content engine creates a curve.",
      body: "The product did not change. The market did not change. The price did not change. What changed was the system around it. A funnel, a launch motion, and a content engine took a platform that seminars and events could not move and turned it into a Top 3 Product Hunt launch, then kept compounding it into 30,000+ monthly visits."
    },
    systemsUsed: [
      {
        label: "The same engine",
        title: "Founder OS",
        body: "Turns a founder's presence into a steady source of qualified inbound, so the right buyers arrive already knowing the work.",
        linkText: "Explore Founder OS",
        link: "/founder-os"
      },
      {
        label: "The same engine",
        title: "Pre-Sale Content Engine",
        body: "Builds content around the sales conversation, so buyers arrive warm, briefed, and past the objections that stall a deal.",
        linkText: "Explore the Pre-Sale Content Engine",
        link: "/pre-sale-content-engine"
      },
      {
        label: "Delivered at this level",
        title: "Fractional CMO",
        body: "Full go-to-market and growth ownership for teams that want the entire system built and run.",
        linkText: "Explore Fractional CMO",
        link: "/fractional-cmo"
      }
    ],
    trackRecord: {
      headline: "Part of a broader growth track record",
      body: "This result sits within a broader track record of go-to-market and growth execution for SaaS and digital products:\n\n- Scaled a separate AI platform past 900,000 visits and 30,000 monthly users through an SEO and discovery system.\n- Built go-to-market foundations, launch strategy, and growth systems across multiple early-stage companies.\n\nIn every case the mechanism was the same: a system that turns a working product into a predictable source of users, not a one-off campaign.",
      linkText: "Read how ToolBus AI scaled to 30,000 monthly users",
      link: "/case-studies/toolbus-ai"
    },
    closingCta: {
      headline: "Got a working product nobody's finding?",
      highlightWord: "finding",
      body: "Wren builds the go-to-market system around it: the funnel, the launch, and a content engine that keeps compounding after launch day."
    },
    coverImage: undefined,
    coverImageAlt: undefined,
    resultsImage: undefined,
    resultsImageAlt: undefined
  },
  {
    slug: "toolbus-ai",
    companyName: "ToolBus AI",
    category: "SEO & Discovery Growth",
    summary: "From under 10,000 visitors to 30,000 monthly users and 900,000+ visits, with ad revenue that went from volatile to reliable.",
    sortOrder: 4,
    published: true,
    headline: "How ToolBus AI Scaled to 30,000 Monthly Users and 900,000+ Visits",
    highlightWord: "30,000",
    subheading: "An SEO and discovery system that turned unstable, unpredictable traffic into a compounding monthly user base, and that traffic into reliable ad revenue.",
    topStats: [
      {
        value: "30,000",
        label: "Monthly users, up from under 10,000"
      },
      {
        value: "900,000+",
        label: "Website visits"
      },
      {
        value: "Reliable",
        label: "Ad and AdSense revenue, once volatile"
      }
    ],
    quickFacts: [
      {
        label: "Client",
        value: "ToolBus AI"
      },
      {
        label: "Product",
        value: "AI tools directory with 100+ tools for everyday work"
      },
      {
        label: "Engagement",
        value: "SEO and discovery growth"
      },
      {
        label: "Timeline",
        value: "Ongoing, still compounding"
      }
    ],
    challenge: {
      headline: "The product had value. It was not being found.",
      paragraphs: [
        "ToolBus AI is an AI toolbox built to help people find the right tool for the task in front of them, with over 100 tools covering work like file conversion, custom QR codes, product description writing, and testing AI capability. The catalogue was strong. The traffic was not.",
        "With fewer than 10,000 visitors and users, the platform could not hold a steady stream of monthly traffic, and the user base rose and fell without a reliable floor. For a product that earns through ads and Google AdSense, that instability was the core business problem, because inconsistent traffic means inconsistent revenue, and there was no growth engine making the numbers predictable."
      ]
    },
    systemBuilt: {
      headline: "An SEO and discovery system built around real search intent",
      intro: "Wren owned the traffic and discovery strategy, built around making the platform findable and turning one-time visitors into a returning user base.",
      steps: [
        {
          number: "01",
          title: "Keyword research",
          body: "Mapping the search terms the target users were already typing, so the platform could meet demand that already existed rather than manufacture it."
        },
        {
          number: "02",
          title: "Website evaluation",
          body: "Identifying where the site was leaking visitors and failing to convert them into return users."
        },
        {
          number: "03",
          title: "SEO optimisation",
          body: "Restructuring the platform to rank for high-intent tool searches, the moments when someone is actively looking for exactly what ToolBus offers."
        },
        {
          number: "04",
          title: "AI directory and discovery layer",
          body: "Building a reason for users to land, browse, and come back, so traffic turned into a habit rather than a one-time visit."
        }
      ]
    },
    results: {
      headline: "From unstable traffic to a compounding user base",
      stats: [
        {
          value: "30,000",
          label: "Monthly users, up from under 10,000"
        },
        {
          value: "900,000+",
          label: "Website visits"
        },
        {
          value: "Stable",
          label: "Traffic, now a consistent and compounding base"
        },
        {
          value: "Reliable",
          label: "Ad and AdSense earnings, once volatile"
        }
      ],
      row2DividerText: ""
    },
    keyInsight: {
      headline: "Stable traffic is stable revenue",
      body: "The catalogue did not change and the tools did not change. What changed was discoverability. A keyword and SEO system built around real search intent turned a platform that was hard to find into a compounding traffic engine with a reliable monthly user base. For an ad-funded product, that is the whole game. The numbers have kept climbing since, because a discovery system, unlike a campaign, compounds instead of expiring."
    },
    systemsUsed: [
      {
        label: "The same engine",
        title: "Founder OS",
        body: "Turns a founder's presence into a steady source of qualified inbound, so the right buyers arrive already knowing the work.",
        linkText: "Explore Founder OS",
        link: "/founder-os"
      },
      {
        label: "The same engine",
        title: "Pre-Sale Content Engine",
        body: "Builds content around the sales conversation, so buyers arrive warm, briefed, and past the objections that stall a deal.",
        linkText: "Explore the Pre-Sale Content Engine",
        link: "/pre-sale-content-engine"
      },
      {
        label: "Delivered at this level",
        title: "Fractional CMO",
        body: "Full go-to-market and growth ownership for teams that want the entire system built and run.",
        linkText: "Explore Fractional CMO",
        link: "/fractional-cmo"
      }
    ],
    trackRecord: {
      headline: "Part of a broader growth track record",
      body: "This result sits within a broader track record of go-to-market and growth execution for SaaS and digital products:\n\n- Led a SaaS launch to a Top 3 Product Hunt finish, with 500+ signups in under a month and 30,000+ monthly visits that keep compounding.\n- Built SEO, content, and funnel systems that turn attention into compounding user growth, not one-off spikes.\n\nIn every case the mechanism was the same: a system that turns a working product into a predictable source of users, not a one-off campaign.",
      linkText: "Read how Seamailer grew from 40 signups to 500+",
      link: "/case-studies/seamailer"
    },
    closingCta: {
      headline: "Is your product hard to find?",
      highlightWord: "hard to find",
      body: "Wren builds the discovery system that puts it in front of people already searching for it, and keeps that traffic compounding."
    },
    coverImage: undefined,
    coverImageAlt: undefined,
    resultsImage: undefined,
    resultsImageAlt: undefined
  }
];

// This is the ONE function the rest of the app should call. Swapping this
// to live Notion data later means replacing the body of this function with
// a real fetch call that returns the same CaseStudy[] shape — no other file
// needs to change.
export function getCaseStudies(): CaseStudy[] {
  return mockCaseStudies.filter((cs) => cs.published);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((cs) => cs.slug === slug);
}

// Backward-compatibility exports for existing components (CaseStudiesPage, CaseStudyDetailPage)
import { CaseStudy as LegacyCaseStudy, CaseStudyDetail as LegacyCaseStudyDetail } from '../types';
import caseStudiesRaw from './caseStudies.json';

export const caseStudiesList: LegacyCaseStudy[] = caseStudiesRaw as LegacyCaseStudy[];

const adaptToLegacyDetail = (cs: CaseStudy): LegacyCaseStudyDetail => {
  const clientFact = cs.quickFacts.find((f) => f.label.toLowerCase() === 'client')?.value || cs.companyName;
  const programFact = cs.quickFacts.find((f) => f.label.toLowerCase() === 'engagement' || f.label.toLowerCase() === 'offer' || f.label.toLowerCase() === 'program')?.value || cs.category;
  const headlineResultFact = cs.quickFacts.find((f) => f.label.toLowerCase() === 'headline result' || f.label.toLowerCase() === 'timeline')?.value || cs.topStats[0]?.label || '';
  const timelineFact = cs.quickFacts.find((f) => f.label.toLowerCase() === 'timeline')?.value || '';

  return {
    slug: cs.slug,
    companyName: cs.companyName,
    tag: cs.category,
    categoryTag: `CASE STUDY · ${cs.category.toUpperCase()}`,
    headline: cs.headline,
    highlightWord: cs.highlightWord,
    subheading: cs.subheading,
    topStats: cs.topStats.map((s) => ({ value: s.value, label: s.label })),
    quickFacts: {
      client: clientFact,
      program: programFact,
      headlineResult: headlineResultFact,
      timeline: timelineFact,
    },
    problem: {
      label: 'THE CHALLENGE',
      headline: cs.challenge.headline,
      paragraphs: cs.challenge.paragraphs,
    },
    systemBuilt: {
      label: 'THE SYSTEM BUILT',
      headline: cs.systemBuilt.headline,
      intro: cs.systemBuilt.intro,
      steps: cs.systemBuilt.steps.map((st) => ({
        stepNum: st.number,
        tag: st.title.toUpperCase(),
        title: st.title,
        description: st.body,
      })),
    },
    results: {
      label: 'THE RESULTS',
      headline: cs.results.headline,
      metrics: cs.results.stats.map((st) => ({ stat: st.value, label: st.label })),
      paragraphs: [],
    },
    closingCta: {
      label: 'YOUR TURN',
      headline: cs.closingCta.headline,
      subheading: cs.closingCta.body,
      buttonText: 'Book a free audit call',
    },
    keyInsight: cs.keyInsight
      ? {
          headline: cs.keyInsight.headline,
          body: cs.keyInsight.body,
        }
      : undefined,
    engineBehind: cs.systemsUsed && cs.systemsUsed.length > 0
      ? {
          systems: cs.systemsUsed.map((sys) => ({
            tag: sys.label.toUpperCase(),
            title: sys.title,
            description: sys.body,
            actionText: sys.linkText,
            actionHref: sys.link,
          })),
        }
      : undefined,
    broaderTrackRecord: cs.trackRecord
      ? {
          headline: cs.trackRecord.headline,
          body: cs.trackRecord.body,
          relatedSlug: cs.trackRecord.link.replace('/case-studies/', '').replace(/^\//, ''),
          relatedTitle: cs.trackRecord.linkText,
        }
      : undefined,
  };
};

export const caseStudyDetails: Record<string, LegacyCaseStudyDetail> = mockCaseStudies.reduce(
  (acc, cs) => {
    acc[cs.slug] = adaptToLegacyDetail(cs);
    return acc;
  },
  {} as Record<string, LegacyCaseStudyDetail>
);

export function getCaseStudyDetail(slug: string): LegacyCaseStudyDetail | null {
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return null;
  return adaptToLegacyDetail(cs);
}


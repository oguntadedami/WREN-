export interface CaseStudy {
  slug: string;
  companyName: string;
  tag: string;
  stat: string;
  statLabel: string;
  subStat: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
}

export interface CaseStudyStep {
  stepNum: string;
  tag: string;
  title: string;
  description: string;
}

export interface CaseStudyDetail {
  slug: string;
  companyName: string;
  tag: string;
  categoryTag: string;
  headline: string;
  highlightWord: string;
  subheading: string;
  topStats: Array<{
    value: string;
    label: string;
  }>;
  quickFacts: {
    client: string;
    program: string;
    headlineResult: string;
    timeline: string;
  };
  problem: {
    label: string;
    headline: string;
    paragraphs: string[];
  };
  systemBuilt: {
    label: string;
    headline: string;
    intro: string;
    steps: CaseStudyStep[];
  };
  results: {
    label: string;
    headline: string;
    intro?: string;
    metrics?: Array<{
      stat: string;
      label: string;
    }>;
    paragraphs?: string[];
  };
  closingCta: {
    label: string;
    headline: string;
    subheading: string;
    buttonText: string;
  };
  keyInsight?: {
    headline: string;
    body: string;
  };
  engineBehind?: {
    systems: Array<{
      tag: string;
      title: string;
      description: string;
      actionText: string;
      actionHref?: string;
    }>;
  };
  broaderTrackRecord?: {
    headline: string;
    body: string;
    relatedSlug?: string;
    relatedTitle?: string;
  };
}

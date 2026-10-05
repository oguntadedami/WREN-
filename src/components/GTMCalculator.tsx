import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Tape, MetalClip } from "./ScrapbookAssets";

const WREN_BOOKING_URL = "https://calendly.com/getwren/30min";

const CONVERSION = {
  icpMatchRate: 0.06,
  qualifiedLeadRate: 0.04,
  bookingRate: 0.1,
  closeRate: 0.22,
  audienceReachCap: 0.9,
};

const POST_FREQ: Record<string, number> = {
  rarely: 1,
  light: 1.5,
  steady: 4,
  heavy: 6.5,
};

const REACH_TIER: Record<string, number> = {
  tiny: 250,
  small: 1200,
  medium: 5500,
  large: 15000,
};

const CYCLE_DAYS: Record<string, number> = {
  fast: 21,
  normal: 45,
  slow: 75,
  stuck: 110,
};

interface Inputs {
  followers: number;
  frequency: string;
  reach: string;
  deal: string;
  cycle: string;
  inbound: string;
}

function calculate(inputs: Inputs) {
  const { followers, frequency, reach, deal, cycle, inbound } = inputs;

  const postsPerWeek = POST_FREQ[frequency];
  const postsPerMonth = postsPerWeek * 4.3;
  const reachPerPost = REACH_TIER[reach];
  const dealSize = parseFloat(deal);
  const cycleDays = CYCLE_DAYS[cycle];
  const currentInbound = parseFloat(inbound);

  const rawMonthlyReach = postsPerMonth * reachPerPost;
  const maxMonthlyReach = followers * CONVERSION.audienceReachCap * 3;
  const effectiveReach = Math.min(rawMonthlyReach, maxMonthlyReach);

  const icpMatches = effectiveReach * CONVERSION.icpMatchRate;
  const qualifiedLeads = icpMatches * CONVERSION.qualifiedLeadRate;
  const projectedBookings = qualifiedLeads * CONVERSION.bookingRate;
  const projectedClosed = projectedBookings * CONVERSION.closeRate;
  const projectedMonthlyRevenue = projectedClosed * dealSize;

  const currentMonthlyRevenue = currentInbound * CONVERSION.closeRate * dealSize;
  const gap = Math.max(0, projectedMonthlyRevenue - currentMonthlyRevenue);

  return {
    projectedMonthlyRevenue,
    currentMonthlyRevenue,
    gap,
    projectedBookings,
    qualifiedLeads,
    effectiveReach,
    cycleDays,
    inputs,
  };
}

type Results = ReturnType<typeof calculate>;

interface Diagnosis {
  tag: string;
  title: string;
  body: string;
  fixes: string[];
  alt: string;
}

const DIAGNOSES: ((r: Results) => Diagnosis | null)[] = [
  (r) => {
    const { frequency, reach } = r.inputs;
    if (frequency !== "rarely" && frequency !== "light") return null;
    if (reach === "large") return null;
    return {
      tag: "Top of funnel",
      title: 'Your <span class="anno">top of funnel</span> is starved',
      body: "Posting once or twice a week gives buyers barely enough exposure to remember who you are, and remembering is the floor for buying. This is not about posting more for the sake of it, it's that the compounding effect of consistent presence only kicks in above a threshold your motion is currently under.",
      fixes: [
        "Move to at least 3 posts a week for the next 30 days, then hold",
        "Repurpose one strong post into three different angles instead of writing fresh every time",
        "Batch content on one day so daily posting doesn't feel like daily writing",
      ],
      alt: "Or let Wren build the top-of-funnel engine for you, running consistently without needing your time.",
    };
  },
  (r) => {
    const { reach, frequency } = r.inputs;
    if (reach !== "tiny" && reach !== "small") return null;
    if (frequency === "rarely") return null;
    return {
      tag: "Distribution",
      title: 'Your content is <span class="anno">not travelling</span>',
      body: "You're posting consistently, and the content is not reaching enough people to matter. This is almost never a quality problem, it's a distribution problem. Either the hook isn't stopping the scroll, the format isn't matched to how your buyers use LinkedIn, or you're not showing up in the comments where your ICP already gathers.",
      fixes: [
        "Rewrite your last 5 hooks so each names a specific buyer situation, not a general observation",
        "Spend 15 minutes a day commenting on posts from your buyers before you post your own",
        "Test one carousel or one long-form post per week against your usual format",
      ],
      alt: "Or let Wren rebuild your content system around buyer signals and pipeline outcomes.",
    };
  },
  (r) => {
    const { followers, inbound } = r.inputs as any;
    const parsedInbound = parseFloat(inbound);
    if (followers < 3000) return null;
    if (parsedInbound >= 3) return null;
    return {
      tag: "The vanity gap",
      title: 'Audience is <span class="anno">compounding</span>, revenue isn\'t',
      body: "You have real reach and almost no inbound. This pattern means the content is producing applause from peers and creators, not conversations with buyers. The people engaging aren't the people who could buy from you, and the ones who could buy aren't finding a reason to reach out.",
      fixes: [
        "Rewrite three recent posts to name a specific buyer's problem instead of an industry observation",
        "End posts with a clear next step for a buyer, not a question for the audience",
        "Audit who's engaging: if less than 20% look like your ICP, the content is being written for the wrong room",
      ],
      alt: "Or let Wren rebuild the content system so posts convert instead of just performing.",
    };
  },
  (r) => {
    const { cycle } = r.inputs;
    if (cycle !== "slow" && cycle !== "stuck") return null;
    return {
      tag: "Sales cycle",
      title: 'Your objections are <span class="anno">living on calls</span>',
      body: "Deals taking 60+ days usually means the sales team is spending the first half of every call on education and objection-handling that content should have already done. The cycle is not slow because your buyers are slow, it's slow because they arrive to calls without the context needed to say yes.",
      fixes: [
        "List the three objections that come up most in sales calls this month",
        "Write one post for each objection, in your buyer's language, not your industry's",
        "Send those three posts to warm leads before the next call and watch the call feel different",
      ],
      alt: "Or let Wren build the Pre-Sale Content Engine that resolves objections before the call so cycles compress.",
    };
  },
  (r) => {
    const { inbound, deal } = r.inputs as any;
    const parsedInbound = parseFloat(inbound);
    const dealSize = parseFloat(deal);
    if (dealSize < 10000) return null;
    if (parsedInbound >= 3) return null;
    return {
      tag: "Buyer-fit mismatch",
      title: 'You\'re selling <span class="anno">premium to a broad audience</span>',
      body: "High-ticket offers need content that speaks precisely to one type of buyer, otherwise the wrong people show up and the right ones scroll past. Your deal size suggests you should be attracting a handful of very specific decision-makers, and the current inbound number suggests your content is being read by too broad a mix.",
      fixes: [
        "Rewrite your LinkedIn headline to name exactly who you help and what specific outcome, no jargon",
        "Pick one post from the last month that would only make sense to your ideal buyer, and pin it",
        "Stop writing for engagement metrics for one month, write only for the buyer profile you want",
      ],
      alt: "Or let Wren rebuild your positioning and content system for the buyer you actually want.",
    };
  },
];

function fmtCurrency(n: number) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return "$" + Math.round(n / 1000).toLocaleString() + "K";
  return "$" + Math.round(n).toLocaleString();
}
function fmtNumber(n: number) {
  return Math.round(n).toLocaleString();
}

const CountUp: React.FC<{ target: number; format: (n: number) => string; duration?: number }> = ({
  target,
  format,
  duration = 900,
}) => {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    let raf: number;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{format(display)}</>;
};

const FadeIn: React.FC<{ delay?: number; children: React.ReactNode; className?: string }> = ({
  delay = 0,
  children,
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 500ms ease, transform 500ms ease",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

type StepDef =
  | { key: keyof Inputs; type: "number"; label: string; aside?: string; placeholder: string }
  | { key: keyof Inputs; type: "select"; label: string; aside?: string; options: { value: string; label: string }[] };

const ALL_QUESTIONS: StepDef[] = [
  {
    key: "followers",
    type: "number",
    label: "How many LinkedIn followers do you have?",
    aside: "rough is fine",
    placeholder: "e.g. 8000",
  },
  {
    key: "frequency",
    type: "select",
    label: "How often do you post?",
    options: [
      { value: "rarely", label: "Less than once a week" },
      { value: "light", label: "1 to 2 times a week" },
      { value: "steady", label: "3 to 5 times a week" },
      { value: "heavy", label: "Almost every day" },
    ],
  },
  {
    key: "reach",
    type: "select",
    label: "Roughly how many people see each post?",
    aside: "check your analytics",
    options: [
      { value: "tiny", label: "Under 500" },
      { value: "small", label: "500 to 2,000" },
      { value: "medium", label: "2,000 to 10,000" },
      { value: "large", label: "Over 10,000" },
    ],
  },
  {
    key: "deal",
    type: "select",
    label: "What's your average deal size?",
    options: [
      { value: "1000", label: "Under $1,000" },
      { value: "3000", label: "$1,000 to $5,000" },
      { value: "10000", label: "$5,000 to $15,000" },
      { value: "30000", label: "$15,000 to $50,000" },
      { value: "75000", label: "Over $50,000" },
    ],
  },
  {
    key: "cycle",
    type: "select",
    label: "How long does a typical deal take to close?",
    options: [
      { value: "fast", label: "Under 30 days" },
      { value: "normal", label: "30 to 60 days" },
      { value: "slow", label: "60 to 90 days" },
      { value: "stuck", label: "Over 90 days" },
    ],
  },
  {
    key: "inbound",
    type: "select",
    label: "How many inbound calls do you get a month right now?",
    options: [
      { value: "0", label: "Zero" },
      { value: "1.5", label: "1 to 2" },
      { value: "4", label: "3 to 5" },
      { value: "8", label: "6 to 10" },
      { value: "15", label: "More than 10" },
    ],
  },
];

interface GTMCalculatorProps {
  onNavigate?: (page: any, sectionId?: string) => void;
  onOpenBooking?: () => void;
}

export const GTMCalculator: React.FC<GTMCalculatorProps> = ({ onNavigate, onOpenBooking }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [form, setForm] = useState<Partial<Inputs>>({});
  const [results, setResults] = useState<Results | null>(null);

  const q1 = ALL_QUESTIONS[currentPage * 2];
  const q2 = ALL_QUESTIONS[currentPage * 2 + 1];

  const val1 = form[q1?.key];
  const val2 = form[q2?.key];

  const isQ1Valid = val1 !== undefined && val1 !== "" && !(q1?.type === "number" && Number(val1) < 1);
  const isQ2Valid = val2 !== undefined && val2 !== "" && !(q2?.type === "number" && Number(val2) < 1);
  const canAdvancePage = isQ1Valid && isQ2Valid;

  const setQuestionValue = (key: keyof Inputs, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleNextPage = () => {
    if (!canAdvancePage) return;
    if (currentPage < 2) {
      setCurrentPage((p) => p + 1);
    } else {
      const r = calculate({
        followers: Number(form.followers),
        frequency: form.frequency!,
        reach: form.reach!,
        deal: form.deal!,
        cycle: form.cycle!,
        inbound: form.inbound!,
      });
      setResults(r);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleReset = () => {
    setForm({});
    setCurrentPage(0);
    setResults(null);
  };

  const firedDiagnoses = results
    ? DIAGNOSES.map((rule) => rule(results)).filter((d): d is Diagnosis => d !== null).slice(0, 2)
    : [];

  return (
    <div
      className="min-h-screen pt-28 sm:pt-36 pb-24"
      style={{
        background: "#F7F4E9",
        backgroundImage:
          "linear-gradient(#E4DED0 1px, transparent 1px), linear-gradient(90deg, #E4DED0 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <style>{`
        .anno { position: relative; display: inline-block; }
        .anno::after {
          content: "";
          position: absolute;
          left: -2px; right: -2px; bottom: -3px;
          height: 8px;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 12' preserveAspectRatio='none'><path d='M2 8 C 40 4, 90 10, 130 6 S 190 8, 198 5' stroke='%23CBDA46' stroke-width='5' fill='none' stroke-linecap='round'/></svg>");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .calc-button {
          box-shadow: 0 4px 0 #04170F, 0 6px 12px rgba(0,0,0,0.35);
          transition: all 0.12s ease;
        }
        .calc-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 5px 0 #04170F, 0 8px 16px rgba(0,0,0,0.4);
        }
        .calc-button:active:not(:disabled) {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #04170F, 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {onNavigate && (
          <div className="mb-8 max-w-5xl mx-auto">
            <button
              type="button"
              onClick={() => onNavigate('free-stuff')}
              className="inline-flex items-center gap-2 font-sans font-semibold text-xs sm:text-sm text-[#093624] hover:text-[#15543D] transition-colors cursor-pointer group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Free stuff</span>
            </button>
          </div>
        )}

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#093624] leading-tight">
            See what your presence could{" "}
            <span className="relative inline-block whitespace-nowrap">
              actually produce
              <svg
                className="absolute left-0 -bottom-2 w-full h-3 pointer-events-none"
                viewBox="0 0 260 14"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9C55 4 125 11 185 6C215 3.5 245 7.5 257 6"
                  stroke="#CBDA46"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#54605a] max-w-2xl mx-auto leading-relaxed">
            Six questions, real math tuned from B2B founder engagements we've run. The
            result shows what your current audience could produce, and quietly reveals
            what's leaking in your pipeline right now.
          </p>
        </div>

        <div className="w-full bg-[#093624] rounded-2xl sm:rounded-3xl border-2 sm:border-[2.5px] border-[#093624] shadow-[6px_6px_0px_#093624] overflow-hidden flex flex-col transition-all">
          <div className="bg-[#093624] px-4 py-2.5 sm:px-5 sm:py-3 flex items-center border-b border-[#04170F]/50">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border border-black/20 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166] border border-black/20 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBDA46] border border-black/20 inline-block" />
            </div>
          </div>

          <div className="p-2 sm:p-3 bg-[#093624]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5 items-stretch">
              
              <div 
                className="md:col-span-7 flex flex-col justify-between rounded-xl sm:rounded-2xl bg-[#FAF7EE] text-[#093624] p-5 sm:p-7 border border-[#093624]/20 relative min-h-[480px] shadow-xs"
              >
                
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#093624]/10 text-xs font-mono text-[#6F7A6E]">
                  <span className="font-bold text-[#093624] uppercase tracking-wider">
                    SECTION {currentPage + 1} OF 3
                  </span>
                </div>

              <div className="space-y-6 flex-1">
                
                {q1 && (
                  <div>
                    <label className="block font-serif font-semibold text-base sm:text-lg text-[#093624] mb-1.5 leading-snug">
                      <span className="font-mono text-xs text-[#15543D] mr-1.5 font-bold">
                        0{currentPage * 2 + 1}.
                      </span>
                      {q1.label}
                      {q1.aside && (
                        <span className="ml-1.5 text-xs font-normal italic text-[#6F7A6E]">
                          ({q1.aside})
                        </span>
                      )}
                    </label>

                    {q1.type === "number" ? (
                      <input
                        type="number"
                        min={0}
                        step={100}
                        placeholder={q1.placeholder}
                        value={(val1 as string) || ""}
                        onChange={(e) => setQuestionValue(q1.key, e.target.value)}
                        className="w-full rounded-xl border-2 border-[#093624]/15 bg-white px-4 py-2.5 text-base text-[#093624] focus:outline-none focus:border-[#093624] focus:ring-2 focus:ring-[#CBDA46]/40 transition shadow-inner"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {q1.options.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setQuestionValue(q1.key, opt.value)}
                            className={`text-left rounded-xl border-2 px-3 py-2 text-xs sm:text-[13px] font-medium transition cursor-pointer ${
                              val1 === opt.value
                                ? "border-[#093624] bg-[#EEF2CC] text-[#093624] font-bold shadow-xs"
                                : "border-[#093624]/15 bg-white text-[#093624] hover:border-[#093624]/40"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="h-px w-full bg-[#093624]/10" />

                {q2 && (
                  <div>
                    <label className="block font-serif font-semibold text-base sm:text-lg text-[#093624] mb-1.5 leading-snug">
                      <span className="font-mono text-xs text-[#15543D] mr-1.5 font-bold">
                        0{currentPage * 2 + 2}.
                      </span>
                      {q2.label}
                      {q2.aside && (
                        <span className="ml-1.5 text-xs font-normal italic text-[#6F7A6E]">
                          ({q2.aside})
                        </span>
                      )}
                    </label>

                    {q2.type === "number" ? (
                      <input
                        type="number"
                        min={0}
                        step={100}
                        placeholder={q2.placeholder}
                        value={(val2 as string) || ""}
                        onChange={(e) => setQuestionValue(q2.key, e.target.value)}
                        className="w-full rounded-xl border-2 border-[#093624]/15 bg-white px-4 py-2.5 text-base text-[#093624] focus:outline-none focus:border-[#093624] focus:ring-2 focus:ring-[#CBDA46]/40 transition shadow-inner"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {q2.options.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setQuestionValue(q2.key, opt.value)}
                            className={`text-left rounded-xl border-2 px-3 py-2 text-xs sm:text-[13px] font-medium transition cursor-pointer ${
                              val2 === opt.value
                                ? "border-[#093624] bg-[#EEF2CC] text-[#093624] font-bold shadow-xs"
                                : "border-[#093624]/15 bg-white text-[#093624] hover:border-[#093624]/40"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[#093624]/15 flex items-center justify-between">
                
                <div className="w-14">
                  {currentPage > 0 ? (
                    <button
                      type="button"
                      onClick={handlePrevPage}
                      className="calc-button w-12 h-12 rounded-xl bg-[#E4DED0] border border-[#093624]/30 text-[#093624] flex items-center justify-center font-bold text-lg cursor-pointer"
                      title="Previous Page"
                      aria-label="Previous Page"
                    >
                      ◀
                    </button>
                  ) : (
                    <div className="w-12 h-12" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (idx <= currentPage || canAdvancePage) {
                          setCurrentPage(idx);
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                        currentPage === idx
                          ? "bg-[#093624] scale-125 ring-2 ring-[#CBDA46]"
                          : "bg-[#093624]/20 hover:bg-[#093624]/40"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="w-14 flex justify-end">
                  {currentPage < 2 ? (
                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={!canAdvancePage}
                      className={`calc-button w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-lg select-none cursor-pointer ${
                        canAdvancePage
                          ? "bg-[#CBDA46] border-[#093624] text-[#093624]"
                          : "bg-[#E4DED0] border-[#9a9a90]/30 text-[#9a9a90] shadow-none cursor-not-allowed opacity-60"
                      }`}
                      title="Next Page"
                      aria-label="Next Page"
                    >
                      ▶
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={!canAdvancePage}
                      className={`calc-button w-14 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-2xl select-none cursor-pointer ${
                        canAdvancePage
                          ? "bg-[#CBDA46] border-[#093624] text-[#093624] shadow-[0_4px_0_#04170F]"
                          : "bg-[#E4DED0] border-[#9a9a90]/30 text-[#9a9a90] shadow-none cursor-not-allowed opacity-60"
                      }`}
                      title="Calculate Results"
                      aria-label="Calculate Results"
                    >
                      =
                    </button>
                  )}
                </div>

              </div>
            </div>

            <div 
              className="md:col-span-5 flex flex-col justify-center items-center rounded-xl sm:rounded-2xl bg-[#FAF7EE] text-[#093624] p-5 sm:p-7 border border-[#093624]/20 relative min-h-[350px] md:min-h-[480px] shadow-xs"
            >
              
              {!results ? (
                <div className="text-center px-4">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#093624]/20 flex items-center justify-center mx-auto mb-3 text-[#093624]/40 font-mono font-bold text-lg">
                    --
                  </div>
                  <p className="font-sans text-sm sm:text-base text-[#6F7A6E]">
                    Your numbers will show up here
                  </p>
                  <p className="font-mono text-[11px] text-[#6F7A6E]/70 mt-2 uppercase tracking-wider">
                    Answer the 6 questions &amp; press =
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col justify-between h-full py-4 text-center">
                  
                  <div className="flex items-center justify-end text-[11px] font-mono font-bold uppercase tracking-widest text-[#15543D] pb-3 border-b border-[#093624]/10 w-full">
                    <span className="flex items-center gap-1.5 text-[#093624]">
                      <span className="w-2 h-2 rounded-full bg-[#15543D] animate-ping" />
                      LIVE RESULT
                    </span>
                  </div>

                  <div 
                    className="my-auto py-8 px-4 rounded-xl bg-[#093624] text-[#F7F4E9] border-2 border-[#15543D] shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] w-full"
                  >
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#CBDA46] mb-2 font-bold">
                      PROJECTED MONTHLY REVENUE
                    </div>

                    <div className="font-mono text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#FAF7EE] leading-none">
                      <CountUp target={results.projectedMonthlyRevenue} format={fmtCurrency} />
                    </div>

                    <div className="font-mono text-sm text-[#CBDA46] mt-2 font-semibold">
                      / month from presence
                    </div>
                  </div>

                  <div className="pt-3 text-xs font-sans text-[#6F7A6E]">
                    Full breakdown &amp; diagnostic report unlocked below ↓
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>

        {results && (
          <div className="mt-16 space-y-10 max-w-5xl mx-auto">
            
            {(() => {
              const weekly = results.projectedMonthlyRevenue / 4.3;
              const yearly = results.projectedMonthlyRevenue * 12;
              return (
                <FadeIn delay={0}>
                  <div className="relative group">
                    <div className="absolute -top-4 left-6 sm:left-10 z-20 pointer-events-none drop-shadow-xs">
                      <MetalClip className="w-5 h-11" />
                    </div>

                    <div 
                      className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-2 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14 bg-[rgba(203,218,70,0.92)]"
                      style={{
                        clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                      }}
                    />

                    <div 
                      className="absolute inset-0 translate-x-2 translate-y-3 bg-[#093624]/20 transition-all duration-300"
                      style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                    />

                    <div 
                      className="relative z-10 p-7 sm:p-10 bg-white/95 text-[#093624] border-2 border-[#093624] shadow-xs"
                      style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
                    >
                      <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#15543D] mb-3">
                        PROJECTED MONTHLY REVENUE FROM PRESENCE
                      </div>

                      <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#093624] leading-none mb-3">
                        <CountUp target={results.projectedMonthlyRevenue} format={fmtCurrency} />
                        <span className="text-2xl sm:text-3xl italic font-serif font-normal text-[#6F7A6E] ml-2">/month</span>
                      </div>

                      <div className="font-serif italic text-base sm:text-lg text-[#54605a] leading-relaxed mb-6">
                        Roughly{" "}
                        <b className="text-[#15543D] not-italic font-bold">
                          <CountUp target={results.projectedBookings} format={fmtNumber} /> qualified calls a month
                        </b>{" "}
                        at your current audience, tuned to a realistic close rate.
                      </div>

                      <div className="h-px w-full bg-[#093624]/10 mb-6" />

                      <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
                        {[
                          { n: fmtCurrency(weekly), l: "PER WEEK" },
                          { n: fmtCurrency(results.projectedMonthlyRevenue), l: "PER MONTH" },
                          { n: fmtCurrency(yearly), l: "PER YEAR" },
                        ].map((item) => (
                          <div key={item.l}>
                            <div className="font-serif font-bold text-xl sm:text-3xl text-[#093624]">
                              {item.n}
                            </div>
                            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6F7A6E] mt-1">
                              {item.l}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })()}

            {results.gap > 500 && (
              <FadeIn delay={150}>
                <div className="relative group">
                  <div 
                    className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-2 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14 bg-[rgba(245,166,33,0.92)]"
                    style={{
                      clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                    }}
                  />

                  <div 
                    className="absolute inset-0 translate-x-2 translate-y-3 bg-[#04170F]/40 transition-all duration-300"
                    style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                  />

                  <div 
                    className="relative z-10 p-7 sm:p-10 bg-[#093624] text-[#F7F4E9] border-2 border-[#15543D] shadow-xs"
                    style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#CBDA46] mb-3">
                      THE GAP
                    </div>

                    <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-4">
                      <span className="bg-[#CBDA46] text-[#093624] italic rounded-md px-3 py-0.5 inline-block">
                        <CountUp target={results.gap} format={fmtCurrency} />
                      </span>
                      <span
                        className="text-xl sm:text-2xl italic font-serif font-normal ml-3"
                        style={{ color: "rgba(247,244,233,.65)" }}
                      >
                        /month leaking
                      </span>
                    </div>

                    <div className="text-[15.5px] sm:text-lg leading-relaxed max-w-3xl" style={{ color: "rgba(247,244,233,.9)" }}>
                      You're doing about{" "}
                      <b className="text-[#CBDA46] font-bold">{fmtCurrency(results.currentMonthlyRevenue)}</b> in inbound
                      revenue right now. The math says your audience could produce{" "}
                      {fmtCurrency(results.projectedMonthlyRevenue)}. That gap is where the pipeline is quietly
                      leaking.
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {firedDiagnoses.map((d, i) => {
              const tapeColor = i % 2 === 0 ? "rgba(203,218,70,0.92)" : "rgba(245,166,33,0.92)";
              return (
                <FadeIn delay={300 + i * 150} key={d.tag}>
                  <div className="relative group">
                    <div 
                      className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-1 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14"
                      style={{
                        backgroundColor: tapeColor,
                        clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                      }}
                    />

                    <div 
                      className="absolute inset-0 translate-x-2 translate-y-3 bg-[#093624]/15 transition-all duration-300"
                      style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                    />

                    <div 
                      className="relative z-10 p-7 sm:p-10 bg-white/95 text-[#093624] border-2 border-[#093624] shadow-xs"
                      style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
                    >
                      <span className="inline-block rounded-full bg-[#EEF2CC] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#093624] border border-[#093624]/15 mb-4">
                        {d.tag}
                      </span>

                      <div
                        className="font-serif font-bold text-2xl sm:text-3xl text-[#093624] leading-tight mb-4"
                        dangerouslySetInnerHTML={{ __html: d.title }}
                      />

                      <p className="text-base sm:text-[17px] leading-relaxed text-[#54605a] mb-6">
                        {d.body}
                      </p>

                      <div className="font-serif italic font-bold text-lg text-[#15543D] mb-3">
                        Fix it yourself
                      </div>

                      <ul className="space-y-2.5 mb-8">
                        {d.fixes.map((fix) => (
                          <li key={fix} className="flex items-start gap-2.5 text-base text-[#54605a] leading-relaxed">
                            <span className="text-[#093624] font-bold shrink-0 mt-0.5">→</span>
                            <span>{fix}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-[#093624]/15 flex flex-wrap items-center justify-between gap-5">
                        <div className="font-serif italic text-base sm:text-lg text-[#54605a] flex-1 min-w-[240px]">
                          {d.alt}
                        </div>

                        {onOpenBooking ? (
                          <Button
                            variant="secondary"
                            size="md"
                            showSparkles={false}
                            onClick={onOpenBooking}
                            className="font-bold text-sm"
                          >
                            Book a 20-min call →
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            size="md"
                            showSparkles={false}
                            href={WREN_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-sm"
                          >
                            Book a 20-min call →
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}

            <FadeIn delay={300 + firedDiagnoses.length * 150 + 100}>
              <div className="relative group">
                <div 
                  className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-2 w-28 sm:w-32 h-6 -top-3 right-8 sm:right-14 bg-[rgba(203,218,70,0.92)]"
                  style={{
                    clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                  }}
                />

                <div 
                  className="absolute inset-0 translate-x-2 translate-y-3 bg-[#093624]/20 transition-all duration-300"
                  style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
                />

                <div 
                  className="relative z-10 p-7 sm:p-10 bg-[#EEF2CC]/70 text-[#093624] border-2 border-[#093624] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs"
                  style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
                >
                  <p className="font-sans text-base sm:text-lg text-[#093624] font-medium leading-relaxed flex-1">
                    Numbers are directional, not a promise. The diagnoses are patterns we see repeatedly in founder-led B2B, not verdicts on your specific business. If you want a proper look at your pipeline, book a call and we'll do it with you.
                  </p>

                  <div className="shrink-0">
                    {onOpenBooking ? (
                      <Button
                        variant="secondary"
                        size="md"
                        showSparkles={false}
                        onClick={onOpenBooking}
                        className="font-bold text-sm bg-white"
                      >
                        Book a call →
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="md"
                        showSparkles={false}
                        href={WREN_BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-sm bg-white"
                      >
                        Book a call →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300 + firedDiagnoses.length * 150 + 200}>
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-base font-semibold text-[#093624] underline decoration-[#093624]/30 underline-offset-4 hover:decoration-[#CBDA46] transition cursor-pointer"
                >
                  Try different numbers
                </button>
              </div>
            </FadeIn>

          </div>
        )}

      </div>
    </div>
  );
};

export default GTMCalculator;

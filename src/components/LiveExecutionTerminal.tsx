import React, { useEffect, useState, useRef } from 'react';

interface Milestone {
  id: string;
  pct: number; // 0.25, 0.50, 0.75, 1.00
  label: string;
  desc: string;
  colorName: string;
  badgeClass: string;
  activeClass: string;
  glowColor: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'writing',
    pct: 0.25,
    label: '[WRITING]',
    desc: 'Crafting founder content & voice assets',
    colorName: 'yellow',
    badgeClass: 'bg-[#FEF9C3] text-[#854D0E] border-[#FACC15]',
    activeClass: 'ring-2 ring-[#FACC15]/60 shadow-[0_0_14px_rgba(250,204,21,0.5)]',
    glowColor: '#FACC15',
  },
  {
    id: 'engaging',
    pct: 0.50,
    label: '[ENGAGING]',
    desc: 'Activating outbound & network engagement',
    colorName: 'purple',
    badgeClass: 'bg-[#F3E8FF] text-[#6B21A8] border-[#C084FC]',
    activeClass: 'ring-2 ring-[#C084FC]/60 shadow-[0_0_14px_rgba(192,132,252,0.5)]',
    glowColor: '#C084FC',
  },
  {
    id: 'routing',
    pct: 0.75,
    label: '[ROUTING]',
    desc: 'Routing qualified inbound buyers to calendar',
    colorName: 'blue',
    badgeClass: 'bg-[#E0F2FE] text-[#0369A1] border-[#38BDF8]',
    activeClass: 'ring-2 ring-[#38BDF8]/60 shadow-[0_0_14px_rgba(56,189,248,0.5)]',
    glowColor: '#38BDF8',
  },
  {
    id: 'success',
    pct: 1.00,
    label: '[SUCCESS]',
    desc: 'Pipeline active & qualified leads routed',
    colorName: 'green',
    badgeClass: 'bg-[#DCFCE7] text-[#15803D] border-[#4ADE80]',
    activeClass: 'ring-2 ring-[#22C55E] shadow-[0_0_18px_rgba(74,222,128,0.8)]',
    glowColor: '#4ADE80',
  },
];

export const LiveExecutionTerminal: React.FC = () => {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [activeStepInfo, setActiveStepInfo] = useState<{ label: string; desc: string; badgeClass: string } | null>(null);
  const [isSuccessFlash, setIsSuccessFlash] = useState(false);
  const startTimeRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
    const duration = 4000; // 4.0 seconds per seamless loop

    const frame = (now: number) => {
      const elapsed = (now - startTimeRef.current) % duration;
      const norm = elapsed / duration; // 0.00 to 1.00
      setProgress(norm * 100);

      // Milestone detection in JavaScript
      if (norm >= 0.16 && norm <= 0.34) {
        setActiveStepInfo({
          label: MILESTONES[0].label,
          desc: MILESTONES[0].desc,
          badgeClass: MILESTONES[0].badgeClass,
        });
        setIsSuccessFlash(false);
      } else if (norm >= 0.41 && norm <= 0.59) {
        setActiveStepInfo({
          label: MILESTONES[1].label,
          desc: MILESTONES[1].desc,
          badgeClass: MILESTONES[1].badgeClass,
        });
        setIsSuccessFlash(false);
      } else if (norm >= 0.66 && norm <= 0.84) {
        setActiveStepInfo({
          label: MILESTONES[2].label,
          desc: MILESTONES[2].desc,
          badgeClass: MILESTONES[2].badgeClass,
        });
        setIsSuccessFlash(false);
      } else if (norm >= 0.90 || norm <= 0.04) {
        setActiveStepInfo({
          label: MILESTONES[3].label,
          desc: MILESTONES[3].desc,
          badgeClass: MILESTONES[3].badgeClass,
        });
        setIsSuccessFlash(true);
      } else {
        setActiveStepInfo(null);
        setIsSuccessFlash(false);
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Compute smooth fade in and out opacity for each tag
  const getTagState = (milestonePct: number) => {
    const norm = progress / 100;
    let dist = Math.abs(norm - milestonePct);
    if (milestonePct === 1.0 && norm < 0.1) {
      dist = norm; // Seamless loop wrap-around at 100% -> 0%
    }

    const windowSize = 0.11; // 11% window around the milestone for fade in/out
    if (dist <= windowSize) {
      // Smooth cosine falloff
      const factor = Math.cos((dist / windowSize) * (Math.PI / 2));
      return {
        opacity: factor,
        scale: 0.92 + factor * 0.12,
        visible: true,
      };
    }

    return {
      opacity: 0,
      scale: 0.90,
      visible: false,
    };
  };

  return (
    <div className="w-full max-w-[500px] bg-[#1E3A2F] rounded-2xl border-2 border-[#093624] shadow-[6px_6px_0px_#093624] overflow-hidden select-none font-jetbrains text-white transition-all duration-300">
      
      {/* Inline Keyframes for Infinite Smooth CSS Pulse Animation */}
      <style>{`
        @keyframes pulseTrackGlow {
          0% {
            left: -25%;
          }
          100% {
            left: 100%;
          }
        }
        @keyframes successFlashAnim {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 16px rgba(74, 222, 128, 0.9));
          }
          50% {
            opacity: 0.7;
            filter: drop-shadow(0 0 6px rgba(74, 222, 128, 0.4));
          }
        }
      `}</style>

      {/* Header: "DASH://EXECUTION-RUNTIME" with a "STEP 05" badge */}
      <div className="bg-[#152921] border-b-2 border-[#093624] px-3.5 sm:px-4 py-2.5 flex items-center justify-between">
        {/* Left: Window Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981]" />
        </div>

        {/* Center: Title */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#A7F3D0]">
            DASH://EXECUTION-RUNTIME
          </span>
        </div>

        {/* Right: STEP 05 Badge */}
        <div className="flex items-center">
          <span className="bg-[#093624] text-[#4ADE80] border border-[#4ADE80]/40 font-bold px-2 py-0.5 rounded text-[9px] sm:text-[10px] tracking-wider">
            STEP 05
          </span>
        </div>
      </div>

      {/* Main Body: Dark green terminal background (#1E3A2F) with a light cream white card inside */}
      <div className="p-4 sm:p-5 bg-[#1E3A2F]">
        
        {/* Light Cream White Card */}
        <div className="bg-[#FAF8F2] border border-[#093624]/20 rounded-xl p-4 sm:p-5 shadow-lg text-[#093624]">
          
          {/* Card Top Metadata Bar */}
          <div className="flex items-center justify-between mb-4 border-b border-[#093624]/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#093624] uppercase tracking-wider">
                Live Execution Engine
              </span>
            </div>

            {/* Live Progress Tag Readout */}
            <div className="flex items-center gap-2">
              {activeStepInfo ? (
                <span className={`px-1.5 py-0.5 rounded border text-[9px] sm:text-[10px] font-bold tracking-tight ${activeStepInfo.badgeClass}`}>
                  {activeStepInfo.label}
                </span>
              ) : (
                <span className="text-[#6F7A6E] text-[9px] sm:text-[9.5px] font-mono">
                  RUNNING...
                </span>
              )}
              <span className="text-[10px] sm:text-[11.5px] font-mono font-bold text-[#093624] min-w-[34px] text-right">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Real-time Events: Text Tags Appearing Above the Bar as Pulse Crosses Milestones */}
          <div className="relative h-8 mb-2 flex items-center">
            {MILESTONES.map((m) => {
              const state = getTagState(m.pct);
              const isSuccess = m.pct === 1.0;
              const isFlashing = isSuccess && isSuccessFlash;

              // Ensure alignment: 25%, 50%, 75%, and 100% (right-aligned for 100%)
              const leftPos = `${m.pct * 100}%`;

              return (
                <div
                  key={m.id}
                  className="absolute pointer-events-none transition-all duration-150 flex flex-col items-center"
                  style={{
                    left: leftPos,
                    transform: m.pct === 1.0 ? `translateX(-95%) scale(${state.scale})` : `translateX(-50%) scale(${state.scale})`,
                    opacity: state.opacity,
                  }}
                >
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 rounded text-[8.5px] sm:text-[9.5px] font-bold tracking-tight border shadow-xs transition-all duration-200 ${
                      m.badgeClass
                    } ${state.visible ? m.activeClass : ''} ${
                      isFlashing ? 'animate-bounce' : ''
                    }`}
                    style={isFlashing ? { animation: 'successFlashAnim 0.35s infinite' } : {}}
                  >
                    {m.label}
                  </span>
                  {/* Small triangular indicator notch below tag */}
                  <span
                    className={`w-1.5 h-1.5 rotate-45 -mt-1 border-r border-b ${
                      m.pct === 0.25 ? 'bg-[#FEF9C3] border-[#FACC15]' :
                      m.pct === 0.50 ? 'bg-[#F3E8FF] border-[#C084FC]' :
                      m.pct === 0.75 ? 'bg-[#E0F2FE] border-[#38BDF8]' :
                      'bg-[#DCFCE7] border-[#4ADE80]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* The Bar: Long, Dark Track with Infinite Bright Glowing Green Pulse CSS Animation */}
          <div className="relative">
            {/* Long, Dark Track */}
            <div className="w-full h-3.5 sm:h-4 bg-[#081610] rounded-full overflow-hidden relative border border-[#093624]/40 shadow-inner">
              
              {/* Active filled trail following the pulse */}
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#22C55E]/15 to-[#22C55E]/30 rounded-full"
                style={{ width: `${progress}%` }}
              />

              {/* Milestone vertical ticks along track */}
              <div className="absolute inset-0 flex justify-between px-[25%] pointer-events-none">
                <div className="w-[1px] h-full bg-white/10" />
                <div className="w-[1px] h-full bg-white/10" />
              </div>
              <div className="absolute inset-y-0 left-[75%] w-[1px] bg-white/10 pointer-events-none" />

              {/* Infinite CSS Animation Glowing Green Gradient Pulse (4s duration, seamless loop) */}
              <div
                className="absolute inset-y-0 rounded-full pointer-events-none"
                style={{
                  width: '26%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.4) 30%, #4ADE80 75%, #86EFAC 92%, #FFFFFF 100%)',
                  boxShadow: '0 0 14px #4ADE80, 0 0 24px #22C55E, 0 0 32px rgba(74, 222, 128, 0.6)',
                  animation: 'pulseTrackGlow 4s linear infinite',
                }}
              />
            </div>

            {/* Track Milestone Scale Markers */}
            <div className="relative w-full flex justify-between mt-2 px-0.5 text-[8.5px] sm:text-[9.5px] font-mono text-[#6F7A6E]">
              <span className="font-semibold">0%</span>
              <span className="font-semibold text-[#CA8A04] -ml-2">25%</span>
              <span className="font-semibold text-[#9333EA] -ml-1">50%</span>
              <span className="font-semibold text-[#0284C7]">75%</span>
              <span className="font-semibold text-[#16A34A]">100%</span>
            </div>
          </div>

          {/* Active Step Real-time Description Log */}
          <div className="mt-3.5 pt-2.5 border-t border-[#093624]/10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#6F7A6E]">
            <div className="flex items-center gap-1.5 truncate mr-2">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeStepInfo ? 'bg-[#16A34A]' : 'bg-[#94A3B8]'}`} />
              <span className="truncate text-[#093624] font-medium">
                {activeStepInfo ? activeStepInfo.desc : 'Executing continuous automated pipeline...'}
              </span>
            </div>
            <div className="shrink-0 text-[#093624] font-bold text-[9px] bg-[#093624]/5 px-1.5 py-0.5 rounded border border-[#093624]/10">
              4.0s LOOP
            </div>
          </div>

        </div>

      </div>

      {/* Footer: Terminal text >_ $ system --active */}
      <div className="bg-[#152921] border-t-2 border-[#093624] px-4 py-2.5 flex items-center justify-between text-[10.5px] sm:text-[11.5px] font-mono">
        <div className="flex items-center gap-2 text-[#86EFAC]">
          <span className="text-[#4ADE80] font-bold">&gt;_</span>
          <span className="text-[#E2E8F0]">$ system --active</span>
          <span className="w-2 h-3.5 bg-[#4ADE80] animate-pulse inline-block" />
        </div>
        <div className="text-[9.5px] text-[#86EFAC]/70 font-semibold tracking-wider">
          STATUS: ACTIVE
        </div>
      </div>

    </div>
  );
};

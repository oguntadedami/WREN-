import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tape } from './ScrapbookAssets';

interface PodcastMicTopicsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onPressPlay: (topicTitle?: string) => void;
}

// Coordinate helper
interface Point {
  x: number;
  y: number;
}

/**
 * Computes a point displaced along the edge normal.
 * u: fraction along the edge (0 to 1)
 * v: fraction of tab depth (0 on edge, 1 at peak of tab, > 0 = outward in left-normal direction)
 * tabType: +1 for tab (outward), -1 for blank (inward), 0 for flat
 */
function getPoint(
  p1: Point,
  p2: Point,
  u: number,
  v: number,
  tabType: number,
  tabDepth: number
): Point {
  const vx = p2.x - p1.x;
  const vy = p2.y - p1.y;
  const L = Math.hypot(vx, vy);
  if (L === 0) return { x: p1.x, y: p1.y };

  const tx = vx / L;
  const ty = vy / L;
  // Normal pointing to the left of the direction of travel (in screen coordinates where Y is down)
  const nx = ty;
  const ny = -tx;

  const d = tabDepth * tabType;
  const px = p1.x + u * vx + v * d * nx;
  const py = p1.y + u * vy + v * d * ny;

  return {
    x: Math.round(px * 10) / 10,
    y: Math.round(py * 10) / 10,
  };
}

/**
 * Generates an interlocking jigsaw edge path from p1 to p2.
 * Chunky, rounded interlocking tab matching the reference style.
 */
function generateEdgePath(
  p1: Point,
  p2: Point,
  tabType: number,
  tabDepth: number
): string {
  if (tabType === 0) {
    return `L ${p2.x} ${p2.y}`;
  }

  const p = (u: number, v: number) => getPoint(p1, p2, u, v, tabType, tabDepth);

  const startNeck = p(0.35, 0);
  const cp1_1 = p(0.365, -0.05);
  const cp1_2 = p(0.34, 0.35);
  const neck1 = p(0.34, 0.60);

  const cp2_1 = p(0.34, 0.90);
  const cp2_2 = p(0.41, 1.08);
  const headTop = p(0.50, 1.08);

  const cp3_1 = p(0.59, 1.08);
  const cp3_2 = p(0.66, 0.90);
  const neck2 = p(0.66, 0.60);

  const cp4_1 = p(0.66, 0.35);
  const cp4_2 = p(0.635, -0.05);
  const endNeck = p(0.65, 0);

  return [
    `L ${startNeck.x} ${startNeck.y}`,
    `C ${cp1_1.x} ${cp1_1.y}, ${cp1_2.x} ${cp1_2.y}, ${neck1.x} ${neck1.y}`,
    `C ${cp2_1.x} ${cp2_1.y}, ${cp2_2.x} ${cp2_2.y}, ${headTop.x} ${headTop.y}`,
    `C ${cp3_1.x} ${cp3_1.y}, ${cp3_2.x} ${cp3_2.y}, ${neck2.x} ${neck2.y}`,
    `C ${cp4_1.x} ${cp4_1.y}, ${cp4_2.x} ${cp4_2.y}, ${endNeck.x} ${endNeck.y}`,
    `L ${p2.x} ${p2.y}`,
  ].join(' ');
}

/**
 * Generates the full closed SVG path string for a jigsaw puzzle piece with rounded outer corners.
 */
function generatePuzzlePiecePath(
  width: number,
  height: number,
  edges: { top: number; right: number; bottom: number; left: number },
  row: number,
  col: number,
  tabDepthX: number = 28,
  tabDepthY: number = 26
): string {
  const r = 20; // Radius for outer perimeter corners

  const isTopLeftOuter = row === 0 && col === 0;
  const isTopRightOuter = row === 0 && col === 2;
  const isBottomRightOuter = row === 1 && col === 2;
  const isBottomLeftOuter = row === 1 && col === 0;

  // Top edge points
  const topStart = isTopLeftOuter ? { x: r, y: 0 } : { x: 0, y: 0 };
  const topEnd = isTopRightOuter ? { x: width - r, y: 0 } : { x: width, y: 0 };

  // Right edge points
  const rightStart = isTopRightOuter ? { x: width, y: r } : { x: width, y: 0 };
  const rightEnd = isBottomRightOuter ? { x: width, y: height - r } : { x: width, y: height };

  // Bottom edge points (right to left)
  const bottomStart = isBottomRightOuter ? { x: width - r, y: height } : { x: width, y: height };
  const bottomEnd = isBottomLeftOuter ? { x: r, y: height } : { x: 0, y: height };

  // Left edge points (bottom to top)
  const leftStart = isBottomLeftOuter ? { x: 0, y: height - r } : { x: 0, y: height };
  const leftEnd = isTopLeftOuter ? { x: 0, y: r } : { x: 0, y: 0 };

  const topEdge = generateEdgePath(topStart, topEnd, edges.top, tabDepthY);
  const rightEdge = generateEdgePath(rightStart, rightEnd, edges.right, tabDepthX);
  const bottomEdge = generateEdgePath(bottomStart, bottomEnd, edges.bottom, tabDepthY);
  const leftEdge = generateEdgePath(leftStart, leftEnd, edges.left, tabDepthX);

  const segments: string[] = [];

  // Top-left start
  if (isTopLeftOuter) {
    segments.push(`M 0 ${r}`);
    segments.push(`A ${r} ${r} 0 0 1 ${r} 0`);
  } else {
    segments.push(`M 0 0`);
  }

  // Top edge
  segments.push(topEdge);

  // Top-right corner
  if (isTopRightOuter) {
    segments.push(`A ${r} ${r} 0 0 1 ${width} ${r}`);
  }

  // Right edge
  segments.push(rightEdge);

  // Bottom-right corner
  if (isBottomRightOuter) {
    segments.push(`A ${r} ${r} 0 0 1 ${width - r} ${height}`);
  }

  // Bottom edge
  segments.push(bottomEdge);

  // Bottom-left corner
  if (isBottomLeftOuter) {
    segments.push(`A ${r} ${r} 0 0 1 0 ${height - r}`);
  }

  // Left edge
  segments.push(leftEdge);

  segments.push('Z');
  return segments.join(' ');
}

// 2 rows x 3 columns puzzle configuration
const PUZZLE_PIECES = [
  // ROW 1
  {
    id: 'founder-stories',
    row: 0,
    col: 0,
    title: 'Real founder stories',
    category: 'Founder Stories',
    blurb: 'The wins, the lessons, and the other things happening behind the scenes.',
    bgColor: '#093624', // --color-bottle
    depthColor: '#03140C',
    titleColor: '#F7F4E9',
    edges: { top: 0, right: 1, bottom: 1, left: 0 },
    scattered: { x: -240, y: -190, rot: -20 },
    arrivalThreshold: 0.52,
  },
  {
    id: 'gtm-wild',
    row: 0,
    col: 1,
    title: 'GTM in the wild',
    category: 'GTM & Pipeline',
    blurb: 'What people are trying, testing, breaking, and figuring out.',
    bgColor: '#15543D', // --color-pine
    depthColor: '#0C2D21',
    titleColor: '#F7F4E9',
    edges: { top: 0, right: 1, bottom: -1, left: -1 },
    scattered: { x: 40, y: -260, rot: 16 },
    arrivalThreshold: 0.62,
  },
  {
    id: 'sales-conversations',
    row: 0,
    col: 2,
    title: 'Sales conversations',
    category: 'Sales Conversations',
    blurb: 'The stuff buyers say, the stuff sellers hear, and everything in between.',
    bgColor: '#B6C73A', // --color-wattle-deep
    depthColor: '#8C9A24',
    titleColor: '#093624',
    edges: { top: 0, right: 0, bottom: 1, left: -1 },
    scattered: { x: 260, y: -180, rot: -22 },
    arrivalThreshold: 0.70,
  },

  // ROW 2
  {
    id: 'deep-dives',
    row: 1,
    col: 0,
    title: 'Deep dives',
    category: 'Deep Dives',
    blurb: 'Pulling apart an idea, strategy, business, or trend until it makes sense.',
    bgColor: '#6F7A6E', // --color-sage
    depthColor: '#475046',
    titleColor: '#F7F4E9',
    edges: { top: -1, right: -1, bottom: 0, left: 0 },
    scattered: { x: -230, y: 220, rot: 22 },
    arrivalThreshold: 0.78,
  },
  {
    id: 'unpopular-opinions',
    row: 1,
    col: 1,
    title: 'Unpopular opinions',
    category: 'Unpopular Opinions',
    blurb: 'The things everyone seems to agree on that we aren’t so sure about.',
    bgColor: '#05281A', // --color-bottle-deep
    depthColor: '#010A06',
    titleColor: '#F7F4E9',
    edges: { top: 1, right: 1, bottom: 0, left: 1 },
    scattered: { x: -30, y: 270, rot: -16 },
    arrivalThreshold: 0.86,
  },
  {
    id: 'rabbit-holes',
    row: 1,
    col: 2,
    title: 'Rabbit holes',
    category: 'Rabbit Holes',
    blurb: 'Random ideas worth exploring because... well, why not?',
    bgColor: '#CBDA46', // --color-wattle
    depthColor: '#9CAD24',
    titleColor: '#093624',
    edges: { top: -1, right: 0, bottom: 0, left: -1 },
    scattered: { x: 250, y: 230, rot: 24 },
    arrivalThreshold: 0.94,
  },
];

// Reference dimensions of a single piece cell in viewBox units
const PIECE_WIDTH = 320;
const PIECE_HEIGHT = 240;

export const PodcastMicTopics: React.FC<PodcastMicTopicsProps> = ({
  selectedCategory,
  onSelectCategory,
  onPressPlay,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const puzzleWrapRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activePopover, setActivePopover] = useState<number | null>(null);
  const [assembledPieces, setAssembledPieces] = useState<boolean[]>([
    false, false, false, false, false, false
  ]);

  // Pre-generate SVG paths for the 6 interlocking pieces with 3D rounded corners
  const piecePaths = useRef<string[]>(
    PUZZLE_PIECES.map((piece) =>
      generatePuzzlePiecePath(
        PIECE_WIDTH,
        PIECE_HEIGHT,
        piece.edges,
        piece.row,
        piece.col,
        28, // tabDepthX for vertical seams
        26  // tabDepthY for horizontal seams
      )
    )
  ).current;

  // Detect mobile screen for responsive offset adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Close active popover on window click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest('.puzzle-piece-interactive')) {
        setActivePopover(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // GSAP ScrollTrigger timeline setup
  useEffect(() => {
    if (reducedMotion) {
      setAssembledPieces([true, true, true, true, true, true]);
      return;
    }

    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isSmallScreen = window.innerWidth < 768;
      const scatterMultiplier = isSmallScreen ? 0.55 : 1.0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isSmallScreen ? '+=180%' : '+=220%',
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            setAssembledPieces(
              PUZZLE_PIECES.map((piece) => prog >= piece.arrivalThreshold)
            );

            setActivePopover((currentActive) => {
              if (currentActive !== null && prog < PUZZLE_PIECES[currentActive].arrivalThreshold) {
                return null;
              }
              return currentActive;
            });
          },
        },
      });

      // Animate each piece from scattered off-position into locked grid
      PUZZLE_PIECES.forEach((piece, idx) => {
        const el = pieceRefs.current[idx];
        if (!el) return;

        const startX = piece.scattered.x * scatterMultiplier;
        const startY = piece.scattered.y * scatterMultiplier;
        const startRot = piece.scattered.rot;

        const tStart = 0.05 + idx * 0.07;
        const tArrival = piece.arrivalThreshold;
        const durationTotal = Math.max(0.2, tArrival - tStart);
        const durationMove = durationTotal * 0.85;
        const durationSnap = durationTotal * 0.15;

        // Phase 1: Move from scattered to slight overshoot
        tl.fromTo(
          el,
          {
            x: startX,
            y: startY,
            rotation: startRot,
            scale: 0.92,
            opacity: 0.85,
          },
          {
            x: -startX * 0.04,
            y: -startY * 0.04,
            rotation: -startRot * 0.05,
            scale: 1.02,
            opacity: 1,
            duration: durationMove,
            ease: 'power2.out',
          },
          tStart
        );

        // Phase 2: Snap firmly into locked grid position
        tl.to(
          el,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: durationSnap,
            ease: 'back.out(2)',
          },
          tStart + durationMove
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="podcast-topics-section"
      className="relative w-full min-h-[100vh] min-h-[100dvh] bg-[#F7F4E9] text-[#093624] notebook-grid-bg border-b border-[#093624]/10 select-none overflow-visible z-20"
    >
      {/* Viewport Container (100% vh with generous vertical breathing room for hover drawers) */}
      <div className="w-full min-h-[100vh] min-h-[100dvh] flex flex-col justify-between pt-8 sm:pt-10 md:pt-12 pb-24 sm:pb-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header: Headline only, subheading removed */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 shrink-0">
          <div className="flex justify-center mb-2 pointer-events-none">
            <Tape className="w-20 sm:w-24 h-5" color="#CBDA46" />
          </div>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#093624] tracking-tight">
            What’s on the mic
          </h2>
        </div>

        {/* 2-Row x 3-Column Jigsaw Puzzle Stage */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-auto py-4 sm:py-6 md:py-8">
          <div
            ref={puzzleWrapRef}
            className="relative w-full aspect-[16/11] sm:aspect-[16/9.5] md:aspect-[16/8.8] min-h-[250px] sm:min-h-[320px] md:min-h-[380px] max-h-[460px] mx-auto"
          >
            {PUZZLE_PIECES.map((piece, idx) => {
              const isAssembled = assembledPieces[idx];
              const isPopoverOpen = activePopover === idx;
              const isSelected = selectedCategory === piece.category;

              // Grid position percentages
              const leftPercent = piece.col * 33.333333;
              const topPercent = piece.row * 50;

              // Alignment for popover caret so it stays within container bounds
              const popoverAlignClass =
                piece.col === 0
                  ? 'left-0 sm:left-1/2 sm:-translate-x-1/2'
                  : piece.col === 2
                  ? 'right-0 sm:left-1/2 sm:-translate-x-1/2'
                  : 'left-1/2 -translate-x-1/2';

              const caretAlignClass =
                piece.col === 0
                  ? 'left-10 sm:left-1/2 sm:-translate-x-1/2'
                  : piece.col === 2
                  ? 'right-10 sm:left-1/2 sm:-translate-x-1/2'
                  : 'left-1/2 -translate-x-1/2';

              return (
                <div
                  key={piece.id}
                  ref={(el) => {
                    pieceRefs.current[idx] = el;
                  }}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    width: '33.333333%',
                    height: '50%',
                    zIndex: isPopoverOpen ? 50 : isSelected ? 20 : piece.row * 3 + piece.col + 5,
                  }}
                  className={`puzzle-piece-interactive transition-shadow duration-200 ${
                    isAssembled
                      ? 'cursor-pointer'
                      : 'cursor-default pointer-events-none'
                  }`}
                  onMouseEnter={() => {
                    if (isAssembled) {
                      setActivePopover(idx);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isAssembled) {
                      setActivePopover(null);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAssembled) {
                      setActivePopover((prev) => (prev === idx ? null : idx));
                      onSelectCategory(piece.category);
                    }
                  }}
                >
                  {/* SVG Jigsaw Puzzle Piece Path with 3D Depth Extrusion */}
                  <svg
                    viewBox={`0 0 ${PIECE_WIDTH} ${PIECE_HEIGHT}`}
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-[0_4px_10px_rgba(9,54,36,0.14)]"
                    preserveAspectRatio="none"
                  >
                    {/* 3D Depth Extrusion Rim (shifted down by 7px) */}
                    <path
                      d={piecePaths[idx]}
                      transform="translate(0, 7)"
                      fill={piece.depthColor}
                      stroke="#093624"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Main Piece Face */}
                    <path
                      d={piecePaths[idx]}
                      fill={piece.bgColor}
                      stroke={isPopoverOpen || isSelected ? '#CBDA46' : '#093624'}
                      strokeWidth={isPopoverOpen || isSelected ? '3.5' : '2.5'}
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      className={`pointer-events-auto transition-all duration-200 ${
                        isAssembled
                          ? 'hover:brightness-105'
                          : ''
                      }`}
                    />
                  </svg>

                  {/* Puzzle Piece Face Content: Title Only (Uppercase, Bold, Display) */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-6 text-center pointer-events-none">
                    <h3
                      className="font-display font-black text-xs sm:text-base md:text-lg lg:text-xl uppercase tracking-tight leading-tight sm:leading-snug max-w-[85%]"
                      style={{ color: piece.titleColor }}
                    >
                      {piece.title}
                    </h3>
                  </div>

                  {/* Popover on Hover/Tap: Strategically placed OUTSIDE the puzzle to avoid overlapping neighboring pieces */}
                  {isAssembled && isPopoverOpen && (
                    <div
                      className={`absolute ${popoverAlignClass} ${
                        piece.row === 0
                          ? 'bottom-[calc(100%+14px)]'
                          : 'top-[calc(100%+14px)]'
                      } w-64 sm:w-72 md:w-80 p-4 rounded-xl bg-[#F7F4E9] border-2 border-[#093624] shadow-2xl shadow-[#093624]/20 z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-150`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Triangle Pointer Caret pointing directly into the active piece */}
                      <div
                        className={`absolute ${caretAlignClass} ${
                          piece.row === 0
                            ? '-bottom-2 border-b-2 border-r-2'
                            : '-top-2 border-t-2 border-l-2'
                        } w-3.5 h-3.5 rotate-45 bg-[#F7F4E9] border-[#093624]`}
                      />

                      {/* Explicit Piece Title Badge */}
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#093624]/15">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                          style={{
                            backgroundColor: piece.bgColor,
                            border: '1.5px solid #093624',
                          }}
                        />
                        <span className="font-display font-black text-xs uppercase tracking-wider text-[#093624] truncate">
                          {piece.title}
                        </span>
                      </div>

                      {/* Text Body */}
                      <p className="font-sans text-xs sm:text-sm text-[#093624]/90 font-medium leading-relaxed">
                        {piece.blurb}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Bottom Spacer */}
        <div className="h-4 sm:h-6" />

      </div>
    </section>
  );
};

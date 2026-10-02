import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { 
  PaperClip, 
  Tape, 
  WrenLogo 
} from './ScrapbookAssets';
import { RealisticWrenBird } from './RealisticWrenBird';

// Images
import judithPortrait from '../assets/images/judith-portrait.jpg';
import judithHoverPhoto from '../assets/images/community/founder-note-polaroid.webp';

// Community / Give Back Photos exactly matching image layout:
// Left top: two small kids; Left bottom: children class standing; Right top: youth tech workshop; Right bottom: two girls laptop
import imgTwoSmallGirls from '../assets/images/giveback/giveback-two-small-girls.webp';
import imgChildrenClassStand from '../assets/images/giveback/giveback-children-class-stand.webp';
import imgYouthTechWorkshop from '../assets/images/giveback/giveback-youth-tech-workshop.webp';
import imgTwoGirlsLaptop from '../assets/images/giveback/giveback-two-girls-laptop.webp';

interface AboutPageProps {
  onOpenBooking?: () => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigate?: (page: any, sectionId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onOpenBooking, 
  onNavigateHome,
  onNavigate 
}) => {
  // Photo toggle for Judith card
  const [photoView, setPhotoView] = useState<'front' | 'hover'>('front');
  const [isHovered, setIsHovered] = useState(false);

  // Animated Wren bird flight & realistic kinematics
  const [isBirdFlying, setIsBirdFlying] = useState(false);
  const [flightPhase, setFlightPhase] = useState<'perched' | 'takeoff' | 'swoop' | 'hover' | 'landing'>('perched');
  const [wingPhase, setWingPhase] = useState(0);
  const [headBop, setHeadBop] = useState(0);

  // Smooth continuous flight coordinates (percentage/pixel offset across card)
  const [birdPos, setBirdPos] = useState({ x: 34, y: -26, rot: 0, scale: 1 });

  // Wing-dust particle trail behind the bird
  interface WingParticle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    vx: number;
    vy: number;
  }
  const [particles, setParticles] = useState<WingParticle[]>([]);
  const nextParticleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);

  const rafRef = useRef<number | null>(null);
  const flightStartRef = useRef<number | null>(null);

  // Continuous organic head-bobbing when perched
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const updatePerchedBop = (time: number) => {
      if (!isBirdFlying) {
        // Natural bird head twitches and gentle breathing bop
        const elapsed = (time - startTime) / 1000;
        // Periodic quick look/bop twitch every ~1.8 seconds with small micro-jitters
        const cycle = elapsed % 2.2;
        let bop = 0;
        if (cycle < 0.25) {
          bop = Math.sin((cycle / 0.25) * Math.PI);
        } else if (cycle > 1.2 && cycle < 1.45) {
          bop = -Math.sin(((cycle - 1.2) / 0.25) * Math.PI) * 0.7;
        } else {
          bop = Math.sin(elapsed * 2.5) * 0.15;
        }
        setHeadBop(bop);
        setWingPhase(0);
      }
      animId = requestAnimationFrame(updatePerchedBop);
    };

    animId = requestAnimationFrame(updatePerchedBop);
    return () => cancelAnimationFrame(animId);
  }, [isBirdFlying]);

  // Smooth realistic flight physics trajectory & wing flapping via requestAnimationFrame
  const triggerBirdFlight = () => {
    if (isBirdFlying) return;
    setIsBirdFlying(true);

    const totalDuration = 3600; // 3.6s natural flight
    flightStartRef.current = performance.now();

    const animateFlight = (now: number) => {
      if (!flightStartRef.current) return;
      const progress = Math.min((now - flightStartRef.current) / totalDuration, 1);

      // Rapid natural wing flap oscillation (12 to 16 flaps per sec)
      // Glide intervals during swoop
      const isGliding = progress > 0.42 && progress < 0.62;
      if (!isGliding && progress < 0.95) {
        setWingPhase((now / 65) % 1);
      } else {
        setWingPhase(0); // Hold wings spread/tucked during glide
      }

      // Smooth Bezier-like curvilinear flight path:
      // Start perch (34, -26) -> launch up-right -> swoop high above card -> arc around -> gentle landing glide back to perch
      let x = 34;
      let y = -26;
      let rot = 0;
      let scale = 1;

      if (progress < 0.2) {
        // Takeoff spring
        const p = progress / 0.2;
        setFlightPhase('takeoff');
        x = 34 + p * 60;
        y = -26 - Math.sin(p * Math.PI * 0.5) * 60;
        rot = -16 * (1 - p * 0.3);
        scale = 1 + p * 0.2;
      } else if (progress < 0.55) {
        // High swoop arc
        const p = (progress - 0.2) / 0.35;
        setFlightPhase('swoop');
        x = 94 + Math.sin(p * Math.PI) * 200;
        y = -86 - Math.sin(p * Math.PI) * 45;
        rot = (p - 0.5) * 26; // Tilt bank into curve
        scale = 1.2;
      } else if (progress < 0.8) {
        // Hover and circle back
        const p = (progress - 0.55) / 0.25;
        setFlightPhase('hover');
        x = 294 - p * 190;
        y = -95 + p * 40;
        rot = -10 + Math.sin(p * Math.PI * 2) * 8;
        scale = 1.15 - p * 0.08;
      } else {
        // Glide and soft touch down on rim
        const p = (progress - 0.8) / 0.2;
        setFlightPhase('landing');
        x = 104 - p * 70;
        y = -55 + p * 29;
        rot = -6 * (1 - p);
        scale = 1.07 - p * 0.07;
      }

      setBirdPos({ x, y, rot, scale });

      // Spawn faint, organic 'wing-dust' particles behind the bird's tail & wings
      if (progress > 0.03 && progress < 0.94) {
        if (now - lastParticleTimeRef.current > 45) { // Spawn every ~45ms
          lastParticleTimeRef.current = now;
          const colors = ['#CBDA46', '#EEF2CC', '#F7F4E9', '#A3C2A3'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          const angleRad = (rot * Math.PI) / 180;
          // Emitter position slightly behind the bird's wings and tail
          const emitterOffsetX = -18 * Math.cos(angleRad) + (Math.random() - 0.5) * 14;
          const emitterOffsetY = -18 * Math.sin(angleRad) + 26 + (Math.random() - 0.5) * 10;

          const newParticle: WingParticle = {
            id: nextParticleIdRef.current++,
            x: x + 26 + emitterOffsetX,
            y: y + emitterOffsetY,
            size: 3.2 + Math.random() * 4.5,
            color: randomColor,
            opacity: 0.65 + Math.random() * 0.25,
            vx: -Math.cos(angleRad) * (0.4 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.4,
            vy: 0.25 + Math.random() * 0.45 // Drifts gently downward like micro-feathers / dust
          };

          setParticles(prev => [...prev.slice(-28), newParticle]);
        }
      }

      // Update existing particles (drift and fade out)
      setParticles(prev => 
        prev
          .map(pt => ({
            ...pt,
            x: pt.x + pt.vx,
            y: pt.y + pt.vy,
            opacity: pt.opacity - 0.024,
            size: Math.max(0.5, pt.size * 0.98)
          }))
          .filter(pt => pt.opacity > 0.02)
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateFlight);
      } else {
        // Return fully to resting state
        setFlightPhase('perched');
        setIsBirdFlying(false);
        setBirdPos({ x: 34, y: -26, rot: 0, scale: 1 });
        setWingPhase(0);
        // Fade out remaining dust
        setTimeout(() => setParticles([]), 700);
      }
    };

    rafRef.current = requestAnimationFrame(animateFlight);
  };

  // Occasional automated flight every 22 seconds
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      triggerBirdFlight();
    }, 2800);

    const interval = setInterval(() => {
      triggerBirdFlight();
    }, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activePhoto = photoView === 'hover' || isHovered ? judithHoverPhoto : judithPortrait;

  return (
    <div className="w-full bg-[#FAF7EE] text-[#093624] selection:bg-[#CBDA46] selection:text-[#093624]">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO — "Who the heck are we?"                                  */}
      {/* Cream Checked Grid Background                                             */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#093624]/10 bg-[#FAF7EE] overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9, 54, 36, 0.065) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(9, 54, 36, 0.065) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '28px 28px'
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Main Headline */}
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.1]">
            Who the heck are we?
          </h1>

          {/* Subtext 1 */}
          <p className="font-serif italic text-lg sm:text-xl text-[#093624]/85">
            Well, well, well....
          </p>

          {/* Subtext 2 */}
          <p className="font-sans text-lg sm:text-xl text-[#093624] max-w-2xl mx-auto leading-relaxed">
            The short answer is that <strong className="font-bold text-[#093624]">Wren is a GTM and marketing studio.</strong>
          </p>

          {/* Subtext 3 */}
          <p className="font-sans text-base sm:text-lg text-[#54605a] max-w-2xl mx-auto leading-relaxed">
            Right now, it's me, a growing network of very good people, and one slightly unreasonable obsession: helping B2B businesses generate more demand than they can handle.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MEET JUDITH                                                    */}
      {/* ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7EE] border-b border-[#093624]/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Polaroid / Scrapbook Photo Card of Judith */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative group w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Paperclip on top-left edge */}
              <div className="absolute -top-3.5 left-6 z-30 pointer-events-none drop-shadow-xs">
                <PaperClip className="w-5 h-11 text-[#64748B]" />
              </div>

              {/* Lime Washi Tape across top-center */}
              <div 
                className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-1 w-28 sm:w-32 h-6 -top-3 left-24 sm:left-28 bg-[rgba(203,218,70,0.92)]"
                style={{
                  clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                }}
              />

              {/* Main Polaroid Frame (Soft warm yellow-cream tint matching screenshot) */}
              <div 
                className="relative z-10 bg-[#FFF7BA] border-2 border-[#EAD585] rounded-2xl p-4 sm:p-5 shadow-[0_8px_20px_rgba(9,54,36,0.06)] transition-all"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#093624] border border-[#093624]/15 shadow-inner">
                  <img 
                    src={activePhoto} 
                    alt={isHovered || photoView === 'hover' ? 'Judith in action' : 'Judith · founder of Wren'} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />

                  {/* Top-right "Change Photos" badge matching screenshot */}
                  <div className="absolute top-2.5 right-2.5 bg-[#093624]/85 backdrop-blur-xs text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 pointer-events-none shadow-xs">
                    <span>📷</span>
                    <span className="font-sans font-semibold text-[11px]">Change Photos</span>
                  </div>
                </div>

                {/* Hand-written Label below photo (fits cleanly, handwritten font, swaps on hover) */}
                <div className="mt-3.5 pt-1.5 flex items-center justify-between">
                  <span className="font-hand text-base sm:text-lg text-[#093624] font-medium tracking-normal leading-tight">
                    {isHovered || photoView === 'hover' ? 'Judith in action' : 'Judith · founder of Wren'}
                  </span>
                  <span className="font-hand text-xs sm:text-sm text-[#7D8872] select-none">
                    hover to reveal
                  </span>
                </div>

              </div>

            </div>

            {/* Photo controls toolbar below card exactly like screenshot */}
            <div className="mt-4 flex items-center gap-1.5 p-1 bg-white border border-[#093624]/15 rounded-lg shadow-xs">
              <button
                type="button"
                className="px-2.5 py-1 text-xs font-sans font-semibold rounded-md bg-[#093624] text-white flex items-center gap-1.5 shadow-xs cursor-default"
              >
                <span>📷</span>
                <span>Change Photos</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPhotoView('front')}
                className={`px-2 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                  photoView === 'front' 
                    ? 'bg-[#F7F4E9] text-[#093624] border-[#093624]/40 font-bold' 
                    : 'bg-white text-[#54605a] border-[#093624]/15 hover:border-[#093624]/30'
                }`}
              >
                <span>↑</span>
                <span>Front</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoView('hover')}
                className={`px-2 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                  photoView === 'hover' 
                    ? 'bg-[#F7F4E9] text-[#093624] border-[#093624]/40 font-bold' 
                    : 'bg-white text-[#54605a] border-[#093624]/15 hover:border-[#093624]/30'
                }`}
              >
                <span>↑</span>
                <span>Hover</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoView('front')}
                className="px-2 py-1 text-xs font-mono rounded-md border border-[#093624]/15 bg-white text-[#54605a] hover:border-[#093624]/30 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>👁</span>
                <span>Front</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Meet Judith Narrative (No italicized text) */}
          <div className="lg:col-span-7 space-y-5 pt-2">
            
            {/* Header with Orange Heart */}
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#093624] flex items-center gap-2.5">
              <span>Meet Judith</span>
              <span className="text-[#F5A621] text-2xl sm:text-3xl">🧡</span>
            </h2>

            {/* Accent statement */}
            <p className="font-serif font-bold text-xl sm:text-2xl text-[#093624] tracking-tight">
              Wren was born out of pure pain.
            </p>

            {/* Narrative Paragraphs (without italics) */}
            <div className="font-sans text-base sm:text-[17px] text-[#54605a] space-y-4 leading-relaxed">
              <p>
                After years of helping founders grow their products and make some cool cash, I kept noticing the same thing, which is that for lean B2B businesses, the founder is often already the most trusted person in the room.
              </p>

              <p>
                They have the expertise, probably have a great story, and also have the credibility.
              </p>

              <p className="font-medium text-[#093624]">
                So why not use that?
              </p>

              <p>
                I realised one of the simplest ways to help a lean team go to market is to turn the founder's presence into an actual GTM engine.
              </p>

              <p>
                Which will help build the company's reputation, create demand, build meaningful enterprise relationships, and make them really cool cash,
              </p>

              <p className="font-sans font-medium text-[#15543D] text-base sm:text-[17px]">
                It's a strategy with no loss when you look at it.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WE DON'T HOLD BACK (Community & Give Back) — Dark Green        */}
      {/* ========================================================================= */}
      <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#093624] text-[#F7F4E9] notebook-grid-dark overflow-hidden">
        
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#15543D]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              We don't hold back
            </h2>
            <p className="font-hand text-xl sm:text-2xl text-[#CBDA46] mt-2">
              our heart outside the studio ♥
            </p>
          </div>

          {/* 3-Column Layout: Left Photos | Center Narrative | Right Photos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: 2 Stacked Photo Polaroids */}
            <div className="lg:col-span-3 space-y-6 flex flex-col items-center">
              
              {/* Photo 1: Two Small Girls */}
              <div className="relative group w-full max-w-[260px]">
                {/* Hand-drawn heart doodle top left */}
                <div className="absolute -top-3 -left-3 text-[#F5A621] text-xl z-20 pointer-events-none">
                  🧡
                </div>
                <div className="p-2 sm:p-2.5 bg-white rounded-xl shadow-md -rotate-2 group-hover:rotate-0 transition-transform">
                  <img 
                    src={imgTwoSmallGirls} 
                    alt="Community children smiling" 
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Photo 2: Children class stand */}
              <div className="relative group w-full max-w-[260px]">
                {/* Hand-drawn heart doodle bottom left */}
                <div className="absolute -bottom-3 -left-3 text-[#CBDA46] text-xl z-20 pointer-events-none">
                  💚
                </div>
                <div className="p-2 sm:p-2.5 bg-white rounded-xl shadow-md rotate-2 group-hover:rotate-0 transition-transform">
                  <img 
                    src={imgChildrenClassStand} 
                    alt="School class standing together" 
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
              </div>

            </div>

            {/* CENTER COLUMN: Core Text Narrative */}
            <div className="lg:col-span-6 text-center px-2 sm:px-6 space-y-5">
              
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#CBDA46] leading-snug">
                At the core of Wren is community and support.
              </h3>

              <div className="font-sans text-sm sm:text-base text-[#D5E3D5] space-y-4 leading-relaxed">
                <p>
                  Outside of Wren, I stay connected with orphanages across Africa, supporting children with their education. I also champion Pad a Girl, a tentative programme focused on providing sanitary pads to young girls in rural African communities.
                </p>

                <p>
                  By the side, I'm also leading the growth of iSoar, a non-governmental organization focused on introducing leadership and tech skills in the remote areas of Africa and Asia.
                </p>

                <p className="text-white font-medium">
                  It's something I've cared about personally for a long time.
                </p>

                <p className="text-[#CBDA46] font-serif italic text-base sm:text-lg">
                  And as Wren grows, I'd love for the business to do more of it.
                </p>
              </div>

            </div>

            {/* RIGHT COLUMN: 2 Stacked Photo Polaroids */}
            <div className="lg:col-span-3 space-y-6 flex flex-col items-center">
              
              {/* Photo 3: Youth Tech Workshop */}
              <div className="relative group w-full max-w-[260px]">
                {/* Hand-drawn heart doodle top right */}
                <div className="absolute -top-3 -right-3 text-[#CBDA46] text-xl z-20 pointer-events-none">
                  💚
                </div>
                <div className="p-2 sm:p-2.5 bg-white rounded-xl shadow-md rotate-2 group-hover:rotate-0 transition-transform">
                  <img 
                    src={imgYouthTechWorkshop} 
                    alt="Youth learning tech skills" 
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Photo 4: Two Girls Laptop */}
              <div className="relative group w-full max-w-[260px]">
                {/* Hand-drawn heart doodle bottom right */}
                <div className="absolute -bottom-3 -right-3 text-[#F5A621] text-xl z-20 pointer-events-none">
                  🧡
                </div>
                <div className="p-2 sm:p-2.5 bg-white rounded-xl shadow-md -rotate-2 group-hover:rotate-0 transition-transform">
                  <img 
                    src={imgTwoGirlsLaptop} 
                    alt="Girls coding on laptops" 
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: YES, WE'VE BUILT SOME REALLY COOL STUFF ;)                     */}
      {/* Centered Scrapbook Card with Wren Bird & Tape                             */}
      {/* ========================================================================= */}
      <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7EE] border-b border-[#093624]/10 notebook-grid">
        <div className="max-w-2xl mx-auto relative">
          
          {/* Faint fading 'wing-dust' particle trail behind flying bird */}
          {particles.length > 0 && (
            <div className="absolute inset-0 pointer-events-none z-25 overflow-visible" aria-hidden="true">
              {particles.map(pt => (
                <div
                  key={pt.id}
                  className="absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${pt.x}px`,
                    top: `${pt.y}px`,
                    width: `${pt.size}px`,
                    height: `${pt.size}px`,
                    backgroundColor: pt.color,
                    opacity: pt.opacity,
                    filter: 'blur(0.6px)',
                    boxShadow: `0 0 ${pt.size * 1.5}px ${pt.color}`,
                    transition: 'opacity 50ms linear, transform 50ms linear'
                  }}
                />
              ))}
            </div>
          )}

          {/* Wren Bird perched on the card rim with natural head bop, wing flapping, and physics flight (NO speech bubble text) */}
          <div 
            onClick={triggerBirdFlight}
            title="Click me to fly!"
            className="absolute z-30 cursor-pointer select-none"
            style={{
              top: `${birdPos.y}px`,
              left: `${birdPos.x}px`,
              transform: `scale(${birdPos.scale}) rotate(${birdPos.rot}deg)`,
              transformOrigin: '40px 65px',
              willChange: 'transform, top, left',
              transition: isBirdFlying ? 'none' : 'top 300ms ease, left 300ms ease, transform 300ms ease'
            }}
          >
            {/* Realistic Wren Bird illustration matching Image 2 with animated wings and head */}
            <div className="w-13 h-13 sm:w-15 sm:h-15 drop-shadow-[0_4px_6px_rgba(9,54,36,0.18)] hover:scale-105 transition-transform">
              <RealisticWrenBird 
                className="w-full h-full" 
                isFlying={isBirdFlying}
                wingPhase={wingPhase}
                headBop={headBop}
              />
            </div>
          </div>

          {/* Top-Right Wattle Tape */}
          <div 
            className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-12 w-24 h-6 -top-3 right-6 sm:right-10 bg-[rgba(203,218,70,0.92)]"
            style={{
              clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
            }}
          />

          {/* Hand-drawn offset shadow */}
          <div 
            className="absolute inset-0 translate-x-2 translate-y-3 bg-[#093624]/20"
            style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
          />

          {/* Main Rounded Card */}
          <div 
            className="relative z-10 bg-white/95 border-2 border-[#093624] p-8 sm:p-12 text-center shadow-xs"
            style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
          >
            {/* Headline */}
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
              Yes, yes, we've built some really cool stuff ;)
            </h3>

            {/* Narrative */}
            <p className="font-sans text-sm sm:text-base text-[#093624] font-medium leading-relaxed mb-2">
              We like building things almost as much as we like helping businesses grow.
            </p>

            <p className="font-sans font-bold text-sm sm:text-base text-[#093624] mb-3">
              So, before you hire us, go steal something useful from us first.
            </p>

            <p className="font-sans text-sm sm:text-[15px] text-[#54605a] leading-relaxed max-w-lg mx-auto mb-8">
              We've built free tools and playbooks to help founders and marketing teams figure things out, try new things, and get moving.
            </p>

            {/* Dotted separator line */}
            <div className="w-full border-t border-dashed border-[#093624]/20 my-6" />

            {/* CTA Link to Launch Checklist / Free Stuff */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('launch-checklist');
                  } else {
                    window.location.hash = '#launch-checklist';
                  }
                }}
                className="font-sans font-bold text-base sm:text-lg text-[#093624] hover:text-[#15543D] transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Start with → The Product Launch Checklist</span>
              </button>

              <p className="font-hand text-sm sm:text-base text-[#6F7A6E]">
                It's 100% free, just go play with it.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: FREE STUFF NOT YOUR THING? TALK TO US (Booking Cal)             */}
      {/* ========================================================================= */}
      <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#093624] text-[#F7F4E9] notebook-grid-dark overflow-hidden">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Free stuff not your thing?
            </h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="font-hand text-2xl sm:text-3xl text-[#CBDA46] -rotate-2">
                Fair enough.
              </span>
              <span className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Talk to us
              </span>
            </div>
          </div>

          {/* Embedded Calendar Card with Paper Clip & Live Zcal Iframe */}
          <div className="relative group max-w-2xl mx-auto">
            
            {/* Scrapbook Paperclip Accent on Top-Left */}
            <div className="absolute -top-4 left-8 z-30 pointer-events-none drop-shadow-xs">
              <PaperClip className="w-5 h-11 text-[#94A3B8]" />
            </div>

            {/* Hand-drawn offset shadow */}
            <div 
              className="absolute inset-0 translate-x-2 translate-y-3 bg-[#04170F]/50 rounded-3xl"
            />

            {/* Main Booking Card Container */}
            <div className="relative z-10 rounded-3xl bg-white text-[#093624] border-2 border-[#093624] shadow-xs overflow-hidden">
              
              {/* Thin Colored Top Accent in Lime */}
              <div className="h-2 w-full bg-[#CBDA46]" />

              {/* Card Header */}
              <div className="px-6 py-4 border-b border-[#093624]/10 bg-[#FAF9F5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#093624] uppercase tracking-wider">
                    Discovery + Audit Call
                  </span>
                </div>

                {/* "Open in Cal ↗" link */}
                <a
                  href="https://zcal.co/i/laZ1QjPs"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#093624] bg-white hover:bg-[#CBDA46] border border-[#093624]/20 px-3 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition-all"
                >
                  <span>Open in Cal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#093624]" />
                </a>
              </div>

              {/* Real Zcal Embed */}
              <div data-lenis-prevent className="w-full bg-white flex flex-col">
                <iframe
                  src="https://zcal.co/i/laZ1QjPs?embed=1"
                  loading="lazy"
                  title="Discovery + Audit Call Booking"
                  className="w-full min-w-full h-[620px] sm:h-[660px] border-0 block"
                />

                {/* Bottom Card Helper Note */}
                <div className="px-4 py-3 bg-[#FAF9F5] border-t border-[#093624]/10 text-center text-[11px] font-mono font-medium text-[#6F7A6E]">
                  🔒 Direct booking powered by zcal · Instant calendar invite sent on confirmation
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;

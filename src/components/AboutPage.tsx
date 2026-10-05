import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { 
  PaperClip, 
  Tape, 
  WrenLogo 
} from './ScrapbookAssets';
import { RealisticWrenBird } from './RealisticWrenBird';

import judithPortrait from '../assets/images/judith-portrait.jpg';
import judithHoverPhoto from '../assets/images/community/founder-note-polaroid.webp';

import imgTwoSmallGirls from '../assets/images/giveback/giveback-two-small-girls.webp';
import imgChildrenClassStand from '../assets/images/giveback/giveback-children-class-stand.webp';
import imgYouthTechWorkshop from '../assets/images/giveback/giveback-youth-tech-workshop.webp';
import imgGirlReadingClass from '../assets/images/giveback/giveback-girl-reading-clas.webp';

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
  const [photoView, setPhotoView] = useState<'front' | 'hover'>('front');
  const [isHovered, setIsHovered] = useState(false);

  const [isBirdFlying, setIsBirdFlying] = useState(false);
  const [flightPhase, setFlightPhase] = useState<'perched' | 'takeoff' | 'swoop' | 'hover' | 'landing'>('perched');
  const [wingPhase, setWingPhase] = useState(0);
  const [headBop, setHeadBop] = useState(0);

  const [birdPos, setBirdPos] = useState({ x: 52, y: -24, rot: 0, scale: 1 });

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

  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const updatePerchedBop = (time: number) => {
      if (!isBirdFlying) {
        const elapsed = (time - startTime) / 1000;
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

  const triggerBirdFlight = () => {
    if (isBirdFlying) return;
    setIsBirdFlying(true);

    const totalDuration = 3600;
    flightStartRef.current = performance.now();

    const animateFlight = (now: number) => {
      if (!flightStartRef.current) return;
      const progress = Math.min((now - flightStartRef.current) / totalDuration, 1);

      const isGliding = progress > 0.42 && progress < 0.62;
      if (!isGliding && progress < 0.95) {
        setWingPhase((now / 65) % 1);
      } else {
        setWingPhase(0);
      }

      let x = 52;
      let y = -24;
      let rot = 0;
      let scale = 1;

      if (progress < 0.2) {
        const p = progress / 0.2;
        setFlightPhase('takeoff');
        x = 52 + p * 60;
        y = -24 - Math.sin(p * Math.PI * 0.5) * 60;
        rot = -16 * (1 - p * 0.3);
        scale = 1 + p * 0.2;
      } else if (progress < 0.55) {
        const p = (progress - 0.2) / 0.35;
        setFlightPhase('swoop');
        x = 112 + Math.sin(p * Math.PI) * 200;
        y = -84 - Math.sin(p * Math.PI) * 45;
        rot = (p - 0.5) * 26;
        scale = 1.2;
      } else if (progress < 0.8) {
        const p = (progress - 0.55) / 0.25;
        setFlightPhase('hover');
        x = 312 - p * 190;
        y = -95 + p * 40;
        rot = -10 + Math.sin(p * Math.PI * 2) * 8;
        scale = 1.15 - p * 0.08;
      } else {
        const p = (progress - 0.8) / 0.2;
        setFlightPhase('landing');
        x = 122 - p * 70;
        y = -55 + p * 31;
        rot = -6 * (1 - p);
        scale = 1.07 - p * 0.07;
      }

      setBirdPos({ x, y, rot, scale });

      if (progress > 0.03 && progress < 0.94) {
        if (now - lastParticleTimeRef.current > 45) {
          lastParticleTimeRef.current = now;
          const colors = ['#CBDA46', '#EEF2CC', '#F7F4E9', '#A3C2A3'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          const angleRad = (rot * Math.PI) / 180;
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
            vy: 0.25 + Math.random() * 0.45
          };

          setParticles(prev => [...prev.slice(-28), newParticle]);
        }
      }

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
        setFlightPhase('perched');
        setIsBirdFlying(false);
        setBirdPos({ x: 52, y: -24, rot: 0, scale: 1 });
        setWingPhase(0);
        setTimeout(() => setParticles([]), 700);
      }
    };

    rafRef.current = requestAnimationFrame(animateFlight);
  };

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

  const isRevealed = photoView === 'hover' || isHovered;
  const activePhoto = isRevealed ? judithPortrait : judithHoverPhoto;

  return (
    <div className="w-full bg-[#FAF7EE] text-[#093624] selection:bg-[#CBDA46] selection:text-[#093624]">
      
      <section 
        className="relative w-full min-h-[80vh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#093624]/10 bg-[#FAF7EE] overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9, 54, 36, 0.065) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(9, 54, 36, 0.065) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '28px 28px'
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 w-full">
          
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.1]">
            Who the heck are we?
          </h1>

          <p className="font-serif not-italic text-lg sm:text-xl text-[#093624]/85">
            Well, well, well....
          </p>

          <p className="font-sans text-lg sm:text-xl text-[#093624] max-w-2xl mx-auto leading-relaxed">
            The short answer is that <strong className="font-bold text-[#093624]">Wren is a GTM and marketing studio.</strong>
          </p>

          <p className="font-sans text-base sm:text-lg text-[#54605a] max-w-2xl mx-auto leading-relaxed">
            Right now, it's me, a growing network of very good people, and one slightly unreasonable obsession: helping B2B businesses generate more demand than they can handle.
          </p>

        </div>
      </section>

      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7EE] border-b border-[#093624]/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative group w-full max-w-[340px] sm:max-w-[370px]">
              
              <div className="absolute -top-3.5 left-6 z-30 pointer-events-none drop-shadow-xs">
                <PaperClip className="w-5 h-11 text-[#64748B]" />
              </div>

              <div 
                className={`absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs -rotate-1 w-28 sm:w-32 h-6 -top-3 left-24 sm:left-28 transition-colors duration-300 ${
                  isRevealed ? 'bg-[rgba(232,122,86,0.92)]' : 'bg-[rgba(203,218,70,0.92)]'
                }`}
                style={{
                  clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
                }}
              />

              <div 
                className={`relative z-10 border-2 rounded-2xl p-4 sm:p-5 shadow-[0_8px_20px_rgba(9,54,36,0.06)] transition-all duration-300 cursor-pointer ${
                  isRevealed 
                    ? 'bg-[#FFE8D6] border-[#F4C1A5]' 
                    : 'bg-[#FFF7BA] border-[#EAD585]'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setPhotoView(prev => prev === 'hover' ? 'front' : 'hover')}
                title="Hover or click to reveal alternate photo"
              >
                
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#093624] border border-[#093624]/15 shadow-inner">
                  <img 
                    src={activePhoto} 
                    alt={isRevealed ? 'Workmode Activated' : 'Founder of Wren'} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />

                  <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-xs text-white/90 text-[11px] font-sans font-['Inter',sans-serif] font-medium px-2.5 py-1 rounded-md pointer-events-none shadow-xs select-none">
                    hover to reveal
                  </div>
                </div>

                <div className="mt-2.5 pt-1">
                  <span className="font-hand text-xs sm:text-sm text-[#093624] font-medium tracking-normal leading-tight">
                    {isRevealed ? 'Workmode Activated' : 'Founder of Wren'}
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="lg:col-span-7 space-y-5 pt-2">
            
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#093624] flex items-center gap-2.5">
              <span>Meet Judith</span>
              <span className="text-[#F5A621] text-2xl sm:text-3xl">🧡</span>
            </h2>

            <p className="font-serif font-bold text-xl sm:text-2xl text-[#093624] tracking-tight">
              Wren was born out of pure pain.
            </p>

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

      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#093624] text-[#F7F4E9] overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#15543D]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto relative z-10">
          
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              We don't hold back
            </h2>
            <p className="font-hand text-xl sm:text-2xl text-[#CBDA46] mt-2 flex items-center justify-center gap-1.5">
              <span>our heart outside the studio</span>
              <span className="text-base sm:text-lg">♥</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
            
            <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-end">
              
              <div className="relative group w-full max-w-[270px] sm:max-w-[285px] lg:max-w-[295px]">
                <div className="absolute -top-3.5 -left-3.5 z-20 pointer-events-none -rotate-12">
                  <svg viewBox="0 0 32 32" className="w-7 h-7 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M16 27 C16 27 3.5 18 3.5 10.5 C3.5 6 7 3.5 11 3.5 C13.8 3.5 15.2 5 16 6.2 C16.8 5 18.2 3.5 21 3.5 C25 3.5 28.5 6 28.5 10.5 C28.5 18 16 27 16 27 Z" 
                      stroke="#E87A56" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#0E3D2A]">
                  <img 
                    src={imgTwoSmallGirls} 
                    alt="Community children smiling" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="relative group w-full max-w-[270px] sm:max-w-[285px] lg:max-w-[295px]">
                <div className="absolute -bottom-3.5 -left-3.5 z-20 pointer-events-none rotate-12">
                  <svg viewBox="0 0 32 32" className="w-7 h-7 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M16 27 C16 27 3.5 18 3.5 10.5 C3.5 6 7 3.5 11 3.5 C13.8 3.5 15.2 5 16 6.2 C16.8 5 18.2 3.5 21 3.5 C25 3.5 28.5 6 28.5 10.5 C28.5 18 16 27 16 27 Z" 
                      stroke="#CBDA46" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#0E3D2A]">
                  <img 
                    src={imgChildrenClassStand} 
                    alt="School class standing together" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

            <div className="lg:col-span-6 text-center px-1 sm:px-4 lg:px-6 flex flex-col items-center">
              
              <div className="w-full max-w-[540px] lg:max-w-[620px] mx-auto space-y-4 sm:space-y-5">
                <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-[21px] xl:text-[23px] text-[#CBDA46] leading-snug tracking-tight lg:whitespace-nowrap mb-2">
                  At the core of Wren is community and support.
                </h3>

                <div className="font-sans text-sm sm:text-base text-[#D5E3D5] space-y-4 sm:space-y-5 leading-relaxed font-normal">
                  <p>
                    Outside of Wren, I stay connected with orphanages across Africa, supporting children with their education. I also champion Pad a Girl, a tentative programme focused on providing sanitary pads to young girls in rural African communities.
                  </p>

                  <p>
                    By the side, I’m also leading the growth of iSoar, a non-governmental organization focused on introducing leadership and tech skills in the remote areas of Africa and Asia.
                  </p>

                  <p>
                    It's something I've cared about personally for a long time.
                  </p>

                  <p>
                    And as Wren grows, I'd love for the business to do more of it.
                  </p>
                </div>
              </div>

            </div>

            <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-start">
              
              <div className="relative group w-full max-w-[270px] sm:max-w-[285px] lg:max-w-[295px]">
                <div className="absolute -top-3.5 -right-3.5 z-20 pointer-events-none rotate-12">
                  <svg viewBox="0 0 32 32" className="w-7 h-7 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M16 27 C16 27 3.5 18 3.5 10.5 C3.5 6 7 3.5 11 3.5 C13.8 3.5 15.2 5 16 6.2 C16.8 5 18.2 3.5 21 3.5 C25 3.5 28.5 6 28.5 10.5 C28.5 18 16 27 16 27 Z" 
                      stroke="#CBDA46" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#0E3D2A]">
                  <img 
                    src={imgYouthTechWorkshop} 
                    alt="Youth learning tech skills" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="relative group w-full max-w-[270px] sm:max-w-[285px] lg:max-w-[295px]">
                <div className="absolute -bottom-3.5 -right-3.5 z-20 pointer-events-none -rotate-12">
                  <svg viewBox="0 0 32 32" className="w-7 h-7 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M16 27 C16 27 3.5 18 3.5 10.5 C3.5 6 7 3.5 11 3.5 C13.8 3.5 15.2 5 16 6.2 C16.8 5 18.2 3.5 21 3.5 C25 3.5 28.5 6 28.5 10.5 C28.5 18 16 27 16 27 Z" 
                      stroke="#E87A56" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#0E3D2A]">
                  <img 
                    src={imgGirlReadingClass} 
                    alt="Girl reading in classroom" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7EE] border-b border-[#093624]/10 notebook-grid overflow-hidden">
        <div className="max-w-xl sm:max-w-2xl mx-auto relative">
          
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
            <div className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-[0_3px_5px_rgba(9,54,36,0.18)] hover:scale-105 transition-transform">
              <RealisticWrenBird 
                className="w-full h-full" 
                isFlying={isBirdFlying}
                wingPhase={wingPhase}
                headBop={headBop}
              />
            </div>
          </div>

          <div className="relative -rotate-[1deg] sm:-rotate-[1.5deg] transition-transform duration-300">
            
            <div 
              className="absolute pointer-events-none z-20 backdrop-blur-xs shadow-xs rotate-[42deg] w-24 sm:w-28 h-6.5 -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 bg-[rgba(203,218,70,0.92)]"
              style={{
                clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 4% 100%, 0% 85%)'
              }}
            />

            <div className="relative z-10 bg-[#EEF6F0] border-2 border-[#093624] rounded-3xl p-8 sm:p-11 md:p-12 text-center shadow-[8px_10px_0px_#093624]">
              
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#093624] tracking-tight mb-4">
                Yes, yes, we've built some really cool stuff ;)
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#093624] font-normal leading-relaxed mb-2.5">
                We like building things almost as much as we like helping businesses grow.
              </p>

              <p className="font-sans font-bold text-sm sm:text-base text-[#093624] leading-relaxed mb-2.5">
                So, before you hire us, go steal something useful from us first.
              </p>

              <p className="font-sans text-sm sm:text-base text-[#093624]/85 leading-relaxed max-w-lg mx-auto">
                We've built free tools and playbooks to help founders and marketing teams figure things out, try new things, and get moving.
              </p>

              <div className="w-full max-w-md mx-auto border-t border-dashed border-[#093624]/20 my-6" />

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
                  className="font-serif font-bold text-sm sm:text-base text-[#093624] hover:text-[#15543D] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Start with → The Product Launch Checklist</span>
                </button>

                <p className="font-hand text-xs sm:text-sm text-[#54605a]">
                  It's 100% free, just go play with it.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#093624] text-[#F7F4E9] notebook-grid-dark overflow-hidden">
        <div className="max-w-4xl mx-auto">
          
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

          <div className="relative group max-w-2xl mx-auto">
            
            <div className="absolute -top-4 left-8 z-30 pointer-events-none drop-shadow-xs">
              <PaperClip className="w-5 h-11 text-[#94A3B8]" />
            </div>

            <div 
              className="absolute inset-0 translate-x-2 translate-y-3 bg-[#04170F]/50 rounded-3xl"
            />

            <div className="relative z-10 rounded-3xl bg-white text-[#093624] border-2 border-[#093624] shadow-xs overflow-hidden">
              
              <div className="h-2 w-full bg-[#CBDA46]" />

              <div className="px-6 py-4 border-b border-[#093624]/10 bg-[#FAF9F5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#093624] uppercase tracking-wider">
                    Discovery + Audit Call
                  </span>
                </div>

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

              <div data-lenis-prevent className="w-full bg-white flex flex-col">
                <iframe
                  src="https://zcal.co/i/laZ1QjPs?embed=1"
                  loading="lazy"
                  title="Discovery + Audit Call Booking"
                  className="w-full min-w-full h-[620px] sm:h-[660px] border-0 block"
                />

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

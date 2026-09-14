import React, { useState } from 'react';
import { Repeat2, Heart, UserPlus, ArrowRight } from 'lucide-react';
import { MarkerUnderline } from './ScrapbookAssets';
import { Button } from './Button';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  headline: string;
  body: string;
  date: string;
  retweets: string | number;
  likes: string | number;
  theme: {
    bg: string;
    headerBg: string;
    text: string;
    roleColor: string;
  };
}

// Festival Wristband / Ribbon Segment Ticker
const FestivalWristbandMarquee: React.FC = () => {
  const items = [
    { tag: "#SYSTEMS", text: "BUILT TO BE USED", color: "bg-[#F59E0B]", textColor: "text-[#093624]" },
    { tag: "#GTM2026", text: "TAKEN TO MARKET", color: "bg-[#CBDA46]", textColor: "text-[#093624]" },
    { tag: "#WREN24", text: "MADE FOR REAL PEOPLE", color: "bg-[#FF5E1E]", textColor: "text-white" },
    { tag: "#FOUNDERS", text: "BUILT WITH FOUNDERS", color: "bg-[#F472B6]", textColor: "text-[#093624]" },
  ];

  return (
    <div className="absolute top-8 sm:top-10 -left-12 -right-12 overflow-hidden pointer-events-none z-0 transform -rotate-1.5 opacity-90 select-none">
      {/* Wristband Shadow */}
      <div className="relative py-2">
        <div 
          className="flex w-[200%] animate-marquee"
          style={{ animationDuration: '60s' }}
        >
          {[...items, ...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-stretch shrink-0 border-y-2 border-[#093624] shadow-[0_3px_6px_rgba(0,0,0,0.12)]">
              
              {/* Colored Ribbon Segment */}
              <div className={`${item.color} ${item.textColor} px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-3`}>
                <span className="text-xs sm:text-sm font-display font-black tracking-wider uppercase opacity-95">
                  {item.tag}
                </span>
                
                <span className="text-xs sm:text-sm font-black opacity-60">
                  —
                </span>

                {/* Little Sunburst / Star Icon like the image */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-spin-slow opacity-80" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1M6.6 17.4l-2.1 2.1m14.9 0l-2.1-2.1M6.6 6.6L4.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                <span className="text-sm sm:text-base md:text-lg font-display font-black tracking-tight whitespace-nowrap">
                  {item.text}
                </span>
              </div>

              {/* Perforated Barcode / Serial Number Tab */}
              <div className="bg-[#FFFDF6] border-x-2 border-dashed border-[#093624]/40 px-3 py-1 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-[#093624]/70 rotate-90 tracking-widest">
                  44816
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TestimonialsProps {
  onOpenBooking?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenBooking }) => {
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});
  const [followedCards, setFollowedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFollow = (id: string) => {
    setFollowedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const testimonials: TestimonialItem[] = [
    {
      id: "test-1",
      name: "Emily H.",
      role: "Founder, B2B Agency",
      headline: "“We got quality leads who become closed leads.”",
      body: "This remains one of the natural forms of inbound we’ve seen in a while. We got quality leads who became closed leads. What I love most is how they positioned me as a thought leader in my space.",
      date: "5/14/26, 10:22 AM",
      retweets: "18",
      likes: "142",
      theme: {
        bg: "bg-[#E3F4EB]",
        headerBg: "bg-[#D0EBDD]",
        text: "text-[#093624]",
        roleColor: "text-[#15543D]",
      }
    },
    {
      id: "test-2",
      name: "Lana M.",
      role: "Founder, B2B Agency",
      headline: "“Successfully booked quality calls for us.”",
      body: "We got good compelling content, and they effectively communicated with prospects and successfully booked quality calls for us. Their communication skills are top-notch.",
      date: "4/22/26, 3:15 PM",
      retweets: "12",
      likes: "98",
      theme: {
        bg: "bg-[#E2F0FD]",
        headerBg: "bg-[#CFE5FA]",
        text: "text-[#0F172A]",
        roleColor: "text-[#1E40AF]",
      }
    },
    {
      id: "test-3",
      name: "Ezekiel A.",
      role: "Founder, AI Tool",
      headline: "“Build quality relationships with prospects through inbound.”",
      body: "They exceeded our expectations and helped build quality relationships with prospects through inbound. Their strategic approach and dedication make them a valuable asset to any business.",
      date: "6/02/26, 11:40 AM",
      retweets: "24",
      likes: "215",
      theme: {
        bg: "bg-[#FFF8E7]",
        headerBg: "bg-[#FEEFC3]",
        text: "text-[#451A03]",
        roleColor: "text-[#B45309]",
      }
    },
    {
      id: "test-4",
      name: "Seth H.",
      role: "Founder, Compliance Tool",
      headline: "“Paid attention to details and went the extra mile.”",
      body: "They gave us quality outputs, paid attention to details, and went the extra mile to deliver outstanding results.",
      date: "5/28/26, 4:08 PM",
      retweets: "15",
      likes: "120",
      theme: {
        bg: "bg-[#FCE4EC]",
        headerBg: "bg-[#FAD0DD]",
        text: "text-[#4A044E]",
        roleColor: "text-[#BE185D]",
      }
    }
  ];

  const scrollToBook = () => {
    const el = document.getElementById('booking-section') || document.getElementById('calendly-booking-section');
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element | string, options?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -20, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="testimonials-section" 
      className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 bg-[#F7F4E9] notebook-grid-bg border-b border-[#093624]/10 relative overflow-hidden select-none"
    >
      {/* Top Festival Wristband Marquee Banner */}
      <FestivalWristbandMarquee />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="relative max-w-3xl mx-auto text-center mb-14 sm:mb-18 mt-8 sm:mt-10">
          
          {/* Top Pill Badge: TESTIMONIALS */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/90 border border-[#093624]/20 shadow-xs mb-4">
            <span className="text-xs font-bold tracking-widest text-[#093624] uppercase font-mono">
              TESTIMONIALS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#093624] tracking-tight leading-[1.15]">
            What they're <span className="relative inline-block px-1">
              saying.
              <MarkerUnderline className="w-full h-3.5 -bottom-2 left-0" color="#CBDA46" />
            </span>
          </h2>
        </div>

        {/* 2x2 Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((card) => {
            const isLiked = likedCards[card.id];
            const isFollowed = followedCards[card.id];

            return (
              <div
                key={card.id}
                id={card.id}
                className={`group relative rounded-2xl ${card.theme.bg} border-2 border-[#093624] shadow-[4px_4px_0px_#093624] hover:shadow-[6px_6px_0px_#093624] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                {/* Retro OS Window Titlebar */}
                <div className={`px-4 py-2.5 ${card.theme.headerBg} border-b-2 border-[#093624] flex items-center justify-between`}>
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] border border-[#093624]/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-[#093624]/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-[#093624]/40" />
                  </div>
                  {/* Window Close Cross */}
                  <span className="text-xs font-bold text-[#093624]/50 group-hover:text-[#093624] transition-colors">
                    ✕
                  </span>
                </div>

                {/* Card Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Author Row (No photo) */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="font-sans font-bold text-lg text-[#093624] leading-tight">
                          {card.name}
                        </h3>
                        <p className={`text-xs font-semibold ${card.theme.roleColor} mt-0.5`}>
                          {card.role}
                        </p>
                      </div>

                      {/* Follow / Connect Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollow(card.id);
                        }}
                        className={`p-1.5 rounded-lg border border-[#093624]/30 hover:border-[#093624] transition-all cursor-pointer ${
                          isFollowed ? 'bg-[#093624] text-white' : 'bg-white/80 hover:bg-white text-[#093624]'
                        }`}
                        title="Connect"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Headline Quote */}
                    <h4 className="font-display font-bold text-lg sm:text-xl text-[#093624] tracking-tight mb-3">
                      {card.headline}
                    </h4>

                    {/* Body Text */}
                    <p className={`text-sm sm:text-base ${card.theme.text} leading-relaxed font-normal mb-6`}>
                      {card.body}
                    </p>
                  </div>

                  {/* Timestamp & Engagement Metrics Footer */}
                  <div className="pt-3 border-t border-[#093624]/10 flex items-center justify-between text-xs text-[#093624]/60 font-mono">
                    <div>{card.date}</div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 hover:text-[#093624] transition-colors cursor-pointer">
                        <Repeat2 className="w-3.5 h-3.5" />
                        <span>{card.retweets}</span>
                      </div>
                      <div 
                        onClick={() => toggleLike(card.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLiked ? 'text-[#EF4444] font-bold' : 'hover:text-[#EF4444]'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#EF4444]' : ''}`} />
                        <span>{isLiked ? (Number(card.likes) + 1) : card.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials CTA */}
        <div className="mt-14 sm:mt-16 max-w-2xl mx-auto flex justify-center text-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenBooking || scrollToBook}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-3 font-bold text-base sm:text-lg">
              <span>Book a Call</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#093624] group-hover:bg-[#CBDA46] text-[#F7F4E9] group-hover:text-[#093624] border border-[#093624] flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-6 shadow-xs shrink-0">
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:scale-110" />
              </span>
            </span>
          </Button>
        </div>

      </div>
    </section>
  );
};

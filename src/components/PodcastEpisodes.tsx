import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface PodcastEpisodesProps {
  selectedCategory: string;
  onPressPlay?: (episodeTitle?: string) => void;
}

export interface EpisodeData {
  id: string;
  title: string;
  category: string;
  spotifyUrl: string;
}

export const PodcastEpisodes: React.FC<PodcastEpisodesProps> = ({
  selectedCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Simplified Episode Data Array (easy to swap once real episode titles are provided)
  const episodes: EpisodeData[] = [
    {
      id: 'ep-1',
      title: "What Great SaaS Content Actually Does And Why Everything You're Using to Measure It Is Wrong",
      category: 'GTM & Pipeline',
      spotifyUrl: 'https://open.spotify.com/episode/4NI3bEj9YyPNRHPxctQxpV',
    },
    {
      id: 'ep-2',
      title: 'Why Your SaaS Close Rate Is Lower Than It Should Be And the 20-Minute Audit That Shows You Exactly Where',
      category: 'Founder Stories',
      spotifyUrl: 'https://open.spotify.com/episode/0UIYJilB0gYag2cMXQlATZ',
    },
    {
      id: 'ep-3',
      title: 'Why most SaaS founders are building with Claude but still losing on strategy with Toni Hopponen',
      category: 'Sales Conversations',
      spotifyUrl: 'https://open.spotify.com/episode/1yFAMAl4NFgQ9vMIPIyH9V',
    },
    {
      id: 'ep-4',
      title: '3 Signs Your Content Is in the Wrong Stage of the Funnel.',
      category: 'Deep Dives',
      spotifyUrl: 'https://open.spotify.com/episode/6Oj6AgnYJE0nu3csH83ZMq',
    },
  ];

  const filteredEpisodes =
    selectedCategory === 'All'
      ? episodes
      : episodes.some((ep) => ep.category === selectedCategory)
      ? episodes.filter((ep) => ep.category === selectedCategory)
      : episodes;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="podcast-episodes-section"
      className="py-18 sm:py-24 md:py-28 bg-[#093624] text-[#F7F4E9] notebook-grid-dark border-b border-[#F7F4E9]/15 relative overflow-hidden select-none"
      style={{
        backgroundColor: 'var(--color-bottle, #093624)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row with Title & Scroll Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F7F4E9] tracking-tight">
              What’s popping this week?
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-hand text-sm sm:text-base text-[#CBDA46] mr-2 hidden sm:inline -rotate-1 select-none">
              Scroll cassettes
            </span>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3 rounded-xl bg-[#F7F4E9]/10 hover:bg-[#CBDA46] hover:text-[#093624] text-[#F7F4E9] border border-[#F7F4E9]/20 transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3 rounded-xl bg-[#F7F4E9]/10 hover:bg-[#CBDA46] hover:text-[#093624] text-[#F7F4E9] border border-[#F7F4E9]/20 transition-all cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cassette Tape Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {filteredEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px]"
            >
              {/* Entire Card wrapped in Spotify Episode Link with ~150ms hover state */}
              <a
                href={ep.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen to ${ep.title} on Spotify`}
                className="group block bg-[#F7F4E9] text-[#093624] rounded-2xl border-2 sm:border-3 border-[#093624] p-5 sm:p-6 shadow-[4px_4px_0px_#05281A] hover:shadow-[8px_8px_0px_#CBDA46] hover:-translate-y-1.5 transition-all duration-150 ease-out flex flex-col justify-between h-full no-underline cursor-pointer"
              >
                <div>
                  {/* Simplified Cassette Reel Graphic (Two small circles only) */}
                  <div className="bg-[#05281A] rounded-xl p-3 mb-4 sm:mb-5 border border-[#093624] flex items-center justify-between overflow-hidden">
                    {/* Left Reel Circle */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-dashed border-[#CBDA46] flex items-center justify-center bg-[#093624] group-hover:rotate-45 transition-transform duration-500">
                      <div className="w-2 h-2 rounded-full bg-[#CBDA46]" />
                    </div>

                    {/* Subtle Connecting Line */}
                    <div className="flex-1 mx-3 sm:mx-4 h-0.5 bg-[#093624] border-t border-[#CBDA46]/25" />

                    {/* Right Reel Circle */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-dashed border-[#CBDA46] flex items-center justify-center bg-[#093624] group-hover:rotate-45 transition-transform duration-500">
                      <div className="w-2 h-2 rounded-full bg-[#CBDA46]" />
                    </div>
                  </div>

                  {/* Category Tag (Inter 600, small caps, --color-pine) */}
                  <span className="font-sans font-semibold uppercase tracking-wider text-[11px] sm:text-xs text-[#15543D] block mb-1.5">
                    {ep.category}
                  </span>

                  {/* Episode Title (Inter 600-700, --color-bottle, clean display) */}
                  <h3 className="font-sans font-semibold sm:font-bold text-base sm:text-lg text-[#093624] leading-snug tracking-tight line-clamp-3 min-h-[3.8rem] sm:min-h-[4.2rem] group-hover:text-[#15543D] transition-colors duration-150">
                    {ep.title}
                  </h3>
                </div>

                {/* Bottom Corner: Single circular play-button icon (--color-wattle fill) */}
                <div className="flex justify-end items-center pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#CBDA46] text-[#093624] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#d6e64d] transition-all duration-150">
                    <Play className="w-4 h-4 fill-[#093624] text-[#093624] translate-x-0.5" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import { X, ExternalLink, Radio } from 'lucide-react';
import { Tape } from './ScrapbookAssets';

export interface PodcastPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  episodeTitle?: string;
}

export const PodcastPlatformModal: React.FC<PodcastPlatformModalProps> = ({
  isOpen,
  onClose,
  episodeTitle,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const platforms = [
    {
      id: 'spotify',
      name: 'Spotify',
      tagline: 'Listen on Spotify',
      url: 'https://open.spotify.com/show/4sH9rhI3WGNiLFxMyAJv53',
      color: '#1DB954',
      badge: 'Popular',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306c-.216.353-.676.467-1.028.25-2.82-1.722-6.368-2.112-10.548-1.157-.402.093-.8-.16-.893-.563-.093-.402.16-.8.563-.893 4.582-1.047 8.513-.604 11.656 1.314.352.217.466.677.25 1.05zm1.464-3.255c-.272.44-.852.58-1.293.308-3.227-1.984-8.148-2.557-11.965-1.398-.496.15-1.025-.133-1.176-.63-.15-.496.133-1.025.63-1.176 4.368-1.326 9.803-.686 13.5 1.587.441.272.58.852.308 1.293zm.126-3.39c-3.87-2.298-10.25-2.51-13.934-1.392-.594.18-1.226-.157-1.406-.75-.18-.595.156-1.227.75-1.408 4.238-1.287 11.285-1.038 15.748 1.61.535.318.708 1.01.39 1.545-.318.535-1.01.708-1.548.39z" />
        </svg>
      ),
    },
    {
      id: 'amazon',
      name: 'Amazon Music',
      tagline: 'HD Audio & Podcasts',
      url: 'https://music.amazon.com/podcasts/e9671226-db57-44be-b723-d9246ad7ced6/beyond-content',
      color: '#00A8E1',
      badge: 'Prime',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.67 15.65c-.24.38-.75.49-1.13.25-3.1-1.89-7-2.32-11.6-1.27-.44.1-.88-.18-.98-.62-.1-.44.18-.88.62-.98 5.04-1.15 9.36-.66 12.82 1.45.38.24.5.75.27 1.17z" />
        </svg>
      ),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      tagline: 'Watch & listen in 4K',
      url: 'https://www.youtube.com/playlist?list=PLbhodKeul3RpG4QT04vSJcMwqsadszCmI&si=Ct9LzFmTz0_HdNpi',
      color: '#FF0000',
      badge: 'Video',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="platform-picker-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0E1A15]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F7F4E9] rounded-2xl border-2 border-[#093624] p-6 sm:p-8 shadow-[8px_8px_0px_#093624] notebook-grid-bg animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-3.5 left-8 -rotate-2 z-10 pointer-events-none">
          <Tape className="w-24 h-6" color="#CBDA46" />
        </div>

        <button
          onClick={onClose}
          aria-label="Close platform picker"
          className="absolute top-4 right-4 p-2 rounded-xl text-[#093624] hover:bg-[#093624]/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#093624]/10 text-[#093624] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <Radio className="w-3.5 h-3.5 text-[#093624]" />
            <span>CHOOSE YOUR PLATFORM</span>
          </div>
          <h3 id="platform-picker-title" className="font-display font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight">
            Listen to Beyond Content
          </h3>
          {episodeTitle && (
            <p className="mt-1.5 text-xs sm:text-sm font-sans text-[#093624]/75 line-clamp-1 italic">
              Playing: "{episodeTitle}"
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#093624]/20 shadow-xs hover:border-[#093624] hover:shadow-[3px_3px_0px_#093624] hover:-translate-y-0.5 transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: p.color }}
                >
                  {p.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-[#093624] flex items-center gap-1.5">
                    {p.name}
                    {p.badge && (
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#CBDA46]/40 text-[#093624]">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#6F7A6E] font-sans">
                    {p.tagline}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#093624]/40 group-hover:text-[#093624] transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

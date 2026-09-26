import React, { useState } from 'react';
import { PodcastHero } from './PodcastHero';
import { PodcastLinerNotes } from './PodcastLinerNotes';
import { PodcastMicTopics } from './PodcastMicTopics';
import { PodcastEpisodes } from './PodcastEpisodes';
import { PodcastWhereToListen } from './PodcastWhereToListen';
import { PodcastNeverMissADrop } from './PodcastNeverMissADrop';
import { PodcastPlatformModal } from './PodcastPlatformModal';

interface PodcastPageProps {
  onOpenBooking?: () => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigate?: (page: 'home' | 'about' | 'podcast', sectionId?: string) => void;
}

export const PodcastPage: React.FC<PodcastPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigate,
}) => {
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [activeEpisodeTitle, setActiveEpisodeTitle] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleOpenPlatformPicker = (title?: string) => {
    setActiveEpisodeTitle(title);
    setIsPlatformModalOpen(true);
  };

  const handleClosePlatformPicker = () => {
    setIsPlatformModalOpen(false);
    setActiveEpisodeTitle(undefined);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F4E9] text-[#093624]">
      {/* 1. Hero Section: "Beyond Content" with stacked headline, thin squiggly highlighter, primary CTA, and rotating circular audio player */}
      <PodcastHero
        onPressPlay={() => handleOpenPlatformPicker()}
      />

      {/* 2. Show Liner Notes: What the Show Is About */}
      <PodcastLinerNotes />

      {/* 3. What's on the Mic: 6-Card Scrapbook Grid */}
      <PodcastMicTopics
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onPressPlay={(topic) => handleOpenPlatformPicker(topic)}
      />

      {/* 4. Episodes Showcase: "What's popping this week?" Cassette Tapes Carousel */}
      <PodcastEpisodes
        selectedCategory={selectedCategory}
        onPressPlay={(epTitle) => handleOpenPlatformPicker(epTitle)}
      />

      {/* 5. Where to Listen Carousel */}
      <PodcastWhereToListen
        onPressPlay={() => handleOpenPlatformPicker()}
      />

      {/* 6. "Never miss a drop" Closing Section with full-bleed flatlay photo and pinned note */}
      <PodcastNeverMissADrop />

      {/* Platform-Picker Popover / Modal */}
      <PodcastPlatformModal
        isOpen={isPlatformModalOpen}
        onClose={handleClosePlatformPicker}
        episodeTitle={activeEpisodeTitle}
      />
    </div>
  );
};

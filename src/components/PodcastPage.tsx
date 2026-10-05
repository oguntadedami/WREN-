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
      <PodcastHero
        onPressPlay={() => handleOpenPlatformPicker()}
      />

      <PodcastLinerNotes />

      <PodcastMicTopics
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onPressPlay={(topic) => handleOpenPlatformPicker(topic)}
      />

      <PodcastEpisodes
        selectedCategory={selectedCategory}
        onPressPlay={(epTitle) => handleOpenPlatformPicker(epTitle)}
      />

      <PodcastWhereToListen
        onPressPlay={() => handleOpenPlatformPicker()}
      />

      <PodcastNeverMissADrop />

      <PodcastPlatformModal
        isOpen={isPlatformModalOpen}
        onClose={handleClosePlatformPicker}
        episodeTitle={activeEpisodeTitle}
      />
    </div>
  );
};

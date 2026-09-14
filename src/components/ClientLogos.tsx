import React from 'react';
import carrilLogo from '../assets/client logos/carril.png';
import colorteamLogo from '../assets/client logos/colorteam.png';
import mischiefMakersLogo from '../assets/client logos/mischief-makers.png';
import seamailerLogo from '../assets/client logos/seamailer.png';
import theToolBusLogo from '../assets/client logos/the-tool-bus.png';

export {
  carrilLogo,
  colorteamLogo,
  mischiefMakersLogo,
  seamailerLogo,
  theToolBusLogo,
};

// Carril logo component
export const LogoCarril: React.FC<{ className?: string; alt?: string; color?: string }> = ({
  className = "h-5 w-auto object-contain",
  alt = "carril."
}) => (
  <img
    src={carrilLogo}
    alt={alt}
    className={`object-contain select-none ${className}`}
    loading="eager"
  />
);

// Colorteam logo component
export const LogoColorteam: React.FC<{ className?: string; alt?: string; color?: string }> = ({
  className = "h-5 w-auto object-contain",
  alt = "colorteam"
}) => (
  <img
    src={colorteamLogo}
    alt={alt}
    className={`object-contain select-none ${className}`}
    loading="eager"
  />
);

// Mischief Makers logo component
export const LogoMischiefMakers: React.FC<{ className?: string; alt?: string; color?: string }> = ({
  className = "h-4.5 w-auto object-contain",
  alt = "MISCHIEF MAKERS"
}) => (
  <img
    src={mischiefMakersLogo}
    alt={alt}
    className={`object-contain select-none ${className}`}
    loading="eager"
  />
);

// Seamailer logo component
export const LogoSeamailer: React.FC<{ className?: string; alt?: string; color?: string }> = ({
  className = "h-6 w-auto object-contain",
  alt = "Seamailer"
}) => (
  <img
    src={seamailerLogo}
    alt={alt}
    className={`object-contain select-none ${className}`}
    loading="eager"
  />
);

// The Tool Bus logo component
export const LogoTheToolBus: React.FC<{ className?: string; alt?: string; color?: string }> = ({
  className = "h-6 w-auto object-contain",
  alt = "THE TOOL BUS"
}) => (
  <img
    src={theToolBusLogo}
    alt={alt}
    className={`object-contain select-none ${className}`}
    loading="eager"
  />
);

export const CLIENT_LOGOS = [
  { id: 'carril', name: 'carril.', Component: LogoCarril, logoSrc: carrilLogo },
  { id: 'colorteam', name: 'colorteam', Component: LogoColorteam, logoSrc: colorteamLogo },
  { id: 'mischief-makers', name: 'MISCHIEF MAKERS', Component: LogoMischiefMakers, logoSrc: mischiefMakersLogo },
  { id: 'seamailer', name: 'Seamailer', Component: LogoSeamailer, logoSrc: seamailerLogo },
  { id: 'the-tool-bus', name: 'THE TOOL BUS', Component: LogoTheToolBus, logoSrc: theToolBusLogo },
];


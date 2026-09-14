import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, BookOpen, Laptop, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { HandDrawnHeartDoodle } from './ScrapbookAssets';

// Exactly the 8 required images from src/assets/images/giveback/
import imgChildrenClassStand from '../assets/images/giveback/giveback-children-class-stand.webp';
import imgGirlReadingClass from '../assets/images/giveback/giveback-girl-reading-clas.webp';
import imgTwoSmallGirls from '../assets/images/giveback/giveback-two-small-girls.webp';
import imgYouthTechWorkshop from '../assets/images/giveback/giveback-youth-tech-workshop.webp';
import imgThreeGirlsSanitaryPad from '../assets/images/giveback/giveback-three-girls-sanitarypad.webp';
import imgTwoGirlsLaptop from '../assets/images/giveback/giveback-two-girls-laptop.webp';
import imgThreeSmallGirls from '../assets/images/giveback/giveback-three-small-girls.webp';
import imgGirlsSanitaryPads from '../assets/images/giveback/giveback-girls-sanitary-pads.webp';

interface GiveBackSectionProps {
  onOpenBooking?: () => void;
}

export const GiveBackSection: React.FC<GiveBackSectionProps> = ({ onOpenBooking }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <section 
      id="we-dont-hold-back"
      className="relative w-full overflow-hidden border-b border-[#0E1A15]/40"
      style={{
        backgroundColor: 'var(--color-bottle)', // #093624
        color: 'var(--color-cream)',           // #F7F4E9
      }}
    >
      {/* Background dark notebook grid pattern */}
      <div className="absolute inset-0 notebook-grid-dark opacity-35 pointer-events-none" />

      {/* Subtle radial ambient gradient in the backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#15543D]/25 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* DESKTOP COLLAGE VIEWPORT (lg+)                                            */}
      {/* Strict Protected Text Column (max-w-[680px], z-20)                        */}
      {/* Photos strictly restricted to Left (0-18%) and Right (82-100%) zones      */}
      {/* Only the two lower photos sit near center, below the CTA button           */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 xl:py-24 min-h-[820px] xl:min-h-[860px]">

        {/* ----------------------------------------------------------------------- */}
        {/* 1. STRICT PROTECTED TEXT COLUMN (max-w-[680px], z-20)                   */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative z-20 max-w-[680px] w-full mx-auto text-center flex flex-col items-center">
          
          {/* Headline: "We don't hold back" (IBM Plex Serif 700-800, with "hold" in italic) */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-[1.12] mb-6"
            style={{ color: 'var(--color-cream)' }}
          >
            We don't <em className="italic font-normal font-display" style={{ color: 'var(--color-wattle)' }}>hold</em> back
          </motion.h2>

          {/* Protected Body Copy: No photos can overlap this text block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="font-sans text-base sm:text-lg leading-[1.75] space-y-4 text-center"
            style={{ color: 'rgba(247, 244, 233, 0.92)' }}
          >
            <p>
              At the core of Wren is community and support. Outside of Wren, I stay connected with orphanages across Africa, supporting children with their education.
            </p>

            <p>
              I also champion <strong style={{ color: 'var(--color-cream)' }}>Pad a Girl</strong>, a tentative programme focused on providing sanitary pads to young girls in rural African communities. By the side, I'm also leading the growth of <strong style={{ color: 'var(--color-cream)' }}>iSoar</strong>, a non-governmental organization focused on introducing leadership and tech skills in the remote areas of Africa and Asia.
            </p>

            <p>
              It's something I've cared about personally for a long time. And as Wren grows, I'd love for the business to do more of it.
            </p>

            <p className="pt-1 text-lg leading-snug">
              <strong className="font-bold block sm:inline" style={{ color: 'var(--color-cream)' }}>
                Make money. Build good things. Give some of it away.
              </strong>{' '}
              <span className="font-normal opacity-85 block sm:inline">That's the whole plan for us.</span>
            </p>
          </motion.div>

          {/* CTA Button Wrapper with layered overlap for the 2 lower photos */}
          <div className="relative z-30 pt-8 pb-28 sm:pb-32 flex justify-center w-full">
            
            {/* The Reusable CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="relative z-20"
            >
              <Button
                id="giveback-find-out-more-btn"
                variant="primary-lime"
                size="lg"
                className="btn-primary shadow-[0_10px_26px_rgba(0,0,0,0.55)] cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                Find out more
              </Button>
            </motion.div>

            {/* LOWER PHOTO 1: giveback-youth-tech-workshop.webp */}
            {/* ONLY below the CTA button, overlapping its bottom-left edge slightly */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="absolute top-14 sm:top-16 left-1/2 -translate-x-[155px] sm:-translate-x-[175px] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
              style={{ transform: 'rotate(2.4deg)' }}
            >
              <div 
                className="w-[170px] sm:w-[185px] aspect-[4/3] p-2 pb-3.5 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.65)] border border-[#0E1A15]/20"
                style={{ backgroundColor: 'var(--color-cream)' }}
              >
                <img 
                  src={imgYouthTechWorkshop} 
                  alt="Youth participating in tech and leadership workshop" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* LOWER PHOTO 2: giveback-three-girls-sanitarypad.webp */}
            {/* ONLY below the CTA button, overlapping its bottom-right edge slightly */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="absolute top-16 sm:top-18 left-1/2 translate-x-[5px] sm:translate-x-[15px] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
              style={{ transform: 'rotate(-2.8deg)' }}
            >
              <div 
                className="w-[170px] sm:w-[185px] aspect-[4/3] p-2 pb-3.5 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.65)] border border-[#0E1A15]/20"
                style={{ backgroundColor: 'var(--color-cream)' }}
              >
                <img 
                  src={imgThreeGirlsSanitaryPad} 
                  alt="Three young girls with sanitary pads" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>

          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* 2. LEFT ZONE (0% to ~18-20% horizontal bounds)                          */}
        {/* All photos stay strictly within this outer lane                         */}
        {/* ----------------------------------------------------------------------- */}

        {/* Photo 1: giveback-children-class-stand.webp (Smallest, top-left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -7 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="absolute top-[4%] left-[1%] xl:left-[2%] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
          style={{ transform: 'rotate(-5.4deg)' }}
        >
          <div 
            className="w-[140px] xl:w-[155px] aspect-[4/3] p-2 pb-3 rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.55)] border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)' }}
          >
            <img 
              src={imgChildrenClassStand} 
              alt="Children standing in classroom in Africa" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* DOODLE 1: Hand-drawn heart doodle in --color-wattle near photo 1 & 2 */}
        <div className="absolute top-[21%] left-[10%] xl:left-[11%] z-15 rotate-[-12deg]">
          <HandDrawnHeartDoodle className="w-9 h-9 xl:w-10 xl:h-10" color="var(--color-wattle)" />
        </div>

        {/* Photo 2: giveback-girl-reading-clas.webp (Medium, upper-left below small photo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 4.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="absolute top-[32%] left-[1%] xl:left-[2%] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
          style={{ transform: 'rotate(4.6deg)' }}
        >
          <div 
            className="w-[165px] xl:w-[178px] aspect-[4/3.6] p-2.5 pb-3.5 rounded-xl shadow-[0_15px_32px_rgba(0,0,0,0.58)] border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)' }}
          >
            <img 
              src={imgGirlReadingClass} 
              alt="Young girl reading in classroom" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* DOODLE 2: Hand-drawn heart doodle in --color-wattle near lower-left photo */}
        <div className="absolute bottom-[28%] left-[9%] xl:left-[10%] z-15 rotate-[15deg]">
          <HandDrawnHeartDoodle className="w-10 h-10" color="var(--color-wattle)" />
        </div>

        {/* Photo 3: giveback-two-small-girls.webp (LARGEST photo on left side, lower-left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="absolute bottom-[6%] left-[1%] xl:left-[2%] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
          style={{ transform: 'rotate(-3.2deg)' }}
        >
          <div 
            className="w-[185px] xl:w-[200px] aspect-[3/3.8] p-2.5 pb-4 rounded-xl shadow-[0_18px_38px_rgba(0,0,0,0.62)] border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)' }}
          >
            <img 
              src={imgTwoSmallGirls} 
              alt="Two young girls smiling together" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* 3. RIGHT ZONE (82% to 100% horizontal bounds)                           */}
        {/* All photos stay strictly within this outer lane                         */}
        {/* ----------------------------------------------------------------------- */}

        {/* Photo 7: giveback-three-small-girls.webp (LARGEST photo on right side, upper-right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -6.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="absolute top-[4%] right-[1%] xl:right-[2%] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
          style={{ transform: 'rotate(-6.5deg)' }}
        >
          <div 
            className="w-[185px] xl:w-[200px] aspect-[3/3.8] p-2.5 pb-4 rounded-xl shadow-[0_18px_38px_rgba(0,0,0,0.62)] border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)' }}
          >
            <img 
              src={imgThreeSmallGirls} 
              alt="Three small girls smiling warmly together" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* DOODLE 3: Hand-drawn heart doodle in --color-wattle near upper-right photo */}
        <div className="absolute top-[22%] right-[11%] xl:right-[12%] z-15 rotate-[18deg]">
          <HandDrawnHeartDoodle className="w-9 h-9 xl:w-10 xl:h-10" color="var(--color-wattle)" />
        </div>

        {/* Photo 8: giveback-girls-sanitary-pads.webp (SMALLEST photo on right, middle-right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 3.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="absolute top-[34%] right-[1%] xl:right-[2%] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
          style={{ transform: 'rotate(3.4deg)' }}
        >
          <div 
            className="w-[140px] xl:w-[155px] aspect-[4/3] p-2 pb-3 rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.55)] border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)' }}
          >
            <img 
              src={imgGirlsSanitaryPads} 
              alt="Community distribution of menstrual hygiene pads" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* DOODLE 4: Hand-drawn heart doodle in --color-wattle near lower-right photo */}
        <div className="absolute bottom-[28%] right-[10%] xl:right-[11%] z-15 rotate-[-10deg]">
          <HandDrawnHeartDoodle className="w-9 h-9 xl:w-10 xl:h-10" color="var(--color-wattle)" />
        </div>

        {/* Photo 6: giveback-two-girls-laptop.webp (Medium, lower-right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="absolute bottom-[6%] right-[1%] xl:right-[2%] z-10 hover:z-30 transition-transform duration-300 hover:scale-105"
          style={{ transform: 'rotate(5.8deg)' }}
        >
          <div 
            className="w-[165px] xl:w-[180px] aspect-[4/3] p-2.5 pb-3.5 rounded-xl shadow-[0_16px_34px_rgba(0,0,0,0.58)] border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)' }}
          >
            <img 
              src={imgTwoGirlsLaptop} 
              alt="Two girls studying digital skills on a laptop" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET RESPONSIVE VIEW (< lg)                                    */}
      {/* Clean Stacked Layout: Text & CTA on top, organic polaroid collage below   */}
      {/* ========================================================================= */}
      <div className="block lg:hidden px-4 sm:px-6 py-16 max-w-xl mx-auto">
        
        {/* Text column */}
        <div className="text-center space-y-4 mb-10">
          <h2 
            className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight"
            style={{ color: 'var(--color-cream)' }}
          >
            We don't <em className="italic font-normal font-display" style={{ color: 'var(--color-wattle)' }}>hold</em> back
          </h2>

          <div 
            className="font-sans text-base leading-relaxed space-y-3.5 text-left sm:text-center pt-2"
            style={{ color: 'rgba(247, 244, 233, 0.92)' }}
          >
            <p>
              At the core of Wren is community and support. Outside of Wren, I stay connected with orphanages across Africa, supporting children with their education.
            </p>

            <p>
              I also champion <strong style={{ color: 'var(--color-cream)' }}>Pad a Girl</strong>, a tentative programme focused on providing sanitary pads to young girls in rural African communities. By the side, I'm also leading the growth of <strong style={{ color: 'var(--color-cream)' }}>iSoar</strong>, a non-governmental organization focused on introducing leadership and tech skills in the remote areas of Africa and Asia.
            </p>

            <p>
              It's something I've cared about personally for a long time. And as Wren grows, I'd love for the business to do more of it.
            </p>

            <p className="pt-1 text-base sm:text-lg">
              <strong className="font-bold block sm:inline" style={{ color: 'var(--color-cream)' }}>
                Make money. Build good things. Give some of it away.
              </strong>{' '}
              <span className="opacity-85 block sm:inline">That's the whole plan for us.</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 flex justify-center">
            <Button
              variant="primary-lime"
              size="md"
              className="btn-primary shadow-lg cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              Find out more
            </Button>
          </div>
        </div>

        {/* 2-Column Polaroid Scrapbook Grid with Rotations & Heart Doodles */}
        <div className="relative grid grid-cols-2 gap-4 sm:gap-6 pt-4">
          
          {/* Photo 1 (children-class-stand) */}
          <div 
            className="p-2 pb-3 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(-4deg)' }}
          >
            <img 
              src={imgChildrenClassStand} 
              alt="Children in classroom" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 7 (three-small-girls) with doodle */}
          <div 
            className="relative p-2.5 pb-4 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(5deg)' }}
          >
            <div className="absolute -top-3 -right-2 z-10 rotate-12">
              <HandDrawnHeartDoodle className="w-8 h-8" color="var(--color-wattle)" />
            </div>
            <img 
              src={imgThreeSmallGirls} 
              alt="Three small girls" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 2 (girl-reading-clas) */}
          <div 
            className="p-2.5 pb-4 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(3deg)' }}
          >
            <img 
              src={imgGirlReadingClass} 
              alt="Girl reading in class" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 3 (two-small-girls) with doodle */}
          <div 
            className="relative p-2.5 pb-4 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(-3deg)' }}
          >
            <div className="absolute -bottom-3 -left-2 z-10 -rotate-12">
              <HandDrawnHeartDoodle className="w-8 h-8" color="var(--color-wattle)" />
            </div>
            <img 
              src={imgTwoSmallGirls} 
              alt="Two small girls" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 4 (youth-tech-workshop) */}
          <div 
            className="p-2 pb-3 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(-2deg)' }}
          >
            <img 
              src={imgYouthTechWorkshop} 
              alt="Youth tech workshop" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 5 (three-girls-sanitarypad) with doodle */}
          <div 
            className="relative p-2 pb-3 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(4deg)' }}
          >
            <div className="absolute -top-3 -left-2 z-10 rotate-6">
              <HandDrawnHeartDoodle className="w-7 h-7" color="var(--color-wattle)" />
            </div>
            <img 
              src={imgThreeGirlsSanitaryPad} 
              alt="Pad a Girl initiative" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 8 (girls-sanitary-pads) */}
          <div 
            className="p-2 pb-3 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(2deg)' }}
          >
            <img 
              src={imgGirlsSanitaryPads} 
              alt="Sanitary pads community program" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          {/* Photo 6 (two-girls-laptop) */}
          <div 
            className="p-2.5 pb-4 rounded-xl shadow-lg border border-[#0E1A15]/20"
            style={{ backgroundColor: 'var(--color-cream)', transform: 'rotate(-4deg)' }}
          >
            <img 
              src={imgTwoGirlsLaptop} 
              alt="Two girls learning on laptop" 
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* IMPACT DETAILS MODAL ("Find out more" Dialog)                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="giveback-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#093624]/85 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-[#CBDA46]/40 shadow-2xl p-6 sm:p-8 z-10 wren-story-scrollbar"
              style={{
                backgroundColor: 'var(--color-cream)', // #F7F4E9
                color: 'var(--color-ink)',            // #0E1A15
              }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#0E1A15]/10 text-[#0E1A15]/70 hover:text-[#0E1A15] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag & Title */}
              <div className="mb-6 pr-8">
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
                  style={{ backgroundColor: 'rgba(9, 54, 36, 0.08)', color: 'var(--color-bottle)' }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-pine)' }} />
                  OUR COMMUNITY WORK
                </span>
                <h3 id="giveback-modal-title" className="font-display font-bold text-2xl sm:text-3xl text-[#093624]">
                  Beyond the Studio: Where our heart lives
                </h3>
              </div>

              {/* 3 Pillars of Impact */}
              <div className="space-y-6 text-left">
                
                {/* 1. Pad a Girl */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#0E1A15]/10 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#CBDA46]/20 border border-[#CBDA46]/40 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#093624]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#093624] mb-1">
                      Pad a Girl Initiative
                    </h4>
                    <p className="font-sans text-sm text-[#0E1A15]/80 leading-relaxed">
                      Period poverty causes countless girls in rural African communities to miss up to 20% of their school days every year. We provide sanitary pads, hygiene kits, and menstrual health workshops so girls never have to sacrifice their education for dignity.
                    </p>
                  </div>
                </div>

                {/* 2. iSoar NGO */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#0E1A15]/10 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#CBDA46]/20 border border-[#CBDA46]/40 flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5 text-[#093624]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#093624] mb-1">
                      iSoar Leadership & Tech Skills
                    </h4>
                    <p className="font-sans text-sm text-[#0E1A15]/80 leading-relaxed">
                      Bridging the digital divide in remote areas across Africa and Asia. iSoar equips young people with practical computing, coding fundamentals, problem-solving, and leadership toolkits to build economic mobility.
                    </p>
                  </div>
                </div>

                {/* 3. Orphanage Education Sponsorships */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#0E1A15]/10 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#CBDA46]/20 border border-[#CBDA46]/40 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-[#093624]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#093624] mb-1">
                      Direct Orphanage Sponsorships
                    </h4>
                    <p className="font-sans text-sm text-[#0E1A15]/80 leading-relaxed">
                      Long-term partnerships providing school fees, uniforms, textbooks, and nourishing meals directly to children in orphanages across the continent.
                    </p>
                  </div>
                </div>

              </div>

              {/* Closing Creed in modal */}
              <div className="mt-8 p-5 rounded-xl bg-[#093624] text-[#F7F4E9] text-center">
                <p className="font-display font-bold text-lg sm:text-xl text-[#CBDA46] mb-1">
                  Make money. Build good things. Give some of it away.
                </p>
                <p className="font-sans text-xs text-[#F7F4E9]/80">
                  Every client project at Wren directly fuels these initiatives.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-[#0E1A15]/70 hover:text-[#0E1A15] hover:bg-[#0E1A15]/5 transition-colors cursor-pointer"
                >
                  Close
                </button>
                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full font-sans text-sm font-bold bg-[#093624] text-[#F7F4E9] hover:bg-[#15543D] transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Work with us</span>
                    <ExternalLink className="w-4 h-4 text-[#CBDA46]" />
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

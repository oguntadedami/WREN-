import React, { useState } from 'react';
import { Button } from './Button';
import { Check } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: 'home' | 'about' | 'podcast' | 'for-ai' | 'community' | 'contact', sectionId?: string) => void;
  onOpenBooking?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [shakingFields, setShakingFields] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{ name: string; email: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: { name?: boolean; email?: boolean; message?: boolean } = {};
    if (!formData.name.trim()) {
      newErrors.name = true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakingFields(newErrors);

      // Reset shaking state after 500ms so subsequent clicks re-trigger animation cleanly
      setTimeout(() => {
        setShakingFields({});
      }, 500);
      return;
    }

    setErrors({});
    setShakingFields({});
    setIsSubmitting(true);
    
    // Save submitted details for confirmation feedback
    const capturedName = formData.name;
    const capturedEmail = formData.email;

    // Simulate brief processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedInfo({ name: capturedName, email: capturedEmail });
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      website: '',
      message: ''
    });
    setErrors({});
    setShakingFields({});
    setSubmittedInfo(null);
    setIsSubmitted(false);
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#F4F1EA] text-[#093624]">
      {/* Side-by-side Dual Panel Layout on Desktop; Stacked on Mobile */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row items-stretch">
        
        {/* ========================================================================= */}
        {/* 1. LEFT PANEL: HERO SECTION (Editorial Cream Background)                  */}
        {/* ========================================================================= */}
        <div id="contact-hero" className="w-full lg:w-[48%] xl:w-[46%] bg-[#F4F1EA] flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 pt-28 sm:pt-32 lg:pt-24 pb-12 lg:pb-16 border-b-2 lg:border-b-0 lg:border-r-2 border-[#093624]">
          <div className="max-w-xl mx-auto lg:mx-0 w-full text-center lg:text-left">
            
            {/* HEADLINE: Broken into 3 balanced lines with underline hugging the words */}
            <h1 className="font-display font-bold text-2xl xs:text-3xl sm:text-3xl lg:text-[32px] xl:text-[38px] 2xl:text-[44px] text-[#093624] tracking-tight leading-[1.16]">
              <span className="block">
                Not everyone loves
              </span>
              <span className="block mt-1 sm:mt-1.5">
                to sit on a call,
              </span>
              <span className="block mt-1 sm:mt-1.5">
                <span className="relative inline-block">
                  <span className="relative z-10">and we understand that.</span>
                  {/* Hand-drawn style wavy underline in Wattle (#CBDA46) hugging the words */}
                  <svg 
                    className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 overflow-visible pointer-events-none" 
                    viewBox="0 0 320 14" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path 
                      d="M2 8 C 30 2, 60 14, 90 8 C 120 2, 150 14, 180 8 C 210 2, 240 14, 270 8 C 295 3, 310 12, 318 7" 
                      stroke="#CBDA46" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* BODY COPY */}
            <p className="font-sans font-normal text-base sm:text-lg lg:text-xl text-[#093624] mt-6 sm:mt-7 leading-relaxed">
              Send us a message using the form. Tell us what&apos;s going on and what you need.
            </p>

            {/* Handwritten reply note */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center lg:justify-start select-none">
              <p className="font-hand text-base sm:text-lg lg:text-xl text-[#093624] tracking-wide -rotate-1">
                We usually reply within 24 hours.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. RIGHT PANEL: CONTACT FORM SECTION (Checked Background & Organic Paper)  */}
        {/* ========================================================================= */}
        <div 
          id="contact-form-section"
          className="w-full lg:w-[52%] xl:w-[54%] flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-10 pt-12 lg:pt-24 pb-14 lg:pb-12 relative"
          style={{
            backgroundColor: '#DFEA9C',
            backgroundImage: `
              linear-gradient(to right, rgba(9, 54, 36, 0.22) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(9, 54, 36, 0.22) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '64px 64px'
          }}
        >
          {/* Subtle radial focus vignette */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(circle at center, transparent 35%, rgba(9, 54, 36, 0.35) 100%)'
            }}
            aria-hidden="true"
          />

          {/* Organic Hand-Drawn Paper Card Container (matching "OUR APPROACH" shape without the clip) */}
          <div className="relative z-10 w-full max-w-xl xl:max-w-2xl mx-auto">
            
            {/* Hand-Drawn Offset Sketched Shadow Layer */}
            <div 
              className="absolute inset-0 translate-x-2 translate-y-2.5 sm:translate-x-2.5 sm:translate-y-3 bg-[#093624]/20 border-2 border-[#093624]/30 pointer-events-none"
              style={{ borderRadius: '255px 18px 225px 18px/18px 225px 18px 255px' }}
              aria-hidden="true"
            />

            {/* Main Hand-Drawn Paper Card Body (without the clip) */}
            <div 
              className="relative z-10 bg-[#FFFDF7] text-[#093624] border-2 border-[#093624] px-5 sm:px-8 lg:px-9 xl:px-11 pt-6 sm:pt-7 lg:pt-6 pb-7 sm:pb-8 lg:pb-7"
              style={{ borderRadius: '255px 22px 225px 22px/22px 225px 22px 255px' }}
            >
              
              {isSubmitted ? (
                /* =============================================================== */
                /* 'Message Sent' VISUAL FEEDBACK STATE REPLACING FORM FIELDS       */
                /* =============================================================== */
                <div className="py-6 sm:py-8 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                  {/* Feedback Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CBDA46] border-2 border-[#093624] shadow-[4px_4px_0px_#093624] mb-1">
                    <Check className="w-7 h-7 text-[#093624] stroke-[2.5]" />
                  </div>
                  
                  {/* Feedback Heading */}
                  <div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#093624] tracking-tight">
                      Message Sent
                    </h2>
                    <p className="font-hand text-base sm:text-lg text-[#093624] mt-1 -rotate-1 select-none">
                      We usually reply within 24 hours.
                    </p>
                  </div>
                  
                  {/* Confirmation text */}
                  <p className="font-sans text-sm sm:text-base text-[#093624]/85 max-w-md mx-auto leading-relaxed">
                    {submittedInfo?.name ? (
                      <>Thanks, <strong className="font-semibold text-[#093624]">{submittedInfo.name}</strong>! Your note has been delivered straight to our team and we will get back to you shortly.</>
                    ) : (
                      <>Thanks for reaching out! Your message has been sent and we usually reply within 24 hours.</>
                    )}
                  </p>

                  {/* Destination Capsule */}
                  {submittedInfo?.email && (
                    <div className="inline-block px-3.5 py-1.5 bg-[#FAF6EC] border-2 border-[#093624] text-xs sm:text-sm font-sans text-[#093624] shadow-[2px_2px_0px_#093624]">
                      A confirmation has been sent to: <span className="font-semibold">{submittedInfo.email}</span>
                    </div>
                  )}

                  {/* Reset action */}
                  <div className="pt-3">
                    <Button
                      variant="primary"
                      showSparkles={false}
                      size="md"
                      onClick={handleReset}
                      className="min-w-[170px] sm:min-w-[190px]"
                    >
                      Send another message
                    </Button>
                  </div>
                </div>
              ) : (
                /* =============================================================== */
                /* ACTIVE CONTACT FORM                                              */
                /* =============================================================== */
                <>
                  {/* Header: "Form" */}
                  <div className="text-center mb-3 sm:mb-4">
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-[#093624] tracking-tight">
                      Form
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Rectangular Table Grid */}
                    <div className="border-2 border-[#093624] bg-[#FFFDF7] rounded-none overflow-hidden">
                      
                      {/* Row 1: Your name | Your real email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-[#093624]">
                        {/* Column 1: Your name */}
                        <div className={`p-2.5 sm:p-3 sm:border-r-2 border-b-2 sm:border-b-0 border-[#093624] focus-within:bg-[#FAF6EC] transition-colors ${shakingFields.name ? 'animate-shake' : ''}`}>
                          <label 
                            htmlFor="name" 
                            className="block text-xs font-sans font-bold uppercase tracking-wider text-[#093624] mb-1"
                          >
                            Your name
                          </label>
                          <input 
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-transparent font-sans text-xs sm:text-sm text-[#093624] placeholder:text-[#093624]/30 focus:outline-none"
                          />
                        </div>

                        {/* Column 2: Your real email */}
                        <div className={`p-2.5 sm:p-3 focus-within:bg-[#FAF6EC] transition-colors ${shakingFields.email ? 'animate-shake' : ''}`}>
                          <label 
                            htmlFor="email" 
                            className="block text-xs font-sans font-bold uppercase tracking-wider text-[#093624] mb-1"
                          >
                            Your real email
                          </label>
                          <input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent font-sans text-xs sm:text-sm text-[#093624] placeholder:text-[#093624]/30 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Row 2: Website */}
                      <div className="p-2.5 sm:p-3 border-b-2 border-[#093624] focus-within:bg-[#FAF6EC] transition-colors">
                        <label 
                          htmlFor="website" 
                          className="block text-xs font-sans font-bold uppercase tracking-wider text-[#093624] mb-1"
                        >
                          Website
                        </label>
                        <input 
                          id="website"
                          name="website"
                          type="text"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full bg-transparent font-sans text-xs sm:text-sm text-[#093624] placeholder:text-[#093624]/30 focus:outline-none"
                        />
                      </div>

                      {/* Row 3: What do you want to talk to us about? */}
                      <div className={`p-2.5 sm:p-3 focus-within:bg-[#FAF6EC] transition-colors ${shakingFields.message ? 'animate-shake' : ''}`}>
                        <label 
                          htmlFor="message" 
                          className="block text-xs font-sans font-bold uppercase tracking-wider text-[#093624] mb-0.5"
                        >
                          What do you want to talk to us about?
                        </label>
                        <p className="text-[11px] sm:text-xs italic text-[#093624]/80 mb-1.5 font-sans">
                          (Give us the good stuff. The more you tell us, the better we can understand what you need and whether we&apos;re a good fit)
                        </p>
                        <textarea 
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-transparent font-sans text-xs sm:text-sm text-[#093624] placeholder:text-[#093624]/30 focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                    </div>

                    {/* CTA Button: Primary button design without the sparkle */}
                    <div className="mt-4 sm:mt-5 flex justify-center">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        showSparkles={false}
                        size="md" 
                        disabled={isSubmitting}
                        className="min-w-[170px] sm:min-w-[180px]"
                      >
                        {isSubmitting ? 'Sending...' : 'Send it over'}
                      </Button>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

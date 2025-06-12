import React from 'react';

/**
 * Hero section component with animated text waves and call-to-action
 * @param {string} title - Main hero title
 * @param {string} buttonText - CTA button text
 * @param {function} onButtonClick - CTA button click handler
 * @param {array} textWaves - Array of text strings for background animation
 */
const HeroSection = ({ 
  title = "Ink your soul. Verse the world.",
  buttonText = "Start Writing",
  onButtonClick,
  textWaves = [
    "poetry flows like rivers through the soul of time...",
    "words dance upon the page like autumn leaves...",
    "verses whisper secrets of the heart..."
  ]
}) => {
  return (
    <section 
      className="relative h-80 mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#4e6c6b] to-[#618b5f] flex items-center justify-center text-center border border-[#4e6c6b]/20"
      role="banner"
      aria-label="Hero section with call to action"
    >
      {/* Animated Text Waves Background */}
      <div 
        className="absolute inset-0 overflow-hidden opacity-10"
        aria-hidden="true"
      >
        {textWaves.map((text, index) => (
          <div
            key={index}
            className={`
              absolute font-[Cormorant_Garamond] text-2xl text-[#faf8f0] whitespace-nowrap opacity-70
              animate-[textWave_20s_linear_infinite]
              ${index === 1 ? 'top-[40%] animate-[textWave_20s_linear_infinite_-5s]' : ''}
              ${index === 2 ? 'top-[70%] animate-[textWave_20s_linear_infinite_-10s]' : ''}
            `}
            style={{
              animationDelay: index === 1 ? '-5s' : index === 2 ? '-10s' : '0s'
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-[#faf8f0] max-w-2xl px-8">
        <h1 className="font-[Cormorant_Garamond] text-4xl md:text-5xl font-semibold mb-6 leading-tight">
          {title}
        </h1>
        <button
          onClick={onButtonClick}
          className="
            bg-gradient-to-br from-[#a0522d] to-[#8b4513] text-white 
            px-8 py-3 rounded-full font-semibold text-base
            transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
            shadow-[0_5px_15px_rgba(160,82,45,0.4)]
            hover:translate-y-[-3px] hover:shadow-[0_8px_25px_rgba(160,82,45,0.5)]
            focus:outline-none focus:ring-4 focus:ring-[#a0522d]/30
          "
          aria-label={`${buttonText} - Open writing interface`}
        >
          {buttonText}
        </button>
      </div>

    </section>
  );
};

export default HeroSection;

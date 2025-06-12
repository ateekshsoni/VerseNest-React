import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './WriterComp.css'

/**
 * Poem Roulette section component with inspiration button
 * @param {function} onRouletteClick - Handler for roulette button click
 * @param {string} description - Description text for the roulette feature
 * @param {boolean} isLoading - Loading state for the roulette
 */
const PoemRoulette = ({ 
  onRouletteClick, 
  description = "Discover a random poem from our global collection",
  isLoading = false 
}) => {
  return (
    <section 
      className="mb-10"
      aria-labelledby="poem-roulette-heading"
    >
      <h3 
        id="poem-roulette-heading"
        className="font-poetry text-xl text-ivory-white mb-5 relative pb-2"
      >
        Feeling Inspired?
        <span 
          className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#c9b458] to-transparent"
          aria-hidden="true"
        />
      </h3>

      <div className="space-y-4">
        {/* Roulette Button */}
        <button
          onClick={onRouletteClick}
          disabled={isLoading}
          className={`
            rouletteGrad
            w-full p-4 bg-gradient-to-br from-antique-gold to-burnt-sienna text-sepia-ink
            rounded-verse-md font-semibold text-base flex items-center justify-center gap-3
            transition-bounce shadow-[0_5px_15px_rgba(201,180,88,0.3)]
            hover:translate-y-[-3px] hover:shadow-[0_8px_25px_rgba(201,180,88,0.4)]
            focus:outline-none focus:ring-4 focus:ring-antique-gold/30 focus:ring-offset-2 focus:ring-offset-desaturated-teal
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
            ${isLoading ? 'animate-pulse' : ''}
          `}
          aria-label="Get a random poem recommendation"
        >
          <FontAwesomeIcon icon={faRandom} />
          <span>
            {isLoading ? 'Finding your poem...' : 'Poem Roulette'}
          </span>
        </button>

        {/* Description */}
        <p className="text-sm text-ivory-white/70 text-center leading-relaxed">
          {description}
        </p>

        {/* Additional feature hint */}
        <div className="text-xs text-ivory-white/50 text-center space-y-1">
          <p>✨ Curated daily selections</p>
          <p>🌍 From poets worldwide</p>
        </div>
      </div>
    </section>
  );
};

export default PoemRoulette;

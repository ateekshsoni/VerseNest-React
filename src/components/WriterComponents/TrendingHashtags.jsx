import React from 'react';

/**
 * Hashtag component with hover effects
 * @param {string} tag - Hashtag text (with or without #)
 * @param {function} onClick - Click handler for hashtag
 * @param {string} className - Additional CSS classes
 */
const HashtagBadge = ({ tag, onClick, className = "" }) => {
  // Ensure hashtag starts with #
  const displayTag = tag.startsWith('#') ? tag : `#${tag}`;
  const hashtagId = tag.replace('#', '').toLowerCase();

  return (
    <button
      onClick={() => onClick?.(tag)}
      className={`
        group relative inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm
        transition-smooth border border-white/10 hover:bg-white/15 text-ivory-white
        focus:outline-none focus:ring-2 focus:ring-antique-gold/50 focus:ring-offset-2 focus:ring-offset-desaturated-teal
        ${className}
      `}
      aria-label={`View poems tagged with ${displayTag}`}
      role="button"
    >
      <span className="relative z-10">{displayTag}</span>
      
      {/* Animated underline effect */}
      <span 
        className="
          absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-[#c9b458] to-transparent
          transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10
        "
        aria-hidden="true"
      />
    </button>
  );
};

/**
 * Trending hashtags section component
 * @param {array} hashtags - Array of hashtag strings
 * @param {function} onHashtagClick - Click handler for hashtags
 */
const TrendingHashtags = ({ hashtags = [], onHashtagClick }) => {
  return (
    <section 
      className="mb-10"
      aria-labelledby="trending-hashtags-heading"
    >
      <h3 
        id="trending-hashtags-heading"
        className="font-poetry text-xl text-ivory-white mb-5 relative pb-2"
      >
        Trending Hashtags
        <span 
          className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#c9b458] to-transparent"
          aria-hidden="true"
        />
      </h3>

      <div 
        className="flex flex-wrap gap-3" 
        role="list"
        aria-label="Trending poetry hashtags"
      >
        {hashtags.map((hashtag, index) => (
          <HashtagBadge
            key={hashtag.id || index}
            tag={hashtag}
            onClick={onHashtagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingHashtags;

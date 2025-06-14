import React from 'react';

/**
 * Individual trending poet component
 * @param {string} name - Poet's display name
 * @param {string} specialty - Poet's specialty/style
 * @param {string} avatar - Avatar image URL
 * @param {boolean} isFollowing - Whether user is following this poet
 * @param {function} onFollow - Follow/unfollow handler
 */
const TrendingPoet = ({ 
  name, 
  specialty, 
  avatar, 
  isFollowing = false, 
  onFollow 
}) => {
  // Generate unique ID for accessibility
  const poetId = name ? name.toLowerCase().replace(/\s+/g, '-') : 'poet';

  return (
    <article 
      className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-verse-md transition-smooth border border-white/10 hover:bg-white/15 group"
      role="article"
      aria-labelledby={`poet-${poetId}`}
    >
      {/* Avatar */}
      <div className="relative mr-4 flex-shrink-0">
        <img
          src={avatar || '/Rabindranath.avif'}
          alt={`${name}'s profile picture`}
          className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-antique-gold/30 transition-smooth"
          loading="lazy"
          onError={(e) => {
            // Hide the broken image and show placeholder
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `
              <div class="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-lg border-2 border-transparent">
                ${name.charAt(0)}
              </div>
            `;
          }}
        />
        <div 
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" 
          aria-hidden="true"
          title="Active now"
        />
      </div>

      {/* Poet Info */}
      <div className="flex-grow min-w-0">
        <h4 
          id={`poet-${poetId}`}
          className="text-sm font-semibold text-ivory-white truncate mb-1 font-ui"
        >
          {name}
        </h4>
        <p className="text-xs text-ivory-white/70 truncate">
          {specialty}
        </p>
      </div>

      {/* Follow Button */}
      <button
        onClick={() => onFollow?.(name)}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-smooth border flex-shrink-0 ${
          isFollowing
            ? 'bg-antique-gold text-sepia-ink border-antique-gold hover:bg-antique-gold/80'
            : 'bg-transparent text-antique-gold border-antique-gold hover:bg-antique-gold hover:text-sepia-ink'
        }`}
        aria-label={`${isFollowing ? 'Unfollow' : 'Follow'} ${name}`}
        aria-pressed={isFollowing}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </article>
  );
};

export default TrendingPoet;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faBookmark, faShareSquare } from '@fortawesome/free-regular-svg-icons';

/**
 * Individual poem card component with various themes
 * @param {string} title - Poem title
 * @param {array} content - Array of poem stanzas
 * @param {object} author - Author information (name, username, avatar)
 * @param {string} timestamp - Publication timestamp
 * @param {number} likes - Number of likes
 * @param {number} comments - Number of comments
 * @param {boolean} isLiked - Whether the poem is liked by current user
 * @param {boolean} isBookmarked - Whether the poem is bookmarked by current user
 * @param {string} theme - Card theme (default, dark, vintage, minimal, ink-blot)
 * @param {function} onLike - Like button handler
 * @param {function} onComment - Comment button handler
 * @param {function} onBookmark - Bookmark button handler
 * @param {function} onShare - Share button handler
 */
const PoemCard = ({ 
  title,
  content = [],
  author = {},
  timestamp,
  likes = 0,
  comments = 0,
  isLiked = false,
  isBookmarked = false,
  theme = 'default',
  onLike,
  onComment,
  onBookmark,
  onShare
}) => {
  // Early return if essential props are missing
  if (!title || !Array.isArray(content)) {
    console.warn('PoemCard: Missing required props (title or content)');
    return null;
  }

  // Generate a unique ID for accessibility
  const cardId = title ? title.toLowerCase().replace(/\s+/g, '-') : 'poem-card';
  
  // Extract author information with defaults
  const authorName = author.name || 'Anonymous';
  const authorUsername = author.username || '@anonymous';
  const authorAvatar = author.avatar;

  // Theme-specific classes
  const getThemeClasses = () => {
    const baseClasses = `
      bg-[#faf8f0] rounded-xl p-6 transition-all duration-300 relative overflow-hidden
      border border-[#a0522d]/20 hover:translate-y-[-5px] hover:shadow-[0_10px_40px_rgba(62,39,35,0.1)]
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1
      before:bg-gradient-to-r before:from-[#a0522d] before:to-[#c9b458] before:opacity-0
      before:transition-opacity before:duration-300 hover:before:opacity-100
    `;

    switch (theme) {
      case 'dark':
        return `${baseClasses} !bg-[#3e2723] !text-[#faf8f0]`;
      case 'vintage':
        return `${baseClasses} !bg-[#f5ecd9] bg-[url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%23A0522D' fill-opacity='0.1'/%3E%3C/svg%3E")]`;
      case 'minimal':
        return `${baseClasses} !bg-[#faf8f0] !border-[#eee]`;
      case 'ink-blot':
        return `${baseClasses} after:content-[''] after:absolute after:bottom-[-50px] after:right-[-50px] after:w-36 after:h-36 after:bg-[#a0522d]/10 after:rounded-full after:z-0`;
      default:
        return baseClasses;
    }
  };

  const getContentClasses = () => {
    switch (theme) {
      case 'dark':
        return 'text-[#faf8f0]';
      case 'vintage':
        return 'text-[#3e2723]';
      case 'minimal':
        return 'text-center';
      default:
        return 'text-[#3e2723]';
    }
  };

  const getTitleClasses = () => {
    const baseClasses = 'font-[Cormorant_Garamond] text-xl font-semibold mb-4';
    switch (theme) {
      case 'dark':
        return `${baseClasses} text-[#faf8f0]`;
      case 'vintage':
        return `${baseClasses} text-[#a0522d] italic`;
      case 'minimal':
        return `${baseClasses} font-light tracking-[3px] uppercase text-base`;
      case 'ink-blot':
        return `${baseClasses} text-[#a0522d]`;
      default:
        return `${baseClasses} text-[#3e2723]`;
    }
  };

  const getUsernameClasses = () => {
    switch (theme) {
      case 'dark':
        return 'text-[rgba(250,248,240,0.7)]';
      default:
        return 'text-[#7d6e63]';
    }
  };

  const getActionClasses = () => {
    const baseClasses = 'border-t border-[#a0522d]/20 pt-4';
    switch (theme) {
      case 'dark':
        return `${baseClasses} !border-[rgba(250,248,240,0.2)]`;
      default:
        return baseClasses;
    }
  };

  const getActionButtonClasses = (isActive = false) => {
    const baseClasses = `
      flex items-center gap-2 transition-colors duration-300
      ${isActive ? 'text-[#a0522d]' : 'text-[#7d6e63] hover:text-[#a0522d]'}
    `;
    
    if (theme === 'dark') {
      return `${baseClasses} ${isActive ? '!text-[#c9b458]' : '!text-[rgba(250,248,240,0.7)] hover:!text-[#c9b458]'}`;
    }
    
    return baseClasses;
  };

  return (
    <article 
      className={getThemeClasses()}
      role="article"
      aria-labelledby={`poem-title-${cardId}`}
      aria-describedby={`poem-content-${cardId}`}
    >
      {/* Poem Header */}
      <header className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          {/* Author Avatar */}
          <img
            src={authorAvatar || '/Rabindranath.avif'}
            alt={`Profile picture of ${authorName}`}
            className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-[#c9b458]"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/Rabindranath.avif';
            }}
          />
          
          {/* Author Info */}
          <div>
            <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-[#faf8f0]' : 'text-[#3e2723]'}`}>
              {authorName}
            </h3>
            <span className={`text-sm ${getUsernameClasses()}`}>
              {authorUsername}
            </span>
          </div>
        </div>
        
        {/* Timestamp */}
        <time 
          className={`text-sm ${getUsernameClasses()}`}
          dateTime={timestamp}
        >
          {timestamp}
        </time>
      </header>

      {/* Poem Content */}
      <div 
        className={`mb-6 relative z-10 ${getContentClasses()}`}
        id={`poem-content-${cardId}`}
      >
        <h4 
          className={getTitleClasses()}
          id={`poem-title-${cardId}`}
        >
          {title}
        </h4>
        
        <div className="font-[Cormorant_Garamond] text-lg leading-relaxed space-y-4">
          {content.map((stanza, index) => (
            <p key={index} className="whitespace-pre-line">
              {stanza}
            </p>
          ))}
        </div>
      </div>

      {/* Poem Actions */}
      <footer className={`flex gap-6 ${getActionClasses()}`}>
        <button
          onClick={() => onLike?.()}
          className={getActionButtonClasses(isLiked)}
          aria-label={`${isLiked ? 'Unlike' : 'Like'} this poem`}
          aria-pressed={isLiked}
        >
          <FontAwesomeIcon icon={faHeart} className="text-lg" />
          <span>{likes}</span>
        </button>

        <button
          onClick={() => onComment?.()}
          className={getActionButtonClasses()}
          aria-label={`Comment on this poem (${comments} comments)`}
        >
          <FontAwesomeIcon icon={faComment} className="text-lg" />
          <span>{comments}</span>
        </button>

        <button
          onClick={() => onBookmark?.()}
          className={getActionButtonClasses(isBookmarked)}
          aria-label={`${isBookmarked ? 'Remove from' : 'Add to'} bookmarks`}
          aria-pressed={isBookmarked}
        >
          <FontAwesomeIcon icon={faBookmark} className="text-lg" />
        </button>

        <button
          onClick={() => onShare?.()}
          className={getActionButtonClasses()}
          aria-label="Share this poem"
        >
          <FontAwesomeIcon icon={faShareSquare} className="text-lg" />
        </button>
      </footer>
    </article>
  );
};

export default PoemCard;

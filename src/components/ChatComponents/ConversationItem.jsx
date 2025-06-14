/**
 * ConversationItem Component
 * 
 * Individual conversation item in the sidebar list
 * Features elegant hover effects and status indicators
 * 
 * Features:
 * - Profile picture with online status indicator
 * - Name display with elegant typography
 * - Last message preview with truncation
 * - Timestamp display
 * - Hover animations and active state styling
 * - Accessibility support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.conversation - Conversation data object
 * @param {boolean} props.isActive - Whether this conversation is currently active
 * @param {number} props.animationDelay - Animation delay in milliseconds
 * @param {Function} props.onSelect - Callback when conversation is selected
 */

import React from 'react';
import AvatarPlaceholder from '../ui/AvatarPlaceholder';

const ConversationItem = ({ 
  conversation, 
  isActive, 
  animationDelay = 0, 
  onSelect 
}) => {
  const { name, picture, lastMessage, time, isOnline } = conversation;

  /**
   * Handle conversation selection
   */
  const handleClick = () => {
    onSelect();
  };

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative flex items-center p-4 rounded-xl cursor-pointer
        transition-all duration-300 ease-out group
        hover:transform hover:-translate-y-0.5 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2
        ${isActive 
          ? 'bg-orange-100/80 shadow-md' 
          : 'bg-amber-100/50 hover:bg-amber-100/80'
        }
        
        /* Ornamental background pattern */
        before:absolute before:inset-0 before:rounded-xl before:opacity-10
        before:bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M30,10 Q50,5 70,20 Q90,40 80,70 Q70,90 40,85 Q10,80 10,50 Q10,20 30,10\' fill=\'none\' stroke=\'%238c7566\' stroke-width=\'0.5\'/%3E%3C/svg%3E')]
        before:bg-[length:100px] before:bg-no-repeat before:bg-bottom-right
      `}
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
      aria-label={`Conversation with ${name}. Last message: ${lastMessage}. ${time}`}
    >
      {/* Profile Picture with Status */}
      <div className="relative flex-shrink-0 mr-4">
        <div className={`
          w-12 h-12 rounded-full overflow-hidden border-2 transition-colors duration-200
          ${isActive ? 'border-amber-400' : 'border-amber-300 group-hover:border-amber-400'}
        `}>
          {picture ? (
            <img
              src={picture}
              alt={`${name} profile picture`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <AvatarPlaceholder 
            name={name} 
            size="w-12 h-12" 
            className={picture ? 'hidden' : ''}
          />
        </div>
        
        {/* Online Status Indicator */}
        {isOnline && (
          <div 
            className="
              absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 
              border-2 border-white rounded-full
              animate-pulse
            "
            aria-hidden="true"
          />
        )}
      </div>

      {/* Conversation Details */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <h3 className={`
          font-serif text-lg font-bold mb-0.5 transition-colors duration-200
          ${isActive ? 'text-amber-900' : 'text-amber-800 group-hover:text-amber-900'}
        `}>
          {name}
        </h3>

        {/* Last Message Preview */}
        <p className={`
          text-sm leading-relaxed transition-colors duration-200
          ${isActive ? 'text-amber-700' : 'text-amber-600 group-hover:text-amber-700'}
          overflow-hidden text-ellipsis whitespace-nowrap
          max-w-[180px]
        `}>
          {lastMessage}
        </p>

        {/* Timestamp */}
        <span className={`
          text-xs italic transition-colors duration-200
          ${isActive ? 'text-amber-600' : 'text-amber-500 group-hover:text-amber-600'}
        `}>
          {time}
        </span>
      </div>

      {/* Hover Effect Indicator */}
      <div className={`
        absolute right-2 top-1/2 transform -translate-y-1/2
        w-2 h-2 rounded-full transition-all duration-200
        ${isActive 
          ? 'bg-amber-400 scale-100' 
          : 'bg-amber-300/50 scale-0 group-hover:scale-100'
        }
      `} />
    </div>
  );
};

export default ConversationItem;

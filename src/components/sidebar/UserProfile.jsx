import React from "react";
import OptimizedImage from "../ui/OptimizedImage";

/**
 * Reusable user profile component for sidebar
 * @param {string} name - User's display name
 * @param {string} title - User's title or role
 * @param {string} avatarSrc - URL to user's avatar image
 * @param {string} avatarAlt - Alt text for avatar image
 * @param {function} onClick - Optional click handler for profile interaction
 * @param {string} className - Additional CSS classes
 */
const UserProfile = ({ 
  name = "Guest User", 
  title = "Poetry Enthusiast",
  avatarSrc = "/Rabindranath.avif",
  avatarAlt = "User avatar",
  onClick,
  className = "" 
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={`
        flex items-center p-4 bg-[#faf8f01a] mt-auto border border-[#faf8f01a] 
        rounded-lg transition-all duration-200 hover:bg-[#faf8f025] cursor-pointer
        ${className}
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`User profile for ${name}, ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
    >
      {/* Avatar */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-[#c9b458] flex-shrink-0">
        <OptimizedImage 
          className="object-cover w-full h-full" 
          src={avatarSrc} 
          alt={avatarAlt}
          loading="lazy"
          fallbackText={name?.charAt(0) || 'U'}
          width={48}
          height={48}
        />
      </div>
      
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[#faf8f0] font-semibold text-sm truncate">
          {name}
        </h3>
        <p className="text-[#faf8f0] opacity-75 text-xs truncate">
          {title}
        </p>
      </div>
      
      {/* Optional dropdown indicator */}
      <div className="ml-2 opacity-50">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </div>
    </div>
  );
};

export default UserProfile;

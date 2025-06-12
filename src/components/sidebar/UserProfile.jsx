import React from "react";

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
        <img 
          className="object-cover w-full h-full" 
          src={avatarSrc} 
          alt={avatarAlt}
          loading="lazy"
          onError={(e) => {
            // Fallback to a default avatar if image fails to load
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNjOWI0NTgiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC4xMzQwMSAxNCA1IDE3LjEzNDUgNSAyMUg5QzE5IDIxIDIwIDIxIDE5IDIxSDE5QzE5IDE3LjEzNDUgMTUuODY2IDE0IDEyIDE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=";
          }}
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

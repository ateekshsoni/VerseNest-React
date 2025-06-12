import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Reusable navigation item component for sidebar
 * @param {object} icon - FontAwesome icon object
 * @param {string} label - Display text for the navigation item
 * @param {string} href - URL or route for navigation
 * @param {boolean} isActive - Whether this nav item is currently active
 * @param {number} badgeCount - Optional badge count for notifications
 * @param {function} onClick - Optional click handler
 * @param {string} className - Additional CSS classes
 */
const NavigationItem = ({ 
  icon, 
  label, 
  href = "#", 
  isActive = false, 
  badgeCount = null,
  onClick,
  className = "" 
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <li className={`${isActive ? 'bg-[#c9b45826]' : ''} ${className}`}>
      <a 
        href={href}
        onClick={handleClick}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
          hover:bg-[#c9b45826] hover:text-[#c9b458]
          ${isActive ? 'text-[#c9b458]' : 'text-[#faf8f0]'}
        `}
        aria-label={`Navigate to ${label}${badgeCount ? ` (${badgeCount} notifications)` : ''}`}
      >
        {/* Icon */}
        <FontAwesomeIcon 
          icon={icon} 
          className={`text-lg ${isActive ? 'text-[#c9b458]' : ''}`}
          aria-hidden="true"
        />
        
        {/* Label */}
        <span className="font-medium">{label}</span>
        
        {/* Badge for notifications */}
        {badgeCount && badgeCount > 0 && (
          <span 
            className="bg-[#a0522d] text-white text-xs px-2 py-0.5 rounded-full ml-auto"
            aria-label={`${badgeCount} unread notifications`}
          >
            {badgeCount}
          </span>
        )}
      </a>
    </li>
  );
};

export default NavigationItem;

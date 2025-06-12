import React from 'react';

/**
 * Feed header component with title and filter buttons
 * @param {string} title - Feed section title
 * @param {array} filters - Array of filter options
 * @param {string} activeFilter - Currently active filter
 * @param {function} onFilterChange - Filter change handler
 */
const FeedHeader = ({ 
  title = "Your Poetic Feed",
  filters = ['Following', 'Discover'],
  activeFilter = 'Following',
  onFilterChange
}) => {
  return (
    <header 
      className="flex justify-between items-center mb-8 pb-4 border-b border-[#a0522d]/20"
      role="banner"
      aria-label="Feed navigation"
    >
      {/* Feed Title */}
      <h2 className="font-[Cormorant_Garamond] text-[#3e2723] text-3xl font-semibold">
        {title}
      </h2>

      {/* Filter Buttons */}
      <nav 
        className="flex gap-4"
        role="navigation" 
        aria-label="Feed filters"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange?.(filter)}
            className={`
              text-sm px-4 py-2 rounded-2xl transition-all duration-300
              ${activeFilter === filter 
                ? 'bg-[rgba(196,166,159,0.15)] text-[#a0522d] opacity-100' 
                : 'text-[#5d4037] opacity-70 hover:opacity-100'
              }
            `}
            aria-pressed={activeFilter === filter}
            aria-label={`Filter by ${filter}`}
          >
            {filter}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default FeedHeader;

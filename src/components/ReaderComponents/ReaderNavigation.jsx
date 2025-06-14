/**
 * ReaderNavigation Component
 * 
 * Responsive navigation bar for the reader experience
 * Features search f          <button
            className="p-1 rounded-lg hover:bg-amber-100/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label="User menu"
          >
            <AvatarPlaceholder 
              name="User" 
              size={32} 
              className="border-2 border-amber-300 hover:border-amber-400 transition-colors duration-200"
            />
          </button>d user actions
 * 
 * Features:
 * - Responsive design with mobile adaptations
 * - Search functionality with icon
 * - Notification, messages, and bookmark quick access
 * - User avatar dropdown
 * - Accessibility with proper ARIA labels
 * 
 * @component
 * @example
 * <ReaderNavigation />
 */

import React, { useState } from 'react';
import { Search, Bell, MessageCircle, Bookmark } from 'lucide-react';
import AvatarPlaceholder from './AvatarPlaceholder';

const ReaderNavigation = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  /**
   * Handle search input changes
   * @param {Event} e - Input change event
   */
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  /**
   * Handle search form submission
   * @param {Event} e - Form submit event
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // TODO: Implement search functionality
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-amber-50/80 backdrop-blur-md border-b border-amber-200" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-amber-900 font-serif">
          <span className="text-amber-700">Verse</span>Nest
        </h1>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className={`relative transition-all duration-200 ${isSearchFocused ? 'scale-105' : ''}`}>
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600 pointer-events-none" 
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search poems, poets, or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-200 rounded-xl 
                       focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none
                       text-amber-900 placeholder-amber-500 transition-all duration-200
                       hover:border-amber-300"
              aria-label="Search poems, poets, or tags"
            />
          </div>
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <button
          className="relative p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 
                   rounded-lg transition-all duration-200 group"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" 
                aria-hidden="true"></span>
        </button>

        {/* Messages */}
        <button
          className="relative p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 
                   rounded-lg transition-all duration-200 group"
          aria-label="View messages"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Bookmarks */}
        <button
          className="relative p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 
                   rounded-lg transition-all duration-200 group"
          aria-label="View bookmarks"
        >
          <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-amber-100 transition-colors duration-200"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-300 hover:border-amber-400 transition-colors duration-200">
              <img
                src="img/Rabindranath.avif"
                alt="User profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Hide the broken image and show placeholder
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm">
                      U
                    </div>
                  `;
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ReaderNavigation;

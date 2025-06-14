/**
 * ChatHeader Component
 * 
 * Header section of the chat area showing conversation info and controls
 * Features participant details and mobile navigation toggle
 * 
 * Features:
 * - Active conversation participant info
 * - Profile picture and status display
 * - Mobile sidebar toggle button
 * - Elegant backdrop blur styling
 * - Accessibility compliance
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.activeConversation - Current active conversation
 * @param {boolean} props.isMobile - Whether in mobile view
 * @param {boolean} props.isSidebarHidden - Whether sidebar is hidden
 * @param {Function} props.onToggleSidebar - Callback for toggling sidebar
 */

import React from 'react';
import { Menu, MoreVertical } from 'lucide-react';
import AvatarPlaceholder from '../ui/AvatarPlaceholder';

const ChatHeader = ({
  activeConversation,
  isMobile,
  isSidebarHidden,
  onToggleSidebar
}) => {
  const { name, picture, isOnline } = activeConversation;

  return (
    <header className="
      relative px-6 py-4 border-b border-amber-200/20
      bg-white/70 backdrop-blur-lg z-10
    ">
      <div className="flex items-center justify-between">
        {/* Left Section - Mobile Toggle + Participant Info */}
        <div className="flex items-center space-x-4">
          {/* Mobile Sidebar Toggle */}
          {isMobile && (
            <button
              onClick={onToggleSidebar}
              className="
                p-2 rounded-lg text-amber-600 hover:text-amber-800
                hover:bg-amber-100/50 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-400/50
              "
              aria-label={isSidebarHidden ? 'Show conversations' : 'Hide conversations'}
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Participant Profile */}
          <div className="flex items-center space-x-3">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-300">
                {picture ? (
                  <img
                    src={picture}
                    alt={`${name} profile picture`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <AvatarPlaceholder 
                  name={name} 
                  size="w-10 h-10" 
                  className={picture ? 'hidden' : ''}
                />
              </div>
              
              {/* Online Status */}
              {isOnline && (
                <div 
                  className="
                    absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 
                    border-2 border-white rounded-full
                  "
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Participant Details */}
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-900">
                {name}
              </h2>
              <p className="text-sm text-amber-600 italic">
                {isOnline ? 'Last seen writing poetry at dawn' : 'Away from their quill'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Action Menu */}
        <div className="flex items-center space-x-2">
          <button
            className="
              p-2 rounded-lg text-amber-600 hover:text-amber-800
              hover:bg-amber-100/50 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-amber-400/50
            "
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </header>
  );
};

export default ChatHeader;

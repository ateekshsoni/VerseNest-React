/**
 * ConversationSidebar Component
 * 
 * Left sidebar containing conversation list and search functionality
 * Features elegant ornamental design inspired by classical literature
 * 
 * Features:
 * - Search functionality with ornate styling
 * - Conversation list with online status indicators
 * - Responsive behavior with mobile support
 * - Smooth animations and transitions
 * - Accessibility compliance
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.conversations - Array of conversation objects
 * @param {Object} props.activeConversation - Currently active conversation
 * @param {string} props.searchQuery - Current search query
 * @param {boolean} props.isHidden - Whether sidebar is hidden (mobile)
 * @param {boolean} props.isMobile - Whether in mobile view
 * @param {Function} props.onConversationSelect - Callback for conversation selection
 * @param {Function} props.onSearchChange - Callback for search input change
 */

import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import ConversationItem from './ConversationItem';

const ConversationSidebar = forwardRef(({
  conversations,
  activeConversation,
  searchQuery,
  isHidden,
  isMobile,
  onConversationSelect,
  onSearchChange
}, ref) => {
  /**
   * Handle search input change
   * @param {Event} e - Input change event
   */
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  /**
   * Filter conversations based on search query
   * @returns {Array} Filtered conversations
   */
  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      ref={ref}
      className={`
        w-80 min-w-80 h-full bg-white/70 backdrop-blur-lg border-r border-amber-200/20
        transition-transform duration-300 ease-in-out z-30
        ${isMobile 
          ? `fixed inset-y-0 left-0 ${isHidden ? '-translate-x-full' : 'translate-x-0'}` 
          : isHidden ? 'hidden' : 'flex'
        }
        flex flex-col
      `}
      role="complementary"
      aria-label="Conversations sidebar"
    >
      {/* Search Container */}
      <div className="p-5 border-b border-amber-200/20">
        <div className="relative">
          {/* Ornate Frame */}
          <div className="
            relative p-3 bg-amber-100/50 rounded-xl shadow-sm overflow-hidden
            before:absolute before:content-[''] before:w-10 before:h-10
            before:top-[-10px] before:left-[-10px] before:opacity-20
            before:bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238c7566\' stroke-width=\'1\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z\'/%3E%3Cpath d=\'M12 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z\'/%3E%3C/svg%3E')]
            after:absolute after:content-[''] after:w-10 after:h-10
            after:bottom-[-10px] after:right-[-10px] after:opacity-20
            after:bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238c7566\' stroke-width=\'1\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z\'/%3E%3Cpath d=\'M12 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z\'/%3E%3C/svg%3E')]
          ">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-amber-600/70" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="
                  w-full pl-10 pr-4 py-2 bg-transparent
                  font-serif text-base text-amber-900
                  placeholder:text-amber-600/60 placeholder:italic
                  border-none outline-none focus:ring-0
                "
                aria-label="Search conversations"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div 
        className="flex-1 overflow-y-auto p-2.5 space-y-2.5"
        role="list"
        aria-label="Conversation list"
      >
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8 text-amber-600/60 italic">
            No conversations found
          </div>
        ) : (
          filteredConversations.map((conversation, index) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversation?.id}
              animationDelay={index * 100}
              onSelect={() => onConversationSelect(conversation)}
            />
          ))
        )}
      </div>

      {/* Footer - Hidden on Mobile */}
      {!isMobile && (
        <div className="p-4 border-t border-amber-200/20 text-center">
          <p className="text-xs text-amber-600/60 italic">
            Connect through the art of words
          </p>
        </div>
      )}
    </aside>
  );
});

ConversationSidebar.displayName = 'ConversationSidebar';

export default ConversationSidebar;

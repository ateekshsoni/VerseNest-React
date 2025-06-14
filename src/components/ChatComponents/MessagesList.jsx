/**
 * MessagesList Component
 * 
 * Scrollable container for displaying chat messages
 * Features smooth animations and auto-scroll functionality
 * 
 * Features:
 * - Auto-scroll to latest messages
 * - Smooth message animations
 * - Responsive message layout
 * - Message grouping and styling
 * - Accessibility support with proper ARIA labels
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {Object} props.activeConversation - Current active conversation
 * @param {Object} props.messagesEndRef - Ref for auto-scroll target
 */

import React from 'react';
import MessageBubble from './MessageBubble';

const MessagesList = ({
  messages,
  activeConversation,
  messagesEndRef
}) => {
  return (
    <div 
      className="
        flex-1 overflow-y-auto px-6 py-6 space-y-4
        scrollbar-thin scrollbar-thumb-amber-300/50 scrollbar-track-transparent
        relative z-10
      "
      role="log"
      aria-label="Message history"
      aria-live="polite"
    >
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-xl font-serif text-amber-800 mb-2">
            Begin your literary conversation
          </h3>
          <p className="text-amber-600 italic max-w-md mx-auto">
            Share your thoughts, poems, or simply exchange pleasantries 
            with {activeConversation.name}
          </p>
        </div>
      )}

      {/* Messages */}
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1];
        const isGrouped = prevMessage && 
          prevMessage.sender === message.sender && 
          prevMessage.isReceived === message.isReceived;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isGrouped={isGrouped}
            animationDelay={index * 50}
          />
        );
      })}

      {/* Auto-scroll target */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;

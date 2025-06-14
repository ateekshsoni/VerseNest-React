/**
 * MessageBubble Component
 * 
 * Individual message bubble with elegant styling
 * Supports both sent and received message types
 * 
 * Features:
 * - Distinctive styling for sent vs received messages
 * - Smooth entrance animations
 * - Responsive design with proper spacing
 * - Timestamp display
 * - Message grouping support
 * - Accessibility compliance
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object containing text, sender, time, etc.
 * @param {boolean} props.isGrouped - Whether this message is grouped with previous
 * @param {number} props.animationDelay - Animation delay in milliseconds
 */

import React from 'react';

const MessageBubble = ({ 
  message, 
  isGrouped = false, 
  animationDelay = 0 
}) => {
  const { text, time, isReceived, sender } = message;

  return (
    <div
      className={`
        flex items-end space-x-2 animate-fade-in-up
        ${isReceived ? 'justify-start' : 'justify-end'}
        ${isGrouped ? 'mt-1' : 'mt-4'}
      `}
      style={{
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Message Content */}
      <div
        className={`
          max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl
          transition-all duration-200 hover:scale-[1.02]
          ${isReceived 
            ? 'bg-amber-100/80 text-amber-900 rounded-bl-md' 
            : 'bg-orange-200/80 text-orange-900 rounded-br-md'
          }
          shadow-sm hover:shadow-md
        `}
        role="article"
        aria-label={`${isReceived ? 'Received' : 'Sent'} message from ${sender}`}
      >
        {/* Message Text */}
        <p className="text-base leading-relaxed font-serif whitespace-pre-wrap">
          {text}
        </p>

        {/* Timestamp */}
        <div className={`
          mt-2 text-xs italic opacity-70
          ${isReceived ? 'text-left' : 'text-right'}
        `}>
          {time}
        </div>
      </div>

      {/* Message Status Indicator (for sent messages) */}
      {!isReceived && (
        <div className="flex items-end pb-1">
          <div className="w-2 h-2 bg-orange-400/50 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

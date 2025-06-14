/**
 * ChatArea Component
 * 
 * Main chat interface containing header, messages, and input
 * Provides the primary messaging experience with elegant design
 * 
 * Features:
 * - Chat header with participant info and mobile controls
 * - Scrollable messages container with smooth animations
 * - Message input with auto-resize and send functionality
 * - Responsive design with mobile optimizations
 * - Accessibility compliance with proper ARIA labels
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.activeConversation - Current active conversation
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isMobile - Whether in mobile view
 * @param {boolean} props.isSidebarHidden - Whether sidebar is hidden
 * @param {Function} props.onSendMessage - Callback for sending messages
 * @param {Function} props.onToggleSidebar - Callback for toggling sidebar
 */

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Send } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';

const ChatArea = ({
  activeConversation,
  messages,
  isMobile,
  isSidebarHidden,
  onSendMessage,
  onToggleSidebar
}) => {
  // Message input state
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Refs for auto-scroll functionality
  const messagesEndRef = useRef(null);

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Scroll messages container to bottom
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'nearest'
    });
  };

  /**
   * Handle message input change
   * @param {string} value - New input value
   */
  const handleMessageChange = (value) => {
    setMessageText(value);
    
    // Show typing indicator
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      // Hide typing indicator after user stops typing
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  /**
   * Handle sending a message
   */
  const handleSendMessage = () => {
    const trimmedText = messageText.trim();
    
    if (!trimmedText) return;

    // Send the message
    onSendMessage(trimmedText);
    
    // Clear input
    setMessageText('');
    setIsTyping(false);
  };

  /**
   * Handle Enter key press in message input
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-amber-50/30">
        <div className="text-center">
          <div className="text-6xl mb-4">💌</div>
          <h2 className="text-2xl font-serif text-amber-800 mb-2">
            Select a conversation
          </h2>
          <p className="text-amber-600 italic">
            Choose a literary companion to begin your dialogue
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 flex flex-col bg-amber-50/30 relative"
      role="main"
      aria-label={`Chat with ${activeConversation.name}`}
    >
      {/* Ornamental Background Pattern */}
      <div className="
        absolute inset-0 opacity-10 pointer-events-none
        bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Cpath d=\'M20,50 Q60,20 100,50 Q140,80 180,50 Q160,100 180,150 Q140,120 100,150 Q60,180 20,150 Q40,100 20,50\' fill=\'none\' stroke=\'%23e6c0a8\' stroke-width=\'1\'/%3E%3C/svg%3E')]
        bg-[length:200px] bg-repeat
      " />

      {/* Chat Header */}
      <ChatHeader
        activeConversation={activeConversation}
        isMobile={isMobile}
        isSidebarHidden={isSidebarHidden}
        onToggleSidebar={onToggleSidebar}
      />

      {/* Messages Container */}
      <MessagesList
        messages={messages}
        activeConversation={activeConversation}
        messagesEndRef={messagesEndRef}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-6 py-2">
          <div className="flex items-center space-x-2 text-amber-600 text-sm italic">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <span>You are typing...</span>
          </div>
        </div>
      )}

      {/* Message Input */}
      <MessageInput
        value={messageText}
        onChange={handleMessageChange}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        disabled={!activeConversation}
      />
    </div>
  );
};

export default ChatArea;

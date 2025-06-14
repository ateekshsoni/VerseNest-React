/**
 * MessageInput Component
 * 
 * Input area for composing and sending messages
 * Features auto-resize textarea and elegant send button
 * 
 * Features:
 * - Auto-resizing textarea that grows with content
 * - Elegant ornamental styling matching the theme
 * - Send button with hover effects
 * - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
 * - Accessibility compliance with proper ARIA labels
 * - Disabled state handling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Callback for input changes
 * @param {Function} props.onSend - Callback for sending message
 * @param {Function} props.onKeyPress - Callback for key press events
 * @param {boolean} props.disabled - Whether the input is disabled
 */

import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  disabled = false
}) => {
  const textareaRef = useRef(null);

  /**
   * Auto-resize textarea based on content
   */
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight with min/max constraints
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 40), 120);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  /**
   * Handle key press events
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    onKeyPress(e);
  };

  /**
   * Handle send button click
   */
  const handleSendClick = () => {
    if (!disabled && value.trim()) {
      onSend();
    }
  };

  const isMessageEmpty = !value.trim();

  return (
    <div className="
      p-5 bg-white/70 backdrop-blur-lg border-t border-amber-200/20
      relative z-10
    ">
      {/* Input Container with Ornamental Styling */}
      <div className="
        relative flex items-end space-x-3 bg-amber-100/50 rounded-xl p-3
        shadow-sm focus-within:shadow-md transition-shadow duration-200
        
        /* Ornamental background pattern */
        before:absolute before:inset-0 before:rounded-xl before:opacity-20
        before:bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M10,10 Q30,5 50,10 Q70,15 90,10 Q95,30 90,50 Q85,70 90,90 Q70,85 50,90 Q30,95 10,90 Q5,70 10,50 Q15,30 10,10\' fill=\'none\' stroke=\'%238c7566\' stroke-width=\'0.5\'/%3E%3C/svg%3E')]
        before:bg-[length:100px] before:bg-no-repeat before:bg-center
      ">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          disabled={disabled}
          placeholder="Compose your message..."
          className="
            flex-1 bg-transparent border-none outline-none resize-none
            font-serif text-base text-amber-900 leading-relaxed
            placeholder:text-amber-600/60 placeholder:italic
            min-h-[40px] max-h-[120px] py-2
            disabled:opacity-50 disabled:cursor-not-allowed
            relative z-10
          "
          aria-label="Type your message"
          rows={1}
        />

        {/* Send Button */}
        <button
          onClick={handleSendClick}
          disabled={disabled || isMessageEmpty}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200 relative z-10
            focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2
            ${disabled || isMessageEmpty
              ? 'bg-amber-200/50 text-amber-400 cursor-not-allowed'
              : 'bg-orange-200/80 text-orange-700 hover:bg-orange-300/80 hover:scale-105 active:scale-95'
            }
          `}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-2 text-xs text-amber-600/60 italic text-center">
        Press Enter to send • Shift + Enter for new line
      </div>

      {/* Decorative Elements */}
      <div className="mt-3 flex justify-center space-x-2 opacity-30">
        <div className="w-6 h-0.5 bg-amber-400 rounded-full" />
        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
        <div className="w-6 h-0.5 bg-amber-400 rounded-full" />
      </div>
    </div>
  );
};

export default MessageInput;

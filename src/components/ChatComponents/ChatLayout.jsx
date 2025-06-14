/**
 * ChatLayout Component
 * 
 * Main layout container for the VerseNest messaging interface
 * Provides a literary-themed chat experience with elegant design
 * 
 * Features:
 * - Responsive two-panel layout (sidebar + chat area)
 * - Literary ornamental design elements
 * - Mobile-friendly responsive behavior
 * - Accessibility compliance with ARIA landmarks
 * - SEO-optimized semantic structure
 * 
 * @component
 * @example
 * <ChatLayout />
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';
import ConversationSidebar from './ConversationSidebar';
import ChatArea from './ChatArea';

/**
 * Sample conversations data
 * In production, this would come from an API or state management
 */
const sampleConversations = [
  {
    id: 1,
    name: "Elizabeth Bennet",
    picture: null, // Will use AvatarPlaceholder
    lastMessage: "I declare after all there is no enjoyment like reading!",
    time: "9:45 AM",
    isActive: true,
    isOnline: true,
  },
  {
    id: 2,
    name: "Mr. Darcy",
    picture: null, // Will use AvatarPlaceholder
    lastMessage: "In vain I have struggled. It will not do. My feelings will not be repressed.",
    time: "Yesterday",
    isActive: false,
    isOnline: false,
  },
  {
    id: 3,
    name: "Jane Austen",
    picture: null, // Will use AvatarPlaceholder
    lastMessage: "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.",
    time: "Tuesday",
    isActive: false,
    isOnline: true,
  },
  {
    id: 4,
    name: "Emily Dickinson",
    picture: null, // Will use AvatarPlaceholder
    lastMessage: "Hope is the thing with feathers that perches in the soul.",
    time: "Monday",
    isActive: false,
    isOnline: false,
  },
  {
    id: 5,
    name: "Oscar Wilde",
    picture: null, // Will use AvatarPlaceholder
    lastMessage: "To live is the rarest thing in the world. Most people exist, that is all.",
    time: "Last week",
    isActive: false,
    isOnline: true,
  },
];

/**
 * Sample messages for the active conversation
 */
const sampleMessages = [
  {
    id: 1,
    sender: "Elizabeth Bennet",
    text: "I hope you are having a pleasant day. The gardens are particularly beautiful this morning.",
    time: "9:30 AM",
    isReceived: true,
  },
  {
    id: 2,
    sender: "You",
    text: "Indeed, the roses are in full bloom. Would you care to join me for a stroll later?",
    time: "9:35 AM",
    isReceived: false,
  },
  {
    id: 3,
    sender: "Elizabeth Bennet",
    text: "That would be delightful! I have been reading the most fascinating book of poetry and would love to discuss it with you.",
    time: "9:40 AM",
    isReceived: true,
  },
  {
    id: 4,
    sender: "You",
    text: "I look forward to hearing your thoughts. Poetry has a way of expressing what ordinary words cannot.",
    time: "9:42 AM",
    isReceived: false,
  },
  {
    id: 5,
    sender: "Elizabeth Bennet",
    text: "I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!",
    time: "9:45 AM",
    isReceived: true,
  },
];

const ChatLayout = () => {
  // State management
  const [conversations, setConversations] = useState(sampleConversations);
  const [messages, setMessages] = useState(sampleMessages);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for responsive behavior
  const sidebarRef = useRef(null);

  /**
   * Handle window resize for responsive behavior
   */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-hide sidebar on mobile
      if (mobile) {
        setIsSidebarHidden(true);
      } else {
        setIsSidebarHidden(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handle conversation selection
   * @param {Object} conversation - Selected conversation object
   */
  const handleConversationSelect = (conversation) => {
    // Update active conversation
    setActiveConversation(conversation);
    
    // Update conversations state to reflect active status
    setConversations(prevConversations =>
      prevConversations.map(conv => ({
        ...conv,
        isActive: conv.id === conversation.id
      }))
    );

    // Auto-hide sidebar on mobile after selection
    if (isMobile) {
      setIsSidebarHidden(true);
    }
  };

  /**
   * Handle search input change
   * @param {string} query - Search query string
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // TODO: Implement search filtering logic
  };

  /**
   * Handle sending new messages
   * @param {string} messageText - Message content
   */
  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: messageText,
      time: getCurrentTime(),
      isReceived: false,
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate reply after a delay
    setTimeout(() => {
      simulateReply();
    }, 1000 + Math.random() * 2000);
  };

  /**
   * Simulate an automated reply from the active conversation
   */
  const simulateReply = () => {
    const replies = [
      "How fascinating! I had not considered that perspective before.",
      "Indeed, the beauty of language is in its ability to convey the deepest emotions.",
      "I find myself in complete agreement with your sentiment.",
      "What a delightful observation! It reminds me of a passage I read recently.",
      "Your words have a poetic quality that I find most refreshing.",
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const replyMessage = {
      id: Date.now() + 1,
      sender: activeConversation.name,
      text: randomReply,
      time: getCurrentTime(),
      isReceived: true,
    };

    setMessages(prev => [...prev, replyMessage]);
  };

  /**
   * Get current time in 12-hour format
   * @returns {string} Formatted time string
   */
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  /**
   * Toggle sidebar visibility
   */
  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* SEO Meta Information */}
      <div className="sr-only">
        <h1>VerseNest Poetry Messenger</h1>
        <p>Connect with fellow poets and literature enthusiasts through our elegant messaging platform</p>
      </div>

      {/* Main Chat Container */}
      <div 
        className="flex h-full relative"
        role="main"
        aria-label="Poetry messaging interface"
      >
        {/* Conversation Sidebar */}
        <ConversationSidebar
          ref={sidebarRef}
          conversations={conversations}
          activeConversation={activeConversation}
          searchQuery={searchQuery}
          isHidden={isSidebarHidden}
          isMobile={isMobile}
          onConversationSelect={handleConversationSelect}
          onSearchChange={handleSearchChange}
        />

        {/* Chat Area */}
        <ChatArea
          activeConversation={activeConversation}
          messages={messages}
          isMobile={isMobile}
          isSidebarHidden={isSidebarHidden}
          onSendMessage={handleSendMessage}
          onToggleSidebar={toggleSidebar}
        />

        {/* Mobile Overlay */}
        {isMobile && !isSidebarHidden && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;

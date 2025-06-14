/**
 * InboxPage Component
 * 
 * React implementation of the VerseNest messaging interface
 * Converted from vanilla HTML/CSS/JS to modern React architecture
 * 
 * Features:
 * - Complete messaging interface using reusable components
 * - Responsive design with mobile-first approach
 * - Literary-themed elegant design consistent with VerseNest brand
 * - SEO optimization with proper meta tags and semantic HTML
 * - Accessibility compliance with ARIA labels and keyboard navigation
 * - Smooth animations and transitions
 * 
 * @component
 * @example
 * <InboxPage />
 */

import React, { useEffect } from 'react';
import { ChatLayout } from '../components/ChatComponents';

const InboxPage = () => {
  // Set document title and meta description for SEO
  useEffect(() => {
    document.title = 'Inbox - VerseNest Poetry Messenger';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Connect with fellow poets and literature enthusiasts through VerseNest\'s elegant messaging platform. Share thoughts, poems, and literary discussions in a beautifully designed interface.'
      );
    }
    
    // Add keywords meta tag if it doesn't exist
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'poetry, messaging, literature, chat, poets, creative writing, VerseNest'
    );

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'VerseNest - Poetry Platform';
    };
  }, []);

  return (
    <main 
      className="min-h-screen"
      role="main"
      aria-label="VerseNest messaging interface"
    >
      {/* SEO-friendly hidden content */}
      <div className="sr-only">
        <h1>VerseNest Poetry Messenger</h1>
        <p>Connect with fellow poets and literature enthusiasts through our elegant messaging platform</p>
      </div>

      {/* Main Chat Interface */}
      <ChatLayout />
    </main>
  );
};

export default InboxPage;

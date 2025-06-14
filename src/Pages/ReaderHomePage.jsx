/**
 * ReaderHomePage Component
 * 
 * Refactored reader homepage using modern component architecture
 * Now uses ReaderHomeLayout for clean, modular design
 * 
 * Features:
 * - Component-based architecture
 * - Tailwind CSS styling
 * - Responsive design
 * - Accessibility compliance
 * - SEO optimization
 */

import React from 'react';
import { ReaderHomeLayout } from '../components/ReaderComponents';
import SEO from '../components/ui/SEO';
import  { usePerformanceMonitor } from '../hooks/usePerformance';

const ReaderHomePage = () => {
  // Monitor performance for this page
  usePerformanceMonitor('ReaderHomePage');
  
  return (
    <>
      <SEO 
        title="Discover Poetry - VerseNest"
        description="Explore a curated collection of poetry from talented writers worldwide. Discover new voices, trending poems, and your next favorite poet on VerseNest."
        keywords="discover poetry, read poems, poetry collection, trending poets, literature, verse discovery"
        structuredData={{
          "@type": "WebPage",
          "name": "Poetry Discovery",
          "description": "Discover and explore poetry from writers worldwide",
          "url": "/reader",
          "isPartOf": {
            "@type": "WebApplication",
            "name": "VerseNest"
          }
        }}
      />
      <ReaderHomeLayout />
    </>
  );
};

export default ReaderHomePage;
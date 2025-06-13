/**
 * ReaderHomeLayout Component
 * 
 * Main layout component for the reader homepage
 * Combines all reader components into a cohesive layout
 * 
 * Features:
 * - Responsive grid layout
 * - Ambient canvas background
 * - Navigation, carousel, feed, and sidebar
 * - Mobile-first responsive design
 * - SEO-optimized structure
 * 
 * @component
 * @example
 * <ReaderHomeLayout />
 */

import React from 'react';
import AmbientCanvas from './AmbientCanvas';
import ReaderNavigation from './ReaderNavigation';
import FeaturedCarousel from './FeaturedCarousel';
import ReaderFeed from './ReaderFeed';
import ReaderSidebar from './ReaderSidebar';
import ReaderFooter from './ReaderFooter';

const ReaderHomeLayout = () => {
  return (
    <div className="min-h-screen bg-amber-50 relative">
      {/* Ambient Background Canvas */}
      <AmbientCanvas />

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Navigation */}
        <ReaderNavigation />

        {/* Featured Carousel */}
        <FeaturedCarousel />

        {/* Main Content Grid */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Feed */}
            <div className="lg:col-span-2">
              <ReaderFeed />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <ReaderSidebar />
            </div>
          </div>
        </main>

        {/* Footer */}
        <ReaderFooter />
      </div>
    </div>
  );
};

export default ReaderHomeLayout;

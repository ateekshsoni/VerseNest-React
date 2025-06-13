/**
 * ReaderSidebar Component
 * 
 * Right sidebar containing reader tools and widgets
 * Combines all reader-specific components
 * 
 * Features:
 * - Quote of the Day widget
 * - Collections management
 * - Suggested poets
 * - Poetry categories
 * - Poetry circles
 * - Responsive stacking on mobile
 * 
 * @component
 * @example
 * <ReaderSidebar />
 */

import React from 'react';
import QuoteOfTheDay from './QuoteOfTheDay';
import CollectionsList from './CollectionsList';
import SuggestedPoets from './SuggestedPoets';
import PoetryCategories from './PoetryCategories';
import PoetryCircles from './PoetryCircles';

const ReaderSidebar = () => {
  return (
    <aside className="space-y-6" role="complementary" aria-label="Reader tools and recommendations">
      {/* Quote of the Day */}
      <QuoteOfTheDay />

      {/* My Collections */}
      <CollectionsList />

      {/* Suggested Poets */}
      <SuggestedPoets />

      {/* Poetry Categories */}
      <PoetryCategories />

      {/* Poetry Circles */}
      <PoetryCircles />
    </aside>
  );
};

export default ReaderSidebar;

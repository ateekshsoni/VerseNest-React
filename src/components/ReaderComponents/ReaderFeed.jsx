/**
 * ReaderFeed Component
 * 
 * Main content feed for reader homepage
 * Displays poem cards with filtering options
 * 
 * Features:
 * - Feed filtering (Latest, Popular, Following)
 * - Infinite scroll or load more functionality
 * - Poem card grid with responsive layout
 * - Loading states and error handling
 * - Empty states for no content
 * 
 * @component
 * @example
 * <ReaderFeed />
 */

import React, { useState, useEffect } from 'react';
import { Filter, TrendingUp, Clock, Users } from 'lucide-react';
import ReaderPoemCard from './ReaderPoemCard';

const ReaderFeed = () => {
  const [activeFilter, setActiveFilter] = useState('latest');
  const [poems, setPoems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Sample poem data
  const samplePoems = [
    {
      id: 1,
      title: "Whispers of Autumn",
      author: "Eleanor Blackwood",
      content: "The leaves fall gently,\nWhispering secrets of time,\nAutumn's sweet embrace.",
      tags: ["Haiku", "Nature", "Autumn"],
      likes: 142,
      comments: 23,
      avatar: "https://via.placeholder.com/40"
    },
    {
      id: 2,
      title: "Midnight Reverie",
      author: "Jonathan Mercer",
      content: "In the stillness of midnight,\nWhen stars paint the sky with silver,\nI find myself lost in reverie,\nDreaming of worlds beyond our own.",
      expandedContent: "The clock strikes twelve, and silence falls,\nA blanket soft on sleeping earth.\nIn this sacred hour between days,\nWhen time itself seems to pause,\nI gather fragments of forgotten dreams,\nPieces of tomorrow's hope.",
      tags: ["Free Verse", "Night", "Dreams"],
      likes: 89,
      comments: 12,
      avatar: "https://via.placeholder.com/40"
    },
    {
      id: 3,
      title: "Ocean's Lullaby",
      author: "Sophia Waters",
      content: "Waves crash upon the shore,\nA timeless melody of blue,\nSalt-kissed air and foaming tides,\nNature's perfect lullaby.",
      expandedContent: "Each wave carries stories untold,\nOf sailors lost and treasures found,\nOf love that spans the endless deep,\nAnd hearts that beat in ocean's sound.",
      tags: ["Ocean", "Lyrical", "Peace"],
      likes: 217,
      comments: 31,
      avatar: "https://via.placeholder.com/40"
    }
  ];

  const filters = [
    {
      id: 'latest',
      label: 'Latest',
      icon: Clock,
      description: 'Newest poems'
    },
    {
      id: 'popular',
      label: 'Popular',
      icon: TrendingUp,
      description: 'Most liked poems'
    },
    {
      id: 'following',
      label: 'Following',
      icon: Users,
      description: 'From poets you follow'
    }
  ];

  /**
   * Load poems based on current filter
   */
  const loadPoems = async (filter = activeFilter) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sort poems based on filter
    let sortedPoems = [...samplePoems];
    
    switch (filter) {
      case 'popular':
        sortedPoems.sort((a, b) => b.likes - a.likes);
        break;
      case 'following':
        // Filter to show only followed poets (for demo, show all)
        sortedPoems = sortedPoems.slice(0, 2);
        break;
      default:
        // Latest - keep original order
        break;
    }
    
    setPoems(sortedPoems);
    setIsLoading(false);
  };

  /**
   * Handle filter change
   * @param {string} filterId - Filter ID to activate
   */
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    loadPoems(filterId);
  };

  /**
   * Load more poems
   */
  const loadMorePoems = () => {
    console.log('Loading more poems...');
    // TODO: Implement pagination
    setHasMore(false);
  };

  // Load initial poems
  useEffect(() => {
    loadPoems();
  }, []);

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900 font-serif">
          Your Poetry Feed
        </h2>
        
        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-amber-600" />
          <div className="flex space-x-1 bg-amber-100 rounded-lg p-1">
            {filters.map((filter) => {
              const Icon = filter.icon;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                             flex items-center space-x-2 ${
                    activeFilter === filter.id
                      ? 'bg-white text-amber-900 shadow-md'
                      : 'text-amber-700 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                  title={filter.description}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3 text-amber-600">
            <div className="w-6 h-6 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium">Loading poems...</span>
          </div>
        </div>
      )}

      {/* Poems Grid */}
      {!isLoading && (
        <div className="space-y-6">
          {poems.length > 0 ? (
            <>
              {poems.map((poem) => (
                <ReaderPoemCard key={poem.id} poem={poem} />
              ))}
              
              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={loadMorePoems}
                    className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white 
                             rounded-xl font-medium hover:from-amber-700 hover:to-orange-700 
                             transition-all duration-300 transform hover:scale-105 shadow-lg 
                             hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>Discover More Poems</span>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-amber-900 mb-2">
                No poems found
              </h3>
              <p className="text-amber-600 mb-6">
                {activeFilter === 'following' 
                  ? "Follow some poets to see their latest works here."
                  : "Be the first to discover amazing poetry!"}
              </p>
              <button
                onClick={() => handleFilterChange('latest')}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 
                         transition-colors duration-200 font-medium"
              >
                Explore Latest Poems
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter Description */}
      <div className="text-center text-sm text-amber-600 pt-4 border-t border-amber-100">
        {filters.find(f => f.id === activeFilter)?.description}
      </div>
    </div>
  );
};

export default ReaderFeed;

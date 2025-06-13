/**
 * SuggestedPoets Component
 * 
 * Displays recommended poets for users to follow
 * Features follow/unfollow functionality with animations
 * 
 * Features:
 * - Poet profiles with avatars and genres
 * - Follow/unfollow functionality with state management
 * - Loading states and error handling
 * - "View More Poets" expansion
 * - Responsive design with hover effects
 * 
 * @component
 * @example
 * <SuggestedPoets />
 */

import React, { useState } from 'react';
import { UserPlus, UserCheck, ChevronRight } from 'lucide-react';

const SuggestedPoets = () => {
  const [poets, setPoets] = useState([
    {
      id: 1,
      name: 'Olivia Nightshade',
      genre: 'Gothic Romance',
      avatar: 'https://via.placeholder.com/40',
      isFollowing: false,
      followers: 1247
    },
    {
      id: 2,
      name: 'Ethan Silverwood',
      genre: 'Modern Haiku',
      avatar: 'https://via.placeholder.com/40',
      isFollowing: false,
      followers: 892
    },
    {
      id: 3,
      name: 'Isabella Moonsong',
      genre: 'Spiritual',
      avatar: 'https://via.placeholder.com/40',
      isFollowing: false,
      followers: 2341
    },
    {
      id: 4,
      name: 'Marcus Chen',
      genre: 'Contemporary',
      avatar: 'https://via.placeholder.com/40',
      isFollowing: true,
      followers: 756
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle follow/unfollow action
   * @param {number} poetId - ID of the poet to follow/unfollow
   */
  const handleFollowToggle = async (poetId) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPoets(prevPoets => 
      prevPoets.map(poet => {
        if (poet.id === poetId) {
          return {
            ...poet,
            isFollowing: !poet.isFollowing,
            followers: poet.isFollowing ? poet.followers - 1 : poet.followers + 1
          };
        }
        return poet;
      })
    );
    
    setIsLoading(false);
  };

  /**
   * Handle poet profile click
   * @param {Object} poet - Poet object
   */
  const handlePoetClick = (poet) => {
    console.log('Opening poet profile:', poet.name);
    // TODO: Navigate to poet profile
  };

  /**
   * Handle view more poets
   */
  const handleViewMore = () => {
    console.log('View more poets');
    // TODO: Navigate to poets discovery page
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-amber-900">Suggested Poets</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
        </div>
      </div>

      {/* Poets List */}
      <div className="space-y-4">
        {poets.map((poet) => (
          <div 
            key={poet.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-50 
                     transition-all duration-200 group cursor-pointer"
          >
            {/* Poet Info */}
            <div 
              className="flex items-center space-x-3 flex-1"
              onClick={() => handlePoetClick(poet)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 
                              group-hover:border-amber-300 transition-colors duration-200">
                  <img
                    src={poet.avatar}
                    alt={`${poet.name} profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/48?text=${poet.name.charAt(0)}`;
                    }}
                  />
                </div>
                
                {/* Online indicator for followed poets */}
                {poet.isFollowing && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full">
                    <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-amber-900 group-hover:text-amber-800 transition-colors duration-200 truncate">
                  {poet.name}
                </p>
                <p className="text-sm text-amber-600 truncate">
                  {poet.genre}
                </p>
                <p className="text-xs text-amber-500">
                  {poet.followers.toLocaleString()} followers
                </p>
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFollowToggle(poet.id);
              }}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
                poet.isFollowing
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300'
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {poet.isFollowing ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span>{poet.isFollowing ? 'Following' : 'Follow'}</span>
                </>
              )}
            </button>
          </div>
        ))}

        {/* View More */}
        <button
          onClick={handleViewMore}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg 
                   text-amber-600 hover:text-amber-800 hover:bg-amber-50 
                   transition-all duration-200 group border-2 border-dashed border-amber-300 
                   hover:border-amber-400"
        >
          <span className="font-medium">View More Poets</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-amber-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-amber-600">Following</p>
            <p className="text-lg font-semibold text-amber-900">
              {poets.filter(poet => poet.isFollowing).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-amber-600">Discovered</p>
            <p className="text-lg font-semibold text-amber-900">
              {poets.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedPoets;

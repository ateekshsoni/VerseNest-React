import React from 'react';
import TrendingPoet from './TrendingPoet';

/**
 * Trending poets section component
 * @param {array} poets - Array of trending poet objects
 * @param {function} onFollow - Follow handler function
 */
const TrendingPoets = ({ poets = [], onFollow }) => {
  return (
    <section 
      className="mb-10"
      aria-labelledby="trending-poets-heading"
    >
      <h3 
        id="trending-poets-heading"
        className="font-poetry text-xl text-ivory-white mb-5 relative pb-2"
      >
        Poets of the Hour
        <span 
          className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#c9b458] to-transparent"
          aria-hidden="true"
        />
      </h3>

      <div 
        className="flex flex-col gap-4" 
        role="list"
        aria-label="Trending poets to follow"
      >
        {poets.length > 0 ? (
          poets.map((poet, index) => (
            <TrendingPoet
              key={poet.id || index}
              name={poet.name}
              specialty={poet.specialty}
              avatar={poet.avatar}
              isFollowing={poet.isFollowing}
              onFollow={onFollow}
            />
          ))
        ) : (
          <div className="text-center py-8 text-ivory-white/50">
            <i className="fas fa-user-friends text-2xl mb-2" aria-hidden="true" />
            <p className="text-sm">No trending poets at the moment</p>
            <p className="text-xs mt-1">Discover new voices in our community!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingPoets;

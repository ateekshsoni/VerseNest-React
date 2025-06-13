/**
 * ReaderPoemCard Component
 * 
 * Interactive poem card for the reader feed
 * Features like, comment, share, and bookmark functionality
 * 
 * Features:
 * - Expandable poem content with "Read More" functionality
 * - Like button with count animation
 * - Comment, share, and bookmark interactions
 * - Dropdown menu for additional actions
 * - Tag display with hover effects
 * - Responsive design with elegant animations
 * 
 * @component
 * @example
 * <ReaderPoemCard 
 *   poem={{
 *     id: 1,
 *     title: "Whispers of Autumn",
 *     author: "Eleanor Blackwood",
 *     content: "The leaves fall gently...",
 *     tags: ["Haiku", "Nature", "Autumn"],
 *     likes: 142,
 *     comments: 23,
 *     avatar: "https://example.com/avatar.jpg"
 *   }}
 * />
 */

import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';

const ReaderPoemCard = ({ poem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(poem.likes || 0);
  const [showDropdown, setShowDropdown] = useState(false);

  /**
   * Toggle poem content expansion
   */
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  /**
   * Handle like button click
   */
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  /**
   * Handle bookmark button click
   */
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  /**
   * Handle share button click
   */
  const handleShare = () => {
    console.log('Sharing poem:', poem.title);
    // TODO: Implement share functionality
  };

  /**
   * Handle comment button click
   */
  const handleComment = () => {
    console.log('Opening comments for:', poem.title);
    // TODO: Implement comment functionality
  };

  /**
   * Toggle dropdown menu
   */
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Default values for poem object
  const {
    id = 1,
    title = "Untitled Poem",
    author = "Unknown Author",
    content = "No content available",
    expandedContent = "",
    tags = [],
    likes = 0,
    comments = 0,
    avatar = "https://via.placeholder.com/40"
  } = poem || {};

  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-amber-100 group">
      {/* Header */}
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 group-hover:border-amber-300 transition-colors duration-200">
            <img
              src={avatar}
              alt={`${author} profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48?text=A';
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-900 group-hover:text-amber-800 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-amber-600 text-sm">
              {author}
            </p>
          </div>
        </div>

        {/* Menu Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200"
            aria-label="Poem options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-amber-200 py-2 z-10">
              <button className="w-full px-4 py-2 text-left text-amber-700 hover:bg-amber-50 transition-colors duration-200">
                Follow Poet
              </button>
              <button className="w-full px-4 py-2 text-left text-amber-700 hover:bg-amber-50 transition-colors duration-200">
                Add to Collection
              </button>
              <button className="w-full px-4 py-2 text-left text-amber-700 hover:bg-amber-50 transition-colors duration-200">
                Report Content
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="mb-4">
        <div className={`text-amber-900 leading-relaxed transition-all duration-300 ${
          isExpanded ? 'max-h-none' : 'max-h-24 overflow-hidden'
        }`}>
          <p className="whitespace-pre-line font-serif text-lg">
            {content}
          </p>
          {expandedContent && isExpanded && (
            <p className="whitespace-pre-line font-serif text-lg mt-4 text-amber-800">
              {expandedContent}
            </p>
          )}
        </div>

        {expandedContent && (
          <button
            onClick={toggleExpanded}
            className="mt-3 text-amber-600 hover:text-amber-800 font-medium text-sm transition-colors duration-200"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 
                       rounded-full transition-colors duration-200 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <footer className="flex items-center justify-between pt-4 border-t border-amber-100">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all duration-200 group/like ${
              isLiked 
                ? 'text-rose-500' 
                : 'text-amber-500 hover:text-rose-500'
            }`}
            aria-label={`${isLiked ? 'Unlike' : 'Like'} this poem`}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-200 group-hover/like:scale-110 ${
                isLiked ? 'fill-current' : ''
              }`} 
            />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={handleComment}
            className="flex items-center space-x-2 text-amber-500 hover:text-blue-500 transition-all duration-200 group/comment"
            aria-label="View comments"
          >
            <MessageCircle className="w-5 h-5 group-hover/comment:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">{comments}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-amber-500 hover:text-green-500 transition-all duration-200 group/share"
            aria-label="Share this poem"
          >
            <Share className="w-5 h-5 group-hover/share:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isBookmarked 
              ? 'text-amber-700 bg-amber-100' 
              : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50'
          }`}
          aria-label={`${isBookmarked ? 'Remove from' : 'Add to'} bookmarks`}
        >
          <Bookmark 
            className={`w-5 h-5 transition-all duration-200 ${
              isBookmarked ? 'fill-current' : ''
            }`} 
          />
        </button>
      </footer>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowDropdown(false)}
          aria-hidden="true"
        />
      )}
    </article>
  );
};

export default ReaderPoemCard;

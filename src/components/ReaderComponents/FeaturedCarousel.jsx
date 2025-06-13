/**
 * FeaturedCarousel Component
 * 
 * Interactive carousel showcasing featured poems
 * Auto-rotates with manual navigation controls
 * 
 * Features:
 * - Auto-rotation every 8 seconds
 * - Manual navigation with prev/next buttons
 * - Dot indicators for direct slide access
 * - Smooth transitions with loading states
 * - Responsive design for all screen sizes
 * - Keyboard navigation support
 * 
 * @component
 * @example
 * <FeaturedCarousel />
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Featured poems data
  const featuredPoems = [
    {
      id: 1,
      title: "The Silent Symphony",
      author: "Alexandra Rivers",
      excerpt: "In the quiet moments between heartbeats, there lies a symphony only the soul can hear...",
      gradient: "from-purple-600 via-pink-600 to-red-600"
    },
    {
      id: 2,
      title: "Echoes of Tomorrow",
      author: "Marcus Holloway",
      excerpt: "We are but echoes of tomorrow, whispers of what might be, shadows of possibility...",
      gradient: "from-blue-600 via-teal-600 to-green-600"
    },
    {
      id: 3,
      title: "Garden of Memories",
      author: "Eliza Thornfield",
      excerpt: "I plant my memories like seeds, watering them with tears of yesterday...",
      gradient: "from-amber-600 via-orange-600 to-rose-600"
    }
  ];

  /**
   * Navigate to a specific slide
   * @param {number} index - Target slide index
   */
  const showSlide = useCallback((index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  /**
   * Navigate to next slide
   */
  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % featuredPoems.length;
    showSlide(nextIndex);
  }, [currentIndex, featuredPoems.length, showSlide]);

  /**
   * Navigate to previous slide
   */
  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + featuredPoems.length) % featuredPoems.length;
    showSlide(prevIndex);
  }, [currentIndex, featuredPoems.length, showSlide]);

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }, [prevSlide, nextSlide]);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Keyboard navigation effect
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section 
      className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl mx-4 md:mx-8 mt-4 shadow-2xl"
      aria-label="Featured poems carousel"
      role="region"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {featuredPoems.map((poem, index) => (
          <div
            key={poem.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 scale-100' 
                : index < currentIndex
                ? 'opacity-0 -translate-x-full scale-95'
                : 'opacity-0 translate-x-full scale-95'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <div className={`w-full h-full bg-gradient-to-br ${poem.gradient} flex items-center justify-center relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-repeat"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center px-8 md:px-16 max-w-4xl">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-white/90 bg-white/20 rounded-full backdrop-blur-sm">
                  Featured Poem
                </span>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif leading-tight">
                  {poem.title}
                </h2>
                
                <p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
                  by {poem.author}
                </p>
                
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {poem.excerpt}
                </p>
                
                <button 
                  className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50"
                  aria-label={`Read full poem: ${poem.title}`}
                >
                  Read Full Poem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Previous featured poem"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Next featured poem"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3" role="tablist" aria-label="Carousel navigation">
        {featuredPoems.map((_, index) => (
          <button
            key={index}
            onClick={() => showSlide(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / featuredPoems.length) * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default FeaturedCarousel;

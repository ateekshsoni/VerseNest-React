/**
 * QuoteOfTheDay Component
 * 
 * Displays rotating inspirational quotes from famous poets
 * Auto-rotates every 15 seconds with smooth transitions
 * 
 * Features:
 * - Auto-rotation with fade transitions
 * - Curated collection of poetry quotes
 * - Manual navigation controls
 * - Responsive typography
 * - Accessibility support
 * 
 * @component
 * @example
 * <QuoteOfTheDay />
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const QuoteOfTheDay = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Curated quotes from famous poets
  const quotes = [
    {
      text: "Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility.",
      author: "William Wordsworth"
    },
    {
      text: "Poetry is not a turning loose of emotion, but an escape from emotion; it is not the expression of personality, but an escape from personality.",
      author: "T.S. Eliot"
    },
    {
      text: "Poetry is the revelation of a feeling that the poet believes to be interior and personal which the reader recognizes as his own.",
      author: "Salvatore Quasimodo"
    },
    {
      text: "Poetry is eternal graffiti written in the heart of everyone.",
      author: "Lawrence Ferlinghetti"
    },
    {
      text: "Poetry is what gets lost in translation.",
      author: "Robert Frost"
    },
    {
      text: "Poetry is when an emotion has found its thought and the thought has found words.",
      author: "Robert Frost"
    },
    {
      text: "Poetry is the language in which man explores his own amazement.",
      author: "Christopher Fry"
    }
  ];

  /**
   * Rotate to the next quote with smooth transition
   */
  const rotateQuote = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 250);
  }, [quotes.length, isTransitioning]);

  /**
   * Navigate to previous quote
   */
  const prevQuote = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 250);
  }, [quotes.length, isTransitioning]);

  /**
   * Navigate to next quote
   */
  const nextQuote = useCallback(() => {
    rotateQuote();
  }, [rotateQuote]);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(rotateQuote, 15000);
    return () => clearInterval(interval);
  }, [rotateQuote]);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
        <Quote className="w-full h-full text-amber-200/30 transform rotate-12" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-semibold text-amber-900 flex items-center space-x-2">
          <Quote className="w-5 h-5 text-amber-600" />
          <span>Quote of the Day</span>
        </h3>

        {/* Navigation controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={prevQuote}
            disabled={isTransitioning}
            className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-all duration-200 disabled:opacity-50"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={nextQuote}
            disabled={isTransitioning}
            className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-all duration-200 disabled:opacity-50"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quote content */}
      <div 
        className={`relative z-10 transition-all duration-500 ${
          isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
        }`}
      >
        <blockquote className="text-amber-800 text-base leading-relaxed mb-4 font-serif italic">
          "{currentQuote.text}"
        </blockquote>
        
        <cite className="text-amber-700 font-medium text-sm not-italic">
          — {currentQuote.author}
        </cite>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center space-x-1 mt-4 relative z-10">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentQuoteIndex(index);
                setTimeout(() => setIsTransitioning(false), 300);
              }, 250);
            }}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentQuoteIndex 
                ? 'bg-amber-600 scale-125' 
                : 'bg-amber-300 hover:bg-amber-400'
            }`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-amber-200/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-200/20 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;

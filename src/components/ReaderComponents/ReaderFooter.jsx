/**
 * ReaderFooter Component
 * 
 * Simple footer for the reader page
 * Contains branding and copyright information
 * 
 * Features:
 * - Clean, minimal design
 * - Responsive typography
 * - Subtle animations
 * - Brand consistency
 * 
 * @component
 * @example
 * <ReaderFooter />
 */

import React from 'react';
import { Heart } from 'lucide-react';

const ReaderFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          {/* Brand */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-amber-900 font-serif">
              <span className="text-amber-700">Verse</span>Nest
            </h3>
            <p className="text-sm text-amber-600 mt-1">
              Where poetry finds its home
            </p>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center space-x-2 text-amber-700">
            <span className="text-sm">
              © {currentYear} VerseNest
            </span>
            <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-sm">
              Crafted for poetry lovers
            </span>
          </div>

          {/* Decorative Elements */}
          <div className="mt-6 flex justify-center space-x-4 opacity-30">
            <div className="w-8 h-0.5 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-0.5 bg-amber-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ReaderFooter;

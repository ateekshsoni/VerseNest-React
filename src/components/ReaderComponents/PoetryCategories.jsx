/**
 * PoetryCategories Component
 * 
 * Displays poetry categories with poem counts
 * Interactive grid layout with hover effects
 * 
 * Features:
 * - Grid layout for category display
 * - Poem counts with animated updates
 * - Category-based filtering
 * - Hover effects and smooth transitions
 * - Responsive design
 * 
 * @component
 * @example
 * <PoetryCategories />
 */

import React, { useState } from 'react';
import { TrendingUp, Heart, Leaf, Sparkles, Clock, Mountain } from 'lucide-react';

const PoetryCategories = () => {
  const [categories] = useState([
    {
      id: 1,
      name: 'Love & Romance',
      count: 1243,
      icon: Heart,
      gradient: 'from-rose-400 to-pink-500',
      hoverGradient: 'from-rose-500 to-pink-600',
      description: 'Passionate verses of the heart'
    },
    {
      id: 2,
      name: 'Nature',
      count: 987,
      icon: Leaf,
      gradient: 'from-green-400 to-emerald-500',
      hoverGradient: 'from-green-500 to-emerald-600',
      description: 'Beauty of the natural world'
    },
    {
      id: 3,
      name: 'Spiritual',
      count: 654,
      icon: Sparkles,
      gradient: 'from-purple-400 to-indigo-500',
      hoverGradient: 'from-purple-500 to-indigo-600',
      description: 'Soul-searching reflections'
    },
    {
      id: 4,
      name: 'Melancholy',
      count: 521,
      icon: Clock,
      gradient: 'from-blue-400 to-cyan-500',
      hoverGradient: 'from-blue-500 to-cyan-600',
      description: 'Contemplative and introspective'
    },
    {
      id: 5,
      name: 'Modern',
      count: 432,
      icon: TrendingUp,
      gradient: 'from-orange-400 to-red-500',
      hoverGradient: 'from-orange-500 to-red-600',
      description: 'Contemporary expressions'
    },
    {
      id: 6,
      name: 'Haiku',
      count: 321,
      icon: Mountain,
      gradient: 'from-teal-400 to-blue-500',
      hoverGradient: 'from-teal-500 to-blue-600',
      description: 'Traditional Japanese form'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Handle category selection
   * @param {Object} category - Selected category
   */
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log('Selected category:', category.name);
    // TODO: Navigate to category page or filter poems
  };

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  const formatCount = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-amber-900">Poetry Categories</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-600">Trending</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
                selectedCategory?.id === category.id ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:bg-gradient-to-br group-hover:${category.hoverGradient} transition-all duration-300`}></div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-white/10  bg-repeat"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      {formatCount(category.count)}
                    </p>
                    <p className="text-xs text-white/80">poems</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-1">
                  {category.name}
                </h4>
                
                <p className="text-sm text-white/80 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-amber-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-amber-600">
            Total: {formatCount(categories.reduce((sum, cat) => sum + cat.count, 0))} poems
          </span>
          <button className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-200">
            Explore All →
          </button>
        </div>
      </div>

      {/* Selected Category Info */}
      {selectedCategory && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-br ${selectedCategory.gradient} rounded-lg`}>
              <selectedCategory.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-amber-900">{selectedCategory.name}</p>
              <p className="text-sm text-amber-600">
                {formatCount(selectedCategory.count)} poems available
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoetryCategories;

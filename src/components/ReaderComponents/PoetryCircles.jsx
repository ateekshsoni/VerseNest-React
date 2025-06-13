/**
 * PoetryCircles Component
 * 
 * Displays poetry circles/communities for users to join
 * Features join/leave functionality and member counts
 * 
 * Features:
 * - Poetry community circles with themes
 * - Join/leave functionality
 * - Member counts and activity indicators
 * - Animated join buttons
 * - Responsive design
 * 
 * @component
 * @example
 * <PoetryCircles />
 */

import React, { useState } from 'react';
import { Users, Moon, Leaf, Heart, Plus, Check } from 'lucide-react';

const PoetryCircles = () => {
  const [circles, setCircles] = useState([
    {
      id: 1,
      name: 'Midnight Verses',
      description: 'For night owls who find inspiration in the darkness',
      members: 342,
      icon: Moon,
      color: 'bg-indigo-600',
      hoverColor: 'hover:bg-indigo-700',
      isJoined: false,
      isActive: true
    },
    {
      id: 2,
      name: "Nature's Whispers",
      description: 'Celebrating the beauty of the natural world',
      members: 567,
      icon: Leaf,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      isJoined: true,
      isActive: true
    },
    {
      id: 3,
      name: 'Melancholy Souls',
      description: 'Deep, contemplative poetry for introspective minds',
      members: 234,
      icon: Heart,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      isJoined: false,
      isActive: false
    },
    {
      id: 4,
      name: 'Urban Rhythms',
      description: 'Modern poetry inspired by city life',
      members: 189,
      icon: Users,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      isJoined: false,
      isActive: true
    }
  ]);

  const [isLoading, setIsLoading] = useState(null);

  /**
   * Handle joining/leaving a poetry circle
   * @param {number} circleId - ID of the circle to join/leave
   */
  const handleCircleToggle = async (circleId) => {
    setIsLoading(circleId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCircles(prevCircles => 
      prevCircles.map(circle => {
        if (circle.id === circleId) {
          return {
            ...circle,
            isJoined: !circle.isJoined,
            members: circle.isJoined ? circle.members - 1 : circle.members + 1
          };
        }
        return circle;
      })
    );
    
    setIsLoading(null);
  };

  /**
   * Handle circle click to view details
   * @param {Object} circle - Circle object
   */
  const handleCircleClick = (circle) => {
    console.log('Opening circle:', circle.name);
    // TODO: Navigate to circle details page
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-amber-900">Join Poetry Circles</h3>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-600">Communities</span>
        </div>
      </div>

      {/* Circles List */}
      <div className="space-y-4">
        {circles.map((circle) => {
          const Icon = circle.icon;
          const isCurrentlyLoading = isLoading === circle.id;
          
          return (
            <div 
              key={circle.id}
              className="relative overflow-hidden rounded-lg border border-amber-200 hover:border-amber-300 
                       transition-all duration-200 group"
            >
              {/* Background */}
              <div className={`${circle.color} p-4`}>
                <div className="flex items-start justify-between">
                  {/* Circle Info */}
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => handleCircleClick(circle)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{circle.name}</h4>
                          {circle.isActive && (
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                                 title="Active discussions"></div>
                          )}
                        </div>
                        <p className="text-sm text-white/80 mt-1">
                          {circle.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-white/90 text-sm">
                      <span>{circle.members.toLocaleString()} members</span>
                      {circle.isActive && (
                        <span className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span>Active now</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Join/Leave Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCircleToggle(circle.id);
                    }}
                    disabled={isCurrentlyLoading}
                    className={`ml-4 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 
                               flex items-center space-x-2 min-w-[100px] justify-center
                               ${circle.isJoined
                                 ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                                 : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                               } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isCurrentlyLoading ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {circle.isJoined ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                        <span>{circle.isJoined ? 'Joined' : 'Join'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Create New Circle */}
      <button className="w-full mt-4 p-4 border-2 border-dashed border-amber-300 rounded-lg 
                       text-amber-600 hover:text-amber-800 hover:border-amber-400 hover:bg-amber-50 
                       transition-all duration-200 group">
        <div className="flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Create Your Own Circle</span>
        </div>
      </button>

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-amber-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-amber-600">Joined</p>
            <p className="text-lg font-semibold text-amber-900">
              {circles.filter(circle => circle.isJoined).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-amber-600">Active</p>
            <p className="text-lg font-semibold text-amber-900">
              {circles.filter(circle => circle.isActive).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-amber-600">Total</p>
            <p className="text-lg font-semibold text-amber-900">
              {circles.reduce((total, circle) => total + (circle.isJoined ? circle.members : 0), 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetryCircles;

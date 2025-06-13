/**
 * CollectionsList Component
 * 
 * Displays user's poetry collections with icons and counts
 * Allows creating new collections and managing existing ones
 * 
 * Features:
 * - Visual collection icons with color coding
 * - Collection counts with animated updates
 * - "Create New Collection" functionality
 * - Hover effects and smooth transitions
 * - Responsive design
 * 
 * @component
 * @example
 * <CollectionsList />
 */

import React, { useState } from 'react';
import { Heart, Book, Bookmark, Star, Plus, Folder } from 'lucide-react';

const CollectionsList = () => {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: 'Favorites',
      count: 24,
      icon: Heart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      hoverColor: 'hover:bg-rose-100'
    },
    {
      id: 2,
      name: 'To Read Later',
      count: 17,
      icon: Book,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 3,
      name: 'Nature Poems',
      count: 12,
      icon: Bookmark,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      id: 4,
      name: 'Inspirational',
      count: 8,
      icon: Star,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      hoverColor: 'hover:bg-amber-100'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  /**
   * Handle creating a new collection
   */
  const handleCreateCollection = (e) => {
    e.preventDefault();
    
    if (newCollectionName.trim()) {
      const newCollection = {
        id: collections.length + 1,
        name: newCollectionName.trim(),
        count: 0,
        icon: Folder,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        hoverColor: 'hover:bg-purple-100'
      };
      
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
      setShowCreateForm(false);
    }
  };

  /**
   * Handle collection click
   * @param {Object} collection - Collection object
   */
  const handleCollectionClick = (collection) => {
    console.log('Opening collection:', collection.name);
    // TODO: Navigate to collection view
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-amber-900">My Collections</h3>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Synced"></div>
      </div>

      {/* Collections List */}
      <div className="space-y-3">
        {collections.map((collection) => {
          const Icon = collection.icon;
          
          return (
            <button
              key={collection.id}
              onClick={() => handleCollectionClick(collection)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 
                         ${collection.bgColor} ${collection.hoverColor} group hover:shadow-md`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${collection.color} bg-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-amber-900 group-hover:text-amber-800 transition-colors duration-200">
                  {collection.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${collection.color} bg-white`}>
                  {collection.count}
                </span>
              </div>
            </button>
          );
        })}

        {/* Create New Collection */}
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-amber-300 
                     text-amber-600 hover:text-amber-800 hover:border-amber-400 hover:bg-amber-50 
                     transition-all duration-200 group"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Create New Collection</span>
          </button>
        ) : (
          <form onSubmit={handleCreateCollection} className="p-3 border-2 border-amber-300 rounded-lg bg-amber-50">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name..."
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 
                       focus:border-amber-400 focus:outline-none text-amber-900 mb-3"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={!newCollectionName.trim()}
                className="flex-1 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 
                         transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCollectionName('');
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                         transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-amber-100">
        <div className="flex justify-between text-sm text-amber-600">
          <span>Total Poems</span>
          <span className="font-semibold">
            {collections.reduce((total, collection) => total + collection.count, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionsList;

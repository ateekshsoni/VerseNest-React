/**
 * API Utilities and Backend Integration Points for VerseNest
 * 
 * This module centralizes all API interactions and provides a clean interface
 * for backend integration. Replace mock data with actual API calls.
 */

// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
};

// Request interceptor for common headers
const createHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('versenest_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request function with error handling
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const config = {
    headers: createHeaders(options.requireAuth !== false),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return { success: false, error: error.message };
  }
};

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export const authAPI = {
  /**
   * User login
   * @param {Object} credentials - { email, password, role }
   * @returns {Promise} API response with user data and token
   */
  login: async (credentials) => {
    // TODO: Replace with actual API endpoint
    const mockResponse = {
      success: true,
      data: {
        user: {
          id: '1',
          email: credentials.email,
          role: credentials.role,
          name: `Mock ${credentials.role}`,
          avatar: '/Rabindranath.avif',
          bio: `A passionate ${credentials.role} on VerseNest`,
          joinedDate: new Date().toISOString(),
        },
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockResponse;

    // REAL IMPLEMENTATION:
    // return apiRequest('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    //   requireAuth: false,
    // });
  },

  /**
   * User registration
   * @param {Object} userData - User registration data
   * @returns {Promise} API response with user data and token
   */
  register: async (userData) => {
    // TODO: Replace with actual API endpoint
    const mockResponse = {
      success: true,
      data: {
        user: {
          id: Date.now().toString(),
          ...userData,
          avatar: '/Rabindranath.avif',
          joinedDate: new Date().toISOString(),
        },
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
      }
    };

    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockResponse;

    // REAL IMPLEMENTATION:
    // return apiRequest('/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(userData),
    //   requireAuth: false,
    // });
  },

  /**
   * Token refresh
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} New access token
   */
  refreshToken: async (refreshToken) => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      requireAuth: false,
    });
  },

  /**
   * User logout
   * @returns {Promise} Logout confirmation
   */
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Password reset request
   * @param {string} email - User email
   * @returns {Promise} Reset confirmation
   */
  forgotPassword: async (email) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      requireAuth: false,
    });
  },

  /**
   * Validate JWT token
   * @param {string} token - JWT token to validate
   * @returns {Promise} Token validation result
   */
  validateToken: async (token) => {
    return apiRequest('/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
      requireAuth: false,
    });
  },
};

// ============================================================================
// POEMS API
// ============================================================================

export const poemsAPI = {
  /**
   * Get poems feed with pagination
   * @param {Object} params - { page, limit, filter, category }
   * @returns {Promise} Paginated poems data
   */
  getFeed: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/poems/feed?${queryString}`);
  },

  /**
   * Get featured poems
   * @returns {Promise} Featured poems array
   */
  getFeatured: async () => {
    return apiRequest('/poems/featured');
  },

  /**
   * Get poem by ID
   * @param {string} poemId - Poem ID
   * @returns {Promise} Poem data
   */
  getById: async (poemId) => {
    return apiRequest(`/poems/${poemId}`);
  },

  /**
   * Create new poem
   * @param {Object} poemData - Poem content and metadata
   * @returns {Promise} Created poem data
   */
  create: async (poemData) => {
    return apiRequest('/poems', {
      method: 'POST',
      body: JSON.stringify(poemData),
    });
  },

  /**
   * Update poem
   * @param {string} poemId - Poem ID
   * @param {Object} poemData - Updated poem data
   * @returns {Promise} Updated poem data
   */
  update: async (poemId, poemData) => {
    return apiRequest(`/poems/${poemId}`, {
      method: 'PUT',
      body: JSON.stringify(poemData),
    });
  },

  /**
   * Delete poem
   * @param {string} poemId - Poem ID
   * @returns {Promise} Deletion confirmation
   */
  delete: async (poemId) => {
    return apiRequest(`/poems/${poemId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Like/unlike poem
   * @param {string} poemId - Poem ID
   * @returns {Promise} Updated like status
   */
  toggleLike: async (poemId) => {
    return apiRequest(`/poems/${poemId}/like`, {
      method: 'POST',
    });
  },

  /**
   * Bookmark/unbookmark poem
   * @param {string} poemId - Poem ID
   * @returns {Promise} Updated bookmark status
   */
  toggleBookmark: async (poemId) => {
    return apiRequest(`/poems/${poemId}/bookmark`, {
      method: 'POST',
    });
  },

  /**
   * Get poem comments
   * @param {string} poemId - Poem ID
   * @returns {Promise} Comments array
   */
  getComments: async (poemId) => {
    return apiRequest(`/poems/${poemId}/comments`);
  },

  /**
   * Add comment to poem
   * @param {string} poemId - Poem ID
   * @param {string} content - Comment content
   * @returns {Promise} Created comment data
   */
  addComment: async (poemId, content) => {
    return apiRequest(`/poems/${poemId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },
};

// ============================================================================
// USERS API
// ============================================================================

export const usersAPI = {
  /**
   * Get user profile
   * @param {string} userId - User ID (optional, current user if not provided)
   * @returns {Promise} User profile data
   */
  getProfile: async (userId = 'me') => {
    return apiRequest(`/users/${userId}`);
  },

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Updated profile data
   */
  updateProfile: async (profileData) => {
    return apiRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Get user's poems
   * @param {string} userId - User ID
   * @param {Object} params - Query parameters
   * @returns {Promise} User's poems
   */
  getPoems: async (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users/${userId}/poems?${queryString}`);
  },

  /**
   * Follow/unfollow user
   * @param {string} userId - User ID to follow/unfollow
   * @returns {Promise} Updated follow status
   */
  toggleFollow: async (userId) => {
    return apiRequest(`/users/${userId}/follow`, {
      method: 'POST',
    });
  },

  /**
   * Get user's followers
   * @param {string} userId - User ID
   * @returns {Promise} Followers list
   */
  getFollowers: async (userId) => {
    return apiRequest(`/users/${userId}/followers`);
  },

  /**
   * Get user's following
   * @param {string} userId - User ID
   * @returns {Promise} Following list
   */
  getFollowing: async (userId) => {
    return apiRequest(`/users/${userId}/following`);
  },

  /**
   * Search users
   * @param {string} query - Search query
   * @returns {Promise} Search results
   */
  search: async (query) => {
    return apiRequest(`/users/search?q=${encodeURIComponent(query)}`);
  },
};

// ============================================================================
// COLLECTIONS API
// ============================================================================

export const collectionsAPI = {
  /**
   * Get user's collections
   * @returns {Promise} Collections array
   */
  getAll: async () => {
    return apiRequest('/collections');
  },

  /**
   * Create new collection
   * @param {Object} collectionData - Collection data
   * @returns {Promise} Created collection
   */
  create: async (collectionData) => {
    return apiRequest('/collections', {
      method: 'POST',
      body: JSON.stringify(collectionData),
    });
  },

  /**
   * Add poem to collection
   * @param {string} collectionId - Collection ID
   * @param {string} poemId - Poem ID
   * @returns {Promise} Update confirmation
   */
  addPoem: async (collectionId, poemId) => {
    return apiRequest(`/collections/${collectionId}/poems`, {
      method: 'POST',
      body: JSON.stringify({ poemId }),
    });
  },

  /**
   * Remove poem from collection
   * @param {string} collectionId - Collection ID
   * @param {string} poemId - Poem ID
   * @returns {Promise} Update confirmation
   */
  removePoem: async (collectionId, poemId) => {
    return apiRequest(`/collections/${collectionId}/poems/${poemId}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// CHAT API
// ============================================================================

export const chatAPI = {
  /**
   * Get user's conversations
   * @returns {Promise} Conversations array
   */
  getConversations: async () => {
    return apiRequest('/chat/conversations');
  },

  /**
   * Get messages for a conversation
   * @param {string} conversationId - Conversation ID
   * @returns {Promise} Messages array
   */
  getMessages: async (conversationId) => {
    return apiRequest(`/chat/conversations/${conversationId}/messages`);
  },

  /**
   * Send message
   * @param {string} conversationId - Conversation ID
   * @param {Object} messageData - Message content
   * @returns {Promise} Sent message data
   */
  sendMessage: async (conversationId, messageData) => {
    return apiRequest(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  /**
   * Start new conversation
   * @param {string} recipientId - Recipient user ID
   * @returns {Promise} New conversation data
   */
  startConversation: async (recipientId) => {
    return apiRequest('/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ recipientId }),
    });
  },
};

// ============================================================================
// SEARCH API
// ============================================================================

export const searchAPI = {
  /**
   * Global search
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Promise} Search results
   */
  global: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/search?${queryString}`);
  },

  /**
   * Search poems
   * @param {string} query - Search query
   * @param {Object} filters - Poem filters
   * @returns {Promise} Poem search results
   */
  poems: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/search/poems?${queryString}`);
  },

  /**
   * Search users
   * @param {string} query - Search query
   * @returns {Promise} User search results
   */
  users: async (query) => {
    return apiRequest(`/search/users?q=${encodeURIComponent(query)}`);
  },
};

// ============================================================================
// NOTIFICATIONS API
// ============================================================================

export const notificationsAPI = {
  /**
   * Get user notifications
   * @param {Object} params - Query parameters
   * @returns {Promise} Notifications array
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/notifications?${queryString}`);
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise} Update confirmation
   */
  markAsRead: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  },

  /**
   * Mark all notifications as read
   * @returns {Promise} Update confirmation
   */
  markAllAsRead: async () => {
    return apiRequest('/notifications/read-all', {
      method: 'PUT',
    });
  },
};

// ============================================================================
// FILE UPLOAD API
// ============================================================================

export const uploadAPI = {
  /**
   * Upload file (avatar, poem images, etc.)
   * @param {File} file - File to upload
   * @param {string} type - Upload type ('avatar', 'poem-image', etc.)
   * @returns {Promise} Upload result with file URL
   */
  uploadFile: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return apiRequest('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
        Authorization: `Bearer ${localStorage.getItem('versenest_token')}`,
      },
    });
  },
};

// Export all APIs
export default {
  authAPI,
  poemsAPI,
  usersAPI,
  collectionsAPI,
  chatAPI,
  searchAPI,
  notificationsAPI,
  uploadAPI,
};

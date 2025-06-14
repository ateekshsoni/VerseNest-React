/**
 * Authentication Utility Functions
 * 
 * Helper functions for authentication operations
 * Token management, route handling, and user state utilities
 * 
 * @fileoverview Authentication utility functions
 */

/**
 * Genre options for writers and readers
 */
export const GENRE_OPTIONS = [
  { value: 'lyrical', label: 'Lyrical' },
  { value: 'narrative', label: 'Narrative' },
  { value: 'sonnet', label: 'Sonnet' },
  { value: 'haiku', label: 'Haiku' },
  { value: 'free-verse', label: 'Free Verse' },
  { value: 'epic', label: 'Epic' },
  { value: 'ballad', label: 'Ballad' },
  { value: 'limerick', label: 'Limerick' },
  { value: 'acrostic', label: 'Acrostic' },
  { value: 'other', label: 'Other' }
];

/**
 * Mood preference options for readers
 */
export const MOOD_OPTIONS = [
  { value: 'reflective', label: 'Reflective' },
  { value: 'uplifting', label: 'Uplifting' },
  { value: 'melancholic', label: 'Melancholic' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'inspiring', label: 'Inspiring' },
  { value: 'peaceful', label: 'Peaceful' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'contemplative', label: 'Contemplative' }
];

/**
 * Get authentication token from localStorage
 * @returns {string|null} Authentication token
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Get user data from localStorage
 * @returns {Object|null} User data object
 */
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};

/**
 * Get redirect URL based on user role
 * @param {string} role - User role ('reader' or 'writer')
 * @returns {string} Redirect URL
 */
export const getRedirectUrl = (role) => {
  switch (role) {
    case 'reader':
      return '/reader/home';
    case 'writer':
      return '/writer/home';
    default:
      return '/';
  }
};

/**
 * Format user display name
 * @param {Object} user - User object
 * @returns {string} Formatted display name
 */
export const formatUserDisplayName = (user) => {
  if (!user) return 'Guest';
  
  if (user.role === 'writer' && user.penName) {
    return user.penName;
  }
  
  return user.name || user.email?.split('@')[0] || 'User';
};

/**
 * Check if password meets strength requirements
 * @param {string} password - Password to check
 * @returns {Object} Password strength analysis
 */
export const getPasswordStrength = (password) => {
  let score = 0;
  const feedback = [];
  
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters');
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One uppercase letter');
  }
  
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One lowercase letter');
  }
  
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('One number');
  }
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  }
  
  const strength = score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong';
  
  return {
    score,
    strength,
    feedback,
    isValid: score >= 3
  };
};

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML characters
    .slice(0, 500); // Limit length
};

/**
 * Format form data for API submission
 * @param {Object} formData - Raw form data
 * @param {string} role - User role
 * @returns {Object} Formatted data for API
 */
export const formatFormDataForAPI = (formData, role) => {
  const baseData = {
    email: sanitizeInput(formData.email?.toLowerCase()),
    password: formData.password,
    name: sanitizeInput(formData.name),
    role
  };
  
  if (role === 'writer') {
    return {
      ...baseData,
      penName: sanitizeInput(formData.penName),
      bio: sanitizeInput(formData.bio),
      genres: formData.genres || []
    };
  }
  
  if (role === 'reader') {
    return {
      ...baseData,
      preferredGenres: formData.preferredGenres || [],
      moodPreferences: formData.moodPreferences || []
    };
  }
  
  return baseData;
};

/**
 * Generate API headers with authentication
 * @param {boolean} includeAuth - Whether to include auth token
 * @returns {Object} Headers object
 */
export const getAPIHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};

/**
 * Handle API errors consistently
 * @param {Error} error - API error
 * @returns {string} User-friendly error message
 */
export const handleAPIError = (error) => {
  if (error.name === 'NetworkError' || !navigator.onLine) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.status === 401) {
    return 'Invalid credentials. Please check your email and password.';
  }
  
  if (error.status === 409) {
    return 'An account with this email already exists.';
  }
  
  if (error.status === 422) {
    return 'Please check your information and try again.';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred. Please try again.';
};

/**
 * Debounce function for form validation
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

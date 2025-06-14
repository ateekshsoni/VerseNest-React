/**
 * Authentication Context Provider
 * 
 * Provides authentication state and methods throughout the application
 * Handles user login, logout, registration, and role management
 * 
 * Features:
 * - JWT token management with localStorage
 * - User state persistence across sessions
 * - Role-based access control
 * - Form state management
 * - Error handling and validation
 * 
 * Backend Integration:
 * - Connect to your authentication API endpoints
 * - Handle token refresh logic
 * - Manage user sessions and permissions
 * 
 * @component
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [activeRole, setActiveRole] = useState(null); // 'reader' | 'writer'
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  /**
   * Initialize authentication state from localStorage
   * TODO: Replace with your JWT token validation logic
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          // TODO: Validate token with backend API
          // const isValid = await validateToken(token);
          const isValid = true; // Mock validation
          
          if (isValid) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          } else {
            // Clear invalid token
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with email and password
   * TODO: Integrate with your authentication API
   * 
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @param {string} credentials.role - User role (reader/writer)
   */
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      
      // Mock API response
      const mockResponse = {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: credentials.email,
          role: activeRole,
          name: credentials.name || 'User',
          createdAt: new Date().toISOString()
        }
      };

      if (mockResponse.success) {
        // Store authentication data
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('userData', JSON.stringify(mockResponse.user));
        
        setUser(mockResponse.user);
        setIsAuthenticated(true);
        
        return { success: true, user: mockResponse.user };
      } else {
        throw new Error(mockResponse.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   * TODO: Integrate with your registration API
   * 
   * @param {Object} userData - User registration data
   */
  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });

      // Mock API response
      const mockResponse = {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          role: activeRole,
          name: userData.name,
          createdAt: new Date().toISOString(),
          ...(activeRole === 'writer' && {
            penName: userData.penName,
            bio: userData.bio,
            genres: userData.genres
          }),
          ...(activeRole === 'reader' && {
            preferredGenres: userData.preferredGenres,
            moodPreferences: userData.moodPreferences
          })
        }
      };

      if (mockResponse.success) {
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('userData', JSON.stringify(mockResponse.user));
        
        setUser(mockResponse.user);
        setIsAuthenticated(true);
        
        return { success: true, user: mockResponse.user };
      } else {
        throw new Error(mockResponse.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and clear authentication data
   * TODO: Notify backend about logout
   */
  const logout = async () => {
    try {
      // TODO: Call logout API endpoint
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });

      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      setActiveRole(null);
      setActiveTab('login');
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Update user profile
   * TODO: Integrate with profile update API
   */
  const updateProfile = async (updatedData) => {
    try {
      // TODO: API call to update profile
      const updatedUser = { ...user, ...updatedData };
      
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Context value
  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    activeRole,
    activeTab,
    
    // Actions
    login,
    signup,
    logout,
    updateProfile,
    setActiveRole,
    setActiveTab,
    setError,
    
    // Computed values
    isReader: user?.role === 'reader',
    isWriter: user?.role === 'writer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

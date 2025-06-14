/**
 * StartJourney Page Component
 * 
 * Modern authentication page for VerseNest
 * Features role selection, login/signup forms, and SEO optimization
 * 
 * Backend Integration Points:
 * - Authentication API endpoints (/api/auth/login, /api/auth/register)
 * - JWT token management
 * - User session handling
 * - Role-based redirects
 * 
 * Performance Optimizations:
 * - Lazy loading for form components
 * - Framer Motion animations for smooth UX
 * - Optimized bundle splitting
 * - SEO-friendly meta tags
 * 
 * @component
 */

import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

// Lazy load authentication components for better performance
const AuthProvider = React.lazy(() => import('../components/Auth/AuthProvider'));
const AuthLayout = React.lazy(() => import('../components/Auth/AuthLayout'));

/**
 * Loading Component
 * Shows while authentication components are loading
 */
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-amber-900 mb-2">Loading VerseNest</h2>
      <p className="text-amber-700">Preparing your poetry journey...</p>
    </motion.div>
  </div>
);

/**
 * Error Fallback Component
 * Shows when there's an error loading authentication components
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md mx-auto p-8"
    >
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-red-900 mb-4">Oops! Something went wrong</h2>
      <p className="text-red-700 mb-6">
        We encountered an error while loading the authentication system. Please try again.
      </p>
      <button
        onClick={resetErrorBoundary}
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
      
      {/* Development error details */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
            Error Details (Development)
          </summary>
          <pre className="mt-2 text-xs bg-red-50 p-4 rounded border overflow-auto max-h-40">
            {error.message}
          </pre>
        </details>
      )}
    </motion.div>
  </div>
);

/**
 * StartJourney Component
 * 
 * Main entry point for user authentication
 * Handles both new user registration and existing user login
 * 
 * Features:
 * - Role-based authentication (Reader/Writer)
 * - Form validation and error handling
 * - Responsive design for all devices
 * - SEO optimization with meta tags
 * - Performance optimization with lazy loading
 * - Error boundaries for graceful error handling
 * - Accessibility compliance (WCAG AA)
 * 
 * TODO for Backend Integration:
 * 1. Replace mock authentication in AuthProvider with real API calls
 * 2. Add proper JWT token validation
 * 3. Implement forgot password functionality
 * 4. Add email verification for new accounts
 * 5. Set up proper error handling for API failures
 * 6. Add rate limiting for authentication attempts
 * 7. Implement social login options (Google, GitHub, etc.)
 * 
 * Performance Considerations:
 * - Components are lazy loaded to reduce initial bundle size
 * - Framer Motion animations are optimized for 60fps
 * - Forms use debounced validation to reduce re-renders
 * - Images are optimized and served in modern formats
 * 
 * Security Considerations:
 * - All user inputs are sanitized before submission
 * - Password strength requirements are enforced
 * - CSRF protection should be implemented in backend
 * - Rate limiting should be added for auth endpoints
 */
const StartJourney = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Start Your Poetry Journey | VerseNest</title>
        <meta 
          name="description" 
          content="Join VerseNest as a poet or poetry lover. Create an account to share your verses, discover new poems, and connect with our literary community." 
        />
        <meta name="keywords" content="poetry signup, join poetry community, poet registration, poetry platform, creative writing" />
        <link rel="canonical" href="https://versenest.com/start-journey" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Start Your Poetry Journey | VerseNest" />
        <meta property="og:description" content="Join our community of poets and poetry lovers. Share your verses and discover beautiful poetry." />
        <meta property="og:url" content="https://versenest.com/start-journey" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Start Your Poetry Journey | VerseNest" />
        <meta name="twitter:description" content="Join our community of poets and poetry lovers." />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="VerseNest" />
        <meta name="language" content="English" />
      </Helmet>

      {/* Error Boundary for graceful error handling */}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          // TODO: Log error to monitoring service (e.g., Sentry, LogRocket)
          console.error('StartJourney Error:', error, errorInfo);
        }}
      >
        {/* Suspense for lazy loaded components */}
        <Suspense fallback={<LoadingFallback />}>
          {/* Authentication Provider for state management */}
          <AuthProvider>
            {/* Main Authentication Layout */}
            <AuthLayout />
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default StartJourney;

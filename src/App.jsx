import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2, AlertCircle } from "lucide-react";

// Lazy load page components for better performance
const ComingSoonPage = React.lazy(() => import("./Pages/ComingSoonPage"));
const StartJourney = React.lazy(() => import("./Pages/StartJourney"));
const WriterHome = React.lazy(() => import("./Pages/WriterHome"));
const ReaderHomePage = React.lazy(() => import("./Pages/ReaderHomePage"));
const InboxPage = React.lazy(() => import("./Pages/InboxPage"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-amber-900 mb-2">Loading VerseNest</h2>
      <p className="text-amber-700">Preparing your poetry experience...</p>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        We encountered an unexpected error. Please try refreshing the page.
      </p>
      <button
        onClick={resetErrorBoundary}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            Error Details
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 p-4 rounded border overflow-auto max-h-40">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to monitoring service in production
        if (process.env.NODE_ENV === 'production') {
          // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
          console.error('App Error:', error, errorInfo);
        }
      }}
      onReset={() => {
        // Clear any error state and reload the page
        window.location.reload();
      }}
    >
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<ComingSoonPage />} />
          <Route path="/start-your-journey" element={<StartJourney />} />
          <Route path="/writer/home" element={<WriterHome />} />
          <Route path="/reader/home" element={<ReaderHomePage />} />
          <Route path="/inbox" element={<InboxPage />} />
          
          {/* 404 Fallback Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-amber-600 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-amber-900 mb-4">Page Not Found</h2>
                  <p className="text-amber-700 mb-8">
                    The poetry you're looking for has wandered off into the literary cosmos.
                  </p>
                  <a 
                    href="/" 
                    className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
                  >
                    Return to VerseNest
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

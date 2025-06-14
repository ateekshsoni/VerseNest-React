/**
 * Performance Monitoring Hooks for VerseNest
 * 
 * React hooks for monitoring performance, user interactions, and analytics
 */

import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook for tracking page views and user interactions
 */
export const useAnalytics = () => {
  const trackPageView = useCallback((pageName, additionalData = {}) => {
    const eventData = {
      event: 'page_view',
      page_name: pageName,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      ...additionalData,
    };

    // TODO: Send to analytics service (Google Analytics, Mixpanel, etc.)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Page View:', eventData);
    }

    // Example for Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        ...additionalData,
      });
    }
  }, []);

  const trackEvent = useCallback((action, category = 'user_interaction', label = '', value = 0) => {
    const eventData = {
      event: action,
      category,
      label,
      value,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Event:', eventData);
    }

    // TODO: Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  const trackTiming = useCallback((name, timing, category = 'performance') => {
    const timingData = {
      event: 'timing',
      name,
      timing,
      category,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('⏱️ Timing:', timingData);
    }

    // TODO: Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: name,
        value: timing,
        event_category: category,
      });
    }
  }, []);

  return { trackPageView, trackEvent, trackTiming };
};

/**
 * Hook for monitoring component performance
 */
export const usePerformanceMonitor = (componentName) => {
  const renderStartTime = useRef(Date.now());
  const { trackTiming } = useAnalytics();

  useEffect(() => {
    // Track initial render time
    const renderTime = Date.now() - renderStartTime.current;
    trackTiming(`${componentName}_render`, renderTime, 'component_performance');

    // Track mount time
    const mountTime = performance.now();
    trackTiming(`${componentName}_mount`, mountTime, 'component_performance');

    return () => {
      // Track unmount time if needed
      const unmountTime = performance.now();
      trackTiming(`${componentName}_unmount`, unmountTime, 'component_performance');
    };
  }, [componentName, trackTiming]);

  const measureOperation = useCallback((operationName, operation) => {
    const startTime = performance.now();
    const result = operation();
    
    if (result && typeof result.then === 'function') {
      // Handle async operations
      return result.finally(() => {
        const endTime = performance.now();
        trackTiming(`${componentName}_${operationName}`, endTime - startTime, 'operation_performance');
      });
    } else {
      // Handle sync operations
      const endTime = performance.now();
      trackTiming(`${componentName}_${operationName}`, endTime - startTime, 'operation_performance');
      return result;
    }
  }, [componentName, trackTiming]);

  return { measureOperation };
};

/**
 * Hook for tracking user engagement
 */
export const useEngagementTracking = () => {
  const { trackEvent } = useAnalytics();
  const sessionStart = useRef(Date.now());
  const lastActivity = useRef(Date.now());
  const scrollDepth = useRef(0);

  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > scrollDepth.current) {
        scrollDepth.current = scrollPercent;
        
        // Track scroll milestones
        if (scrollPercent >= 25 && scrollPercent < 50) {
          trackEvent('scroll_25', 'engagement', 'scroll_depth');
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          trackEvent('scroll_50', 'engagement', 'scroll_depth');
        } else if (scrollPercent >= 75 && scrollPercent < 90) {
          trackEvent('scroll_75', 'engagement', 'scroll_depth');
        } else if (scrollPercent >= 90) {
          trackEvent('scroll_90', 'engagement', 'scroll_depth');
        }
      }
    };

    // Track user activity
    const handleActivity = () => {
      lastActivity.current = Date.now();
    };

    // Track session duration on page unload
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStart.current;
      trackEvent('session_duration', 'engagement', 'time_on_page', Math.round(sessionDuration / 1000));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackEvent]);

  // Track specific interactions
  const trackClick = useCallback((elementName, additionalData = {}) => {
    trackEvent('click', 'interaction', elementName, 1);
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formName, success = true) => {
    trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'form', formName);
  }, [trackEvent]);

  const trackSearch = useCallback((query, resultsCount = 0) => {
    trackEvent('search', 'content', query, resultsCount);
  }, [trackEvent]);

  const trackShare = useCallback((contentType, contentId) => {
    trackEvent('share', 'social', `${contentType}_${contentId}`);
  }, [trackEvent]);

  return {
    trackClick,
    trackFormSubmit,
    trackSearch,
    trackShare,
  };
};

/**
 * Hook for monitoring Core Web Vitals
 */
export const useWebVitals = () => {
  const { trackTiming } = useAnalytics();

  useEffect(() => {
    // Import web-vitals dynamically to reduce bundle size
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        trackTiming('CLS', metric.value * 1000, 'web_vitals'); // Convert to milliseconds
      });

      getFID((metric) => {
        trackTiming('FID', metric.value, 'web_vitals');
      });

      getFCP((metric) => {
        trackTiming('FCP', metric.value, 'web_vitals');
      });

      getLCP((metric) => {
        trackTiming('LCP', metric.value, 'web_vitals');
      });

      getTTFB((metric) => {
        trackTiming('TTFB', metric.value, 'web_vitals');
      });
    }).catch(() => {
      console.warn('Web Vitals library not available');
    });
  }, [trackTiming]);
};

/**
 * Hook for error tracking
 */
export const useErrorTracking = () => {
  const { trackEvent } = useAnalytics();

  const trackError = useCallback((error, errorInfo = {}) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...errorInfo,
    };

    // Track error event
    trackEvent('error', 'technical', error.message);

    // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
      console.error('Error tracked:', errorData);
    }
  }, [trackEvent]);

  useEffect(() => {
    // Global error handler
    const handleError = (event) => {
      trackError(event.error, { type: 'global_error' });
    };

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event) => {
      trackError(new Error(event.reason), { type: 'unhandled_rejection' });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackError]);

  return { trackError };
};

/**
 * Hook for A/B testing
 */
export const useABTest = (testName, variants = ['A', 'B']) => {
  const { trackEvent } = useAnalytics();
  
  const getVariant = useCallback(() => {
    // Check if user already has a variant assigned
    const storageKey = `ab_test_${testName}`;
    let variant = localStorage.getItem(storageKey);
    
    if (!variant) {
      // Assign random variant
      variant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(storageKey, variant);
      
      // Track variant assignment
      trackEvent('ab_test_assigned', 'experiment', `${testName}_${variant}`);
    }
    
    return variant;
  }, [testName, variants, trackEvent]);

  const trackConversion = useCallback((conversionName) => {
    const variant = getVariant();
    trackEvent('ab_test_conversion', 'experiment', `${testName}_${variant}_${conversionName}`);
  }, [testName, getVariant, trackEvent]);

  return { getVariant, trackConversion };
};

/**
 * Custom hook for performance budgets
 */
export const usePerformanceBudget = (budgets = {}) => {
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    // Check performance budgets
    const checkBudgets = () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (budgets.loadTime && navigation.loadEventEnd > budgets.loadTime) {
        trackEvent('performance_budget_exceeded', 'performance', 'load_time', navigation.loadEventEnd);
      }
      
      if (budgets.domContentLoaded && navigation.domContentLoadedEventEnd > budgets.domContentLoaded) {
        trackEvent('performance_budget_exceeded', 'performance', 'dom_content_loaded', navigation.domContentLoadedEventEnd);
      }
      
      // Check bundle size if available
      if ('memory' in performance && budgets.memoryUsage) {
        const memoryUsage = performance.memory.usedJSHeapSize;
        if (memoryUsage > budgets.memoryUsage) {
          trackEvent('performance_budget_exceeded', 'performance', 'memory_usage', memoryUsage);
        }
      }
    };

    // Check budgets after page load
    if (document.readyState === 'complete') {
      checkBudgets();
    } else {
      window.addEventListener('load', checkBudgets);
      return () => window.removeEventListener('load', checkBudgets);
    }
  }, [budgets, trackEvent]);
};

export default {
  useAnalytics,
  usePerformanceMonitor,
  useEngagementTracking,
  useWebVitals,
  useErrorTracking,
  useABTest,
  usePerformanceBudget,
};

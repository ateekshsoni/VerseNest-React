/**
 * Performance Monitoring Utilities for VerseNest
 * 
 * This module provides performance monitoring and analytics utilities
 * for tracking Core Web Vitals and user experience metrics.
 */

// Core Web Vitals monitoring
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals to reduce bundle size
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      // Graceful fallback if web-vitals is not available
      console.warn('Web Vitals monitoring unavailable');
    });
  }
};

// Performance observer for custom metrics
export const observePerformance = () => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    
    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      entryList.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });

    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      fidObserver.observe({ type: 'first-input', buffered: true });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }
};

// Resource loading metrics
export const logResourceTiming = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    const slowResources = resources.filter(resource => resource.duration > 1000);
    
    if (slowResources.length > 0) {
      console.warn('Slow loading resources:', slowResources);
    }
  }
};

// Memory usage tracking (Chrome only)
export const logMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
    });
  }
};

// Error tracking utility
export const trackError = (error, errorInfo = {}) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...errorInfo,
  };

  // In production, send to error monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Sentry, LogRocket, or other monitoring service
    console.error('Error tracked:', errorData);
  } else {
    console.error('Development error:', errorData);
  }
};

// User interaction tracking
export const trackUserInteraction = (action, category = 'user', label = '') => {
  const interactionData = {
    action,
    category,
    label,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
  };

  // TODO: Send to analytics service (Google Analytics, Mixpanel, etc.)
  console.log('User interaction:', interactionData);
};

// Page load performance
export const measurePageLoad = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      console.log('Page Performance:', {
        totalLoadTime: `${loadTime}ms`,
        domReadyTime: `${domReady}ms`,
        dnsLookup: `${perfData.domainLookupEnd - perfData.domainLookupStart}ms`,
        tcpConnect: `${perfData.connectEnd - perfData.connectStart}ms`,
        serverResponse: `${perfData.responseEnd - perfData.requestStart}ms`,
        domProcessing: `${perfData.domComplete - perfData.domLoading}ms`,
      });
    }, 0);
  });
};

// Initialize all performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    observePerformance();
    measurePageLoad();
    
    // Log memory usage periodically
    setInterval(logMemoryUsage, 30000); // Every 30 seconds
    
    // Log resource timing after initial load
    setTimeout(logResourceTiming, 5000);
  }
};

export default {
  reportWebVitals,
  observePerformance,
  logResourceTiming,
  logMemoryUsage,
  trackError,
  trackUserInteraction,
  measurePageLoad,
  initPerformanceMonitoring,
};

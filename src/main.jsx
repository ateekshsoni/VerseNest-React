import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { initPerformanceMonitoring, reportWebVitals } from "./lib/performance.js";

// Initialize performance monitoring
initPerformanceMonitoring();

// Create root with concurrent features
const container = document.getElementById("root");
const root = createRoot(container, {
  // Enable concurrent features for better performance
  unstable_strictMode: true,
});

// Render the application
root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Report web vitals for performance monitoring
reportWebVitals((metric) => {
  // Log metrics in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
  
  // TODO: Send to analytics service in production
  // Example: gtag('event', metric.name, { metric_value: metric.value });
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // TODO: Send to error monitoring service
  // trackError(new Error(event.reason), { type: 'unhandledRejection' });
});

// Global error handler for JavaScript errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // TODO: Send to error monitoring service
  // trackError(event.error, { type: 'globalError' });
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

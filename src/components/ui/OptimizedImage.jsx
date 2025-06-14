/**
 * OptimizedImage Component
 * 
 * A high-performance image component with lazy loading, format detection,
 * responsive images, and fallback handling for VerseNest.
 */

import React, { useState, useRef, useEffect } from 'react';
import { lazyImageObserver, generateAvatarPlaceholder } from '../../lib/imageOptimization';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'blur',
  priority = false,
  sizes,
  quality = 75,
  fallbackName = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : null);
  const imgRef = useRef(null);
  const placeholderRef = useRef(null);

  // Generate placeholder for avatars
  const avatarPlaceholder = fallbackName ? 
    generateAvatarPlaceholder(fallbackName, Math.min(width || 64, height || 64)) : 
    null;

  useEffect(() => {
    if (!priority && imgRef.current && !currentSrc) {
      // Use intersection observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setCurrentSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [src, priority, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcSet if sizes are provided
  const generateSrcSet = (baseSrc) => {
    if (!sizes) return undefined;
    
    // This would typically integrate with an image CDN
    // For demo purposes, we'll return the original src
    return `${baseSrc} 1x, ${baseSrc} 2x`;
  };

  const imageClasses = `
    ${className}
    ${!isLoaded && !hasError ? 'opacity-0' : 'opacity-100'}
    transition-opacity duration-300 ease-in-out
    ${hasError ? 'hidden' : ''}
  `.trim();

  const placeholderClasses = `
    ${className}
    ${isLoaded || hasError ? 'opacity-0' : 'opacity-100'}
    transition-opacity duration-300 ease-in-out
    absolute inset-0 bg-gray-200
    ${placeholder === 'blur' ? 'backdrop-blur-sm' : ''}
  `.trim();

  return (
    <div className="relative inline-block" style={{ width, height }}>
      {/* Placeholder */}
      {!priority && !isLoaded && !hasError && (
        <div
          ref={placeholderRef}
          className={placeholderClasses}
          style={{ width, height }}
          aria-hidden="true"
        >
          {placeholder === 'blur' && (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}
          {placeholder === 'empty' && (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
      )}

      {/* Main Image */}
      {currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          srcSet={generateSrcSet(currentSrc)}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}

      {/* Avatar Fallback */}
      {hasError && avatarPlaceholder && (
        <img
          src={avatarPlaceholder}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={{ width, height }}
        />
      )}

      {/* Generic Fallback */}
      {hasError && !avatarPlaceholder && (
        <div
          className={`${className} bg-gray-200 flex items-center justify-center text-gray-500`}
          style={{ width, height }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Loading indicator for priority images */}
      {priority && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

/**
 * ResponsiveImage Component
 * 
 * Provides responsive images with multiple formats and sizes
 */
export const ResponsiveImage = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  breakpoints = [480, 768, 1024, 1280],
  formats = ['webp', 'jpg'],
  ...props
}) => {
  const [bestFormat, setBestFormat] = useState('jpg');

  useEffect(() => {
    // Detect best supported format
    const detectFormat = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      
      // Test WebP support
      const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      
      // Test AVIF support (more complex detection needed for production)
      setBestFormat(webpSupported ? 'webp' : 'jpg');
    };

    detectFormat();
  }, []);

  const generateSources = () => {
    return formats.map(format => {
      const srcSet = breakpoints
        .map(width => `${src.replace(/\.[^.]+$/, '')}_${width}w.${format} ${width}w`)
        .join(', ');

      return (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={srcSet}
          sizes={sizes}
        />
      );
    });
  };

  return (
    <picture className={className}>
      {generateSources()}
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        {...props}
      />
    </picture>
  );
};

/**
 * AvatarImage Component
 * 
 * Specialized component for user avatars with fallback generation
 */
export const AvatarImage = ({
  src,
  name,
  size = 64,
  className = '',
  ...props
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={`${name}'s avatar`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      fallbackName={name}
      {...props}
    />
  );
};

export default OptimizedImage;

/**
 * Image Optimization Utilities for VerseNest
 * 
 * This module provides image optimization, lazy loading, and responsive image utilities
 * to improve performance and user experience.
 */

// Image optimization configuration
const IMAGE_CONFIG = {
  // Supported formats in order of preference
  supportedFormats: ['avif', 'webp', 'jpg', 'png'],
  
  // Quality settings
  quality: {
    high: 85,
    medium: 70,
    low: 50,
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1280,
  },
  
  // Avatar sizes
  avatarSizes: {
    small: 32,
    medium: 64,
    large: 128,
    xlarge: 256,
  },
};

/**
 * Check if browser supports a specific image format
 * @param {string} format - Image format (webp, avif, etc.)
 * @returns {Promise<boolean>} Format support status
 */
export const supportsImageFormat = (format) => {
  return new Promise((resolve) => {
    const testImages = {
      webp: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=',
    };

    if (!testImages[format]) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(img.width === 2 && img.height === 2);
    img.onerror = () => resolve(false);
    img.src = testImages[format];
  });
};

/**
 * Get the best supported image format
 * @returns {Promise<string>} Best supported format
 */
export const getBestImageFormat = async () => {
  for (const format of IMAGE_CONFIG.supportedFormats) {
    if (await supportsImageFormat(format)) {
      return format;
    }
  }
  return 'jpg'; // Fallback
};

/**
 * Generate responsive image sources
 * @param {string} baseUrl - Base image URL without extension
 * @param {Object} options - Options for image generation
 * @returns {Object} Responsive image sources
 */
export const generateResponsiveImages = (baseUrl, options = {}) => {
  const { 
    formats = ['webp', 'jpg'],
    sizes = Object.values(IMAGE_CONFIG.breakpoints),
    quality = IMAGE_CONFIG.quality.medium 
  } = options;

  const sources = [];

  formats.forEach(format => {
    const srcSet = sizes
      .map(size => `${baseUrl}_${size}w.${format} ${size}w`)
      .join(', ');
    
    sources.push({
      type: `image/${format}`,
      srcSet,
      sizes: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw',
    });
  });

  return {
    sources,
    fallback: `${baseUrl}_${sizes[0]}w.jpg`,
    alt: options.alt || '',
  };
};

/**
 * Lazy loading intersection observer
 */
class LazyImageObserver {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      this.loadAllImages();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Load images 50px before they come into view
        threshold: 0.01,
      }
    );
  }

  observe(element) {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      this.loadImage(element);
    }
  }

  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    if (img.dataset.srcset) {
      img.srcSet = img.dataset.srcset;
      img.removeAttribute('data-srcset');
    }

    img.classList.remove('lazy-loading');
    img.classList.add('lazy-loaded');
  }

  loadAllImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.loadImage(img);
    });
  }
}

// Global lazy image observer instance
export const lazyImageObserver = new LazyImageObserver();

/**
 * Generate avatar placeholder with initials
 * @param {string} name - User name
 * @param {number} size - Avatar size
 * @param {string} backgroundColor - Background color
 * @returns {string} Data URL for avatar placeholder
 */
export const generateAvatarPlaceholder = (name, size = 64, backgroundColor = '#F59E0B') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = size;
  canvas.height = size;
  
  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);
  
  // Text
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.4}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, size / 2, size / 2);
  
  return canvas.toDataURL();
};

/**
 * Compress image file
 * @param {File} file - Image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<Blob>} Compressed image blob
 */
export const compressImage = (file, options = {}) => {
  return new Promise((resolve) => {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      type = 'image/jpeg',
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, type, quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Preload critical images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @returns {Promise<Array>} Promise that resolves when all images are loaded
 */
export const preloadImages = (imageUrls) => {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.allSettled(promises);
};

/**
 * Get image dimensions
 * @param {string} src - Image source URL
 * @returns {Promise<Object>} Image dimensions {width, height}
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
};

/**
 * Create optimized image URL
 * @param {string} baseUrl - Base image URL
 * @param {Object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export const createOptimizedImageUrl = (baseUrl, options = {}) => {
  const {
    width,
    height,
    quality = IMAGE_CONFIG.quality.medium,
    format = 'auto',
  } = options;

  // For demo purposes, return original URL
  // In production, this would integrate with image optimization service
  // like Cloudinary, ImageKit, or similar
  
  const params = new URLSearchParams();
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  if (quality) params.append('q', quality);
  if (format !== 'auto') params.append('f', format);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * React hook for lazy loading images
 * @param {string} src - Image source
 * @param {Object} options - Loading options
 * @returns {Object} Loading state and ref
 */
export const useLazyImage = (src, options = {}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => setIsLoaded(true);

  return {
    imgRef,
    isLoaded,
    isInView,
    handleLoad,
    src: isInView ? src : undefined,
  };
};

// CSS for lazy loading (to be added to global styles)
export const lazyLoadingCSS = `
  .lazy-loading {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .lazy-loaded {
    opacity: 1;
  }
  
  .lazy-blur {
    filter: blur(5px);
    transition: filter 0.3s ease;
  }
  
  .lazy-blur.lazy-loaded {
    filter: blur(0);
  }
`;

export default {
  supportsImageFormat,
  getBestImageFormat,
  generateResponsiveImages,
  lazyImageObserver,
  generateAvatarPlaceholder,
  compressImage,
  preloadImages,
  getImageDimensions,
  createOptimizedImageUrl,
  useLazyImage,
  lazyLoadingCSS,
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    }), 
    tailwindcss()
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/Pages"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },

  // Build optimizations
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Chunk splitting strategy
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          helmet: ['react-helmet-async'],
          
          // Component chunks
          reader: [
            './src/components/ReaderComponents/ReaderHomeLayout.jsx',
            './src/components/ReaderComponents/ReaderFeed.jsx',
            './src/components/ReaderComponents/FeaturedCarousel.jsx'
          ],
          writer: [
            './src/components/WriterComponents/HomeMainContent.jsx',
            './src/components/WriterComponents/PoemCard.jsx'
          ],
          chat: [
            './src/components/ChatComponents/ChatLayout.jsx',
            './src/components/ChatComponents/MessagesList.jsx'
          ],
          auth: [
            './src/components/Auth/AuthLayout.jsx',
            './src/components/Auth/AuthProvider.jsx'
          ]
        }
      }
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    reportCompressedSize: false, // Disable gzip size reporting for faster builds
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    
    // Target modern browsers for smaller bundles
    target: 'esnext',
  },

  // Development server optimizations
  server: {
    port: 5173,
    open: true, // Auto-open browser
    hmr: {
      overlay: true, // Show errors in browser overlay
    },
  },

  // CSS optimization
  css: {
    devSourcemap: true, // Enable CSS sourcemaps in dev
    transformer: 'postcss',
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-helmet-async',
      'react-error-boundary'
    ],
    exclude: [], // Dependencies to not pre-bundle
  },

  // Environment variables
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },

  // Preview server config (for production preview)
  preview: {
    port: 4173,
    open: true,
  },
});

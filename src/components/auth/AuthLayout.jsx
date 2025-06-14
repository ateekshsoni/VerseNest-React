/**
 * AuthLayout Component
 * 
 * Main layout component for authentication pages
 * Features hero section, SEO optimization, and responsive design
 * 
 * @component
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './AuthProvider';
import AuthBookLayout from './AuthBookLayout';

const AuthLayout = () => {
  const { user, isAuthenticated } = useAuth();

  // SEO meta data
  useEffect(() => {
    // Update meta tags for better SEO
    document.title = 'Join VerseNest - Where Poetry Finds Its Home';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join VerseNest as a reader or writer. Discover beautiful poetry, connect with poets, and share your own verses in our literary community.');
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Join VerseNest - Where Poetry Finds Its Home</title>
        <meta 
          name="description" 
          content="Join VerseNest as a reader or writer. Discover beautiful poetry, connect with poets, and share your own verses in our literary community." 
        />
        <meta name="keywords" content="poetry, poems, writers, readers, literature, verse, creative writing" />
        <meta property="og:title" content="Join VerseNest - Where Poetry Finds Its Home" />
        <meta property="og:description" content="Discover beautiful poetry and connect with a community of poets and poetry lovers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versenest.com/start-journey" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join VerseNest - Poetry Community" />
        <meta name="twitter:description" content="Join as a reader or writer in our beautiful poetry community." />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VerseNest",
            "description": "A poetry community platform for readers and writers",
            "url": "https://versenest.com",
            "applicationCategory": "SocialNetworkingApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Ccircle cx='9' cy='9' r='1'/%3E%3Ccircle cx='49' cy='49' r='1'/%3E%3Ccircle cx='29' cy='29' r='1'/%3E%3Ccircle cx='19' cy='19' r='1'/%3E%3Ccircle cx='39' cy='39' r='1'/%3E%3Ccircle cx='9' cy='49' r='1'/%3E%3Ccircle cx='49' cy='9' r='1'/%3E%3Ccircle cx='19' cy='39' r='1'/%3E%3Ccircle cx='39' cy='19' r='1'/%3E%3Ccircle cx='29' cy='9' r='1'/%3E%3Ccircle cx='9' cy='29' r='1'/%3E%3Ccircle cx='49' cy='29' r='1'/%3E%3Ccircle cx='29' cy='49' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-16 h-16 bg-amber-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 right-16 w-12 h-12 bg-orange-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-40 left-20 w-20 h-20 bg-rose-200 rounded-full opacity-20"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 min-h-screen flex flex-col"
        >
          {/* Header Quote */}
          <motion.header 
            variants={itemVariants}
            className="text-center pt-16 pb-8 px-4"
          >
            <motion.blockquote 
              className="relative max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <div className="absolute -top-4 -left-4 text-6xl text-amber-300 opacity-50 font-serif">"</div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-amber-900 leading-relaxed px-8">
                Every soul is either a storyteller or a seeker. Which one are you?
              </p>
              <div className="absolute -bottom-4 -right-4 text-6xl text-amber-300 opacity-50 font-serif">"</div>
            </motion.blockquote>
            
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-amber-700 font-light"
            >
              Join our community of poetry lovers and discover your literary journey
            </motion.p>
          </motion.header>

          {/* Main Authentication Section */}
          <motion.main 
            variants={itemVariants}
            className="flex-1 flex items-center justify-center px-4 py-8"
          >
            <AuthBookLayout />
          </motion.main>

          {/* Footer */}
          <motion.footer 
            variants={itemVariants}
            className="text-center pb-8 px-4"
          >
            <div className="max-w-md mx-auto">
              <motion.div 
                className="flex justify-center space-x-4 mb-4"
                variants={itemVariants}
              >
                <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
              </motion.div>
              
              <p className="text-sm text-amber-600">
                Join thousands of writers and readers in our growing poetry community
              </p>
              
              <div className="mt-4 flex justify-center space-x-6 text-xs text-amber-500">
                <a href="/about" className="hover:text-amber-700 transition-colors">
                  About VerseNest
                </a>
                <a href="/terms" className="hover:text-amber-700 transition-colors">
                  Terms
                </a>
                <a href="/privacy" className="hover:text-amber-700 transition-colors">
                  Privacy
                </a>
                <a href="/contact" className="hover:text-amber-700 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </>
  );
};

export default AuthLayout;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';

const CommingSoonPage = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const quoteRef = useRef(null);
  const featuresRef = useRef(null);
  const notifyRef = useRef(null);
  const devButtonRef = useRef(null);
  
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate elements in sequence
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 
      "-=0.5"
    )
    .fromTo(quoteRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 
      "-=0.3"
    )
    .fromTo(featuresRef.current.children, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 
      "-=0.2"
    )
    .fromTo(notifyRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 
      "-=0.3"
    )
    .fromTo(devButtonRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 
      "-=0.2"
    );

    // Floating animation for decorative elements
    gsap.to(".floating-element", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });
  }, { scope: containerRef });

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    alert("Thank you! We'll notify you when we launch.");
  };

  const handleDevAccess = () => {
    navigate('/writer/home');
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#f0ebe0] to-[#e8dcc6] relative overflow-hidden"
    >
      {/* Developer Access Button */}
      <div ref={devButtonRef} className="fixed top-6 right-6 z-50">
        <button
          onClick={handleDevAccess}
          className="group relative px-4 py-2 bg-[#2c2417]/90 backdrop-blur-sm text-white rounded-lg border border-[#2c2417]/20 hover:bg-[#2c2417] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-sm font-medium">Developer View</span>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#2c2417] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            View development version
          </div>
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-2 h-2 bg-[#2c2417] rounded-full opacity-20"></div>
        <div className="floating-element absolute top-40 right-20 w-3 h-3 bg-[#2c2417] rounded-full opacity-15"></div>
        <div className="floating-element absolute bottom-40 left-20 w-2 h-2 bg-[#2c2417] rounded-full opacity-25"></div>
        <div className="floating-element absolute bottom-20 right-10 w-4 h-4 bg-[#2c2417] rounded-full opacity-10"></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent to-[#2c2417] opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-px bg-gradient-to-l from-transparent to-[#2c2417] opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Main Content Container */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Logo/Brand Name */}
          <div ref={titleRef} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-[#2c2417] mb-4 font-[Playfair Display]">
              VerseNest
            </h1>
            <div className="w-24 h-1 bg-[#2c2417] mx-auto"></div>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="mb-12">
            <h2 className="text-2xl md:text-4xl text-[#2c2417] font-light mb-4">
              Coming Soon
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A sanctuary for poets and poetry lovers. Where words find their home and hearts find their voice.
            </p>
          </div>

          {/* Inspirational Quote */}
          <div ref={quoteRef} className="mb-16">
            <blockquote className="text-xl md:text-2xl italic text-[#2c2417] font-[Playfair Display] mb-4">
              "Poetry is the spontaneous overflow of powerful feelings recollected in tranquility."
            </blockquote>
            <cite className="text-sm text-gray-500">— William Wordsworth</cite>
          </div>

          {/* Features Preview */}
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#2c2417] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2c2417] mb-2">Share Your Voice</h3>
              <p className="text-sm text-gray-600">Publish your poetry and connect with fellow writers</p>
            </div>

            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#2c2417] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2c2417] mb-2">Discover Beauty</h3>
              <p className="text-sm text-gray-600">Explore curated poetry that speaks to your soul</p>
            </div>

            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#2c2417] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2c2417] mb-2">Join Community</h3>
              <p className="text-sm text-gray-600">Be part of a supportive community of poetry enthusiasts</p>
            </div>
          </div>

          {/* Notify Me Form */}
          <div ref={notifyRef} className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-[#2c2417] mb-4">
              Be the first to know when we launch
            </h3>
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-full border-2 border-[#2c2417]/20 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#2c2417] transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#2c2417] text-white rounded-full font-medium hover:bg-[#1a1611] transition-colors duration-300 whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              We'll never spam you. Unsubscribe at any time.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center text-sm text-gray-500">
          <p>© 2025 VerseNest. Crafted with love for poetry.</p>
        </div>
      </div>
    </div>
  );
};

export default CommingSoonPage;
import React from 'react';

/**
 * BackgroundAnimation Component
 * Provides a decorative animated background for the application
 * Uses a pattern SVG and gradient with animation
 */
const BackgroundAnimation = () => {
  return (
    <>
    <div className="background-animation fixed top-0 left-0 w-full h-full z-[-1] bg-[url('data:image/svg+xml,%3Csvg width=&apos;100&apos; height=&apos;100&apos; viewBox=&apos;0 0 100 100&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cpath d=&apos;M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z&apos; fill=&apos;%23dfd7c3&apos; fill-opacity=&apos;0.2&apos; fill-rule=&apos;evenodd&apos;/%3E%3C/svg%3E')] bg-gradient-to-b from-[#f5f1e8] to-[#f0e9d9] animate-[pageFlutter_20s_infinite_alternate]"></div>
    </>
  );
};

// Add the animation keyframes to the document
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pageFlutter {
      0%, 100% {
        background-position: 0% 0%;
      }
      25% {
        background-position: 100% 25%;
      }
      50% {
        background-position: 50% 50%;
      }
      75% {
        background-position: 25% 75%;
      }
    }
  `;
  document.head.appendChild(style);
};

// Run animation setup on import
addAnimationStyles();

export default BackgroundAnimation;
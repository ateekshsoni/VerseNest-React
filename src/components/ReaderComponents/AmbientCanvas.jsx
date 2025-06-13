/**
 * AmbientCanvas Component
 * 
 * Provides animated background with floating feathers and ink splatters
 * Creates an immersive literary atmosphere for the reader experience
 * 
 * Features:
 * - Responsive particle count based on screen size
 * - Two animation types: feathers and ink splatters
 * - Hardware-accelerated animations with requestAnimationFrame
 * - Automatic canvas resizing on window resize
 * 
 * @component
 * @example
 * <AmbientCanvas />
 */

import React, { useEffect, useRef } from 'react';

const AmbientCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  /**
   * Draw a feather particle on the canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} size - Feather size
   * @param {number} opacity - Opacity value (0-1)
   */
  const drawFeather = (ctx, x, y, size, opacity) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.globalAlpha = opacity;

    // Feather stem
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.strokeStyle = '#d4a76a';
    ctx.lineWidth = size / 10;
    ctx.stroke();

    // Feather barbs
    for (let i = -size; i < size; i += size / 5) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size / 2, i + size / 4);
      ctx.strokeStyle = '#d4a76a';
      ctx.lineWidth = size / 15;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(-size / 2, i + size / 4);
      ctx.stroke();
    }

    ctx.restore();
  };

  /**
   * Draw an ink splatter particle on the canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} size - Ink splatter size
   * @param {number} opacity - Opacity value (0-1)
   */
  const drawInk = (ctx, x, y, size, opacity) => {
    ctx.save();
    ctx.globalAlpha = opacity;

    // Main drop
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = '#5c4a36';
    ctx.fill();

    // Smaller splatters
    const splatterCount = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < splatterCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * size * 2 + size;
      const splatterX = x + Math.cos(angle) * distance;
      const splatterY = y + Math.sin(angle) * distance;
      const splatterSize = size * (Math.random() * 0.5 + 0.1);

      ctx.beginPath();
      ctx.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  /**
   * Initialize particles with random properties
   * @param {HTMLCanvasElement} canvas - Canvas element
   */
  const initializeParticles = (canvas) => {
    const particleCount = Math.min(window.innerWidth / 20, 30);
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1,
        type: Math.random() > 0.5 ? 'feather' : 'ink',
      });
    }
  };

  /**
   * Animation loop for particles
   */
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around screen
      if (particle.x < -20) particle.x = canvas.width + 20;
      if (particle.x > canvas.width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = canvas.height + 20;
      if (particle.y > canvas.height + 20) particle.y = -20;

      // Draw particle
      if (particle.type === 'feather') {
        drawFeather(ctx, particle.x, particle.y, particle.size * 3, particle.opacity * 0.7);
      } else {
        drawInk(ctx, particle.x, particle.y, particle.size, particle.opacity * 0.3);
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  /**
   * Resize canvas to match window dimensions
   */
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles after resize
      initializeParticles(canvas);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default AmbientCanvas;

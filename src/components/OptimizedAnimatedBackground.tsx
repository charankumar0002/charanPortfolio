import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const OptimizedAnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimelineRef = useRef<gsap.core.Timeline>();

  const initializeAnimations = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Kill existing animations
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }

    // Create a single timeline for all animations
    const tl = gsap.timeline({ repeat: -1 });

    // Animate morph shapes with reduced complexity
    const morphShapes = container.querySelectorAll('.morph-shape');
    morphShapes.forEach((shape, index) => {
      tl.to(shape, {
        scale: `random(0.8, 1.2)`,
        rotation: `random(-30, 30)`,
        duration: `random(6, 10)`,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }, index * 0.5);
    });

    // Animate geometric shapes with simpler transforms
    const geometricShapes = container.querySelectorAll('.geometric-shape');
    geometricShapes.forEach((shape, index) => {
      tl.to(shape, {
        y: `random(-30, 30)`,
        rotation: `random(-45, 45)`,
        duration: `random(4, 8)`,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }, index * 0.3);
    });

    animationTimelineRef.current = tl;
  }, []);

  useEffect(() => {
    // Use reduced motion if user prefers
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      initializeAnimations();
    }

    return () => {
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
    };
  }, [initializeAnimations]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden background-container"
      style={{ zIndex: -1 }}
    >
      {/* Static background layers */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Reduced blue accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/5 via-transparent to-blue-950/3" />
      
      {/* Fewer animated orbs for better performance */}
      <div className="morph-shape absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-600/2 to-blue-500/1 rounded-full blur-3xl will-change-transform" />
      <div className="morph-shape absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/2 to-blue-400/1 rounded-full blur-3xl will-change-transform" />

      {/* Reduced geometric shapes */}
      <div className="geometric-shape absolute top-20 left-20 w-3 h-3 border border-blue-400/8 rotate-45 will-change-transform" />
      <div className="geometric-shape absolute bottom-40 left-40 w-4 h-4 border border-blue-400/10 will-change-transform" />
      <div className="geometric-shape absolute bottom-20 right-20 w-4 h-4 border border-blue-400/8 rounded-lg will-change-transform" />
      <div className="geometric-shape absolute top-2/3 right-1/3 w-2 h-2 border border-blue-400/10 rounded-full will-change-transform" />

      {/* Static subtle lines - no animation for better performance */}
      <div className="absolute inset-0">
        <div className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/5 to-transparent top-1/4 left-0 right-0" />
        <div className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/4 to-transparent top-2/4 left-0 right-0" />
        <div className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/3 to-transparent top-3/4 left-0 right-0" />
      </div>

      {/* Static subtle orbs */}
      <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-r from-blue-500/1 to-blue-600/0.5 rounded-full blur-2xl" />
      <div className="absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-r from-blue-400/1 to-blue-500/0.5 rounded-full blur-2xl" />
    </div>
  );
};

export default OptimizedAnimatedBackground;
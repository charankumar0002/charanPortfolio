import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const OptimizedInteractiveShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  const isMouseNearRef = useRef(false);

  // Throttled mouse interaction
  const handleMouseInteraction = useCallback(() => {
    if (!isMouseNearRef.current) return;

    const { x: mouseX, y: mouseY } = mouseRef.current;

    shapesRef.current.forEach((shape) => {
      if (!shape) return;

      const rect = shape.getBoundingClientRect();
      const shapeX = rect.left + rect.width / 2;
      const shapeY = rect.top + rect.height / 2;
      
      const dx = mouseX - shapeX;
      const dy = mouseY - shapeY;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < 22500) { // 150px radius squared
        const distance = Math.sqrt(distanceSquared);
        const force = (150 - distance) / 150;
        const angle = Math.atan2(dy, dx);
        
        // Use simpler animation with shorter duration
        gsap.to(shape, {
          x: `+=${Math.cos(angle + Math.PI) * force * 15}`,
          y: `+=${Math.sin(angle + Math.PI) * force * 15}`,
          scale: 1 + force * 0.2,
          duration: 0.2,
          ease: "power1.out",
          overwrite: true
        });
      }
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = shapesRef.current;
    const animations: gsap.core.Timeline[] = [];
    const REDUCED_SHAPE_COUNT = 6; // Reduced from 12

    // Initialize fewer shapes with simpler animations
    shapes.slice(0, REDUCED_SHAPE_COUNT).forEach((shape, index) => {
      if (shape) {
        // Set initial position with better distribution
        const angle = (index / REDUCED_SHAPE_COUNT) * Math.PI * 2;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        gsap.set(shape, {
          x,
          y,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.3 + 0.7,
        });

        // Create simpler floating animation
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(shape, {
          y: `+=${Math.random() * 30 - 15}`,
          x: `+=${Math.random() * 20 - 10}`,
          rotation: `+=${Math.random() * 60 - 30}`,
          duration: Math.random() * 4 + 6,
          yoyo: true,
          ease: "sine.inOut",
        });

        animations[index] = tl;
        animationsRef.current[index] = tl;
      }
    });

    // Optimized mouse move handler with throttling
    let throttleTimer: NodeJS.Timeout | null = null;
    let interactionTimer: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isMouseNearRef.current = true;

      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        handleMouseInteraction();
        throttleTimer = null;
      }, 32); // ~30fps throttling for interaction

      // Reset interaction flag after mouse stops
      if (interactionTimer) clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => {
        isMouseNearRef.current = false;
      }, 100);
    };

    const handleMouseLeave = () => {
      isMouseNearRef.current = false;
      shapes.forEach((shape) => {
        if (shape) {
          gsap.to(shape, {
            scale: Math.random() * 0.3 + 0.7,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true
          });
        }
      });
    };

    // Use passive listeners for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clean up timers
      if (throttleTimer) clearTimeout(throttleTimer);
      if (interactionTimer) clearTimeout(interactionTimer);
      
      // Kill animations
      animations.forEach((tl) => {
        if (tl) tl.kill();
      });
      
      shapes.forEach((shape) => {
        if (shape) gsap.killTweensOf(shape);
      });
    };
  }, [handleMouseInteraction]);

  const addShapeRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      shapesRef.current[index] = el;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden shape-container"
      style={{ zIndex: 0 }}
    >
      {/* Reduced number of shapes for better performance */}
      <div
        ref={(el) => addShapeRef(el, 0)}
        className="absolute w-12 h-12 border border-purple-400/20 rounded-lg will-change-transform"
      />
      
      <div
        ref={(el) => addShapeRef(el, 1)}
        className="absolute w-8 h-8 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full will-change-transform"
      />
      
      <div
        ref={(el) => addShapeRef(el, 2)}
        className="absolute w-6 h-6 bg-gradient-to-r from-pink-400/20 to-purple-400/20 will-change-transform"
      />
      
      <div
        ref={(el) => addShapeRef(el, 3)}
        className="absolute w-14 h-14 border border-teal-400/20 rounded-full will-change-transform"
      />
      
      <div
        ref={(el) => addShapeRef(el, 4)}
        className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 rounded-full will-change-transform"
      />
      
      <div
        ref={(el) => addShapeRef(el, 5)}
        className="absolute w-10 h-10 border border-green-400/20 will-change-transform"
      />
    </div>
  );
};

export default OptimizedInteractiveShapes;
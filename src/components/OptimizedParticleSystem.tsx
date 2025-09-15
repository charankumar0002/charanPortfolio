import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  element: HTMLDivElement;
}

const OptimizedParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);

  // Throttled mouse move handler
  const throttledMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduce particle count for better performance
    const PARTICLE_COUNT = 15;
    const FPS = 30; // Limit to 30fps for better performance
    const FRAME_TIME = 1000 / FPS;

    const createParticle = (): Particle => {
      const element = document.createElement('div');
      element.className = 'absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-sm pointer-events-none';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Use CSS transforms instead of GSAP for initial positioning
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.style.willChange = 'transform';
      
      container.appendChild(element);

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size,
        opacity: Math.random() * 0.3 + 0.1,
        element
      };
    };

    const initParticles = () => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticles = (currentTime: number) => {
      if (currentTime - lastUpdateRef.current < FRAME_TIME) {
        return;
      }
      lastUpdateRef.current = currentTime;

      const { x: mouseX, y: mouseY } = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction with distance optimization
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < 10000) { // 100px radius squared
          const distance = Math.sqrt(distanceSquared);
          const force = (100 - distance) / 100;
          particle.vx -= (dx / distance) * force * 0.005;
          particle.vy -= (dy / distance) * force * 0.005;
        }

        // Boundary checks with wrapping
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.y > window.innerHeight + 10) particle.y = -10;

        // Use CSS transforms directly for better performance
        particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
        particle.element.style.opacity = particle.opacity.toString();
      });
    };

    const animate = (currentTime: number) => {
      updateParticles(currentTime);
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animationRef.current = requestAnimationFrame(animate);

    // Throttled mouse move listener
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        throttledMouseMove(e);
        throttleTimer = null;
      }, 16); // ~60fps throttling
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up particles
      particlesRef.current.forEach((particle) => {
        if (container.contains(particle.element)) {
          container.removeChild(particle.element);
        }
      });
      particlesRef.current = [];

      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [throttledMouseMove]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden particle-container"
      style={{ zIndex: 1 }}
    />
  );
};

export default OptimizedParticleSystem;
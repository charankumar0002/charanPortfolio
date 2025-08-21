import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particles = particlesRef.current;
    
    // Animate particles
    particles.forEach((particle, index) => {
      if (particle) {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: index * 0.1,
        });
      }
    });

    // Create morphing background shapes
    const morphShapes = container.querySelectorAll('.morph-shape');
    morphShapes.forEach((shape, index) => {
      gsap.to(shape, {
        scale: Math.random() * 0.5 + 0.8,
        rotation: Math.random() * 180,
        duration: Math.random() * 8 + 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.5,
      });
    });

    // Floating geometric shapes
    const geometricShapes = container.querySelectorAll('.geometric-shape');
    geometricShapes.forEach((shape, index) => {
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(shape, {
        y: -50,
        rotation: 180,
        duration: 4,
        ease: "power2.inOut",
      })
      .to(shape, {
        y: 0,
        rotation: 360,
        duration: 4,
        ease: "power2.inOut",
      });

      tl.delay(index * 0.8);
    });

    return () => {
      gsap.killTweensOf(particles);
      gsap.killTweensOf(morphShapes);
      gsap.killTweensOf(geometricShapes);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Pure black background with subtle gradient */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black animate-gradient-shift" />
      
      {/* Very subtle blue accent - minimal */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/10 via-transparent to-blue-950/5" />
      
      {/* Minimal floating orbs - very subtle */}
      <div className="morph-shape absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/3 to-blue-500/2 rounded-full blur-3xl" />
      <div className="morph-shape absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/3 to-blue-400/2 rounded-full blur-3xl" />
      <div className="morph-shape absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-r from-blue-400/3 to-blue-600/2 rounded-full blur-3xl" />

      {/* Minimal floating particles - very subtle */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`particle-${i}`}
          ref={el => el && (particlesRef.current[i] = el)}
          className="absolute w-0.5 h-0.5 bg-blue-400/20 rounded-full"
          style={{
            boxShadow: '0 0 3px rgba(96, 165, 250, 0.2)',
          }}
        />
      ))}

      {/* Minimal geometric shapes - very subtle */}
      <div className="geometric-shape absolute top-20 left-20 w-4 h-4 border border-blue-400/10 rotate-45" />
      <div className="geometric-shape absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-blue-400/10 to-blue-500/8 rounded-full" />
      <div className="geometric-shape absolute bottom-40 left-40 w-5 h-5 border border-blue-400/12 triangle" />
      <div className="geometric-shape absolute bottom-20 right-20 w-6 h-6 border border-blue-400/10 rounded-lg rotate-12" />
      <div className="geometric-shape absolute top-1/3 left-1/3 w-2 h-2 bg-gradient-to-r from-blue-400/15 to-blue-500/10" />
      <div className="geometric-shape absolute top-2/3 right-1/3 w-3 h-3 border border-blue-400/12 rounded-full" />

      {/* Subtle animated lines - minimal */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/8 to-transparent animate-pulse"
            style={{
              top: `${(i + 1) * 25}%`,
              left: '0',
              right: '0',
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + i * 1}s`,
            }}
          />
        ))}
      </div>

      {/* Minimal floating orbs - very subtle */}
      <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-r from-blue-500/2 to-blue-600/1 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-16 left-16 w-32 h-32 bg-gradient-to-r from-blue-400/2 to-blue-500/1 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-600/2 to-blue-400/1 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }} />
    </div>
  );
};

export default AnimatedBackground;

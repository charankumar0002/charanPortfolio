import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InteractiveShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = shapesRef.current;

    // Initialize shapes with random positions and rotations
    shapes.forEach((shape, index) => {
      if (shape) {
        gsap.set(shape, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
        });

        // Continuous floating animation
        gsap.to(shape, {
          y: `+=${Math.random() * 50 - 25}`,
          x: `+=${Math.random() * 30 - 15}`,
          rotation: `+=${Math.random() * 180 - 90}`,
          duration: Math.random() * 6 + 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      }
    });

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      shapes.forEach((shape) => {
        if (shape) {
          const rect = shape.getBoundingClientRect();
          const shapeX = rect.left + rect.width / 2;
          const shapeY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - shapeX, 2) + Math.pow(mouseY - shapeY, 2)
          );

          if (distance < 150) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(shapeY - mouseY, shapeX - mouseX);
            
            gsap.to(shape, {
              x: `+=${Math.cos(angle) * force * 20}`,
              y: `+=${Math.sin(angle) * force * 20}`,
              scale: 1 + force * 0.3,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
    };

    // Mouse leave - return to original state
    const handleMouseLeave = () => {
      shapes.forEach((shape) => {
        if (shape) {
          gsap.to(shape, {
            scale: Math.random() * 0.5 + 0.5,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      shapes.forEach((shape) => {
        if (shape) {
          gsap.killTweensOf(shape);
        }
      });
    };
  }, []);

  const addShapeRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      shapesRef.current[index] = el;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Various geometric shapes */}
      <div
        ref={(el) => addShapeRef(el, 0)}
        className="absolute w-16 h-16 border-2 border-purple-400/30 rounded-lg transform rotate-45"
      />
      
      <div
        ref={(el) => addShapeRef(el, 1)}
        className="absolute w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full"
      />
      
      <div
        ref={(el) => addShapeRef(el, 2)}
        className="absolute w-8 h-8 bg-gradient-to-r from-pink-400/25 to-purple-400/25 transform rotate-45"
      />
      
      <div
        ref={(el) => addShapeRef(el, 3)}
        className="absolute w-20 h-20 border border-teal-400/25 rounded-full"
      />
      
      <div
        ref={(el) => addShapeRef(el, 4)}
        className="absolute w-6 h-6 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full"
      />
      
      <div
        ref={(el) => addShapeRef(el, 5)}
        className="absolute w-14 h-14 border-2 border-green-400/25 transform rotate-12"
      />
      
      <div
        ref={(el) => addShapeRef(el, 6)}
        className="absolute w-10 h-10 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-lg transform -rotate-12"
      />
      
      <div
        ref={(el) => addShapeRef(el, 7)}
        className="absolute w-18 h-18 border border-cyan-400/30 rounded-full"
      />

      {/* Triangular shapes */}
      <div
        ref={(el) => addShapeRef(el, 8)}
        className="absolute w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-pink-400/25"
      />
      
      <div
        ref={(el) => addShapeRef(el, 9)}
        className="absolute w-0 h-0 border-l-6 border-r-6 border-b-10 border-transparent border-b-blue-400/30"
      />

      {/* Plus shapes */}
      <div
        ref={(el) => addShapeRef(el, 10)}
        className="absolute text-2xl text-purple-400/30 font-bold"
        style={{ fontFamily: 'monospace' }}
      >
        +
      </div>
      
      <div
        ref={(el) => addShapeRef(el, 11)}
        className="absolute text-lg text-cyan-400/25 font-bold"
        style={{ fontFamily: 'monospace' }}
      >
        ×
      </div>
    </div>
  );
};

export default InteractiveShapes;

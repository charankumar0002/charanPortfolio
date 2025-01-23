import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations setup
    const tl = gsap.timeline();
    
    // ... (previous animations remain the same)

    // Setup next button click animation
    nextButtonRef.current?.addEventListener('click', handleNextClick);

    return () => {
      nextButtonRef.current?.removeEventListener('click', handleNextClick);
    };
  }, []);

  const handleNextClick = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Smooth scroll to next section
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: "#about",
            offsetY: 0
          },
          ease: "power2.inOut"
        });
      }
    });

    // Parallax animation sequence
    tl.to('.hero-content', {
      scale: 0.95,
      y: -50,
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.5");
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Overlay for transition */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black opacity-0 pointer-events-none z-40"
      />

      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        {/* Background particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="hero-content relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          {/* ... (previous hero content remains the same) */}

          {/* Next Page Button */}
          <button
            ref={nextButtonRef}
            className="next-button group absolute bottom-12 flex flex-col items-center space-y-2 transform hover:scale-110 transition-transform duration-300"
            aria-label="Go to next section"
          >
            <span className="text-white/70 text-sm tracking-wider group-hover:text-white transition-colors">
              DISCOVER MORE
            </span>
            <div className="relative w-8 h-14 border-2 border-white/30 rounded-full p-1 group-hover:border-white transition-colors">
              <div className="animate-scroll w-1 h-3 bg-white/70 rounded-full mx-auto group-hover:bg-white" />
            </div>
          </button>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

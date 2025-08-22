import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current && progressBarRef.current) {
      // Initial setup
      gsap.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });
  
      // More accurate progress calculation
      const updateProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        gsap.set(progressBarRef.current, {
          scaleX: Math.min(Math.max(scrollPercent, 0), 1)
        });
      };

      // Initial call
      updateProgress();

      // Add scroll listener for more accurate updates
      window.addEventListener('scroll', updateProgress);
      window.addEventListener('resize', updateProgress);
  
      // Entrance animation
      gsap.from(progressRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });
  
      return () => {
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('resize', updateProgress);
      };
    }
  }, []);
  
  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 w-full h-2 bg-gray-900/50 backdrop-blur-sm z-50 border-b border-purple-500/20"
      aria-label="Scroll progress"
    >
      <div
        ref={progressBarRef}
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative"
        style={{
          boxShadow: '0 2px 15px rgba(168, 85, 247, 0.6), 0 0 30px rgba(6, 182, 212, 0.3)'
        }}
      >
        {/* Add a subtle animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50 blur-sm"></div>
      </div>
    </div>
  );
};

export default ScrollProgress;

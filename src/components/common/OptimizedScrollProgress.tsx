import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const OptimizedScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const ticking = useRef(false);

  const updateProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    
    if (progressBarRef.current) {
      // Use direct CSS transform for better performance
      progressBarRef.current.style.transform = `scaleX(${scrollPercent})`;
    }
    
    lastScrollTop.current = scrollTop;
    ticking.current = false;
  }, []);

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateProgress);
      ticking.current = true;
    }
  }, [updateProgress]);

  useEffect(() => {
    if (progressRef.current && progressBarRef.current) {
      // Initial setup with CSS transforms
      const progressBar = progressBarRef.current;
      progressBar.style.transform = 'scaleX(0)';
      progressBar.style.transformOrigin = 'left center';
      progressBar.style.willChange = 'transform';

      // Initial call
      updateProgress();

      // Optimized scroll listener with RAF
      const handleScroll = () => {
        requestTick();
      };

      // Optimized resize handler
      const handleResize = () => {
        requestTick();
      };

      // Use passive listeners for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });

      // Entrance animation - simpler version
      if (progressRef.current) {
        gsap.from(progressRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3
        });
      }

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [updateProgress, requestTick]);

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 w-full h-1.5 bg-gray-900/30 backdrop-blur-sm z-50 border-b border-purple-500/10 scroll-progress fixed-performance"
      aria-label="Scroll progress"
    >
      <div
        ref={progressBarRef}
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative"
        style={{
          boxShadow: '0 1px 8px rgba(168, 85, 247, 0.4)',
          willChange: 'transform'
        }}
      >
        {/* Simplified glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-30 blur-sm"></div>
      </div>
    </div>
  );
};

export default OptimizedScrollProgress;

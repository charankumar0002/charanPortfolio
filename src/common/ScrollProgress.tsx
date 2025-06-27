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
  
      // Progress animation
      const progressAnim = gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
  
      // Entrance animation
      gsap.from(progressRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });
  
      return () => {
        progressAnim.kill();
      };
    }
  }, []);
  
  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50"
      aria-label="Scroll progress"
    >
      <div
        ref={progressBarRef}
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
      />
    </div>
  );
};

export default ScrollProgress;

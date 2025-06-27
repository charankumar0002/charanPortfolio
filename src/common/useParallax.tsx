import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useParallax = (intensity = 1) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * intensity;
      
      gsap.to(element, {
        y: rate,
        duration: 0.5,
        ease: "none"
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return elementRef;
};

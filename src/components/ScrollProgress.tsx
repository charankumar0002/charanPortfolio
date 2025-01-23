import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ScrollProgress;

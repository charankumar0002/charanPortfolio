import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(indicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div ref={indicatorRef} className="fixed bottom-10 right-10 z-50">
      <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-white/50 rounded-full" />
      </div>
    </div>
  );
};

export default ScrollIndicator;

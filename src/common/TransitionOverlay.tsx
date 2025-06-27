import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TransitionOverlayProps {
  isAnimating: boolean;
  onComplete?: () => void;
}

const TransitionOverlay = ({ isAnimating, onComplete }: TransitionOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimating) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            onComplete
          });
        }
      });
    }
  }, [isAnimating, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black opacity-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
};

export default TransitionOverlay;

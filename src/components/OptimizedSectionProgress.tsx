import { useEffect, useState, useCallback, useRef } from 'react';

interface OptimizedScrollProgressProps {
  targetId: string;
}

export const OptimizedSectionProgress: React.FC<OptimizedScrollProgressProps> = ({ targetId }) => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const updateProgress = useCallback(() => {
    const element = elementRef.current || document.getElementById(targetId);
    if (!element) {
      ticking.current = false;
      return;
    }

    // Cache element reference
    if (!elementRef.current) {
      elementRef.current = element;
    }

    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const elementBottom = elementTop + rect.height;
    const windowTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowBottom = windowTop + windowHeight;

    if (windowBottom >= elementTop && windowTop <= elementBottom) {
      const visibleTop = Math.max(elementTop, windowTop);
      const visibleBottom = Math.min(elementBottom, windowBottom);
      const visibleHeight = visibleBottom - visibleTop;
      const progressValue = Math.min(
        (visibleHeight / (rect.height * 0.8)) * 100,
        100
      );
      setProgress(progressValue);
    } else {
      setProgress(0);
    }

    ticking.current = false;
  }, [targetId]);

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateProgress);
      ticking.current = true;
    }
  }, [updateProgress]);

  useEffect(() => {
    const handleScroll = () => {
      requestTick();
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateProgress, requestTick]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/40 backdrop-blur-sm rounded-full p-2.5 border border-white/5">
      <div className="relative w-10 h-10">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#00aaff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`${progress}, 100`}
            style={{ 
              transition: 'stroke-dasharray 0.2s ease-out',
              willChange: 'stroke-dasharray'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white/90">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
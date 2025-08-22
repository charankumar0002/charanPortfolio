import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  targetId: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ targetId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(targetId);
      if (!element) return;

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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetId]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/10">
      <div className="relative w-12 h-12">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#00aaff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${progress}, 100`}
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

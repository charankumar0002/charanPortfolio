import { useEffect, useRef } from 'react';

interface PerformanceStats {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
}

const PerformanceMonitor = ({ enabled = false }: { enabled?: boolean }) => {
  const statsRef = useRef<PerformanceStats>({ fps: 0, frameTime: 0 });
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;

    const measurePerformance = () => {
      const now = performance.now();
      const deltaTime = now - lastTimeRef.current;
      
      frameCountRef.current++;
      
      // Update stats every second
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        const frameTime = Math.round(deltaTime / frameCountRef.current * 100) / 100;
        
        const performanceWithMemory = performance as Performance & {
          memory?: { usedJSHeapSize: number };
        };
        
        statsRef.current = {
          fps,
          frameTime,
          memoryUsage: performanceWithMemory.memory?.usedJSHeapSize 
            ? Math.round(performanceWithMemory.memory.usedJSHeapSize / 1024 / 1024 * 100) / 100 
            : undefined
        };

        if (displayRef.current) {
          displayRef.current.innerHTML = `
            FPS: ${fps}<br/>
            Frame: ${frameTime}ms
            ${statsRef.current.memoryUsage ? `<br/>Memory: ${statsRef.current.memoryUsage}MB` : ''}
          `;
        }

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameId = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div 
      ref={displayRef}
      className="fixed bottom-4 left-4 bg-black/80 text-green-400 p-2 rounded text-xs font-mono z-50 backdrop-blur-sm border border-green-400/20"
      style={{ fontSize: '10px', lineHeight: '1.2' }}
    />
  );
};

export default PerformanceMonitor;
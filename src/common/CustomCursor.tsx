import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Hide default cursor
    document.body.style.cursor = 'none';

    if (cursor && follower) {
      // Initialize cursor position
      const initCursor = () => {
        gsap.set(cursor, { x: -100, y: -100 });
        gsap.set(follower, { x: -100, y: -100 });
      };

      initCursor();

      const moveCursor = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        gsap.to(cursor, {
          x: x - 8, // Offset by half the cursor width (16px / 2)
          y: y - 8, // Offset by half the cursor height (16px / 2)
          duration: 0,
          ease: "none"
        });

        gsap.to(follower, {
          x: x - 16, // Offset by half the follower width (32px / 2)
          y: y - 16, // Offset by half the follower height (32px / 2)
          duration: 0.15,
          ease: "power2.out"
        });
      };

      const handleMouseEnter = () => {
        gsap.to([cursor, follower], {
          opacity: 1,
          duration: 0.3
        });
      };

      const handleMouseLeave = () => {
        gsap.to([cursor, follower], {
          opacity: 0,
          duration: 0.3
        });
      };

      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.body.style.cursor = 'auto';
      };
    }
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor-main"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
};

export default CustomCursor;

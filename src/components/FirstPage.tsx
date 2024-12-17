import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FirstPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 2 }
      );
    }
  }, []);

  return (
    <div ref={heroRef} className="flex items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
    </div>
  );
};

export default FirstPage;

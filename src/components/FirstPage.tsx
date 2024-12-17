import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FirstPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 2 }
      );
    }
  }, []);

  return (
    <div ref={heroRef} className="h-[100vh] flex items-center justify-center align-center bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
    </div>
  );
};

export default FirstPage;

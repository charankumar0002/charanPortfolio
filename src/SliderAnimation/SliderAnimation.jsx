import React, { useState, useRef, useEffect } from 'react';

const SlideInComponent = () => {
  const [inView, setInView] = useState(false); // To track if element is in view
  const elementRef = useRef(null); // Reference to the element

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Trigger animation when in view
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current); // Observe the component
    }

    return () => {
      if (elementRef.current) {
        observer.disconnect(); // Clean up on component unmount
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-1000 ease-in-out ${
        inView ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <h2 className="text-3xl font-bold text-center">Slide-in Component</h2>
      <p className="mt-4 text-lg text-center">
        This content will slide in as you scroll down the page!
      </p>
    </div>
  );
};

export default SlideInComponent;

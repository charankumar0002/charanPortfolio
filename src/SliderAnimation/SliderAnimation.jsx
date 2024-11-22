import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const SlideInComponent = () => {
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "50px" 
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`relative transform transition-all duration-1000 ease-in-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <div className="sticky top-1/2 -translate-y-1/2 p-8 backdrop-blur-sm bg-white/30 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Slide-in Component</h2>
        <p className="mt-4 text-lg text-center">
          This content will parallax as you scroll down the page!
        </p>
      </div>
    </div>
  );
};

export default SlideInComponent;

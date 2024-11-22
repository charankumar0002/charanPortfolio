import './App.css'
import SlideInComponent from './SliderAnimation/SliderAnimation'
import { useEffect, useState } from 'react'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // SVG Wire Paths
  const wirePaths = [
    "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80",
    "M10 120 C 60 50, 85 50, 115 120 S 170 190, 200 120",
    "M10 160 C 80 90, 105 90, 135 160 S 190 230, 220 160"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Background with SVG Wires */}
      <div className="fixed inset-0 w-full h-full">
        <svg 
          className="w-full h-full"
          style={{
            transform: `translateY(${scrollPosition * 0.3}px)`,
            opacity: 0.3
          }}
        >
          <pattern 
            id="wirePattern" 
            width="200" 
            height="200" 
            patternUnits="userSpaceOnUse"
          >
            {wirePaths.map((path, index) => (
              <path
                key={index}
                d={path}
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-blue-500"
              />
            ))}
          </pattern>
          <rect width="100%" height="100%" fill="url(#wirePattern)" />
        </svg>
      </div>

      {/* Content Sections */}
      <div className="relative">
        {[1, 2, 3].map((section, index) => (
          <div 
            key={index} 
            className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
          >
            <div className="text-center text-white z-10">
              <h2 className="text-4xl font-bold mb-4">Section {section}</h2>
              <SlideInComponent />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App

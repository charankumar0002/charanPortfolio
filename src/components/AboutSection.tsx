import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  id: string;
}

function AboutSection({ id }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current,
        {
          x: -100,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Triggers earlier
            end: "top 20%",
            toggleActions: "play none none reverse",
            markers: false, // Remove in production
            scrub: false
          },
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Content animations
      const contentElements = contentRef.current?.children || [];
      gsap.fromTo(contentElements,
        {
          y: 50,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%", // Triggers earlier
            end: "top 25%",
            toggleActions: "play none none reverse",
            markers: false, // Remove in production
            scrub: false
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        }
      );
    });

    // Cleanup function
    return () => {
      ctx.revert(); // This will clean up all GSAP animations
    };
  }, []);
  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-black flex items-center py-20"
    >
      <div className="loader absolute inset-0 bg-purple-900 z-50" />
      <div className="background-gradient absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-50" />
      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="src/assets/CharanImage.jpg"
                alt="Profile"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-purple-600/20 mix-blend-overlay" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <h2 className="text-5xl font-bold text-white">
              The Developer Behind the Code
            </h2>

            <p className="text-xl text-purple-200/80 leading-relaxed">
              Hi! I'm Charan, a Front-End Developer with 2+ years of experience building scalable and dynamic web applications. I specialize in React.js, JavaScript, and Tailwind CSS, with a passion for creating engaging user interfaces for real-world products.
            </p>

            <div className="space-y-4">
              {[
                { label: "Experience", value: "2+ Years" },
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "30+" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-purple-200/80"
                >
                  <span className="text-lg font-medium w-32">{item.label}</span>
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>

            {/* <button className="px-8 py-4 bg-purple-600 text-white rounded-lg
                           hover:bg-purple-700 transition-colors duration-300">
              View Portfolio
            </button> */}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create scroll trigger animations
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        toggleActions: "play none none reverse"
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(contentRef.current?.children || [], {
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });

  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-black flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/your-image.jpg" // Replace with your image
                alt="Profile"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-purple-600/20 mix-blend-overlay" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <h2 className="text-5xl font-bold text-white">
              About Me
            </h2>
            
            <p className="text-xl text-purple-200/80 leading-relaxed">
              I'm a passionate frontend developer with a keen eye for design and
              a love for creating seamless user experiences.
            </p>

            <div className="space-y-4">
              {[
                { label: "Experience", value: "5+ Years" },
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

            <button className="px-8 py-4 bg-purple-600 text-white rounded-lg
                           hover:bg-purple-700 transition-colors duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

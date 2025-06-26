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
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (section && image && content) {
      const ctx = gsap.context(() => {
        gsap.fromTo(image,
          { x: -100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
              markers: false,
              scrub: false
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out"
          }
        );

        const contentElements = content.children || [];
        gsap.fromTo(contentElements,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: content,
              start: "top 75%",
              end: "top 25%",
              toggleActions: "play none none reverse",
              markers: false,
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

      return () => {
        ctx.revert();
      };
    }
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen bg-black flex items-center py-20"
    >
      <div className="loader absolute inset-0 z-50" />
      <div className="background-gradient absolute inset-0 opacity-50" />
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
          <div ref={imageRef} className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/CharanImage.jpg"
                alt="Photo of Charan Kumar Reddy Palukuru"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-purple-600/20 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          </div>

          <div ref={contentRef} className="space-y-8">
            <h2 className="text-5xl font-bold text-white">
              Crafting Scalable & Dynamic Products
            </h2>

            <p className="text-xl text-purple-200/80 leading-relaxed">
              Hi! I'm Charan, a Front-End Developer working in a product-based company for over 2 years. I specialize in building scalable and high-performance web applications using React.js, TypeScript, Next.js, and Redux.
            </p>

            <p className="text-lg text-gray-300 italic">
              "Passionate about crafting interactive and scalable applications, I thrive on solving complex problems and pushing the limits of front-end development."
            </p>

            <div className="space-y-4">
              {[
                { label: "Experience", value: "2+ Years" },
                { label: "Main Skills", value: "React.js, TypeScript, Next.js, Redux" },
                { label: "Learning", value: "Node.js, Docker, Cloud" }
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

            <div className="space-y-4">
              <h3 className="text-3xl font-semibold text-white">Fun Facts & Interests</h3>
              <ul className="list-disc list-inside text-purple-200/80">
                <li>🚀 Love optimizing performance and enhancing user experience.</li>
                <li>🎯 Interested in Open Source contributions.</li>
                <li>🌍 Exploring Cloud and Backend to become a Full-Stack Developer.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

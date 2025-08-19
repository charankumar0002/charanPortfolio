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
              Software Developer | React & Next.js Specialist
            </h2>

            <p className="text-xl text-purple-200/80 leading-relaxed">
              An enterprising professional with <span className="font-bold">~2.7 years</span> of experience in the tech industry, focusing on frontend development. Dedicated to delivering user-friendly and responsive web applications that enhance user interaction. Experienced in building SEO-optimized, SSR web applications using Next.js with measurable outcomes: Lighthouse accessibility <span className="font-bold">96+</span>, <span className="font-bold">~25%</span> LCP reduction, <span className="font-bold">~20%</span> regression reduction via unit/component tests, and <span className="font-bold">+15%</span> payment success rate.
            </p>

            <p className="text-lg text-gray-300 italic">
              "Aiming to express potential and deliver results through challenging assignments as a Software Developer with an esteemed organization."
            </p>

            <div className="space-y-4">
              {[
                { label: "Experience", value: "2.7 Years" },
                { label: "Location", value: "Bengaluru, Karnataka" },
                { label: "Education", value: "B.Tech, Electronics Communications Engineering" },
                { label: "Key Skills", value: "React.js, Next.js, TypeScript, Redux Toolkit" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-purple-200/80"
                >
                  <span className="text-lg font-medium w-40">{item.label}</span>
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-semibold text-white">Core Competencies</h3>
              <ul className="list-disc list-inside text-purple-200/80 grid grid-cols-1 md:grid-cols-2 gap-2">
                <li>🚀 Front-end/User Experience Design</li>
                <li>⚡ Performance Optimization</li>
                <li>🔄 Agile Methodologies</li>
                <li>🧩 Component-Based Architecture</li>
                <li>📱 Responsive Web Design</li>
                <li>🌐 Cross-Browser Compatibility</li>
                <li>♿ Accessibility Standards</li>
                <li>🔌 API Integration</li>
                <li>🔄 Continuous Integration/Deployment (CI/CD)</li>
                <li>🔄 Software Development Lifecycle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

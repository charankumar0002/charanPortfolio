import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const bio = bioRef.current;
    const details = detailsRef.current;

    // Image reveal animation
    gsap.from(image, {
      scrollTrigger: {
        trigger: image,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
    });

    // Bio text reveal animation
    gsap.from(bio?.children || [], {
      scrollTrigger: {
        trigger: bio,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    // Details cards animation
    gsap.from('.detail-card', {
      scrollTrigger: {
        trigger: details,
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-black to-indigo-950 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src="/your-image.jpg" // Replace with your image
                alt="Your Name"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full blur-2xl -z-10" />
          </div>

          {/* Content Column */}
          <div className="space-y-12">
            {/* Bio Section */}
            <div ref={bioRef} className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                About Me
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Hello! I'm a passionate developer with a keen eye for design and a love for creating
                seamless user experiences. My journey in web development started with a curiosity
                for building things that live on the internet.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in building digital experiences that combine clean code with creative
                design solutions. When I'm not coding, you can find me exploring new technologies
                or working on personal projects.
              </p>
            </div>

            {/* Details Cards */}
            <div ref={detailsRef} className="grid grid-cols-2 gap-6">
              {[
                {
                  title: "Experience",
                  value: "3+ Years",
                  icon: "🚀"
                },
                {
                  title: "Projects",
                  value: "50+",
                  icon: "💼"
                },
                {
                  title: "Location",
                  value: "Your Location",
                  icon: "📍"
                },
                {
                  title: "Education",
                  value: "Your Degree",
                  icon: "🎓"
                }
              ].map((detail, index) => (
                <div
                  key={index}
                  className="detail-card bg-white/5 backdrop-blur-sm rounded-lg p-6 
                           transform hover:scale-105 transition-transform duration-300"
                >
                  <span className="text-3xl mb-4 block">{detail.icon}</span>
                  <h3 className="text-white font-medium">{detail.title}</h3>
                  <p className="text-purple-300 mt-2">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "JavaScript", "TypeScript", "React", "Node.js", 
                  "Next.js", "TailwindCSS", "GSAP", "Git"
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-white
                             hover:bg-white/20 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkExperienceProps {
  id: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: "Tech Innovators",
    role: "Front-End Developer",
    duration: "Jan 2022 - Present",
    description: "Developed and maintained web applications using React.js and Tailwind CSS. Collaborated with the design team to implement responsive UI components."
  },
  {
    company: "Web Solutions Ltd.",
    role: "Junior Developer",
    duration: "Jun 2021 - Dec 2021",
    description: "Assisted in building and testing web applications. Contributed to code reviews and participated in agile development processes."
  }
];

function WorkExperience({ id }: WorkExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".experience-item",
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-item bg-white/10 p-6 rounded-lg shadow-lg hover:bg-white/20 transition-all"
            >
              <h3 className="text-2xl font-semibold text-white">
                {exp.role} @ {exp.company}
              </h3>
              <p className="text-purple-200/80 mt-2">{exp.duration}</p>
              <p className="text-white/70 mt-4 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkExperience;

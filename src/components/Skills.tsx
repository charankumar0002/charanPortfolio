import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  id: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "💻",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python"]
  },
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "Backend & APIs",
    icon: "⚙️",
    skills: ["Node.js (Basic)", "REST APIs"]
  },
  {
    title: "Tools & Deployment",
    icon: "🛠️",
    skills: ["Webpack", "Babel", "Vite", "ESLint", "Git"]
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    skills: ["CI/CD", "AWS (S3, Lambda)", "Docker (Basic)"]
  }
];

function Skills({ id }: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".skill-category",
          { y: 50, opacity: 0, scale: 0.8 },
          {
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
              markers: false,
              scrub: false
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.inOut"
          }
        );
      });

      return () => {
        ctx.revert();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary mb-6 animate-pulse">Technical Skills</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A categorized breakdown of my technical expertise, covering frontend, backend, and cloud technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105 hover:shadow-xl hover:rotate-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl animate-bounce">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-primary">{category.title}</h3>
              </div>
              <ul className="list-disc list-inside text-gray-300">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="mb-2 text-lg hover:text-white transition-colors">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;

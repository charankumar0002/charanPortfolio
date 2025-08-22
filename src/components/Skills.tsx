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
    title: "Frontend",
    icon: "⚛️",
    skills: ["React.js (18)", "Next.js 14", "TypeScript", "JavaScript (ES6+)", "Server-Side Rendering", "Dynamic Routing"],
  },
  {
    title: "State/Data Management",
    icon: "🗄️",
    skills: ["Redux Toolkit", "Zustand", "Yup", "React Query (Basic)", "Formik"],
  },
  {
    title: "Styling",
    icon: "🎨",
    skills: ["Tailwind CSS", "Bootstrap", "Material-UI", "CSS Modules", "SCSS"],
  },
  {
    title: "Tooling & Build",
    icon: "🛠️",
    skills: ["Vite", "Webpack", "ESLint", "Prettier", "Git", "GitHub Actions", "Jira"],
  },
  {
    title: "Backend",
    icon: "🔌",
    skills: ["REST APIs", "Node.js (Basic)", "FastAPI (Learning)", "Python"]
  },
  {
    title: "Databases",
    icon: "🗃️",
    skills: ["PostgreSQL (Basic)", "MongoDB (Basic)"]
  },
  {
    title: "Testing",
    icon: "🧪",
    skills: ["Jest", "Vitest"]
  },
  {
    title: "DevOps & Performance",
    icon: "☁️",
    skills: ["Vercel", "Docker (Basic)", "Lighthouse", "SEO Audits"]
  },
  {
    title: "Core Competencies",
    icon: "📋",
    skills: ["Performance Optimization", "Agile Methodologies", "Component-Based Architecture", "Responsive Web Design", "Cross-Browser Compatibility", "Accessibility Standards"]
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
    <div id={id} ref={containerRef} className="min-h-screen py-12 sm:py-16 lg:py-20 text-white">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">Technical Skills</h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mx-auto glass-effect rounded-lg p-4 sm:p-6">
            I specialize in frontend development with a focus on building responsive, accessible, and performant web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category glass-effect rounded-xl p-4 sm:p-6 hover:glass-effect-strong transition-all duration-300 subtle-border hover:shadow-subtle-glow transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 animate-pulse hover:animate-bounce transition-all duration-300">{category.icon}</span>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-white/70 text-xs sm:text-sm flex items-center hover:text-primary transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                    {skill}
                  </li>
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

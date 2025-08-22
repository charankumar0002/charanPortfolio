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
    <div id={id} ref={containerRef} className="min-h-screen bg-black py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary mb-6 animate-pulse">Technical Skills</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            I specialize in frontend development with a focus on building responsive, accessible, and performant web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-white/70 text-sm flex items-center"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
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

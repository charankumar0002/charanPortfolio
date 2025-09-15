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
    <div id={id} ref={containerRef} className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 text-white relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-28 h-28 sm:w-40 sm:h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Enhanced title with decorative elements */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wide">
              Technical Skills
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Specialized in frontend development with modern web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-700/50 hover:border-purple-500/50 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg sm:hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl md:rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                  <div className="relative">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 block group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">{category.title}</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-xs sm:text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex-shrink-0"></div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;

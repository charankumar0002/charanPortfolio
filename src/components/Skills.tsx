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
    skills: ["Vite", "Webpack", "ESLint", "Prettier", "Git", "GitHub Actions"],
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
    skills: ["Jest", "Vitest", "React Testing Library"]
  },
  {
    title: "DevOps & Performance",
    icon: "☁️",
    skills: ["Vercel", "Docker (Basic)", "Lighthouse", "SEO Audits"]
  },
  {
    title: "Core Competencies",
    icon: "📋",
    skills: ["Performance Optimization", "Agile Methodologies", "Component Architecture", "Responsive Design", "Cross-Browser Compatibility", "Accessibility Standards"]
  }
];

function Skills({ id }: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const ctx = gsap.context(() => {
        // Animate cards
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

        // Animate floating icons with staggered delays
        gsap.to(".floating-icon", {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 1,
            from: "random"
          }
        });

        // Add rotation to specific icons on hover
        gsap.set(".floating-icon", {
          transformOrigin: "center center"
        });

        // Add interactive hover effects
        const skillCards = document.querySelectorAll('.skill-category');
        skillCards.forEach((card) => {
          const icon = card.querySelector('.floating-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              rotation: 360,
              scale: 1.2,
              duration: 0.6,
              ease: "back.out(1.7)"
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
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
          <p className="text-xl text-white/80 max-w-3xl mx-auto glass-effect rounded-lg p-6 bg-black/40 border border-white/10">
            I specialize in frontend development with a focus on building responsive, accessible, and performant web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`skill-category glass-effect rounded-xl p-6 hover:glass-effect-strong transition-all duration-300 subtle-border hover:shadow-subtle-glow card-hover-lift skill-card-3d skill-glow-border group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm ${
                index % 3 === 0 ? 'glass-card-primary card-pattern-dots' : 
                index % 3 === 1 ? 'glass-card-secondary card-pattern-waves' : 
                'card-pattern-grid'
              }`}
            >
              {/* Floating Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="floating-icon text-4xl transform group-hover:scale-110 transition-transform duration-300 relative skill-icon-glow animate-gentle-bounce">
                  {category.icon}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3 bg-black/30 rounded-lg p-4 border border-white/5">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group/skill hover:bg-white/10 rounded-lg p-2 transition-all duration-200 border border-transparent hover:border-primary/20"
                  >
                    <span className="text-white/90 text-sm group-hover/skill:text-white transition-colors duration-200 flex items-center font-medium">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover/skill:bg-white transition-colors duration-200 flex-shrink-0"></span>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              
              {/* Corner Badge */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              
              {/* Floating Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${15 + i * 25}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;

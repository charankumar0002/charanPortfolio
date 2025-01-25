// Skills.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SkillsProps {
  className?: string;
}

function Skills({ className }: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        end: "bottom center",
      }
    });

    tl.from(containerRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    }).to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      });
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "GSAP", level: 85 }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 82 },
        { name: "MongoDB", level: 75 },
        { name: "PostgreSQL", level: 78 }
      ]
    },
    {
      title: "UI/UX & Design",
      icon: "🎨",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 80 },
        { name: "Responsive Design", level: 90 },
        { name: "UI Animation", level: 88 }
      ]
    },
    {
      title: "Tools & Others",
      icon: "🛠️",
      skills: [
        { name: "Git & GitHub", level: 88 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 70 },
        { name: "Jest & Testing", level: 82 }
      ]
    }
  ];

  return (
    <div ref={containerRef} className={`py-20 bg-gradient-to-b from-indigo-950 to-black ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency in various technologies and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-category bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${skill.level}%`,
                          transform: 'translateX(-100%)',
                          animation: 'slideRight 1.5s forwards'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Overview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-white font-medium">Quick Learner</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">🤝</div>
            <div className="text-white font-medium">Team Player</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-white font-medium">Problem Solver</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-white font-medium">Continuous Learner</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Skills;

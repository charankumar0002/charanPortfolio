import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  id: string;
}

function AboutSection({ id }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (section && content) {
      const ctx = gsap.context(() => {
        gsap.fromTo(content,
          { y: 40, opacity: 0 },
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
            duration: 1.2,
            ease: "power2.out"
          }
        );
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-20 md:py-28 w-full border-t border-white/5 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-primary mb-16 text-center">
          About
        </h2>
        
        <div ref={contentRef} className="space-y-16">
          {/* Hero Statement */}
          <div className="text-center max-w-4xl mx-auto glass-effect rounded-2xl p-8 mb-8">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
              I build modern web applications that users love
            </h3>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
              Frontend developer with <span className="text-primary font-semibold">2.7 years</span> of experience creating 
              high-performance React applications. I focus on clean code, exceptional user experiences, and measurable results.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center group glass-effect rounded-xl p-6 hover:glass-effect-strong transition-all duration-300 card-hover-lift glass-card-primary card-pattern-dots">
              <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 subtle-border">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">25%</div>
              <div className="text-sm text-white/60">Faster Load Times</div>
            </div>
            <div className="text-center group glass-effect rounded-xl p-6 hover:glass-effect-strong transition-all duration-300 card-hover-lift glass-card-secondary card-pattern-waves">
              <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 subtle-border">
                <span className="text-2xl">♿</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">96+</div>
              <div className="text-sm text-white/60">Accessibility Score</div>
            </div>
            <div className="text-center group glass-effect rounded-xl p-6 hover:glass-effect-strong transition-all duration-300 card-hover-lift glass-card-primary card-pattern-grid">
              <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 subtle-border">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">15%</div>
              <div className="text-sm text-white/60">Revenue Increase</div>
            </div>
            <div className="text-center group glass-effect rounded-xl p-6 hover:glass-effect-strong transition-all duration-300 card-hover-lift glass-card-secondary card-pattern-dots">
              <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 subtle-border">
                <span className="text-2xl">🧪</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">20%</div>
              <div className="text-sm text-white/60">Fewer Bugs</div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "React", icon: "⚛️", proficiency: "Expert" },
                { name: "TypeScript", icon: "📘", proficiency: "Advanced" },
                { name: "Next.js", icon: "▲", proficiency: "Advanced" },
                { name: "Tailwind", icon: "🎨", proficiency: "Expert" },
                { name: "Node.js", icon: "🟢", proficiency: "Intermediate" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div className="text-white font-medium mb-1">{tech.name}</div>
                  <div className="text-xs text-white/50">{tech.proficiency}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Touch */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/10">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Based in Bengaluru</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                B.Tech in Electronics & Communication Engineering. Passionate about creating digital experiences 
                that make a difference. When I'm not coding, you'll find me exploring new technologies or 
                contributing to open-source projects.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Available for new opportunities
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Open to remote work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  // ...existing code...
  );
}

export default AboutSection;

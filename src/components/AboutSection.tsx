import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AnimatedCounter } from './AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  id: string;
}

function AboutSection({ id }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const personalRef = useRef<HTMLDivElement>(null);

  // Use intersection observer for stats animation
  const { ref: statsObserverRef, hasIntersected: statsVisible } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px'
  });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const stats = statsRef.current;
    const skills = skillsRef.current;
    const personal = personalRef.current;

    if (section && content && title && stats && skills && personal) {
      const ctx = gsap.context(() => {
        // Create master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            markers: false,
          }
        });

        // Animate title first
        tl.fromTo(title, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );

        // Animate main content with better spacing
        tl.fromTo(content.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
          "-=0.4"
        );

        // Animate stats with bounce
        tl.fromTo(stats.children,
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.4"
        );

        // Animate skills grid
        tl.fromTo(skills.children,
          { y: 20, opacity: 0, rotateY: 15 },
          { y: 0, opacity: 1, rotateY: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.3"
        );

        // Animate personal section last
        tl.fromTo(personal.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          "-=0.2"
        );

      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen flex items-center py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30"
    >
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
            <h2 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wide"
            >
              About Me
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Frontend developer passionate about creating exceptional digital experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Content Section - Now takes full width */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto">
            {/* Hero Statement */}
            <div className="glass-effect rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                I build modern web applications that users love
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                Frontend developer with <span className="text-primary font-semibold">2.7 years</span> of experience creating 
                high-performance React applications. I focus on clean code, exceptional user experiences, and measurable results.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "📍 Location", value: "Bengaluru, Karnataka" },
                { label: "🎓 Education", value: "B.Tech, Electronics & Communication" },
                { label: "💼 Experience", value: "2.7 Years in Frontend Development" },
                { label: "🚀 Specialization", value: "React.js, Next.js, TypeScript" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-white/90 glass-effect rounded-lg p-3 sm:p-4 hover:glass-effect-strong transition-all duration-300"
                >
                  <span className="text-xs sm:text-sm md:text-base font-medium">{item.label}</span>
                  <span className="text-xs sm:text-sm md:text-base text-primary font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="glass-effect rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border-l-4 border-primary text-center max-w-3xl mx-auto">
              <p className="text-white/90 italic text-sm sm:text-base md:text-lg leading-relaxed">
                "Aiming to express potential and deliver results through challenging assignments as a Software Developer."
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section with enhanced heading */}
        <div 
          ref={statsRef}
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-16"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Impact & Results
            </h3>
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <div 
            ref={statsObserverRef}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {[
              { icon: "⚡", value: 25, suffix: "%", label: "Faster Load Times" },
              { icon: "♿", value: 96, suffix: "+", label: "Accessibility Score" },
              { icon: "💰", value: 15, suffix: "%", label: "Revenue Increase" },
              { icon: "🧪", value: 20, suffix: "%", label: "Fewer Bugs" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group glass-effect rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:glass-effect-strong transition-all duration-300 hover:scale-105 hover:animate-glow-pulse"
              >
                <div className="bg-primary/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 subtle-border">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-1">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    trigger={statsVisible}
                    duration={1500 + (index * 200)}
                  />
                </div>
                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section with enhanced heading */}
        <div ref={skillsRef} className="mt-8 sm:mt-12 md:mt-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Technologies I Work With
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {[
              { name: "React", icon: "⚛️", proficiency: "Expert", color: "cyan" },
              { name: "TypeScript", icon: "📘", proficiency: "Advanced", color: "blue" },
              { name: "Next.js", icon: "▲", proficiency: "Advanced", color: "gray" },
              { name: "Tailwind", icon: "🎨", proficiency: "Expert", color: "teal" },
              { name: "Node.js", icon: "🟢", proficiency: "Intermediate", color: "green" }
            ].map((tech, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-2 sm:p-3 md:p-4 text-center border border-white/10 hover:border-primary/30 hover:glass-effect-strong transition-all duration-500 group hover:scale-105 hover:rotate-1 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 md:mb-3 group-hover:scale-125 transition-all duration-300 group-hover:animate-bounce">
                  {tech.icon}
                </div>
                <div className="text-white font-medium mb-1 text-xs sm:text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </div>
                <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  {tech.proficiency}
                </div>
                {/* Skill level indicator */}
                <div className="mt-2 bg-white/10 rounded-full h-1 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-1000 group-hover:w-full ${
                      tech.proficiency === 'Expert' ? 'w-4/5' : 
                      tech.proficiency === 'Advanced' ? 'w-3/4' : 'w-2/3'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Touch & Showcase */}
        <div ref={personalRef} className="mt-8 sm:mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Core Competencies */}
            <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 hover:border-primary/20 transition-all duration-500 group">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">🎯</span>
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {[
                  "🚀 Front-end/User Experience Design",
                  "⚡ Performance Optimization", 
                  "🔄 Agile Methodologies",
                  "🧩 Component-Based Architecture",
                  "📱 Responsive Web Design",
                  "🌐 Cross-Browser Compatibility",
                  "♿ Accessibility Standards",
                  "🔌 API Integration"
                ].map((competency, index) => (
                  <div 
                    key={index}
                    className="text-white/80 text-xs sm:text-sm md:text-base hover:text-primary transition-all duration-300 cursor-default transform hover:translate-x-2 p-2 rounded hover:bg-white/5"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {competency}
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Statement */}
            <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 hover:border-primary/20 transition-all duration-500 group">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">💭</span>
                Philosophy
              </h3>
              <blockquote className="text-white/80 leading-relaxed text-xs sm:text-sm md:text-base italic mb-4 sm:mb-6">
                "I believe in creating digital experiences that not only look beautiful but also solve real problems. 
                Every line of code should serve a purpose, every interaction should feel natural, and every user should feel empowered."
              </blockquote>
              <p className="text-white/70 leading-relaxed text-xs sm:text-sm md:text-base">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or experimenting with the latest web development trends. I'm always eager to learn and grow.
              </p>
              
              {/* Fun fact */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                <p className="text-primary font-medium text-xs sm:text-sm">
                  💡 Fun Fact: I've optimized load times by an average of 25% across all projects I've worked on!
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="glass-effect rounded-xl p-4 sm:p-6 inline-block hover:glass-effect-strong transition-all duration-300 group cursor-pointer hover:scale-105">
              <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base">
                Ready to bring your ideas to life? Let's collaborate!
              </p>
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-primary">
                <span className="group-hover:animate-bounce text-lg sm:text-xl">📧</span>
                <span className="font-medium text-sm sm:text-base">Get in touch</span>
                <span className="group-hover:animate-bounce text-lg sm:text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

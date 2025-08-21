import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import CharanImage2 from '../assets/CharanImage2.jpg';
import TypingAnimation from './TypingAnimation';

const techStack = [
  { icon: "⚛️", name: "React 18", level: "Advanced" },
  { icon: "📱", name: "Next.js 14", level: "Advanced" },
  { icon: "🚀", name: "TypeScript", level: "Advanced" },
  { icon: "🎨", name: "Tailwind CSS", level: "Expert" },
];

gsap.registerPlugin(TextPlugin);

interface HeroSectionProps {
  onExploreClick: () => void;
}

function EnhancedHeroSection({ onExploreClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const name = nameRef.current;
    const title = titleRef.current;

    if (container && name && title) {
      // Create letter-by-letter animation for name - keep in single line
      const nameText = "PALUKURU CHARAN KUMAR REDDY";
      const titleText = "SOFTWARE DEVELOPER";
      
      // Create single line name with highlighted middle names
      const nameHTML = nameText.split('').map((letter, index) => {
        const isPrimary = (index >= 9 && index <= 20); // "CHARAN KUMAR" range
        const letterClass = isPrimary ? 'text-primary' : '';
        return letter === ' ' ? 
          '<span class="letter" style="display: inline-block; width: 0.3em;"></span>' : 
          `<span class="letter ${letterClass}" data-letter="${letter}" style="display: inline-block;">${letter}</span>`;
      }).join('');
      
      const titleLetters = titleText.split('').map((letter) => 
        letter === ' ' ? '&nbsp;' : `<span class="letter" data-letter="${letter}" style="display: inline-block;">${letter}</span>`
      ).join('');

      name.innerHTML = nameHTML;
      title.innerHTML = titleLetters;

      const tl = gsap.timeline();

      // Initial states
      gsap.set(".letter", { 
        opacity: 0, 
        y: 100, 
        rotationX: -90,
        transformOrigin: "center bottom",
        scale: 0.5
      });
      
      gsap.set([".hero-subtitle", ".hero-description", ".tech-stack-item", ".cta-button", ".social-link"], { 
        opacity: 0, 
        y: 50 
      });

      gsap.set(".hero-image", { scale: 0, rotation: -180, opacity: 0 });
      gsap.set(".floating-element", { opacity: 0, scale: 0 });

      // Main animation timeline
      tl
        // Background entrance
        .from(".hero-bg", { scale: 1.2, opacity: 0, duration: 2, ease: "power2.out" })
        
        // Name letter animation with spectacular effects
        .to(name.querySelectorAll('.letter'), {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(2)",
          stagger: {
            amount: 1.5,
            from: "start"
          },
          onComplete: () => {
            // Add glow effect after letters appear
            gsap.to(name.querySelectorAll('.letter'), {
              textShadow: "0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0ff",
              duration: 0.5,
              stagger: 0.1,
              yoyo: true,
              repeat: 1
            });
          }
        }, 0.5)
        
        // Title letter animation
        .to(title.querySelectorAll('.letter'), {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            amount: 1,
            from: "start"
          }
        }, "-=1")
        
        // Image entrance with rotation
        .to(".hero-image", {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        }, "-=1")
        
        // Subtitle typewriter effect
        .to(".hero-subtitle", { 
          opacity: 1, 
          y: 0, 
          duration: 0.8 
        }, "-=0.5")
        
        // Description fade in
        .to(".hero-description", { 
          opacity: 1, 
          y: 0, 
          duration: 0.8 
        }, "-=0.3")
        
        // Tech stack items with bounce
        .to(".tech-stack-item", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "bounce.out",
          stagger: 0.1
        }, "-=0.5")
        
        // CTA buttons
        .to(".cta-button", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        }, "-=0.3")
        
        // Social links
        .to(".social-link", {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1
        }, "-=0.2")
        
        // Floating elements
        .to(".floating-element", {
          opacity: 0.7,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2
        }, "-=1");

      // Continuous animations
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-10, 10)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Letter hover effects
      const letters = container.querySelectorAll('.letter');
      letters.forEach((letter: Element) => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.3,
            color: "#00ffff",
            textShadow: "0 0 20px #00ffff",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            color: "#ffffff",
            textShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      return () => {
        tl.kill();
        gsap.killTweensOf([".letter", ".floating-element"]);
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Clean dark background */}
      <div className="hero-bg absolute inset-0 bg-gradient-dark" />
      
      {/* Subtle blue accent floating elements */}
      <div className="floating-element absolute top-20 left-20 w-4 h-4 bg-blue-400/40 rounded-full" />
      <div className="floating-element absolute top-40 right-40 w-6 h-6 border border-blue-400/30 rotate-45" />
      <div className="floating-element absolute bottom-40 left-40 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-blue-500/15 rounded-lg" />
      <div className="floating-element absolute bottom-20 right-20 w-3 h-3 bg-blue-400/50 rounded-full" />
      <div className="floating-element absolute top-1/3 left-1/4 w-5 h-5 border border-blue-400/25 rounded-full" />
      <div className="floating-element absolute top-2/3 right-1/3 w-7 h-7 bg-gradient-to-r from-blue-400/15 to-blue-500/10 triangle" />
      
      {/* Very subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-blue-600/2 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/3 to-blue-500/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-screen max-w-7xl mx-auto">
          
          {/* Left Side - Image (Hidden on mobile, shown on large screens) */}
          <div className="hidden lg:flex justify-center lg:justify-start">
            <div className="relative">
              <div className="hero-image relative w-64 h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-purple-400 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
                  <img
                    src={CharanImage2}
                    alt="Palukuru Charan Kumar Reddy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating orbs around image */}
              <div className="floating-element absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-70" />
              <div className="floating-element absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-70" />
              <div className="floating-element absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-teal-400 to-green-500 rounded-full opacity-70" />
            </div>
          </div>

          {/* Center - Name and Content Section (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-8 w-full">
            {/* Main Name with letter animation - Single Line */}
            <div className="space-y-4">
              <h1 
                ref={nameRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold text-white tracking-tight leading-tight whitespace-nowrap overflow-hidden"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.01em',
                  lineHeight: '1.1'
                }}
              />
              
              {/* Animated title */}
              <h2 
                ref={titleRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-xl font-light text-gray-300 tracking-wide"
                style={{ letterSpacing: '0.05em' }}
              />
            </div>

            {/* Subtitle with gradient and typing animation */}
            <div className="hero-subtitle space-y-2">
              <p className="text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary font-medium">
                <TypingAnimation 
                  texts={[
                    "Creating Digital Experiences That Matter",
                    "Building Modern Web Applications",
                    "Crafting Beautiful User Interfaces",
                    "Developing Scalable Solutions"
                  ]}
                  className="text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary font-medium"
                />
              </p>
            </div>

            {/* Description */}
            <p className="hero-description text-white/80 text-sm md:text-base leading-relaxed max-w-2xl glass-effect rounded-lg p-4 mx-auto lg:mx-0">
              Passionate full-stack developer with 2.7+ years of experience crafting 
              responsive, user-centric web applications using modern technologies.
            </p>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Tech Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto lg:mx-0">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="tech-stack-item group glass-effect rounded-lg border border-gray-600/30 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-blue-glow p-4 transform hover:-translate-y-1"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </div>
                    <div className="text-white font-medium text-sm">{tech.name}</div>
                    <div className="text-white/60 text-xs">{tech.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onExploreClick}
                className="cta-button group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 overflow-hidden shadow-blue-glow hover:shadow-blue-glow-strong"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <a
                href="#contact"
                className="cta-button px-8 py-4 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-white font-medium hover:scale-105 duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="fixed left-6 bottom-6 z-50">
        <div className="flex flex-col gap-4">
          <a
            href="https://github.com/charankumar0002"
            className="social-link text-white/50 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          
          <a
            href="https://www.linkedin.com/in/charankumarreddypalukuru/"
            className="social-link text-white/50 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          
          <a
            href="https://x.com/CharanK29063387"
            className="social-link text-white/50 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EnhancedHeroSection;

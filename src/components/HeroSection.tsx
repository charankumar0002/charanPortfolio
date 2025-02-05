import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const roles = [
  "Front End Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "Performance Optimizer",
];

// 2. Add achievement numbers
const achievements = [
  { number: "50+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  { number: "20+", label: "Happy Clients" },
  { number: "100%", label: "Client Satisfaction" },
];

// 3. Expand tech stack
const techStack = [
  { icon: "⚛️", name: "React", level: "Advanced" },
  { icon: "📱", name: "Next.js", level: "Advanced" },
  { icon: "🎨", name: "Tailwind", level: "Expert" },
  { icon: "🚀", name: "TypeScript", level: "Advanced" },

];
// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

interface HeroSectionProps {
  onExploreClick: () => void;
}
function HeroSection({ onExploreClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);


  useEffect(() => {
    const mm = gsap.matchMedia();

    // Initial setup
    gsap.set(
      [
        nameRef.current,
        titleRef.current,
        ".tech-stack-item",
        ".cta-button",
        ".social-link",
        ".hero-subtitle",
        ".hero-description",
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    // Particles setup
    gsap.set(".particle", {
      opacity: 0,
      scale: 0,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    // Responsive animations
    mm.add("(min-width: 768px)", () => {
      tl.to(".loader", {
        height: "0%",
        duration: 1.5,
        ease: "power4.inOut",
      })
        .from(
          ".background-gradient",
          {
            opacity: 0,
            scale: 1.2,
            duration: 2,
            ease: "power2.inOut",
          },
          "-=1"
        )
        .to(
          ".particle",
          {
            opacity: 0.2,
            scale: 1,
            duration: 1,
            stagger: {
              amount: 1,
              grid: "random",
              from: "random",
            },
          },
          "-=1.5"
        )
        .to(
          nameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .to(
          ".hero-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.8"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .to(
          ".hero-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .to(
          ".tech-stack-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=0.4"
        )
        .to(
          ".cta-button",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        )
        .to(
          ".social-link",
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.3"
        );
    });

    // Mobile animations
    mm.add("(max-width: 767px)", () => {
      tl.to(".loader", {
        height: "0%",
        duration: 1.2,
        ease: "power4.inOut",
      })
        .from(
          ".background-gradient",
          {
            opacity: 0,
            duration: 1.5,
          },
          "-=0.8"
        )
        .to(
          nameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.5"
        )
        .to(
          ".hero-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.6"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .to(
          ".hero-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          ".tech-stack-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2"
        )
        .to(
          ".cta-button",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2"
        )
        .to(
          ".social-link",
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.2"
        );
    });

    // Continuous particle animation
    gsap.to(".particle", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "none",
      stagger: {
        amount: 2,
        from: "random",
      },
    });

    return () => {
      tl.kill();
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Scroll-triggered animations
  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  gsap.to(".background-gradient", {
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    backgroundImage: "linear-gradient(to bottom right, #4a00e0, #8e2de2)",
  });

  // 3. Mouse movement parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".particle", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cursor = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const handleMouseMove = (e: MouseEvent) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    gsap.to(".custom-cursor", {
      x: cursor.x,
      y: cursor.y,
      duration: 0.2,
    });
  };
  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-black"
      >
        {/* Loader */}
        <div className="loader absolute inset-0 bg-purple-900 z-50" />
        {/* Background */}
        <div className="background-gradient absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-50" />
        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 md:py-0">
          <div className="max-w-6xl mx-auto w-full">
            {/* Name Section */}
            <div ref={nameRef} className="text-center mb-8 md:mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 leading-tight">
                Palukuru Charan Kumar Reddy
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-white/80">
                <span className="hero-subtitle">📍 Bangalore, India</span>
                <span className="hero-subtitle hidden md:inline">•</span>
                <span className="hero-subtitle">Front End Developer</span>
              </div>
            </div>

            {/* Title Section */}
            <div
              ref={titleRef}
              className="text-center mt-6 md:mt-8 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4 md:mb-6">
                Front End Developer
              </h2>
              <p className="hero-description text-base md:text-lg text-white/70 leading-relaxed px-4">
                Transforming ideas into elegant digital experiences through code
                and creativity. Specialized in building responsive, interactive
                web applications.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="tech-stack-item relative bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all transform hover:scale-105 duration-300"
                >
                  <span className="text-2xl md:text-3xl mb-2 block">
                    {tech.icon}
                  </span>
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {tech.name}
                  </h3>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-white/10 rounded">
                    <div
                      className="h-full bg-primary rounded transition-all duration-300"
                      style={{
                        width:
                          tech.level === "Expert"
                            ? "90%"
                            : tech.level === "Advanced"
                            ? "75%"
                            : "60%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
              {[
                { icon: "⚛️", name: "React" },
                { icon: "📱", name: "Next.js" },
                { icon: "🎨", name: "Tailwind" },
                { icon: "🚀", name: "TypeScript" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="tech-stack-item bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all transform hover:scale-105 duration-300"
                >
                  <span className="text-2xl md:text-3xl mb-2 block">
                    {tech.icon}
                  </span>
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {tech.name}
                  </h3>
                </div>
              ))}
            </div> */}
            {/* <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {item.number}
                  </div>
                  <div className="text-sm text-white/70">{item.label}</div>
                </div>
              ))}
            </div> */}

            {/* CTA Section */}
            <div className="mt-12 md:mt-16 flex flex-col items-center gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={onExploreClick}
                  className="cta-button px-6 md:px-8 py-3 md:py-4 bg-primary rounded-lg hover:bg-primary-dark transition-all text-white text-base md:text-lg font-medium transform hover:scale-105 duration-300"
                >
                  View Portfolio
                </button>
                <a
                  href="#contact"
                  className="cta-button px-6 md:px-8 py-3 md:py-4 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-white text-base md:text-lg font-medium transform hover:scale-105 duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          {/* Animated Background Lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-[30deg]"
                style={{
                  top: `${i * 10}%`,
                  animation: `slideIn 15s linear infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>


          {/* Social Links */}
          <div className="fixed left-6 bottom-6 z-50">
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/charankumar0002"
                className="text-white/50 hover:text-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/charankumarreddypalukuru/"
                className="text-white/50 hover:text-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/yourusername"
                className="text-white/50 hover:text-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;

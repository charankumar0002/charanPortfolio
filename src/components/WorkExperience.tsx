import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  id: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
  logo?: string;
  type?: string; // e.g., 'Full-time', 'Intern'
  techStack?: string[];
}

const experiences: Experience[] = [
  {
    company: "iQuadra Information Services LLC",
    role: "Software Developer",
    duration: "Apr 2023 – Present",
    description: [
      "Spearheaded developing and maintaining responsive user interfaces using React.js, Next.js, and TypeScript.",
      "Created a scalable component library to standardize UI development.",
      "Implemented server-side rendering (SSR) and static site generation (SSG) in Next.js to improve SEO and performance.",
      "Reduced LCP by 25% using performance optimization techniques like lazy loading, code-splitting, memoization.",
      "Raised Lighthouse accessibility scores to 96+ by building fully accessible interfaces aligned with WCAG standards.",
      "Integrated payments (Stripe, Razorpay) and back-end APIs; improved payment success by 15% on production flows.",
      "Wrote and maintained unit/component tests using Jest and React Testing Library, reducing regression issues by 20%.",
      "Actively participated in Agile ceremonies including sprint planning, backlog grooming, and peer code reviews."
    ],
    logo: '/CharanLogo.png',
    type: 'Full-time',
    techStack: ['React.js', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Zustand', 'React Query', 'Jest', 'Vitest', 'React Testing Library', 'Tailwind CSS', 'Material-UI', 'GitHub Actions', 'REST APIs', 'Stripe', 'Razorpay', 'Vercel', 'Lighthouse', 'WCAG', 'Agile']
  },
  {
    company: "iQuadra Information Services LLC",
    role: "Software Development Intern",
    duration: "Feb 2023 – Mar 2023",
    description: [
      "Converted Figma wireframes to responsive React pages (Bootstrap) across devices and browsers.",
      "Integrated REST APIs for efficient data rendering; fixed bugs and contributed to sprint goals."
    ],
    logo: '/CharanLogo.png',
    type: 'Intern',
    techStack: ['React.js', 'Bootstrap', 'REST APIs', 'Figma']
  }
];

function ExperienceSection({ id }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progressBar = progressRef.current;

    if (section) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".experience-item",
          { opacity: 0, y: 50, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
              scrub: false
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "expo.out"
          }
        );

        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true
              }
            }
          );
        }

        const items = gsap.utils.toArray<HTMLElement>(".experience-item");
        items.forEach((item) => {
          const bullet = item.querySelector(
            ".experience-bullet"
          ) as HTMLElement | null;
          if (bullet) {
            ScrollTrigger.create({
              trigger: item,
              start: "top center",
              end: "bottom center",
              onEnter: () => bullet.classList.add("bg-primary"),
              onLeaveBack: () => bullet.classList.remove("bg-primary")
            });
          }
        });
      });

      return () => {
        ctx.revert();
      };
    }
  }, []);

  return (
    <section id={id} ref={sectionRef} className="min-h-screen py-12 sm:py-16 lg:py-20 text-white relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced title with decorative elements */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wide">
              Experience
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Building innovative solutions and creating impactful digital experiences
          </p>
        </div>

        <div className="relative">
          {/* Enhanced timeline line */}
          <div className="hidden sm:block absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-cyan-400/30 via-purple-500/30 to-pink-500/30 rounded-full" />
          <div ref={progressRef} className="hidden sm:block absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full transform origin-top scale-y-0 shadow-lg shadow-purple-500/50" />
          
          {/* Experience items container */}
          <div className="flex flex-col space-y-8 sm:space-y-12 lg:space-y-16 sm:pl-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-item relative group"
              >
                {/* Enhanced timeline bullet */}
                <div className="hidden sm:block experience-bullet absolute -left-12 top-8 w-3 h-3 bg-gray-600 rounded-full border-4 border-gray-800 transition-all duration-300 group-hover:bg-purple-500 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                
                {/* Enhanced card design */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Company header with enhanced styling */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={exp.logo || '/vite.svg'} 
                            alt={exp.company} 
                            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain rounded-xl border-2 border-gray-600 group-hover:border-purple-400 bg-white/90 p-2 transition-all duration-300 shadow-lg" 
                          />
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-cyan-400 text-base sm:text-lg lg:text-xl font-semibold">
                            @ {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-400/30 shadow-lg">
                          {exp.type}
                        </span>
                        <p className="text-purple-300 text-sm sm:text-base font-medium">
                          {exp.duration}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced tech stack */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack && exp.techStack.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-900/50 hover:to-purple-900/50 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced description */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Key Achievements</h4>
                      <ul className="space-y-3 text-sm sm:text-base leading-relaxed">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex items-start space-x-3 group-hover:text-gray-200 transition-colors duration-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
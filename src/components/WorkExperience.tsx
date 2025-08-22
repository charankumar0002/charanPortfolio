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
    <section id={id} ref={sectionRef} className="min-h-screen py-12 sm:py-16 lg:py-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-primary mb-8 sm:mb-12 lg:mb-16 tracking-wide">
          Experience
        </h2>
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden sm:block absolute left-4 top-0 w-1 h-full bg-white/5 rounded-full" />
          <div ref={progressRef} className="hidden sm:block absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary rounded-full transform origin-top scale-y-0" />
          
          {/* Experience items container */}
          <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-12 sm:pl-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-item relative glass-effect p-4 sm:p-6 lg:p-8 rounded-xl subtle-border overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-subtle-glow transition-all duration-500 flex flex-col"
              >
                {/* Timeline bullet - only visible on larger screens */}
                <div className="hidden sm:block experience-bullet absolute -left-6 top-8 w-5 h-5 bg-white/10 rounded-full -translate-x-1/2 border border-white/20"></div>
                
                {/* Company logo and type */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={exp.logo || '/vite.svg'} 
                      alt={exp.company} 
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain rounded-full border border-white/20 bg-white flex-shrink-0" 
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-primary/90 text-sm sm:text-base lg:text-lg font-medium">
                        @ {exp.company}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30 flex-shrink-0`}>
                    {exp.type}
                  </span>
                </div>

                {/* Duration */}
                <p className="text-primary text-sm sm:text-base lg:text-lg mb-4 font-medium">
                  {exp.duration}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {exp.techStack && exp.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-primary/10 text-white/80 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium subtle-border hover:bg-primary/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <ul className="list-disc list-inside text-white/70 space-y-2 sm:space-y-3 text-sm sm:text-base leading-relaxed">
                  {exp.description.map((point, i) => (
                    <li key={i} className="hover:text-white/90 transition-colors duration-200">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
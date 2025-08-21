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
    <section id={id} ref={sectionRef} className="min-h-screen py-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-primary mb-16 tracking-wide">
          Experience
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 w-1 h-full bg-white/5 rounded-full" />
          <div ref={progressRef} className="absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary rounded-full transform origin-top scale-y-0" />
          <div className="flex flex-col space-y-12 pl-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-item relative glass-effect p-8 rounded-xl subtle-border overflow-hidden hover:shadow-subtle-glow transition-all duration-500 flex flex-col md:flex-row card-hover-lift ${
                  index % 2 === 0 ? 'glass-card-primary card-pattern-dots' : 'glass-card-secondary card-pattern-waves'
                }`}
              >
                <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-48 md:mr-8 md:ml-0 mb-6 md:mb-0">
                  <img src={exp.logo || '/vite.svg'} alt={exp.company} className="w-20 h-20 object-contain rounded-full border border-white/20 bg-white mb-2" />
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${exp.type === 'Full-time' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/20 text-primary border border-primary/30'}`}>{exp.type}</span>
                </div>
                <div className="flex-1">
                  <div className="experience-bullet absolute -left-6 top-5 w-5 h-5 bg-white/10 rounded-full -translate-x-1/2 border border-white/20"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role} @ {exp.company}</h3>
                  <p className="text-primary text-lg mb-4 font-medium">{exp.duration}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.techStack && exp.techStack.map((tech, i) => (
                      <span key={i} className="bg-primary/10 text-white/80 px-2 py-1 rounded text-xs font-medium subtle-border hover:bg-primary/20 transition-colors duration-200">{tech}</span>
                    ))}
                  </div>
                  <ul className="list-disc list-inside text-white/70 space-y-2">
                    {exp.description.map((point, i) => (
                      <li key={i} className="leading-relaxed hover:text-white/90 transition-colors duration-200">{point}</li>
                    ))}
                  </ul>
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
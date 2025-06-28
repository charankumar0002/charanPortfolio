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
}

const experiences: Experience[] = [
  {
    company: "iQuadra Information Services (iQua.ai)",
    role: "Software Developer (Frontend)",
    duration: "April 2023 – Present",
    description: [
      "Reduced page load time by 25% using lazy loading, caching, and tree-shaking.",
      "Developed 20+ reusable UI components, improving scalability and cutting development time by 30%.",
      "Integrated Razorpay & Stripe, enhancing transaction security and reducing payment failures by 40%.",
      "Built an internal admin dashboard for real-time user activity tracking, improving stakeholder decision-making.",
      "Collaborated with UX/UI teams, boosting user engagement and accessibility by 15%.",
      "Led frontend migrations, converting legacy JavaScript code to modern React + TypeScript.",
      "Mentored junior developers, conducting 15+ code reviews per month to improve overall code quality.",
      "Optimized REST API calls, reducing response time by 20% for better frontend-backend integration."
    ]
  },
  {
    company: "iQuadra Information Services (iQua.ai)",
    role: "Software Intern (Frontend)",
    duration: "Feb 2023 – Mar 2023",
    description: [
      "Developed mobile-first UIs, improving responsiveness with React.js, Bootstrap, and SCSS.",
      "Optimized UI performance, reducing load times by 30% through efficient state management.",
      "Independently implemented minor features, gaining practical experience in frontend best practices."
    ]
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
      });

      return () => {
        ctx.revert();
      };
    }
  }, []);

  return (
    <section id={id} ref={sectionRef} className="min-h-screen bg-black py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center text-primary mb-16 tracking-wide">
          Experience
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 w-1 h-full bg-white/20 rounded-full" />
          <div ref={progressRef} className="absolute left-4 top-0 w-1 h-full bg-primary rounded-full transform origin-top scale-y-0" />
          <div className="flex flex-col space-y-12 pl-10">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item relative bg-gray-900 p-8 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-transform duration-500">
                <div className="absolute left-0 w-5 h-5 bg-primary rounded-full -translate-x-1/2 top-5"></div>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.role} @ {exp.company}</h3>
                <p className="text-primary/80 text-lg mb-4">{exp.duration}</p>
                <ul className="list-disc list-inside text-gray-300">
                  {exp.description.map((point, i) => (
                    <li key={i} className="mb-2">{point}</li>
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
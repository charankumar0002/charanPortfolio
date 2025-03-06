import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkExperienceProps {
  className?: string;
}

function WorkExperience({ className }: WorkExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs

  useEffect(() => {
    console.log("WorkExperience component mounted");

    if (!cardRefs.current.length) return; // Prevent animation if refs are empty

    gsap.fromTo(
      cardRefs.current.filter((el) => el !== null), // Ensure only valid refs are used
      { opacity: 0, y: 50 }, // Initial state
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" } // Final state
    );

    gsap.fromTo(
      ".achievement-item",
      { opacity: 0, y: 30, },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    gsap.fromTo(
      ".cta-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const experiences = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Company",
      period: "2022 - Present",
      location: "Bangalore, India",
      description: [
        "Led development of responsive web applications using React and Next.js",
        "Implemented complex animations and interactive features using GSAP",
        "Mentored junior developers and conducted code reviews",
      ],
      technologies: ["React", "TypeScript", "Next.js", "GSAP", "Tailwind CSS"],
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      location: "Bangalore, India",
      description: [
        "Developed and maintained client websites and web applications",
        "Collaborated with designers to implement pixel-perfect UI",
        "Optimized application performance and loading times",
      ],
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Redux"],
    },
  ];

  return (
    <div ref={containerRef} className={`py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Work Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              ref={(el) => (cardRefs.current[index] = el)} // Store ref for each card
              key={index}
              className="experience-item bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {exp.role}
                  </h3>
                  <div className="text-white/80">
                    <span className="text-primary">{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <div className="text-white/60 mt-2 md:mt-0">{exp.period}</div>
              </div>

              <ul className="list-disc list-inside text-white/70 mb-6 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/20 rounded-full text-primary text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "15+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "5+", label: "Awards Won" },
            ].map((achievement, index) => (
              <div
                key={index}
                className="achievement-item bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-white/70">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <a
            href="/resume.pdf"
            className="cta-button inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-lg hover:bg-primary-dark transition-all text-white"
          >
            <span>Download Resume</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WorkExperience;

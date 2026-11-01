import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

interface ExperienceSectionProps {
  id: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  summary?: string;
  description: string[];
  type: string;
  techStack: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Arkain Games",
    role: "Full Stack Engineer",
    duration: "Dec 2025 – Present",
    location: "Bengaluru",
    type: "Full-time",
    current: true,
    summary:
      "Building real-time web platforms for electronic gaming machines (EGMs) across the full stack.",
    description: [
      "Built a real-time EGM telemetry dashboard in React + Node.js that reads live telemetry from gaming machines and sends control commands back to them.",
      "Handle high-volume bidirectional data streams over MQTT, with analytics computed on live machine data.",
      "Design and ship Node.js REST APIs backed by MSSQL, plus Azure App Service and Functions workloads.",
      "Containerized services with Docker and deployed them to hardened Azure Virtual Machines.",
      "Automated delivery through a GitHub Actions CI/CD pipeline that builds images to Azure Container Registry and deploys to the VM.",
      "Apply the same performance and accessibility standards from front-end work to a data-heavy, real-time UI.",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "MQTT", "MSSQL", "Azure", "Docker", "GitHub Actions"],
  },
  {
    company: "iQuadra Information Services",
    role: "Software Developer (Full Stack)",
    duration: "Apr 2023 – Nov 2025",
    location: "Bengaluru",
    type: "Full-time",
    summary:
      "Full-stack engineer on a recruitment platform used by jobseekers and recruiters. React + Vite on the front end, FastAPI on the back, running on AWS.",
    description: [
      "Delivered features end to end across the jobseeker and recruiter experiences, from the interface through to the APIs and data behind them.",
      "Built the resume filtering feature, letting recruiters shortlist against role criteria instead of reviewing every profile by hand.",
      "Designed batched pagination for candidate search so large result sets stayed fast to load and navigate.",
      "Developed backend services and REST APIs in FastAPI over PostgreSQL, covering candidate data, search and platform workflows.",
      "Built the transactional email service on AWS SES, with reusable templates for candidate and recruiter notifications.",
      "Ran the app on AWS (Lambda, S3, Amplify preview environments) and set up GitHub Actions pipelines to ship on merge.",
      "Established a modular TypeScript component library adopted across teams, accelerating feature delivery by 30%.",
      "Improved LCP by 25% and reached Lighthouse 96+ with WCAG-compliant accessibility.",
      "Integrated Stripe and Razorpay checkout, lifting payment success by 15%, and cut regressions by 20% with Jest and Vitest.",
      "Mentored junior developers and partnered with product, design and QA through Agile/Scrum delivery.",
    ],
    techStack: ["React", "Vite", "TypeScript", "FastAPI", "PostgreSQL", "AWS", "Stripe", "Jest", "Vitest"],
  },
  {
    company: "iQuadra Information Services",
    role: "Software Development Intern",
    duration: "Feb 2023 – Mar 2023",
    location: "Bengaluru",
    type: "Internship",
    description: [
      "Translated Figma designs into responsive, pixel-perfect interfaces.",
      "Integrated REST APIs for dynamic content rendering.",
      "Took part in daily stand-ups, contributing bug fixes and feature enhancements.",
    ],
    techStack: ["React", "Bootstrap", "REST APIs", "Figma"],
  },
];

function ExperienceSection({ id }: ExperienceSectionProps) {
  return (
    <section id={id} className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="Shipping full-stack products, from real-time dashboards to the APIs and cloud behind them."
        />

        <ol className="relative space-y-8 border-l border-white/10 pl-6 sm:space-y-10 sm:pl-10">
          {experiences.map((exp) => (
            <li key={exp.role + exp.duration} className="relative">
              <span
                className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full ring-4 ring-[#05070d] sm:-left-[47px] ${
                  exp.current ? "bg-emerald-400" : "bg-cyan-400"
                }`}
                aria-hidden="true"
              />
              <Reveal className="card card-hover p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{exp.role}</h3>
                    <p className="mt-1 font-medium text-cyan-300">
                      {exp.company} <span className="text-slate-500">· {exp.location}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="text-sm font-medium text-slate-300">{exp.duration}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        exp.current
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-white/[0.06] text-slate-300"
                      }`}
                    >
                      {exp.current ? "Current" : exp.type}
                    </span>
                  </div>
                </div>

                {exp.summary && <p className="mt-4 text-slate-300">{exp.summary}</p>}

                <ul className="mt-4 space-y-2.5">
                  {exp.description.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ExperienceSection;

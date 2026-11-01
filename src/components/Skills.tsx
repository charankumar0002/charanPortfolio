import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

interface SkillsProps {
  id: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  { title: "Frontend", icon: "⚛️", skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Vite", "SSR / SSG"] },
  { title: "Backend", icon: "🔌", skills: ["Node.js", "FastAPI", "Python", "REST APIs", "AWS SES email"] },
  { title: "Real-Time Systems", icon: "📡", skills: ["MQTT", "Bidirectional streams", "Live telemetry", "Streaming analytics"] },
  { title: "Databases", icon: "🗃️", skills: ["Microsoft SQL Server", "PostgreSQL"] },
  { title: "Cloud", icon: "☁️", skills: ["Azure App Service", "Azure Functions", "Azure VMs", "Azure Container Registry", "AWS Lambda / S3", "AWS Amplify"] },
  { title: "DevOps & CI/CD", icon: "🐳", skills: ["Docker", "GitHub Actions", "CI/CD pipelines", "Git", "Vercel"] },
  { title: "State & Styling", icon: "🎨", skills: ["Redux Toolkit", "Zustand", "React Query", "Tailwind CSS", "Material-UI"] },
  { title: "Testing & Quality", icon: "🧪", skills: ["Jest", "Vitest", "Lighthouse", "WCAG accessibility", "Performance tuning"] },
  { title: "Ways of Working", icon: "🤝", skills: ["Agile / Scrum", "Mentoring", "Code reviews", "Product, design & QA"] },
];

function Skills({ id }: SkillsProps) {
  return (
    <section id={id} className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          subtitle="React and Next.js on the front end; Node.js, FastAPI and the cloud on the back."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={(i % 3) * 80} className="card card-hover p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-xl" aria-hidden="true">
                  {category.icon}
                </span>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

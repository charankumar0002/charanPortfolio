import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { AnimatedCounter } from "./AnimatedCounter";

interface AboutSectionProps {
  id: string;
}

const quickInfo = [
  { label: "Location", value: "Bengaluru, India" },
  { label: "Experience", value: "3+ years, full stack" },
  { label: "Currently", value: "Full Stack Engineer, Arkain Games" },
  { label: "Education", value: "B.Tech, Electronics & Communication" },
];

const stats = [
  { value: 30, suffix: "%", label: "Faster feature delivery" },
  { value: 25, suffix: "%", label: "Faster LCP" },
  { value: 96, suffix: "+", label: "Lighthouse score" },
  { value: 15, suffix: "%", label: "Higher payment success" },
];

function AboutSection({ id }: AboutSectionProps) {
  const { ref: statsRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section id={id} className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="I build web platforms end to end"
          subtitle="From the UI to the APIs, data and cloud behind it."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="card p-6 sm:p-8 lg:col-span-3">
            <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>
                I'm a full-stack developer with <span className="font-semibold text-white">3+ years</span> of
                experience, working across React/Next.js on the front end and Node.js + Azure on the back.
              </p>
              <p>
                At <span className="font-semibold text-white">Arkain Games</span> I build a real-time telemetry
                platform for electronic gaming machines: a React + Node.js dashboard that reads live machine data
                over MQTT, sends control commands back, and runs analytics on high-volume streams. It's
                containerized with Docker and shipped to Azure through GitHub Actions.
              </p>
              <p>
                Before that, at <span className="font-semibold text-white">iQuadra</span>, I worked across a
                recruitment platform's React front end and FastAPI + PostgreSQL back end on AWS.
              </p>
              <p className="text-slate-400">
                I enjoy mentoring junior developers and working closely with design, product and QA. Right now I'm
                going deep on Azure and distributed system design.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="card p-6 sm:p-8 lg:col-span-2">
            <dl className="divide-y divide-white/[0.06]">
              {quickInfo.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{item.label}</dt>
                  <dd className="text-slate-200">{item.value}</dd>
                </div>
              ))}
            </dl>
            <a href="#contact" className="btn-primary mt-6 w-full">
              Let's work together
            </a>
          </Reveal>
        </div>

        <div ref={statsRef} className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="card card-hover p-5 text-center sm:p-6">
              <div className="text-gradient text-3xl font-extrabold sm:text-4xl">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  trigger={hasIntersected}
                  duration={1400 + i * 150}
                />
              </div>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

import type { CSSProperties } from "react";
import CharanImage2 from "../assets/CharanImage2.jpg";
import TypingAnimation from "./TypingAnimation";
import { socialLinks } from "../common/socialLinks";

const highlights = [
  { label: "Frontend", value: "React · Next.js · TypeScript" },
  { label: "Backend", value: "Node.js · FastAPI · REST" },
  { label: "Cloud", value: "Azure · AWS" },
  { label: "DevOps", value: "Docker · GitHub Actions" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function EnhancedHeroSection() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center pt-24 pb-16 lg:pt-16">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Text */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div
            className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:text-sm"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Full Stack Engineer @ Arkain Games
          </div>

          <h1
            className="hero-in text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={delay(100)}
          >
            Hi, I'm <span className="text-gradient">Charan Kumar Reddy</span>
          </h1>

          <p
            className="hero-in mt-4 min-h-[1.75em] text-lg font-medium text-slate-300 sm:text-xl lg:text-2xl"
            style={delay(200)}
          >
            <TypingAnimation
              texts={[
                "Full Stack Developer",
                "Building real-time telemetry platforms",
                "React on the front, Node.js & Azure on the back",
                "Shipping features end to end",
              ]}
            />
          </p>

          <p
            className="hero-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0"
            style={delay(300)}
          >
            3+ years building high-performance web applications. Right now I'm building a
            real-time telemetry platform for electronic gaming machines with React, Node.js,
            MQTT and Azure.
          </p>

          <div
            className="hero-in mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            style={delay(400)}
          >
            <a href="#experience" className="btn-primary">
              View my work
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </div>

          <div
            className="hero-in mt-8 flex items-center justify-center gap-3 lg:justify-start"
            style={delay(500)}
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-xl border border-white/10 p-2.5 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="hero-in order-1 flex justify-center lg:order-2" style={delay(150)}>
          <div className="float-slow relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-500/10 to-violet-500/30 blur-2xl" />
            <div className="relative rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 p-[3px]">
              <img
                src={CharanImage2}
                alt="Palukuru Charan Kumar Reddy"
                width={320}
                height={320}
                className="h-44 w-44 rounded-full object-cover sm:h-56 sm:w-56 lg:h-80 lg:w-80"
              />
            </div>
          </div>
        </div>

        {/* Stack highlights */}
        <div
          className="hero-in order-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-2"
          style={delay(600)}
        >
          {highlights.map((h) => (
            <div key={h.label} className="card card-hover px-4 py-3 text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{h.label}</p>
              <p className="mt-1 text-sm text-slate-300">{h.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnhancedHeroSection;

import { useEffect, useState } from "react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import PortfolioImg from "../assets/Portfolio.png";
import PokemonAppImg from "../assets/PokemonApp.png";
import TaskPlannerImg from "../assets/TaskPlanner.png";

export interface Project {
  title: string;
  description: string;
  url: string;
  image?: string;
  technologies?: string[];
}

interface GithubRepo {
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  fork: boolean;
}

const defaultProjects: Project[] = [
  {
    title: "Pokémon Discovery App",
    description:
      "React app with infinite scrolling, collection management and drag & drop, built on TanStack Query for caching and background refetching.",
    url: "https://pokemondiscoveryapp.vercel.app/",
    image: PokemonAppImg,
    technologies: ["React 19", "TypeScript", "TanStack Query", "Tailwind CSS", "DND Kit"],
  },
  {
    title: "Month View Task Planner",
    description:
      "Plan and manage tasks in a monthly calendar: add, edit and delete tasks, filter by category or status, with a responsive UI and detail modal.",
    url: "https://month-view-task-planner-app.vercel.app/",
    image: TaskPlannerImg,
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    title: "Personal Portfolio",
    description:
      "This site. React, TypeScript and Tailwind, tuned for fast loads: no animation libraries, static background, scroll reveals via IntersectionObserver.",
    url: "https://github.com/charankumar0002/Portfolio",
    image: PortfolioImg,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

// Public GitHub API only. Never put a token in a VITE_ variable: it ships to every visitor.
const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    if (!githubUsername) return;
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: GithubRepo[]) => {
        if (!Array.isArray(data)) return;
        const known = new Set(defaultProjects.map((p) => p.url));
        const extra = data
          .filter((repo) => repo.homepage && !repo.fork && !known.has(repo.homepage))
          .map((repo) => ({
            title: repo.name,
            description: repo.description || "",
            url: repo.homepage || repo.html_url,
          }));
        setProjects([...defaultProjects, ...extra]);
      })
      .catch(() => {
        /* keep the default list */
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          subtitle="Side projects outside of work."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.url} delay={(i % 3) * 80} className="h-full">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800/60">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-3xl font-bold text-white/30">
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="flex items-center justify-between gap-2 text-lg font-semibold text-white">
                    {project.title}
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-slate-500 transition-colors group-hover:text-cyan-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  {project.technologies && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;

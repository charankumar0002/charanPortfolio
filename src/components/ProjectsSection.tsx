import { useEffect, useState } from 'react';
import PortfolioImg from '../assets/Portfolio.png';
import PokemonAppImg from '../assets/PokemonApp.png';
import TaskPlannerImg from '../assets/TaskPlanner.png';

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
}

interface ProjectsSectionProps {
  className?: string;
}

const defaultProjects: Project[] = [
  {
    title: 'Personal Portfolio',
    description: 'Created a portfolio with React.js, TypeScript, Vite, and GSAP. Added dark mode and dynamic metadata for improved SEO.',
    url: 'https://charankumarreddypalukuru.vercel.app/',
  image: PortfolioImg,
    technologies: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Vite']
  },
  {
    title: 'Pokemon Discovery App',
    description: 'Modern React app with infinite scrolling, collection management, and drag & drop functionality. Built with React 19, TypeScript, Vite, TanStack Query, and Tailwind CSS.',
    url: 'https://pokemondiscoveryapp.vercel.app/',
  image: PokemonAppImg,
    technologies: ['React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Tailwind CSS', 'DND Kit']
  },
  {
    title: 'Month View Task Planner',
    description: 'A simple and modern web application for planning and managing tasks in a monthly calendar view. Features include month view calendar, add/edit/delete tasks, filter by category or status, responsive UI, and modal for task details.',
    url: 'https://month-view-task-planner-app.vercel.app/',
  image: TaskPlannerImg,
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS'
    ]
  },
];

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

function ProjectsSection({ className }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!githubUsername) return;
      try {
        const headers: Record<string, string> = {};
        if (githubToken) {
          headers['Authorization'] = `token ${githubToken}`;
        }
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos`,
          { headers }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const liveRepos = data.filter((repo: GithubRepo) => repo.homepage);
          const repoProjects: Project[] = liveRepos.map((repo: GithubRepo) => ({
            title: repo.name,
            description: repo.description || '',
            url: repo.homepage || repo.html_url,
          }));
          setProjects([...defaultProjects, ...repoProjects]);
        }
      } catch (err) {
        console.error('Failed to fetch repositories', err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className={`py-20 ${className}`} id="projects">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold text-primary mb-4 text-center">
          Projects
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto text-lg">
          Showcasing my recent work with modern web technologies and best practices
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block glass-effect rounded-xl overflow-hidden hover:glass-effect-strong transition-all duration-300 subtle-border hover:shadow-subtle-glow card-hover-lift ${
                index % 3 === 0 ? 'card-pattern-dots' : 
                index % 3 === 1 ? 'card-pattern-waves' : 
                'card-pattern-grid'
              }`}
            >
              {project.image && (
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image || '/vite.svg'}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = '/vite.svg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-white/10 text-xs text-white/90 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;

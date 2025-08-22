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
    <section className={`py-12 sm:py-16 lg:py-20 text-white relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/30 ${className}`} id="projects">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced title with decorative elements */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wide">
              Projects
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Showcasing innovative solutions built with modern web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">{projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {project.image && (
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={project.image || '/vite.svg'}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = '/vite.svg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-6 sm:p-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-900/50 hover:to-purple-900/50 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105"
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

import { useEffect, useState } from 'react';

export interface Project {
  title: string;
  description: string;
  url: string;
  image?: string;
}

interface ProjectsSectionProps {
  className?: string;
}

const defaultProjects: Project[] = [
  {
    title: 'Portfolio',
    description: 'My personal portfolio built with React + Vite + Typescript and Tailwind CSS.',
    url: 'https://charankumarreddypalukuru.vercel.app/',
    image: '/CharanLogo.png', // Added logo image
  },
  {
    title: 'EV Dashboard',
    description: 'Dashboard to monitor and visualise electric vehicle data.',
    url: 'https://ev-dashboard-and-analysis.vercel.app',
    image: '/evDashboard.png', // Added dashboard image
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
          const liveRepos = data.filter((repo: any) => repo.homepage);
          const repoProjects: Project[] = liveRepos.map((repo: any) => ({
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
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all"
            >
              {project.image && (
                <img
                  src={project.image || '/vite.svg'}
                  alt={project.title}
                  className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-90"
                  onError={(e) => (e.currentTarget.src = '/vite.svg')}
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;

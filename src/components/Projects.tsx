import { getGitHubRepos } from '@/lib/github';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';

const FEATURED_PROJECTS = [
  {
    repoSlug: 'unplug',
    displayName: 'Unplug',
    description:
      'Subscription waste detection SaaS — AI-powered classification, virtual card issuance per subscription, one-click cancellation',
    tags: ['Next.js', 'Gemini AI', 'Prisma', 'Neon'],
  },
  {
    repoSlug: 'result-notification-system',
    displayName: 'Result Notification System',
    description:
      'University admin dashboard with Senate approval workflows and multi-channel parent alerts (WhatsApp → Email → SMS)',
    tags: ['Next.js', 'Termii', 'QStash', 'Prisma'],
  },
  {
    repoSlug: 'catalyst-reactor',
    displayName: 'Catalyst Reactor',
    description:
      'Figma-inspired collaborative browser design tool with Konva.js canvas engine and real-time state',
    tags: ['React', 'Konva.js', 'Zustand', 'TypeScript'],
  },
  {
    repoSlug: 'carrom-pool',
    displayName: 'Carrom Pool',
    description:
      'Physics-based Carrom Pool game in the browser with accurate rigid-body simulation',
    tags: ['JavaScript', 'Matter.js', 'Canvas'],
  },
];

export default async function Projects() {
  const repos = await getGitHubRepos();
  const repoMap = new Map(repos.map((r) => [r.name, r]));

  const featuredProjects = FEATURED_PROJECTS
    .map((project, idx) => {
      const repo = repoMap.get(project.repoSlug);
      return {
        number: String(idx + 1).padStart(2, '0'),
        name: project.displayName,
        description: project.description,
        tags: project.tags,
        repoUrl: repo?.url || `https://github.com/Doyen04/${project.repoSlug}`,
        stars: repo?.stargazers_count || 0,
      };
    });

  const otherRepos = repos
    .filter((repo) => !FEATURED_PROJECTS.some((p) => p.repoSlug === repo.name))
    .slice(0, 6);

  return (
    <section id="work" className="section bg-bg-subtle">
      <div className="container-base">
        <div className="mb-16">
          <p className="eyebrow">01 — Selected Work</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-ink">
            Things I've built
          </h2>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.number} {...project} />
          ))}
        </div>

        {/* Other Repos */}
        {otherRepos.length > 0 && (
          <div className="border-t border-border pt-12">
            <a
              href="https://github.com/Doyen04?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow text-lg font-semibold mb-8 inline-flex"
            >
              <span>Other work on GitHub</span>
              <ArrowRight size={20} />
            </a>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-border rounded-lg p-4 hover:bg-white transition-colors"
                >
                  <h4 className="font-medium text-ink group-hover:text-accent transition-colors mb-2">
                    {repo.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    {repo.language && (
                      <span className="text-xs text-ink-muted">
                        {repo.language}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-xs text-ink-muted">
                      ⭐ {repo.stargazers_count}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

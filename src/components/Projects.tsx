import { getGitHubRepos } from '@/lib/github';
import ProjectCard from './ProjectCard';

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
    <section id="work" className="py-24 md:py-32 bg-bg-subtle">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm font-mono uppercase tracking-widest mb-4 text-ink-muted">01 — Selected Work</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-ink">
            Things I&apos;ve built
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
              className="group inline-flex items-center gap-2 text-lg font-semibold mb-8 text-accent hover:text-accent-hover transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
            >
              <span>Other work on GitHub</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
                      <svg className="text-accent" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {repo.stargazers_count}
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

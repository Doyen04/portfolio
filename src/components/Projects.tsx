import { getGitHubRepos } from '@/lib/github';
import ProjectCard from './ProjectCard';
import BrowserMockup from '@/ui/BrowserMockup';

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

  const unplugProject = featuredProjects[0];
  const otherFeaturedProjects = featuredProjects.slice(1);

  const otherRepos = repos
    .filter((repo) => !FEATURED_PROJECTS.some((p) => p.repoSlug === repo.name))
    .slice(0, 6);

  return (
    <section
      id="work"
      style={{
        padding: '96px 48px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div>
        {/* Section Tag */}
        <div className="section-tag">
          <span className="section-tag__number">[01]</span>
          <span className="section-tag__rule" />
          <span className="section-tag__label">Selected Work</span>
        </div>

        {/* Section Heading */}
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(44px, 6vw, 84px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: 'var(--white)',
            marginBottom: '64px',
          }}
        >
          Things I&apos;ve{' '}
          <em style={{ color: 'var(--accent)', fontWeight: 300 }}>built</em>
        </h2>

        {/* Top Featured Showcase: Unplug (1fr 1fr grid) */}
        {unplugProject && (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            style={{
              border: '1px solid var(--border)',
              padding: '32px',
              background: 'transparent',
            }}
          >
            {/* Left Column: Details */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '80px',
                      fontWeight: 300,
                      color: 'var(--faint)',
                      lineHeight: 1,
                    }}
                  >
                    {unplugProject.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--accent)',
                    }}
                  >
                    Featured Product
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '42px',
                    fontWeight: 500,
                    lineHeight: 1.05,
                    color: 'var(--white)',
                    marginBottom: '16px',
                  }}
                >
                  {unplugProject.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'var(--muted)',
                    marginBottom: '24px',
                  }}
                >
                  {unplugProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {unplugProject.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        padding: '6px 12px',
                        border: '1px solid var(--border)',
                        color: 'var(--muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-auto">
                <a
                  href={unplugProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fill text-center"
                >
                  View My Work <span>→</span>
                </a>
                
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    color: 'var(--muted)',
                  }}
                >
                  <svg style={{ color: 'var(--accent)' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>{unplugProject.stars}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Browser Mockup */}
            <div className="w-full flex items-center justify-center">
              <BrowserMockup />
            </div>
          </div>
        )}

        {/* Featured Projects Card Row (3 Columns) */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: '3px',
            marginBottom: '80px',
          }}
        >
          {otherFeaturedProjects.map((project) => (
            <ProjectCard key={project.number} {...project} />
          ))}
        </div>

        {/* Other Repos */}
        {otherRepos.length > 0 && (
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '48px',
            }}
          >
            <a
              href="https://github.com/Doyen04?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mb-8 transition-colors text-[var(--muted)] hover:text-[var(--accent)]"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              <span>Other work on GitHub</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{
                gap: '3px',
              }}
            >
              {otherRepos.map((repo, idx) => {
                const isLarge = idx === 0 || idx === 3 || idx === 5;
                const colSpanClass = isLarge ? 'md:col-span-2' : 'md:col-span-1';

                return (
                  <a
                    key={repo.id}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group transition-colors bg-transparent hover:bg-[var(--surface)] ${colSpanClass}`}
                    style={{
                      border: '1px solid var(--border)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '180px',
                    }}
                  >
                    <div className="flex-1">
                      <h4
                        className="group-hover:!text-[var(--accent)] transition-colors mb-2"
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: '22px',
                          fontWeight: 500,
                          color: 'var(--white)',
                        }}
                      >
                        {repo.name}
                      </h4>
                      {repo.description && (
                        <p
                          style={{
                            fontFamily: 'var(--sans)',
                            fontSize: '13.5px',
                            fontWeight: 300,
                            lineHeight: 1.6,
                            color: 'var(--muted)',
                            marginBottom: '16px',
                          }}
                        >
                          {repo.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {repo.language && (
                        <span
                          style={{
                            fontFamily: 'var(--mono)',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: 'var(--muted)',
                          }}
                        >
                          {repo.language}
                        </span>
                      )}
                      <div className="flex items-center gap-1" style={{ color: 'var(--muted)', fontSize: '10px' }}>
                        <svg style={{ color: 'var(--accent)' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px' }}>{repo.stargazers_count}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

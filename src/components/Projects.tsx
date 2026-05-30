import { getGitHubRepos } from '@/lib/github';
import BrowserMockup from '@/ui/BrowserMockup';
import ProjectCard from './ProjectCard';

function formatProjectName(name: string) {
    return name
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

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
            'Figma-inspired collaborative browser design tool with CanvasKit canvas engine and real-time state',
        tags: ['React', 'CanvasKit', 'Zustand', 'TypeScript'],
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
    const repoMap = new Map(repos.map((repo) => [repo.name, repo]));

    const featuredProjects = FEATURED_PROJECTS.map((project, index) => {
        const repo = repoMap.get(project.repoSlug);

        return {
            number: String(index + 1).padStart(2, '0'),
            name: formatProjectName(project.displayName),
            description: repo?.description || project.description,
            tags: project.tags,
            repoUrl: repo?.url || `https://github.com/Doyen04/${project.repoSlug}`,
            stars: repo?.stargazers_count || 0,
        };
    });

    const unplugProject = featuredProjects[0];
    const otherFeaturedProjects = featuredProjects.slice(1);

    const otherRepos = repos
        .filter((repo) => !FEATURED_PROJECTS.some((project) => project.repoSlug === repo.name))
        .slice(0, 6);

    return (
        <section id="work" className="py-24 px-12 border-b border-(--border)">
            <div>
                <div className="section-tag">
                    <span className="section-tag__number">[01]</span>
                    <span className="section-tag__label">Selected Work</span>
                </div>

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
                    Things I&apos;ve built
                </h2>

                {unplugProject && (
                    <div
                        className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5 mb-16 border border-(--border) p-4"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                        }}
                    >
                        <div
                            className="lg:col-span-3 flex flex-col justify-between gap-8 rounded-[inherit] border border-(--border) p-8 lg:p-10"
                            style={{ background: 'rgba(255,255,255,0.015)' }}
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-8">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.14em] text-(--accent) mb-2 inline-block" style={{ fontFamily: 'var(--mono)' }}>
                                            Featured Product
                                        </span>
                                        <div className="text-xs text-(--muted) mt-2" style={{ fontFamily: 'var(--mono)' }}>
                                            {unplugProject.stars} stars on GitHub
                                        </div>
                                    </div>

                                    <span className="text-[64px] leading-[0.9] text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                                        {unplugProject.number}
                                    </span>
                                </div>

                                <h3
                                    style={{
                                        fontFamily: 'var(--serif)',
                                        fontSize: 'clamp(34px, 4vw, 56px)',
                                        fontWeight: 500,
                                        lineHeight: 1.05,
                                        color: 'var(--white)',
                                        marginBottom: '16px',
                                    }}
                                >
                                    {unplugProject.name}
                                </h3>

                                <p
                                    className="mb-6 max-w-[56ch] text-[15px] leading-[1.75] text-(--muted)"
                                    style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}
                                >
                                    {unplugProject.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                        {unplugProject.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block px-3 py-1.5 border border-(--border) text-[9px] uppercase tracking-[0.12em] text-(--muted)"
                                                style={{ fontFamily: 'var(--mono)' }}
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
                                    <svg
                                        style={{ color: 'var(--accent)' }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <span>{unplugProject.stars}</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="lg:col-span-2 w-full flex items-center justify-center rounded-[inherit] border border-(--border) p-6 lg:p-8"
                            style={{ background: 'rgba(0,0,0,0.12)' }}
                        >
                            <BrowserMockup />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-20">
                    {otherFeaturedProjects.map((project, index) => (
                        <ProjectCard
                            key={project.number}
                            {...project}
                            className={index === 0 ? 'md:col-span-2' : 'md:col-span-1'}
                        />
                    ))}
                </div>

                {otherRepos.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
                        <a
                            href="https://github.com/Doyen04?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 mb-8 transition-colors text-(--muted) hover:text-(--accent)"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                            {otherRepos.map((repo, index) => {
                                const isLarge = index === 0 || index === 3;
                                const colSpanClass = isLarge ? 'md:col-span-2 xl:col-span-2' : 'md:col-span-1 xl:col-span-1';

                                return (
                                    <a
                                        key={repo.id}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative overflow-hidden transition-colors bg-transparent hover:bg-(--surface) border border-(--border) p-6 flex flex-col justify-between min-h-[210px] ${colSpanClass}`}
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        />

                                        <div className="flex-1">
                                            <h4
                                                className="group-hover:text-(--accent)! transition-colors mb-2 text-[24px]"
                                                style={{ fontFamily: 'var(--serif)', fontWeight: 500, color: 'var(--white)' }}
                                            >
                                                {formatProjectName(repo.name)}
                                            </h4>

                                            {repo.description && (
                                                <p className="mb-4 text-[14px] leading-[1.6] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
                                                    {repo.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {repo.language && (
                                                <span
                                                    className="text-(--muted) text-[10px]"
                                                    style={{ fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}
                                                >
                                                    {repo.language}
                                                </span>
                                            )}

                                            <div className="flex items-center gap-1" style={{ color: 'var(--muted)', fontSize: '10px' }}>
                                                <svg
                                                    style={{ color: 'var(--accent)' }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="10"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
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

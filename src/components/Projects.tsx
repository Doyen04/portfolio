import { getGitHubRepos } from '@/lib/github';
import ProjectCard from './ProjectCard';
import SectionTag from './ui/SectionTag';
import FeaturedProject from './Projects/FeaturedProject';
import RepoCard from './Projects/RepoCard';
import { formatProjectName } from '@/lib/format';

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
            siteUrl: repo?.homepage || null,
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
                <SectionTag number="[01]" label="Selected Work" />

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
                    <FeaturedProject
                        number={unplugProject.number}
                        name={unplugProject.name}
                        description={unplugProject.description}
                        tags={unplugProject.tags}
                        repoUrl={unplugProject.repoUrl}
                        stars={unplugProject.stars}
                        siteUrl={unplugProject.siteUrl}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-20">
                    {otherFeaturedProjects.map((project) => (
                        <ProjectCard key={project.number} {...project} />
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 grid-flow-row-dense">
                            {otherRepos.map((repo, index) => {
                                // Bento grid with equal width (all col-span-1), varying heights
                                const bentoClasses = [
                                    'md:col-span-1 md:row-span-2', // Item 0: Tall
                                    'md:col-span-1 md:row-span-1', // Item 1: Small
                                    'md:col-span-1 md:row-span-1', // Item 2: Small
                                    'md:col-span-1 md:row-span-2', // Item 3: Tall
                                    'md:col-span-1 md:row-span-1', // Item 4: Small
                                    'md:col-span-1 md:row-span-1', // Item 5: Small
                                ];
                                const classForIndex = bentoClasses[index % bentoClasses.length];
                                return (
                                    <div key={repo.id} className={`${classForIndex} h-full`}>
                                        <RepoCard repo={repo} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

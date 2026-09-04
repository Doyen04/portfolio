import { getGitHubRepos } from '@/lib/github';
import ProjectCard from './ProjectCard';
import SectionTag from './ui/SectionTag';
import FeaturedProject from './Projects/FeaturedProject';
import RepoCard from './Projects/RepoCard';
import { formatProjectName } from '@/lib/format';

const FEATURED_PROJECTS = [
    {
        repoSlug: 'Unplug',
        displayName: 'Unplug',
        description:
            'Subscription waste detection SaaS — AI-powered classification, virtual card issuance per subscription, one-click cancellation',
        tags: ['Next.js', 'Gemini AI', 'Prisma', 'Neon'],
    },
    {
        repoSlug: 'ECHELON',
        displayName: 'Echelon',
        description:
            'University admin dashboard with Senate approval workflows and multi-channel parent alerts (WhatsApp → Email → SMS)',
        tags: ['Next.js', 'Termii', 'QStash', 'Prisma'],
    },
    {
        repoSlug: 'CatalystReactor',
        displayName: 'Catalyst Reactor',
        description:
            'Figma-inspired collaborative browser design tool with CanvasKit canvas engine and real-time state',
        tags: ['React', 'CanvasKit', 'Zustand', 'TypeScript'],
    },
    {
        repoSlug: 'CARROM_POOL',
        displayName: 'Carrom Pool',
        description:
            'Physics-based Carrom Pool game in the browser with accurate rigid-body simulation',
        tags: ['JavaScript', 'Matter.js', 'Canvas'],
    },
];

export default async function Projects() {
    const repos = await getGitHubRepos();

    const normalize = (str: string) => str.toLowerCase().replace(/[-_]/g, '');

    const featuredProjects = FEATURED_PROJECTS.map((project, index) => {
        const normSlug = normalize(project.repoSlug);
        const repo = repos.find((r) => normalize(r.name) === normSlug);

        const repoName = repo ? repo.name : project.repoSlug;
        const repoUrl = repo?.html_url || (repo?.url && repo.url.includes('github.com') ? repo.url : `https://github.com/Doyen04/${repoName}`);

        return {
            number: String(index + 1).padStart(2, '0'),
            name: formatProjectName(project.displayName),
            description: repo?.description || project.description,
            tags: project.tags,
            repoUrl,
            stars: repo?.stargazers_count || 0,
            siteUrl: repo?.homepage || null,
        };
    });

    const unplugProject = featuredProjects[0];
    const otherFeaturedProjects = featuredProjects.slice(1);

    const otherRepos = repos
        .filter((repo) => {
            const normRepoName = normalize(repo.name);
            return !FEATURED_PROJECTS.some((project) => normalize(project.repoSlug) === normRepoName);
        })
        .slice(0, 6);

    return (
        <section id="work" className="py-16 md:py-24 px-5 sm:px-8 md:px-12 border-b border-(--border)">
            <div>
                <SectionTag number="[01]" label="Selected Work" />

                <h2
                    className="mb-10 md:mb-16"
                    style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(32px, 6vw, 84px)',
                        fontWeight: 300,
                        lineHeight: 1.05,
                        letterSpacing: '-0.015em',
                        color: 'var(--white)',
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-12 md:mb-20">
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

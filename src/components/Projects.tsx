import ProjectCard from './ProjectCard';
import SectionTag from './ui/SectionTag';
import FeaturedProject from './Projects/FeaturedProject';
import type { Project } from '@/types/content';

export default function Projects({ projects }: { projects: Project[] }) {
    const sorted = [...projects]
        .filter((project) => project.enabled !== false)
        .sort((a, b) => a.order - b.order);

    const featured = sorted.filter((project) => project.featured);
    const mainProject = featured[0] ?? null;
    const otherFeatured = featured.slice(1);
    const otherProjects = sorted.filter((project) => !project.featured);

    const numberFor = (project: Project) => String(sorted.indexOf(project) + 1).padStart(2, '0');

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

                {mainProject && (
                    <FeaturedProject project={mainProject} number={numberFor(mainProject)} />
                )}

                {otherFeatured.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-12 md:mb-20">
                        {otherFeatured.map((project) => (
                            <ProjectCard key={project.id} project={project} number={numberFor(project)} />
                        ))}
                    </div>
                )}

                {otherProjects.length > 0 && (
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
                            <span>Other work</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 grid-flow-row-dense">
                            {otherProjects.map((project, index) => {
                                const bentoClasses = [
                                    'md:col-span-1 md:row-span-2',
                                    'md:col-span-1 md:row-span-1',
                                    'md:col-span-1 md:row-span-1',
                                    'md:col-span-1 md:row-span-2',
                                    'md:col-span-1 md:row-span-1',
                                    'md:col-span-1 md:row-span-1',
                                ];
                                const classForIndex = bentoClasses[index % bentoClasses.length];
                                return (
                                    <div key={project.id} className={`${classForIndex} h-full`}>
                                        <ProjectCard project={project} number={numberFor(project)} />
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
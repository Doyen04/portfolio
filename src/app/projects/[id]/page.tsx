import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import SectionTag from '@/components/ui/SectionTag';
import SiteScreenshot from '@/ui/SiteScreenshot';
import { getProjects } from '@/lib/content';
import { mediaSrc } from '@/lib/media';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projects = await getProjects();

    const enabled = [...projects]
        .filter((project) => project.enabled !== false)
        .sort((a, b) => a.order - b.order);

    const project = enabled.find((p) => p.id === id);
    if (!project) notFound();

    const index = enabled.indexOf(project);
    const previous = enabled[index - 1] ?? enabled[enabled.length - 1];
    const next = enabled[index + 1] ?? enabled[0];
    const number = String(index + 1).padStart(2, '0');

    const video = project.video;
    const primaryImage = project.image;
    const gallery = (project.gallery ?? []).filter((url) => url && url !== primaryImage);

    return (
        <main className="relative">
            <header className="border-b border-(--border)">
                <div className="px-5 sm:px-8 md:px-12 py-5 flex items-center justify-between">
                    <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity" style={{ fontFamily: 'var(--mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--white)' }}>
                        Ademola Oluwasola
                    </Link>
                    <Link href="/#work" className="group inline-flex items-center gap-2 text-(--muted) hover:text-(--accent) transition-colors" style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                        <span>All work</span>
                    </Link>
                </div>
            </header>

            <div className="px-5 sm:px-8 md:px-12 py-12 md:py-20 max-w-6xl mx-auto">
                <div className="mb-8">
                    <SectionTag number={`[${number}]`} label="Case Study" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-10 md:items-start mb-16">
                    <div>
                        <h1
                            className="mb-6 max-w-[20ch]"
                            style={{
                                fontFamily: 'var(--serif)',
                                fontSize: 'clamp(38px, 7vw, 96px)',
                                fontWeight: 300,
                                lineHeight: 1.02,
                                letterSpacing: '-0.015em',
                                color: 'var(--white)',
                            }}
                        >
                            {project.name}
                        </h1>

                        <p className="mb-8 max-w-[62ch] text-[15px] sm:text-[16px] leading-[1.8] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
                            {project.description}
                        </p>

                        {project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-10">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="inline-block px-3 py-1.5 border border-(--border) text-[9px] uppercase tracking-[0.12em] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {(project.repoUrl || project.liveUrl) && (
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                {project.repoUrl && (
                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-fill inline-flex items-center gap-2">
                                        <span>View code</span>
                                        <span>→</span>
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
                                        <span>Live demo</span>
                                        <span>↗</span>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {(video || primaryImage) && (
                        <div className="md:sticky md:top-6">
                            <SiteScreenshot video={video} image={primaryImage} priority />
                        </div>
                    )}
                </div>

                {gallery.length > 0 && (
                    <div className="mb-10">
                        <h2 className="mb-6 text-[10px] uppercase tracking-[0.16em] text-(--accent)" style={{ fontFamily: 'var(--mono)' }}>
                            Screenshots
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gallery.map((url, i) => (
                                <div key={url} className="relative border border-(--border) overflow-hidden" style={{ background: 'var(--surface-2)', aspectRatio: '16 / 10' }}>
                                    <Image
                                        src={mediaSrc(url) ?? ''}
                                        alt={`${project.name} screenshot ${i + 1}`}
                                        fill
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        quality={82}
                                        unoptimized={url.toLowerCase().endsWith('.gif')}
                                        className="object-contain"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <nav className="flex items-center justify-between gap-4 pt-10 border-t border-(--border) mt-20" style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                    <Link href={`/projects/${previous.id}`} className="group inline-flex items-center gap-2 text-(--muted) hover:text-(--accent) transition-colors">
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                        <span className="hidden sm:inline">{previous.name}</span>
                        <span className="sm:hidden">Previous</span>
                    </Link>
                    <Link href={`/projects/${next.id}`} className="group inline-flex items-center gap-2 text-(--muted) hover:text-(--accent) transition-colors">
                        <span className="hidden sm:inline">{next.name}</span>
                        <span className="sm:hidden">Next</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </nav>
            </div>
        </main>
    );
}
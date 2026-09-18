import Link from 'next/link';
import SiteScreenshot from '@/ui/SiteScreenshot';
import type { Project } from '@/types/content';

type Props = {
    project: Project;
    number: string;
};

export default function FeaturedProject({ project, number }: Props) {
    const { id, name, description, tags, repoUrl, liveUrl, image, video } = project;

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5 mb-16 border border-(--border) p-4"
            style={{
                background:
                    'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            }}
        >
            <div
                className="lg:col-span-3 flex flex-col justify-between gap-6 sm:gap-8 rounded-[inherit] border border-(--border) p-5 sm:p-8 lg:p-10"
                style={{ background: 'rgba(255,255,255,0.015)' }}
            >
                <div>
                    <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
                        <div>
                            <span className="text-xs uppercase tracking-[0.14em] text-(--accent) mb-1 inline-block" style={{ fontFamily: 'var(--mono)' }}>
                                Featured Product
                            </span>
                        </div>

                        <span className="text-[48px] sm:text-[64px] leading-[0.9] text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                            {number}
                        </span>
                    </div>

                    <Link href={`/projects/${id}`} className="block no-underline">
                        <h3
                            style={{
                                fontFamily: 'var(--serif)',
                                fontSize: 'clamp(26px, 4vw, 56px)',
                                fontWeight: 500,
                                lineHeight: 1.05,
                                color: 'var(--white)',
                                marginBottom: '16px',
                            }}
                        >
                            {name}
                        </h3>
                    </Link>

                    <p className="mb-6 max-w-[56ch] text-[14px] sm:text-[15px] leading-[1.75] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => (
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

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-auto pt-2">
                    {repoUrl && (
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-fill text-center w-full sm:w-auto justify-center flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4" /></svg>
                            <span>GitHub Repo</span>
                            <span>→</span>
                        </a>
                    )}

                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-center w-full sm:w-auto justify-center flex items-center gap-2">
                            <span>Live Demo</span>
                            <span>↗</span>
                        </a>
                    )}

                    <Link href={`/projects/${id}`} className="text-center w-full sm:w-auto justify-center flex items-center gap-2 no-underline group" style={{ fontFamily: 'var(--mono)', fontSize: '12px' }}>
                        <span className="uppercase tracking-[0.12em] text-(--muted) group-hover:text-(--accent) transition-colors">View details</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1 text-(--muted) group-hover:text-(--accent)">→</span>
                    </Link>
                </div>
            </div>

            <Link href={`/projects/${id}`} className="lg:col-span-2 w-full flex items-center justify-center rounded-[inherit] border border-(--border) p-4 sm:p-6 lg:p-8 no-underline hover:opacity-90 transition-opacity" style={{ background: 'rgba(0,0,0,0.12)' }}>
                <SiteScreenshot image={image} video={video} priority />
            </Link>
        </div>
    );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteScreenshot from '@/ui/SiteScreenshot';
import type { BentoSpan } from './bentoLayout';
import type { Project } from '@/types/content';

const COL_SPAN: Record<number, string> = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    6: 'md:col-span-6',
};

type Props = {
    project: Project;
    number: string;
    span: BentoSpan;
};

export default function BentoTile({ project, number, span }: Props) {
    const { name, description, tags, repoUrl, liveUrl, image, video } = project;
    const detailHref = `/projects/${project.id}`;
    const hasMedia = Boolean(image || video);

    // wide tiles sit media-left, narrow tiles stack media on top; the preview
    // keeps its own aspect ratio so it is never cropped or letterboxed
    const stacked = span.col < 4;

    const marker = (
        <div className="flex items-start justify-between gap-4">
            <span className="text-[26px] sm:text-[32px] leading-none text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                {number}
            </span>
            <Link
                href={detailHref}
                className="text-[18px] leading-none text-(--faint) transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-label={`Open ${name}`}
            >
                <span className="transition-colors group-hover:text-(--accent)">↗</span>
            </Link>
        </div>
    );

    const heading = (
        <Link href={detailHref} className="block no-underline">
            <h3
                className={`line-clamp-2 ${stacked ? 'text-[20px] sm:text-[26px]' : 'text-[22px] sm:text-[32px]'}`}
                style={{ fontFamily: 'var(--serif)', fontWeight: 500, lineHeight: 1.05, color: 'var(--white)' }}
            >
                {name}
            </h3>
        </Link>
    );

    const tagList = (limit: number) =>
        tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, limit).map((tag) => (
                    <span
                        key={tag}
                        className="inline-block px-2.5 py-1 border border-(--border) text-[8.5px] uppercase tracking-[0.12em] text-(--muted)"
                        style={{ fontFamily: 'var(--mono)' }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        );

    const externalLinks = (
        <div className="flex items-center gap-1">
            {repoUrl && (
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" title="GitHub repo" className="inline-flex items-center p-1.5 transition-colors hover:text-(--accent)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4" /></svg>
                </a>
            )}
            {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" title="Live demo" className="inline-flex items-center p-1.5 text-(--accent) transition-colors hover:text-(--accent-hi)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </a>
            )}
        </div>
    );

    const viewDetails = (
        <Link href={detailHref} className="flex items-center gap-1.5 no-underline transition-colors group-hover:text-(--accent)" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px' }}>
            <span className="uppercase tracking-[0.12em]">Details</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
    );

    const media = (className: string) =>
        hasMedia && (
            <Link href={detailHref} tabIndex={-1} aria-hidden="true" className={`block shrink-0 overflow-hidden ${className}`}>
                <SiteScreenshot image={image} video={video} noBorder transparent />
            </Link>
        );

    const bleed = (className: string) =>
        hasMedia && (
            <Link href={detailHref} tabIndex={-1} aria-hidden="true" className={`block overflow-hidden ${className}`}>
                <SiteScreenshot image={image} video={video} noBorder transparent fill cover />
            </Link>
        );

    return (
        <motion.div
            className={`group relative h-full overflow-hidden border border-(--border) ${COL_SPAN[span.col]}`}
            whileHover={{ backgroundColor: 'var(--surface)' }}
            transition={{ duration: 0.2 }}
        >
            {stacked ? (
                <div className="flex h-full flex-col">
                    {media('w-full border-b border-(--border)')}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        {marker}
                        {heading}
                        <p className="line-clamp-3 text-[13px] leading-[1.7] text-(--muted)">{description}</p>
                        {tagList(3)}
                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-(--border)/50 pt-2.5">
                            {viewDetails}
                            {externalLinks}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative flex h-full flex-col sm:justify-center">
                    {/* in flow with its own ratio on mobile, edge to edge behind the tile from sm up */}
                    {bleed('aspect-[8/5] w-full shrink-0 border-b border-(--border) sm:absolute sm:inset-0 sm:aspect-auto sm:border-0')}
                    {/* translucent panel: hugs the copy and lets the preview read through */}
                    <div className="relative z-10 flex min-w-0 flex-col gap-3 p-5 sm:ml-auto sm:w-[62%] sm:max-w-[560px] sm:bg-black/80 sm:p-7">
                        {marker}
                        {heading}
                        <p className="line-clamp-2 max-w-[58ch] text-[13px] leading-[1.7] text-(--muted)">{description}</p>
                        <div className="mt-1 flex items-center justify-between gap-4">
                            {tagList(4)}
                            <div className="flex items-center gap-3">
                                {viewDetails}
                                {externalLinks}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

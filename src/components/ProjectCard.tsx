'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteScreenshot from '@/ui/SiteScreenshot';
import type { Project } from '@/types/content';

interface ProjectCardProps {
    project: Project;
    number: string;
    className?: string;
}

export default function ProjectCard({ project, number, className }: ProjectCardProps) {
    const { name, description, tags, repoUrl, liveUrl, image, video } = project;
    const detailHref = `/projects/${project.id}`;

    return (
        <motion.div
            className={`group block overflow-hidden transition-colors border border-(--border) p-5 sm:p-8 ${className ?? ''}`}
            whileHover={{ backgroundColor: 'var(--surface)' }}
            transition={{ duration: 0.2 }}
        >
            <Link href={detailHref} className="block -mx-5 -mt-5 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden border-b border-(--border)">
                <SiteScreenshot image={image} video={video} compact noBorder />
            </Link>

            {/* Top row: number + arrow */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
                <span className="text-[36px] sm:text-[52px] leading-none text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                    {number}
                </span>
                <Link href={detailHref} className="transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px] text-(--faint)" aria-label={`Open ${name}`}>
                    <span className="group-hover:text-(--accent)! transition-colors">↗</span>
                </Link>
            </div>

            {/* Title */}
            <Link href={detailHref} className="block no-underline">
                <h3 className="text-[24px] sm:text-[32px] md:text-[42px] mb-3" style={{ fontFamily: 'var(--serif)', fontWeight: 500, lineHeight: 1.05, color: 'var(--white)' }}>
                    {name}
                </h3>
            </Link>

            {/* Description */}
            <p className="mb-6 text-[14px] sm:text-[15px] leading-[1.75] text-(--muted) line-clamp-3" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
                {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                    <span key={tag} className="inline-block px-3 py-1.5 border border-(--border) text-[9px] uppercase tracking-[0.12em] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-2 border-t border-(--border)/50 text-[10px] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                <Link href={detailHref} className="flex items-center gap-1.5 group-hover:text-(--accent) transition-colors no-underline">
                    <span className="uppercase tracking-wider">View details</span>
                    <span>→</span>
                </Link>

                <div className="flex items-center gap-1.5">
                    {repoUrl && (
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" title="GitHub repo" className="inline-flex items-center p-1.5 hover:text-(--accent) transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4" /></svg>
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" title="Live demo" className="inline-flex items-center p-1.5 hover:text-(--accent) transition-colors">
                            <svg className="text-(--accent)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
'use client';

import { motion } from 'framer-motion';
import { formatProjectName } from '@/lib/format';
import SiteScreenshot from '@/ui/SiteScreenshot';

interface ProjectCardProps {
    number: string;
    name: string;
    description: string;
    tags: string[];
    repoUrl: string;
    stars: number;
    siteUrl?: string | null;
    className?: string;
}

export default function ProjectCard({
    number,
    name,
    description,
    tags,
    repoUrl,
    stars,
    siteUrl,
    className,
}: ProjectCardProps) {
    return (
        <motion.a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block overflow-hidden transition-colors border border-(--border) p-5 sm:p-8 bg-transparent no-underline ${className ?? ''}`}
            whileHover={{ backgroundColor: 'var(--surface)' }}
            transition={{ duration: 0.2 }}
        >
            {siteUrl && (
                <div className="-mx-5 -mt-5 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden border-b border-(--border)">
                    <SiteScreenshot siteUrl={siteUrl} compact noBorder />
                </div>
            )}

            {/* Top row: number + arrow */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
                <span className="text-[36px] sm:text-[52px] leading-none text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                    {number}
                </span>
                <span className="transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px] text-(--faint)">
                    <span className="group-hover:text-(--accent)! transition-colors">↗</span>
                </span>
            </div>

            {/* Title */}
            <h3 className="text-[24px] sm:text-[32px] md:text-[42px] mb-3" style={{ fontFamily: 'var(--serif)', fontWeight: 500, lineHeight: 1.05, color: 'var(--white)' }}>
                {formatProjectName(name)}
            </h3>

            {/* Description */}
            <p className="mb-6 text-[14px] sm:text-[15px] leading-[1.75] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
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

            {/* Footer row: GitHub Repo + Stars */}
            <div className="flex items-center justify-between pt-2 border-t border-(--border)/50 text-[10px] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                <div className="flex items-center gap-1.5 group-hover:text-(--accent) transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.5-2.4-1.5-2.4" /></svg>
                    <span className="uppercase tracking-wider">GitHub Repo →</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <svg className="text-(--accent)" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    <span>{stars}</span>
                </div>
            </div>
        </motion.a>
    );
}

'use client';

import { motion } from 'framer-motion';

function formatProjectName(name: string) {
    return name
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

interface ProjectCardProps {
    number: string;
    name: string;
    description: string;
    tags: string[];
    repoUrl: string;
    stars: number;
    className?: string;
}

export default function ProjectCard({
    number,
    name,
    description,
    tags,
    repoUrl,
    stars,
    className,
}: ProjectCardProps) {
    return (
        <motion.a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block transition-colors border border-(--border) p-8 bg-transparent no-underline ${className ?? ''}`}
            whileHover={{ backgroundColor: 'var(--surface)' }}
            transition={{ duration: 0.2 }}
        >
            {/* Top row: number + arrow */}
            <div className="flex items-start justify-between mb-6">
                <span className="text-[52px] leading-none text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                    {number}
                </span>
                <span className="transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px] text-(--faint)">
                    <span className="group-hover:text-(--accent)! transition-colors">↗</span>
                </span>
            </div>

            {/* Title */}
            <h3 className="text-[42px] mb-3" style={{ fontFamily: 'var(--serif)', fontWeight: 500, lineHeight: 1.05, color: 'var(--white)' }}>
                {formatProjectName(name)}
            </h3>

            {/* Description */}
            <p className="mb-6 text-[15px] leading-[1.75] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
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

            {/* Stars */}
            <div className="flex items-center gap-1.5 text-[10px] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                <svg className="text-(--accent)" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                <span>{stars}</span>
            </div>
        </motion.a>
    );
}

'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  number: string;
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
  stars: number;
}

export default function ProjectCard({
  number,
  name,
  description,
  tags,
  repoUrl,
  stars,
}: ProjectCardProps) {
  return (
    <motion.div
      className="border border-border rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-4xl font-serif font-bold text-accent opacity-20">
          {number}
        </span>
        <div className="flex gap-2 flex-wrap justify-end">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 border border-border rounded-full text-ink-muted hover:border-accent hover:text-accent transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h3 className="font-serif text-2xl font-bold text-ink mb-3">{name}</h3>
      <p className="text-ink-muted text-base mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4"/></svg>
          <span className="text-sm font-medium">View on GitHub</span>
        </a>
        <div className="flex items-center gap-1.5 text-sm font-medium text-ink-muted">
          <svg className="text-accent" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>{stars}</span>
        </div>
      </div>
    </motion.div>
  );
}

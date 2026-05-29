'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
      className="border border-border rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
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

      <div className="flex items-center justify-between">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
        >
          <span className="text-[10px] font-bold leading-none">GH</span>
          <span className="text-sm">View on GitHub</span>
        </a>
        <div className="flex items-center gap-1 text-sm text-ink-muted">
          <span className="text-accent">★</span>
          <span>{stars}</span>
        </div>
      </div>
    </motion.div>
  );
}

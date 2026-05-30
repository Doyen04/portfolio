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
    <motion.a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-colors"
      style={{
        border: '1px solid var(--border)',
        padding: '32px',
        background: 'transparent',
        textDecoration: 'none',
      }}
      whileHover={{ backgroundColor: 'var(--surface)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Top row: number + arrow */}
      <div className="flex items-start justify-between mb-6">
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '52px',
            fontWeight: 300,
            color: 'var(--faint)',
            lineHeight: 1,
          }}
        >
          {number}
        </span>
        <span
          className="transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            fontSize: '20px',
            color: 'var(--faint)',
          }}
        >
          <span className="group-hover:!text-[var(--accent)] transition-colors">↗</span>
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '42px',
          fontWeight: 500,
          lineHeight: 1.05,
          color: 'var(--white)',
          marginBottom: '12px',
        }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '15px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'var(--muted)',
          marginBottom: '24px',
        }}
      >
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '6px 12px',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stars */}
      <div
        className="flex items-center gap-1.5"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          color: 'var(--muted)',
        }}
      >
        <svg style={{ color: 'var(--accent)' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>{stars}</span>
      </div>
    </motion.a>
  );
}

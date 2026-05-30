'use client';

import React from 'react';
import styles from '../styles/carousel.module.css';

const SKILLS = [
  'TypeScript',
  'JavaScript',
  'Next.js',
  'React',
  'Tailwind CSS',
  'Node.js',
  'Prisma ORM',
  'Drizzle ORM',
  'PostgreSQL',
  'Google Gemini',
  'Anthropic Claude',
  'Termii',
  'Resend',
  'Vercel',
  'Cloudflare',
  'Upstash',
  'NextAuth',
  'Git & GitHub'
];

export default function Carousel() {
  // Duplicate skills list for a seamless loop
  const repeatedSkills = [...SKILLS, ...SKILLS];

  return (
    <div className={styles.carousel_container}>
      <div className={styles.marquee_track}>
        {repeatedSkills.map((skill, index) => (
          <div key={`${skill}-${index}`} className={styles.marquee_item}>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
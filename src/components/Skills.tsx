'use client';

import { motion } from 'framer-motion';

const SKILLS_GROUPS = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'Frameworks',
    items: ['Next.js 15', 'React 18', 'Tailwind CSS', 'Konva.js'],
  },
  {
    category: 'Backend & DB',
    items: ['Node.js', 'Prisma ORM', 'Drizzle ORM', 'PostgreSQL (Neon)'],
  },
  {
    category: 'AI & APIs',
    items: ['Google Gemini', 'Anthropic Claude', 'Termii', 'Resend'],
  },
  {
    category: 'Infrastructure',
    items: ['Vercel', 'Cloudflare R2', 'Upstash QStash', 'NextAuth v5'],
  },
  {
    category: 'Tooling',
    items: ['Git & GitHub', 'GitHub Copilot', 'VS Code'],
  },
];

// Flatten all skills into a single list for the 2-column bordered grid
const ALL_SKILLS = SKILLS_GROUPS.flatMap(group => group.items);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: '96px 48px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Section Tag */}
      <div className="section-tag">
        <span className="section-tag__number">[02]</span>
        <span className="section-tag__rule" />
        <span className="section-tag__label">Toolkit</span>
      </div>

      {/* Section Heading */}
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(44px, 6vw, 84px)',
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          color: 'var(--white)',
          marginBottom: '64px',
        }}
      >
        What I{' '}
        <em style={{ color: 'var(--accent)', fontWeight: 300 }}>work with</em>
      </h2>

      {/* Border-as-grid: 2-column layout */}
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: '1px solid var(--border)',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {ALL_SKILLS.map((skill, index) => {
          const isEvenCol = index % 2 === 1;
          const isLastRow = index >= ALL_SKILLS.length - (ALL_SKILLS.length % 2 === 0 ? 2 : 1);

          return (
            <motion.div
              key={skill}
              variants={itemVariants}
              className="group flex items-center gap-3 cursor-default transition-colors"
              style={{
                padding: '16px 20px',
                borderRight: isEvenCol ? 'none' : '1px solid var(--border)',
                borderBottom: isLastRow ? 'none' : '1px solid var(--border)',
              }}
              whileHover={{ backgroundColor: 'var(--surface)' }}
            >
              {/* Pip dot */}
              <span
                data-keep-radius="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-200"
              />
              <span
                className="transition-colors duration-200 group-hover:text-[var(--text)]"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                }}
              >
                {skill}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

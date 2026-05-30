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

const ALL_SKILLS = SKILLS_GROUPS.flatMap((group) => group.items);

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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            gridColumn: 'span 12',
            border: '1px solid var(--border)',
            padding: '28px',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '24px',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--accent)',
                  marginBottom: '10px',
                }}
              >
                Skill Atlas
              </div>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--muted)',
                  maxWidth: '62ch',
                }}
              >
                A more open masonry layout groups the stack by discipline so the section scans faster and feels less rigid.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--muted)',
              }}
            >
              {SKILLS_GROUPS.length} groups / {ALL_SKILLS.length} tools
            </div>
          </div>
        </div>
      </div>

      {/* Masonry-style grouped cards */}
      <motion.div
        className="columns-1 md:columns-2 xl:columns-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {SKILLS_GROUPS.map((group, index) => {
          const isTall = index === 0 || index === 2 || index === 4;

          return (
            <motion.article
              key={group.category}
              variants={itemVariants}
              className="group mb-4 break-inside-avoid"
              style={{
                border: '1px solid var(--border)',
                background: 'transparent',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: isTall ? '260px' : '220px',
              }}
              whileHover={{ backgroundColor: 'var(--surface)' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  alignItems: 'flex-start',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--accent)',
                      marginBottom: '8px',
                    }}
                  >
                    0{index + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: '24px',
                      fontWeight: 500,
                      color: 'var(--white)',
                      lineHeight: 1.1,
                    }}
                  >
                    {group.category}
                  </h3>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--muted)',
                    paddingTop: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {group.items.length} items
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '10px 12px',
                }}
              >
                {group.items.map((skill) => (
                  <div key={skill} className="group/item" style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <span
                      data-keep-radius="true"
                      className="inline-block w-1.5 h-1.5 rounded-full bg-(--border) group-hover:bg-(--accent) transition-colors duration-200"
                    />
                    <span
                      className="transition-colors duration-200 group-hover:text-(--text)"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '13px',
                        color: 'var(--muted)',
                        lineHeight: 1.35,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

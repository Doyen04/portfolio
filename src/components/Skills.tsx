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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-base">
        <div className="mb-16">
          <p className="eyebrow">02 — Toolkit</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-ink">
            What I work with
          </h2>
        </div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILLS_GROUPS.map((group) => (
            <motion.div key={group.category} variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <label className="eyebrow sm:w-32 flex-shrink-0">
                  {group.category}
                </label>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="badge"
                      whileHover={{
                        backgroundColor: 'var(--accent)',
                        borderColor: 'var(--accent)',
                        color: 'var(--white)',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

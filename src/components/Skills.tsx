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
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm font-mono uppercase tracking-widest mb-4 text-ink-muted">02 — Toolkit</p>
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
                <label className="sm:w-32 shrink-0 text-sm font-mono uppercase tracking-widest text-ink-muted mb-4 sm:mb-0">
                  {group.category}
                </label>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-border bg-white text-sm text-ink-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-md hover:-translate-y-0.5 cursor-default"
                    >
                      {skill}
                    </span>
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

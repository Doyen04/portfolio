'use client';

import { motion } from 'framer-motion';
import SkillGroup from './Skills/SkillGroup';

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
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    },
};

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-12 border-b border-(--border)">
            {/* Section Tag */}
            <div className="section-tag">
                <span className="section-tag__number">[02]</span>
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
                What I{' '}work with
            </h2>

            <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 border border-(--border) p-7" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="flex justify-between gap-6 items-end flex-wrap">
                        <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-(--accent) mb-2" style={{ fontFamily: 'var(--mono)' }}>
                                Skill Atlas
                            </div>
                            <p className="text-[15px] leading-[1.75] text-(--muted) max-w-[62ch]" style={{ fontFamily: 'var(--sans)' }}>
                                A more open masonry layout groups the stack by discipline so the section scans faster and feels less rigid.
                            </p>
                        </div>

                        <div className="text-xs text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                            {SKILLS_GROUPS.length} groups / {ALL_SKILLS.length} tools
                        </div>
                    </div>
                </div>
            </div>

            {/* Masonry-style grouped cards */}
            <motion.div className="columns-1 md:columns-2 xl:columns-3 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
                {SKILLS_GROUPS.map((group, index) => {
                    const isTall = index === 0 || index === 2 || index === 4;

                    return (
                        <motion.article key={group.category} variants={itemVariants} className={`group mb-4 break-inside-avoid border border-(--border) bg-transparent p-6 flex flex-col justify-between ${isTall ? 'min-h-65' : 'min-h-55'}`} whileHover={{ backgroundColor: 'var(--surface)' }}>
                            <SkillGroup category={group.category} items={group.items} index={index} />
                        </motion.article>
                    );
                })}
            </motion.div>
        </section>
    );
}

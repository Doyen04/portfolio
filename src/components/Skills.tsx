'use client';

import { motion } from 'framer-motion';
import SkillGroup from './Skills/SkillGroup';
import type { SkillGroup as SkillGroupType } from '@/types/content';


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

export default function Skills({ groups }: { groups: SkillGroupType[] }) {
    const sortedGroups = [...groups].sort((a, b) => a.order - b.order);

    return (
        <section id="skills" className="py-16 md:py-24 px-5 sm:px-8 md:px-12 border-b border-(--border)">
            {/* Section Tag */}
            <div className="section-tag">
                <span className="section-tag__number">[02]</span>
                <span className="section-tag__label">Toolkit</span>
            </div>

            {/* Section Heading */}
            <h2
                className="mb-10 md:mb-16"
                style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(32px, 6vw, 84px)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: '-0.015em',
                    color: 'var(--white)',
                }}
            >
                What I{' '}work with
            </h2>

            <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 border border-(--border) p-4 sm:p-7" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="flex justify-between gap-6 items-end flex-wrap">
                        <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-(--accent) mb-1 sm:mb-2" style={{ fontFamily: 'var(--mono)' }}>
                                Skill Atlas
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Masonry-style grouped cards */}
            <motion.div className="columns-1 md:columns-2 xl:columns-3 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
                {sortedGroups.map((group, index) => {
                    const isTall = index === 0 || index === 2 || index === 4;
                    const skills = [...group.skills].sort((a, b) => a.order - b.order).map((s) => s.name);

                    return (
                        <motion.article key={group.id} variants={itemVariants} className={`group mb-4 break-inside-avoid border border-(--border) bg-transparent p-5 sm:p-6 flex flex-col justify-between ${isTall ? 'min-h-48 sm:min-h-65' : 'min-h-40 sm:min-h-55'}`} whileHover={{ backgroundColor: 'var(--surface)' }}>
                            <SkillGroup category={group.name} items={skills} index={index} />
                        </motion.article>
                    );
                })}
            </motion.div>
        </section>
    );
}

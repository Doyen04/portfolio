'use client';

import { motion } from 'framer-motion';
import AboutBio from './About/AboutBio';
import AboutStats from './About/AboutStats';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
};

const STATS = [
    { value: '4', suffix: '+', label: 'Projects Shipped' },
    { value: '1', suffix: '+', label: 'Years Building' },
    { value: '∞', suffix: '', label: 'Curiosity' },
    { value: '1', suffix: '', label: 'Internship' },
];

export default function About() {
    return (
        <section id="about" className="py-24 px-12 border-b border-(--border)">
            {/* Section Tag */}
            <div className="section-tag">
                <span className="section-tag__number">[03]</span>
                <span className="section-tag__label">About</span>
            </div>

            {/* Section Heading */}
            <h2 className="mb-16" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--white)' }}>
                A bit{' '}about me
            </h2>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-20" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
                <motion.div variants={itemVariants} className="flex flex-col gap-6">
                    <AboutBio />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <AboutStats stats={STATS} />
                </motion.div>
            </motion.div>
        </section>
    );
}

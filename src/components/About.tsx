'use client';

import { motion } from 'framer-motion';

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

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {/* Main Text */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6">
                    <p className="text-[15px] font-[300] leading-[1.85] text-(--muted)" style={{ fontFamily: 'var(--sans)' }}>
                        I&apos;m a final-year Software Engineering student at Mountain Top University, Lagos,
                        building real things before graduation. My focus is full-stack web development — I care
                        as much about the experience a product creates as the code underneath it.
                    </p>
                    <p className="text-[15px] font-[300] leading-[1.85] text-(--muted)" style={{ fontFamily: 'var(--sans)' }}>
                        I&apos;ve worked as a software intern at NSIA Insurance, led a team at a university
                        hackathon, and spent most of my spare time shipping personal projects. My current
                        obsession is Unplug — a subscription management SaaS I&apos;m building as my final year project.
                    </p>
                    <p className="text-[15px] font-[300] leading-[1.85] text-(--muted)" style={{ fontFamily: 'var(--sans)' }}>
                        I&apos;m looking for a junior developer role where I can contribute quickly, learn from
                        experienced engineers, and keep building.
                    </p>
                </motion.div>

                {/* Sidebar — Stats Grid */}
                <motion.div variants={itemVariants}>
                    {/* Stats bordered grid */}
                    <div className="grid grid-cols-2 border border-(--border)">
                        {STATS.map((stat, index) => {
                            const isEvenCol = index % 2 === 1;
                            const isLastRow = index >= STATS.length - 2;

                            return (
                                <div key={stat.label} className="p-7" style={{ borderRight: isEvenCol ? 'none' : '1px solid var(--border)', borderBottom: isLastRow ? 'none' : '1px solid var(--border)' }}>
                                    <div
                                        style={{
                                            fontFamily: 'var(--serif)',
                                            fontSize: '56px',
                                            fontWeight: 300,
                                            color: 'var(--white)',
                                            lineHeight: 1,
                                            marginBottom: '8px',
                                        }}
                                    >
                                        {stat.value}
                                        {stat.suffix && (
                                            <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                                        )}
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
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Extra info cells */}
                    <div
                        style={{
                            marginTop: '3px',
                            border: '1px solid var(--border)',
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                        }}
                    >
                        {[
                            { label: 'Education', value: 'Mountain Top University, 2026' },
                            { label: 'Experience', value: 'Ex-intern @ NSIA Insurance' },
                            { label: 'Location', value: 'Lagos, Nigeria' },
                            { label: 'Availability', value: 'Open to remote & relocation' },
                        ].map((item, i, arr) => (
                            <div
                                key={item.label}
                                style={{
                                    padding: '16px 20px',
                                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'var(--mono)',
                                        fontSize: '9px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.16em',
                                        color: 'var(--accent)',
                                        marginBottom: '4px',
                                    }}
                                >
                                    {item.label}
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'var(--sans)',
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        color: 'var(--text)',
                                    }}
                                >
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

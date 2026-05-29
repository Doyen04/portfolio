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
    transition: { duration: 0.6 },
  },
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-bg-subtle">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm font-mono uppercase tracking-widest mb-4 text-ink-muted">03 — About</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-ink">
            A bit about me
          </h2>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main Text */}
          <motion.div
            className="md:col-span-2 space-y-6"
            variants={itemVariants}
          >
            <p className="text-lg text-ink-muted leading-relaxed">
              I'm a final-year Software Engineering student at Mountain Top University, Lagos, building real things before graduation. My focus is full-stack web development — I care as much about the experience a product creates as the code underneath it.
            </p>
            <p className="text-lg text-ink-muted leading-relaxed">
              I've worked as a software intern at NSIA Insurance, led a team at a university hackathon, and spent most of my spare time shipping personal projects. My current obsession is Unplug — a subscription management SaaS I'm building as my final year project.
            </p>
            <p className="text-lg text-ink-muted leading-relaxed">
              I'm looking for a junior developer role where I can contribute quickly, learn from experienced engineers, and keep building.
            </p>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="border border-border rounded-lg bg-white p-6 shadow-sm">
              <div className="space-y-5">
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-0.5">Education</p>
                  <p className="font-medium text-ink">
                    Mountain Top University, 2026
                  </p>
                </div>
                <div className="border-t border-border/50"></div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-0.5">Experience</p>
                  <p className="font-medium text-ink">Ex-intern @ NSIA Insurance</p>
                </div>
                <div className="border-t border-border/50"></div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-0.5">Location</p>
                  <p className="font-medium text-ink">Lagos, Nigeria</p>
                </div>
                <div className="border-t border-border/50"></div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-0.5">Availability</p>
                  <p className="font-medium text-ink">
                    Open to remote & relocation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

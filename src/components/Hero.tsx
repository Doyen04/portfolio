'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-0 overflow-hidden"
    >
      {/* Dot grid background on right (desktop only) */}
      <div
        className="hidden lg:block absolute top-0 right-0 w-2/5 h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--accent) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="text-sm font-mono uppercase tracking-widest mb-6 text-accent"
        >
          Welcome
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-ink mb-6 leading-tight"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          }}
        >
          Ademola Oluwasola Opeyemi
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl text-ink-muted font-light mb-8"
        >
          Full-Stack Developer · Lagos, Nigeria
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-ink-muted max-w-2xl mb-12 leading-relaxed"
        >
          I build production-grade web applications with Next.js, TypeScript, and PostgreSQL — from SaaS products and institutional platforms to AI-integrated tools. Currently open to junior developer roles.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a href="#work" className="px-6 py-3 bg-accent text-white font-medium rounded-lg transition-all duration-200 hover:bg-accent-hover active:scale-95">
            View My Work →
          </a>
          <a
            href="/Ademola_Opeyemi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-accent text-accent font-medium rounded-lg transition-all duration-200 hover:bg-accent hover:text-white"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-sm"
        >
          <a
            href="https://github.com/Doyen04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-muted hover:text-accent transition-colors"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center text-[10px] font-bold leading-none">GH</span>
            <span>github.com/Doyen04</span>
          </a>
          <a
            href="https://linkedin.com/in/Doyen04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-muted hover:text-accent transition-colors"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center text-[10px] font-bold leading-none">in</span>
            <span>linkedin.com/in/Doyen04</span>
          </a>
          <a
            href="mailto:oluwasolaopeyemi93@gmail.com"
            className="flex items-center gap-2 text-ink-muted hover:text-accent transition-colors"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center text-[10px] font-bold leading-none">@</span>
            <span>Email</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-accent text-2xl">⌄</span>
      </motion.div>
    </section>
  );
}

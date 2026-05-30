'use client';

import { motion } from 'framer-motion';

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
        className="hidden lg:block absolute top-0 right-0 w-[45%] h-full opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--border) 2px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to right, transparent, black 40%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%, black 80%, transparent)',
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto px-6 relative z-10 w-full"
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
          className="font-serif font-bold text-ink mb-6 leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(1.2rem, 8vw, 3.6rem)',
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
          <a href="#work" className="px-6 py-3 bg-accent text-white font-medium rounded-lg transition-all duration-200 hover:bg-accent-hover hover:shadow-md active:scale-[0.98]">
            View My Work →
          </a>
          <a
            href="/Ademola_Opeyemi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-accent text-accent font-medium rounded-lg transition-all duration-200 hover:bg-accent hover:text-white active:scale-[0.98]"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-sm pt-4"
        >
          <a
            href="https://github.com/Doyen04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-ink-muted hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4"/></svg>
            <span className="font-medium">github.com/Doyen04</span>
          </a>
          <a
            href="https://linkedin.com/in/Doyen04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-ink-muted hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span className="font-medium">linkedin.com/in/Doyen04</span>
          </a>
          <a
            href="mailto:oluwasolaopeyemi93@gmail.com"
            className="flex items-center gap-2.5 text-ink-muted hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span className="font-medium">Email</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-accent"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </motion.div>
    </section>
  );
}

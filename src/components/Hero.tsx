'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 md:pt-24 overflow-hidden"
      style={{ padding: '0 48px' }}
    >
      {/* Ghost letter "A" */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: '-60px',
          top: '48%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--serif)',
          fontSize: '52vw',
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '1px var(--faint)',
          lineHeight: 0.8,
        }}
        aria-hidden="true"
      >
        A
      </div>

      <motion.div
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >


        {/* Heading — Massive serif name */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(62px, 10vw, 150px)',
            fontWeight: 300,
            lineHeight: 0.88,
            letterSpacing: '-0.025em',
            color: 'var(--white)',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <span className="block lg:inline">Ademola</span>
          <span className="block lg:inline lg:ml-4">
            Oluwasola
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '16.5px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--muted)',
            maxWidth: '560px',
            marginBottom: '40px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          Software developer in Lagos building scalable software and production web apps with Next.js, TypeScript, and PostgreSQL.
        </motion.h2>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
        >
          <a href="#work" className="btn-fill">
            View My Work
            <span>→</span>
          </a>
          <a
            href="/Ademola_Opeyemi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 pt-4"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '10.5px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          <a
            href="https://github.com/Doyen04"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors p-2"
            style={{ color: 'var(--muted)' }}
            aria-label="GitHub — Ademola"
            title="GitHub"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4"/></svg>
          </a>
          <a
            href="https://linkedin.com/in/Doyen04"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors p-2"
            style={{ color: 'var(--muted)' }}
            aria-label="LinkedIn — Ademola"
            title="LinkedIn"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a
            href="mailto:oluwasolaopeyemi93@gmail.com"
            className="transition-colors p-2"
            style={{ color: 'var(--muted)' }}
            aria-label="Email — Ademola"
            title="Email"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="0"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ color: 'var(--muted)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </motion.div>
    </section>
  );
}

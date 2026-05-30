'use client';

import { motion } from 'framer-motion';
import HeroName from './Hero/HeroName';
import HeroSub from './Hero/HeroSub';
import HeroActions from './Hero/HeroActions';
import HeroSocial from './Hero/HeroSocial';

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
        <motion.h1 variants={itemVariants} style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(62px, 10vw, 150px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.025em', color: 'var(--white)', marginBottom: '32px', textAlign: 'center' }}>
          <HeroName />
        </motion.h1>

        {/* Subheading */}
        <motion.h2 variants={itemVariants} style={{ fontFamily: 'var(--sans)', fontSize: '16.5px', fontWeight: 300, lineHeight: 1.85, color: 'var(--muted)', maxWidth: '560px', marginBottom: '40px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <HeroSub />
        </motion.h2>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <HeroActions />
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 pt-4" style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          <HeroSocial />
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

'use client';

import { useEffect, useState } from 'react';
import styles from './ui-style/floatnav.module.css';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function FloatNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently centered/in viewport
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`hidden lg:flex ${styles.float_nav_container}`}>
      {SECTIONS.map((section) => (
        <div key={section.id} className={styles.nav_dot_wrapper}>
          <button
            data-keep-radius="true"
            onClick={() => scrollToSection(section.id)}
            className={`${styles.nav_dot} ${
              activeSection === section.id ? styles.active : ''
            }`}
            aria-label={`Scroll to ${section.label}`}
          />
          <span className={styles.tooltip}>{section.label}</span>
        </div>
      ))}
    </div>
  );
}
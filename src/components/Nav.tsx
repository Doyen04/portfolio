'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../ui/logo';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'border-b border-border'
          : 'bg-transparent'
      }`}
      style={isScrolled ? {
        background: 'rgba(12,12,10,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      } : undefined}
    >
      <div className="w-full px-12 flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="#hero" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--muted)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Status Indicator + CTA */}
        <div className="hidden md:flex items-center gap-6">
          {/* Available for work */}
          <div className="flex items-center gap-2">
            <span
              data-keep-radius="true"
              className="inline-block w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#4ADE80',
                animation: 'pulse 2.4s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
              }}
            >
              Available for work
            </span>
          </div>

          <a
            href="/Ademola_Opeyemi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 -mr-2"
          style={{ color: 'var(--text)' }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-border"
          style={{
            background: 'var(--surface)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="px-12 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--muted)',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Available for work (mobile) */}
            <div className="flex items-center gap-2 pt-2">
              <span
                data-keep-radius="true"
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: '#4ADE80',
                  animation: 'pulse 2.4s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--muted)',
                }}
              >
                Available for work
              </span>
            </div>
            <a
              href="/Ademola_Opeyemi_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill inline-block text-center"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

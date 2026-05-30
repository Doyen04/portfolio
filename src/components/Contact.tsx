'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrors({ submit: 'Failed to send message. Please try again.' });
      }
    } catch {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text)',
    fontFamily: 'var(--sans)',
    fontSize: '14px',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--mono)',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'var(--muted)',
    marginBottom: '8px',
  };

  return (
    <section
      id="contact"
      style={{
        padding: '96px 48px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Section Tag */}
      <div className="section-tag">
        <span className="section-tag__number">[04]</span>
        <span className="section-tag__label">Get In Touch</span>
      </div>

      {/* Massive serif heading */}
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(52px, 9vw, 130px)',
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--white)',
          marginBottom: '16px',
        }}
      >
        Let&apos;s{' '}
        <em style={{ color: 'var(--accent)', fontWeight: 300 }}>talk</em>
      </h2>

      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '15px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'var(--muted)',
          maxWidth: '500px',
          marginBottom: '64px',
        }}
      >
        I&apos;m currently open to junior developer roles, freelance projects, and interesting conversations.
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: '48px',
          alignItems: 'start',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Form */}
        <motion.div variants={itemVariants}>
          {isSuccess ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px',
                textAlign: 'center',
                border: '1px solid var(--border)',
                minHeight: '300px',
              }}
            >
              <div
                style={{
                  color: 'var(--accent)',
                  marginBottom: '16px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  marginBottom: '8px',
                }}
              >
                Message sent!
              </h3>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  color: 'var(--muted)',
                }}
              >
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label htmlFor="name" style={labelStyle}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.name ? '#ef4444' : 'var(--border)',
                  }}
                  onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={(e) => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontFamily: 'var(--mono)' }}>{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? '#ef4444' : 'var(--border)',
                  }}
                  onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={(e) => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontFamily: 'var(--mono)' }}>{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: 'none',
                    borderColor: errors.message ? '#ef4444' : 'var(--border)',
                  }}
                  onFocus={(e) => { if (!errors.message) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={(e) => { if (!errors.message) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  placeholder="Tell me about your project or just say hi..."
                />
                {errors.message && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', fontFamily: 'var(--mono)' }}>{errors.message}</p>
                )}
              </div>

              {errors.submit && (
                <p style={{ color: '#ef4444', fontSize: '12px', fontFamily: 'var(--mono)' }}>{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-fill w-full justify-center"
                style={{
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message →</span>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }} variants={itemVariants}>
          {[
            {
              href: 'mailto:oluwasolaopeyemi93@gmail.com',
              label: 'Email',
              value: 'oluwasolaopeyemi93@gmail.com',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="0"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
              external: false,
            },
            {
              href: 'https://github.com/Doyen04',
              label: 'GitHub',
              value: 'github.com/Doyen04',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4"/></svg>,
              external: true,
            },
            {
              href: 'https://linkedin.com/in/Doyen04',
              label: 'LinkedIn',
              value: 'linkedin.com/in/Doyen04',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
              external: true,
            },
          ].map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between transition-colors"
              style={{
                border: '1px solid var(--border)',
                padding: '24px',
                background: 'transparent',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div className="flex items-center gap-4">
                <div style={{ color: 'var(--accent)' }}>
                  {contact.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--muted)',
                      marginBottom: '4px',
                    }}
                  >
                    {contact.label}
                  </p>
                  <p
                    className="group-hover:!text-[var(--accent)] transition-colors"
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--text)',
                    }}
                  >
                    {contact.value}
                  </p>
                </div>
              </div>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: 'var(--faint)', fontSize: '16px' }}
              >
                <span className="group-hover:!text-[var(--accent)] transition-colors">→</span>
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

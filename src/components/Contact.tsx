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
    transition: { duration: 0.6 },
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

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm font-mono uppercase tracking-widest mb-4 text-ink-muted">04 — Get in Touch</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-ink mb-4">
            Let&apos;s talk
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl">
            I&apos;m currently open to junior developer roles, freelance projects, and interesting conversations.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Form */}
          <motion.div variants={itemVariants}>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-border rounded-lg bg-white h-full">
                <div className="text-accent mb-4 bg-accent/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                  Message sent!
                </h3>
                <p className="text-ink-muted">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-ink placeholder-ink-muted transition-colors focus:outline-none ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-border focus:border-accent'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-ink placeholder-ink-muted transition-colors focus:outline-none ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-border focus:border-accent'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-ink placeholder-ink-muted transition-colors focus:outline-none resize-none ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-border focus:border-accent'
                    }`}
                    placeholder="Tell me about your project or just say hi..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-sm">{errors.submit}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-accent text-white font-medium rounded-lg w-full flex items-center justify-center gap-2 disabled:opacity-70 transition-all duration-300 hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send message →</span>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div className="flex flex-col gap-4" variants={itemVariants}>
            <a
              href="mailto:oluwasolaopeyemi93@gmail.com"
              className="flex items-center gap-4 border border-border rounded-lg bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-accent group"
            >
              <div className="text-accent bg-accent/5 p-3 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-1">Email</p>
                <p className="font-medium text-ink group-hover:text-accent transition-colors">
                  oluwasolaopeyemi93@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://github.com/Doyen04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-border rounded-lg bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-accent group"
            >
              <div className="text-accent bg-accent/5 p-3 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4"/></svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-1">GitHub</p>
                <p className="font-medium text-ink group-hover:text-accent transition-colors">
                  github.com/Doyen04
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/Doyen04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-border rounded-lg bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-accent group"
            >
              <div className="text-accent bg-accent/5 p-3 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-1">LinkedIn</p>
                <p className="font-medium text-ink group-hover:text-accent transition-colors">
                  linkedin.com/in/Doyen04
                </p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

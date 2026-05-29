'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Loader2, Check } from 'lucide-react';

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
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-base">
        <div className="mb-16">
          <p className="eyebrow">04 — Get in Touch</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-ink mb-4">
            Let's talk
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl">
            I'm currently open to junior developer roles, freelance projects, and interesting conversations.
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Check size={48} className="text-accent mb-4" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                  Message sent!
                </h3>
                <p className="text-ink-muted">
                  Thanks for reaching out. I'll get back to you soon.
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
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
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
          <motion.div className="space-y-6" variants={itemVariants}>
            <a
              href="mailto:oluwasolaopeyemi93@gmail.com"
              className="card group"
            >
              <div className="flex items-start gap-4">
                <Mail className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-ink-muted mb-1">Email</p>
                  <p className="font-medium text-ink group-hover:text-accent transition-colors">
                    oluwasolaopeyemi93@gmail.com
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/Doyen04"
              target="_blank"
              rel="noopener noreferrer"
              className="card group"
            >
              <div className="flex items-start gap-4">
                <Github className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-ink-muted mb-1">GitHub</p>
                  <p className="font-medium text-ink group-hover:text-accent transition-colors">
                    github.com/Doyen04
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/Doyen04"
              target="_blank"
              rel="noopener noreferrer"
              className="card group"
            >
              <div className="flex items-start gap-4">
                <Linkedin className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-ink-muted mb-1">LinkedIn</p>
                  <p className="font-medium text-ink group-hover:text-accent transition-colors">
                    linkedin.com/in/Doyen04
                  </p>
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

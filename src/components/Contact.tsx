'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from './Contact/ContactForm';
import ContactInfo from './Contact/ContactInfo';

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

    // styles moved to Tailwind classes in JSX

    return (
        <section id="contact" className="py-24 px-12 border-b border-(--border)">
            {/* Section Tag */}
            <div className="section-tag">
                <span className="section-tag__number">[04]</span>
                <span className="section-tag__label">Get In Touch</span>
            </div>

            {/* Massive serif heading */}
            <h2 className="mb-4" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(52px, 9vw, 130px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--white)' }}>
                Let&apos;s{' '}
                <em style={{ color: 'var(--accent)', fontWeight: 300 }}>talk</em>
            </h2>

            <p className="text-[15px] font-light leading-[1.75] text-(--muted) max-w-125 mb-16" style={{ fontFamily: 'var(--sans)' }}>
                I&apos;m currently open to junior developer roles, freelance projects, and interesting conversations.
            </p>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {/* Form */}
                <motion.div variants={itemVariants}>
                    <ContactForm formState={formState} errors={errors} isLoading={isLoading} isSuccess={isSuccess} handleChange={handleChange} handleSubmit={handleSubmit} />
                </motion.div>

                {/* Contact Info */}
                <motion.div className="flex flex-col gap-1" variants={itemVariants}>
                    <ContactInfo />
                </motion.div>
            </motion.div>
        </section>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../doyen/actions';

const LINKS = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Skills', href: '/admin/skills' },
    { label: 'About', href: '/admin/about' },
    { label: 'Contact', href: '/admin/contact' },
    { label: 'CV', href: '/admin/cv' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

    const linkStyle = (href: string): React.CSSProperties => ({
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: isActive(href) ? 'var(--white)' : 'var(--muted)',
    });

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <nav className="sticky top-0 z-50 border-b border-(--border)" style={{ background: 'rgba(11,11,11,0.92)', backdropFilter: 'blur(16px)' }}>
                <div className="px-5 sm:px-8 md:px-12 flex items-center justify-between h-14">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-(--text) no-underline hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '15px' }}>
                            Ademola.
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            {LINKS.map((link) => (
                                <Link key={link.href} href={link.href} className="transition-colors" style={linkStyle(link.href)}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <form action={logout} className="hidden md:block">
                            <button
                                type="submit"
                                className="text-[10px] uppercase tracking-[0.14em] border border-(--border) px-3 py-1.5 cursor-pointer transition-colors hover:border-(--accent) hover:text-(--accent)"
                                style={{ fontFamily: 'var(--mono)', background: 'transparent', color: 'var(--muted)' }}
                            >
                                Logout
                            </button>
                        </form>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 -mr-2 cursor-pointer"
                            style={{ color: 'var(--text)' }}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                            )}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-(--border)" style={{ background: 'var(--surface)' }}>
                        <div className="px-6 py-5 flex flex-col gap-4">
                            {LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="transition-colors hover:opacity-70"
                                    style={linkStyle(link.href)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <form action={logout} className="pt-3 border-t border-(--border)">
                                <button
                                    type="submit"
                                    className="w-full text-[10px] uppercase tracking-[0.14em] border border-(--border) px-3 py-2.5 cursor-pointer transition-colors hover:border-(--accent) hover:text-(--accent)"
                                    style={{ fontFamily: 'var(--mono)', background: 'transparent', color: 'var(--muted)' }}
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </nav>
            <main className="px-5 sm:px-8 md:px-12 py-10 md:py-14">
                {children}
            </main>
        </div>
    );
}
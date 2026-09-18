'use client';

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

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <nav className="sticky top-0 z-50 border-b border-(--border)" style={{ background: 'rgba(11,11,11,0.92)', backdropFilter: 'blur(16px)' }}>
                <div className="px-5 sm:px-8 md:px-12 flex items-center justify-between h-14">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-(--text) no-underline hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '15px' }}>
                            Ademola.
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            {LINKS.map((link) => {
                                const active =
                                    link.href === '/admin'
                                        ? pathname === '/admin'
                                        : pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="transition-colors"
                                        style={{
                                            fontFamily: 'var(--mono)',
                                            fontSize: '10px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            color: active ? 'var(--white)' : 'var(--muted)',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <form action={logout}>
                        <button
                            type="submit"
                            className="text-[10px] uppercase tracking-[0.14em] border border-(--border) px-3 py-1.5 cursor-pointer transition-colors hover:border-(--accent) hover:text-(--accent)"
                            style={{ fontFamily: 'var(--mono)', background: 'transparent', color: 'var(--muted)' }}
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </nav>
            <main className="px-5 sm:px-8 md:px-12 py-10 md:py-14">
                {children}
            </main>
        </div>
    );
}
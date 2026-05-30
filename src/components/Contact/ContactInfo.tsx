type ContactItem = {
    href: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    external?: boolean;
};

export default function ContactInfo() {
    const items: ContactItem[] = [
        {
            href: 'mailto:oluwasolaopeyemi93@gmail.com',
            label: 'Email',
            value: 'oluwasolaopeyemi93@gmail.com',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="0" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
            external: false,
        },
        {
            href: 'https://github.com/Doyen04',
            label: 'GitHub',
            value: 'github.com/Doyen04',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4" /></svg>,
            external: true,
        },
        {
            href: 'https://linkedin.com/in/Doyen04',
            label: 'LinkedIn',
            value: 'linkedin.com/in/Doyen04',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
            external: true,
        },
    ];

    return (
        <>
            {items.map((contact) => (
                <a key={contact.label} href={contact.href} target={contact.external ? '_blank' : undefined} rel={contact.external ? 'noopener noreferrer' : undefined} className="group flex items-center justify-between transition-colors border border-(--border) p-6 bg-transparent hover:bg-(--surface) no-underline">
                    <div className="flex items-center gap-4">
                        <div className="text-(--accent)">{contact.icon}</div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.14em] text-(--muted) mb-1" style={{ fontFamily: 'var(--mono)' }}>{contact.label}</p>
                            <p className="group-hover:text-(--accent)! transition-colors text-[14px]" style={{ fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text)' }}>{contact.value}</p>
                        </div>
                    </div>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 text-(--faint) text-[16px]"><span className="group-hover:text-(--accent)! transition-colors">→</span></span>
                </a>
            ))}
        </>
    );
}

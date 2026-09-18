import type { ContactItem as ContactItemType, ContactItemType as ContactItemTypeName } from '@/types/content';

const ICONS: Record<ContactItemTypeName, React.ReactNode> = {
    email: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="0" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    ),
    github: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.8s-1.3-.4-4 1.5a13.9 13.9 0 0 0-7 0C4.3 1.6 3 2 3 2a5.4 5.4 0 0 0 .1 3.8A5.4 5.4 0 0 0 1.5 12c0 5 3 6.2 6 6.5-.8.5-1.5 1.4-1.8 2.8-.3.2-1.3.8-2.6-.4-1.2-1.4-1.5-2.4-1.5-2.4" /></svg>
    ),
    linkedin: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
    ),
    x: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16" /><path d="M20 4L4 20" /></svg>
    ),
    link: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    ),
};

export default function ContactInfo({ items }: { items: ContactItemType[] }) {
    return (
        <>
            {items.map((contact) => {
                const external = contact.type !== 'email';
                return (
                    <a
                        key={`${contact.label}-${contact.href}`}
                        href={contact.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="group flex items-center justify-between transition-colors border border-(--border) p-4 sm:p-6 bg-transparent hover:bg-(--surface) no-underline gap-3"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div className="text-(--accent) shrink-0">{ICONS[contact.type] ?? ICONS.link}</div>
                            <div className="min-w-0">
                                <p className="text-[9px] uppercase tracking-[0.14em] text-(--muted) mb-0.5" style={{ fontFamily: 'var(--mono)' }}>{contact.label}</p>
                                <p className="group-hover:text-(--accent)! transition-colors text-[12px] sm:text-[14px] break-all sm:break-normal" style={{ fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text)' }}>{contact.value}</p>
                            </div>
                        </div>
                        <span className="transition-transform duration-200 group-hover:translate-x-1 text-(--faint) text-[16px] shrink-0"><span className="group-hover:text-(--accent)! transition-colors">→</span></span>
                    </a>
                );
            })}
        </>
    );
}
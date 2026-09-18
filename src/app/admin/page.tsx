import Link from 'next/link';
import { getProjects, getSkillGroups, getContact, getSettings } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
    const [projects, skillGroups, contact, settings] = await Promise.all([
        getProjects(),
        getSkillGroups(),
        getContact(),
        getSettings(),
    ]);

    const stats = [
        { label: 'Projects', value: projects.length, href: '/admin/projects' },
        { label: 'Featured', value: projects.filter((p) => p.featured).length, href: '/admin/projects' },
        { label: 'Skill Groups', value: skillGroups.length, href: '/admin/skills' },
        { label: 'Contact Items', value: contact.items.length, href: '/admin/contact' },
    ];

    return (
        <div>
            <div className="border-b border-(--border) pb-8 mb-10">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                    Control Panel
                </div>
                <h1 className="mb-3" style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--white)', lineHeight: 1.05 }}>
                    Portfolio <span className="italic">content</span>
                </h1>
                <p className="text-[13px] text-(--muted)" style={{ fontFamily: 'var(--sans)' }}>
                    Everything below is stored as files — JSON content + uploaded media — updated live on this site.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-12">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="border border-(--border) p-5 hover:bg-(--surface) transition-colors no-underline block"
                    >
                        <div className="text-[9px] uppercase tracking-[0.14em] text-(--muted) mb-2" style={{ fontFamily: 'var(--mono)' }}>
                            {stat.label}
                        </div>
                        <div className="text-[40px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
                            {stat.value}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="border border-(--border) divide-y divide-(--border)">
                <div className="flex items-center justify-between p-5">
                    <div>
                        <div className="text-[9px] uppercase tracking-[0.14em] text-(--accent) mb-1" style={{ fontFamily: 'var(--mono)' }}>
                            Resume / CV
                        </div>
                        <div className="text-[13px] text-(--muted) break-all" style={{ fontFamily: 'var(--mono)' }}>
                            {settings.cvUrl || '/ademola%20oluwasola%20resume.pdf'}
                        </div>
                    </div>
                    <Link href="/admin/cv" className="btn-outline text-center">
                        Manage
                    </Link>
                </div>
                {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-5">
                        <div className="min-w-0">
                            <div className="flex items-center gap-3">
                                <span className="text-[13px] text-(--white)" style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>
                                    {p.name}
                                </span>
                                {p.featured && (
                                    <span className="text-[8px] uppercase tracking-[0.12em] text-(--accent) border border-(--accent) px-1.5 py-0.5" style={{ fontFamily: 'var(--mono)' }}>
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>
                        <Link href={`/admin/projects/${p.id}`} className="text-[9px] uppercase tracking-[0.12em] text-(--muted) hover:text-(--accent) no-underline transition-colors" style={{ fontFamily: 'var(--mono)' }}>
                            Edit →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
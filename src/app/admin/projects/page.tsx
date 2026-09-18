import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { deleteProjectAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminProjects() {
    const projects = await getProjects();
    const sorted = [...projects].sort((a, b) => a.order - b.order);

    return (
        <div>
            <div className="flex items-end justify-between gap-4 mb-10">
                <div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                        [01]
                    </div>
                    <h1 className="text-[32px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                        Projects
                    </h1>
                </div>
                <Link href="/admin/projects/new" className="btn-fill">
                    + New Project
                </Link>
            </div>

            {sorted.length === 0 ? (
                <p className="text-(--muted) text-[13px]" style={{ fontFamily: 'var(--mono)' }}>
                    No projects yet — add your first one.
                </p>
            ) : (
                <div className="flex flex-col">
                    {sorted.map((project) => (
                        <div key={project.id} className="border border-(--border) mb-3">
                            <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                                <div className="min-w-0 flex items-center gap-4">
                                    <span className="text-[20px] text-(--faint)" style={{ fontFamily: 'var(--mono)' }}>
                                        {String(project.order).padStart(2, '0')}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-[15px] text-(--white)" style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>
                                                {project.name}
                                            </span>
                                            {project.featured && (
                                                <span className="text-[8px] uppercase tracking-[0.12em] text-(--accent) border border-(--accent) px-1.5 py-0.5" style={{ fontFamily: 'var(--mono)' }}>
                                                    Featured
                                                </span>
                                            )}
                                            {!project.enabled && (
                                                <span className="text-[8px] uppercase tracking-[0.12em] text-(--muted) border border-(--border) px-1.5 py-0.5" style={{ fontFamily: 'var(--mono)' }}>
                                                    Hidden
                                                </span>
                                            )}
                                        </div>
                                        {project.tags.length > 0 && (
                                            <div className="mt-1 text-[10px] text-(--muted) truncate" style={{ fontFamily: 'var(--mono)' }}>
                                                {project.tags.join(' · ')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={`/admin/projects/${project.id}`} className="btn-outline !px-4 !py-2 text-center">
                                        Edit
                                    </Link>
                                    <form action={deleteProjectAction}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <button type="submit" className="border border-(--border) px-4 py-2 text-[9px] uppercase tracking-[0.12em] cursor-pointer transition-colors hover:border-[#EF6B6B] hover:text-[#EF6B6B]" style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
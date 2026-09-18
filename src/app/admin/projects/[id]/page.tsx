import { getProjects } from '@/lib/content';
import ProjectForm from '../ProjectForm';

export const dynamic = 'force-dynamic';

export default async function AdminProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    const projects = await getProjects();
    const project = isNew ? null : projects.find((p) => p.id === id) || null;

    return (
        <div>
            <div className="mb-10">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                    {isNew ? 'New Project' : 'Edit Project'}
                </div>
                <h1 className="text-[32px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                    {project ? project.name : 'Add a project'}
                </h1>
            </div>

            {!project && !isNew && (
                <p className="text-(--muted) text-[13px] mb-6" style={{ fontFamily: 'var(--mono)' }}>
                    Project not found.
                </p>
            )}

            <ProjectForm project={project} />
        </div>
    );
}
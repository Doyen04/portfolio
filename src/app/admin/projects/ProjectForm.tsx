'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import Field from '../Field';
import FileUpload from '../FileUpload';
import { saveProjectForm, type ActionResult } from '../actions';
import type { Project } from '@/types/content';

export default function ProjectForm({ project }: { project: Project | null }) {
    const [state, formAction] = useActionState<ActionResult | void, FormData>(saveProjectForm, undefined);

    const isNew = !project;

    return (
        <form action={formAction} className="max-w-2xl" data-keep-radius="true">
            <input type="hidden" name="id" value={project?.id ?? ''} />

            <Field name="name" label="Project name *" defaultValue={project?.name} placeholder="Unplug" />
            <Field name="description" label="Description" defaultValue={project?.description} textarea rows={5} placeholder="What does it do, what did you build?" />
            <Field name="tags" label="Tags (comma separated)" defaultValue={project?.tags.join(', ')} placeholder="Next.js, Gemini AI, Prisma" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field name="repoUrl" label="GitHub / repo URL" type="url" defaultValue={project?.repoUrl} placeholder="https://github.com/..." />
                <Field name="liveUrl" label="Live URL" type="url" defaultValue={project?.liveUrl} placeholder="https://..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <FileUpload
                    name="image"
                    label="Screenshot"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    folder="uploads/projects"
                    initialUrl={project?.image}
                    hint="PNG / JPG"
                />
                <FileUpload
                    name="video"
                    label="Demo video"
                    accept="video/mp4,video/webm"
                    folder="uploads/projects"
                    initialUrl={project?.video}
                    hint="MP4 / WEBM"
                />
            </div>

            <div className="border border-(--border) p-5 mb-6 flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="featured" defaultChecked={project?.featured} className="accent-(--accent) w-4 h-4" />
                    <span className="text-[11px] uppercase tracking-[0.12em] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                        Featured project
                    </span>
                </label>
                <div className="grid grid-cols-2 gap-5">
                    <Field name="order" label="Order on page" type="number" defaultValue={project?.order ?? 0} />
                    <div className="flex items-end pb-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="enabled" defaultChecked={project?.enabled !== false} className="accent-(--accent) w-4 h-4" />
                            <span className="text-[11px] uppercase tracking-[0.12em] text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                                Visible on site
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {state !== undefined && !state.ok && (
                <p className="mb-4 text-[12px] text-[#EF6B6B]">{state.error}</p>
            )}

            <div className="flex items-center gap-3">
                <button type="submit" className="btn-fill">
                    {isNew ? 'Create project' : 'Save changes'}
                </button>
                <Link href="/admin/projects" className="btn-outline no-underline">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
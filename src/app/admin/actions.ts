'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/dal';
import { saveProjects, saveSkillGroups, saveAbout, saveContact, saveSettings, getProjects, getSettings } from '@/lib/content';
import { deleteMediaUrl } from '@/lib/store';
import type { Project, SkillGroup, About, Contact } from '@/types/content';

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

function parseGallery(raw: FormDataEntryValue | null): string[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(String(raw));
        if (!Array.isArray(parsed)) return [];
        return parsed.map((url) => String(url ?? '').trim()).filter(Boolean);
    } catch {
        return [];
    }
}

function mediaUrls(project: Project): string[] {
    return [project.image, project.video, ...(project.gallery ?? [])].filter((url): url is string => Boolean(url));
}

// ── Projects ────────────────────────────────────────────────────────────────

export async function saveProjectForm(_state: ActionResult | void, formData: FormData): Promise<ActionResult | void> {
    await requireAdmin();

    const id = String(formData.get('id') ?? '').trim();
    const name = String(formData.get('name') ?? '').trim();

    if (!name) {
        return { ok: false, error: 'Project name is required.' };
    }

    const projects = await getProjects();
    const now = Date.now();
    const projectId = id || `p-${now}`;

    const existing = projects.find((p) => p.id === projectId);
    const updated: Project = {
        id: projectId,
        name,
        description: String(formData.get('description') ?? ''),
        tags: String(formData.get('tags') ?? '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        repoUrl: String(formData.get('repoUrl') ?? '').trim() || undefined,
        liveUrl: String(formData.get('liveUrl') ?? '').trim() || undefined,
        image: String(formData.get('image') ?? '').trim() || undefined,
        video: String(formData.get('video') ?? '').trim() || undefined,
        gallery: parseGallery(formData.get('gallery')),
        featured: formData.get('featured') === 'on',
        order: Number(formData.get('order') ?? existing?.order ?? 0) || 0,
        enabled: formData.get('enabled') !== 'off',
    };

    // Delete blobs that were replaced or removed so nothing is left behind.
    if (existing) {
        const remaining = new Set(mediaUrls(updated).filter(Boolean));
        const removed = mediaUrls(existing).filter((url) => url && !remaining.has(url));
        await Promise.allSettled(removed.map((url) => deleteMediaUrl(url)));
    }

    if (existing) {
        await saveProjects(projects.map((p) => (p.id === projectId ? updated : p)));
    } else {
        await saveProjects([...projects, updated]);
    }

    revalidatePath('/', 'layout');
    redirect('/admin/projects');
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
    await requireAdmin();
    const id = String(formData.get('id') ?? '');
    const projects = await getProjects();
    const target = projects.find((p) => p.id === id);

    // Remove the project's media blobs too so nothing is left behind.
    if (target) {
        const media = mediaUrls(target).filter((url): url is string => Boolean(url));
        await Promise.allSettled(media.map((url) => deleteMediaUrl(url)));
    }

    await saveProjects(projects.filter((p) => p.id !== id));
    revalidatePath('/', 'layout');
    revalidatePath('/admin/projects');
}

// ── Skills ──────────────────────────────────────────────────────────────────

export async function saveSkillsForm(_state: ActionResult | void, formData: FormData): Promise<ActionResult> {
    await requireAdmin();

    const raw = String(formData.get('data') ?? '');
    let groups: SkillGroup[];
    try {
        groups = JSON.parse(raw);
    } catch {
        return { ok: false, error: 'Invalid skills data.' };
    }

    const normalized = groups.map((g, gi) => ({
        id: String(g.id || `g-${gi + 1}`),
        name: String(g.name || '').trim(),
        order: gi + 1,
        skills: (g.skills || []).map((s, si) => ({
            id: String(s.id || `s-${gi}-${si}`),
            name: String(s.name || '').trim(),
            order: si + 1,
        })),
    }));

    await saveSkillGroups(normalized);
    revalidatePath('/', 'layout');
    return { ok: true, message: 'Skills saved.' };
}

// ── About ───────────────────────────────────────────────────────────────────

export async function saveAboutForm(_state: ActionResult | void, formData: FormData): Promise<ActionResult> {
    await requireAdmin();

    const parse = (key: string): unknown => {
        const raw = String(formData.get(key) ?? '');
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch {
            return [];
        }
    };

    const about: About = {
        bio: (parse('bio') as string[]) || [],
        stats: parse('stats') as About['stats'],
        details: parse('details') as About['details'],
    };

    await saveAbout(about);
    revalidatePath('/', 'layout');
    return { ok: true, message: 'About page saved.' };
}

// ── Contact ─────────────────────────────────────────────────────────────────

export async function saveContactForm(_state: ActionResult | void, formData: FormData): Promise<ActionResult> {
    await requireAdmin();

    const raw = String(formData.get('data') ?? '');
    let items: Contact['items'];
    try {
        items = JSON.parse(raw);
    } catch {
        return { ok: false, error: 'Invalid contact data.' };
    }

    await saveContact({ items });
    revalidatePath('/', 'layout');
    return { ok: true, message: 'Contact info saved.' };
}

// ── Settings (CV) ──────────────────────────────────────────────────────────

export async function saveCvForm(_state: ActionResult | void, formData: FormData): Promise<ActionResult> {
    await requireAdmin();

    const cvUrl = String(formData.get('cvUrl') ?? '').trim();
    if (!cvUrl) {
        return { ok: false, error: 'No CV uploaded.' };
    }

    const settings = await getSettings();
    await saveSettings({ ...settings, cvUrl });
    revalidatePath('/', 'layout');
    return { ok: true, message: 'CV updated.' };
}
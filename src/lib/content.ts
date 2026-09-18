import { readText, writeText } from './store';
import { defaultContent } from './defaults';
import type { PortfolioContent, Project, SkillGroup, About, Contact, Settings } from '@/types/content';

const CONTENT_DIR = 'portfolio-content';

async function readContentFile<T>(file: string, fallback: T): Promise<T> {
    const raw = await readText(`${CONTENT_DIR}/${file}`);
    if (!raw) return fallback;
    try {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as T;
        return { ...fallback, ...(parsed as Record<string, unknown>) } as T;
    } catch {
        return fallback;
    }
}

async function writeContentFile(file: string, data: unknown): Promise<void> {
    await writeText(`${CONTENT_DIR}/${file}`, JSON.stringify(data, null, 2));
}

// ── Getters ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
    return readContentFile('projects.json', defaultContent.projects);
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
    return readContentFile('skill-groups.json', defaultContent.skillGroups);
}

export async function getAbout(): Promise<About> {
    return readContentFile('about.json', defaultContent.about);
}

export async function getContact(): Promise<Contact> {
    return readContentFile('contact.json', defaultContent.contact);
}

export async function getSettings(): Promise<Settings> {
    return readContentFile('settings.json', defaultContent.settings);
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
    const [projects, skillGroups, about, contact, settings] = await Promise.all([
        getProjects(),
        getSkillGroups(),
        getAbout(),
        getContact(),
        getSettings(),
    ]);
    return { projects, skillGroups, about, contact, settings };
}

// ── Setters ─────────────────────────────────────────────────────────────────

export async function saveProjects(projects: Project[]): Promise<void> {
    await writeContentFile('projects.json', projects);
}

export async function saveSkillGroups(groups: SkillGroup[]): Promise<void> {
    await writeContentFile('skill-groups.json', groups);
}

export async function saveAbout(about: About): Promise<void> {
    await writeContentFile('about.json', about);
}

export async function saveContact(contact: Contact): Promise<void> {
    await writeContentFile('contact.json', contact);
}

export async function saveSettings(settings: Settings): Promise<void> {
    await writeContentFile('settings.json', settings);
}
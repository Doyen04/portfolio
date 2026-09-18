import * as fs from 'fs/promises';
import * as path from 'path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const PUBLIC_DIR = path.join(ROOT, 'public');

export function isBlobStore(): boolean {
    return !!process.env.BLOB_READ_WRITE_TOKEN;
}

function localPath(p: string): string {
    return path.join(DATA_DIR, p);
}

function publicUrl(p: string): string {
    return '/' + p;
}

async function ensureDir(filePath: string) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
}

// ── Read ────────────────────────────────────────────────────────────────────

export async function readText(pathname: string): Promise<string | null> {
    if (isBlobStore()) {
        try {
            const { head } = await import('@vercel/blob');
            const b = await head(pathname);
            const res = await fetch(b.url);
            if (!res.ok) return null;
            return await res.text();
        } catch {
            return null;
        }
    }

    try {
        const filePath = localPath(pathname);
        await fs.access(filePath);
        return await fs.readFile(filePath, 'utf-8');
    } catch {
        return null;
    }
}

// ── Write content (JSON / text) ─────────────────────────────────────────────

export async function writeText(pathname: string, content: string): Promise<void> {
    if (isBlobStore()) {
        const { put } = await import('@vercel/blob');
        await put(pathname, content, {
            access: 'public',
            contentType: pathname.endsWith('.json') ? 'application/json' : 'text/plain',
            addRandomSuffix: false,
        });
        return;
    }

    const filePath = localPath(pathname);
    await ensureDir(filePath);
    await fs.writeFile(filePath, content, 'utf-8');
}

// ── Media ───────────────────────────────────────────────────────────────────

/**
 * Save a media file (image, video, PDF, etc.) and return its public URL.
 * `key` is the desired storage path, e.g. "uploads/projects/unplug.mp4"
 */
export async function saveMedia(
    key: string,
    data: File | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array>,
    contentType?: string
): Promise<string> {
    if (isBlobStore()) {
        const { put } = await import('@vercel/blob');
        const blob = await put(key, data as unknown as File, {
            access: 'public',
            contentType,
            addRandomSuffix: false,
        });
        return blob.url;
    }

    const filePath = path.join(PUBLIC_DIR, key);
    await ensureDir(filePath);

    if (data instanceof ArrayBuffer) {
        await fs.writeFile(filePath, Buffer.from(data));
    } else if (data instanceof Uint8Array) {
        await fs.writeFile(filePath, Buffer.from(data));
    } else if (data instanceof File) {
        await fs.writeFile(filePath, Buffer.from(await data.arrayBuffer()));
    } else {
        const chunks: Uint8Array[] = [];
        const reader = data.getReader();
        let done = false;
        while (!done) {
            const result = await reader.read();
            done = result.done;
            if (result.value) chunks.push(result.value);
        }
        await fs.writeFile(filePath, Buffer.concat(chunks));
    }
    return publicUrl(key);
}

// ── Delete ──────────────────────────────────────────────────────────────────

export async function deleteObject(pathname: string): Promise<void> {
    if (isBlobStore()) {
        const { del } = await import('@vercel/blob');
        try {
            await del(pathname);
        } catch {
            // blob not found, ignore
        }
        return;
    }

    try {
        const filePath = localPath(pathname);
        await fs.unlink(filePath);
    } catch {
        // file not found, ignore
    }
}

// ── Media delete from public path ───────────────────────────────────────────

export async function deleteMediaUrl(url: string): Promise<void> {
    // If it's a local path like /uploads/foo.mp4 → delete from public/
    if (!url.startsWith('http')) {
        const rel = url.replace(/^\//, '');
        const filePath = path.join(PUBLIC_DIR, rel);
        try {
            await fs.unlink(filePath);
        } catch {
            // ignore
        }
        return;
    }

    // If it's a Vercel Blob URL → delete via pathname
    try {
        const { del } = await import('@vercel/blob');
        await del(url);
    } catch {
        // ignore
    }
}

// ── Media URL for the local-folder fallback ─────────────────────────────────

/**
 * Given a storage key (e.g. "uploads/cv/resume.pdf"), return the public URL
 * in the local-folder fallback mode (used only when no Blob token is set).
 */
export function mediaPublicUrl(key: string): string {
    return publicUrl(key);
}
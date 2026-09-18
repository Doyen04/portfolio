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

async function ensureDir(filePath: string) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
}

const EXT_TO_CONTENT_TYPE: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    avif: 'image/avif',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
    webm: 'video/webm',
    pdf: 'application/pdf',
    json: 'application/json',
};

export function contentTypeFromExt(pathname: string): string {
    const ext = (pathname.match(/\.(\w{1,8})$/)?.[1] || '').toLowerCase();
    return EXT_TO_CONTENT_TYPE[ext] || 'application/octet-stream';
}

/**
 * Check whether a media file already exists at the given key. Used to build
 * collision-free, human-readable upload keys (e.g. "screenshot.png-1").
 */
export async function mediaExists(pathname: string): Promise<boolean> {
    if (isBlobStore()) {
        try {
            const { head } = await import('@vercel/blob');
            const blob = await head(pathname);
            return Boolean(blob);
        } catch {
            return false;
        }
    }

    try {
        await fs.access(path.join(PUBLIC_DIR, pathname));
        return true;
    } catch {
        return false;
    }
}

// ── Read ────────────────────────────────────────────────────────────────────

export async function readText(pathname: string): Promise<string | null> {
    if (isBlobStore()) {
        try {
            const { get } = await import('@vercel/blob');
            const res = await get(pathname, { access: 'private' });
            if (!res || res.statusCode !== 200 || !res.stream) return null;
            return await new Response(res.stream).text();
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
            access: 'private',
            contentType: pathname.endsWith('.json') ? 'application/json' : 'text/plain',
            addRandomSuffix: false,
            allowOverwrite: true,
        });
        return;
    }

    const filePath = localPath(pathname);
    await ensureDir(filePath);
    await fs.writeFile(filePath, content, 'utf-8');
}

// ── Media ───────────────────────────────────────────────────────────────────

/**
 * Save a media file (image, video, PDF, etc.) and return its storage key
 * (e.g. "uploads/projects/unplug.mp4"). Render it through `mediaSrc()` from
 * `src/lib/media` so it is served via `/api/media/<key>` (Blob-backed) or
 * statically (local-folder fallback).
 */
export async function saveMedia(
    key: string,
    data: File | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array>,
    contentType?: string
): Promise<string> {
    if (isBlobStore()) {
        const { put } = await import('@vercel/blob');
        const blob = await put(key, data as unknown as File, {
            access: 'private',
            contentType,
            addRandomSuffix: false,
        });
        return blob.pathname;
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
    return key;
}

/**
 * Stream the bytes of a stored media file, used by the public `/api/media`
 * proxy. Returns `null` when the file does not exist.
 */
export async function readMedia(key: string): Promise<{ body: ReadableStream<Uint8Array> | ArrayBuffer; contentType: string } | null> {
    if (isBlobStore()) {
        try {
            const { get } = await import('@vercel/blob');
            const res = await get(key, { access: 'private' });
            if (!res || res.statusCode !== 200 || !res.stream) return null;
            return { body: res.stream, contentType: res.blob.contentType || contentTypeFromExt(key) };
        } catch {
            return null;
        }
    }

    try {
        const filePath = path.join(PUBLIC_DIR, key);
        const data = await fs.readFile(filePath);
        const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
        return { body: buffer, contentType: contentTypeFromExt(key) };
    } catch {
        return null;
    }
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

// ── Media delete from a stored value ────────────────────────────────────────

export async function deleteMediaUrl(value: string): Promise<void> {
    // Accept a storage key ("uploads/x.png"), a static path ("/uploads/x.png"),
    // or a full URL (legacy public blob URL).
    if (value.startsWith('http://') || value.startsWith('https://')) {
        try {
            const { del } = await import('@vercel/blob');
            await del(value);
        } catch {
            // ignore
        }
        return;
    }

    const key = value.replace(/^\/+/, '');
    if (isBlobStore()) {
        try {
            const { del } = await import('@vercel/blob');
            await del(key);
        } catch {
            // ignore
        }
        return;
    }

    try {
        await fs.unlink(path.join(PUBLIC_DIR, key));
    } catch {
        // ignore
    }
}
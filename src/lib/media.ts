/**
 * Convert a stored media value into something the browser can load.
 *
 * - Full URLs are passed through (legacy / external).
 * - Values starting with "/" are existing static assets in `public/` (e.g. the
 *   default resume PDF) and are used as-is.
 * - Anything else is a storage key (Blob pathname or local uploads key) and is
 *   served through the public `/api/media` proxy.
 */
export function mediaSrc(value: string | undefined): string | undefined {
    if (!value) return undefined;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (value.startsWith('/')) return value;
    return `/api/media?key=${encodeURIComponent(value)}`;
}
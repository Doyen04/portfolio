import { NextResponse } from 'next/server';
import { readMedia } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
    const { key } = await context.params;
    const safeKey = key.join('/').replace(/^\/+/, '').replace(/\.{2,}/g, '');
    if (!safeKey) {
        return new NextResponse('Missing key', { status: 400 });
    }

    const media = await readMedia(safeKey);
    if (!media) {
        return new NextResponse('Not found', { status: 404 });
    }

    const headers = new Headers({
        'Content-Type': media.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
    });

    return new Response(media.body, { headers });
}
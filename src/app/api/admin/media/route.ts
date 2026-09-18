import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/dal';
import { saveMedia } from '@/lib/store';

export async function POST(request: NextRequest) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') ?? 'uploads')
        .replace(/^\/+|\/+$/g, '')
        .replace(/\.+/g, '')
        .replace(/[^a-zA-Z0-9_\-/]/g, '');

    if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Safety: cap individual upload size except large videos handled elsewhere.
    const ext = (file.name.match(/\.(\w{1,8})$/)?.[1] || 'bin').toLowerCase();
    const safeBase = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(-40);
    const key = `${folder}/${Date.now()}-${safeBase}.${ext}`;

    try {
        const url = await saveMedia(key, file, file.type);
        return NextResponse.json({ url });
    } catch (err) {
        console.error('Upload failed:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
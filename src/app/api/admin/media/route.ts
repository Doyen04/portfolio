import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/dal';
import { mediaExists, saveMedia } from '@/lib/store';

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

    // Build a human-readable, single-extension key from the original filename.
    // If a file with that name already exists, append a numeric suffix instead
    // of prefixing timestamps/random strings.
    const ext = (file.name.match(/\.(\w{1,8})$/)?.[1] ?? 'bin').toLowerCase();
    const safeBase = (file.name.replace(/\.[^.]*$/, '') || 'file').replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 60);

    let key = `${folder}/${safeBase}.${ext}`;
    let suffix = 1;
    while (await mediaExists(key)) {
        key = `${folder}/${safeBase}-${suffix}.${ext}`;
        suffix += 1;
    }

    try {
        const url = await saveMedia(key, file, file.type);
        return NextResponse.json({ url });
    } catch (err) {
        console.error('Upload failed:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
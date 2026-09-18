'use client';

import { useRef, useState } from 'react';

type Props = {
    name: string;
    label: string;
    folder: string;
    initialUrls?: string[];
    hint?: string;
};

export default function GalleryUpload({ name, label, folder, initialUrls, hint }: Props) {
    const [urls, setUrls] = useState<string[]>(initialUrls ?? []);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok || !data.url) {
                setError(data.error || 'Upload failed');
                return;
            }
            setUrls((prev) => [...prev, data.url]);
        } catch {
            setError('Upload failed. The file may be too large for serverless uploads.');
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div className="border border-(--border) p-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
            <div className="flex items-center justify-between gap-4 mb-3">
                <label htmlFor={`${name}-input`} className="text-[9px] uppercase tracking-[0.14em] text-(--muted) cursor-pointer" style={{ fontFamily: 'var(--mono)' }}>
                    {label}
                </label>
                <span className="text-[10px] text-(--faint)" style={{ fontFamily: 'var(--mono)' }}>
                    {hint}
                </span>
            </div>

            <input id={`${name}-input`} ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

            {urls.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                    {urls.map((url, index) => (
                        <div key={url} className="relative border border-(--border) overflow-hidden group" style={{ aspectRatio: '4 / 3', background: 'var(--bg)' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`gallery ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setUrls((prev) => prev.filter((u) => u !== url))}
                                className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center text-[9px] text-[#EF6B6B] border border-[#EF6B6B] bg-[#0C0C0A]/85 cursor-pointer hover:bg-[#EF6B6B] hover:text-[#0C0C0A] transition-colors"
                                style={{ fontFamily: 'var(--mono)' }}
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full border border-(--border) py-2.5 text-[10px] uppercase tracking-[0.14em] cursor-pointer disabled:opacity-50 transition-colors hover:border-(--accent) hover:text-(--accent)"
                style={{ fontFamily: 'var(--mono)', background: 'transparent', color: 'var(--muted)' }}
            >
                {uploading ? 'Uploading…' : urls.length > 0 ? 'Add more images' : 'Choose images'}
            </button>

            <input type="hidden" name={name} value={JSON.stringify(urls)} />

            {error && <p className="mt-2 text-[11px] text-[#EF6B6B]">{error}</p>}
        </div>
    );
}
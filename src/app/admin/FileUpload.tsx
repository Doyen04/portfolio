'use client';

import { useRef, useState } from 'react';
import { mediaSrc } from '@/lib/media';

type Props = {
    name: string;
    label: string;
    accept?: string;
    folder: string;
    initialUrl?: string;
    hint?: string;
};

export default function FileUpload({ name, label, accept, folder, initialUrl, hint }: Props) {
    const [url, setUrl] = useState<string>(initialUrl ?? '');
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
            setUrl(data.url);
        } catch {
            setError('Upload failed. The file may be too large for serverless uploads.');
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const isVideo = accept?.includes('video');
    const previewSrc = mediaSrc(url);

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

            <input id={`${name}-input`} ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full border border-(--border) py-2.5 text-[10px] uppercase tracking-[0.14em] cursor-pointer disabled:opacity-50 transition-colors hover:border-(--accent) hover:text-(--accent)"
                style={{ fontFamily: 'var(--mono)', background: 'transparent', color: url ? 'var(--accent)' : 'var(--muted)' }}
            >
                {uploading ? 'Uploading…' : url ? 'Replace file' : 'Choose file'}
            </button>

            <input type="hidden" name={name} value={url} />

            {error && <p className="mt-2 text-[11px] text-[#EF6B6B]">{error}</p>}

            {url && (
                <div className="mt-3 flex items-center gap-3">
                    <div className="w-16 h-12 overflow-hidden border border-(--border) flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                        {isVideo ? (
                            <video src={previewSrc} className="w-full h-full object-contain" muted playsInline />
                        ) : url === '' || url.endsWith('.pdf') ? (
                            <span className="text-[8px] uppercase text-(--muted)" style={{ fontFamily: 'var(--mono)' }}>
                                PDF
                            </span>
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewSrc} alt="preview" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-(--muted) break-all truncate" style={{ fontFamily: 'var(--mono)' }}>
                            {url}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setUrl('')}
                        className="text-[9px] uppercase tracking-[0.12em] text-(--muted) border border-(--border) px-2 py-1 cursor-pointer hover:text-[#EF6B6B] hover:border-[#EF6B6B] transition-colors"
                        style={{ fontFamily: 'var(--mono)' }}
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}
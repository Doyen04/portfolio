'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { saveCvForm, type ActionResult } from '../actions';

export default function CvForm({ initialUrl }: { initialUrl: string }) {
    const [url, setUrl] = useState(initialUrl);
    const [state, formAction] = useActionState<ActionResult | void, FormData>(saveCvForm, undefined);

    return (
        <form action={formAction} className="max-w-2xl">
            <input type="hidden" name="cvUrl" value={url} />

            <div className="mb-8">
                <label htmlFor="cv-file" className="block text-[9px] uppercase tracking-[0.14em] text-(--muted) mb-2 cursor-pointer" style={{ fontFamily: 'var(--mono)' }}>
                    Resume / CV file (PDF)
                </label>
                <input
                    id="cv-file"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('folder', 'uploads');
                        const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
                        const data = await res.json();
                        if (res.ok && data.url) setUrl(data.url);
                    }}
                />
                <button
                    type="button"
                    onClick={() => document.getElementById('cv-file')?.click()}
                    className="w-full sm:w-auto border border-(--border) px-6 py-2.5 text-[10px] uppercase tracking-[0.14em] cursor-pointer transition-colors hover:border-(--accent) hover:text-(--accent) text-(--muted)"
                    style={{ fontFamily: 'var(--mono)', background: 'transparent' }}
                >
                    Upload PDF
                </button>
                <p className="mt-2 text-[11px] text-(--faint)" style={{ fontFamily: 'var(--mono)' }}>
                    {url || 'No CV uploaded yet.'}
                </p>
            </div>

            {state !== undefined && !state.ok && <p className="mb-4 text-[12px] text-[#EF6B6B]">{state.error}</p>}
            {state !== undefined && state.ok && <p className="mb-4 text-[12px] text-(--accent)">{state.message}</p>}

            <button type="submit" className="btn-fill">
                Save CV
            </button>
        </form>
    );
}
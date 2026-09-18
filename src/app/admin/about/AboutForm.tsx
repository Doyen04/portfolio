'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { saveAboutForm, type ActionResult } from '../actions';
import type { About } from '@/types/content';

export default function AboutForm({ about }: { about: About }) {
    const [bio, setBio] = useState<string[]>(about.bio);
    const [stats, setStats] = useState<About['stats']>(about.stats);
    const [details, setDetails] = useState<About['details']>(about.details);
    const [state, formAction] = useActionState<ActionResult | void, FormData>(saveAboutForm, undefined);

    const setBioAt = (i: number, v: string) => setBio((p) => p.map((x, j) => (j === i ? v : x)));
    const addBio = () => setBio((p) => [...p, '']);
    const removeBioAt = (i: number) => setBio((p) => p.filter((_, j) => j !== i));

    const setStatAt = (i: number, key: 'value' | 'suffix' | 'label', v: string) =>
        setStats((p) => p.map((s, j) => (j === i ? { ...s, [key]: v } : s)));
    const addStat = () => setStats((p) => [...p, { value: '', suffix: '', label: '' }]);
    const removeStatAt = (i: number) => setStats((p) => p.filter((_, j) => j !== i));

    const setDetailAt = (i: number, key: 'label' | 'value', v: string) =>
        setDetails((p) => p.map((d, j) => (j === i ? { ...d, [key]: v } : d)));
    const addDetail = () => setDetails((p) => [...p, { label: '', value: '' }]);
    const removeDetailAt = (i: number) => setDetails((p) => p.filter((_, j) => j !== i));

    const inputClass =
        'px-3.5 py-2.5 border border-(--border) bg-transparent text-(--text) outline-none focus:border-(--accent) transition-colors w-full text-[13px]';

    return (
        <form action={formAction} className="max-w-3xl">
            <input type="hidden" name="bio" value={JSON.stringify(bio)} />
            <input type="hidden" name="stats" value={JSON.stringify(stats)} />
            <input type="hidden" name="details" value={JSON.stringify(details)} />

            <h2 className="mb-4 text-[18px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)' }}>
                Bio
            </h2>
            <div className="border border-(--border) p-5 mb-10 flex flex-col gap-4">
                {bio.map((paragraph, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <textarea value={paragraph} onChange={(e) => setBioAt(i, e.target.value)} rows={3} className={inputClass} style={{ resize: 'vertical' }} />
                        <button type="button" onClick={() => removeBioAt(i)} className="text-(--muted) hover:text-[#EF6B6B] cursor-pointer px-1 py-2 shrink-0" aria-label="Remove paragraph">
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addBio} className="self-start text-[9px] uppercase tracking-[0.12em] text-(--muted) hover:text-(--accent) cursor-pointer transition-colors" style={{ fontFamily: 'var(--mono)' }}>
                    + Add paragraph
                </button>
            </div>

            <h2 className="mb-4 text-[18px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)' }}>
                Stats
            </h2>
            <div className="border border-(--border) p-5 mb-10 flex flex-col gap-3">
                {stats.map((stat, i) => (
                    <div key={i} className="grid grid-cols-[1fr_80px_1.4fr_auto] gap-2 items-center">
                        <input type="text" value={stat.value} onChange={(e) => setStatAt(i, 'value', e.target.value)} placeholder="4" className={inputClass} />
                        <input type="text" value={stat.suffix} onChange={(e) => setStatAt(i, 'suffix', e.target.value)} placeholder="+" className={inputClass} />
                        <input type="text" value={stat.label} onChange={(e) => setStatAt(i, 'label', e.target.value)} placeholder="Projects shipped" className={inputClass} />
                        <button type="button" onClick={() => removeStatAt(i)} className="text-(--muted) hover:text-[#EF6B6B] cursor-pointer px-1" aria-label="Remove stat">
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addStat} className="self-start text-[9px] uppercase tracking-[0.12em] text-(--muted) hover:text-(--accent) cursor-pointer transition-colors" style={{ fontFamily: 'var(--mono)' }}>
                    + Add stat
                </button>
            </div>

            <h2 className="mb-4 text-[18px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)' }}>
                Details
            </h2>
            <div className="border border-(--border) p-5 mb-10 flex flex-col gap-3">
                {details.map((detail, i) => (
                    <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
                        <input type="text" value={detail.label} onChange={(e) => setDetailAt(i, 'label', e.target.value)} placeholder="Education" className={inputClass} />
                        <input type="text" value={detail.value} onChange={(e) => setDetailAt(i, 'value', e.target.value)} placeholder="Mountain Top University, 2026" className={inputClass} />
                        <button type="button" onClick={() => removeDetailAt(i)} className="text-(--muted) hover:text-[#EF6B6B] cursor-pointer px-1" aria-label="Remove detail">
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addDetail} className="self-start text-[9px] uppercase tracking-[0.12em] text-(--muted) hover:text-(--accent) cursor-pointer transition-colors" style={{ fontFamily: 'var(--mono)' }}>
                    + Add detail
                </button>
            </div>

            {state !== undefined && !state.ok && <p className="mb-4 text-[12px] text-[#EF6B6B]">{state.error}</p>}
            {state !== undefined && state.ok && <p className="mb-4 text-[12px] text-(--accent)">{state.message}</p>}

            <button type="submit" className="btn-fill">
                Save About
            </button>
        </form>
    );
}
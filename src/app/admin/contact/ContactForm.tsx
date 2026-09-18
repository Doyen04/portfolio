'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { saveContactForm, type ActionResult } from '../actions';
import type { ContactItem, ContactItemType } from '@/types/content';

const TYPE_OPTIONS: { value: ContactItemType; label: string }[] = [
    { value: 'email', label: 'Email' },
    { value: 'github', label: 'GitHub' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'x', label: 'X / Twitter' },
    { value: 'link', label: 'Link' },
];

export default function ContactForm({ items }: { items: ContactItem[] }) {
    const [items_, setItems] = useState<ContactItem[]>(items);
    const [state, formAction] = useActionState<ActionResult | void, FormData>(saveContactForm, undefined);

    const setAt = (i: number, key: keyof ContactItem, v: string) =>
        setItems((p) => p.map((item, j) => (j === i ? { ...item, [key]: v } : item)));

    const add = () => setItems((p) => [...p, { label: '', value: '', href: '', type: 'link' }]);
    const removeAt = (i: number) => setItems((p) => p.filter((_, j) => j !== i));

    const inputClass =
        'px-3 py-2 border border-(--border) bg-transparent text-(--text) outline-none focus:border-(--accent) transition-colors w-full text-[12px]';
    const selectClass = `${inputClass} appearance-none cursor-pointer`;

    return (
        <form action={formAction} className="max-w-3xl">
            <input type="hidden" name="data" value={JSON.stringify(items_)} />

            <div className="flex flex-col gap-4 mb-8">
                {items_.map((item, i) => (
                    <div key={i} className="border border-(--border) p-5">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="text-[12px] text-(--faint)" style={{ fontFamily: 'var(--mono)' }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            {items_.length > 1 && (
                                <button type="button" onClick={() => removeAt(i)} className="text-[9px] uppercase tracking-[0.12em] border border-(--border) px-2 py-1 cursor-pointer hover:text-[#EF6B6B] hover:border-[#EF6B6B] text-(--muted) transition-colors" style={{ fontFamily: 'var(--mono)' }}>
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_2fr_2.6fr_1.2fr] gap-3 items-center">
                            <select value={item.type} onChange={(e) => setAt(i, 'type', e.target.value)} className={selectClass} style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>
                                {TYPE_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <input type="text" value={item.label} onChange={(e) => setAt(i, 'label', e.target.value)} placeholder="Label (e.g. Email)" className={inputClass} />
                            <input type="text" value={item.value} onChange={(e) => setAt(i, 'value', e.target.value)} placeholder="Display value" className={inputClass} />
                            <input type="url" value={item.href} onChange={(e) => setAt(i, 'href', e.target.value)} placeholder="https://..." className={inputClass} />
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" onClick={add} className="btn-outline mb-8">
                + Add contact item
            </button>

            {state !== undefined && !state.ok && <p className="mb-4 text-[12px] text-[#EF6B6B]">{state.error}</p>}
            {state !== undefined && state.ok && <p className="mb-4 text-[12px] text-(--accent)">{state.message}</p>}

            <button type="submit" className="btn-fill">
                Save contact
            </button>
        </form>
    );
}
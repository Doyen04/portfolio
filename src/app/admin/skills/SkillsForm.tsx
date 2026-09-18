'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { saveSkillsForm, type ActionResult } from '../actions';
import type { SkillGroup } from '@/types/content';

type EditableGroup = { id: string; name: string; skills: string[] };

export default function SkillsForm({ groups }: { groups: SkillGroup[] }) {
    const [items, setItems] = useState<EditableGroup[]>(
        groups.map((g) => ({ id: g.id, name: g.name, skills: g.skills.map((s) => s.name) }))
    );
    const [state, formAction] = useActionState<ActionResult | void, FormData>(saveSkillsForm, undefined);

    const update = (gi: number, patch: Partial<EditableGroup>) => {
        setItems((prev) => prev.map((g, i) => (i === gi ? { ...g, ...patch } : g)));
    };

    const updateSkill = (gi: number, si: number, value: string) => {
        setItems((prev) =>
            prev.map((g, i) =>
                i === gi ? { ...g, skills: g.skills.map((s, j) => (j === si ? value : s)) } : g
            )
        );
    };

    const addSkill = (gi: number) => {
        setItems((prev) => prev.map((g, i) => (i === gi ? { ...g, skills: [...g.skills, ''] } : g)));
    };

    const removeSkill = (gi: number, si: number) => {
        setItems((prev) =>
            prev.map((g, i) => (i === gi ? { ...g, skills: g.skills.filter((_, j) => j !== si) } : g))
        );
    };

    const addGroup = () => {
        setItems((prev) => [...prev, { id: `g-${Date.now()}`, name: '', skills: [''] }]);
    };

    const removeGroup = (gi: number) => {
        setItems((prev) => prev.filter((_, i) => i !== gi));
    };

    const serialized = JSON.stringify(
        items.map((g) => ({
            id: g.id,
            name: g.name,
            skills: g.skills.map((s) => ({ id: `${g.id}-s`, name: s })),
        }))
    );

    return (
        <form action={formAction} className="max-w-3xl">
            <input type="hidden" name="data" value={serialized} />

            <div className="flex flex-col gap-4 mb-8">
                {items.map((group, gi) => (
                    <div key={group.id} className="border border-(--border) p-5">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-[12px] text-(--faint)" style={{ fontFamily: 'var(--mono)' }}>
                                {String(gi + 1).padStart(2, '0')}
                            </span>
                            <input
                                type="text"
                                value={group.name}
                                onChange={(e) => update(gi, { name: e.target.value })}
                                placeholder="Group name (e.g. Frameworks)"
                                className="flex-1 px-3 py-2 border border-(--border) bg-transparent text-(--text) outline-none focus:border-(--accent) transition-colors text-[13px]"
                                style={{ fontFamily: 'var(--sans)' }}
                            />
                            {items.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeGroup(gi)}
                                    className="text-[9px] uppercase tracking-[0.12em] border border-(--border) px-2 py-1 cursor-pointer hover:text-[#EF6B6B] hover:border-[#EF6B6B] text-(--muted) transition-colors"
                                    style={{ fontFamily: 'var(--mono)' }}
                                >
                                    Remove group
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {group.skills.map((skill, si) => (
                                <div key={si} className="flex items-center gap-1 border border-(--border) pr-1">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => updateSkill(gi, si, e.target.value)}
                                        placeholder="Skill"
                                        className="px-2.5 py-1.5 bg-transparent text-(--text) outline-none text-[12px] w-40"
                                        style={{ fontFamily: 'var(--mono)' }}
                                    />
                                    <button type="button" onClick={() => removeSkill(gi, si)} className="text-(--muted) hover:text-[#EF6B6B] cursor-pointer px-1" aria-label="Remove skill">
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button type="button" onClick={() => addSkill(gi)} className="text-[9px] uppercase tracking-[0.12em] text-(--muted) hover:text-(--accent) cursor-pointer transition-colors" style={{ fontFamily: 'var(--mono)' }}>
                            + Add skill
                        </button>
                    </div>
                ))}
            </div>

            <button type="button" onClick={addGroup} className="btn-outline mb-8">
                + Add group
            </button>

            {state !== undefined && !state.ok && <p className="mb-4 text-[12px] text-[#EF6B6B]">{state.error}</p>}
            {state !== undefined && state.ok && <p className="mb-4 text-[12px] text-(--accent)">{state.message}</p>}

            <button type="submit" className="btn-fill">
                Save skills
            </button>
        </form>
    );
}
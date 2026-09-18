import { getSkillGroups } from '@/lib/content';
import SkillsForm from './SkillsForm';

export const dynamic = 'force-dynamic';

export default async function AdminSkills() {
    const groups = await getSkillGroups();

    return (
        <div>
            <div className="mb-10">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                    [02]
                </div>
                <h1 className="text-[32px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                    Skills
                </h1>
                <p className="mt-3 text-[13px] text-(--muted) max-w-xl" style={{ fontFamily: 'var(--sans)' }}>
                    Manage the skill groups shown in the Toolkit section. Order within each group is read top-to-bottom.
                </p>
            </div>

            <SkillsForm groups={groups} />
        </div>
    );
}
import { getAbout } from '@/lib/content';
import AboutForm from './AboutForm';

export const dynamic = 'force-dynamic';

export default async function AdminAbout() {
    const about = await getAbout();

    return (
        <div>
            <div className="mb-10">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                    [03]
                </div>
                <h1 className="text-[32px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                    About
                </h1>
            </div>

            <AboutForm about={about} />
        </div>
    );
}
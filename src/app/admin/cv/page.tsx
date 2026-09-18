import { getSettings } from '@/lib/content';
import CvForm from './CvForm';

export const dynamic = 'force-dynamic';

export default async function AdminCv() {
    const settings = await getSettings();

    return (
        <div>
            <div className="mb-10">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                    [05]
                </div>
                <h1 className="text-[32px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                    Resume / CV
                </h1>
                <p className="mt-3 text-[13px] text-(--muted) max-w-xl" style={{ fontFamily: 'var(--sans)' }}>
                    Upload a new PDF and it becomes the file linked from the nav &quot;Resume&quot; button.
                </p>
            </div>

            <CvForm initialUrl={settings.cvUrl} />
        </div>
    );
}
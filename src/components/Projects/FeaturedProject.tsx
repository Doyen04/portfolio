import BrowserMockup from '@/ui/BrowserMockup';

type Props = {
    number: string;
    name: string;
    description: string;
    tags: string[];
    repoUrl: string;
    stars: number;
};

export default function FeaturedProject({ number, name, description, tags, repoUrl, stars }: Props) {
    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5 mb-16 border border-(--border) p-4"
            style={{
                background:
                    'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            }}
        >
            <div
                className="lg:col-span-3 flex flex-col justify-between gap-8 rounded-[inherit] border border-(--border) p-8 lg:p-10"
                style={{ background: 'rgba(255,255,255,0.015)' }}
            >
                <div>
                    <div className="flex items-start justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs uppercase tracking-[0.14em] text-(--accent) mb-2 inline-block" style={{ fontFamily: 'var(--mono)' }}>
                                Featured Product
                            </span>
                            <div className="text-xs text-(--muted) mt-2" style={{ fontFamily: 'var(--mono)' }}>
                                {stars} stars on GitHub
                            </div>
                        </div>

                        <span className="text-[64px] leading-[0.9] text-(--faint)" style={{ fontFamily: 'var(--mono)', fontWeight: 300 }}>
                            {number}
                        </span>
                    </div>

                    <h3
                        style={{
                            fontFamily: 'var(--serif)',
                            fontSize: 'clamp(34px, 4vw, 56px)',
                            fontWeight: 500,
                            lineHeight: 1.05,
                            color: 'var(--white)',
                            marginBottom: '16px',
                        }}
                    >
                        {name}
                    </h3>

                    <p className="mb-6 max-w-[56ch] text-[15px] leading-[1.75] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-block px-3 py-1.5 border border-(--border) text-[9px] uppercase tracking-[0.12em] text-(--muted)"
                                style={{ fontFamily: 'var(--mono)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-auto">
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-fill text-center">
                        View My Work <span>→</span>
                    </a>

                    <div className="flex items-center gap-1.5" style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)' }}>
                        <svg style={{ color: 'var(--accent)' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{stars}</span>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 w-full flex items-center justify-center rounded-[inherit] border border-(--border) p-6 lg:p-8" style={{ background: 'rgba(0,0,0,0.12)' }}>
                <BrowserMockup />
            </div>
        </div>
    );
}

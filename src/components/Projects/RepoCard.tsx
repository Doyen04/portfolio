type Repo = {
    id: number | string;
    url: string;
    name: string;
    description?: string | null;
    language?: string | null;
    stargazers_count?: number;
};

export default function RepoCard({ repo, className }: { repo: Repo; className?: string }) {
    return (
        <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden transition-colors bg-transparent hover:bg-(--surface) border border-(--border) p-6 flex flex-col justify-between min-h-52.5 ${className || ''}`}
        >
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex-1">
                <h4 className="group-hover:text-(--accent)! transition-colors mb-2 text-[24px]" style={{ fontFamily: 'var(--serif)', fontWeight: 500, color: 'var(--white)' }}>
                    {repo.name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </h4>

                {repo.description && (
                    <p className="mb-4 text-[14px] leading-[1.6] text-(--muted)" style={{ fontFamily: 'var(--sans)', fontWeight: 300 }}>
                        {repo.description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between mt-4">
                {repo.language && (
                    <span className="text-(--muted) text-[10px]" style={{ fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                        {repo.language}
                    </span>
                )}

                <div className="flex items-center gap-1" style={{ color: 'var(--muted)', fontSize: '10px' }}>
                    <svg style={{ color: 'var(--accent)' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px' }}>{repo.stargazers_count}</span>
                </div>
            </div>
        </a>
    );
}

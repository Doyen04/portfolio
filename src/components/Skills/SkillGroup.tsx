type SkillGroupProps = {
    category: string;
    items: string[];
    index: number;
};

export default function SkillGroup({ category, items, index }: SkillGroupProps) {
    const isTall = index === 0 || index === 2 || index === 4;

    return (
        <>
            <div className="flex justify-between gap-4 items-start mb-4">
                <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-(--accent) mb-2" style={{ fontFamily: 'var(--mono)' }}>
                        0{index + 1}
                    </div>
                    <h3 className="text-[24px]" style={{ fontFamily: 'var(--serif)', fontWeight: 500, color: 'var(--white)', lineHeight: 1.1 }}>
                        {category}
                    </h3>
                </div>

                <span className="text-xs text-(--muted) pt-1" style={{ fontFamily: 'var(--mono)', letterSpacing: '0.12em' }}>
                    {items.length} items
                </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {items.map((skill) => (
                    <div key={skill} className="group/item flex items-center gap-2.5 min-w-0">
                        <span data-keep-radius="true" className="inline-block w-1.5 h-1.5 rounded-full bg-(--border) group-hover:bg-(--accent) transition-colors duration-200" />
                        <span className="transition-colors duration-200 group-hover:text-(--text)" style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.35, overflowWrap: 'anywhere' }}>
                            {skill}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

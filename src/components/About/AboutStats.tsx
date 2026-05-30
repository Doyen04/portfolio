type Stat = { value: string; suffix: string; label: string };

export default function AboutStats({ stats }: { stats: Stat[] }) {
    return (
        <>
            <div className="grid grid-cols-2 border border-(--border)">
                {stats.map((stat, index) => {
                    const isEvenCol = index % 2 === 1;
                    const isLastRow = index >= stats.length - 2;

                    return (
                        <div key={stat.label} className="p-7" style={{ borderRight: isEvenCol ? 'none' : '1px solid var(--border)', borderBottom: isLastRow ? 'none' : '1px solid var(--border)' }}>
                            <div style={{ fontFamily: 'var(--serif)', fontSize: '56px', fontWeight: 300, color: 'var(--white)', lineHeight: 1, marginBottom: '8px' }}>
                                {stat.value}
                                {stat.suffix && <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>}
                            </div>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)' }}>{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '3px', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr' }}>
                {[
                    { label: 'Education', value: 'Mountain Top University, 2026' },
                    { label: 'Experience', value: 'Ex-intern @ NSIA Insurance' },
                    { label: 'Location', value: 'Lagos, Nigeria' },
                    { label: 'Availability', value: 'Open to remote & relocation' },
                ].map((item, i, arr) => (
                    <div key={item.label} style={{ padding: '16px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 400, color: 'var(--text)' }}>{item.value}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

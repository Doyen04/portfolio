type FieldProps = {
    name: string;
    label: string;
    defaultValue?: string | number;
    type?: 'text' | 'number' | 'url';
    textarea?: boolean;
    rows?: number;
    placeholder?: string;
};

export default function Field({ name, label, defaultValue, type = 'text', textarea, rows = 4, placeholder }: FieldProps) {
    const base = {
        width: '100%',
        padding: '11px 14px',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--text)',
        fontFamily: 'var(--sans)',
        fontSize: '13px',
        outline: 'none',
        transition: 'border-color 200ms var(--ease)',
    };

    return (
        <label className="block mb-5">
            <span className="block text-[9px] uppercase tracking-[0.14em] text-(--muted) mb-2" style={{ fontFamily: 'var(--mono)' }}>
                {label}
            </span>
            {textarea ? (
                <textarea
                    name={name}
                    rows={rows}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className="border border-(--border) px-3.5 py-2.5 bg-transparent text-(--text) outline-none focus:border-(--accent) transition-colors w-full text-[13px]"
                    style={{ fontFamily: 'var(--sans)', resize: 'vertical' }}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className="border border-(--border) px-3.5 py-2.5 bg-transparent text-(--text) outline-none focus:border-(--accent) transition-colors w-full text-[13px]"
                    style={base}
                />
            )}
        </label>
    );
}
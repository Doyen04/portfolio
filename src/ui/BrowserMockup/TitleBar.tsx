export default function TitleBar() {
    return (
        <div className="h-8.5 bg-(--bg) border-b border-(--border) flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <span data-keep-radius="true" className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span data-keep-radius="true" className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span data-keep-radius="true" className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--muted)', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', padding: '2px 24px', width: '240px', textAlign: 'center', letterSpacing: '0.05em' }}>
                unplug.doyen04.dev/dashboard
            </div>

            <div className="w-14" />
        </div>
    );
}

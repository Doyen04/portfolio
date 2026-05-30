type FormState = { name: string; email: string; message: string };

type Props = {
    formState: FormState;
    errors: Record<string, string>;
    isLoading: boolean;
    isSuccess: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
};

export default function ContactForm({ formState, errors, isLoading, isSuccess, handleChange, handleSubmit }: Props) {
    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-(--border) min-h-75">
                <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="text-[28px] mb-2" style={{ fontFamily: 'var(--serif)', fontWeight: 500, color: 'var(--white)' }}>Message sent!</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--muted)' }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.14em] text-(--muted) mb-2" style={{ fontFamily: 'var(--mono)' }}>Name</label>
                <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} className="w-full py-3.5 px-4 border border-(--border) bg-(--surface) text-(--text) text-[14px] font-light outline-none transition-colors duration-200" style={{ fontFamily: 'var(--sans)', borderColor: errors.name ? '#ef4444' : 'var(--border)' }} placeholder="Your name" />
                {errors.name && <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: 'var(--mono)' }}>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.14em] text-(--muted) mb-2" style={{ fontFamily: 'var(--mono)' }}>Email</label>
                <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} className="w-full py-3.5 px-4 border border-(--border) bg-(--surface) text-(--text) text-[14px] font-light outline-none transition-colors duration-200" style={{ fontFamily: 'var(--sans)', borderColor: errors.email ? '#ef4444' : 'var(--border)' }} placeholder="you@example.com" />
                {errors.email && <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: 'var(--mono)' }}>{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.14em] text-(--muted) mb-2" style={{ fontFamily: 'var(--mono)' }}>Message</label>
                <textarea id="message" name="message" value={formState.message} onChange={handleChange} rows={5} className="w-full py-3.5 px-4 border border-(--border) bg-(--surface) text-(--text) text-[14px] font-light outline-none transition-colors duration-200 resize-none" style={{ fontFamily: 'var(--sans)', borderColor: errors.message ? '#ef4444' : 'var(--border)' }} placeholder="Tell me about your project or just say hi..." />
                {errors.message && <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: 'var(--mono)' }}>{errors.message}</p>}
            </div>

            {errors.submit && <p className="text-red-500 text-[12px]" style={{ fontFamily: 'var(--mono)' }}>{errors.submit}</p>}

            <button type="submit" disabled={isLoading} className="btn-fill w-full justify-center" style={{ opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? (
                    <>
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                        <span>Sending...</span>
                    </>
                ) : (
                    <span>Send Message →</span>
                )}
            </button>
        </form>
    );
}

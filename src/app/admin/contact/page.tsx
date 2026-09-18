import { getContact } from '@/lib/content';
import ContactForm from './ContactForm';

export const dynamic = 'force-dynamic';

export default async function AdminContact() {
    const contact = await getContact();

    return (
        <div>
            <div className="mb-10">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-3" style={{ fontFamily: 'var(--mono)' }}>
                    [04]
                </div>
                <h1 className="text-[32px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.05 }}>
                    Contact
                </h1>
                <p className="mt-3 text-[13px] text-(--muted) max-w-xl" style={{ fontFamily: 'var(--sans)' }}>
                    Manage the contact links shown on the site. Emails and external links render as-is.
                </p>
            </div>

            <ContactForm items={contact.items} />
        </div>
    );
}
import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
    title: 'Admin Access',
    robots: { index: false, follow: false },
};

export default function DoyenPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg)' }}>
            <LoginForm />
        </div>
    );
}
'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

export default function LoginForm() {
    const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);

    return (
        <form
            action={formAction}
            className="w-full max-w-xs border border-(--border) p-8"
            style={{ background: 'var(--surface)' }}
        >
            <div className="mb-8">
                <div className="text-[10px] uppercase tracking-[0.16em] text-(--accent) mb-2" style={{ fontFamily: 'var(--mono)' }}>
                    Restricted
                </div>
                <h1 className="text-[24px]" style={{ fontFamily: 'var(--serif)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.1 }}>
                    Admin <span className="italic">access</span>
                </h1>
            </div>

            <label htmlFor="password" className="block text-[9px] uppercase tracking-[0.14em] text-(--muted) mb-2" style={{ fontFamily: 'var(--mono)' }}>
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full px-4 py-3 border border-(--border) bg-transparent text-(--text) outline-none focus:border-(--accent) transition-colors"
                style={{ fontFamily: 'var(--sans)' }}
            />

            {state?.error && (
                <p className="mt-3 text-[11px] text-[#EF6B6B]">{state.error}</p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="btn-fill w-full justify-center mt-6 disabled:opacity-50"
            >
                {pending ? 'Checking…' : 'Enter'}
            </button>
        </form>
    );
}
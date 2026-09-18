'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionToken } from '@/lib/session';

const SESSION_COOKIE = 'admin_session';

export type LoginState = { error?: string } | undefined;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
    const password = String(formData.get('password') ?? '');
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected || password !== expected) {
        return { error: 'Incorrect password' };
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, await createSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/admin');
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    redirect('/');
}
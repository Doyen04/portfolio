import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken } from './session';

const SESSION_COOKIE = 'admin_session';

export async function isAdmin(): Promise<boolean> {
    const cookieStore = await cookies();
    return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin(): Promise<void> {
    if (!(await isAdmin())) {
        redirect('/');
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/session';

/**
 * The admin login page lives at src/app/doyen/, so its route is fixed.
 * Keeping the constant here (rather than an env var) prevents the proxy
 * logic from diverging from the actual page path.
 */
const LOGIN_PATH = '/doyen';

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isLoginPath = pathname === LOGIN_PATH;
    const isAdminPath = pathname.startsWith('/admin');

    if (isAdminPath || isLoginPath) {
        const authed = await verifySessionToken(req.cookies.get('admin_session')?.value);

        // Already logged in and visiting the login page → go to dashboard
        if (isLoginPath && authed) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        }

        // Not logged in and visiting any admin page → bounce to the portfolio
        if (isAdminPath && !authed) {
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|mp4|webm|pdf)$).*)'],
};
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
    process.env.ADMIN_SESSION_SECRET || 'insecure-dev-secret-change-me'
);

export async function createSessionToken(): Promise<string> {
    return new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);
}

export async function verifySessionToken(token?: string): Promise<boolean> {
    if (!token) return false;
    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
        return payload.role === 'admin';
    } catch {
        return false;
    }
}
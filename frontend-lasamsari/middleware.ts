import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value; // În producție ar trebui folosite cookies pentru middleware
    // Notă: LocalStorage nu este accesibil în middleware-ul de server.
    // Pentru demo, acest middleware este un placeholder structural.
    // În mod ideal, token-ul este salvat în cookie la login.

    const { pathname } = request.nextUrl;

    // Protecție rute admin
    if (pathname.startsWith('/admin')) {
        // În implementarea reală cu cookies:
        // if (!token) return NextResponse.redirect(new URL('/login', request.url));
    }

    // Protecție rute user
    if (pathname.startsWith('/user')) {
        // if (!token) return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};

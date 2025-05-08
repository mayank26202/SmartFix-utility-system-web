import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // ✅ Admin protection via cookie
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const isAdmin = req.cookies.get('next_admin')?.value === 'true';
    if (!isAdmin) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // ✅ Provider protection via NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname.startsWith('/provider')) {
    if (!token || token?.profile?.role !== 'provider') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // ✅ User protection via NextAuth
  if (pathname.startsWith('/user')) {
    if (!token || token?.profile?.role !== 'user') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/provider/:path*',
    '/user/:path*',
    '/admin((?!/login).*)', // protects all /admin except /admin/login
  ],
};

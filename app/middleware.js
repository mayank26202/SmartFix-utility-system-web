import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // ✅ Provider protection via NextAuth (not touched)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname.startsWith('/provider')) {
    if (!token || token?.profile?.role !== 'provider') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // ✅ User protection via NextAuth (not touched)
  if (pathname.startsWith('/user')) {
    if (!token || token?.profile?.role !== 'user') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/admin')) {
    const cookie = req.headers.get('cookie') || ''
    const sessionExists = cookie.includes('adminSession=true')
  
    // Prevent flashing /admin content
    if (!sessionExists && pathname === '/admin') {
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  
    if (!sessionExists && pathname.startsWith('/admin')) {
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/provider/:path*',
    '/user/:path*',
    '/admin/:path*',
  ],
};

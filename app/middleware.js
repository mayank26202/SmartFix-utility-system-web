// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Block /provider* routes from users who aren't providers
  if (pathname.startsWith("/provider")) {
    if (!token || token?.profile?.role !== "provider") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // You can also protect /user* pages from providers, if needed
  if (pathname.startsWith("/user")) {
    if (!token || token?.profile?.role !== "user") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/provider/:path*", "/user/:path*"],
};

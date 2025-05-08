import { cookies } from 'next/headers';

export async function POST(req) {
  const { email, password } = await req.json();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies(); // ✅ await is required!
    cookieStore.set('next_admin', 'true', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 6, // 6 hours
    });

    return Response.json({ success: true });
  }

  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

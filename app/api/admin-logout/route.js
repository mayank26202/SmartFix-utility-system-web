import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('next_admin', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });

  return Response.json({ success: true });
}

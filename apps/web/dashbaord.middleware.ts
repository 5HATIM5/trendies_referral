// apps/web/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  // If user is not logged in and tries to access protected route
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url)); // redirect to home/login
  }

  return NextResponse.next(); // allow the request
}

// Tell Next.js which paths to run this on
export const config = {
  matcher: ['/dashboard'], // protect everything under /dashboard
};

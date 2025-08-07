import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const middleware = authMiddleware;

export const config = {
  matcher: [
    // Protect all routes except auth routes, api routes, static files, and public assets
    "/((?!login|register|forgot-password|api|_next/static|_next/image|favicon.ico).*)",
  ],
};

import { authMiddleware } from "@repo/auth/middleware";

export const middleware = authMiddleware;

export const config = {
  matcher: [
    // Protect all routes except auth routes, api routes, static files, and public assets
    "/((?!login|register|forgot-password|api|_next/static|_next/image|favicon.ico).*)",
  ],
};

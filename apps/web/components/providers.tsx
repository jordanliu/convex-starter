"use client";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@repo/backend/better-auth/auth-client";
import { ConvexReactClient } from "convex/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ConvexBetterAuthProvider client={convex} authClient={authClient}>
        {children}
      </ConvexBetterAuthProvider>
    </NextThemesProvider>
  );
}

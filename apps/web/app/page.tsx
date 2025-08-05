"use client";

import { authClient } from "@repo/backend/better-auth/auth-client";
import { api } from "@repo/backend/convex/_generated/api";
import { Button } from "@repo/ui/src/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@repo/ui/src/components/card";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useQuery(api.auth.getCurrentUser);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
      <Authenticated>
        <div className="flex h-screen w-screen items-center justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <div>
                Hello {user?.email} {user?.name}!
              </div>
              <CardDescription>
                <Image
                  className="w-full"
                  src="/cat.gif"
                  alt="next-starter"
                  width={100}
                  height={100}
                />
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                onClick={handleLogout}
                className="w-full"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div>test</div>
      </Unauthenticated>
    </>
  );
}

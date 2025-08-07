"use client";

import { authClient } from "@repo/backend/better-auth/client";
import { api } from "@repo/backend/convex/_generated/api";
import { Button } from "@repo/ui/src/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@repo/ui/src/components/card";
import { useConvexAuth, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { isLoading } = useConvexAuth();
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardContent className="flex items-center justify-center p-6">
            <div>Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardDescription className="text-center">
            <Image
              className="w-full"
              src="/cat.gif"
              alt="next-starter"
              width={100}
              height={100}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">Name</div>
            <div className="text-base">{user.name || "Not provided"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">Email</div>
            <div className="text-base">{user.email}</div>
          </div>
          {user.image && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Avatar</div>
              <div className="flex justify-center">
                <Image
                  className="rounded-full"
                  src={user.image}
                  alt="User avatar"
                  width={64}
                  height={64}
                />
              </div>
            </div>
          )}
        </CardContent>
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
  );
}

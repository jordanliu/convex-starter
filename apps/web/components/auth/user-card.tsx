import LogoutButton from "@/components/auth/logout-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@repo/ui/src/components/card";
import Image from "next/image";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
};

function UserCard({ user }: Props) {
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
            <div className="text-base">{user?.name || "Not provided"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">Email</div>
            <div className="text-base">{user?.email}</div>
          </div>
          {user?.image && (
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
          <LogoutButton />
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserCard;

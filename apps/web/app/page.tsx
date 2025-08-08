import UserCard from "@/components/auth/user-card";
import { getToken } from "@convex-dev/better-auth/nextjs";
import { auth } from "@repo/backend/better-auth/server";
import { api } from "@repo/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Page() {
  const token = await getToken(auth);

  const user = await fetchQuery(api.auth.getCurrentUser, {}, { token });
  return <UserCard user={user} />;
}

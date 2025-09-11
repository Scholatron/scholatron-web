// app/components/header.tsx
import { SiteHeaderClient } from "./header.client";
import { VerifiedUser } from "@/lib/auth/types";

export default function SiteHeader({ user }: { user: VerifiedUser | null }) {
  const headerUser = user
    ? {
        name: user.name ?? user.username ?? undefined,
        image: user.avatar_url ?? undefined,
      }
    : null;
  return <SiteHeaderClient user={headerUser} />;
}
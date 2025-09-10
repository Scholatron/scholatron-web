// app/dashboard/dashboard-client.tsx
"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

export default function DashboardClient() {
  const [name, setName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = getSupabaseBrowser();
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      if (u) {
        const meta = (u.user_metadata as Record<string, unknown>) || {};
        const toStr = (v: unknown) => (typeof v === "string" ? v : undefined);
        setName(
          toStr(meta.user_name) ||
            toStr(meta.preferred_username) ||
            toStr(meta.full_name) ||
            u.email ||
            "User"
        );
        setAvatarUrl(toStr(meta.avatar_url) || null);
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-4">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl || "/placeholder.svg?height=40&width=40&query=avatar"}
          alt="Avatar"
          className="h-10 w-10 rounded-full border border-border"
        />
      ) : null}
      <p className="text-foreground">Hello, {name}</p>
    </div>
  );
}

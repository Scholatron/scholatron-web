// app/home/page.tsx
import SiteHeader from "@/app/components/header";
import { SiteFooter } from "@/app/components/footer";
import { Sidebar } from "@/app/components/sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppUser, Student, VerifiedUser } from "@/lib/auths/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let headerUser: AppUser | null = null;
  if (user) {
    // fetch student profile
    const { data: studentRow } = await supabase
      .from("students")
      .select("uid, name, regno, dob, dept, personal_email, phone")
      .eq("uid", user.id)
      .maybeSingle();

    const verified: VerifiedUser = {
      uid: user.id,
      supabase_user_id: user.id,
      email: user.email ?? null,
      username: user.user_metadata?.preferred_username ?? user.user_metadata?.username ?? null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
      roles: Array.isArray(user.user_metadata?.roles) ? user.user_metadata?.roles : [],
      permissions: Array.isArray(user.user_metadata?.permissions) ? user.user_metadata?.permissions : [],
    };

    headerUser = { ...verified, student: (studentRow as Student | null) ?? null };
  }

  const displayName =
    headerUser?.student?.name ?? headerUser?.username ?? headerUser?.email ?? "User";
  const initial =
    headerUser?.student?.name?.charAt(0) ??
    headerUser?.email?.charAt(0) ??
    "U";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader user={headerUser} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:px-8 lg:px-10">
          <section className="mx-auto max-w-5xl space-y-4">
            <Link href="/create/post">
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={headerUser?.avatar_url || undefined}
                        alt={displayName}
                      />
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground flex-1">
                      What&apos;s on your mind today?
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
            {/* Add feed or dashboard widgets here */}
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

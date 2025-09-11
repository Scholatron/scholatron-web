// app/home/page.tsx
import SiteHeader from "@/app/components/header";
import { SiteFooter } from "@/app/components/footer";
import { Sidebar } from "@/app/components/sidebar";
import PostCreate from "@/app/components/post-create";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppUser, VerifiedUser, Student } from "@/lib/auths/types";

export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Minimal user for PostCreate
  const postCreateUser = user ? { uid: user.id } : null;

  // Build AppUser for header, including the students row
  let headerUser: AppUser | null = null;

  if (user) {
    // Fetch student profile (0 or 1 row)
    const { data: studentRow } = await supabase
      .from("students")
      .select("uid, name, regno, dob, dept, personal_email, phone")
      .eq("uid", user.id)
      .maybeSingle();

    const verified: VerifiedUser = {
      uid: user.id,
      supabase_user_id: user.id,
      email: user.email ?? null,
      username:
        user.user_metadata?.preferred_username ??
        user.user_metadata?.username ??
        null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
      roles: Array.isArray(user.user_metadata?.roles)
        ? user.user_metadata?.roles
        : [],
      permissions: Array.isArray(user.user_metadata?.permissions)
        ? user.user_metadata?.permissions
        : [],
    };

    headerUser = {
      ...verified,
      student: (studentRow as Student | null) ?? null,
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader user={headerUser} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:px-8 lg:px-10">
          <section className="mx-auto max-w-5xl space-y-4">
            <PostCreate user={postCreateUser} />
            {/* Add feed or dashboard widgets here */}
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

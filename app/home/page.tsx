// app/home/page.tsx
import SiteHeader from "@/app/components/header";
import { SiteFooter } from "@/app/components/footer";
import { Sidebar } from "@/app/components/sidebar";
import PostCreate from "@/app/components/post-create";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VerifiedUser } from "@/lib/auth/types";

export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const postCreateUser = user ? { uid: user.id } : null;
  const headerUser: VerifiedUser | null = user ? {
    uid: user.id,
    supabase_user_id: user.id,
    email: user.email || null,
    name: user.user_metadata?.name || null,
    username: user.user_metadata?.username || null,
    avatar_url: user.user_metadata?.avatar_url || null,
    roles: user.user_metadata?.roles || null,
    permissions: user.user_metadata?.permissions || null,
  } : null;

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
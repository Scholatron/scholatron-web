// app/api/auth/user/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { VerifiedUser } from "@/lib/auths/types";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ data: null }, { status: 200 });
  }

  const verifiedUser: VerifiedUser = {
    uid: user.id,
    supabase_user_id: user.id,
    email: user.email ?? null,
    username: user.user_metadata?.preferred_username ?? user.user_metadata?.username ?? null,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    roles: Array.isArray(user.user_metadata?.roles) ? user.user_metadata?.roles : [],
    permissions: Array.isArray(user.user_metadata?.permissions) ? user.user_metadata?.permissions : [],
  };

  return NextResponse.json({ data: verifiedUser }, { status: 200 });
}

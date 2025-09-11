// app/api/auth/user/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VerifiedUser } from "@/lib/auth/types";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const verifiedUser: VerifiedUser = {
    uid: user.id,
    supabase_user_id: user.id,
    email: user.email || null,
    name: user.user_metadata?.name || null,
    username: user.user_metadata?.username || null,
    avatar_url: user.user_metadata?.avatar_url || null,
    roles: user.user_metadata?.roles || null,
    permissions: user.user_metadata?.permissions || null,
  };

  return NextResponse.json({ data: verifiedUser });
}
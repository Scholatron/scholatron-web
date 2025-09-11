// app/api/auth/user/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VerifiedUser } from "@/lib/auth/types";

export async function GET(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userData: VerifiedUser = {
      uid: user.id,
      supabase_user_id: user.id,
      email: user.email,
      name: user.user_metadata.name ?? user.user_metadata.preferred_username,
      username: user.user_metadata.preferred_username,
      avatar_url: user.user_metadata.avatar_url,
      roles: user.user_metadata.roles || [],
      permissions: user.user_metadata.permissions || [],
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/auth/user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
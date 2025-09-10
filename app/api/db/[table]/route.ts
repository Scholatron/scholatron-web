import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";

const ALLOWED_TABLES = new Set([
  "students",
  "chatroom_messages",
  "chatrooms",
  "posts",
  "class_divisions",
  "clubs",
  "direct_chats",
  "direct_messages",
  "events",
  "faculty",
  "groups",
  "post_engagements",
  "post_files",
  "social_posts",
]);

function guard(table: string) {
  if (!ALLOWED_TABLES.has(table)) {
    return NextResponse.json({ error: "Table not allowed" }, { status: 400 });
  }
  return null;
}

// GET /api/db/:table  -> list all rows
export async function GET(
  _req: Request,
  { params }: { params: { table: string } }
) {
  const blocked = guard(params.table);
  if (blocked) return blocked;

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from(params.table).select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

// POST /api/db/:table -> insert one or many rows
export async function POST(
  req: Request,
  { params }: { params: { table: string } }
) {
  const blocked = guard(params.table);
  if (blocked) return blocked;

  const payload = await req.json();
  const rows = Array.isArray(payload) ? payload : [payload];

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from(params.table).insert(rows).select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? [], { status: 201 });
}

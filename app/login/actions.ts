// app/login/actions.ts
"use server";

import { signInWithGoogle as _signInWithGoogle } from "@/lib/auth/actions";

export async function signInWithGoogleAction() {
  await _signInWithGoogle();
}
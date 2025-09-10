// lib/auth/types.ts (shared types)
export type VerifiedUser = {
  id: string;
  supabase_user_id: string;
  github_id?: string;
  email?: string | null;
  name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  roles?: string[];
  permissions?: string[];
};
    
// File: app/api/auth/verify-token/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Schema for validating request body
const VerifyTokenSchema = z.object({
  token: z.string().min(1).max(4096),
  refresh_token: z.string().min(1).max(4096).optional(),
});

// Types
interface SupabaseIdentity {
  provider: string;
  provider_id?: string;
  identity_data?: Record<string, any>;
}

interface SupabaseUser {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, any>;
  identities?: SupabaseIdentity[];
}

interface Profile {
  supabase_user_id: string;
  google_id?: string;
  email?: string | null;
  name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  roles?: string[];
  permissions?: string[];
}

interface JwtPayload {
  sub: string;
  email?: string;
  username?: string;
  jti: string;
  user: Profile;
}

interface VerifyTokenResponse {
  user: Profile;
  access_token: string;
  expires_at: number;
  token_type: string;
}

// Rate limiting configuration
const RATE_LIMIT = { limit: 20, windowMs: 60 * 1000 };
const rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

function rateLimit(ip: string): { success: boolean; resetTime: number } {
  const now = Date.now();
  const key = `rate-limit:${ip}`;
  const record = rateLimitStore.get(key);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return { success: true, resetTime: RATE_LIMIT.windowMs };
  }
  if (record.count >= RATE_LIMIT.limit) {
    return { success: false, resetTime: record.resetTime };
  }
  rateLimitStore.set(key, { count: record.count + 1, resetTime: record.resetTime });
  return { success: true, resetTime: record.resetTime };
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function mapSupabaseUserToProfile(user: SupabaseUser): Profile {
  const identities = Array.isArray(user.identities) ? user.identities : [];
  const google = identities.find(i => i.provider === 'google');

  let providerId: string | undefined;
  if (google) {
    if (typeof google.provider_id === 'string') {
      providerId = google.provider_id;
    } else if (google.identity_data && typeof google.identity_data === 'object') {
      const idVal = (google.identity_data as Record<string, any>).id;
      if (typeof idVal === 'string') providerId = idVal;
    }
  }

  const md = (user.user_metadata ?? {}) as Record<string, any>;
  const getStr = (v: unknown) => (typeof v === 'string' ? v : undefined);

  return {
    supabase_user_id: user.id,
    google_id: providerId,
    email: user.email ?? null,
    name: getStr(md.full_name) ?? getStr(md.name) ?? null,
    username: getStr(md.user_name) ?? getStr(md.preferred_username) ?? null,
    avatar_url: getStr(md.avatar_url) ?? null,
    roles: ['user'],
    permissions: ['read:profile', 'update:profile'],
  };
}

function generateJwt(profile: Profile): { access_token: string; expires_at: number } {
  const payload: JwtPayload = {
    sub: profile.supabase_user_id,
    email: profile.email || undefined,
    username: profile.username || profile.name || undefined,
    jti: crypto.randomUUID(),
    user: profile,
  };

  const secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
  const access_token = jwt.sign(payload, secret, {
    expiresIn: '1h',
    issuer: 'scholatron-api',
    audience: 'scholatron-app',
  });

  const now = Math.floor(Date.now() / 1000);
  const expires_at = now + 60 * 60;

  return { access_token, expires_at };
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const { success, resetTime } = rateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: { 'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString() },
      }
    );
  }

  // Validate request body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = VerifyTokenSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Missing or invalid token' }, { status: 400 });
  }

  const { token } = parsed.data;

  // Initialize Supabase client
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return cookieStore.getAll();
        },
        async setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore if no response context
          }
        },
      },
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );

  // Verify token with Supabase
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  // Map user and generate JWT
  const profile = mapSupabaseUserToProfile(data.user);
  const { access_token, expires_at } = generateJwt(profile);

  // Return response
  const response: VerifyTokenResponse = {
    user: profile,
    access_token,
    expires_at,
    token_type: 'Bearer',
  };

  return NextResponse.json(response, { status: 200 });
}

import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  console.log("🔄 OAuth callback received");
  try {
    const supabase = createSupabaseServerClient();
    const url = new URL(request.url);
    console.log("Callback URL:", url.toString());
    console.log("URL params:", Object.fromEntries(url.searchParams.entries()));

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    // Handle OAuth errors
    if (error) {
      console.error("❌ OAuth error:", error, errorDescription);
      const redirectUrl = new URL(
        `/auth/error?error=${encodeURIComponent(error)}&description=${encodeURIComponent(errorDescription || '')}`,
        request.url
      );
      return NextResponse.redirect(redirectUrl);
    }

    if (!code) {
      console.error("❌ No authorization code received");
      return NextResponse.redirect(new URL("/auth/error?error=missing_code", request.url));
    }

    console.log("✅ Authorization code received:", code.substring(0, 10) + "...");

    // Exchange code for session
    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError || !sessionData?.session) {
      console.error("❌ Code exchange failed:", exchangeError?.message);
      return NextResponse.redirect(new URL("/auth/error?error=exchange_failed", request.url));
    }

    console.log("✅ Session obtained from Supabase");

    const supabaseToken = sessionData.session.access_token;
    const refreshToken = sessionData.session.refresh_token;

    // Call local API route for JWT generation and user object
    const baseUrl = new URL(request.url).origin;
    console.log("🔄 Verifying with local API:", `${baseUrl}/api/auth/verify-token`);

    const verifyResponse = await fetch(`${baseUrl}/api/auth/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NextJS-OAuth-Client/1.0",
      },
      body: JSON.stringify({
        token: supabaseToken,
        refresh_token: refreshToken
      }),
    });

    if (!verifyResponse.ok) {
      const errorText = await verifyResponse.text();
      console.error("❌ API verification failed:", verifyResponse.status, errorText);
      return NextResponse.redirect(new URL("/auth/error?error=api_verification_failed", request.url));
    }

    const { access_token: customJWT, user, expires_at } = await verifyResponse.json();

    if (!customJWT || !user) {
      console.error("❌ Invalid API response");
      return NextResponse.redirect(new URL("/auth/error?error=invalid_response", request.url));
    }

    console.log("✅ API verification successful for user:", user.supabase_user_id);

    // Set secure cookies with proper settings
    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: "/",
    };

    // Set authentication cookie with your backend's JWT
    cookieStore.set("auth_token", customJWT, {
      ...cookieOptions,
      maxAge: 60 * 60, // 1 hour
    });

    // Store refresh token
    if (refreshToken) {
      cookieStore.set("refresh_token", refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    // Store user data
    cookieStore.set("user_data", JSON.stringify(user), {
      ...cookieOptions,
      maxAge: 60 * 60, // 1 hour
    });

    console.log("✅ Authentication cookies set, redirecting to dashboard");
    return NextResponse.redirect(new URL("/home", request.url));
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    return NextResponse.redirect(new URL("/auth/error?error=server_error", request.url));
  }
}

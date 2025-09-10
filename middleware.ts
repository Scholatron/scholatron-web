// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/auth/error"];
const EXCLUDED_PREFIX = ["/_next", "/api", "/favicon.ico", "/assets", "/images"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (EXCLUDED_PREFIX.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;

  // If accessing dashboard (or other protected paths) without token => go to login
  if (pathname.startsWith("/dashboard") && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If accessing login while authed => go to dashboard
  if (PUBLIC_PATHS.includes(pathname) && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets|images).*)"],
};

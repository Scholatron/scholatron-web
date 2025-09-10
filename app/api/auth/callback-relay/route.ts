// app/api/auth/callback-relay/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'

// Must be set in env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const dynamic = 'force-dynamic'

function originFrom(req: NextRequest) {
  const xfHost = req.headers.get('x-forwarded-host')
  const xfProto = req.headers.get('x-forwarded-proto') || 'https'
  const origin = req.headers.get('origin')
  if (origin) return origin
  if (xfHost) return `${xfProto}://${xfHost}`
  const url = new URL(req.url)
  return `${url.protocol}//${url.host}`
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const credential = url.searchParams.get('credential') // GIS “Sign in with Google” ID token
    const next = url.searchParams.get('next') || '/'

    let idToken: string | null = null
    let accessToken: string | undefined

    if (credential) {
      // GIS flow: ID token already provided
      idToken = credential
    } else if (code) {
      // OAuth code flow: exchange for tokens at Google
      const redirectUri = `${originFrom(req)}/api/auth/callback-relay`
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
      })
      const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body,
      })
      const tokenJson = await tokenRes.json()
      if (!tokenRes.ok) {
        return NextResponse.json(
          { error: 'google_token_error', details: tokenJson },
          { status: tokenRes.status },
        )
      }
      idToken = tokenJson.id_token
      accessToken = tokenJson.access_token
    } else {
      return NextResponse.json(
        { error: 'missing_oauth_params', message: 'Expected code or credential' },
        { status: 400 },
      )
    }

    // Optional: validate aud matches GOOGLE_CLIENT_ID before forwarding
    // Supabase will verify the ID token signature and issuer as part of signInWithIdToken

    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken!,
      access_token: accessToken, // optional but recommended when available
    })

    if (error) {
      return NextResponse.json(
        { error: 'supabase_signin_failed', message: error.message },
        { status: 401 },
      )
    }

    // Session cookies are set by the server client’s cookie adapter in your project setup
    return NextResponse.redirect(new URL(next, originFrom(req)).toString(), { status: 303 })
  } catch (e: any) {
    return NextResponse.json(
      { error: 'relay_failure', message: e?.message ?? 'Unknown error' },
      { status: 500 },
    )
  }
}

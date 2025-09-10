// app/login/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth/actions";
import { getTokenFromCookie } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Shield, Lock, Zap, Chrome, Mail } from "lucide-react";

async function GitHubSignInButton() {
  const handleSignIn = async () => {
    "use server";
    await signInWithGithub();
  };

  return (
    <form action={handleSignIn} className="flex justify-center">
      <Button
        type="submit"
        className="w-full max-w-xs justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 border border-border smooth-transition"
      >
        <Github className="w-4 h-4" />
        Sign in with GitHub
      </Button>
    </form>
  );
}

async function GoogleSignInButton() {
  const handleSignIn = async () => {
    "use server";
    await signInWithGoogle();
  };

  return (
    <form action={handleSignIn} className="flex justify-center">
      <Button
        type="submit"
        className="w-full max-w-xs justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 border border-border smooth-transition"
      >
        <Chrome className="w-4 h-4" />
        Sign in with Google
      </Button>
    </form>
  );
}

function EmailSignInButton() {
  return (
    <Link href="/login/email" className="block w-full">
      <Button
        type="button"
        className="w-full justify-center gap-2 bg-muted text-card-foreground hover:bg-muted/80 border border-border smooth-transition"
      >
        <Mail className="w-4 h-4" />
        Sign in with Email
      </Button>
    </Link>
  );
}

export default async function LoginPage() {
  const token = await getTokenFromCookie();
  if (token) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border shadow-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-2 bg-primary text-primary-foreground">
            <Shield className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold font-brand text-primary">
            Welcome to Scholatron
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in securely to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            {/* Order changed: Email → Google → GitHub */}
            <EmailSignInButton />
            <GoogleSignInButton />
            <GitHubSignInButton />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center space-y-1">
              <Lock className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">
                End-to-End Encrypted
              </p>
            </div>
            <div className="text-center space-y-1">
              <Shield className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">OAuth 2.0 + PKCE</p>
            </div>
            <div className="text-center space-y-1">
              <Zap className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">JWT + Sessions</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Protected by enterprise-grade security</p>
            <p>
              By signing in, you agree to our{" "}
              <a
                href="/terms"
                className="text-primary underline underline-offset-4 hover:opacity-80 smooth-transition"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-primary underline underline-offset-4 hover:opacity-80 smooth-transition"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

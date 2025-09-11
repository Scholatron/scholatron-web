// app/login/email/page.tsx
import { redirect } from "next/navigation";
import { getTokenFromCookie } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail } from "lucide-react";

async function EmailSignInForm() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    // TODO: Add your email sign-in logic (magic link, OTP, etc.)
    console.log("Sign in with email:", email);
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-muted-foreground mb-1"
        >
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full justify-center gap-2 bg-muted text-card-foreground hover:bg-muted/80 border border-border smooth-transition"
      >
        <Mail className="w-4 h-4" />
        Continue with Email
      </Button>
    </form>
  );
}

export default async function EmailLoginPage() {
  const token = await getTokenFromCookie();
  if (token) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border border-border shadow-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-2 bg-primary text-primary-foreground">
            <Shield className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold font-brand text-primary">
            Email Sign In
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EmailSignInForm />

          <p className="text-xs text-muted-foreground text-center mt-6">
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
        </CardContent>
      </Card>
    </main>
  );
}

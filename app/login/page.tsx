import { redirect } from "next/navigation";
import { getTokenFromCookie } from "@/lib/auth";
import { LoginClient } from "./LoginClient";

export default async function LoginPage() {
  const token = await getTokenFromCookie();
  if (token) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <LoginClient />
    </main>
  );
}

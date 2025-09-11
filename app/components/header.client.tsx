// app/components/header.client.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import logo from "@/components/images/logo.jpg";
import { signOut } from "@/lib/auth/actions";

export function SiteHeaderClient({ user }: { user: { name?: string; image?: string } | null }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Scholatron logo" className="h-7 w-auto" priority />
          <span className="font-semibold uppercase tracking-wide">SCHOLATRON</span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image!} alt={user.name!} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user.name!.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>
              <form action={signOut}>
                <Button type="submit" variant="outline" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" /> Log out
                </Button>
              </form>
            </>
          ) : (
            <Button
              variant="solid"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-secondary"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
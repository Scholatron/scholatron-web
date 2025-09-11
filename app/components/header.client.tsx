"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, LogOut } from "lucide-react";
import logo from "@/components/images/logo.png";
import { signOut } from "@/lib/auths/actions";

export function SiteHeaderClient({ user }: { user: { name?: string; image?: string } | null }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on system preference or saved preference
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Scholatron logo" className="h-7 w-auto" priority />
          <span className="font-semibold uppercase tracking-wide">SCHOLATRON</span>
        </Link>
        <div className="flex items-center gap-3">
          {/* Theme Toggle Switch */}
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
              className="data-[state=checked]:bg-primary"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
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
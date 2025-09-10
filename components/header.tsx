'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, Search, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import logo from '@/components/images/logo.jpg';
import { useSession, signOut } from 'next-auth/react';

export function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const nav = [
    { href: '/features', label: 'Features' },
    { href: '/events', label: 'Events' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/resources', label: 'Resources' },
  ];

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Scholatron logo" className="h-7 w-auto" priority />
          <span className="font-semibold">Scholatron</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="Search">
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {user ? (
            // Logged-in state
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {(user.name ?? '').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>

              <form action={() => signOut()} method="post">
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            // Logged-out state
            <>
              <Button
                variant="solid"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-secondary transition"
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
            </>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm">
                {item.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 pt-2">
                <Button
                  variant="solid"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-secondary transition"
                  onClick={() => router.push('/login')}
                >
                  Log in
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
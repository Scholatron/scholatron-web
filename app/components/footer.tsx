// components/footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/components/images/logo.jpg'; // or use src="/logo.png" from /public

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Image src={logo} alt="Scholatron logo" className="h-6 w-auto" />
            <span>Scholatron</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Unified campus platform built with Next.js and Supabase.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/features" className="hover:underline">Features</Link></li>
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/docs" className="hover:underline">Docs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:underline">Log in</Link></li>
            <li><Link href="/auth/signup" className="hover:underline">Sign up</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          © 2025 Scholatron. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
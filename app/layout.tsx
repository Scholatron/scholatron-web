// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Chewy } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Scholatron – Unified Campus Platform",
  description:
    "A unified campus platform bringing academics, social life, and official communications into one student-first web app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${chewy.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
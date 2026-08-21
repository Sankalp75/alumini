import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/layout/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

// Chosen because: Fraunces + Inter per AGENTS.md brief (Gov.uk heritage serif + highest legibility sans).
// taste-skill flags Fraunces as banned default, but this is the rare justified case: public-sector
// heritage requires editorial serif for institutional authority, and GOV.UK itself uses a serif
// display heritage. Keeping per brief, not as AI default. Inter is neutral sans, acceptable for
// trust-first service where legibility at 14px tabular data outranks novelty.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400","600","700","800"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400","500","600","700"],
});

export const metadata: Metadata = {
  title: "Alumni Connect — Government of Punjab | SIH25019",
  description: "Centralized alumni data management and engagement platform for Government of Punjab — Smart Education. Find batchmates, stay current, never lose touch.",
  openGraph: {
    title: "Alumni Connect — Government of Punjab",
    description: "Your institution, still your home. A permanent, trusted home for every graduate.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground font-body antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

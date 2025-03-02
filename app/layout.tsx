import type React from "react";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata = {
  title: {
    default: "TechHubsAr",
    template: "%s | TechHubsAr",
  },
  description: "Discover tech communities across Argentina",
  openGraph: {
    title: "TechHubsAr",
    description: "Discover tech communities across Argentina",
    url: "https://techhubs.ar",
    siteName: "TechHubsAr",
    locale: "en_US",
    type: "website",
    logo:"favicon.ico"
  },
  twitter: {
    card: "summary_large_image",
    title: "TechHubsAr",
    description: "Discover tech communities across Argentina",
    creator: "@techhubsar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className="min-h-screen scroll-smooth font-sans antialiased"
      lang="en"
    >
      <body
        className={cn(
          "min-h-screen antialiased",
          "dark:bg-black/[0.96] bg-zinc-100",
          GeistSans.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen text-foreground">
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

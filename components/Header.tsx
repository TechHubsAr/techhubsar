"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import GitHubLink from "./GitHubLink";

const NAV_ITEMS = [
  { href: "/communities", label: "Communities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function Logo() {
  return (
    <Link href="/" className="text-xl sm:text-2xl font-bold tech-gradient">
      TechHubsAr
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto px-4 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 w-[180px]">
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:hidden p-0">
                <div className="flex flex-col h-full">
                  <div className="border-b px-6 py-4">
                    <Logo />
                  </div>
                  <nav className="flex-1 px-6 py-8">
                    <div className="flex flex-col space-y-6">
                      {NAV_ITEMS.map(({ href, label }) => (
                        <NavLink key={href} href={href}>{label}</NavLink>
                      ))}
                    </div>
                  </nav>
                  <div className="border-t px-6 py-4">
                    <GitHubLink />
                  </div>
                </div>
                </SheetContent>
          </Sheet>
          <Logo />
        </div>

        <nav className="hidden sm:flex items-center justify-center flex-1 space-x-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </nav>

        <div className="w-[180px] flex justify-end">
          <GitHubLink />
        </div>
      </div>
    </div>
  </header>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Gem, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../shadcn-components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn-components/ui/sheet";
import ThemeSwitcher from "./ThemeSwitcher";
import { cn } from "@/shared/libs/twMerge";

function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Banda Aceh", href: "/banda-aceh" },
    { name: "Langsa", href: "/langsa" },
    { name: "Lhokseumawe", href: "/lhokseumawe" },
  ];

  return (
    <header className="sticky top-0 p-1 px-4 z-50 w-full bg-background backdrop-blur-md  supports-[backdrop-filter]:bg-background/0">
      <div className="bg-transparent container flex h-8 justify-between items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Gem className="h-[10px] w-[10px] text-amber-400" />
          <span className="hidden font-bold sm:inline-block text-[10px] text-amber-400">
            Aceh Gold Forecast
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80 text-[10px] hover:border-b border-slate-500",
                pathname === link.href
                  ? "text-slate-500 "
                  : "text-slate-500/40 "
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="bg-background text-foreground"
            >
              {/* PERBAIKAN DI SINI */}
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Gem className="h-6 w-6 text-primary" />
                    <span className="font-bold">Aceh Gold Forecast</span>
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  Pilih halaman navigasi di bawah ini atau ganti tema.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-lg font-medium py-2 transition-colors hover:bg-muted rounded-md px-3"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-4 left-4">
                <ThemeSwitcher />
              </div>
            </SheetContent>
          </Sheet>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

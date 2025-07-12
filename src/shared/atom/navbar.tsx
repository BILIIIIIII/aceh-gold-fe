"use client";

import { useState } from "react";
import Link from "next/link";
import { Gem, Menu } from "lucide-react"; // Import Gem dan Menu icon

import { Button } from "../shadcn-components/ui/button"; // Pastikan path ini benar
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger, // SheetFooter tidak digunakan di sini, bisa dihapus kalau tidak perlu
} from "../shadcn-components/ui/sheet"; // Pastikan path ini benar
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn-components/ui/dropdown-menu"; // Pastikan path ini benar

function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Tetap perlu state untuk Sheet

  const cities = [
    { name: "Banda Aceh", href: "/banda-aceh" },
    { name: "Langsa", href: "/langsa" },
    { name: "Lhokseumawe", href: "/lhokseumawe" },
  ];

  return (
    // Navbar background, text, and shadow will now respect the theme
    <nav className="bg-background text-foreground shadow-sm py-4 w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Nama Aplikasi di Kiri */}
        <Link
          href="/"
          className="text-xl font-bold text-primary flex items-center" // text-primary akan menyesuaikan
        >
          <Gem size={24} className="mr-2" />
          Aceh Gold & Mayam Forecast
        </Link>

        {/* Navigasi Kota dengan Dropdown dan Button di Kanan (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4">
                {" "}
                {/* Button outline akan menyesuaikan */}
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-popover text-popover-foreground border-border">
              {" "}
              {/* Dropdown content juga menyesuaikan */}
              {cities.map((city) => (
                <DropdownMenuItem key={city.name} asChild>
                  <Link href={city.href}>{city.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Button Try Now (jika ada di navbar) */}
          {/* Karena di landing page tidak ada tombol try now di navbar desktop,
              maka bagian ini bisa dihapus kalau tidak digunakan.
              Kalau memang ada, pastikan juga pakai Link asChild: */}
          {/* <Button asChild>
            <Link href="/try-now">Try Now</Link>
          </Button> */}
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              {/* Menggunakan button HTML biasa yang distyling mirip shadcn Button */}
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 text-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            {/* SheetContent juga menggunakan warna tema */}
            <SheetContent
              side="bottom"
              className="mx-3 rounded-t-2xl bg-background text-foreground border-t border-border"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-primary">
                  Navigasi Kota
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Pilih kota untuk melihat prediksi harga.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {cities.map((city) => (
                  <Link
                    key={city.name}
                    href={city.href}
                    className="block text-center text-lg font-medium py-3 rounded-md hover:bg-muted hover:text-foreground transition-colors" // Hover state menyesuaikan tema
                    onClick={() => setIsSheetOpen(false)} // Tutup sheet saat klik kota
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              {/* Jika kamu punya tombol di footer Sheet, seperti "Akses Aplikasi", bisa ditaruh di sini */}
              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

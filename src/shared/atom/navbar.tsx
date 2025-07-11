"use client";

import { useState } from "react";
import Link from "next/link";
import { Gem, Menu } from "lucide-react";

import { Button } from "../shadcn-components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn-components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn-components/ui/dropdown-menu";

function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const cities = [
    { name: "Banda Aceh", href: "/banda-aceh" },
    { name: "Langsa", href: "/langsa" },
    { name: "Lhokseumawe", href: "/lhokseumawe" },
  ];

  return (
    <nav className="bg-white shadow-sm py-4 w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Nama Aplikasi di Kiri */}
        <Link
          href="/"
          className="text-xl font-bold text-primary flex items-center"
        >
          <Gem size={24} className="mr-2" />
          Aceh Gold & Mayam Forecast
        </Link>

        {/* Navigasi Kota dengan Dropdown dan Button di Kanan (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4">
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {cities.map((city) => (
                <DropdownMenuItem key={city.name} asChild>
                  <Link href={city.href}>{city.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              {/* Ini adalah bagian yang menyebabkan error. */}
              {/* Coba pastikan Button kamu bisa menerima icon secara langsung sebagai prop */}
              {/* ATAU pastikan Button kamu memang dirancang untuk punya children */}
              {/* Jika Button kamu dirancang untuk menerima children, ini harusnya OK. */}
              {/* Kemungkinan lain: Button kamu menggunakan React.Children.only() di dalamnya */}
              {/* dan kemudian SheetTrigger juga memaksa single child. */}

              {/* Solusi 1: Jika Button tidak menerima children, langsung render Menu di dalam Button */}
              {/* Ini biasanya yang dimaksud oleh shadcn/ui. */}
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>

              {/* Solusi 2: Jika Button tidak cocok, kita bisa coba pakai elemen HTML biasa */}
              {/* atau pastikan komponen Button kamu memang bisa menerima children */}
              {/* Jika kamu copy-paste komponen Button dari Shadcn/UI, umumnya ini sudah benar */}
              {/* untuk menerima children. Jadi masalahnya mungkin di interaksi Button dan SheetTrigger */}

              {/* Coba dulu solusi yang ini. Jika Button kamu tidak mendukung children,
                  maka kamu harus modifikasi Button component kamu atau
                  SheetTrigger tidak bisa asChild dengan Button seperti ini. */}
              {/* Sepertinya `Button` dari shadcn/ui itu sendiri juga menerapkan `React.Children.only`
                  jika kamu tidak menggunakan prop `icon` atau semacamnya. */}
            </SheetTrigger>
            <SheetContent side="bottom" className="mx-3 rounded-t-2xl">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-primary">
                  Navigasi Kota
                </SheetTitle>
                <SheetDescription>
                  Pilih kota untuk melihat prediksi harga.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {cities.map((city) => (
                  <Link
                    key={city.name}
                    href={city.href}
                    className="block text-center text-lg font-medium py-3 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

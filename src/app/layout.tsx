import { Plus_Jakarta_Sans } from "next/font/google";
import { METADATA } from "@/shared/utils/constant";
import Providers from "@/providers";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/shared/atom/navbar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jaks",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased  bg-slate-50 text-slate-900 dark:bg-zinc-900 dark:text-white transition-colors duration-200`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

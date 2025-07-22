import { Button } from "@/shared/shadcn-components/ui/button";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Mulai Buat Keputusan Investasi Terbaik Anda!
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Akses prediksi harga emas dan mayam akurat di Aceh, kapan saja, di
          mana saja, tanpa perlu mendaftar.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/dashboard">Akses Aplikasi Sekarang</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;

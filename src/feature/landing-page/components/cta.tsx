import { Button } from "@/shared/shadcn-components/ui/button";
import Link from "next/link";
import React from "react";
import { cityLinks } from "../lib/constants";

const CTA = () => {
  return (
    // <section className="py-16 bg-primary text-primary-foreground">
    //   <div className="container mx-auto px-4 text-center">
    //     <h2 className="text-3xl font-bold mb-4">
    //       Mulai Buat Keputusan Investasi Terbaik Anda!
    //     </h2>
    //     <p className="text-xl mb-8 max-w-2xl mx-auto">
    //       Akses prediksi harga emas dan mayam akurat di Aceh, kapan saja, di
    //       mana saja, tanpa perlu mendaftar.
    //     </p>
    //     {/* --- Akhir Bagian Baru --- */}
    <div className="flex flex-col items-center space-y-4  md:space-x-4 md:space-y-0 justify-center">
      <h1>Cek Prediksi Harga Emas dan Mayam sekarang!</h1>
      <div className="flex flex-col lg:flex-row space-y-2 md:space-x-2 md:space-y-0 mt-4 md:mt-0">
        {cityLinks.map((city) => (
          <Button key={city.name} variant="secondary" asChild>
            <Link href={city.href}>{city.name}</Link>
          </Button>
        ))}
      </div>
    </div>
    //   </div>
    // </section>
  );
};

export default CTA;

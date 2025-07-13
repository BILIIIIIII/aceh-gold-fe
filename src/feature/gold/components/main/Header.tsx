"use client";

import { CardTitle } from "@/shared/shadcn-components/ui/card";

const GoldCardHeaderContent = ({ city }: { city: string }) => {
  return (
    <CardTitle className="text-left p-0 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
      Harga Emas (IDR) per Mayam Kota {city}
    </CardTitle>
  );
};

export default GoldCardHeaderContent;

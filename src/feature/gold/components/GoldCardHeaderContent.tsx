// GoldCardHeaderContent.tsx
"use client";

import { CardTitle } from "@/shared/shadcn-components/ui/card";

const GoldCardHeaderContent = ({ city }: { city: string }) => {
  return (
    <CardTitle className="text-left text-4xl">
      {city} Gold Price (IDR) per Mayam
    </CardTitle>
  );
};

export default GoldCardHeaderContent;

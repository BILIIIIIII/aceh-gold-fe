"use client";

import { Gem } from "lucide-react";
import { ExpandableTabs } from "../shadcn-components/ui/expandable-tabs";
function Navbar() {
  const tabs = [
    { title: "Banda Aceh", icon: Gem, href: "/banda-aceh", color: "red" },
    { title: "Langsa", icon: Gem, href: "/langsa", color: "yellow" },
    { title: "Lhokseumawe", icon: Gem, href: "/lhokseumawe", color: "green" },
  ] as const;

  return (
    <div className="w-full sticky top-0 p-4 z-50">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-blue-500"
        className="border-slate-200 dark:border-blue-800"
      />
    </div>
  );
}

export default Navbar;

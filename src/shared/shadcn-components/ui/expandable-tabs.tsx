"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/libs/twMerge";
import { colorMap } from "@/shared/utils/colorClasses";

// Types
interface Tab {
  title: string;
  icon: LucideIcon;
  href: string;
  type?: never;
  color?: "red" | "yellow" | "green"; // Optional color for the tab
}
interface Separator {
  type: "separator";
}
type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: ReadonlyArray<TabItem>;
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

// Animation configs
const buttonVariants = {
  initial: { gap: 0, paddingInline: ".5rem" },
  animate: (selected: boolean) => ({
    gap: selected ? ".5rem" : 0,
    paddingInline: selected ? "1rem" : ".5rem",
  }),
};
const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};
const transition = {
  delay: 0.1,
  type: "spring" as const,
  bounce: 0,
  duration: 0.3,
};

// UI Components
const Separator = () => (
  <div className="mx-1 h-6 w-px bg-border" aria-hidden="true" />
);

function TabButton({
  tab,
  isSelected,
  onClick,
}: {
  tab: Tab; // ✅ cukup Tab saja
  isSelected: boolean;
  onClick: () => void;
}) {
  const { icon: Icon, title } = tab;
  const color = tab.color ?? "gray"; // default jika tak ada color

  const c = colorMap[color];

  return (
    <motion.button
      key={title}
      variants={buttonVariants}
      initial={false}
      animate="animate"
      custom={isSelected}
      onClick={onClick}
      transition={transition}
      className={cn(
        `backdrop-blur-md relative flex items-center rounded-full hover:cursor-pointer border border-transparent hover:border-blue-100 px-4 py-2 text-sm font-medium transition-colors`,
        "min-w-0 overflow-hidden", // 👉 ini penting
        isSelected ? c.bgActive : c.bg
      )}
    >
      <Icon size={20} className={isSelected ? c.icon : c.iconInactive} />
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={`ml-2 whitespace-nowrap ${
              isSelected ? c.icon : c.iconInactive
            }`}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Main Component
export function ExpandableTabs({
  tabs,
  className,
  onChange,
}: ExpandableTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = React.useState<number | null>(null);

  React.useEffect(() => {
    tabs.forEach((t) => {
      if ("href" in t) router.prefetch(t.href);
    });
  }, [tabs, router]);

  React.useEffect(() => {
    const idx = tabs.findIndex((t) => "href" in t && t.href === pathname);
    if (idx !== -1) setSelected(idx);
  }, [pathname, tabs]);

  const handleSelect = (index: number, href: string) => {
    setSelected(index);
    onChange?.(index);
    router.push(href);
  };

  return (
    <div
      className={cn(
        "w-fit max-w-full overflow-x-auto flex items-center gap-2 rounded-full border bg-background:90 backdrop-blur-xs p-1 shadow-xs",
        className
      )}
    >
      {tabs.map((tab, index) =>
        tab.type === "separator" ? (
          <Separator key={`separator-${index}`} />
        ) : (
          <TabButton
            key={tab.title}
            tab={tab}
            isSelected={selected === index}
            onClick={() => handleSelect(index, tab.href)}
          />
        )
      )}
    </div>
  );
}

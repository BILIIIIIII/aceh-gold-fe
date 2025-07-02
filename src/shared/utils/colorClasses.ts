// utils/colorClasses.ts
export const colorMap = {
  red: {
    bg: "bg-red-100/20",
    bgActive: "bg-red-400/20",
    icon: "text-red-900",
    iconInactive: "text-red-200",
  },
  yellow: {
    bg: "bg-yellow-100/20",
    bgActive: "bg-yellow-400/20",
    icon: "text-yellow-900",
    iconInactive: "text-yellow-200",
  },
  green: {
    bg: "bg-green-100/20",
    bgActive: "bg-green-400/20",
    icon: "text-green-900",
    iconInactive: "text-green-200",
  },
  gray: {
    bg: "bg-muted",
    bgActive: "bg-muted",
    icon: "text-muted-foreground",
    iconInactive: "text-muted-foreground",
  },
} as const;

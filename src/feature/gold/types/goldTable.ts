import type { Gold } from "./gold";

export interface GoldTableProps {
  data: Gold[];
  variant?: "compact" | "spacy";
  axis?: "vertical" | "horizontal";
}

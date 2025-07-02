import { Skeleton } from "@/shared/shadcn-components/ui/skeleton";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/shadcn-components/ui/table";
import { Table } from "lucide-react";

export const SummaryCardsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="p-4 border rounded-lg">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-24" />
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center gap-4">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-9 w-24" />
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
);

export const TableSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Skeleton className="h-4 w-16" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-16" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

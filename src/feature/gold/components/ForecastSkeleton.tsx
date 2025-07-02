import { Skeleton } from "@/shared/shadcn-components/ui/skeleton";

export function ForecastSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-80 w-full" />
    </div>
  );
}

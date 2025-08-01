import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-components/ui/card";
import { Skeleton } from "@/shared/shadcn-components/ui/skeleton";

interface PredictionCardProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
}

export function PredictionCard({
  title,
  value,
  isLoading,
}: PredictionCardProps) {
  return (
    <div className="flex  justify-center w-full border-l p-6">
      <Card className="w-fit  border-0 outline-none rounded-none shadow-none gap-0 p-0 m-0 bg-transparent">
        <CardHeader className="p-0 m-0 gap-0">
          <CardTitle className="p-0 m-0 text-xs text-muted-foreground font-normal">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 m-0">
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <span className="text-lg font-black">{value}</span>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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
    <Card className="w-full border-none outline-none shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}

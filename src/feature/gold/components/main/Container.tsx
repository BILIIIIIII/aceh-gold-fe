"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/shadcn-components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/shadcn-components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/shadcn-components/ui/table";
import { Skeleton } from "@/shared/shadcn-components/ui/skeleton";
import { Alert, AlertDescription } from "@/shared/shadcn-components/ui/alert";

import Chart from "./Chart";
import YearFilter from "./YearFilter";

import React, { useState, Suspense } from "react";
import useGolds from "../../hooks/useGolds";
import GoldCardHeaderContent from "./Header";
import SummaryCards from "./SummaryCards";
import GoldTable from "./Table";
import {
  ChartSkeleton,
  SummaryCardsSkeleton,
  TableSkeleton,
} from "../skeleton/GoldSkeleton";

class GoldPriceErrorBoundary extends React.Component<
  { children: React.ReactNode; onRetry?: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; onRetry?: () => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Price Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="dark:bg-zinc-900 bg-slate-50 mb-8 pt-10 shadow-none border-0">
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertDescription className="flex items-center justify-between">
                <span>
                  {this.state.error?.message ||
                    "Terjadi kesalahan saat memuat data. Silakan coba lagi."}
                </span>
                <button
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    this.props.onRetry?.();
                  }}
                  className="ml-4 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded transition-colors"
                >
                  Coba Lagi
                </button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

const Content = ({
  selectedYear,
  onYearChange,
  mayamValue,
}: {
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
  mayamValue: number;
}) => {
  const { chartData, metrics, isError, error } = useGolds(
    { limit: 0 },
    selectedYear,
    mayamValue
  );

  if (isError && error) {
    throw error;
  }

  const allYears = React.useMemo(() => {
    const yearsSet = new Set<string>();
    chartData.forEach((item: { time: string }) => {
      const year = new Date(item.time).getFullYear().toString();
      yearsSet.add(year);
    });
    return Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));
  }, [chartData]);

  React.useEffect(() => {
    if (selectedYear === null && allYears.length > 0) {
      onYearChange(allYears[0]);
    }
  }, [selectedYear, allYears, onYearChange]);

  return (
    <>
      <SummaryCards
        currentPrice={metrics?.currentPrice ?? 0}
        highPrice={metrics?.highPrice ?? 0}
        lowPrice={metrics?.lowPrice ?? 0}
        percentChange={metrics?.percentChange ?? 0}
        absoluteChange={metrics?.absoluteChange ?? 0}
      />

      <hr className="my-4" />

      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Chart Mayam</TabsTrigger>
          <TabsTrigger value="mayam-table">Kalkulator Mayam</TabsTrigger>
          <TabsTrigger value="data-table">Data Tabel</TabsTrigger>
        </TabsList>

        <TabsContent value="mayam-table">
          <Suspense fallback={<TableSkeleton rows={30} />}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mayam</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 30 }, (_, i) => 30 - i).map(
                  (mayamVal) => (
                    <TableRow key={mayamVal}>
                      <TableCell>{mayamVal}</TableCell>
                      <TableCell>
                        {metrics?.currentPrice
                          ? new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(metrics.currentPrice * mayamVal)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Suspense>
        </TabsContent>

        <TabsContent value="chart">
          <Suspense fallback={<ChartSkeleton />}>
            <div className="flex justify-between items-center gap-4">
              <h3 className="text-slate-400">
                Harga per tanggal{" "}
                {chartData.length > 0
                  ? chartData[chartData.length - 1].time
                  : "-"}{" "}
                GMT+7
              </h3>
              <div className="flex gap-2">
                <YearFilter
                  years={allYears}
                  selectedYear={selectedYear}
                  onYearChange={onYearChange}
                />
              </div>
            </div>
            <Chart
              data={chartData.map((item) => ({
                ...item,
                close: String(item.close),
                open: String(item.open),
              }))}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="data-table">
          <Suspense fallback={<TableSkeleton />}>
            <GoldTable
              data={chartData.map((item) => ({
                ...item,
                close: new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(Number(item.close)),
                open: new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(Number(item.open)),
              }))}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default function GoldPriceContainer({
  city,
  mayamValue,
}: {
  city: string;
  mayamValue: number;
}) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  return (
    <GoldPriceErrorBoundary onRetry={handleRetry}>
      <Card className="dark:bg-zinc-900 bg-slate-50 mb-8 pt-10 shadow-none border-0">
        <CardHeader>
          <GoldCardHeaderContent city={city} />
        </CardHeader>

        <CardContent>
          <Suspense
            key={`${selectedYear}-${retryKey}`}
            fallback={
              <>
                <SummaryCardsSkeleton />
                <hr className="my-4" />
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <ChartSkeleton />
                </div>
              </>
            }
          >
            <Content
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              mayamValue={mayamValue}
            />
          </Suspense>
        </CardContent>
      </Card>
    </GoldPriceErrorBoundary>
  );
}

import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  ChartSkeleton,
  SummaryCardsSkeleton,
} from "@/feature/gold/components/skeleton/GoldSkeleton";
import { ForecastSkeleton } from "@/feature/gold/components/skeleton/ForecastSkeleton";

const GoldPriceContainer = dynamic(
  () => import("@/feature/gold/components/main/Container")
);

const ForecastContainer = dynamic(
  () => import("@/feature/gold/components/forecast/ForecastContainer")
);

export default function Home() {
  return (
    <div className="w-full grid min-h-screen p-1 pb-20 lg:p-0 ">
      <main className="w-full min-h-screen max-w-[1000px] mx-auto  p-4 pb-50 flex flex-col gap-8">
        <Suspense
          fallback={
            <>
              <SummaryCardsSkeleton />
              <hr className="my-4" />
              <ChartSkeleton />
            </>
          }
        >
          <GoldPriceContainer city="Langsa" mayamValue={3.29} />
        </Suspense>

        <Suspense fallback={<ForecastSkeleton />}>
          <ForecastContainer mayamValue={3.1} />
        </Suspense>
      </main>
    </div>
  );
}

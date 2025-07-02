import dynamic from "next/dynamic";
import { Suspense } from "react";
// import { Skeleton } from "@/shared/shadcn-components/ui/skeleton";
import {
  ChartSkeleton,
  SummaryCardsSkeleton,
} from "@/feature/gold/components/GoldSkeleton";
import { ForecastSkeleton } from "@/feature/gold/components/ForecastSkeleton"; // 1. Import skeleton baru

// Dynamic import untuk GoldPriceContainer
const GoldPriceContainer = dynamic(
  () => import("@/feature/gold/components/GoldPriceContainer")
);

// 2. Dynamic import untuk ForecastContainer yang baru
const ForecastContainer = dynamic(
  () => import("@/feature/gold/components/ForecastContainer")
);

export default function Home() {
  // const loadingFallback = (
  //   <div className="w-full grid min-h-screen p-1 pb-20 lg:p-0 ">
  //     <main className="w-full min-h-screen max-w-[1000px] mx-auto p-4 flex flex-col gap-4">
  //       <SummaryCardsSkeleton />
  //       <hr className="my-4" />
  //       <ChartSkeleton />
  //       <hr className="my-8" />
  //       <ForecastSkeleton />
  //     </main>
  //   </div>
  // );

  return (
    <div className="w-full grid min-h-screen p-1 pb-20 lg:p-0 ">
      <main className="w-full min-h-screen max-w-[1000px] mx-auto p-4 flex flex-col gap-8">
        {/* 3. Bungkus setiap container dengan Suspense-nya sendiri */}
        <Suspense
          fallback={
            <>
              <SummaryCardsSkeleton />
              <hr className="my-4" />
              <ChartSkeleton />
            </>
          }
        >
          <GoldPriceContainer city="Langsa" mayamValue={3.1} />
        </Suspense>

        <Suspense fallback={<ForecastSkeleton />}>
          <ForecastContainer mayamValue={3.1} />
        </Suspense>
      </main>
    </div>
  );
}

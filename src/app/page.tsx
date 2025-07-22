import Hero from "@/feature/landing-page/components/hero";
import Features from "@/feature/landing-page/components/features";
import Benefit from "@/feature/landing-page/components/benefit";
import HowItWorks from "@/feature/landing-page/components/how-it-works";
import ForecastContainer from "@/feature/landing-page/components/forecastContainer";
import { Suspense } from "react";
import { Skeleton } from "@/shared/shadcn-components/ui/skeleton"; // Asumsi ada komponen Skeleton
import { cityLinks } from "@/feature/landing-page/lib/constants";
import { Button } from "@/shared/shadcn-components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />

      {/* --- Bagian Baru --- */}
      <section id="forecast" className="mb-12 md:mb-20">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={<Skeleton className="h-[550px] max-w-[1000px] mx-auto" />}
          >
            <ForecastContainer />
          </Suspense>
        </div>
      </section>
      {/* --- Akhir Bagian Baru --- */}
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center">
        <h1>Cek Prediksi Harga Emas dan Mayam</h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0 mt-4 md:mt-0">
          {cityLinks.map((city) => (
            <Button key={city.name} variant="secondary" asChild>
              <Link href={city.href}>{city.name}</Link>
            </Button>
          ))}
        </div>
      </div>

      <Features />
      <Benefit />
      <HowItWorks />
    </div>
  );
}

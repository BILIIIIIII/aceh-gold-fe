import Hero from "@/feature/landing-page/components/hero";
import Features from "@/feature/landing-page/components/ProblemSection";
import Benefit from "@/feature/landing-page/components/SolutionProof";
import HowItWorks from "@/feature/landing-page/components/how-it-works";
import ForecastContainer from "@/feature/landing-page/components/forecastContainer";
import { Suspense } from "react";
import { Skeleton } from "@/shared/shadcn-components/ui/skeleton"; // Asumsi ada komponen Skeleton
import CTA from "@/feature/landing-page/components/cta";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />

      <Features />

      <Benefit />

      <HowItWorks />

      <section id="forecast" className="mb-12 md:mb-20">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={<Skeleton className="h-[550px] max-w-[1000px] mx-auto" />}
          >
            <ForecastContainer />
          </Suspense>
        </div>
      </section>

      <CTA />
    </div>
  );
}

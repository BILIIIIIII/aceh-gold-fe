"use client";

import { Card, CardContent } from "@/shared/shadcn-components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CardDetailProps {
  title: string;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  currency?: "close" | "open";
  isPercentage?: boolean;
  isHigh?: boolean;
  isLow?: boolean;
  absoluteChange?: number;
}

const SummaryCards = ({
  title,
  percentChange,
  highPrice,
  lowPrice,
  isPercentage,
  isHigh,
  isLow,
  absoluteChange,
}: CardDetailProps) => {
  const formattedPercentChange = new Intl.NumberFormat("id-ID").format(
    percentChange
  );
  const formattedHighPrice = new Intl.NumberFormat("id-ID").format(highPrice);
  const formattedLowPrice = new Intl.NumberFormat("id-ID").format(lowPrice);
  const Icon = percentChange >= 0 ? TrendingUp : TrendingDown;
  const textColor = percentChange >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card className="bg-transparent shadow-none border-none m-0 p-0">
      <CardContent className="bg-transparent flex flex-col justify-between m-0 p-0 gap-1">
        {isPercentage && absoluteChange !== undefined ? (
          <div className="flex gap-1 items-center flex-wrap">
            <Icon className={`w-4 h-4 ${textColor}`} />
            <div className="flex gap-3 flex-wrap">
              <span className={`text-sm sm:text-base ${textColor}`}>
                {new Intl.NumberFormat("id-ID").format(absoluteChange)}
              </span>
              <span className={`text-sm sm:text-base ${textColor}`}>
                {percentChange.toFixed(2)}%
              </span>
            </div>
          </div>
        ) : isHigh ? (
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400">{title}</span>
            <span className="text-base text-slate-600">
              {formattedHighPrice}
            </span>
            <sub className="text-xs text-slate-500">IDR</sub>
          </div>
        ) : isLow ? (
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400">{title}</span>
            <span className="text-base text-slate-600">
              {formattedLowPrice}
            </span>
            <sub className="text-xs text-slate-500">IDR</sub>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-bold">
              {formattedPercentChange}
            </span>
            <sub className="text-sm">IDR</sub>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface CardsProps {
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  percentChange: number;
  absoluteChange: number;
}

const SummaryCardsContainer = ({
  currentPrice,
  highPrice,
  lowPrice,
  percentChange,
  absoluteChange,
}: CardsProps) => {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-start gap-4 flex-wrap w-full">
      <article className="flex flex-col gap-2 sm:gap-3">
        <div className="flex items-end flex-wrap gap-3 sm:gap-4">
          <SummaryCards
            title="Current"
            lowPrice={lowPrice}
            highPrice={highPrice}
            percentChange={currentPrice}
            currency="close"
          />
          <SummaryCards
            title="Changed (YTD)"
            lowPrice={lowPrice}
            highPrice={highPrice}
            percentChange={percentChange}
            absoluteChange={absoluteChange}
            isPercentage
          />
        </div>
      </article>

      <article className="w-full sm:w-auto">
        <div className="flex flex-row sm:flex-col gap-2 sm:items-end">
          <SummaryCards
            title="High"
            lowPrice={lowPrice}
            highPrice={highPrice}
            absoluteChange={absoluteChange}
            percentChange={percentChange}
            currency="close"
            isHigh
          />
          <SummaryCards
            title="Low"
            lowPrice={lowPrice}
            highPrice={highPrice}
            percentChange={percentChange}
            currency="close"
            isLow
          />
        </div>
      </article>
    </section>
  );
};

export default SummaryCardsContainer;

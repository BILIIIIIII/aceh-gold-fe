"use client";

import { useState } from "react";
import useForecasts from "../hooks/useForecast";
import { PredictionChart } from "./predictionChart";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/shadcn-components/ui/tabs";
import { formatCurrency } from "@/shared/utils/helper";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/shared/shadcn-components/ui/card";
import { PredictionCard } from "./predictionCard";
import { FORECAST_HORIZONS, LINE_CONFIG } from "../lib/constants";

export default function ForecastContainer() {
  const [selectedModel, setSelectedModel] = useState<
    "xgboost" | "lightgbm" | "catboost"
  >("xgboost");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const { forecastsByModel } = useForecasts();
  const activeChartData = forecastsByModel[selectedModel] || [];
  const selectedDayData = activeChartData?.[selectedDayIndex];

  return (
    <main className="w-full">
      <Card className="max-w-[1000px] mx-auto gap-0 p-0 overflow-hidden shadow-none">
        <CardHeader className="border-b p-4 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-2xl">Prediksi Harga Emas</CardTitle>
              <CardDescription>
                Prediksi harga untuk 30 hari ke depan berdasarkan model pilihan.
              </CardDescription>
            </div>
            <Tabs
              value={selectedModel}
              onValueChange={(value) =>
                setSelectedModel(value as "xgboost" | "lightgbm" | "catboost")
              }
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="xgboost">XGBoost</TabsTrigger>
                <TabsTrigger value="lightgbm">LightGBM</TabsTrigger>
                <TabsTrigger value="catboost">CatBoost</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-9 border-r pt-16 z-1">
              <PredictionChart data={activeChartData} lines={LINE_CONFIG} />
            </div>

            <div className="h-full lg:col-span-3">
              <Card className="w-full h-full flex flex-col justify-between border-none outline-none rounded-none shadow-none p-0 gap-0">
                <CardHeader className="p-4">
                  <CardTitle>Prediksi Harga</CardTitle>
                  <CardDescription>
                    Harga emas per mayam untuk{" "}
                    {
                      FORECAST_HORIZONS.find(
                        (h) => h.index === selectedDayIndex
                      )?.label
                    }
                  </CardDescription>
                  <Tabs
                    defaultValue={selectedDayIndex.toString()}
                    onValueChange={(value) => {
                      if (value) setSelectedDayIndex(Number(value));
                    }}
                  >
                    <TabsList className="w-full h-auto grid grid-cols-2 ">
                      {FORECAST_HORIZONS.map((horizon) => (
                        <TabsTrigger
                          key={horizon.index}
                          value={horizon.index.toString()}
                        >
                          {horizon.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-between gap-0 m-0 p-0">
                  {LINE_CONFIG.map((city) => (
                    <PredictionCard
                      key={city.key}
                      title={city.name}
                      value={formatCurrency(
                        (selectedDayData?.[
                          city.key as keyof typeof selectedDayData
                        ] as number) || 0
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

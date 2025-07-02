"use client";

import useForecasts from "../hooks/useForecast";
import { PredictionCard } from "./predictionCard";
import { PredictionChart } from "./predictionChart";

// Helper untuk format mata uang
const formatCurrency = (value: number | undefined) => {
  if (value === undefined || isNaN(value)) return "N/A";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function ForecastContainer({
  mayamValue,
}: {
  mayamValue: number;
}) {
  const { forecastChartData } = useForecasts(mayamValue);

  const nextDay = forecastChartData[0];
  const thirdDay = forecastChartData[2];
  const seventhDay = forecastChartData[6];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Prediksi Harga Emas (30 Hari ke Depan)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* --- INI BAGIAN YANG DIPERBAIKI --- */}
        <PredictionCard
          title="Prediksi Besok (XGBoost)"
          value={formatCurrency(nextDay?.xgboost)}
        />
        <PredictionCard
          title="Prediksi 3 Hari (XGBoost)"
          value={formatCurrency(thirdDay?.xgboost)}
        />
        <PredictionCard
          title="Prediksi 7 Hari (XGBoost)"
          value={formatCurrency(seventhDay?.xgboost)}
        />
      </div>

      <PredictionChart data={forecastChartData} />
    </div>
  );
}

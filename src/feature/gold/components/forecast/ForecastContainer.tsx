"use client";

import useForecasts from "../../hooks/useForecast";
import { PredictionCard } from "./predictionCard";
import { PredictionChart } from "./predictionChart";

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
  const oneWeek = forecastChartData[6];
  // const twoWeek = forecastChartData[11];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Prediksi Harga Emas (30 Hari ke Depan)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PredictionCard
          title="Prediksi Besok (XGBoost)"
          value={formatCurrency(nextDay?.xgboost)}
        />
        <PredictionCard
          title="Prediksi 3 Hari (XGBoost)"
          value={formatCurrency(thirdDay?.xgboost)}
        />
        <PredictionCard
          title="Prediksi 1 Minggu (XGBoost)"
          value={formatCurrency(oneWeek?.xgboost)}
        />
      </div>

      <PredictionChart data={forecastChartData} />
    </div>
  );
}

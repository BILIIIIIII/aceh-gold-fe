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

  return (
    <div className="border rounded-2xl space-y-4 overflow-hidden">
      <div className="flex justify-between items-center border-b p-0">
        <h2 className=" text-2xl font-bold px-6 p-0 m-0">
          Prediksi Harga Emas
          <br />
          (30 Hari ke Depan)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <PredictionCard
            title="Besok (XGBoost)"
            value={formatCurrency(nextDay?.xgboost)}
          />
          <PredictionCard
            title="3 Hari (XGBoost)"
            value={formatCurrency(thirdDay?.xgboost)}
          />
          <PredictionCard
            title="1 Minggu (XGBoost)"
            value={formatCurrency(oneWeek?.xgboost)}
          />
        </div>
      </div>

      <PredictionChart data={forecastChartData} />
    </div>
  );
}

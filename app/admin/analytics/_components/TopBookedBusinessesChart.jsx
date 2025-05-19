"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import GlobalApi from "@/app/_services/GlobalApi";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopBookedBusinessesChart = () => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    GlobalApi.getAllBusinessWithBookingCount().then((res) => {
      const topBusinesses = res.businessLists
        .map((b) => ({
          name: b.name,
          count: b.bookings.length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setChartData({
        labels: topBusinesses.map((b) => b.name),
        datasets: [
          {
            label: "Top 5 Most Booked Services",
            data: topBusinesses.map((b) => b.count),
            backgroundColor: "#ff6384",
          },
        ],
      });
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md border">
      <h2 className="text-lg font-semibold mb-3 text-center">Top 5 Booked Services</h2>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            indexAxis: "y",
          }}
        />
      )}
    </div>
  );
};

export default TopBookedBusinessesChart;

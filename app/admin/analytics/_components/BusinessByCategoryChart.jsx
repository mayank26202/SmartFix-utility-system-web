"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import GlobalApi from "@/app/_services/GlobalApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BusinessByCategoryChart = () => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    GlobalApi.getAllBusinessList().then((res) => {
      const data = res.businessLists;
      const categoryCount = {};

      data.forEach((business) => {
        const categoryName = business.category?.name || "Unknown";
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(categoryCount),
        datasets: [
          {
            label: "Services by Category",
            data: Object.values(categoryCount),
            backgroundColor: "#024c9a",
          },
        ],
      });
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md border w-full">
      <h2 className="text-lg font-semibold mb-3 text-center">
        Service Count by Category
      </h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: "index", intersect: false },
              title: { display: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Service Count" },
              },
              x: {
                title: { display: true, text: "Category" },
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BusinessByCategoryChart;

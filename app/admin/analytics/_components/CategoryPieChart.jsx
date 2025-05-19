"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import GlobalApi from "@/app/_services/GlobalApi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    GlobalApi.getAllBusinessList().then((res) => {
      const data = res.businessLists;
      const categoryCount = {};

      data.forEach((business) => {
        const categoryName = business.category?.name || "Unknown";
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      });

      const basicColors = [
        "#FF6384", // Red
        "#36A2EB", // Blue
        "#FFCE56", // Yellow
        "#4BC0C0", // Teal
        "#9966FF", // Purple
        "#FF9F40", // Orange
        "#8BC34A", // Light Green
        "#F44336", // Bright Red
        "#2196F3", // Light Blue
        "#00BCD4", // Cyan
        "#CDDC39", // Lime
        "#E91E63", // Pink
      ];

      const labels = Object.keys(categoryCount);
      const dataValues = Object.values(categoryCount);
      const colorCount = basicColors.length;
      const colors = labels.map((_, i) => basicColors[i % colorCount]);

      setChartData({
        labels,
        datasets: [
          {
            label: "Service Distribution",
            data: dataValues,
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md border w-full">
      <h2 className="text-lg font-semibold mb-3 text-center">
        Service Distribution by Category
      </h2>
      <div className="w-full flex justify-center items-center">
        {chartData ? (
          <div className="max-w-[400px] w-full">
            <Pie data={chartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPieChart;

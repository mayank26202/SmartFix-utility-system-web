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

const BookingCountByCategoryChart = () => {
  const [allBusinessLists, setAllBusinessLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chartData, setChartData] = useState();

  useEffect(() => {
    GlobalApi.getAllBookingsGroupedByCategory().then((res) => {
      const businessData = res.businessLists || [];
      setAllBusinessLists(businessData);

      // Extract unique category names
      const uniqueCategories = [
        ...new Set(
          businessData.map((b) => b.category?.name).filter(Boolean)
        ),
      ];
      setCategories(uniqueCategories);

      setChartData(buildChartData(businessData));
    });
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === "all"
        ? allBusinessLists
        : allBusinessLists.filter(
            (b) => b.category?.name === selectedCategory
          );

    setChartData(buildChartData(filtered, selectedCategory !== "all"));
  }, [selectedCategory]);

  const buildChartData = (businesses, isSingleCategory = false) => {
    if (isSingleCategory) {
      // Bar chart for all businesses under one selected category
      const labels = businesses.map((b) => b.name);
      const data = businesses.map((b) => b.bookings?.length || 0);
      return {
        labels,
        datasets: [
          {
            label: `Bookings in ${selectedCategory}`,
            data,
            backgroundColor: "#087cfb",
          },
        ],
      };
    } else {
      // Bar chart grouped by category
      const groupedData = {};
      businesses.forEach((b) => {
        const cat = b.category?.name || "Uncategorized";
        groupedData[cat] = (groupedData[cat] || 0) + (b.bookings?.length || 0);
      });

      return {
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: "Total Bookings by Category",
            data: Object.values(groupedData),
            backgroundColor: "#087cfb",
          },
        ],
      };
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md border w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Booking Count</h2>
        <select
          className="border px-2 py-1 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: "bottom" },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Bookings Count" },
              },
              x: {
                title: {
                  display: true,
                  text:
                    selectedCategory === "all"
                      ? "Category"
                      : "Service under Category",
                },
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

export default BookingCountByCategoryChart;

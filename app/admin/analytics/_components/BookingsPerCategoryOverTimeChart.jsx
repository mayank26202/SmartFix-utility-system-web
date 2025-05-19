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
  Title,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

// High-contrast color palette
const COLOR_PALETTE = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#2ecc71", "#e74c3c", "#f39c12", "#8e44ad",
  "#1abc9c", "#34495e", "#d35400", "#7f8c8d", "#c0392b",
];

const BookingsPerCategoryOverTimeChart = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));

  useEffect(() => {
    GlobalApi.getAllBookings().then((res) => {
      const bookings = res.bookings;
      setAllBookings(bookings);
    });
  }, []);

  useEffect(() => {
    if (allBookings.length > 0) {
      generateChartData();
    }
  }, [selectedMonth, allBookings]);

  const generateChartData = () => {
    const dataMap = {};

    const filteredBookings = allBookings.filter((b) =>
      moment(b.date).format("YYYY-MM") === selectedMonth
    );

    filteredBookings.forEach((booking) => {
      const day = moment(booking.date).format("DD");
      const category = booking.businessList?.category?.name || "Unknown";

      if (!dataMap[day]) dataMap[day] = {};
      dataMap[day][category] = (dataMap[day][category] || 0) + 1;
    });

    const sortedDays = Object.keys(dataMap).sort((a, b) => a - b);
    const categories = new Set();

    sortedDays.forEach((day) => {
      Object.keys(dataMap[day]).forEach((cat) => categories.add(cat));
    });

    const datasets = Array.from(categories).map((cat, index) => ({
      label: cat,
      data: sortedDays.map((day) => dataMap[day][cat] || 0),
      backgroundColor: COLOR_PALETTE[index % COLOR_PALETTE.length],
      borderColor: "#ffffff",
      borderWidth: 1,
    }));

    setChartData({
      labels: sortedDays,
      datasets: datasets,
    });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full border">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Bookings per Category Over Time</h2>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border rounded px-2 py-1"
        />
      </div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              title: { display: false },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Bookings Count" },
              },
              x: {
                title: { display: true, text: "Day of Month" },
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

export default BookingsPerCategoryOverTimeChart;

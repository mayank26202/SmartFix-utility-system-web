"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import GlobalApi from "@/app/_services/GlobalApi";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BookingTrendChart = () => {
  const [chartData, setChartData] = useState();
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    GlobalApi.getAllBookings().then((res) => {
      const allBookings = res.bookings || [];

      // Extract all years available
      const years = Array.from(
        new Set(allBookings.map((booking) => moment(booking.date).year()))
      ).sort((a, b) => b - a); // Descending order
      setAvailableYears(years);

      // Filter by selected year
      const bookingsThisYear = allBookings.filter(
        (booking) => moment(booking.date).year() === selectedYear
      );

      const bookingsByMonth = {};
      bookingsThisYear.forEach((booking) => {
        const month = moment(booking.date).format("MMM");
        bookingsByMonth[month] = (bookingsByMonth[month] || 0) + 1;
      });

      const labels = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      const counts = labels.map((month) => bookingsByMonth[month] || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: `Bookings in ${selectedYear}`,
            data: counts,
            borderColor: "#087cfb",
            backgroundColor: "rgba(8, 124, 251, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "#087cfb",
            fill: true,
          },
        ],
      });
    });
  }, [selectedYear]);

  return (
    <div className="bg-white p-6 rounded shadow-md border max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#262262]">📈 Monthly Booking Trend</h2>
        {availableYears.length > 0 && (
          <select
            className="border px-3 py-1 rounded text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4">
        This chart shows how bookings fluctuate across months for the selected year. Use the dropdown to filter by year.
      </p>

      <div className="h-[400px] w-full">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Bookings: ${context.parsed.y}`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Number of Bookings" },
                  grid: { color: "#f0f0f0" },
                },
                x: {
                  grid: { color: "#f0f0f0" },
                },
              },
            }}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default BookingTrendChart;

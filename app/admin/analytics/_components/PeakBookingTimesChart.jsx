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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

const PeakBookingTimesChart = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("all");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch all bookings and all businesses
    GlobalApi.getAllBookings().then((res) => {
      setAllBookings(res.bookings);
    });
    GlobalApi.getAllBusinessList().then((res) => {
      setBusinessList(res.businessLists);
    });
  }, []);

  useEffect(() => {
    generateChartData();
  }, [selectedBusiness, allBookings]);

  const generateChartData = () => {
    const filteredBookings =
      selectedBusiness === "all"
        ? allBookings
        : allBookings.filter(
            (b) => b.businessList?.id === selectedBusiness
          );

    const timeCounts = {};
    filteredBookings.forEach((booking) => {
      const time = booking.time;
      timeCounts[time] = (timeCounts[time] || 0) + 1;
    });

    const sortedTimes = Object.keys(timeCounts).sort();
    const counts = sortedTimes.map((time) => timeCounts[time]);

    setChartData({
      labels: sortedTimes,
      datasets: [
        {
          label: "Number of Bookings",
          data: counts,
          backgroundColor: "#087cfb",
        },
      ],
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full border">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Peak Booking Times</h2>
        <select
          className="border px-2 py-1 rounded"
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)}
        >
          <option value="all">All Businesses</option>
          {businessList.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
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
              legend: { display: false },
              title: { display: false },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Bookings Count" },
              },
              x: {
                title: { display: true, text: "Time" },
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

export default PeakBookingTimesChart;

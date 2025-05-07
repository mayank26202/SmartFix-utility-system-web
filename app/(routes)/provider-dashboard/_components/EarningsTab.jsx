"use client"
import { useEffect, useState } from "react";
import { BadgeCheck, IndianRupee } from "lucide-react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EarningsTab({ allBookings }) {
  const [completedBookings, setCompletedBookings] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [labels, setLabels] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    const sortedBookings = allBookings
      .filter(booking => new Date(booking.date) <= new Date()) // Filter completed bookings
      .sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      });

    setCompletedBookings(sortedBookings);
    categorizeBookings(sortedBookings);
  }, [allBookings]);

  const categorizeBookings = (bookings) => {
    const earningsByMonth = {};

    bookings.forEach(booking => {
      const monthYear = new Date(booking.date).toLocaleString('default', { month: 'long', year: 'numeric' });

      if (!earningsByMonth[monthYear]) {
        earningsByMonth[monthYear] = 0;
      }

      earningsByMonth[monthYear] += 249; // Add ₹249 for each completed booking
    });

    const months = Object.keys(earningsByMonth);
    const earnings = months.map(month => earningsByMonth[month]);

    setLabels(months);
    setEarningsData(earnings);
    setMonthlyEarnings(earningsByMonth);
  };

  const totalEarnings = completedBookings.length * 249;

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Earnings',
        data: earningsData,
        backgroundColor: '#087cfb',
        borderColor: '#087cfb',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Earnings Per Month',
        font: { size: 20 },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `₹${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, // Increase the font size of x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `₹${value}`;
          },
          font: {
            size: 16, // Increase the font size of y-axis labels
          },
        },
      },
    },
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-2xl font-semibold text-[#087cfb] flex items-center gap-2">
        <BadgeCheck className="w-6 h-6 text-[#087cfb]" />
        Earnings Overview
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 space-y-4 w-full">
        {completedBookings.map((booking, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2 text-sm md:text-base">
            <span className="text-gray-700">
              {new Date(booking.date).toLocaleDateString('en-GB')} - {booking.time} {/* Format date as dd/mm/yyyy */}
            </span>
            <span></span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              249
            </span>
          </div>
        ))}

        <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg text-[#262262]">
          <span>Total Earnings</span>
          <span className="flex items-center gap-1 text-green-600">
            <IndianRupee className="w-5 h-5" />
            {totalEarnings}
          </span>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 mt-6 border border-gray-100 w-full">
        <h3 className="text-lg font-semibold text-[#262262]">Monthly Earnings Breakdown</h3>
        <Bar data={data} options={options} />
      </div>

      <p className="text-sm text-gray-500 text-center">*Based on ₹249 per completed booking</p>
    </div>
  );
}

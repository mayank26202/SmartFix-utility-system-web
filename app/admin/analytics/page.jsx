"use client";

import React from "react";
import BusinessByCategoryChart from "./_components/BusinessByCategoryChart";
import CategoryPieChart from "./_components/CategoryPieChart";
import BookingTrendChart from "./_components/BookingTrendChart";
import BookingCountByCategoryChart from "./_components/BookingCountByCategoryChart";
import TopBookedBusinessesChart from "./_components/TopBookedBusinessesChart";
import BookingsPerCategoryOverTimeChart from "./_components/BookingsPerCategoryOverTimeChart";
import PeakBookingTimesChart from "./_components/PeakBookingTimesChart";
import { useRouter } from "next/navigation";
import AverageRatingChart from "./_components/AverageRatingChart";



const AnalyticsPage = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/admin")}
        className="mb-6 px-4 py-2 bg-[#087cfb] text-white rounded-lg hover:bg-[#065b8f] transition duration-200"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-6">SmartFix Analytics</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8">
        <BusinessByCategoryChart />
        <CategoryPieChart />
      </div>

      <div className="mt-8">
        <BookingTrendChart />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8">
        <BookingCountByCategoryChart />
        <TopBookedBusinessesChart />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8">
        <BookingsPerCategoryOverTimeChart />
        <PeakBookingTimesChart />
      </div>

      <div className="mt-8">
      <AverageRatingChart/>
    </div>

  

    </div>
  );
};

export default AnalyticsPage;

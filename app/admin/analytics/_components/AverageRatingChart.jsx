import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import GlobalApi from "@/app/_services/GlobalApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const AverageRatingChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await GlobalApi.getAllReviewsWithBusiness();
      const allBusinesses = await GlobalApi.getAllBusinessList();

      const reviews = res.reviews;
      const ratingMap = {};

      // Group reviews by business name
      reviews.forEach((review) => {
        const name = review.businessList?.name || "Unknown";
        if (!ratingMap[name]) ratingMap[name] = [];
        ratingMap[name].push(review.rating);
      });

      const labels = [];
      const data = [];
      const starLabels = [];

      // Calculate average or 0
      allBusinesses.businessLists.forEach((b) => {
        const name = b.name || "Unknown";
        labels.push(name);

        if (ratingMap[name] && ratingMap[name].length > 0) {
          const avg =
            ratingMap[name].reduce((a, b) => a + b, 0) / ratingMap[name].length;
          const rounded = +avg.toFixed(2);
          data.push(rounded);

          // Generate star string (e.g. ⭐⭐⭐⭐☆)
          const fullStars = Math.floor(rounded);
          const halfStar = rounded - fullStars >= 0.5 ? "½" : "";
          const stars = "⭐".repeat(fullStars) + halfStar + "☆".repeat(5 - fullStars - (halfStar ? 1 : 0));
          starLabels.push(`${stars} (${rounded})`);
        } else {
          data.push(0);
          starLabels.push("No ratings");
        }
      });

      const chart = {
        labels,
        datasets: [
          {
            label: "Average Rating",
            data,
            backgroundColor: "#087cfb",
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${starLabels[context.dataIndex]}`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
            },
            title: {
              display: true,
              text: "Rating (out of 5)",
            },
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 30,
            },
          },
        },
      };

      setChartData({ chart, options });
    };

    fetchRatings();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 border">
      <h2 className="text-2xl font-bold mb-4 text-center">Average Rating per Business</h2>
      {chartData && <Bar data={chartData.chart} options={chartData.options} />}
    </div>
  );
};

export default AverageRatingChart;

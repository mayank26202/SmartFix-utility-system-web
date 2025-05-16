import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Verma",
    rating: 5,
    text: "SmartFix made it easy to find a trusted electrician. Highly recommended!",
  },
  {
    name: "Anjali Mehra",
    rating: 4,
    text: "Quick plumber booking and great service. Will use it again.",
  },
  {
    name: "Karan Singh",
    rating: 5,
    text: "Excellent user interface and timely service providers. Loved it!",
  },
  {
    name: "Sneha Patil",
    rating: 4,
    text: "SmartFix helped me book a carpenter in minutes. Great experience.",
  },
  {
    name: "Amit Dubey",
    rating: 5,
    text: "Reliable and fast booking platform for household services.",
  },
  {
    name: "Neha Sharma",
    rating: 5,
    text: "Easy to use and the service quality was top-notch.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <div className="mt-14 bg-[#e2eefc] py-14 px-4 sm:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        What Our Clients Say
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-1 w-max animate-scroll">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 w-72 sm:w-80 flex-shrink-0"
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                “{item.text}”
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  {item.name}
                </span>
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

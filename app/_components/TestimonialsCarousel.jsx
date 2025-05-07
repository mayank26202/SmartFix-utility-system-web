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
    <div className="mt-10 bg-[#e2eefc]  py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        What Our Clients Say
      </h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll gap-6 w-max">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 w-80 flex-shrink-0"
            >
              <p className="text-gray-700 text-sm mb-4 break-words">
                {item.text}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 text-sm">
                  {item.name}
                </span>
                <div className="flex items-center">
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

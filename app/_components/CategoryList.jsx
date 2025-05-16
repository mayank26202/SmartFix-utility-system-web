import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CategoryList({ categoryList }) {
  return (
    <section className="bg-white py-1 px-4 md:px-10 lg:px-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8 text-center">
        Explore Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categoryList.length > 0 ? (
          categoryList.map((category, index) => (
            <Link
              href={`/search/${category.name}`}
              key={index}
              className="group bg-[#e2eefc] rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-300 flex flex-col items-center justify-center hover:bg-[#087cfb]"
            >
              <div className="w-14 h-14 flex items-center justify-center  mb-3">
                <Image
                  src={category.icon?.[0]?.url}
                  alt={`${category.name} icon`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-black  transition">
                {category.name}
              </h3>
            </Link>
          ))
        ) : (
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-[140px] bg-gray-200 rounded-2xl animate-pulse"
            />
          ))
        )}
      </div>
    </section>
  );
}

export default CategoryList;

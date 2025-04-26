'use client'
import { Calendar, Clock, MapPin, User, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function BookingHistoryList({ bookingHistory = [], type }) {
  const bookingsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(bookingHistory.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingHistory.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {currentBookings.map((booking, index) => (
          <div key={index} className='flex flex-col border border-[#087cfb] shadow-lg rounded-lg p-4 mb-5'>
            <div className='flex gap-4'>
              <Image
                src={booking?.businessList?.images[0]?.url || '/placeholder.jpg'}
                alt='image'
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
              <div className='flex flex-col gap-2'>
                <h2 className='text-bold text-xl'>{booking?.businessList?.name}</h2>
                <h2 className='flex gap-2 text-[#087cfb]'><User className='text-[#087cfb]' />{booking?.businessList?.contactPerson}</h2>
                <h2 className='flex gap-2 text-gray-500'><MapPin className='text-[#087cfb]' />{booking?.businessList?.address}</h2>
                <h2 className='flex gap-2 text-gray-500'><Calendar className='text-[#087cfb]' />Scheduled on: <span className='text-black'>{booking?.date}</span></h2>
                <h2 className='flex gap-2 text-gray-500'><Clock className='text-[#087cfb]' />Time: <span className='text-black'>{booking?.time}</span></h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-6 space-x-2 items-center flex-wrap'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-md text-sm font-medium ${currentPage === 1
              ? 'bg-[#e2eefc] text-gray-400 cursor-not-allowed border-[#087cfb]'
              : 'bg-white text-gray-700 hover:bg-gray-400 '}`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 border rounded-md text-sm font-medium ${page === currentPage
                ? 'bg-[#087cfb] text-white border-[#087cfb]'
                : 'bg-white text-gray-700 hover:bg-[#087cfb]'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-md text-sm font-medium ${currentPage === totalPages
              ? 'bg-[#e2eefc] text-gray-400 cursor-not-allowed border-[#087cfb]'
              : 'bg-white text-gray-700 hover:bg-gray-400'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingHistoryList;

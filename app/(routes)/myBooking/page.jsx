"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingHistoryList from './_components/BookingHistoryList'
import GlobalApi from '@/app/_services/GlobalApi'
import { useSession } from 'next-auth/react'

function MyBooking() {

  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    data && GetUserBookingHistory();
  }, [data]);

  const GetUserBookingHistory = () => {
    GlobalApi.GetUserBookingHistory(data.user.email).then(resp => {
      setBookingHistory(resp.bookings);
    });
  };



  const filterData = (type) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date
  
    const result = bookingHistory.filter(item => {
      const bookingDate = new Date(item.date);
      bookingDate.setHours(0, 0, 0, 0); // Normalize booking date
  
      if (type === 'booked') {
        return bookingDate >= today; // Today or future
      } else if (type === 'completed') {
        return bookingDate < today; // Strictly before today
      }
    });
  
    if (type === 'completed') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    } else if (type === 'booked') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest first
    }
  
    return result;
  };
  
  
  
  

  return (
    <div className='mt-25 my-10 mx-3 md:mx-36'>
      <h2 className='font-bold text-[20px] my-4'>My Bookings</h2>

      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="flex gap-2">
          <TabsTrigger value="booked" className="text-gray-500 bg-gray-200  data-[state=active]:bg-[#087cfb] data-[state=active]:text-white rounded-md">Booked</TabsTrigger>
          <TabsTrigger value="completed" className="text-gray-500 bg-gray-200 data-[state=active]:bg-[#087cfb] data-[state=active]:text-white rounded-md">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList
            bookingHistory={filterData('booked')}
            type="booked"
          />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList
            bookingHistory={filterData('completed')}
            type="completed"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;

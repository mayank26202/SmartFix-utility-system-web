'use client';

import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import moment from 'moment/moment';

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (date) {
      BusinessBookedSlot();
    }
  }, [date]);

  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(business.id, moment(date).format('DD-MMM-yyyy')).then(resp => {
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' });
      timeList.push({ time: i + ':30 AM' });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ':00 PM' });
      timeList.push({ time: i + ':30 PM' });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.id,
      moment(date).format('DD-MMM-yyyy'),
      selectedTime,
      data.user.email,
      data.user.name
    )
      .then(resp => {
        if (resp) {
          toast('Service Booked Successfully');
        }
      })
      .catch(() => {
        toast('Error While Booking');
      });
  };

  const isSlotBooked = time => {
    return bookedSlot.find(item => item.time === time);
  };

  return (
    <div>
      <Sheet
        open={isOpen}
        onOpenChange={open => {
          setIsOpen(open);
          if (!open) {
            setDate(new Date());
            setSelectedTime(null);
          }
        }}
      >
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-5 bg-white overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book a service
            </SheetDescription>
          </SheetHeader>

          {/* Date Picker */}
          <h2 className="font-bold mt-5">Select Date</h2>
          <div className="flex flex-col gap-5 items-baseline mt-5">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date()}
              className="rounded-md border p-5"
            />
          </div>

          {/* Time Picker */}
          <h2 className="font-bold my-5">Select Time Slot</h2>
          <div className="grid grid-cols-3 gap-3">
            {timeSlot.map((item, index) => (
              <Button
                key={index}
                disabled={isSlotBooked(item.time)}
                variant="outline"
                className={`border-[#087cfb] rounded-full p-2 px-3 transition-all cursor-pointer
                  ${selectedTime === item.time ? 'bg-[#087cfb] text-white' : 'bg-white text-black'}
                `}
                onClick={() => setSelectedTime(selectedTime === item.time ? null : item.time)}
              >
                {item.time}
              </Button>
            ))}
          </div>

          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button
                  disabled={!(selectedTime && date)}
                  className="hover:bg-[#0462c9] rounded-lg"
                  onClick={saveBooking}
                >
                  Book
                </Button>
                <Button variant="secondary" className="rounded-lg">
                  Cancel
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;

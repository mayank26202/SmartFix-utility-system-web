'use client';

import React, { useEffect, useState } from 'react';
import {
  Sheet,
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
import moment from 'moment';
import { ChevronDown } from 'lucide-react';

const ORIGINAL_PRICE = 499;
const DISCOUNTED_PRICE = 249;
const GST_RATE = 0.18;

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
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
    GlobalApi.BusinessBookedSlot(
      business.id,
      moment(date).format('DD-MMM-yyyy')
    ).then(resp => {
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` });
    }
    for (let i = 1; i <= 9; i++) {
      timeList.push({ time: `${i}:00 PM` });
    }
    setTimeSlot(timeList);
  };

  const calculatePriceDetails = () => {
    let discount = 0;
    if (coupons.includes('NEWUSER50')) {
      discount += 0.5 * DISCOUNTED_PRICE;
    }
    const isToday = moment(date).isSame(new Date(), 'day');
    if (coupons.includes('TODAYSPECIAL10') && isToday) {
      discount += 0.1 * DISCOUNTED_PRICE;
    }

    const basePrice = DISCOUNTED_PRICE - discount;
    const gstAmount = basePrice * GST_RATE;
    const total = basePrice + gstAmount;

    return {
      basePrice: basePrice.toFixed(2),
      gst: gstAmount.toFixed(2),
      total: total.toFixed(2),
    };
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
          setIsBooked(true);
          setShowSummary(false);
          setIsOpen(false);
        }
      })
      .catch(() => {
        toast('Error While Booking');
      });
  };

  const isSlotBooked = time => bookedSlot.find(item => item.time === time);

  const handleCouponToggle = code => {
    setCoupons(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
    setShowDropdown(false);
  };

  const loadRazorpayScript = () => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast('Razorpay SDK failed to load');
      return;
    }

    const { basePrice, gst, total } = calculatePriceDetails();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Number(total) * 100,
      currency: 'INR',
      name: 'SmartFix Services',
      description: 'Service Booking',
      handler: function (response) {
        toast.success('Payment Successful');
        saveBooking();
      },
      prefill: {
        name: data?.user?.name || '',
        email: data?.user?.email || '',
        contact: '9999999999',
      },
      notes: {
        service: business.name,
        date: moment(date).format('DD MMM YYYY'),
        time: selectedTime,
      },
      theme: {
        color: '#087cfb',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const { basePrice, gst, total } = calculatePriceDetails();

  return (
    <div>
      <Sheet
        open={isOpen}
        onOpenChange={open => {
          setIsOpen(open);
          if (!open) {
            setDate(new Date());
            setSelectedTime(null);
            setShowSummary(false);
            setCoupons([]);
            setShowDropdown(false);
            setIsBooked(false);
          }
        }}
      >
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-5 bg-white overflow-auto w-full max-w-full sm:max-w-lg">
          {!showSummary ? (
            <>
              <SheetHeader>
                <SheetTitle className="text-[#087cfb] text-xl sm:text-2xl">Book a Service</SheetTitle>
                <SheetDescription className="text-md sm:text-xl">
                  Select Date and Time slot to book a service
                </SheetDescription>
              </SheetHeader>

              <h2 className="font-bold text-[#087cfb] mt-4">Select Date</h2>
              <div className="flex justify-center mt-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={new Date()}
                  className="rounded-md border p-3 scale-100 sm:scale-110"
                />
              </div>

              <h2 className="font-bold my-5 text-[#087cfb]">Select Time Slot</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    disabled={isSlotBooked(item.time)}
                    variant="outline"
                    className={`border-[#087cfb] rounded-full p-2 text-sm sm:text-base transition-all cursor-pointer ${
                      selectedTime === item.time
                        ? 'bg-[#087cfb] text-white'
                        : 'bg-white text-black'
                    }`}
                    onClick={() =>
                      setSelectedTime(
                        selectedTime === item.time ? null : item.time
                      )
                    }
                  >
                    {item.time}
                  </Button>
                ))}
              </div>

              <SheetFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  disabled={!(selectedTime && date)}
                  className="hover:bg-[#0462c9] rounded-lg w-full"
                  onClick={() => setShowSummary(true)}
                >
                  Proceed
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-lg w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </SheetFooter>
            </>
          ) : (
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>

              <p><strong>Service:</strong> <span className="text-[#087cfb]">{business.name}</span></p>
              <p><strong>Date:</strong> {moment(date).format('DD MMM YYYY')}</p>
              <p><strong>Time:</strong> {selectedTime}</p>

              <div className="mt-4">
                <p className="font-semibold mb-2">Apply Coupons:</p>
                <div className="relative inline-block w-full">
                  <Button
                    variant="outline"
                    className="flex justify-between w-full"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {coupons.length > 0 ? coupons.join(', ') : 'Select Coupon(s)'}
                    <ChevronDown size={18} />
                  </Button>

                  {showDropdown && (
                    <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
                      <div
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${coupons.includes('NEWUSER50') && 'bg-blue-50'}`}
                        onClick={() => handleCouponToggle('NEWUSER50')}
                      >
                        <strong>NEWUSER50:</strong> 50% off for first-time booking
                      </div>
                      <div
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${coupons.includes('TODAYSPECIAL10') && 'bg-blue-50'} ${!moment(date).isSame(new Date(), 'day') && 'text-gray-400 cursor-not-allowed'}`}
                        onClick={() => {
                          if (moment(date).isSame(new Date(), 'day')) {
                            handleCouponToggle('TODAYSPECIAL10');
                          }
                        }}
                      >
                        <strong>TODAYSPECIAL10:</strong> 10% off for bookings made today
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Original Price</span>
                  <span className="line-through text-gray-500">₹{ORIGINAL_PRICE}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-700 font-medium">Discounted Price</span>
                  <span className="text-black font-semibold">₹{basePrice}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-700">GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between mt-3 border-t pt-3 text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{total}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="bg-[#087cfb] text-white hover:bg-[#0663d2] w-full"
                  onClick={handleRazorpayPayment}
                >
                  Book Service
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowSummary(false)}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;

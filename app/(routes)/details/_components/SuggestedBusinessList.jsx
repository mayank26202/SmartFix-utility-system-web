'use client'

import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button'
import { NotebookPen } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// ✅ Dynamic import for BookingSection
import dynamic from 'next/dynamic';
const BookingSection = dynamic(() => import('./BookingSection'), {
  ssr: false,
});

function SuggestedBusinessList({ business }) {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    business && getBusinessList();
  }, [business]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(business?.category?.name)
      .then(resp => {
        setBusinessList(resp?.businessLists);
      });
  }

  return (
    <div className='md:pl-10'>
      <BookingSection business={business}>
        <Button className="flex gap-2 w-full bg-[#087cfb] text-white cursor-pointer hover:bg-[#0462c9]">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>

      <div className='hidden md:block'>
        <h2 className='font-bold text-lg mt-10 mb-3'>Similar Businesses</h2>
        <div>
          {businessList && businessList.map((business, index) => (
            <Link
              href={'/details/' + business.id}
              key={index}
              className="flex gap-2 mb-4 rounded-lg p-2 border-b-2 border-gray-300 hover:border-b-3 cursor-pointer hover:shadow-md hover:bg-[#e2eefc] hover:border-[#087cfb]"
            >
              <Image
                src={business?.images[0].url}
                alt={business.name}
                width={80}
                height={80}
                className='rounded-lg object-cover h-[100px]'
              />
              <div>
                <h2 className='font-bold'>{business.name}</h2>
                <h2 className='text-[#087cfb]'>{business.contactPerson}</h2>
                <h2 className='text-gray-400'>{business.address}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList;

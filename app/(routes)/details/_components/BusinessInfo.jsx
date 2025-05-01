import { Button } from '@/components/ui/button'
import { Clock, Mail, MapPin, Share, Share2, Timer, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function BusinessInfo({ business }) {
    return business?.name && (
        <div className='md:flex gap-4 items-center'>
            <Image src={business?.images[0]?.url}
                alt={business.name}
                width={150}
                height={200}
                className='rounded-full h-[150px] object-cover'
            />
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
                    <h2 className='p-1 px-3 bg-[#e2eefc] text-[#087cfb] rounded-full text-[15px]'>{business?.category?.name}</h2>
                    <h2 className='text-[40px] font-bold'>{business?.name}</h2>
                    <h2 className='flex gap-2 text-lg text-gray-500'><MapPin />{business?.address}</h2>
                    <h2 className='flex gap-2 text-lg text-gray-500'><Mail />{business?.email}</h2>
                    <h2 className=" pl-9 text-sm font-semibold text-gray-800">
                    <span className="text-black  mr-2">Starts at: <span className='text-green-600'>₹249</span>  </span>
                    <span className="text-gray-500 font-bold mr-2">.</span>
                    <span className="text-gray-500 font-bold">60 mins</span>
                </h2>
                </div>

                <div className='hidden md:flex flex-col gap-5 items-end'>
                    <Button className='bg-[#087cfb] text-white cursor-pointer hover:bg-[#0462c9] transition-all w-10 h-10 flex items-center justify-center'>
                        <Share2 />
                    </Button>
                    <h2 className='flex gap-2 text-lg text-[#087cfb] '><User />{business.contactPerson}</h2>
                    <h2 className='flex gap-2 text-lg text-gray-500'><Clock />Available from 10:00 AM to 6:30 PM</h2>
                </div>
            </div>
        </div>
    )
}

export default BusinessInfo

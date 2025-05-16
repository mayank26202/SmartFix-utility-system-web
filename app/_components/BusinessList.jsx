import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BusinessList({ businessList, title }) {
    return (
        <div className='mt-5 px-4 '>
            <h2 className='font-bold text-[24px] md:text-[30px]'>{title}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 bg-white'>
                {businessList.length > 0 ? businessList.map((business, index) => (
                    <Link
                        href={`/details/${business.id}`}
                        key={index}
                        className='shadow-md rounded-lg hover:shadow-lg hover:shadow-[#087cfb] cursor-pointer hover:scale-[1.03] transition-all ease-in-out flex flex-col'
                    >
                        <Image
                            src={business?.images[0]?.url}
                            alt={business.name}
                            width={500}
                            height={200}
                            className='w-full h-[180px] sm:h-[200px] object-cover rounded-t-lg'
                        />

                        <div className='flex flex-col justify-between flex-grow p-3 gap-2'>
                            <div className='flex flex-col gap-1'>
                                <div className='w-fit max-w-full'>
                                    <h2 className='px-3 py-1 bg-[#e2eefc] text-[#087cfb] rounded-full text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
                                        {business?.category?.name}
                                    </h2>
                                </div>
                                <h2 className='font-bold text-base sm:text-lg'>{business.name}</h2>
                                <h2 className='text-[#087cfb] text-sm'>{business.contactPerson}</h2>
                                <h2 className='text-gray-500 text-sm'>{business.address}</h2>
                            </div>

                            <div className='mt-4 flex justify-between gap-2 sm:gap-2'>
                                <Button className="bg-[#087cfb] text-white px-4 py-2 rounded-full hover:bg-[#0462c9] transition-all">
                                    Book Now
                                </Button>
                                <div className="text-md font-semibold text-gray-800">
                                    <div>Starts at:</div>
                                    <span className="text-gray-500 line-through mr-1">₹499</span>
                                    <span className="text-green-600 font-bold">₹249</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
                    : Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className='w-full h-[280px] bg-slate-200 rounded-lg animate-pulse'></div>
                    ))
                }
            </div>
        </div>
    )
}

export default BusinessList

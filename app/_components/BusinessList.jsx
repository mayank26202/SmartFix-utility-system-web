import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BusinessList({ businessList, title }) {
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-[22px]'>{title}</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {businessList.length > 0 ? businessList.map((business, index) => (
                    <Link href={'/details/' + business.id} key={index} className='shadow-md rounded-lg
            hover:shadow-lg hover:shadow-[#087cfb] cursor-pointer hover:scale-110 transition-all ease-in-out'>
                        <Image src={business?.images[0].url}
                            alt={business.name}
                            width={500}
                            height={200}
                            className='h-[150px] md:h-[200px] object-cover rounded-lg'
                        />
                        <div className='flex flex-col items-baseline p-3'>
                            <h2 className='p-1 bg-[#e2eefc] text-[#087cfb] rounded-full text-[15px]'>{business.category.name}</h2>
                            <h2 className='font-bold text-lg'>{business.name}</h2>
                            <h2 className='text-[#087cfb]'>{business.contactPerson}</h2>
                            <h2 className='text-gray-500 text-sm'>{business.address}</h2>
                            <div className='flex justify-between items-center w-full mt-4'>
                                <Button className="bg-[#087cfb] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-[#0462c9] transition-all">
                                    Book Now
                                </Button>
                                <h2 className="text-sm font-semibold text-gray-800">
                                    Starts at: <hr />
                                    <span className="text-gray-500 line-through mr-2">₹499</span>
                                    <span className="text-green-600 font-bold">₹249</span>
                                </h2>
                            </div>


                        </div>
                    </Link>
                ))
                    :
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                        <div key={index} className='w-full h-[300px] bg-slate-200 rounded-lg animate-pulse'>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BusinessList

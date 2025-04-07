"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi'
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

function Slider() {
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        GetSlider();
    }, [])

    const GetSlider = () => {
        GlobalApi.GetSliders().then(resp => {
            setSliders(resp.sliders);
            console.log(resp.sliders);
        })
    }

    return (
        <div className="w-full max-w-screen-xl mx-auto py-4">
            <Carousel>
                <CarouselContent>
                    {sliders.map((item, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
                                <Image
                                    src={item.image.url}
                                    alt={`slider-${index}`}
                                    width={1200}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Slider

'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

function Slider() {
  const [sliders, setSliders] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    GetSlider()
  }, [])

  useEffect(() => {
    if (sliders.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [sliders])

  const GetSlider = () => {
    GlobalApi.GetSliders().then(resp => {
      setSliders(resp.sliders)
    })
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-4 max-w-screen-xl mx-auto">
      <Carousel>
        <CarouselContent>
          {sliders.length > 0 && (
            <CarouselItem key={currentIndex} className="w-full flex justify-center">
              <div className="relative w-full h-[180px] sm:h-[260px] md:h-[380px] lg:h-[500px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={sliders[currentIndex].image.url}
                  alt={`slider-${currentIndex}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Slider

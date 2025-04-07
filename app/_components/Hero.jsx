import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'


const Hero = () => {
  return (
    <div className='flex items-center flex-col justify-center pt-10 pb-7 gap-1'>
      
      <h2 className='font-bold text-[46px] text-center'>Hassle-Free Home  <span className='text-[#087cfb]'>Services</span><br></br> at Your Fingertips!</h2>
      <h2 className='text-xl text-gray-400'>SmartFix connects you with verified experts to get the job done right.</h2>
      <div className='mt-4 flex gap-1 items-center'>
        <Input placeholder='Search' className='border-b-4 border-[#087cfb] rounded-full md:w-[350px]'></Input>
        <Button className='bg-[#087cfb] rounded-full h-[40px] cursor-pointer hover:bg-[#0462c9] transition-all'>
            <Search className='h-5 w-5'></Search>
        </Button>
      </div>
    </div>
  )
}

export default Hero

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Hero = ({ businessList }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const router = useRouter()
  const wrapperRef = useRef(null)

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setSuggestions([])
      return
    }

    const filtered = businessList.filter((business) =>
      business.name.toLowerCase().includes(value.toLowerCase())
    )
    setSuggestions(filtered)
  }

  const handleSelect = (business) => {
    router.push(`/details/${business.id}`)
    setQuery('')
    setSuggestions([])
  }

  const handleSearchClick = () => {
    const matched = businessList.find(
      (b) => b.name.toLowerCase() === query.toLowerCase()
    )
    if (matched) {
      handleSelect(matched)
    }
  }

  // 👇 Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex items-center flex-col justify-center pt-10 pb-7 gap-1'>
      <h2 className='font-bold text-[46px] text-center'>
        Hassle-Free Home <span className='text-[#087cfb]'>Services</span>
        <br />
        at Your Fingertips!
      </h2>
      <h2 className='text-xl text-gray-400'>
        SmartFix connects you with verified experts to get the job done right.
      </h2>

      <div className='mt-4 flex flex-col items-center gap-1 relative' ref={wrapperRef}>
        <div className='flex gap-1 items-center'>
          <Input
            value={query}
            onChange={handleInputChange}
            placeholder='Search'
            className='border-b-4 border-[#087cfb] rounded-full md:w-[350px] focus:outline-none focus:ring-0 focus:border-[#087cfb]'
          />
          <Button
            onClick={handleSearchClick}
            className='bg-[#087cfb] rounded-full h-[40px] cursor-pointer hover:bg-[#0462c9] transition-all'
          >
            <Search className='h-5 w-5' />
          </Button>
        </div>

        {suggestions.length > 0 && (
          <ul className='absolute top-[105%] z-10 bg-white w-full max-w-[350px] shadow-md rounded-lg overflow-hidden'>
            {suggestions.map((business) => (
              <li
                key={business.id}
                onClick={() => handleSelect(business)}
                className='px-4 py-2 cursor-pointer hover:bg-gray-200'
              >
                {business.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Hero

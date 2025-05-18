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
<section className="w-full bg-white px-6 py-15 mt-10 flex justify-center">
  <div className="max-w-3xl w-full flex flex-col items-center text-center">

    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl font-bold mb-2 leading-tight">
      Hassle-Free Home <span className="text-[#087cfb]">Services</span>
    </h1>
    <h2 className="text-4xl sm:text-5xl font-bold mb-8">
      at Your Fingertips!
    </h2>

    {/* Subtext */}
    <p className="text-gray-600 text-lg mb-10 px-2 whitespace-nowrap overflow-x-auto">
      SmartFix connects you with verified experts to get the job done right!
    </p>

    {/* Search Bar */}
    <div ref={wrapperRef} className="relative w-full max-w-xl px-4">
      <div className="flex items-center bg-gradient-to-r from-[#f0f4fa] to-[#eaf0f9] border border-[#c3d1e6] rounded-full shadow-md px-5 py-3 w-full">
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder="Search for electricians, plumbers..."
          className="flex-1 bg-white text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#087cfb]"
        />
        <Button
          onClick={handleSearchClick}
          className="ml-4 bg-[#087cfb] hover:bg-[#0569d3] text-white font-semibold rounded-full px-6 py-2 shadow-md transition"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-[105%] z-20 w-full bg-white shadow-lg rounded-lg mt-2 text-left text-sm sm:text-base max-w-xl mx-auto">
          {suggestions.map((business) => (
            <li
              key={business.id}
              onClick={() => handleSelect(business)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-[#087cfb]"
            >
              {business.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</section>




  )
}

export default Hero

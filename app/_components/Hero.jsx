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
    <section className="mt-15 w-full px-4 py-10 bg-white flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
          Hassle-Free Home <span className="text-[#087cfb]">Services</span><br />
          at Your Fingertips!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          SmartFix connects you with verified experts to get the job done right.
        </p>
      </div>

      <div
        ref={wrapperRef}
        className="relative w-full max-w-md mt-8"
      >
<div className="flex items-center bg-gradient-to-r from-[#f0f4fa] to-[#eaf0f9] border border-[#c3d1e6] rounded-full shadow-lg px-4 py-2 w-full max-w-xl transition-all duration-300">
  <Input
    value={query}
    onChange={handleInputChange}
    placeholder="Search for electricians, plumbers..."
    className="flex-1 bg-white text-sm sm:text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#087cfb] transition-all duration-200"
  />
  <Button
    onClick={handleSearchClick}
    className="ml-3 bg-[#087cfb] hover:bg-[#0569d3] text-white font-semibold rounded-full px-5 py-2 shadow-md transition duration-200"
  >
    <Search className="w-5 h-5" />
  </Button>
</div>


        {suggestions.length > 0 && (
          <ul className="absolute top-[105%] z-20 w-full bg-white shadow-lg rounded-lg mt-2 overflow-hidden text-left text-sm sm:text-base">
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
    </section>
  )
}

export default Hero

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
    <section className="mt-5 w-full px-4 py-10 bg-white flex flex-col items-center justify-center text-center">
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
        <div className="flex items-center bg-white rounded-full shadow-md px-3 py-1.5">
          <Input
            value={query}
            onChange={handleInputChange}
            placeholder="Search for electricians, plumbers..."
            className="flex-1 border-none focus:outline-none focus:ring-0 text-sm sm:text-base"
          />
          <Button
            onClick={handleSearchClick}
            className="bg-[#087cfb] hover:bg-[#0569d3] text-white rounded-full px-3 py-2 h-auto"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute top-[105%] z-20 w-full bg-white shadow-lg rounded-lg mt-2 overflow-hidden text-left text-sm sm:text-base">
            {suggestions.map((business) => (
              <li
                key={business.id}
                onClick={() => handleSelect(business)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

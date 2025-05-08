'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import GlobalApi from '@/app/_services/GlobalApi'
import { useRouter } from 'next/navigation'

export default function CategoryPage() {
  const [categories, setCategories] = useState([])
  const router = useRouter()

  useEffect(() => {
    GlobalApi.getCategory().then(res => {
      setCategories(res.categories)
    })
  }, [])

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/admin')}
        className="mb-6 px-4 py-2 bg-[#087cfb] text-white rounded-lg hover:bg-[#065b8f] transition duration-200"
      >
        Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold text-[#087cfb] mb-6">All Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl shadow-md p-6 flex flex-col items-center justify-center"
            style={{ backgroundColor: '#e2eefc' }} // Adjusted background color
          >
            <div className="w-16 h-16 relative mb-3">
              {cat.icon?.[0]?.url ? (
                <Image
                  src={cat.icon[0].url}
                  alt={cat.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-full">
                  <span className="text-xl text-gray-600">N/A</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-center">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

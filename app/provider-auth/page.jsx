'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProviderAuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !name) {
      alert("Please fill all fields.")
      return
    }

    // Store session in localStorage (can be changed to cookies/server logic)
    const user = { role: 'provider', email, name }
    localStorage.setItem('providerSession', JSON.stringify(user))

    router.push('/provider-dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#087cfb]">
          {isLogin ? 'Provider Login' : 'Provider Signup'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#087cfb]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#087cfb]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#087cfb] text-white py-2 rounded-md hover:bg-[#0462c9] transition"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#087cfb] hover:underline"
          >
            {isLogin ? 'Signup here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  )
}

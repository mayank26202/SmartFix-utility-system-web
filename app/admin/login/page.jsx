'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill all fields.")
      return
    }

    // These are only checked server-side in middleware
    if (
      email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      alert("Invalid credentials.")
      return
    }

    // For middleware detection: use cookie instead of localStorage
    document.cookie = `adminSession=true; path=/; max-age=86400`

    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#087cfb]">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#087cfb] text-sm"
              value={email}
              placeholder="Enter Admin Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#087cfb] text-sm"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#087cfb] text-white py-2 rounded-md hover:bg-[#0462c9] transition text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

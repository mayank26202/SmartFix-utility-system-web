'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const [admin, setAdmin] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = document.cookie.includes('adminSession=true')
    if (!isLoggedIn) {
      router.replace('/admin/login')
    }

    // Simulating fetching admin info (this can be replaced with actual API call)
    const adminData = {
      name: 'Admin Name',
      email: 'admin@example.com',
    }
    setAdmin(adminData)
  }, [])

  const handleLogout = () => {
    // Clear cookie by setting an expired date
    document.cookie = 'adminSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin/login')
  }

  const dashboardLinks = [
    { title: 'View Profile', href: '/admin/profile', color: '#b8e1f7' },
    { title: 'View/Add Providers', href: '/admin/providers', color: '#ffd1a1' },
    { title: 'View/Add Categories', href: '/admin/categories', color: '#b5f0c1' },
    { title: 'View/Add Services', href: '/admin/services', color: '#d7b5ff' },
    { title: 'Analytics', href: '/admin/analytics', color: '#ffb3b3' },
  ]

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#087cfb]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      {/* Profile Section */}
      {admin && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h2>
          <p className="text-lg text-gray-600">Name: {admin.name}</p>
          <p className="text-lg text-gray-600">Email: {admin.email}</p>
          <Link
            href="/admin/profile"
            className="inline-block mt-4 bg-[#087cfb] text-white px-6 py-2 rounded-xl hover:bg-[#0462c9] transition text-sm"
          >
            Edit Profile
          </Link>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardLinks.map(({ title, href, color }) => (
          <Link
            key={title}
            href={href}
            className="p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
            <p className="text-sm text-gray-600">Manage {title.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

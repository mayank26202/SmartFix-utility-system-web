'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = document.cookie.includes('adminSession=true')
    if (!isLoggedIn) {
      router.replace('/admin/login')
    }
  }, [])

  const handleLogout = () => {
    document.cookie = 'adminSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin/login')
  }

  const dashboardLinks = [
    { title: 'Profile', subtitle: 'View Profiles', href: '/admin/profile', color: '#b8e1f7' },
    { title: 'Providers', subtitle: 'View/Add providers', href: '/admin/providers', color: '#ffd1a1' },
    { title: 'Categories', subtitle: 'View/Add categories', href: '/admin/categories', color: '#b5f0c1' },
    { title: 'Services', subtitle: 'View/Add services', href: '/admin/services', color: '#d7b5ff' },
    { title: 'Analytics', subtitle: 'View analytics', href: '/admin/analytics', color: '#ffb3b3' },
  ]

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#087cfb]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600 text-md mb-8">Welcome, Admin</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardLinks.map(({ title, subtitle, href, color }) => (
          <Link
            key={title}
            href={href}
            className="p-6 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300 border border-gray-200"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Menu } from 'lucide-react'

function Header() {
  const { data } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:px-8 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-b border-gray-200 flex justify-between items-center bg-white z-[100] backdrop-blur-lg">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-10">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <span className="text-[#087cfb] font-bold text-3xl tracking-wide font-sans">
            SmartFix
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className="hover:text-[#087cfb] transition font-medium" href="/">Home</Link>
          <Link className="hover:text-[#087cfb] transition font-medium" href="/search/Cleaning">Services</Link>
          <Link className="hover:text-[#087cfb] transition font-medium" href="/aboutUs">About Us</Link>
          <Link className="hover:text-[#087cfb] transition font-medium" href="/support">Support/FAQs</Link>
        </nav>
      </div>

      {/* Right: Mobile Menu Toggle & Auth */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <Menu className="w-6 h-6 text-[#087cfb]" />
        </button>

        {/* Auth Controls */}
        <div className="hidden md:flex items-center gap-4">
          {data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={data.user.image}
                  alt="User"
                  width={45}
                  height={45}
                  className="rounded-full border-2 border-[#087cfb] cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[200]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href="/myProfile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/myBooking">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#087cfb] text-white rounded-full px-5">
                  Login / Signup
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[200]">
                <DropdownMenuItem onClick={() => signIn('descope')}>Continue as User</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/provider-auth">Continue as Provider</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:hidden z-40">
          <Link className="hover:text-[#087cfb] font-medium" href="/">Home</Link>
          <Link className="hover:text-[#087cfb] font-medium" href="/search/Cleaning">Services</Link>
          <Link className="hover:text-[#087cfb] font-medium" href="/aboutUs">About Us</Link>
          <Link className="hover:text-[#087cfb] font-medium" href="/support">Support/FAQs</Link>
          {data?.user ? (
            <>
              <Link className="hover:text-[#087cfb] font-medium" href="/myProfile">My Profile</Link>
              <Link className="hover:text-[#087cfb] font-medium" href="/myBooking">My Bookings</Link>
              <button onClick={() => signOut()} className="text-left text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => signIn('descope')} className="text-left font-medium text-[#087cfb]">Continue as User</button>
              <Link href="/provider-auth" className="text-left font-medium">Continue as Provider</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header;

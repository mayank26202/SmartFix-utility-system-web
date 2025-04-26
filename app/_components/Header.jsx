"use client"
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'


function Header() {

    const { data } = useSession();

    useEffect(() => {
        
    }, [data])

    return (
        <div className='p-5 shadow-sm flex justify-between'>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    <Link href='/'><Image src='/logo.svg' alt='logo' width={40} height={200} ></Image></Link>
                    <Link href='/' className="text-[#087cfb] font-bold text-4xl tracking-wide font-sans">
                        SmartFix
                    </Link>
                </div>
                <div className='md:flex items-center gap-6 hidden'>
                    <h2 className='hover:scale-105 hover:text-[#087cfb] cursor-pointer'><Link href='/'>Home</Link></h2>
                    <h2 className='hover:scale-105 hover:text-[#087cfb] cursor-pointer'><Link href='/search/Cleaning'>Services</Link></h2>
                    <h2 className='hover:scale-105 hover:text-[#087cfb] cursor-pointer'><Link href='/aboutUs'>About Us</Link></h2>
                    <h2 className='hover:scale-105 hover:text-[#087cfb] cursor-pointer'><Link href='/support'>Support/FAQs</Link></h2>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {data?.user ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Image
                                src={data?.user?.image}
                                alt="User"
                                width={50}
                                height={60}
                                className="rounded-full border-2 border-[#087cfb] shadow-lg cursor-pointer"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <hr className="border-t-2 border-gray-300 my-4"/>
                            <DropdownMenuItem className="cursor-pointer"><Link href='/myProfile'>My Profile</Link></DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer"><Link href='/myBooking'>My Bookings</Link></DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : (
                        <Button
                            onClick={() => signIn('descope')}
                            className="bg-[#087cfb] text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-[#0462c9] transition-all cursor-pointer"
                        >
                            Login / Signup
                        </Button>
                    )}
            </div>

        </div>
    )
}

export default Header

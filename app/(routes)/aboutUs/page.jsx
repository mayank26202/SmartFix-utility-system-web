"use client"

import React from "react"

export default function AboutPage() {
  return (
    <div className="bg-[#e2eefc] min-h-screen text-black">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-black">This is SmartFix</h1>
            <p className="text-lg text-gray-600 leading-7">
              At SmartFix, we’re on a mission to simplify the way people access essential services. Whether you need an electrician, a plumber, or a hairstylist — our platform connects you with trusted professionals, fast and securely.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-7">
              We believe that everyday fixes should be hassle-free. That’s why we built SmartFix — to give you a convenient, reliable, and user-friendly way to get things done.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/team-image.jpg" alt="SmartFix team" className="rounded-lg shadow-md w-full object-cover h-[300px]" />
          </div>
        </div>
      </section>

      {/* Banner */}
    

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-3xl font-bold text-black">100,000+</h3>
          <p className="text-gray-500 mt-2">Happy Customers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-black">2,000+</h3>
          <p className="text-gray-500 mt-2">Verified Service Providers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-black">50+</h3>
          <p className="text-gray-500 mt-2">Cities Served</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img src="/volunteer-image.jpg" alt="Volunteering" className="rounded-lg shadow-md w-full object-cover h-[300px]" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-black mb-3 flex gap-2">Be a force for good<div className="text-green-500"> #SayNoToPlastic</div></h2>
          <p className="text-gray-600 mb-4">
            We believe in giving back to our community. SmartFix partners with local organizations to create meaningful impact — one service at a time.
          </p>
          <button className="bg-[#087cfb] text-white px-6 py-2 rounded-full font-semibold">Join Our Cause</button>
        </div>
      </section>

      {/* Mini Stats */}
      <section className="max-w-4xl mx-auto px-4 pb-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div>
          <h3 className="text-2xl font-bold text-black">38,000</h3>
          <p className="text-gray-500 text-sm mt-1">Hours Served</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-black">15+</h3>
          <p className="text-gray-500 text-sm mt-1">Team Members</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-black">4.9★</h3>
          <p className="text-gray-500 text-sm mt-1">Avg User Rating</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-black">24/7</h3>
          <p className="text-gray-500 text-sm mt-1">Support Available</p>
        </div>
      </section>
    </div>
  )
}

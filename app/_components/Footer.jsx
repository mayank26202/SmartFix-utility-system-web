import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#e2eefc] text-black py-10 px-6 md:px-20 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.svg" alt="SmartFix Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold">SmartFix</h1>
          </div>
          <p className="text-sm text-black">
            Trusted Utility Booking Platform. Seamless service scheduling for your everyday needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-black">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/search/Cleaning">Services</Link></li>
            <li><Link href="/aboutUs">About Us</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Top Services</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>Electrician</li>
            <li>Plumber</li>
            <li>Home Cleaning</li>
            <li>Painting</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <p className="text-sm text-black mb-4">
            Email: support@smartfix.com<br />
            Phone: +91 XXXXX XXXXX
          </p>
          <div className="flex gap-4 text-lg text-black">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-black pt-4 text-center text-sm text-[#087cfb]">
        © {new Date().getFullYear()} SmartFix. All rights reserved.
      </div>
    </footer>
  );
}

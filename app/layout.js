"use client"; // Add this directive at the top to make this a client component

import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./_components/Footer";
import { usePathname } from "next/navigation"; // Now allowed, because we're in a client component

const inter = Outfit({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current page path

  // Check if the current page is the provider dashboard
  const hideHeaderFooter = pathname === '/provider-dashboard';

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <div className="mx-6 md:mx-16">
            {/* Conditionally render Header */}
            {!hideHeaderFooter && <Header />}
            <Toaster />
            {children}
            {/* Conditionally render Footer */}
            {!hideHeaderFooter && <Footer />}
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

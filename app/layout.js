"use client";

import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./_components/Footer";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata";

const inter = Outfit({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide header/footer for these paths
  const hideHeaderFooter =
    pathname.startsWith("/admin") || pathname === "/provider-auth" || pathname === "/provider-dashboard";

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body
        className={`${inter.className} ${
          !hideHeaderFooter ? "" : ""
        }`}
      >
        <NextAuthSessionProvider>
          <div className="mx-6 md:mx-16">
            {!hideHeaderFooter && <Header />}
            <Toaster />
            {children}
            {!hideHeaderFooter && <Footer />}
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

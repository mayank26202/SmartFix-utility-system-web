import { Geist, Geist_Mono, Inter, Outfit} from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./_components/Footer";


const inter = Outfit({
  
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "SmartFix - Utility App",
  description: "Find and book services easily with SmartFix.",
  icons: {
    icon: "/logo.svg",}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NextAuthSessionProvider>
        <div className=" mx-6 md:mx-16">
        <Header/>
        <Toaster />
          {children}
        <Footer />
        </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

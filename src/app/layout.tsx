import './globals.css'
import type { Metadata } from 'next'
import { Inter, Jost } from "next/font/google";
// import Navbar from '@/components/nabvar/navbar'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/nabvar/Navbar'
import NavSearch from '@/components/mainNavSearch/NavSearch'
import Providers from "@/utils/provider";
import SearchHeader from '@/components/searchHeader/SearchHeader'
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: 'Farmacy Farm',
  description: 'Website for Farm Products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jost.variable}>
    
      <body className="font-jost">
        {/* <NavSearch/> */}
        <Providers>
          {/* <SearchHeader/> */}
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

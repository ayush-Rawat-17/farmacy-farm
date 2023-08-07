import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Navbar from '@/components/nabvar/navbar'
import Footer from '@/components/footer/Footer'
const inter = Inter({ subsets: ['latin'] })
import Navbar from '@/components/nabvar/Navbar'
import NavSearch from '@/components/mainNavSearch/NavSearch'
import Providers from "@/utils/provider";
import SearchHeader from '@/components/searchHeader/SearchHeader'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NavSearch/> */}
        <Providers>
          <SearchHeader/>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

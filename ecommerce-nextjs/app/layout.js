// app/layout.js
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GymPanda - Premium Gym Apparel',
  description: 'Elevate your workouts with GymPanda’s high-quality gym wear. Designed for performance, comfort, and style.',
  icons: {
    icon: '/favicon.ico', // Favicon link
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
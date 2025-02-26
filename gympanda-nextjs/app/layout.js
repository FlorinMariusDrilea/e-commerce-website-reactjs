'use client';

import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '../styles/global.css'; // Ensure the correct global CSS import
import SessionProvider from './components/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // This is useful for CSS variable approach
});

const metadata = {
  title: 'GymPanda - Premium Gym Apparel',
  description:
    'Elevate your workouts with GymPanda’s high-quality gym wear. Designed for performance, comfort, and style.',
  icons: {
    icon: '/favicon.ico', // Favicon link
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

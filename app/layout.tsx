import type { Metadata } from "next";
import { Tenor_Sans, Archivo } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsent";
import { LoadingProvider } from './context/LoadingContext'
import LoadingOverlay from './components/LoadingOverlay'
import { NavigationEvents } from './components/NavigationEvents'
import { Suspense } from 'react'

const displayFont = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['100', '400', '500', '600', '700'],
});

const bodyFont = Tenor_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Casino Spinner - Find Your Perfect Casino Match',
  description: 'Discover the best online casinos tailored to your preferences. Compare bonuses, games, and features to find your ideal gaming destination.',
  icons: {
    icon: '/images/loco-bonus.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body style={{
        fontFamily: 'var(--font-inter)',
        background: '#0D1117',
        color: 'white',
        minHeight: '100vh',
      }}
      >
        <LoadingProvider>
          <Suspense>
            <NavigationEvents />
          </Suspense>
          <LoadingOverlay />
          <Navbar />
          {children}
          <Footer />
          <CookieConsentBanner />
        </LoadingProvider>
      </body>
    </html>
  )
}

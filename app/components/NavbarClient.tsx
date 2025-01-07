"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Category } from "../utils/interface"
import { useState } from "react"
import { GiftIcon } from "./GiftIcon"

interface NavbarClientProps {
  categories: Category[]
  casinos: any[]
}

export function NavbarClient({ categories, casinos }: NavbarClientProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-[#0A0A0A] relative">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00E6FF] blur-[150px] -top-48 -left-24"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00E6FF] blur-[150px] -top-24 right-0"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-24">
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex items-center group">
              <div className="h-16 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/spinnertop.png"
                  alt="Loco Bonus logo"
                  width={160}
                  height={80}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <GiftIcon casinos={casinos} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-50 flex items-center space-x-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#242424] hover:from-[#00E6FF] hover:to-[#00E6FF] border border-[#00E6FF]/20 group transition-all duration-300"
                aria-label="Toggle menu"
              >
                <span className="text-[#C0C0C0] group-hover:text-white tracking-wide transition-colors duration-300">Menu</span>
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <span className={`absolute h-[2px] bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-[9px] w-5 rotate-45 bg-white" : "top-[4px] w-3.5 bg-[#C0C0C0] group-hover:bg-white group-hover:w-5"
                  }`}></span>
                  <span className={`absolute h-[2px] transition-all duration-300 ${
                    isMenuOpen ? "w-0 opacity-0" : "w-5 bg-[#C0C0C0] group-hover:bg-white"
                  }`}></span>
                  <span className={`absolute h-[2px] bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-[9px] w-5 -rotate-45 bg-white" : "top-[14px] w-4 bg-[#C0C0C0] group-hover:bg-white group-hover:w-5"
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex w-full items-center">
            {/* Left - Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="h-16 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/spinnertop.png"
                  alt="Loco Bonus logo"
                  width={200}
                  height={100}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </Link>

            {/* Navigation Container */}
            <div className="flex items-center justify-end flex-1 ml-8 min-w-0">
              {/* Center - Casino Categories */}
              <div className="flex-shrink min-w-0 px-2 py-1.5 bg-[#1A1A1A]/50">
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug.current}`}
                      className={`relative px-3 py-2 group transition-all duration-300 ${
                        pathname === `/category/${category.slug.current}`
                          ? "text-white bg-[#00E6FF]"
                          : "text-[#C0C0C0] hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{category.title}</span>
                      {pathname !== `/category/${category.slug.current}` && (
                        <div className="absolute inset-0 bg-[#00E6FF]/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="flex-shrink-0 mx-6">
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#00E6FF]/30 to-transparent"></div>
              </div>

              {/* Right - Help Categories */}
              <div className="flex-shrink-0 flex items-center gap-6">
                {[
                  { href: "/game-guides", label: "Game Guides", icon: "📖" },
                  { href: "/gambling-advice", label: "Gambling Advice", icon: "💡" }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-2 py-2 ${
                      pathname === item.href
                        ? "text-[#00E6FF]"
                        : "text-[#C0C0C0] hover:text-[#00E6FF]"
                    }`}
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {/* Gift Icon with separator */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 mx-6">
                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#00E6FF]/30 to-transparent"></div>
                  </div>
                  <GiftIcon casinos={casinos} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full w-full flex flex-col pt-24 px-6">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-[#00E6FF] text-sm font-semibold uppercase tracking-wider mb-4">Categories</h3>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  className={`block py-2 ${
                    pathname === `/category/${category.slug.current}`
                      ? "text-[#00E6FF]"
                      : "text-[#C0C0C0] hover:text-[#00E6FF]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.title}
                </Link>
              ))}
            </div>

            {/* Help Categories */}
            <div className="mt-8 space-y-4">
              <h3 className="text-[#00E6FF] text-sm font-semibold uppercase tracking-wider mb-4">Help & Resources</h3>
              {[
                { href: "/game-guides", label: "Game Guides", icon: "📖" },
                { href: "/gambling-advice", label: "Gambling Advice", icon: "💡" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 py-2 ${
                    pathname === item.href
                      ? "text-[#00E6FF]"
                      : "text-[#C0C0C0] hover:text-[#00E6FF]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
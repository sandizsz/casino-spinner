"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Category } from "../utils/interface"
import { useState } from "react"

interface NavbarClientProps {
  categories: Category[]
}

export function NavbarClient({ categories }: NavbarClientProps) {
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
                  src="/images/loco-bonus.png"
                  alt="Loco Bonus logo"
                  width={160}
                  height={80}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </Link>

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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex w-full items-center">
            {/* Left - Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="h-16 w-auto aspect-[2/1] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/loco-bonus.png"
                  alt="Loco Bonus logo"
                  width={160}
                  height={80}
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
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-[#0A0A0A] transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-6">
            {/* Casino Categories Section */}
            <div className="mb-8">
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 transition-all duration-300 ${
                      pathname === `/category/${category.slug.current}`
                        ? "text-white bg-[#00E6FF]"
                        : "text-[#C0C0C0] hover:text-white hover:bg-[#00E6FF]/10"
                    }`}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Separator with label */}
            <div className="relative py-4 mb-8">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E6FF]/30 to-transparent"></div>
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#0A0A0A]">
                <span className="text-[#00E6FF]/30 text-xs uppercase tracking-wider">guides</span>
              </div>
            </div>

            {/* Help Categories Section */}
            <div className="flex flex-col space-y-4">
              {[
                { href: "/game-guides", label: "Game Guides", icon: "📖" },
                { href: "/gambling-advice", label: "Gambling Advice", icon: "💡" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 transition-all duration-300 ${
                    pathname === item.href
                      ? "text-[#00E6FF] bg-[#1A1A1A]"
                      : "text-[#C0C0C0] hover:text-[#00E6FF] hover:bg-[#1A1A1A]"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
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
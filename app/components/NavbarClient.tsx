"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Category, Casino } from "../utils/interface"
import { useState } from "react"
import { GiftIcon } from "./GiftIcon"

interface NavbarClientProps {
  categories: Category[]
  casinos: Casino[]
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
        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-between h-24">
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

        {/* Desktop Navigation - Two Row Layout */}
        <div className="hidden lg:flex lg:flex-col w-full">
          {/* Top Row - Categories */}
          <div className="border-b border-[#00E6FF]/10">
            <div className="flex items-center justify-end h-16">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    className={`relative px-4 py-2 rounded-md group transition-all duration-300 ${
                      pathname === `/category/${category.slug.current}`
                        ? "text-white bg-[#00E6FF]"
                        : "text-[#C0C0C0] hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 text-sm whitespace-nowrap">{category.title}</span>
                    {pathname !== `/category/${category.slug.current}` && (
                      <div className="absolute inset-0 bg-[#00E6FF]/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row - Logo and Help Categories */}
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
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

            {/* Help Categories */}
            <div className="flex items-center gap-8">
              {[
                { href: "/deposit-methods", label: "Deposit Methods", icon: "💸" },
                { href: "/casino-game-types", label: "Casino Game Types", icon: "🎲" },
                { href: "/casino-tips-tricks", label: "Casino Tips & Tricks", icon: "🤔" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-2 py-2 px-3 rounded-md transition-all duration-300 ${
                    pathname === item.href
                      ? "text-[#00E6FF] bg-[#00E6FF]/10"
                      : "text-[#C0C0C0] hover:text-[#00E6FF] hover:bg-white/5"
                  }`}
                >
                  <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                </Link>
              ))}

              {/* Gift Icon */}
              <div className="pl-6 border-l border-[#00E6FF]/20">
                <GiftIcon casinos={casinos} />
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
                { href: "/deposit-methods", label: "Deposit Methods", icon: "💸" },
                { href: "/casino-game-types", label: "Casino Game Types", icon: "🎲" },
                { href: "/casino-tips-tricks", label: "Casino Tips & Tricks", icon: "🤔" },
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
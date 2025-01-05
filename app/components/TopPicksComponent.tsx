'use client'

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Casino } from '../utils/interface'
import ClaimButton from './ClaimButton'
import { Hexagon, Triangle, Circle, Square } from 'lucide-react'

interface TopPicksComponentProps {
  casinos: Casino[]
}

export const revalidate = 60;

const TopPicksComponent = ({ casinos }: TopPicksComponentProps) => {
  const tagOrder = ['best-deposit-bonus', 'fast-withdrawal', 'most-reliable', 'vip'];
  
  const topPicks = tagOrder.map(tagSlug => {
    const matchingCasino = casinos.find(casino => 
      casino.tags?.some((tag: { slug: { current: string } }) => {
        return tag.slug.current.toLowerCase() === tagSlug;
      })
    );
    return matchingCasino;
  }).filter((casino): casino is Casino => casino !== undefined);

  // Define shapes for each category
  const shapes = [
    <Hexagon key="hexagon" className="w-6 h-6" />,
    <Triangle key="triangle" className="w-6 h-6" />,
    <Circle key="circle" className="w-6 h-6" />,
    <Square key="square" className="w-6 h-6" />
  ];

  return (
    <div className="relative w-full bg-[#0A0A0A] py-8 md:py-16 lg:py-32 overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#00E6FF] to-transparent w-full"
            style={{
              top: `${20 * i}%`,
              animation: `slide ${3 + i}s linear infinite`,
              left: i % 2 === 0 ? '-100%' : '100%'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header - Asymmetric design */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-16 lg:mb-20">
          <div className="md:w-1/2">
            <div className="inline-block">
              <div className="flex items-center gap-3 text-[#00E6FF] mb-4">
               
            
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-4 relative">
              Premium
              <span className="block text-[#00E6FF]">Casino Offers</span>
              <div className="absolute -right-8 top-0 w-16 h-16 border border-[#00E6FF]/20 rounded-full animate-spin-slow" />
            </h2>
          </div>
          <p className="md:w-1/3 text-gray-400 text-base md:text-lg mt-4 md:mt-0 font-body">
            Carefully curated selection of exclusive casino deals, 
            <span className="text-[#00E6FF]">verified</span> and 
            <span className="text-[#00E6FF]"> tested</span> by our experts
          </p>
        </div>

        {/* Cards Grid - Staggered layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 relative">
          {topPicks.map((casino, index) => (
            <div 
              key={casino._id}
              className={`group relative transform transition-all duration-500 hover:scale-[1.02] ${
                index % 2 === 0 ? 'md:translate-y-8' : ''
              }`}
            >
              {/* Category indicator - Moved outside the content wrapper */}
              <div className="absolute -top-3 -left-3 z-20">
                <div className="flex items-center gap-2 bg-[#00E6FF] text-black text-sm font-mono px-4 py-2 rounded-lg shadow-lg shadow-[#00E6FF]/20">
                  {shapes[index]}
                  <span className="font-mono">{casino.tags?.[0]?.title || tagOrder[index].toUpperCase()}</span>
                </div>
              </div>

              {/* Geometric background pattern */}
              <div className="absolute inset-0 bg-[#0D0D0D] rounded-2xl">
                <div className="absolute inset-0 opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 border border-[#00E6FF]/10"
                      style={{
                        top: `${(i * 20) + 10}%`,
                        left: `${(i * 15) + 5}%`,
                        transform: `rotate(${i * 15}deg)`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content wrapper */}
              <div className="relative bg-gradient-to-br from-black/80 to-transparent backdrop-blur-sm rounded-2xl border border-white/5 group-hover:border-[#00E6FF]/30 transition-all duration-300 overflow-hidden">
                <div className="p-4 md:p-6 relative z-10">
                  {/* Logo */}
                  <div className="relative w-full aspect-[4/3] mb-6 z-10">
                    <div className="absolute inset-0 bg-black/40 rounded-lg backdrop-blur-sm border border-white/10 p-4">
                      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={casino.imageUrl}
                          alt={casino.offerTitle}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -right-2 -bottom-2 w-12 h-12 border-r-2 border-b-2 border-[#00E6FF]/30" />
                    <div className="absolute -left-2 -top-2 w-12 h-12 border-l-2 border-t-2 border-[#00E6FF]/30" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-white text-xl font-heading group-hover:text-[#00E6FF] transition-colors">
                      {casino.offerTitle}
                    </h3>
                    <div className="relative">
                      <p className="text-[#00E6FF] text-sm font-body">
                        {casino.offerDescription}
                      </p>
                      <div className="absolute -left-4 top-1/2 w-2 h-12 bg-gradient-to-b from-[#00E6FF]/50 to-transparent transform -translate-y-1/2" />
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="mt-8 space-y-3">
                    <ClaimButton
                      offerUrl={casino.offerUrl}
                      offerTitle={casino.offerTitle}
                      categoryUrls={casino.categoryUrls}
                    />
                    
                    {casino.termsConditionsUrl && (
                      <Link 
                        href={casino.termsConditionsUrl}
                        className="block text-[10px] text-center text-gray-400 hover:text-[#00E6FF] transition-colors group-hover:underline font-body"
                      >
                        Terms & Conditions Apply
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default TopPicksComponent
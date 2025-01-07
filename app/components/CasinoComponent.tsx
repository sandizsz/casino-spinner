"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import { TypedObject } from '@portabletext/types'
import { PortableText } from '@portabletext/react';
import ClaimButton from './ClaimButton';

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface PaymentMethod {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
}

interface CategoryUrl {
  categoryId: string;
  categorySlug: string;
  url: string;
  urlNumber?: string;
}

interface Casino {
  _id: string;
  offerTitle: string;
  offerUrl: string;
  offerDescription: string;
  offerText: TypedObject[];
  rating: number;
  imageUrl: string;
  termsConditionsUrl: string;
  categories: Category[];
  paymentMethods: PaymentMethod[];
  orderRank?: number;
  categoryUrls?: CategoryUrl[];
}

interface CasinoProps {
  casino: Casino;
  index: number;
  categorySlug?: string;
}

const CasinoComponent: React.FC<CasinoProps> = ({ casino, index, categorySlug }) => {


  return (
    <div className="relative w-full bg-black/90 border border-cyan-500/20 rounded-lg p-6 mb-4 hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden">
    {/* Animated scan lines */}
    <div className="absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent h-px w-[200%] opacity-30"
          style={{
            top: `${30 * i}%`,
            left: '-50%',
            animation: `scan ${3 + i}s linear infinite`
          }}
        />
      ))}
    </div>

    {/* Main content */}
    <div className="flex items-center gap-8 relative z-10">
      {/* Logo with glow effect */}
      <div className="relative w-48 h-48 flex-shrink-0">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-xl animate-pulse"></div>
        <div className="relative h-full w-full bg-black/40 rounded-lg border border-cyan-500/20 p-4">
          <Image
            src={casino.imageUrl}
            alt={casino.offerTitle}
            fill
            className="object-contain p-2"
          />
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-cyan-500/40" />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-cyan-500/40" />
        </div>
        
        {/* Rank indicator */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-black border border-cyan-500/40 rounded flex items-center justify-center">
          <span className="text-cyan-500 text-sm">#{casino.orderRank || index + 1}</span>
        </div>
      </div>

      {/* Casino info with vertical accent */}
      <div className="flex-grow border-l-2 border-cyan-500/20 pl-8 space-y-2">
        <h3 className="text-xl text-white group-hover:text-cyan-400 transition-colors">
          {casino.offerTitle}
        </h3>
        <p className="text-gray-400 text-sm max-w-xl">
          {casino.offerDescription}
        </p>
        
        {/* Offer Text */}
        <div className="text-gray-300 text-sm mt-2">
          <div className="[&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-1">
            <PortableText value={casino.offerText} />
          </div>
        </div>
        
        {/* Payment methods grid */}
        <div className="flex gap-2 mt-4">
          {casino.paymentMethods
            .filter(method => method.image?.asset?.url)
            .slice(0, 5)
            .map((method) => (
            <div
              key={method._id}
              className="relative w-10 h-10 bg-black/60 rounded p-1.5 border border-cyan-500/20 group/method"
            >
              <Image
                src={method.image.asset.url}
                alt={method.name}
                fill
                className="object-contain p-1"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 opacity-0 group-hover/method:opacity-100 transition-opacity rounded">
                <span className="text-[10px] text-cyan-400 text-center px-1">{method.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="flex-shrink-0 w-48 flex flex-col items-center gap-3">
        <ClaimButton 
          offerUrl={casino.offerUrl}
          offerTitle={casino.offerTitle}
          categorySlug={categorySlug}
          categoryUrls={casino.categoryUrls}
        />
        <a
          href={casino.termsConditionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors text-center"
        >
          T&Cs Apply
        </a>
      </div>
    </div>
  </div>
  );
}

export default CasinoComponent;